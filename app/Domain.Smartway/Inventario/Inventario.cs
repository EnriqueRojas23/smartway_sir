

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Inventario
{
    public class InventarioGeneral : Entity
    {
        [Key]
        public long idinventario { get; set; }
        public int idalmacen { get; set; }
        public int idpartner { get; set; }
        public int iddocumentorecepcion { get; set; }
        public int idproducto { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }
        public int cantidad { get; set; }
        public int idestado { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public string pallet { get; set; }
        public string ubicacion { get; set; }
        public string caja { get; set; }
        public int idusuarioregistro { get; set; }
    }
}
