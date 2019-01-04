using AutoMapper;

using ServiceAgents.Common;
using System.Collections.Generic;
using System;
using QueryContracts.Smartway.Reparacion.Parameters;
using QueryContracts.Smartway.Reparacion.Results;
using Web.Smartway.Areas.Agendamiento.Models;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandContracts.Smartway.Reparacion;
using Web.Smartway.Areas.Reparacion.Models;
using QueryContracts.Smartway.Recepcion.Parameters;
using Web.Smartway.Areas.Inventario.Models;
using CommandContracts.Smartway.Inventario;
using QueryContracts.Smartway.Inventario.Results;
using QueryContracts.Smartway.Inventario.Parameters;
using CommandContracts.Smartway.Inventario.Output;
using Web.Smartway.Areas.Mantenimiento.Models;

namespace Web.Smartway.DataAccess.Inventario
{
    public class InventarioData
    {
        public static IEnumerable<AlmacenModel> GetListarAlmacen(int? idsucursal, string codigoAlmacen)
        {   
            var parametros = new ListarAlmacenParameters{ codigoalmacen = codigoAlmacen, idsucursal = idsucursal };
            var resultado = (ListarAlmacenResult)parametros.Execute();
            Mapper.CreateMap<ListarAlmacenDto, AlmacenModel>();
            return Mapper.Map<IEnumerable<ListarAlmacenDto>, IEnumerable<AlmacenModel>>(resultado.Hits);
        }
        public static IEnumerable<InventarioModel> GetListarInventarioxAlmacen(int idalmacen, string serie , string imei, int? idproducto )
        {
            var parametros = new ListarInventarioxAlmacenParameters {  idalmacen = idalmacen  , idproducto= idproducto , imei = imei, serie = serie };
            var resultado = (ListarInventarioxAlmacenResult)parametros.Execute();
            Mapper.CreateMap<ListarInventarioxAlmacenDto, InventarioModel>();
            return Mapper.Map<IEnumerable<ListarInventarioxAlmacenDto>, IEnumerable<InventarioModel>>(resultado.Hits);
        }
        internal long InsertarActualizarAlmacen(AlmacenModel model)
        {
            Mapper.CreateMap<AlmacenModel, InsertarActualizarAlmacenCommand>();
            var command = Mapper.Map<AlmacenModel, InsertarActualizarAlmacenCommand>(model);
            var result = (InsertarActualizarAlmacenOutput)command.Execute();
            return result.idalmacen;
        }
        internal long InsertarActualizarInventario(InventarioModel model)
        {
            Mapper.CreateMap<InventarioModel, InsertarActualizarInventarioCommand>();
            var command = Mapper.Map<InventarioModel, InsertarActualizarInventarioCommand>(model);
            var result = (InsertarActualizarInventarioOutput)command.Execute();
            return result.idinventario;

        }
        internal AlmacenModel obtenerAlmacen(int id)
        {
            var parameters = new ObtenerAlmacenParameters(){idalmacen = id , codigo = null};
            var result =(ObtenerAlmacenResult) parameters.Execute();
            Mapper.CreateMap<ObtenerAlmacenResult, AlmacenModel>();
            return  Mapper.Map<ObtenerAlmacenResult, AlmacenModel>(result);
        }
        internal AlmacenModel obtenerAlmacen(string codigo)
        {
            var parameters = new ObtenerAlmacenParameters() { codigo = codigo };
            var result = (ObtenerAlmacenResult)parameters.Execute();
            Mapper.CreateMap<ObtenerAlmacenResult, AlmacenModel>();
            return Mapper.Map<ObtenerAlmacenResult, AlmacenModel>(result);
        }
        internal InventarioModel obtenerInventario(int idalmacen, int idproducto, int? idestado)
        {
            var parameters = new ObtenerInventarioParameters()
            {
                idalmacen = idalmacen
                ,idproducto = idproducto
                ,idestado = idestado
            };
            var result = (ObtenerInventarioResult)parameters.Execute();
            Mapper.CreateMap<ObtenerInventarioResult, InventarioModel>();
            return Mapper.Map<ObtenerInventarioResult, InventarioModel>(result);
        }
        internal InventarioModel obtenerInventario(long idinventario,int? idestado)
        {
            var parameters = new ObtenerInventarioParameters()
            {
                idinventario = idinventario,
                idestado = idestado 
            };
            var result = (ObtenerInventarioResult)parameters.Execute();
            Mapper.CreateMap<ObtenerInventarioResult, InventarioModel>();
            return Mapper.Map<ObtenerInventarioResult, InventarioModel>(result);
        }
        internal ProductoModel obtenerProductoInventario (int idproducto, string serie, string imei )
        {
            var parameter = new ObtenerProductoInventarioParameters()
            {
                idproducto = idproducto
                ,imei = imei
                ,serie = serie
            };
            var result = (ObtenerProductoInventarioResult)parameter.Execute();
            Mapper.CreateMap<ObtenerProductoInventarioResult, ProductoModel>();
            return Mapper.Map<ObtenerProductoInventarioResult, ProductoModel>(result);

        }
        public OrdenServicioModel obtenerOrdenServicioxInventario(long idinventario)
        {
            var parametros = new ObtenerOrdenServicioxInventarioParameters
            {
                 idinventario = idinventario
            };
            var resultado = (ObtenerOrdenServicioxInventarioResult)parametros.Execute();
            Mapper.CreateMap<ObtenerOrdenServicioxInventarioResult, OrdenServicioModel>();
            return Mapper.Map<ObtenerOrdenServicioxInventarioResult, OrdenServicioModel>(resultado);
        }
    }
}