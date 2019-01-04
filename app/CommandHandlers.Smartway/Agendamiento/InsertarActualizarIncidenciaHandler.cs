

using CommandContracts.Smartway.Agendamiento;
using CommandContracts.Smartway.Agendamiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Agendamiento;
using Domain.Smartway.Agendamiento.Exceptions;
using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
using QueryContracts.Smartway.Agendamiento.Incidencias.Results;
using QueryHandlers.Smartway.Agendamiento.Incidencias;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarIncidenciaHandler : ICommandHandler<InsertarActualizarIncidenciaCommand>
    {
        private readonly IRepository<Incidencia> _IncidenciaRepository;


        public InsertarActualizarIncidenciaHandler(IRepository<Incidencia> pIncidenciaRepository)
        {
            this._IncidenciaRepository = pIncidenciaRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarIncidenciaCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar un comando");


            var datos_incidencia = ObtenerNuevoNumeroIncidencia();


           Incidencia dominio = null;
           if (command.idincidencia.HasValue)
               dominio = _IncidenciaRepository.Get(x => x.idincidencia == command.idincidencia).LastOrDefault();
            else
               dominio = new Incidencia();

            if (!command.idincidencia.HasValue)
            {
                dominio.anioincidencia = datos_incidencia.anio_incidencia;
                dominio.numeroincidencia = datos_incidencia.numero_incidencia;
                dominio.fechahoraregistro = command.fechahoraregistro;
                dominio.idusuarioregistro = command.idusuarioregistro;

            }
            switch (command.__tipooperacion)
            {
                case 1:
                    dominio.iddocumentocompra = command.iddocumentocompra;
                    dominio.idcliente = command.idcliente;

                    dominio.idsucursal = command.idsucursal;
                    dominio.idproducto = command.idproducto;
                    dominio.descripcion = command.descripcion;
                    dominio.idfalla = command.idfalla;
                    dominio.idrequerimientocliente = command.idrequerimientocliente;
                    dominio.atendidaxcallcenter = command.atendidaxcallcenter;
                    dominio.incidenciagarantia = command.incidenciagarantia;
                    dominio.idtipoincidencia = command.idtipoincidencia;
                    dominio.idtiposolucion = command.idtiposolucion;
                    dominio.imei = command.imei;
                    dominio.serie = command.serie;
                    dominio.idestado = command.idestado;
                    dominio.idsucursalventa = command.idsucursalventa;

                    dominio.engarantia = command.engarantia;
                    dominio.periodogarantia = command.periodogarantia;
                    dominio.idtipogarantia = command.idtipogarantia;
                    dominio.requiereevaluacion = command.requiereevaluacion;
                    dominio.idpartner = command.idpartner;
                    dominio.idetapa = command.idetapa;
                    dominio.activo = command.activo;

                    break;
                case 2: // Evaluacion
                    dominio.engarantia = command.engarantia;
                    dominio.idetapa = command.idetapa;
                    break;

                case 3: // Propuesta solucion
                    dominio.idetapa = command.idetapa;
                    break;
                case 4:  // Cotizacion Cotizacion 
                    //dominio.idsucursaldestino = command.idsucursaldestino;
                    dominio.idetapa = command.idetapa;
                    break;
                case 5: // Estado Fisico
                    dominio.idetapa = command.idetapa;
                    dominio.idestado = command.idestado;
                    dominio.idsucursalreparacion = command.idsucursalreparacion;
                    dominio.iddirecciondelivery = command.iddirecciondelivery;
                    break;
                case 6: // Guardar Imagen
                    dominio.partedelantera = command.partedelantera;
                    dominio.parteposterior = command.parteposterior;
                    dominio.partesuperior = command.partesuperior;
                    dominio.parteinferior = command.parteinferior;
                    dominio.parteizquierda = command.parteizquierda;
                    dominio.partederecha = command.partederecha;
                    break;
                default:
                    break;
            }
            

            try
            {
                if (!command.idincidencia.HasValue)
                    _IncidenciaRepository.Add(dominio);
                _IncidenciaRepository.Commit();


                return new InsertarActualizarIncidenciaOutput()
                {
                   numeroincidencia = dominio.anioincidencia.ToString() + "-" + dominio.numeroincidencia ,
                   idincidencia = dominio.idincidencia
                };

            }
            catch (Exception ex)
            {
                //_ValortablaRepository.Delete(dominio);
                //_ValortablaRepository.Commit();
                throw;
            }

        }
        private static ObtenerNumeroIncidenciaResult ObtenerNuevoNumeroIncidencia()
        {
            var query = new ObtenerNumeroIncidenciaQuery();
            var queryresult = query.Handle(new ObtenerNumeroIncidenciaParameter() { });
            if (queryresult == null) throw new IncidenciaException("No se pudo generar el numero de incidencia.");
            return (ObtenerNumeroIncidenciaResult)queryresult;
        }
    }
}
