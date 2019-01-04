
using Domain.Common;
using System;
namespace Domain.Smartway.Delivery
{
    public class SeguimientoPedido : Entity
    {
        public Int64 ped_int_id { get; set; }
        public int? est_int_id { get; set; }
        public DateTime? seg_dat_fecha { get; set; }
        public string seg_str_comentario { get; set; }
        public int? mot_int_id { get; set; }
    }
}
