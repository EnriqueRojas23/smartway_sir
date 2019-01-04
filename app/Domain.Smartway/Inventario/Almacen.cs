

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Inventario
{
    public class Almacen : Entity
    {
        [Key]
        public int idalmacen { get; set; }
        public string codigoalmacen { get; set; }
        public string nombrealmacen { get; set; }
        public int idsucursal { get; set; }
        public int idtipoalmacen { get; set; }
        public bool activo { get; set; }
    }
}
