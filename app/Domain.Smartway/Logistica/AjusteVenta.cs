namespace Domain.Smartway.Logistica
{
    using Domain.Common;
    using System;

    public class AjusteVenta : Entity
    {
        public string aju_str_tienda { get; set; }
        public string aju_str_tipo { get; set; }
        public string aju_str_numero { get; set; }
        public int aju_str_secuencia { get; set; }
        public string aju_str_item { get; set; }
        public int just_int_id { get; set; }
        public string aju_str_observacion { get; set; }
        public int aju_int_usrcreacion { get; set; }
        public DateTime aju_dat_fechcreacion { get; set; }
        public int aju_int_usrmodificacion { get; set; }
        public DateTime? aju_dat_fechmodificacion { get; set; }
        public DateTime? aju_dat_fechcierre { get; set; }
        public int aju_int_estado { get; set; }
    }
}

