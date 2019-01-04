

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.TYS.Seguimiento;
using System;
using System.Linq;
namespace CommandHandlers.TYS
{
    public class InsertarActualizarReparacionHandler : ICommandHandler<InsertarActualizarReparacionCommand>
    {
        private readonly IRepository<Reparacion> _ReparacionRepository;


        public InsertarActualizarReparacionHandler(IRepository<Reparacion> pReparacionRepository)
        {
            this._ReparacionRepository = pReparacionRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarReparacionCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");

            Reparacion dominio = null;
            if (command.idreparacion.HasValue)
                dominio = _ReparacionRepository.Get(x => x.idreparacionsmartway == command.idreparacion).LastOrDefault();
            else
                dominio = new Reparacion();

            //if (!command.idreparacion.HasValue)
            //{
            //    dominio.fechahoraregistro = command.fechahoraregistro;
            //    dominio.idusuarioregistro = command.idusuarioregistro;
            //}
            dominio.activo = command.activo;
            dominio.codigosmartway = command.codigosmartway;
            dominio.descripcion = command.descripcion;
            dominio.idcategoriareparacion = command.idcategoriareparacion;
            //dominio.idfabricante = command.idfabricante;
            dominio.idnivelreparacion = command.idnivelreparacion;
            //dominio.idtipoproducto = command.idtipoproducto;
            //dominio.idtiporeparacion = command.idtiporeparacion; 
            

            try
            {
                if (!command.idreparacion.HasValue)
                    _ReparacionRepository.Add(dominio);
                _ReparacionRepository.Commit();


                return new InsertarActualizarReparacionOutput() {  idreparacion = dominio.idreparacionsmartway };

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
