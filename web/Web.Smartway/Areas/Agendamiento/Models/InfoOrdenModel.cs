using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Agendamiento.Models
{
    public class InfoOrdenModel
    {

        public string numeroincidencia { get; set; }
        public string producto { get; set; }
        
        public string codigoproducto { get; set; }
        public string falla { get; set; }
        public DateTime fechaasignacion { get; set; }
            

    }
}