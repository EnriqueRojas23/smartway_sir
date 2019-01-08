

using Domain.Common;
using System;
namespace Domain.Smartway.Delivery
{
    public class Transferencia : Entity
    {
        public int pro_int_id { get; set; }
        public int tra_int_cant { get; set; }
        public int tie_int_origen { get; set; }
        public int tie_int_destino { get; set; }
        public int tie_int_estado { get; set; }
        public long ped_int_id { get; set; }
        public string nro_guia_remision { get; set; }
        public string tra_str_guiaremision { get; set; }
    }
}
