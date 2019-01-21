

using CommandContracts.Smartway.Agendamiento;
using CommandContracts.Smartway.Agendamiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Agendamiento;

using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarOrdenServicioHandler : ICommandHandler<InsertarActualizarOrdenServicioCommand>
    {
        private readonly IRepository<OrdenServicio> _OrdenServicioRepository;


        public InsertarActualizarOrdenServicioHandler(IRepository<OrdenServicio> pOrdenServicioRepository)
        {
            this._OrdenServicioRepository = pOrdenServicioRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarOrdenServicioCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar un comando");



            OrdenServicio dominio = null;
           if (command.idordenserviciotecnico.HasValue)
               dominio = _OrdenServicioRepository.Get(x => x.idordenserviciotecnico == command.idordenserviciotecnico).LastOrDefault();
            else
               dominio = new OrdenServicio();


            if (command.__tipooperacion == 2)
            {
                dominio.idestado = command.idestado;
                dominio.cotizado = command.cotizado;
            }
            else if (command.__tipooperacion == 3)
            {
                dominio.idestado = command.idestado;
                dominio.engarantia = command.engarantia;
                dominio.cotizado = command.cotizado;

            }
            else
            {
                dominio.fechahoraregistro = command.fechahoraregistro;
                dominio.cambioproducto = command.cambioproducto;
                dominio.fechahorapruebacambio = command.fechahorapruebacambio;
                dominio.idincidencia = command.idincidencia;
                dominio.idcliente = command.idcliente;
                dominio.iddocumentorecepcion = command.iddocumentorecepcion;
                dominio.iddocumentosalida = command.iddocumentosalida;
                dominio.idestado = command.idestado;
                dominio.idtipoordenservicio = command.idtipoordenservicio;
                dominio.idusuario = command.idusuario;
                dominio.idusuarioapruebacambio = command.idusuarioapruebacambio;
                dominio.numeroordenservicio = "";
                dominio.engarantia = command.engarantia;
                dominio.cotizado = command.cotizado; 
                dominio.activo = command.activo;
                dominio.idproducto = command.idproducto;
                dominio.idpartner = command.idpartner;
                dominio.serie = command.serie;
                dominio.imei = command.imei;
                dominio.mac = command.mac;
                dominio.idinventario= command.idinventario;
                dominio.iddirecciondelivery = command.iddirecciondelivery;
                dominio.idsucursaldestino = command.idsucursaldestino;
                dominio.idsucursalorigen = command.idsucursalorigen;
                dominio.delivery = command.delivery;

            }
            try
            {
                if (!command.idordenserviciotecnico.HasValue)
                    _OrdenServicioRepository.Add(dominio);
                _OrdenServicioRepository.Commit();

                if (!command.idordenserviciotecnico.HasValue)
                {
                    if (command.__tipooperacion != 2)
                    {
                        dominio.numeroordenservicio = dominio.idordenserviciotecnico.ToString().PadLeft(10, '0');
                        _OrdenServicioRepository.Commit();
                    }
                }



                return new InsertarActualizarOrdenServicioOutput() {
                      idordenservicio = dominio.idordenserviciotecnico
                    , numeroordenservicio = dominio.numeroordenservicio
                };

            }
            catch (Exception ex)
            {
                //_ValortablaRepository.Delete(dominio);
                //_ValortablaRepository.Commit();
                throw;
            }

        }
        //private static ObtenerNumeroIncidenciaResult ObtenerNuevoNumeroIncidencia()
        //{
        //    var query = new ObtenerNumeroIncidenciaQuery();
        //    var queryresult = query.Handle(new ObtenerNumeroIncidenciaParameter() { });
        //    if (queryresult == null) throw new IncidenciaException("No se pudo generar el numero de incidencia.");
        //    return (ObtenerNumeroIncidenciaResult)queryresult;
        //}
    }
}
