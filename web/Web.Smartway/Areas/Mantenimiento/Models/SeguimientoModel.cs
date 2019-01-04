using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace Web.Smartway.Areas.Mantenimiento.Models
{

    public class ClienteModel
    {
        public int? idcliente { get; set; }
        public string nombre { get; set; }
        public string numerodocumento { get; set; }
        public string nombrecorto { get; set; }
        public int? iddireccion { get; set; }
        public int idubigeo { get; set; }
        public string email { get; set; }
        public int idmoneda { get; set; }
        public string telefono { get; set; }
        public bool activo { get; set; }
        public string criterio { get; set; }
        public string ubigeo { get; set; }
        public int iddistrito { get; set; }
        public string codigodireccion { get; set; }
        public string direccion { get; set; }
        public string celular { get; set; }
        public int idtipodocumento { get; set; }
        public string tipodocumento { get; set; }
        public int idsexo { get; set; }
        public int __tipooperacion {get;set;}

    }
    public class ServicioModel
    {
        public long? idserviciooperacion { get; set; }
        public long idcarga { get; set; }
        public int idservicio { get; set; }
        public int cantidad { get; set; }
    }



    



   
}
