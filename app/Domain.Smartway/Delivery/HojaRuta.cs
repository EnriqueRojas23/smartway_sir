using Domain.Common;


namespace Domain.Smartway.Delivery
{
    public class HojaRuta : Entity
    {
        public string hr_str_numero { get; set; }
        public int mot_int_id { get; set; }
        public decimal? hr_dec_totalpedido { get; set; }

        public decimal? hr_dec_efectivoaentregar { get; set; }

        public decimal? hr_dec_totalvuelto { get; set; }

        public decimal? hr_dec_totalvisa { get; set; }

        public decimal? hr_dec_totalmc { get; set; }

        public int hr_int_estado { get; set; }

        public decimal? hr_dec_montoefectivo { get; set; }

        public decimal? hr_dec_montovoucher { get; set; }
        public decimal? hr_desc_resptransporte { get; set; }

    }
}
