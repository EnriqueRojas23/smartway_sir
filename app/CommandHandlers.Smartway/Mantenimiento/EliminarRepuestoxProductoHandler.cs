

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
    public class EliminarRepuestoxProductoHandler : ICommandHandler<EliminarRepuestoxProductoCommand>
    {
        private readonly IRepository<RepuestoxProducto> _RepuestoxProductoRepository;


        public EliminarRepuestoxProductoHandler(IRepository<RepuestoxProducto> pRepuestoxProductoRepository)
        {
            this._RepuestoxProductoRepository = pRepuestoxProductoRepository;
        }

        public CommandContracts.Common.CommandResult Handle(EliminarRepuestoxProductoCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una elemento");
            var dominio = _RepuestoxProductoRepository.Get(x => x.idproducto.Equals(command.idproducto)).ToList();
            try
            {
                foreach (var item in dominio)
                {
                    _RepuestoxProductoRepository.Delete(item);
                    _RepuestoxProductoRepository.Commit();
                }
                return new InsertarActualizarRepuestoxReparacionOutput() {  idrepuestoreparacion    =command.idproducto  };
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
