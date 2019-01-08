namespace Web.Coolbox.Areas.Delivery.Models.Pedidos
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    using System.Web.Mvc;

    public class DetailsModel
    {
        public Int64 ped_int_id { get; set; }
        public Int64 dped_int_id { get; set; }

        public string ped_str_numero { get; set; }

        public string est_str_descrip { get; set; }

        public int est_int_id { get; set; }

        public string ped_dat_fechapedido { get; set; }

        public string co_clie { get; set; }

        public string cli_str_mail { get; set; }

        public string cli_str_telefono { get; set; }

        public string ped_str_direccion { get; set; }

        public string dis_str_descrip { get; set; }
        
        public string ped_str_referenciadireccion { get; set; }

        public string tie_str_descrip { get; set; }

        public int tie_int_id { get; set; }

        public string mot_str_placa { get; set; }

        public string mot_str_conductor { get; set; }

        public string pro_str_razsocial { get; set; }

        public string med_str_descrip { get; set; }

        public string tip_str_descrip { get; set; }

        public decimal ped_dec_montopagar { get; set; }


        public string Verificado { get; set; }

        public string AsignarTienda { get; set; }

        public string AsignarTransporte { get; set; }

        public List<ListarProductos> ListaProductosModel { get; set; }

       
    
    }

    public class ListarProductos
    {
        public Int64 dpe_int_id { get; set; }

        public string pro_str_descripcion { get; set; }

        public int dpe_int_cantidad { get; set; }

        public decimal dpe_dec_preciounitario { get; set; }
            
        public decimal dpe_dec_subtotal { get; set; }
    }

  

}