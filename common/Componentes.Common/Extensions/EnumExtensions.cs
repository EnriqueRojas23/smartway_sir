
using System;
using System.ComponentModel;
using System.Reflection;
using Componentes.Common.CustomAttributes;

namespace Componentes.Common.Extensions
{
    public static class EnumExtensions
    {
        public static string GetStringValue(this Enum value)
        {

            DescriptionAttribute[] attributes = (DescriptionAttribute[])value.GetType().GetField(value.ToString()).GetCustomAttributes(typeof(DescriptionAttribute), false);
            return attributes.Length > 0 ? attributes[0].Description : string.Empty;
        }
    }
}
