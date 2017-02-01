using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Reflection.Emit;
using System.Threading;

namespace FinCarCom.Common.Mergeability
{

  // Ref: https://github.com/kfinley/TypeMerger
  public class Merger
  {

    #region Declarations

    private static AssemblyBuilder _asmBuilder;
    private static ModuleBuilder _modBuilder;
    private static TypeMergerPolicy _typeMergerPolicy;

    private static readonly IDictionary<string, Type> ObjectTypeCache = new Dictionary<string, Type>();
    private static readonly object Mutex = new object();

    #endregion




    /// <summary>
    /// Merge two different object instances into a single object which is a super-set of the properties of both objects. 
    /// If property name collision occurs and no policy has been created to specify which to use using the .Use() method the property value from 'values1' will be used.
    /// </summary>        
    /// <param name="values1">An object to be merged.</param>
    /// <param name="values2">An object to be merged.</param>
    /// <returns>New object containing properties from both objects</returns>
    public static object Merge(object values1, object values2)
    {
      lock (Mutex)
      {

        // Create a name from the names of both Types
        var name = $"{values1.GetType()}_{values2.GetType()}";

        if (_typeMergerPolicy != null)
          name += "_" + String.Join(",", _typeMergerPolicy.IgnoredProperties.Select(x => $"{x.Item1}_{x.Item2}"));



        // Now that we're inside the lock - check one more time
        var result = CreateInstance(name, values1, values2);
        if (result != null)
        {
          _typeMergerPolicy = null;
          return result;
        }


        // Merge list of PropertyDescriptors for both objects
        var pdc = GetProperties(values1, values2);

        // Make sure static properties are properly initialized
        InitializeAssembly();

        // Create the type definition
        var newType = CreateType(name, pdc);

        // Add it to the cache
        ObjectTypeCache.Add(name, newType);

        // Return an instance of the new Type
        result = CreateInstance(name, values1, values2);
        _typeMergerPolicy = null;

        return result;
      }
    }


    /// <summary>
    /// Used internally by the TypeMergerPolicy class method chaining for specifying a policy to use during merging.
    /// </summary>
    internal static object Merge(object values1, object values2, TypeMergerPolicy policy)
    {
      _typeMergerPolicy = policy;

      return Merge(values1, values2);
    }


    /// <summary>
    /// Specify a property to be ignored from a object being merged.
    /// </summary>
    /// <param name="ignoreProperty">The property of the object to be ignored as a Func.</param>
    /// <returns>TypeMerger policy used in method chaining.</returns>
    public static TypeMergerPolicy Ignore(Expression<Func<object>> ignoreProperty)
    {
      return new TypeMergerPolicy().Ignore(ignoreProperty);
    }


    /// <summary>
    /// Specify a property to use when there is a property name collision between objects being merged.
    /// </summary>
    /// <param name="useProperty"></param>
    /// <returns>TypeMerger policy used in method chaining.</returns>
    public static TypeMergerPolicy Use(Expression<Func<object>> useProperty)
    {
      return new TypeMergerPolicy().Use(useProperty);
    }


    /// <summary>
    /// Instantiates an instance of an existing Type from cache
    /// </summary>
    private static object CreateInstance(string name, object values1, object values2)
    {
      object newValues = null;

      // Check to see if type exists
      if (!ObjectTypeCache.ContainsKey(name))
        return null;


      // Merge all values together into an array
      var allValues = MergeValues(values1, values2);

      // Get type
      var type = ObjectTypeCache[name];

      // Make sure it isn't null for some reason
      if (type != null)
      {
        // Create a new instance
        newValues = Activator.CreateInstance(type, allValues);
      }
      else
      {
        // Remove null type entry
        lock (Mutex)
          ObjectTypeCache.Remove(name);
      }

      // Return values (if any)
      return newValues;
    }


    /// <summary>
    /// Merge PropertyDescriptors for both objects
    /// </summary>
    private static IEnumerable<PropertyDescriptor> GetProperties(object values1, object values2)
    {
      // Get the properties from both objects
      var pdc1 = TypeDescriptor.GetProperties(values1);
      var pdc2 = TypeDescriptor.GetProperties(values2);

      // Dynamic list to hold merged list of properties
      var properties = new List<PropertyDescriptor>();


      // Add properties from values1
      for (var i = 0; i < pdc1.Count; i++)
      {
        if (_typeMergerPolicy == null ||
            (!_typeMergerPolicy.IgnoredProperties
              .Contains(new Tuple<string, string>(values1.GetType().Name, pdc1[i].Name))
             & !_typeMergerPolicy.UseProperties
               .Contains(new Tuple<string, string>(values2.GetType().Name, pdc1[i].Name)))
          )
          properties.Add(pdc1[i]);
      }


      // Add properties from values2
      for (var i = 0; i < pdc2.Count; i++)
      {
        if (_typeMergerPolicy == null ||
            (!_typeMergerPolicy.IgnoredProperties
              .Contains(new Tuple<string, string>(values2.GetType().Name, pdc2[i].Name))
             & !_typeMergerPolicy.UseProperties
               .Contains(new Tuple<string, string>(values1.GetType().Name, pdc2[i].Name)))
          )
          properties.Add(pdc2[i]);
      }


      return properties.ToArray();
    }


    /// <summary>
    /// Get the type of each property
    /// </summary>
    private static Type[] GetTypes(IEnumerable<PropertyDescriptor> pdc)
    {
      return pdc.Select(t => t.PropertyType).ToArray();
    }


