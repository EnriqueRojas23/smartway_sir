

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.TYS.Seguimiento;
using System;
using System.Linq;
namespace CommandHandlers.TYS
{
    public class InsertarActualizarFallaHandler : ICommandHandler<InsertarActualizarFallaCommand>
    {
        private readonly IRepository<Falla> _FallaRepository;


        public InsertarActualizarFallaHandler(IRepository<Falla> pFallaRepository)
        {
            this._FallaRepository = pFallaRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarFallaCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");

            Falla dominio = null;
           if (command.idfalla.HasValue)
               dominio = _FallaRepository.Get(x => x.idfalla == command.idfalla).LastOrDefault();
            else
               dominio = new Falla();


            if (!command.idfalla.HasValue)
            {
                dominio.fechahoraregistro = command.fechahoraregistro;
                dominio.idusuarioregistro = command.idusuarioregistro;
            }
            dominio.activo = command.activo;
            dominio.codigosmartway = command.codigosmartway;
            dominio.descripcion = command.descripcion;
            dominio.idcategoriafalla= command.idcategoriafalla;
            dominio.idfabricante = command.idfabricante;
            dominio.idtipofalla = command.idtipofalla;
            dominio.idtipoproducto = command.idtipoproducto;
            

            try
            {
                if (!command.idfalla.HasValue)
                    _FallaRepository.Add(dominio);
                _FallaRepository.Commit();


                return new InsertarActualizarFallaOutput() { idfalla = dominio.idfalla };

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
