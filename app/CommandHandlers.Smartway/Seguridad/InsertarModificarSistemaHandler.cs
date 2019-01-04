
using CommandContracts.Common;
using CommandContracts.Smartway.Seguridad;
using CommandContracts.Smartway.Seguridad.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Seguridad;
using System;
using System.Linq;

namespace CommandHandlers.Smartway.Seguridad
{
    public class InsertarModificarSistemaHandler : ICommandHandler<InsertarModificarSistemaCommand>
    {
        private readonly IRepository<Sistema> _SistemaRepository;
        public InsertarModificarSistemaHandler(IRepository<Sistema> psistemaRepository)
        {
            this._SistemaRepository  = psistemaRepository;
        }


        public CommandResult Handle(InsertarModificarSistemaCommand command)
        {

            Sistema dominio_sistema = null;
            if (command.sis_int_id.HasValue)
            {
                dominio_sistema = _SistemaRepository.Get(x => x.sis_int_id == command.sis_int_id).LastOrDefault();
            }
            if (dominio_sistema == null) dominio_sistema = new Sistema();

            dominio_sistema.sis_bit_activo = command.sis_bit_activo;
            dominio_sistema.sis_int_orden = command.sis_int_orden;
            dominio_sistema.sis_str_alias = command.sis_str_alias;
            dominio_sistema.sis_str_aliasmenu = command.sis_str_aliasmenu;
            dominio_sistema.sis_str_nombre = command.sis_str_nombre;
            dominio_sistema.sis_str_resumen = command.sis_str_resumen;
            dominio_sistema.sis_str_siglas = command.sis_str_siglas;
            try
            {
                if (!command.sis_int_id.HasValue)
                {
                    _SistemaRepository.Add(dominio_sistema);
                }
                
                _SistemaRepository.Commit();
            }
            catch (Exception ex)
            {
                throw;
 
            }


            return new InsertarModificarSistemaOutput() { sis_int_id = dominio_sistema.sis_int_id }; 


        }
    }
}
