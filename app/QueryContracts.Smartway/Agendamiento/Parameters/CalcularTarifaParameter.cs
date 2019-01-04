
namespace QueryContracts.Smartway.Agendamiento.Incidencias.Parameters
{
    using QueryContracts.Common;
    public class CalcularTarifaParameter : QueryParameter
    {

        public int idtipoproducto  { get; set; }
        public int idnivelreparacion { get; set; }
        public int idpartner { get; set; }

    }
}


