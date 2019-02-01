    using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web.Smartway.Areas.Agendamiento.Models;

namespace Web.Smartway.Areas.Reparacion.Models
{

    public class OrdenTrabajoModel : IncidenciaModel
    {
        public long? idordentrabajo { get; set; }
        public string numeroordentrabajo { get; set; }
        public int idtecnico { get; set; }
        public int idtecnicoqc { get; set; }
        public long idordentrabajotiempo { get; set; }
        public long incidencia { get; set; }
        public int bounce { get; set; }
        public bool detenida { get; set; }
        public int iddiagnostico { get; set; }
        public int idreparacion { get; set; }
        public int idrepuesto { get; set; }
        public DateTime? fechahoraasignacion { get; set; }
        public DateTime? fechahorainicio { get; set; }
        public DateTime? fechahorafin { get; set; }
        public TimeSpan tiempotranscurrido { get; set; }
        public DateTime tiempotrabajo { get; set; }
        public string tecnico { get; set; }
        public bool cotizado { get; set; }
        public int idtipoordenservicio { get; set; }

        public string pallet { get; set; }



        public DateTime? lapse1_inicio  { get; set; }
        public DateTime? lapse2_inicio { get; set; }
        public DateTime? lapse3_inicio { get; set; }
        public DateTime? lapse4_inicio { get; set; }
        public DateTime? lapse5_inicio { get; set; }
        public DateTime? lapse6_inicio { get; set; }
        public DateTime? lapse7_inicio { get; set; }
        public DateTime? lapse8_inicio { get; set; }
        public DateTime? lapse9_inicio { get; set; }
        public DateTime? lapse10_inicio { get; set; }

        public DateTime? lapse1_fin { get; set; }
        public DateTime? lapse2_fin { get; set; }
        public DateTime? lapse3_fin { get; set; }
        public DateTime? lapse4_fin { get; set; }
        public DateTime? lapse5_fin { get; set; }
        public DateTime? lapse6_fin { get; set; }
        public DateTime? lapse7_fin { get; set; }
        public DateTime? lapse8_fin { get; set; }
        public DateTime? lapse9_fin { get; set; }
        public DateTime? lapse10_fin { get; set; }


        public List<DateTime?> inicios { get; set; }
        public List<DateTime?> fines { get; set; }

    }
    public class OrdenTrabajoDetalleModel
    {

        public int item { get; set; }
        public long? idordentrabajodetalle { get; set; }
        public long idordentrabajo { get; set; }
        public string descripcion { get; set; }
        public int iddiagnostico { get; set; }
        public int idreparacion { get; set; }
        public int idrepuesto { get; set; }
        public decimal costo { get; set; }
        public string diagnostico { get; set; }
        public string reparacion { get; set; }
        public string repuesto { get; set; }
        public bool activo { get; set; }
        public bool servicio { get; set; }
        public long? idservicioasociado { get; set; }
        public long? idinventario { get; set; }
        public String idnivelreparacion { get; set; }
        public int __idoperacion { get; set; }

    }
}
