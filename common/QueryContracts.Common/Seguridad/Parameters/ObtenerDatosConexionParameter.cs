
using System;
namespace QueryContracts.Common
{
    public class ObtenerDatosConexionParameter : QueryParameter
    {
        public int? IdRol { get; set; }
        public string AliasUsuario { get; set; }
        public int? CodigoSistema { get; set; }
    }
}
