using QueryContracts.Smartway.Mantenimiento.Parameters;

using QueryContracts.Smartway.Mantenimiento.Results;
using ServiceAgents.Common;
using System.Collections.Generic;
using System.Linq;
using CommandContracts.Smartway.Mantenimiento;
using Web.Smartway.Areas.Mantenimiento.Models;
using CommandContracts.Smartway.Mantenimiento.Output;
using AutoMapper;
using System.Web.Mvc;
using System;

namespace Web.Smartway.DataAccess.Mantenimiento
{
    public  class MantenimientoData
    {
        #region valortabla

        public static List<ListarValorxTablaDto> GetListarValoresxTabla(int? idTabla, string search)
        {

            var parametros = new ListarValorxTablaParameters { idtabla = idTabla, search = search };
            var resultado = (ListarValorxTablaResult)parametros.Execute();
            return resultado == null ? new List<ListarValorxTablaDto>() : resultado.Hits.ToList();

        }
        public static List<ListarDireccionClienteDto> GetListarDireccionesxCliente(int idcliente)
        {

            var parametros = new ListarDireccionClienteParameters() { idcliente = idcliente };
            var resultado = (ListarDireccionClienteResult)parametros.Execute();
            return resultado == null ? new List<ListarDireccionClienteDto>() : resultado.Hits.ToList();

        }

        public  static IEnumerable<EstadoModel>  GetListarEstado(int idtabla)
        {
            var parametros = new ListarEstadosParameter() { idtabla = idtabla };
            var resultado = (ListarEstadosResult) parametros.Execute();
            Mapper.CreateMap<ListarEstadosDto, EstadoModel>();
            var resp = Mapper.Map<IEnumerable<ListarEstadosDto>, IEnumerable<EstadoModel>>(resultado.Hits);
            return resp;

        }

        public static int InsertarActualizarValorTabla(ValorTablaModel model, out string res)
        {

            if (model.idvalortabla == 0)
                model.idvalortabla = null;
            var comando = new InsertarActualizarValorTablaCommand();
            comando.idmaestrotabla = model.idmaestrotabla;
            comando.valor = model.valor;
            comando.activo = model.activo;
            comando.idvalortabla = model.idvalortabla;
            comando.orden = model.orden;

            res = "OK";

            var respuesta = (InsertarActualizarValorTablaOutput)comando.Execute();
            return respuesta.idvalortabla;
        }
        public ObtenerValorTablaResult GetValorTabla(int id)
        {
            var parametros = new ObtenerValorTablaParameter { idvalortabla = id };
            var resultado = (ObtenerValorTablaResult)parametros.Execute();
            return resultado == null ? new ObtenerValorTablaResult() : resultado;

        }
        public static List<ListarMaestroTablasDto> GetListarMaestroTabla()
        {

            var parametros = new ListarMaestroTablasParameters();
            var resultado = (ListarMaestroTablasResult)parametros.Execute();
            return resultado == null ? new List<ListarMaestroTablasDto>() : resultado.Hits.ToList();

        }
        public static SelectList GetListarValoresxTabla(int? id)
        {
            var parametros = new ListarValorxTablaParameters() { idtabla = id };
            var resultado = (ListarValorxTablaResult)parametros.Execute();

            var valor = resultado.Hits.ToList();
            var listavalor = new SelectList(
                valor,
                "idvalortabla",
                "valor");
            return listavalor;


        }
        public static IEnumerable<ClienteModel> GetListarClientes(string search
            , bool activo
            , int? idtipodocumento = null)
        {

            var parametros = new ListarClientesParameters { criterio = search
                 ,idtipodocumento = idtipodocumento
                , activo = activo
            };
            var resultado = (ListarClientesResult)parametros.Execute();

            Mapper.CreateMap<ListarClientesDto, ClienteModel>();
            return Mapper.Map<IEnumerable<ListarClientesDto>, IEnumerable<ClienteModel>>(resultado.Hits);
        }
        #endregion

        #region Zona
        public static List<ListarZonasDto> GetListarZona(string search)
        {

            var parametros = new ListarZonasParameters { zona = search };
            var resultado = (ListarZonasResult)parametros.Execute();
            return resultado == null ? new List<ListarZonasDto>() : resultado.Hits.ToList();

        }
        public static ValidarZonaResult validarZona(string zona, int? idzona)
        {

            var parametros = new ValidarZonaParameter { zona = zona, idzona = idzona };
            var resultado = (ValidarZonaResult)parametros.Execute();
            return resultado == null ? new ValidarZonaResult() : resultado;

        }
        public static InsertarActualizarZonaOutput InsertarActualizarZona(ZonaModel model, List<string> distritosseleccionados)
        {
            if (model.idzona == 0)
                model.idzona = null;
            var comando = new InsertarActualizarZonaCommand();
            comando.nombre = model.nombre;
            comando.idzona = model.idzona;
            comando.activo = model.activo;
            var respuesta = (InsertarActualizarZonaOutput)comando.Execute();




            var comandodistrito = new InsertarActualizarZonaDistritoCommand();
            comandodistrito.idsdistritos = distritosseleccionados;
            comandodistrito.idzona = respuesta.idzona;
            var resp = (InsertarActualizarZonaDistritoOutput)comandodistrito.Execute();



            return respuesta;
        }


