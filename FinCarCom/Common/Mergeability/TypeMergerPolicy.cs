using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace FinCarCom.Common.Mergeability
{
  public class TypeMergerPolicy
  {

    public TypeMergerPolicy()
    {
      IgnoredProperties = new List<Tuple<string, string>>();
      UseProperties = new List<Tuple<string, string>>();
    }


    internal IList<Tuple<string, string>> IgnoredProperties { get; }
    internal IList<Tuple<string, string>> UseProperties { get; }


    /// <summary>
    /// Specify a property to be ignored from a object being merged.
    /// </summary>
    /// <param name="ignoreProperty">The property of the object to be ignored as a Func.</param>
    /// <returns>TypeMerger policy used in method chaining.</returns>
    public TypeMergerPolicy Ignore(Expression<Func<object>> ignoreProperty)
    {
      IgnoredProperties.Add(GetObjectTypeAndProperty(ignoreProperty));

      return this;
    }


    /// <summary>
    /// Specify a property to use when there is a property name collision between objects being merged.
    /// </summary>
    /// <param name="useProperty"></param>
    /// <returns>TypeMerger policy used in method chaining.</returns>
    public TypeMergerPolicy Use(Expression<Func<object>> useProperty)
    {
      UseProperties.Add(GetObjectTypeAndProperty(useProperty));

      return this;
    }


    /// <summary>
    ///   /// Merge two different object instances into a single object which is a super-set of the properties of both objects. 
    /// If property name collision occurs and no policy has been created to specify which to use using the .Use() method the property value from 'values1' will be used.
    /// </summary>
    /// <param name="values1">An object to be merged.</param>
    /// <param name="values2">An object to be merged.</param>
    /// <returns>New object containing properties from both objects</returns>
    public object Merge(object values1, object values2)
    {
      return Merger.Merge(values1, values2, this);
    }


    /// <summary>
    /// Inspects the property specified to get the underlying Type and property name to be used during merging.
    /// </summary>
    /// <param name="property">The property to inspect as a Func Expression.</param>
    /// <returns></returns>
    private static Tuple<string, string> GetObjectTypeAndProperty(Expression<Func<object>> property)
    {
      var objType = String.Empty;
      string propName;

      try
      {
        var memberExpression = property.Body as MemberExpression;

        if (memberExpression != null)
        {
          if (memberExpression.Member.ReflectedType != null)
            objType = memberExpression.Member.ReflectedType.UnderlyingSystemType.Name;

          propName = memberExpression.Member.Name;
        }
        else
        {
          var unaryExpression = property.Body as UnaryExpression;
          if (unaryExpression != null)
          {
            var reflectedType = ((MemberExpression)unaryExpression.Operand).Member.ReflectedType;

            if (reflectedType != null)
              objType = reflectedType.UnderlyingSystemType.Name;

            propName = ((MemberExpression)unaryExpression.Operand).Member.Name;
          }
          else
          {
            throw new Exception("Expression type unknown.");
          }
        }
      }
      catch (Exception ex)
      {
        throw new Exception("Error in TypeMergePolicy.GetObjectTypeAndProperty.", ex);
      }

      return new Tuple<string, string>(objType, propName);
    }
  }
}