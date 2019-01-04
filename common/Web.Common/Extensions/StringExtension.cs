
using System;
using System.Collections;
using System.Text.RegularExpressions;
using System.Linq;
using System.Collections.Generic;
namespace Web.Common.Extensions
{
    public static class StringExtension
    {
        public static bool IsFormatSearch(this String str)
        {
            char[] caracteres = { ':', '{', '}' };
            var pos = str.IndexOfAny(caracteres);
            return pos > 0;
        }
        public static Dictionary<string, string> FormatSearch(this String str)
        {
            var resultado = new Dictionary<string, string>();
            if (!str.IsFormatSearch()) return null;

            char[] caracteres = {'{', '}' };
            string[] filtros =  str.Split(caracteres);
            
            //quitando los espacios en blanco
            filtros = filtros.Where(x => String.IsNullOrWhiteSpace(x) == false).ToArray();
            foreach(var s in filtros) {
                var array1 = s.Split(new char[]{':'});
                if(array1.Length > 0){
                    resultado.Add(array1[0], array1[1]);
                }
            }

            return resultado;

        }


    }
}