    /// <summary>
    /// Merge the values of the two types into an object array
    /// </summary>
    private static object[] MergeValues(object values1, object values2)
    {
      var pdc1 = TypeDescriptor.GetProperties(values1);
      var pdc2 = TypeDescriptor.GetProperties(values2);
      var values = new List<object>();


      for (var i = 0; i < pdc1.Count; i++)
      {
        if (_typeMergerPolicy == null ||
            (!_typeMergerPolicy.IgnoredProperties
              .Contains(new Tuple<string, string>(values1.GetType().Name, pdc1[i].Name))
             & !_typeMergerPolicy.UseProperties
               .Contains(new Tuple<string, string>(values2.GetType().Name, pdc1[i].Name)))
          )
          values.Add(pdc1[i].GetValue(values1));
      }


      for (var i = 0; i < pdc2.Count; i++)
      {
        if (_typeMergerPolicy == null ||
            (!_typeMergerPolicy.IgnoredProperties
              .Contains(new Tuple<string, string>(values2.GetType().Name, pdc2[i].Name))
             & !_typeMergerPolicy.UseProperties
               .Contains(new Tuple<string, string>(values1.GetType().Name, pdc2[i].Name)))
          )
          values.Add(pdc2[i].GetValue(values2));
      }


      return values.ToArray();
    }


    /// <summary>
    /// Initialize static objects
    /// </summary>
    private static void InitializeAssembly()
    {
      // Check to see if we've already instantiated the static objects
      if (_asmBuilder != null)
        return;


      // Create a new dynamic assembly
      var assembly = new AssemblyName {Name = "AnonymousTypeExentions"};

      // Get the current application domain
      var domain = Thread.GetDomain();

      // Get a module builder object
      _asmBuilder = domain.DefineDynamicAssembly(assembly, AssemblyBuilderAccess.Run);
      _modBuilder = _asmBuilder.DefineDynamicModule(_asmBuilder.GetName().Name, false);
    }


    /// <summary>
    /// Create a new Type definition from the list
    /// of PropertyDescriptors
    /// </summary>
    private static Type CreateType(string name, IEnumerable<PropertyDescriptor> pdc)
    {
      // Create TypeBuilder
      var typeBuilder = CreateTypeBuilder(name);

      // Get list of types for ctor definition
      var propDescriptors = pdc as IList<PropertyDescriptor> ?? pdc.ToList();
      var types = GetTypes(propDescriptors);

      // Create priate fields for use w/in the ctor body and properties
      var fields = BuildFields(typeBuilder, propDescriptors);

      // Define/emit the Ctor
      BuildCtor(typeBuilder, fields, types);

      // Define/emit the properties
      BuildProperties(typeBuilder, fields);

      // Return Type definition
      return typeBuilder.CreateType();
    }


    /// <summary>
    /// Create a type builder with the specified name
    /// </summary>
    private static TypeBuilder CreateTypeBuilder(string typeName)
    {
      var typeBuilder = _modBuilder.DefineType(typeName,
        TypeAttributes.Public,
        typeof (object));

      //Return new type builder
      return typeBuilder;
    }


    /// <summary>
    /// Define/emit the ctor and ctor body
    /// </summary>
    private static void BuildCtor(TypeBuilder typeBuilder, IReadOnlyList<FieldBuilder> fields, Type[] types)
    {
      // Define ctor()
      var ctor = typeBuilder.DefineConstructor(MethodAttributes.Public, CallingConventions.Standard, types);

      // Build ctor()
      var ctorGen = ctor.GetILGenerator();

      // Create ctor that will assign to private fields
      for (var i = 0; i < fields.Count; i++)
      {
        // Load argument (parameter)
        ctorGen.Emit(OpCodes.Ldarg_0);
        ctorGen.Emit(OpCodes.Ldarg, (i + 1));

        // Store argument in field
        ctorGen.Emit(OpCodes.Stfld, fields[i]);
      }


      // Return from ctor()
      ctorGen.Emit(OpCodes.Ret);
    }


    /// <summary>
    /// Define fields based on the list of PropertyDescriptors
    /// </summary>
    private static FieldBuilder[] BuildFields(TypeBuilder typeBuilder, IEnumerable<PropertyDescriptor> pdc)
    {
      var fields = new List<FieldBuilder>();

      // Build/define fields
      foreach (var field in pdc
        .Select(pd => typeBuilder.DefineField($"_{pd.Name}", pd.PropertyType, FieldAttributes.Private))
        .Where(field => fields.Contains(field) == false))
      {
        fields.Add(field);
      }

      return fields.ToArray();
    }


    /// <summary>
    /// Build a list of Properties to match the list of private fields
    /// </summary>
    private static void BuildProperties(TypeBuilder typeBuilder, IEnumerable<FieldBuilder> fields)
    {
      // Build properties
      foreach (var field in fields)
      {
        // Remove '_' from name for public property name
        var propertyName = field.Name.Substring(1);

        // Define the property
        var property = 
          typeBuilder.DefineProperty(propertyName, PropertyAttributes.None, field.FieldType, null);


        // Define 'Get' method only (anonymous types are read-only)
        var getMethod = 
          typeBuilder.DefineMethod($"Get_{propertyName}", MethodAttributes.Public, field.FieldType, Type.EmptyTypes);

        // Build 'Get' method
        var methGen = getMethod.GetILGenerator();

        // Method body
        methGen.Emit(OpCodes.Ldarg_0);
        
        // Load value of corresponding field
        methGen.Emit(OpCodes.Ldfld, field);
        
        // Return from 'Get' method
        methGen.Emit(OpCodes.Ret);

        // Assign method to property 'Get'
        property.SetGetMethod(getMethod);
      }
    }
  }
}