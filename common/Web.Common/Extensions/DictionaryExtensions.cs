using System.Collections.Generic;
namespace Web.Common.Extensions
{
    public static class DictionaryExtensions
    {
        /// <summary>
        /// Devuelve el valor por defecto de tipo U si la clave no existe en el diccionario
        /// </summary>
        public static U GetOrDefault<T, U>(this Dictionary<T, U> dic, T key)
        {
            if (dic.ContainsKey(key)) return dic[key];
            return default(U);
        }

        /// <summary>
        /// Devuelve un valor existente para la tecla T U, o crea una nueva 
        /// instancia de tipo T utilizando el constructor por defecto, lo añade al diccionario y lo devuelve.
        /// </summary>
        public static U GetOrInsertNew<T, U>(this Dictionary<T, U> dic, T key)
            where U : new()
        {
            if (dic.ContainsKey(key)) return dic[key];
            U newObj = new U();
            dic[key] = newObj;
            return newObj;
        }
    }
}
