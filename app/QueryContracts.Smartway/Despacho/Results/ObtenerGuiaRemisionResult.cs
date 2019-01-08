namespace QueryContracts.Smartway.Despacho.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;


    public class ObtenerGuiaRemisionResult : QueryResult
    {

        public long idguiaremision { get; set; }
        public string numeroguia { get; set; }
        public int idsucursalorigen { get; set; }
        public int idsucursaldestino { get; set; }
        public int idtipoguiaremision { get; set; }

    }

}