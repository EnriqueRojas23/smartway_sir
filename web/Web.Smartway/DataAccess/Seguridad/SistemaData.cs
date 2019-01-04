using System;
using System.Linq;
using QueryContracts.Smartway.Seguridad.Parameters;
using QueryContracts.Smartway.Seguridad.Result;
using System.Collections.Generic;
using ServiceAgents.Common;
using System.Web.Mvc;
using Web.Smartway.Areas.Seguridad.Models.Sistemas;
using CommandContracts.Smartway.Seguridad;
using AutoMapper;
using CommandContracts.Smartway.Seguridad.Output;
using Web.Smartway.Areas.Seguridad.Models.Paginas;


namespace Web.Smartway.DataAccess.Seguridad
{
    public sealed class SistemaData
    {
        public static IList<ListarSistemasDto> ListarSistemas(int? id)
        {
            var parameter = new ListarSistemasParameter() { sis_int_id = id };
            var result = (ListarSistemasResult)parameter.Execute();
            return result == null ? new List<ListarSistemasDto>() : result.Hits.ToList();
        }
        public static IList<BuscarSistemasDto> BuscarSistemas(string nombre, string alias)
        {
            var parameter = new BuscarSistemasParameter() {  alias  = alias , nombre = nombre};
            var result = (BuscarSistemasResult)parameter.Execute();
            return result == null ? new List<BuscarSistemasDto>() : result.Hits.ToList();
        }
        public static IList<ListarSistemasDto> ListarSistemas()
        {
            return SistemaData.ListarSistemas(null);
        }
        public static string EliminarSistema(int idPagina)
        {
            var parameter = new EliminarPaginaParameter() {  IdPagina = idPagina };
            var result = (EliminarPaginaResult)parameter.Execute();
            return result.Mensaje;
        }
        public static int? InsertarSistema(ControllerContext context, InsertarModificarPaginaModel modelo)
        {
            Mapper.CreateMap<InsertarModificarPaginaModel, InsertarModificarPaginaCommand>();
            var command = Mapper.Map<InsertarModificarPaginaModel, InsertarModificarPaginaCommand>(modelo);
            var res = (InsertarModificarPaginaOutput)command.Execute(context);

            return res.pag_int_id;
        }
        public static ObtenerSistemaResult ObtenerSistema(int? id)
        {
            var parameter = new ObtenerSistemaParameter() { sis_int_id = id };
            var result = (ObtenerSistemaResult)parameter.Execute();
            return result == null ? new ObtenerSistemaResult() : result;
        }

    }
}