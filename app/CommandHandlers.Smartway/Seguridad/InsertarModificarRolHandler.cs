

using CommandContracts.Smartway.Seguridad;
using CommandContracts.Smartway.Seguridad.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Seguridad;
using System;
using System.Linq;
using System.Text;

namespace CommandHandlers.Smartway.Seguridad
{
    public class InsertarModificarRolHandler : ICommandHandler<InsertarModificarRolCommand>
    {
        private readonly IRepository<Rol> _RolRepository;
        public InsertarModificarRolHandler(IRepository<Rol> prolRepository)
        {
            this._RolRepository = prolRepository;
        }
        public CommandContracts.Common.CommandResult Handle(InsertarModificarRolCommand command)
        {
            Rol dominio = null;



            if (command.rol_int_id.HasValue)
            {
                dominio = _RolRepository.Get(x => x.rol_int_id == command.rol_int_id).LastOrDefault();
                if (_RolRepository.Get(x => x.rol_str_descrip.Equals(command.rol_str_descrip) && !x.rol_int_id.Value.Equals(command.rol_int_id.Value)).LastOrDefault() != null)
                    return new InsertarModificarRolOutput() { rol_int_id = 0 };
            }
            else
            {
                if(_RolRepository.Get(x=> x.rol_str_descrip.Equals(command.rol_str_descrip)).LastOrDefault() != null)
                     return new InsertarModificarRolOutput() { rol_int_id = 0 };
                dominio = new Rol();
            }
       
            dominio.rol_str_descrip = command.rol_str_descrip;
            dominio.rol_str_alias = command.rol_str_alias;


            //string str = "0x01000000874A803DC44DFB3E6AF8FFD94CE2DA9AB02368E67477DE27FACFA7D8205B092DFF3291B2D8B568EA";
            //byte[] bytes = new byte[str.Length * sizeof(char)];
            //System.Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
            //dominio.rol_str_pass = Encoding.UTF8.GetString(binaryData);
            //
            //dominio.rol_str_pass = "0x010000007EABEFF7F9B23A0CBF1C00BB14AC9A3FDE11D0504C06D1CB68F021C759CD199672C16DC85D7EADF3";
            //
            dominio.rol_bit_publico = command.rol_bit_publico;
            dominio.rol_int_id = command.rol_int_id;
            dominio.rol_bit_activo = command.rol_bit_activo;
            //
            try
            {
                if (!command.rol_int_id.HasValue)
                {
                    _RolRepository.Add(dominio);
                }

                _RolRepository.Commit();
            }
            catch (Exception ex)
            {
                throw;

            }
            return new InsertarModificarRolOutput() {rol_int_id = dominio.rol_int_id }; 
        }
    }
}
