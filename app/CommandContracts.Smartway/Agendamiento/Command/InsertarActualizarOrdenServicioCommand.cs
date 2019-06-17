

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Agendamiento
{
    public class InsertarActualizarOrdenServicioCommand : Command
    {
        public long? idordenserviciotecnico { get; set; }
        public string numeroordenservicio { get; set; }
        public int idtipoordenservicio { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuario { get; set; }
        public long? idincidencia { get; set; }
        public int idcliente { get; set; }
        public int idpartner { get; set; }
        public int idestado { get; set; }
        public bool cambioproducto { get; set; }
        public int? iddocumentosalida { get; set; }
        public long? iddocumentorecepcion { get; set; }
        public DateTime? fechahorapruebacambio { get; set; }

        public DateTime? fecharecepcion { get; set; }
        public DateTime? fechadocumento { get; set; }


        public int? idusuarioapruebacambio { get; set; }
        public bool activo { get; set; }
        public bool engarantia { get; set; }
        public int idtipogarantia { get; set; }
        public bool cotizado { get; set; }
        public int idproducto { get; set; }
        public int __tipooperacion { get; set; }

        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }

        public int idsucursalorigen { get; set; }
        public int idsucursaldestino { get; set; }
        public bool delivery { get; set; }
        public int? iddirecciondelivery { get; set; }


        public long idinventario { get; set; }

      
    }
}
