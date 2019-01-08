using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace Web.Smartway.Areas.Mantenimiento.Models
{
   
    public class GarantiaModel
    {
        public int? idgarantia { get; set; }
        public int idpartner { get; set; }
        public int idcopiapartner { get; set; }
        public bool smartway { get; set; }
        public int idfabricante { get; set; }
        public int idtipoproducto { get; set; }
        public int idtipogarantia { get; set; }
        public int periodo { get; set; }
        public bool documentocompra { get; set; }
        public bool reparacion { get; set; }
        public bool activo { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
        public string fabricante { get; set; }
        public string tipoproducto { get; set; }
        public string tipogarantia { get; set; }

        public string descripcion { get; set; }
        public bool resultado { get; set; }

        public int __tipooperacion { get; set; }



    }
    public class TipoGarantiaModel
    {
        public int idtipogarantia { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public bool logica { get; set; }
        public bool venta { get; set; }
        public bool activo { get; set; }
    }



    



   
}
