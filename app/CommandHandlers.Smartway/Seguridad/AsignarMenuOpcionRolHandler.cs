
using CommandContracts.Common;
using CommandContracts.Smartway.Seguridad;
using CommandContracts.Smartway.Seguridad.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Seguridad;
using Domain.Smartway.Seguridad.Exceptions;
using System.Collections.Generic;
using System.Linq;

namespace CommandHandlers.Smartway.Seguridad
{
    public class AsignarMenuOpcionRolHandler : ICommandHandler<AsignarMenuOpcionRolCommand>
    {
        private readonly IRepository<SistemaRolPagina> _sistemarolpagina;
        private readonly IRepository<Sistema> _sistema;
        private readonly IRepository<SistemaRol> _sistemarol;

        public AsignarMenuOpcionRolHandler(IRepository<SistemaRolPagina> psistemarolpagina, IRepository<Sistema> psistema , IRepository<SistemaRol> psistemarol) 
        {
            this._sistemarolpagina = psistemarolpagina;
            this._sistema = psistema;
            this._sistemarol = psistemarol;
        }
        public CommandResult Handle(AsignarMenuOpcionRolCommand command)
        {
            if (command == null) throw new System.ArgumentException("Se requiere el parametro command."); //SistemaRolUsuarioException("ddd")

         

            var pag_int_id_array_delete = new List<int>();
            var sis_int_id = GetSistemaId(command.sis_str_sigla);
            var sistemarol = _sistemarol.Get(x => x.rol_int_id == command.rol_int_id).LastOrDefault();
            if (sistemarol == null)
            {
                var dominio_sr = new SistemaRol();
                dominio_sr.rol_int_id = command.rol_int_id;
                dominio_sr.sis_int_id = sis_int_id;
                _sistemarol.Add(dominio_sr);
                _sistemarol.Commit();

            }
            //Listado de id que se van a eliminar
            var dominio_opc_rol_array = _sistemarolpagina.Get(x => x.sis_int_id == sis_int_id && x.rol_int_id == command.rol_int_id);
            foreach (var domopc in dominio_opc_rol_array)
            {
                var obj = command.opc_obj_array.LastOrDefault(x => x.opc_int_id == domopc.pag_int_id);
                if (obj != null)
                    pag_int_id_array_delete.Add(domopc.pag_int_id);
            }

            //activo opciones
            foreach (var pag_int_id in pag_int_id_array_delete)
            {
                var dominio_opc_eliminar = _sistemarolpagina.Get(x => x.sis_int_id == sis_int_id && x.rol_int_id == command.rol_int_id && x.pag_int_id == pag_int_id).LastOrDefault();
                if (dominio_opc_eliminar != null) _sistemarolpagina.Delete(dominio_opc_eliminar);
            }
            _sistemarolpagina.Commit();



            //ingresando opciones nuevos
            var contador = 0;
            foreach (var opc_int_id_command in command.opc_obj_array)
            {
                var dominio_opc_insertar = _sistemarolpagina.Get
                    (x => x.sis_int_id == sis_int_id && 
                        x.rol_int_id == command.rol_int_id && 
                        x.pag_int_id == opc_int_id_command.opc_int_id).LastOrDefault();

                if (dominio_opc_insertar == null && opc_int_id_command.opc_bit_seleccionado == true)
                {
                    dominio_opc_insertar = new SistemaRolPagina()
                    {
                       rol_int_id = command.rol_int_id,
                       pag_int_id = opc_int_id_command.opc_int_id,
                       sis_int_id = sis_int_id,
                       srp_str_codpermiso = opc_int_id_command.opc_str_permiso
                    
                    };
                    _sistemarolpagina.Add(dominio_opc_insertar);
                    contador++;

                }
                else if (opc_int_id_command.opc_bit_seleccionado == true)
                {
                    dominio_opc_insertar.srp_str_codpermiso = opc_int_id_command.opc_str_permiso;
                    contador++;
                }

            }
            _sistemarolpagina.Commit();

            return new AsignarMenuOpcionRolOutput() { nro_opciones_procesados = contador };

            
        }

        private int GetSistemaId(string psis_str_siglas)
        {
            var sistema = _sistema.Get(x => x.sis_str_siglas == psis_str_siglas).LastOrDefault();
            if (sistema == null) throw new SistemaException("No existe el sistema para la sigla " + psis_str_siglas);
            return sistema.sis_int_id;
        }
    }
}