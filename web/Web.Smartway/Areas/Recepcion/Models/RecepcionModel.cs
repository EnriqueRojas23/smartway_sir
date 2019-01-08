using System;

namespace Web.Smartway.Areas.Recepcion.Models
{
    public class RecepcionModel
    {
        public long idguiaremision { get; set; }
        public string numeroguia { get; set; }
        public DateTime fechaemision { get; set; }
        public int tipoDocInterno { get; set; }
        public bool recepcionFinalizadaAlmacen { get; set; }
        //public List<ListarDetalleGuiaDto> DetalleGuia { get; set; }
        //public List<ListarSobrantesGuiaDto> DetalleSobrantes { get; set; }
        public int idusuario { get; set; }
        public int idsucursalorigen { get; set; }
        public int idsucursaldestino { get; set; }


        public string numeroordenservicio { get; set; }
        public string fechainicio { get; set; }
        public string fechafin { get; set; }
        public int idestado { get; set; }
        public int idtecnico { get; set; }

        public string serie { get; set; }
    }


}