

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Mantenimiento;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarProductoHandler : ICommandHandler<InsertarActualizarProductoCommand>
    {
        private readonly IRepository<Producto> _ProductoRepository;


        public InsertarActualizarProductoHandler(IRepository<Producto> pProductoRepository)
        {
            this._ProductoRepository = pProductoRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarProductoCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresa un Producto");


           Producto  dominio = null;
           if (command.idproducto.HasValue)
               dominio = _ProductoRepository.Get(x => x.idproducto == command.idproducto).LastOrDefault();
            else
                dominio = new Producto();



            switch (command.__tipooperacion)
            {
                case 1:
                    dominio.activo = command.activo;
                    dominio.codigoproducto = command.codigoproducto;
                    dominio.costounitario = command.costounitario;
                    dominio.descripcioncorta = command.descripcioncorta;
                    dominio.descripcionlarga = command.descripcionlarga;
                    dominio.idbanda = command.idbanda;
                    dominio.idcamarafrontal = command.idcamarafrontal;
                    dominio.idcamaraposterior = command.idcamaraposterior;

                    dominio.idcapacidad = command.idcapacidad;
                    dominio.idcolor = command.idcolor;
                    dominio.idfabricante = command.idfabricante;
                    dominio.idfamilia = command.idfamilia;
                    dominio.idmemoriaflash = command.idmemoriaflash;
                    dominio.idmemoriaram = command.idmemoriaram;

                    dominio.idmodelo = command.idmodelo;
                    dominio.idmoneda = command.idmoneda;
                    dominio.idorigen = command.idorigen;
                    dominio.idpantalla = command.idpantalla;
                    dominio.idprocesador = command.idprocesador;

                    dominio.idrequisitoascanear = command.idrequisitoascanear;
                    dominio.idsistemaoperativo = command.idsistemaoperativo;
                    dominio.idtipoproducto = command.idtipoproducto;
                    dominio.idvoltaje = command.idvoltaje;
                    dominio.imagen = command.imagen;
                    dominio.original = command.original;

                    dominio.peso = command.peso;
                    dominio.porcentajedescuento = command.porcentajedescuento;
                    dominio.preciounitario = command.preciounitario;
                    dominio.repuesto = command.repuesto;
                    dominio.stockmaximo = command.stockmaximo;
                    dominio.stockminimo = command.stockminimo;

                    dominio.volumen = command.volumen;
                    dominio.idtipomercaderia = command.idtipomercaderia;
                    dominio.unico_reparacion = command.unico_reparacion;
                    break;
                case 2:
                    dominio.activo = command.activo;
                    break;
            }

         


            try
            {
                if (!command.idproducto.HasValue)
                    _ProductoRepository.Add(dominio);
                _ProductoRepository.Commit();


                return new InsertarActualizarProductoOutput() {    idproducto = dominio.idproducto };

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
