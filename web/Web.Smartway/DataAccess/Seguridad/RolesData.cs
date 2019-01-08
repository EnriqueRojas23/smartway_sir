using System;
using System.Text;
using System.Linq;
using ServiceAgents.Common;
using QueryContracts.Smartway.Seguridad.Result;
using System.Collections.Generic;
using QueryContracts.Smartway.Seguridad.Parameters;
using System.Configuration;
using System.Web.Mvc;
using Seguridad.Common;
using CommandContracts.Smartway.Seguridad;
using CommandContracts.Smartway.Seguridad.Output;
using Web.Smartway.Areas.Seguridad.Models.Roles;

namespace Web.Smartway.DataAccess.Seguridad
{
    public sealed class RolesData
    {
        public static IList<ListarRolesDto> ListarRoles()
        {
            return ListarRoles(null);
        }

        public static IList<ListarRolesDto> ListarRoles(string prol_str_alias)
        {
            var _rol_str_alias = string.IsNullOrEmpty(prol_str_alias) ? null : prol_str_alias;
            var parameter = new ListarRolesParameter() { rol_str_alias = _rol_str_alias };
            var result = (ListarRolesResult)parameter.Execute();
            return result == null ? new List<ListarRolesDto>() : result.Hits.ToList();
        }

        public static IList<ListarRolesAsignablesDto> GetListarRolesAsignables(string pusr_str_red, string prol_str_alias, int pint_rol_sin_asignar)
        {
            var parameter = new ListarRolesAsignablesParameter() { int_rol_sin_asignar = pint_rol_sin_asignar, rol_str_alias = prol_str_alias, usr_str_red = pusr_str_red, sis_str_siglas = Constantes.GetModuleAcronym() };
            var result = (ListarRolesAsignablesResult)parameter.Execute();
            return result == null ? new List<ListarRolesAsignablesDto>() : result.Hits.ToList();
        }

        public static ListarRolesDto ObtenerDatosRol(int prol_int_id)
        {
            var parameter = new ListarRolesParameter();
            var result = (ListarRolesResult)parameter.Execute();
            if (result == null) return null;

            var dto = result.Hits.LastOrDefault(x => x.rol_int_id == prol_int_id);
            return dto;
        }


        public static InsertarModificarRolOutput InsertarModificarRol(InsertarModificarRolModel model)
        {
            var parameter = new InsertarModificarRolCommand()
            {
                rol_bit_publico = true,
                rol_str_alias = model.rol_str_alias
                ,
                rol_str_descrip = model.rol_str_descrip,
                rol_str_usuario = model.rol_str_usuario,
                rol_int_id = model.rol_int_id,
                rol_bit_activo = model.rol_bit_activo
            };
            var result = (InsertarModificarRolOutput)parameter.Execute();
            return result;
        }
        public static int GetObtenerIdPadre(int idhijo)
        {
            var parameter = new ObtenerPaginaPadreParameter { pag_int_id = idhijo };
            var result = (ObtenerPaginaPadreResult)parameter.Execute();
            return (result == null ? 0 : result.pag_int_id);
        }

        public static int AsignarMenuOpcionRol(ControllerContext context, string psis_str_siglas, int? prol_int_id, IList<MenuOpcion> listadoopcion)
        {
            var command = new AsignarMenuOpcionRolCommand();
            command.rol_int_id = prol_int_id.Value;
            command.sis_str_sigla = psis_str_siglas;

            command.opc_obj_array = new List<OpcionCommand>();
            foreach (var modelo in listadoopcion)
            {
                command.opc_obj_array.Add(new OpcionCommand()
                {
                    opc_int_id = modelo.IdMenuOpcion,
                    opc_str_permiso = modelo.CodigoPermiso,
                    opc_bit_seleccionado = modelo.ItemSeleccionado
                });
            }

            return ((AsignarMenuOpcionRolOutput)command.Execute(context)).nro_opciones_procesados;
        }

        public static int EliminarRol(int idRol)
        {
            var parameter = new EliminarRolParameter() { IdRol = idRol };
            var result = (EliminarRolResult)parameter.Execute();
            return result.count;
        }




    }
}