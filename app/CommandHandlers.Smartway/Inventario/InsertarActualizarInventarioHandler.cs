

using CommandContracts.Common;
using CommandContracts.Smartway.Inventario;
using CommandContracts.Smartway.Inventario.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Inventario;
using Domain.Smartway.Mantenimiento;
using System;
using System.Linq;
namespace CommandHandlers.Smartway.Inventario
{
    public class InsertarActualizarInventarioHandler : ICommandHandler<InsertarActualizarInventarioCommand>
    {
        private readonly IRepository<InventarioGeneral> _InventarioRepository;
        private readonly IRepository<Producto> _ProductoRepository;


        public InsertarActualizarInventarioHandler(IRepository<InventarioGeneral> pInventarioRepository
            , IRepository<Producto> pProductoRepository)
        {
            _InventarioRepository = pInventarioRepository;
            _ProductoRepository = pProductoRepository;
        }



        public CommandResult Handle(InsertarActualizarInventarioCommand command)
        {
            if (command == null) throw new ArgumentException("Producto no cargado");
            InventarioGeneral dominio = null;


            var producto = _ProductoRepository.Get(x => x.idproducto == command.idproducto).FirstOrDefault();
            if (command.idinventario.HasValue)
                dominio = _InventarioRepository.Get(x => x.idinventario.Equals(command.idinventario.Value)).SingleOrDefault();
            else
            {
                if (producto.idrequisitoascanear == 137) //solo serie
                {
                    dominio = _InventarioRepository.Get(x => 
                    x.idproducto == command.idproducto && 
                    x.idalmacen == command.idalmacen && 
                    x.serie == command.serie).LastOrDefault();
                }
                else if (producto.idrequisitoascanear == 138)//Serie/Imei
                {
                    dominio = _InventarioRepository.Get(x =>
                       x.idproducto == command.idproducto &&
                       x.idalmacen == command.idalmacen &&
                       x.serie == command.serie && 
                       x.imei == command.imei ).LastOrDefault();
                }
                else if (producto.idrequisitoascanear == 139)// serie/imei/mac
                {
                    dominio = _InventarioRepository.Get(x =>
                       x.idproducto == command.idproducto &&
                       x.idalmacen == command.idalmacen &&
                       x.serie == command.serie &&
                       x.imei == command.imei &&
                       x.mac == command.mac).LastOrDefault();
                }
                else if (producto.idrequisitoascanear == 140)// mac
                {
                    dominio = _InventarioRepository.Get(x =>
                      x.idproducto == command.idproducto &&
                      x.idalmacen == command.idalmacen &&
                      x.mac == command.mac ).LastOrDefault();
                }
                else if (producto.idrequisitoascanear == 163)// IMEI
                {
                    dominio = _InventarioRepository.Get(x =>
                    x.idproducto == command.idproducto &&
                    x.idalmacen == command.idalmacen &&
                    x.imei == command.imei).LastOrDefault();
                }

                else
                {
                    dominio = _InventarioRepository.Get(x => x.idproducto == command.idproducto
                    && x.idalmacen == command.idalmacen).LastOrDefault();
                }
            }

            if (dominio == null)
            {
                switch (command.__idoperacion)
                {
                    case 1: // Nuevo 
                        dominio = new InventarioGeneral
                        {
                            cantidad = command.cantidad,
                            fechahoraregistro = command.fechahoraregistro,
                            idalmacen = command.idalmacen,
                            iddocumentorecepcion = command.iddocumentorecepcion,
                            idestado = command.idestado,
                            idproducto = command.idproducto,
                            serie = command.serie,
                            imei = command.imei,
                            mac = command.mac ,
                            ubicacion  = command.ubicacion,
                            caja = command.caja,
                            idpartner = command.idpartner,
                            pallet= command.pallet,
                            idusuarioregistro = command.idusuarioregistro
                        };
                        break;
                    default:
                        break;
                }
              
                _InventarioRepository.Add(dominio);


            }
            else
            {
                switch (command.__idoperacion)
                {
                    case 2: // Actualizar 
                        dominio.cantidad = command.cantidad;
                        dominio.idestado = command.idestado;
                        break;
                    case 1: // Incrementar
                        dominio.cantidad = dominio.cantidad + command.cantidad;
                        break;
                    case 3: //Operaciones de inventario
                        if(command.idalmacennuevo != null)
                           dominio.idalmacen = command.idalmacennuevo.Value;
                        if(command.idestadonuevo != null)
                           dominio.idestado = command.idestadonuevo.Value;
                        if (command.cantidadnueva != null)
                            dominio.cantidad = command.cantidadnueva.Value;
                        break;
                    case 4: //Cambio de estado
                        dominio.idestado = command.idestado;
                        break;

                    default:
                        break;
                }
              
            }
            try
            {
                _InventarioRepository.SaveChanges();
                return new InsertarActualizarInventarioOutput() { idinventario = dominio.idinventario };
            }
            catch (Exception)
            {

                throw;
            }
          


        }

      
    }
    public enum Scanear : int
    {
        Serie = 137,
        SerieImei = 138,
        SerieImeiMac = 139,
        Mac = 140,
        Imei = 163

    }
}
