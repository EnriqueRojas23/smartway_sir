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
    public class InsertarActualizarSucursalHandler : ICommandHandler<InsertarActualizarSucursalCommand>
    {
        private readonly IRepository<Sucursal> _SucursalRepository;

        public InsertarActualizarSucursalHandler(IRepository<Sucursal> pSucursalRepository)
        {
            this._SucursalRepository = pSucursalRepository;
        }

        public CommandResult Handle(InsertarActualizarSucursalCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");

            Sucursal dominio = null;
            if (command.idsucursal.HasValue)
                dominio = _SucursalRepository.Get(x => x.idsucursal == command.idsucursal).LastOrDefault();
            else
                dominio = new Sucursal();


            if (command.__tipooperacion == 2)
            {
                dominio.activo = command.activo;
            }
            else
            {

                dominio.activo = command.activo;
                dominio.celular = command.celular;
                dominio.codigo = command.codigo;
                dominio.contacto = command.contacto;
                dominio.delivery = command.delivery;
                dominio.email = command.email;
                dominio.idcondicionentrega = command.idcondicionentrega;
                dominio.idcondicionrecojo = command.idcondicionrecojo;
                dominio.idpartner = command.idpartner;
                dominio.idtipopago = command.idtipopago;
                dominio.idtiposucursal = command.idtiposucursal;
                dominio.laboratoriocentral = command.laboratoriocentral;
                dominio.nombre = command.nombre;
                dominio.reparacion = command.reparacion;
                dominio.telefono = command.telefono;
                dominio.fechahoraregistro = command.fechahoraregistro;
                dominio.idusuarioregistro = command.idusuarioregistro;
                dominio.iddireccion = command.iddireccion;
            }

            try
            {
                if (!command.idsucursal.HasValue)
                    _SucursalRepository.Add(dominio);
                _SucursalRepository.Commit();

                return new InsertarActualizarSucursalOutput() { idsucursal = dominio.idsucursal };
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