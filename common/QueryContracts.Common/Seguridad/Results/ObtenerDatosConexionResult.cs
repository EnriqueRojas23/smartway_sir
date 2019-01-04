using System;
namespace QueryContracts.Common
{
    public class ObtenerDatosConexionResult : QueryResult
    {
        public Int32 Rol_int_id { get; set; }
        public string Rol_str_alias { get; set; }
        public string Usuario { get; set; }
        public string Clave { get; set; }
       
    }
}
