

using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ObtenerProductoResult : QueryResult
    {
        public int idproducto { get; set; }
        public string codigoproducto { get; set; }
        public bool repuesto { get; set; }
        public int idtipoproducto { get; set; }
        public int idtipomercaderia { get; set; }
        public int idfabricante { get; set; }
        public string descripcioncorta { get; set; }
        public string descripcionlarga { get; set; }
        public int idfamilia { get; set; }
        public int idmodelo { get; set; }
        public int idcolor { get; set; }
        public decimal peso { get; set; }
        public decimal volumen { get; set; }
        public int idcapacidad { get; set; }
        public bool original { get; set; }
        public int idorigen { get; set; }
        public decimal stockminimo { get; set; }
        public decimal stockmaximo { get; set; }
        public decimal porcentajedescuento { get; set; }
        public int idmoneda { get; set; }
        public decimal costounitario { get; set; }
        public decimal preciounitario { get; set; }
        public int idvoltaje { get; set; }
        public int idbanda { get; set; }
        public int idprocesador { get; set; }
        public int idpantalla { get; set; }
        public int idcamaraposterior { get; set; }
        public int idcamarafrontal { get; set; }
        public int idmemoriaflash { get; set; }
        public int idmemoriaram { get; set; }
        public int idsistemaoperativo { get; set; }
        public int idrequisitoascanear { get; set; }
        public string imagen { get; set; }
        public bool activo { get; set; }
        public bool unico_reparacion { get; set; }
    }
}