        public static List<ListarDistritoZonaDto> GetListarDistritoZona(int? idzona)
        {

            var parametros = new ListarDistritoZonaParameters { idzona = idzona };
            var resultado = (ListarDistritoZonaResult)parametros.Execute();
            return resultado == null ? new List<ListarDistritoZonaDto>() : resultado.Hits.ToList();

        }
        public static List<ListarDistritoZonaEditarDto> GetListarDistritoZonaEditar(int? idzona, int? idprovincia)
        {

            var parametros = new ListarDistritoZonaEditarParameters { idzona = idzona, idprovincia = idprovincia };
            var resultado = (ListarDistritoZonaEditarResult)parametros.Execute();
            return resultado == null ? new List<ListarDistritoZonaEditarDto>() : resultado.Hits.ToList();

        }
        public ObtenerZonaResult GetZona(int id)
        {
            var parametros = new ObtenerZonaParameter { id = id };
            var resultado = (ObtenerZonaResult)parametros.Execute();
            return resultado == null ? new ObtenerZonaResult() : resultado;

        }
        public static List<ListarDepartamentosDto> GetListarDepartamento()
        {
            var parametros = new ListarDepartamentoParameters();
            var resultado = (ListarDepartamentosResult)parametros.Execute();
            return resultado == null ? new List<ListarDepartamentosDto>() : resultado.Hits.ToList();
        }
      
       
        #endregion 

        #region ubigeo
       
        public static List<ListarProvinciasDto> GetListarProvincia(int iddepartamento)
        {

            var parametros = new ListarProvinciasParameters { iddepartamento = iddepartamento };
            var resultado = (ListarProvinciasResult)parametros.Execute();
            return resultado == null ? new List<ListarProvinciasDto>() : resultado.Hits.ToList();
        }
        public static List<ListarDistritosDto> GetListarDistritos(int? idprovincia)
        {
            var parametros = new ListarDistritosParameters { idprovincia = idprovincia };
            var resultado = (ListarDistritosResult)parametros.Execute();
            return resultado == null ? new List<ListarDistritosDto>() : resultado.Hits.ToList();
        }
        public static List<ListarUbigeoDto> GetListarUbigeo()
        {
            var parametros = new ListarUbigeoParameters();
            var resultado = (ListarUbigeoResult)parametros.Execute();
            return resultado == null ? new List<ListarUbigeoDto>() : resultado.Hits.ToList();
        }

        #endregion

        #region direccion 
        public static int InsertarActualizarDireccion(DireccionModel model)
        {

            Mapper.CreateMap<DireccionModel, InsertarActualizarDireccionCommand>();
            var comando = Mapper.Map<DireccionModel, InsertarActualizarDireccionCommand>(model);

            var respuesta = (InsertarActualizarDireccionOutput)comando.Execute();
            return respuesta.iddireccion;
        }
        public static ValidarDireccionResult GetValidarDireccion(int idcliente, string codigo)
        {

            var parametros = new ValidarDireccionParameter() { codigo = codigo, idcliente = idcliente };
            var resultado = (ValidarDireccionResult)parametros.Execute();
            return resultado == null ? new ValidarDireccionResult() : resultado;

        }


        public DireccionModel GetDireccion(int iddireccion)
        {
            var parameters = new ObtenerDireccionParameters { iddireccion = iddireccion };
            var result =   (ObtenerDireccionResult)parameters.Execute();
            Mapper.CreateMap<ObtenerDireccionResult, DireccionModel>();
            return Mapper.Map<ObtenerDireccionResult, DireccionModel>(result);
        }

        #endregion

        #region Antecedentes
        public static List<ListarAntecedentesIncidenteDto> GetListarAntecedentesProductos(long idincidencia )
        {
            var parametros = new ListarAntecedentesParameter { idincidencia = idincidencia};
            var resultado = (ListarAntecedentesResult)parametros.Execute();
            return resultado == null ? new List<ListarAntecedentesIncidenteDto>() : resultado.Productos.ToList();
        }
        public static List<ListarAntecedentesIncidenteDto> GetListarAntecedentesClientes(long idincidencia)
        {
            var parametros = new ListarAntecedentesParameter { idincidencia = idincidencia };
            var resultado = (ListarAntecedentesResult)parametros.Execute();
            return resultado == null ? new List<ListarAntecedentesIncidenteDto>() : resultado.Clientes.ToList();
        }

        #endregion







    }
}