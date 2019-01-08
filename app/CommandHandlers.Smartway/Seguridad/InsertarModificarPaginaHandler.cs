
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
    public class InsertarModificarPaginaHandler : ICommandHandler<InsertarModificarPaginaCommand>
    {
        private readonly IRepository<Pagina> _PaginaRepository;
        public InsertarModificarPaginaHandler(IRepository<Pagina> ppaginaRepository)
        {
            this._PaginaRepository = ppaginaRepository;
        }


        public CommandResult Handle(InsertarModificarPaginaCommand command)
        {

            Pagina dominio = null;
            Pagina dominioUlt = null;
            if (command.pag_int_id.HasValue)
            {
                dominio = _PaginaRepository.Get(x => x.pag_int_id == command.pag_int_id).LastOrDefault();
                if (command.pag_str_tipomenu == "M")
                {
                    var existe = _PaginaRepository.Get(x => x.pag_str_nombre.Equals(command.pag_str_nombre)
                        && !x.pag_int_id.Equals(command.pag_int_id.Value)).LastOrDefault();
                    if (existe != null) return new InsertarModificarPaginaOutput() { pag_int_id = 0 };
                }
                else
                {
                    var existe = _PaginaRepository.Get(x => x.pag_str_nombre.Equals(command.pag_str_nombre)
                        && x.pag_str_codmenu_padre == command.pag_str_codmenu_padre && !x.pag_int_id.Equals(command.pag_int_id.Value)).LastOrDefault();
                    if (existe != null) return new InsertarModificarPaginaOutput() { pag_int_id = 0 };
                }
            }
            if (dominio == null)
            {
                dominio = new Pagina();

                if (command.pag_str_tipomenu == "M")
                {
                    var existe = _PaginaRepository.Get(x => x.pag_str_nombre.Equals(command.pag_str_nombre)).LastOrDefault();
                    if (existe != null) return new InsertarModificarPaginaOutput() { pag_int_id = 0 };
                    dominioUlt = _PaginaRepository.Get(x => x.pag_str_nombre != null).LastOrDefault();
                    //else  dominioUlt = _PaginaRepository.Get(x => x.pag_str_codmenu_padre.Equals(command.pag_str_codmenu_padre)).LastOrDefault();
                    var codigo = Convert.ToInt32(dominioUlt.pag_str_codmenu.Substring(3, dominioUlt.pag_str_codmenu.Length - 3));
                    dominio.pag_str_codmenu = "MNU" + (codigo + 1).ToString().PadLeft(4, '0');
                    command.pag_bit_externo = true;
                    command.pag_int_secuencia = 1;
                }
                else
                {
                    var existe = _PaginaRepository.Get(x => x.pag_str_nombre.Equals(command.pag_str_nombre) && x.pag_str_codmenu_padre == command.pag_str_codmenu_padre).LastOrDefault();
                    if (existe != null) return new InsertarModificarPaginaOutput() { pag_int_id = 0 };
                    dominioUlt = _PaginaRepository.Get(x => x.pag_str_nombre != null).LastOrDefault();
                    //else  dominioUlt = _PaginaRepository.Get(x => x.pag_str_codmenu_padre.Equals(command.pag_str_codmenu_padre)).LastOrDefault();
                    var codigo = Convert.ToInt32(dominioUlt.pag_str_codmenu.Substring(3, dominioUlt.pag_str_codmenu.Length - 3));
                    dominio.pag_str_codmenu = "MNU" + (codigo + 1).ToString().PadLeft(4, '0');
                    command.pag_bit_externo = true;
                    command.pag_int_secuencia = 1;
                }
            }
      
             dominio.pag_str_descrip = command.pag_str_descrip;
             dominio.pag_str_url = command.pag_str_url;
            dominio.pag_str_codmenu_padre = command.pag_str_codmenu_padre;
            dominio.pag_str_tipomenu = command.pag_str_tipomenu;
            dominio.pag_str_nombre = command.pag_str_nombre;
            dominio.pag_int_nivel = command.pag_int_nivel;
            dominio.pag_int_secuencia = command.pag_int_secuencia;
            dominio.pag_str_controller = command.pag_str_controller;
            dominio.pag_str_action = command.pag_str_action;
            dominio.pag_str_attributes = command.pag_str_attributes;
            dominio.pag_bit_activo = command.pag_bit_activo;
            dominio.pag_bit_externo = command.pag_bit_externo;

            try
            {
                if (!command.pag_int_id.HasValue)
                {
                    _PaginaRepository.Add(dominio);
                }

                _PaginaRepository.Commit();
            }
            catch (Exception ex)
            {
                throw;
 
            }
            return new InsertarModificarPaginaOutput() { pag_int_id  = dominio.pag_int_id }; 


        }
    }
}
