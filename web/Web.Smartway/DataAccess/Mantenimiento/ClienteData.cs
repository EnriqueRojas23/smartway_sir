using AutoMapper;
using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using ServiceAgents.Common;
using Web.Smartway.Areas.Mantenimiento.Models;

namespace Web.Smartway.DataAccess.Mantenimiento
{
    public class ClienteData
    {
        #region cliente
        public static ObtenerClienteResult GetObtenerCliente(int idcliente)
        {

            var parametros = new ObtenerClienteParameter { id = idcliente };
            var resultado = (ObtenerClienteResult)parametros.Execute();
            return resultado == null ? new ObtenerClienteResult() : resultado;

        }
        public static int InsertarActualizarCliente(ClienteModel model, out string res)
        {

            if (model.idcliente == 0 || model.idcliente == null)
            {
                model.idcliente = null;
                model.activo = true;
            }

            Mapper.CreateMap<ClienteModel, InsertarActualizarClienteCommand>();
            var comando = Mapper.Map<ClienteModel, InsertarActualizarClienteCommand>(model);


            res = "OK";

            var respuesta = (InsertarActualizarClienteOutput)comando.Execute();

         
            if (model.iddireccion == 0)
                model.iddireccion = null;
            var comandodireccion = new InsertarActualizarDireccionCommand();
            comandodireccion.direccion = model.direccion;
            comandodireccion.codigo = model.codigodireccion;
            comandodireccion.iddistrito = model.iddistrito;
            comandodireccion.principal = true;
            comandodireccion.idcliente = respuesta.idcliente;
            comandodireccion.iddireccion = model.iddireccion;
            comandodireccion.activo = true;

            var respuesta2 = (InsertarActualizarDireccionOutput)comandodireccion.Execute();

            return respuesta.idcliente;
        }
        #endregion
    }
}