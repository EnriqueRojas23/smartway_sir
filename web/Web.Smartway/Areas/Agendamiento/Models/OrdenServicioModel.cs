using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Agendamiento.Models
{
    public class OrdenServicioModel
    {
        public long? idordenserviciotecnico { get; set; }
        public long idinventario { get; set; }
        public string numeroordenservicio { get; set; }
        public int idtipoordenservicio { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuario { get; set; }
        public long? idincidencia { get; set; }
        public int idcliente { get; set; }
        public int idpartner { get; set; }
        public int idestado { get; set; }
        public string ostestado { get; set; }
        public string otestado { get; set; }
        public bool cambioproducto { get; set; }
        public int iddocumentosalida { get; set; }
        public long iddocumentorecepcion { get; set; }
        public DateTime? fechahorapruebacambio { get; set; }
        public DateTime? fechadocumento { get; set; }
        public DateTime? fecharecepcion { get; set; }
        public int? idusuarioapruebacambio { get; set; }
        public long? idordentrabajo { get; set; }
        public string numeroot { get; set; }
        public DateTime? fechaAsignacion { get; set; }
        public string tipoordenservicio { get; set; }
        public string numeroost { get; set; }
        public int idproducto { get; set; }
        public int idtipoproducto { get; set; }
        

        public string tecnicoAsignado { get; set; }
        public string bounce { get; set; }
        public string ostidestado { get; set; }
        
        public string tiempo { get; set; }
        public int? idtecnico { get; set; }
        public bool activo { get; set; }

        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }
        
        public string imei_escaneado { get; set; }
        public bool imei_coincide { get; set; }
        public bool documento_coincide { get; set; }
        
        public bool recepciondestino { get; set; }
        public bool requiereimei { get; set; }
        public bool recepcionalmacen { get; set; }
        public int __tipooperacion { get; set; }

        public int anioincindecia { get; set; }
        public string numincidencia { get; set; }
        public DateTime? fechahorainicio { get; set; }
        public DateTime? fechahorafin { get; set; }
        public bool engarantia { get; set; }
        public int idtipogarantia { get; set; }
        public bool? cotizado { get; set; }


        public int idsucursalorigen { get; set; }
        public int idsucursaldestino { get; set; }
        public bool delivery { get; set; }
        public int? iddirecciondelivery { get; set; }

        public string accesorios { get; set; }

        public string modelo { get; set; }


        #region Prop para el seguimiento

        public string sucursalorigen { get; set; }
        public string sucursaldestino { get; set; }
        public string nombrecliente { get; set; }
        public string numerodocumento { get; set; }
        public string producto { get; set; }
        public string codigoproducto { get; set; }

        public string estado { get; set; }
        #endregion

    }
}