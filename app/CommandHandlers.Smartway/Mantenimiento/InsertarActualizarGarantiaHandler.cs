using CommandContracts.Common;
using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Mantenimiento;
using System;
using System.Linq;

namespace CommandHandlers.Smartway
{
    public class InsertarActualizarGarantiaHandler : ICommandHandler<InsertarActualizarGarantiaCommand>
    {
        private readonly IRepository<Garantia> _GarantiaRepository;

        public InsertarActualizarGarantiaHandler(IRepository<Garantia> pGarantiaRepository)
        {
            this._GarantiaRepository = pGarantiaRepository;
        }

        public CommandResult Handle(InsertarActualizarGarantiaCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una garantia");

            Garantia dominio = null;
            if (command.idgarantia.HasValue)
                dominio = _GarantiaRepository.Get(x => x.idgarantia == command.idgarantia).LastOrDefault();
            else
                dominio = new Garantia();

            if (command.__tipooperacion == 2)
            {
                dominio.activo = command.activo;
            }
            else
            {
                dominio.activo = command.activo;
                dominio.documentocompra = command.documentocompra;
                dominio.idfabricante = command.idfabricante;
                dominio.idpartner = command.idpartner;
                dominio.idtipogarantia = command.idtipogarantia;
                dominio.idtipoproducto = command.idtipoproducto;
                dominio.periodo = command.periodo;
                dominio.reparacion = command.reparacion;
            }

            if (!command.idgarantia.HasValue)
            {
                dominio.idusuarioregistro = command.idusuarioregistro;
                dominio.fechahoraregistro = command.fechahoraregistro;
            }

            try
            {
                if (!command.idgarantia.HasValue)
                    _GarantiaRepository.Add(dominio);
                _GarantiaRepository.Commit();

                return new InsertarActualizarGarantiaOutput() {   idgarantia = dominio.idgarantia };
            }
            catch (Exception ex)
            {
              
                throw;
            }
        }
    }
}