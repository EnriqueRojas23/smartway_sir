

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.TYS.Seguimiento
{
    public class Falla : Entity
    {
        [Key]
        public int idfalla { get; set; }
        public string codigosmartway { get; set; }
        public string descripcion { get; set; }
        public int idtipoproducto { get; set; }
        public int idfabricante { get; set; }
        public int idcategoriafalla { get; set; }
        public int idtipofalla { get; set; }
        public bool activo { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }

    }
}
