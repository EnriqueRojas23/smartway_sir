
namespace QueryContracts.Smartway.Agendamiento.Incidencias.Parameters
{
    using QueryContracts.Common;
    using System;

    public class ListarIncidenciaParameter : QueryParameter
    {

        public string fechainicio { get; set; }
        public string fechafin { get; set; }
        public string numeroincidencia { get; set; }
        public string numerodocumento { get; set; }


    }
}


