

using CommandContracts.Common;
using CommandContracts.Smartway.Inventario;
using CommandContracts.Smartway.Inventario.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Inventario;

using System;
using System.Linq;
namespace CommandHandlers.Smartway.Inventario
{
    public class InsertarActualizarAlmacenHandler : ICommandHandler<InsertarActualizarAlmacenCommand>
    {
        private readonly IRepository<Almacen> _AlmacenRepository;


        public InsertarActualizarAlmacenHandler(IRepository<Almacen> pAlmacenRepository)
        {
            this._AlmacenRepository = pAlmacenRepository;
        }

        public CommandResult Handle(InsertarActualizarAlmacenCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


            Almacen dominio = null;
           if (command.idalmacen.HasValue)
               dominio = _AlmacenRepository.Get(x => x.idalmacen == command.idalmacen).LastOrDefault();
            else
               dominio = new Almacen();

            switch (command.__tipooperacion)
            {
                case 1:
                    dominio.activo = command.activo;
                    dominio.codigoalmacen = command.codigoalmacen;
                    dominio.idsucursal = command.idsucursal;
                    dominio.idtipoalmacen = command.idtipoalmacen;
                    dominio.nombrealmacen = command.nombrealmacen;
                    break;
                case 2:
                    dominio.activo = command.activo;
                    break;

                default:
                    break;
            }
           



            try
            {
                if (!command.idalmacen.HasValue)
                    _AlmacenRepository.Add(dominio);
                _AlmacenRepository.Commit();


                return new InsertarActualizarAlmacenOutput() {      idalmacen = dominio.idalmacen };

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
