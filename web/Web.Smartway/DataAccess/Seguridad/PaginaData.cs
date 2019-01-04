
using QueryContracts.Smartway.Seguridad.Parameters;
using QueryContracts.Smartway.Seguridad.Result;
using System.Collections.Generic;
using System.Linq;
using ServiceAgents.Common;
using System.Web.Mvc;
using Web.Smartway.Areas.Seguridad.Models.Paginas;
using CommandContracts.Smartway.Seguridad;
using AutoMapper;
using CommandContracts.Smartway.Seguridad.Output;

namespace Web.Smartway.DataAccess.Seguridad
{
    public sealed class PaginaData
    {

        public static List<ListarPaginasDto> ListarPaginas(string nombre)
        {
            var parameter = new ListarPaginasParameter() {  pag_str_nombre = nombre};
            var result = (ListarPaginasResult)parameter.Execute();
            return result == null ? new List<ListarPaginasDto>() : result.Hits.ToList();
        }
        public static List<BuscarPaginasDto> BuscarPaginas(string nombre)
        {
            var parameter = new BuscarPaginasParameter() { pag_str_nombre = nombre };
            var result = (BuscarPaginasResult)parameter.Execute();
            return result == null ? new List<BuscarPaginasDto>() : result.Hits.ToList();
        }
        public static List<ListarPaginasPadreDto> ListarPaginasPadre()
        {
            var parameter = new ListarPaginasPadreParameter();
            var result = (ListarPaginasPadreResult)parameter.Execute();
            return result == null ? new List<ListarPaginasPadreDto>() : result.Hits.ToList();
        }
        public static int? InsertarPagina(ControllerContext context, InsertarModificarPaginaModel modelo)
        {
            Mapper.CreateMap<InsertarModificarPaginaModel, InsertarModificarPaginaCommand>();
            var command = Mapper.Map<InsertarModificarPaginaModel, InsertarModificarPaginaCommand>(modelo);
            var res = (InsertarModificarPaginaOutput)command.Execute(context);






            return res.pag_int_id;
        }
        public static string EliminarPagina(int idPagina)
        {
            var parameter = new EliminarPaginaParameter() { IdPagina = idPagina };
            var result = (EliminarPaginaResult)parameter.Execute();
            return result.Mensaje;
        }
        public static ObtenerPaginaResult ObtenerPagina(int id)
        {
            var parameter = new ObtenerPaginaParameter() { pag_int_id = id };
            var result = (ObtenerPaginaResult)parameter.Execute();
            return result == null ? new ObtenerPaginaResult() : result;
        }

    }
}