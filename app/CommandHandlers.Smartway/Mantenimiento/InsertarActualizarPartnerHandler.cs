

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
    public class InsertarActualizarPartnerHandler : ICommandHandler<InsertarActualizarPartnerCommand>
    {
        private readonly IRepository<Partner> _PartnerRepository;


        public InsertarActualizarPartnerHandler(IRepository<Partner> pPartnerRepository)
        {
            this._PartnerRepository = pPartnerRepository;
        }

        public CommandResult Handle(InsertarActualizarPartnerCommand command)
        {
            Partner dominio = null;
            if (command.idpartner.HasValue)
                dominio = _PartnerRepository.Get(x => x.idpartner == command.idpartner).LastOrDefault();
            else
                dominio = new Partner();

            dominio.activo = command.activo;
            dominio.celular = command.celular;
            dominio.numerodocumento = command.numerodocumento;
            dominio.contacto = command.contacto;
            dominio.razonsocial = command.razonsocial;
            dominio.nombrecorto = command.nombrecorto;
            dominio.email = command.email;
            dominio.idcondicionentrega = command.idcondicionentrega;
            dominio.idcondicionrecojo = command.idcondicionrecojo;
            dominio.idcondicionpago = command.idcondicionpago;
            dominio.lineaconsumida = command.lineaconsumida;
            dominio.lineacredito = command.lineacredito;
            dominio.idtipodocumento = command.idtipodocumento;
            dominio.idmoneda = command.idmoneda;
            dominio.telefono = command.telefono;
            dominio.idtipopartner = command.idtipopartner;
            dominio.iddireccion = command.iddireccion;


            try
            {
                if (!command.idpartner.HasValue)
                    _PartnerRepository.Add(dominio);
                _PartnerRepository.Commit();


                return new InsertarActualizarPartnerOutput() {  idpartner = dominio.idpartner };

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
