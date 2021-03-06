﻿using System.Collections.Generic;


namespace FinCarCom.Services.Domain.Models.Common
{
  public static class ResidenceTypeTranslator
  {
    private static readonly List<IType> Types;

    static ResidenceTypeTranslator()
    {
      Types = new List<IType>
      {
        new Type {Name = "None", Id = 0},
        new Type {Name = "Own", Id = 1},
        new Type {Name = "Rent", Id = 2},
        new Type {Name = "Land Contract", Id = 3},
        new Type {Name = "Live w/Parents", Id = 4},
        new Type {Name = "Other", Id = 5}
      };
    }

    public static IType None => Types[0];

    public static IType Excellent => Types[1];

    public static IType Good => Types[2];

    public static IType Fair => Types[3];

    public static IType Poor => Types[4];


    public static IType FindById(int id)
    {
      return Types.Find(t => t.Id == id);
    }

    public static IType FindByName(string name)
    {
      return Types.Find(t => t.Name == name);
    }


    public interface IType
    {
      string Name { get; }

      int Id { get; }
    }

    public class Type : IType
    {
      public string Name { get; set; }

      public int Id { get; set; }
    }
  }
}