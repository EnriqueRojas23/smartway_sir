using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Reporte.Models
{
    public class ReporteModel
    {
        public DateTime fecinicio { get; set; }
        public DateTime fecfin { get; set; }
        public string idordenserviciotecnico { get; set; }
        public string imei { get; set; }
        public string numeroordenservicio { get; set; }
        public string fechahoraregistro { get; set; }
        public string cliente { get; set; }
        public string numerodocumento { get; set; }
        public string telefono { get; set; }
        public string email { get; set; }
        public string marca { get; set; }
        public string modelo { get; set; }
        public string fechaemision { get; set; }
        public string fallareportada { get; set; }
        public string observacioncliente { get; set; }
        public string garantia { get; set; }
        public string reparacion { get; set; }
        public string diagnostico { get; set; }
        public string Auriculares { get; set; }
        public string Bateria { get; set; }
        public string Cargador { get; set; }
        public string Cable { get; set; }
        public string Pilas { get; set; }
        public string Mica { get; set; }
        public string Protector { get; set; }
        public string Memoria { get; set; }
        public string OTG { get; set; }
        public string Simcard { get; set; }
        public string Manual { get; set; }
        public string Caja { get; set; }
        public int idestado { get; set; }


    }
}