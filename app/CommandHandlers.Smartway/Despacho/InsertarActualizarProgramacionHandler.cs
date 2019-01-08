

using CommandContracts.Smartway.Despacho;
using CommandContracts.Smartway.Despacho.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Despacho;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarProgramacionHandler : ICommandHandler<InsertarActualizarProgramacionCommand>
    {
        private readonly IRepository<Programacion> _ProgramacionRepository;


        public InsertarActualizarProgramacionHandler(IRepository<Programacion> pProgramacionRepository)
        {
            this._ProgramacionRepository = pProgramacionRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarProgramacionCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


            Programacion dominio = null;
           if (command.idprogramacion.HasValue)
               dominio = _ProgramacionRepository.Get(x => x.idprogramacion == command.idprogramacion).LastOrDefault();
            else
               dominio = new Programacion();

            switch (command.__tipooperacion)
            {
                case 1:
                    dominio.fechahoraregistro = command.fechahoraregistro;
                    dominio.fecharecojo = command.fecharecojo;
                    dominio.idestado = command.idestado;
                    dominio.idsucursaldestino = command.idsucursaldestino;
                    dominio.idsucursalorigen = command.idsucursalorigen;
                    dominio.idtransportista = command.idtransportista;
                    dominio.idusuarioregistro = command.idusuarioregistro;
                    dominio.numero = command.numero;
                    break;
                case 2:
                    break;
                default:
                    break;
            }
               


            try
            {
                if (!command.idprogramacion.HasValue)
                    _ProgramacionRepository.Add(dominio);
                _ProgramacionRepository.Commit();


                return new InsertarActualizarProgramacionOutput() {    idprogramacion = dominio.idprogramacion };

            }
            catch (Exception ex)
            {
              //  _ValortablaRepository.Delete(dominio);
                //_ValortablaRepository.Commit();
                throw;
            }

        }
    }
}
