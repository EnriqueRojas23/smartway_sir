

using CommandContracts.Common;
using System;
    
namespace CommandContracts.Smartway.Agendamiento
{
    public class InsertarIncidenciaEvaluacionCommand : Command
    {
        public long? idevaluaciongarantia { get; set; }
        public long idincidencia { get; set; }
        public int idcondicion { get; set; }
        public bool valor { get; set; }
        public string observacion { get; set; }
        public int idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }


    }
}
