using ServiceAgents.Common;
using System.Collections.Generic;
using CommandContracts.Smartway.Mantenimiento;
using Web.Smartway.Areas.Mantenimiento.Models;
using CommandContracts.Smartway.Mantenimiento.Output;
using AutoMapper;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;

namespace Web.Smartway.DataAccess.Mantenimiento
{
    public class SucursalData
    {
        public IEnumerable<SucursalModel> ListarSucursal(string codigo, string nombre, int? idtipopartner , int? idpartner = null)
        {
            var parameters = new ListarSucursalParameters
            {
              Codigo = codigo
            , Nombre = nombre
            , idtipopartner = idtipopartner
            , idpartner = idpartner

            };
            var respuesta =   (ListarSucursalResult)parameters.Execute();
            Mapper.CreateMap<ListarSucursalDto, SucursalModel>();
            return Mapper.Map<IEnumerable<ListarSucursalDto>, IEnumerable<SucursalModel>>(respuesta.Hits);


        }
        public int InsertarActualizarSucursal(SucursalModel sucursal)
        {
          Mapper.CreateMap<SucursalModel,InsertarActualizarSucursalCommand >();
          var command =  Mapper.Map<SucursalModel, InsertarActualizarSucursalCommand >(sucursal);
          var resp = (InsertarActualizarSucursalOutput)command.Execute();
          return resp.idsucursal;

        }
        public SucursalModel obtenerSucursal(int idsucursal)
        {
            var parameters = new ObtenerSucursalParameter
            {
                 idsucursal = idsucursal
               
            };
            var respuesta = (ObtenerSucursalResult)parameters.Execute();
            Mapper.CreateMap<ObtenerSucursalResult, SucursalModel>();
            return Mapper.Map<ObtenerSucursalResult, SucursalModel>(respuesta);

        }



    }
}