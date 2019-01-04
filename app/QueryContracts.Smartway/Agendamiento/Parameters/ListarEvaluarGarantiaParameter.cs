
namespace QueryContracts.Smartway.Agendamiento.Incidencias.Parameters
{
    using QueryContracts.Common;
    using System;

    public class ListarEvaluarGarantiaParameter : QueryParameter
    {

        public int idtipoproducto { get; set; }
        public int idfabricante { get; set; }
        public int? idpartner { get; set; }

    }
}


