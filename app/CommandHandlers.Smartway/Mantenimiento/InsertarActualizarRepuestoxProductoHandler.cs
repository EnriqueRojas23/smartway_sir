

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Mantenimiento;
using Domain.TYS.Seguimiento;
using System;
using System.Linq;
namespace CommandHandlers.TYS
{
    public class InsertarActualizarRepuestoxProductoHandler : ICommandHandler<InsertarActualizarRepuestoxProductoCommand>
    {
        private readonly IRepository<RepuestoxProducto> _RepuestoxProductoRepository;


        public InsertarActualizarRepuestoxProductoHandler(IRepository<RepuestoxProducto> pRepuestoxProductoRepository)
        {
            this._RepuestoxProductoRepository = pRepuestoxProductoRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarRepuestoxProductoCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");

            RepuestoxProducto dominio = null;
            if (command.idrepuestoxproducto.HasValue)
                dominio = _RepuestoxProductoRepository.Get(x => x.idrepuestoxproducto == command.idrepuestoxproducto).LastOrDefault();
            else
                dominio = new RepuestoxProducto();

            dominio.idproducto = command.idproducto;
            dominio.idrepuesto = command.idrepuesto;

            try
            {
                if (!command.idrepuestoxproducto.HasValue)
                    _RepuestoxProductoRepository.Add(dominio);
                _RepuestoxProductoRepository.Commit();


                return new InsertarActualizarRepuestoxProductoOutput() {    idrepuestoxproducto = dominio.idrepuestoxproducto };

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
