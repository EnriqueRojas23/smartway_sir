using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Domain.Smartway.Despacho
{
    public class OrdenSalida : Entity
    {
        public long iddocumentosalida { get; set; }
        public string numerodocumento { get; set; }
        public int idcliente { get; set; }
        public int idtiposalida { get; set; }
        public bool activo { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public DateTime fechasalida { get; set; }
        public int idusuarioregistro { get; set; }
    }
}
