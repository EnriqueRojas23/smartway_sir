using QueryContracts.Smartway.Recepcion.Parameters;
using QueryContracts.Smartway.Reparacion.Results;
using System.Collections.Generic;
using Web.Smartway.Areas.Agendamiento.Models;
using ServiceAgents.Common;
using AutoMapper;
using Web.Smartway.Areas.Recepcion.Models;
using CommandContracts.Smartway.Reparacion;
using CommandContracts.Smartway.Mantenimiento.Output;
using System;
using QueryContracts.Smartway.Recepcion.Results;

namespace Web.Smartway.DataAccess.Recepcion
{
    public class RecepcionData
    {
        public IEnumerable<OrdenServicioModel> GetListarOrdenServicio(long idguiaremision)
        {
            var parametros = new ListarOrdenServicioRecepcionParameters
            {
                idguiaremision = idguiaremision

            };
            var resultado = (ListarOrdenServicioRecepcionResult)parametros.Execute();
            Mapper.CreateMap<ListarOrdenServicioRecepcionDto, OrdenServicioModel>();
            return Mapper.Map<IEnumerable<ListarOrdenServicioRecepcionDto>, IEnumerable<OrdenServicioModel>>(resultado.Hits);
        }
        public long insertarActualizarDocumentoRecepcion(DocumentoRecepcionModel model)
        {
            Mapper.CreateMap<DocumentoRecepcionModel, InsertarActualizarDocumentoRecepcionCommand>();
            var command = Mapper.Map<DocumentoRecepcionModel, InsertarActualizarDocumentoRecepcionCommand>(model);

            var resp = (InsertarActualizarDocumentoRecepcionOutput)command.Execute();
            return resp.iddocumentorecepcion;
        }
        public long insertarActualizarDocumentoRecepcionDetalle(DocumentoRecepcionDetalleModel model)
        {
            Mapper.CreateMap<DocumentoRecepcionDetalleModel, InsertarActualizarDocumentoRecepcionDetalleCommand>();
            var command = Mapper.Map<DocumentoRecepcionDetalleModel, InsertarActualizarDocumentoRecepcionDetalleCommand>(model);

            var resp =  (InsertarActualizarDocumentoRecepcionDetalleOutput) command.Execute();
            return resp.iddocumentorecepciondetalle;
        }
        public static int InsertarDocumentoRecepcionDetalleLote( IEnumerable<DocumentoRecepcionDetalleModel> detalle)
        {
            InsertarDocumentoRecepcionDetalleDto param;
            InsertarDocumentoRecepcionDetalleParameter parameters = new InsertarDocumentoRecepcionDetalleParameter();
            parameters.Hits = new List<InsertarDocumentoRecepcionDetalleDto>();

            string ids = string.Empty;
            foreach (var item in detalle)
            {
                param = new InsertarDocumentoRecepcionDetalleDto();
                param.caja = item.caja;
                param.cantidad = item.cantidad;
                param.fechahorapersonalizacion = item.fechahorapersonalizacion;
                param.fila = item.fila;
                param.iddocumentorecepcion = item.iddocumentorecepcion;
                param.idmodelo = item.idmodelo;

                param.idusuariopersonalizacion = item.idusuariopersonalizacion;
                param.imei = item.imei;
                param.mac = item.mac;
                param.numeropallet = item.numeropallet;
                param.repuesto = item.repuesto;
                param.idmodelo = item.idmodelo;
                param.idproducto = item.idproducto;
                param.idtipoproducto = item.idtipoproducto;
                param.serie = item.serie;
                param.idalmacen = item.idalmacen;
                

                parameters.Hits.Add(param);
            }
            parameters.Execute();
            //ids = ids.Substring(1, ids.Length - 1);

            return 1;
        }

        public IEnumerable<DocumentoRecepcionModel> GetListarDocumentoRecepcion(String fechainicio, String fechafin
            , string numerorecepcion)
        {
            var parametros = new ListarDocumentoRecepcionParameters
            {
                fechahorainicio = fechainicio,
                fechahorafin = fechafin,
                numeroordenservicio = numerorecepcion


            };
            var resultado = (ListarDocumentoRecepcionResult)parametros.Execute();
            Mapper.CreateMap<ListarDocumentoRecepcionDto, DocumentoRecepcionModel>();
            return Mapper.Map<IEnumerable<ListarDocumentoRecepcionDto>, IEnumerable<DocumentoRecepcionModel>>(resultado.Hits);
        }

    }
}