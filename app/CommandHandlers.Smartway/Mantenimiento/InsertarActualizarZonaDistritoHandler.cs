

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Mantenimiento;
using System;
using System.Collections.Generic;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarZonaDistritoHandler : ICommandHandler<InsertarActualizarZonaDistritoCommand>
    {
        private readonly IRepository<ZonaDistrito> _ZonaDistritoRepository;


        public InsertarActualizarZonaDistritoHandler(IRepository<ZonaDistrito> pZonaDistritoRepository)
        {
            this._ZonaDistritoRepository = pZonaDistritoRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarZonaDistritoCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");
            ZonaDistrito dominio = null;
            if (command.idzona != null)
            {
                List<ZonaDistrito> distritos_del;
                distritos_del = _ZonaDistritoRepository.Get(x => x.idzona == command.idzona.Value).ToList();

                int distrito = 0;
                foreach (var item in distritos_del)
                {

                    dominio = _ZonaDistritoRepository.Get(x => x.iddistrito == item.iddistrito
                        && x.idzona == command.idzona.Value).LastOrDefault();
                    _ZonaDistritoRepository.Delete(dominio);
                    _ZonaDistritoRepository.Commit();

                }
            }

            foreach (var item in command.idsdistritos)
            {
                try
                {
                  
                    dominio = new ZonaDistrito();
                    dominio.iddistrito = Convert.ToInt32(item);
                    dominio.idzona = command.idzona.Value;
                    _ZonaDistritoRepository.Add(dominio);
                    _ZonaDistritoRepository.Commit();
                   

                }
                catch (Exception ex)
                {
                    //  _ValortablaRepository.Delete(dominio);
                    //_ValortablaRepository.Commit();
                    throw;
                }

            }
            return new InsertarActualizarZonaDistritoOutput() { idzona  = dominio.idzona };     
            
          
         
        }
    }
}
