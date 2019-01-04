using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Recepcion.Models
{
    public class DocumentoRecepcionModel
    {
        public long? iddocumentorecepcion { get; set; }
        public string numerodocumento { get; set; }
        public string documentocliente { get; set; }
        public string dua { get; set; }
        public string numerofacturacomercial { get; set; }
        public DateTime? fechafacturacomercial { get; set; }
        public int idtiporecibo { get; set; }
        public string guiaremision { get; set; }
        public int idfabricante { get; set; }
        public int idcliente { get; set; }
        public int idpartner { get; set; }
        public int idproducto { get; set; }
        public int idorigen { get; set; }
        public bool activo { get; set; }
        public DateTime? fechahoraregistro { get; set; }

        public DateTime fechahoracargaarchivo { get; set; }
        public DateTime idusuariorecepcion { get; set; }

        public DateTime? fechahorarecepcion { get; set; }

        public int idusuarioregistro { get; set; }
        public int idsucursal { get; set; }
        public int idalmacen { get; set; }
        public string ruta { get; set; }
        public string pallet { get; set; }
        public string archivo { get; set; }

        public string documentcompra { get; set; }
        public long? idordenservicio { get; set; }

        public string TipoRecibo { get; set; }

        public string partner { get; set; }
        public string fabricante { get; set; }

        public string UsuarioRegistro { get; set; }
        public string numeroordenservicio { get; set; }
        public string Origen { get; set; }


    }
}