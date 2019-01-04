
using System.ComponentModel.DataAnnotations;


namespace Web.Smartway.Areas.Mantenimiento.Models
{
    public class ProductoModel
    {

        public string codigo_search { get; set; }
        public int idtipoproducto_search { get; set; }
        public string descripcion_search { get; set; }
        public int idfabricante_search { get; set; }
        public int idmodelo_search { get; set; }
        public int? idproducto { get; set; }
        [Required(ErrorMessage = "Ingrese el código del producto.")]
        public string codigoproducto { get; set; }
        public string descripcioncorta { get; set; }
        public string descripcionlarga { get; set; }
        public bool? repuesto { get; set; }
        public int? idtipoproducto { get; set; }
        public int? idtipomercaderia { get; set; }
        public string tipoproducto { get; set; }
        public int? idfabricante { get; set; }
        public string fabricante { get; set; }
        public int? idmodelo { get; set; }
        public string modelo { get; set; }
        public int? idfamilia { get; set; }
        public decimal? peso { get; set; }
        public decimal? volumen { get; set; }
        public int? idmoneda { get; set; }
        public string moneda { get; set; }
        public decimal? preciounitario { get; set; }
        public bool activo { get; set; }
        public int? idcolor { get; set; }
        public int? idcapacidad { get; set; }
        public string ruta { get; set; }
        public decimal? descuento { get; set; }
        public int? idrequisitoascanear { get; set;   }
        public int? tipoog { get; set; }
        public int? idorigen { get; set; }
        public int? idvoltaje { get; set; }
        public int? idbanda { get; set; }
        public int? idprocesador { get; set; }
        public int? idpantalla { get; set; }
        public int? idcamaraposterior { get; set; }
        public int? idcamarafrontal { get; set; }
        public int? idmemoriaflash { get; set; }
        public int? idmemoriaram { get; set; }
        public int? idso { get; set; }

        public bool original { get; set; }
        public decimal stockminimo { get; set; }
        public decimal stockmaximo { get; set; }
        public decimal porcentajedescuento { get; set; }
        public decimal costounitario { get; set; }
        public int idsistemaoperativo { get; set; }
        public string imagen { get; set; }


        public bool requiereserie { get; set; }
        public bool requiereimei { get; set; }
        public int __tipooperacion { get; set; }

        public string serie { get; set; }
        public string imei { get; set; }
        public int idalmacen { get; set; }
        public long idinventario { get; set; }
        public int idestado { get; set; }
        public bool unico_reparacion { get; set; }

    }
}