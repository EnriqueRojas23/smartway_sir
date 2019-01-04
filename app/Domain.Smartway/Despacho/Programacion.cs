

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Despacho
{
    public class Programacion : Entity
    {
        [Key]
        public int idprogramacion { get; set; }
        public string numero { get; set; }
        public int idsucursalorigen { get; set; }
        public int idsucursaldestino { get; set; }
        public DateTime fecharecojo { get; set; }
        public int idtransportista { get; set; }
        public int idestado { get; set; }
        public int idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }
    }
}
