using System;
using System.IO;
using System.Xml.Serialization;


namespace FinCarCom.Common
{
  public class XmlConvert
  {
    /// <summary>
    /// Desrializes a string of XML to given object type.
    /// </summary>
    /// <typeparam name="T">Object type</typeparam>
    /// <param name="xmlString">A string representation of XML</param>
    /// <returns>An object or null.</returns>
    public static T DeserializeObject<T>(string xmlString)
    {
      if (String.IsNullOrEmpty(xmlString))
      {
        return (T)new object();
      }

      var xser = new XmlSerializer(typeof(T));

      using (var srdr = new StringReader(xmlString))
      {
        return (T)xser.Deserialize(srdr);
      }
    }
  }
}