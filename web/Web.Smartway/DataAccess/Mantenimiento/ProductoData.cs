

using AutoMapper;
using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using ServiceAgents.Common;
using System.Collections.Generic;
using Web.Smartway.Areas.Mantenimiento.Models;
using System;
using System.Web.Mvc;

namespace Web.Smartway.DataAccess.Mantenimiento
{
    public class ProductoData
    {
        public IEnumerable<TipoProductoModel> listarTipoProducto()
        {
            var param = new ListarTipoProductoParameters { };
            var result =  (ListarTipoProductoResult)param.Execute();

            Mapper.CreateMap<ListarTipoProductoDto, TipoProductoModel>();
            return Mapper.Map<IEnumerable<ListarTipoProductoDto>, IEnumerable<TipoProductoModel>>(result.Hits);

        }
        public IEnumerable<ProductoModel> listarProductoxId(string codigos)
        {
            var param = new ListarProductosxIdsParameters
            {
              codigos = codigos,
            };
            var result = (ListarProductosxIdsResult)param.Execute();
            Mapper.CreateMap<ListarProductosxIdsDto, ProductoModel>();
            return Mapper.Map<IEnumerable<ListarProductosxIdsDto>, IEnumerable<ProductoModel>>(result.Hits);
        }
        public IEnumerable<ProductoModel> listarProducto(string codigo, string descripcion,int? idtipoproducto , int? idmodelo, int? idfabricante, bool? repuesto)
        {
            var param = new ListarProductosParameters
            {
                codigo = codigo,
                descripcion = descripcion,
                idfabricante = idfabricante,
                idmodelo = idmodelo,
                idtipoproducto = idtipoproducto,
                repuesto = repuesto


            };
            var result = (ListarProductosResult)param.Execute();
            Mapper.CreateMap<ListarProductosDto, ProductoModel>();
            return Mapper.Map<IEnumerable<ListarProductosDto>, IEnumerable<ProductoModel>>(result.Hits);
        }
        public int InsertarActualizarProducto(ProductoModel model)
        {




            Mapper.CreateMap<ProductoModel, InsertarActualizarProductoCommand>();
            var command = Mapper.Map<ProductoModel, InsertarActualizarProductoCommand>(model);
            var result =  (InsertarActualizarProductoOutput)command.Execute();
            return result.idproducto;

        }
        public int insertarActualizarReparacionRepuesto(List<RepuestoxReparacionModel> lista, int idrepuesto)
        {
            var command_delete = new EliminarRepuestoxReparacionCommand { idrepuesto = idrepuesto };
            command_delete.Execute();


            Mapper.CreateMap<RepuestoxReparacionModel, InsertarActualizarRepuestoxReparacionCommand>();
            foreach (var item in lista)
            {
                var command = Mapper.Map<RepuestoxReparacionModel, InsertarActualizarRepuestoxReparacionCommand>(item);
                var result = (InsertarActualizarRepuestoxReparacionOutput)command.Execute();

            }
            return 1;
        }
        public int insertarActualizarRepuestoxProducto(List<ProductoxRepuestoModel> lista, int idproducto)
        {
            var command_delete = new EliminarRepuestoxProductoCommand {  idproducto = idproducto };
            command_delete.Execute();


            Mapper.CreateMap<ProductoxRepuestoModel, InsertarActualizarRepuestoxProductoCommand>();
            foreach (var item in lista)
            {
                var command = Mapper.Map<ProductoxRepuestoModel, InsertarActualizarRepuestoxProductoCommand>(item);
                var result = (InsertarActualizarRepuestoxProductoOutput)command.Execute();

            }
            return 1;
        }
        public ProductoModel obtenerProducto(int? idproducto, string codigoproducto = null)
        {
            var parameters = new ObtenerProductoParameter
            {
                idproducto = idproducto,
                codigoproducto = codigoproducto

            };
            var respuesta = (ObtenerProductoResult)parameters.Execute();
            Mapper.CreateMap<ObtenerProductoResult, ProductoModel>();
            return Mapper.Map<ObtenerProductoResult, ProductoModel>(respuesta);

        }

        internal IEnumerable<RepuestoxReparacionModel> listarRepuestoxReparacion(int? idrepuesto)
        {
            var parameters = new ListarReparacionRepuestoParameters { idrepuesto = idrepuesto };
            var respuesta = (ListarReparacionRepuestoResult) parameters.Execute();

            Mapper.CreateMap<ListarReparacionRepuestoDto, RepuestoxReparacionModel>();
            return Mapper.Map<IEnumerable<ListarReparacionRepuestoDto>,IEnumerable<RepuestoxReparacionModel>>(respuesta.Hits);

        }
        internal IEnumerable<ProductoxRepuestoModel> listarRepuestosxProducto(int? idproducto)
        {
            var parameters = new ListarRepuestosxProductoParameters {  idproducto = idproducto };
            var respuesta = (ListarRepuestosxProductoResult)parameters.Execute();

            Mapper.CreateMap<ListarRepuestosxProductoDto, ProductoxRepuestoModel>();
            return Mapper.Map<IEnumerable<ListarRepuestosxProductoDto>, IEnumerable<ProductoxRepuestoModel>>(respuesta.Hits);

        }
    }
}