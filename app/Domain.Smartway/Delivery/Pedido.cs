
namespace Domain.Smartway.Delivery
{
    using Domain.Common;
    using System;

    public class Pedido : Entity
    {
        public int est_int_id { get; set; }
        public string ped_str_numero  { get; set; }
        public int? tie_int_id { get; set; }
        public int? mot_int_id { get; set; }

        public long? hr_int_id { get; set; }

    }

   
}
