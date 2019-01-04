

using CommandContracts.Common;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandContracts.Smartway.Reparacion;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Inventario;
using Domain.Smartway.Reparacion;
using System;
using System.Linq;
namespace CommandHandlers.Smartway.Reparacion
{
    public class InsertarActualizarDocumentoRecepcionHandler : ICommandHandler<InsertarActualizarDocumentoRecepcionCommand>
    {
        private readonly IRepository<DocumentoRecepcion> _DocumentoRecepcionRepository;
        public InsertarActualizarDocumentoRecepcionHandler(IRepository<DocumentoRecepcion> pDocumentoRecepcionRepository)
        {
            this._DocumentoRecepcionRepository = pDocumentoRecepcionRepository;
        }
        public CommandResult Handle(InsertarActualizarDocumentoRecepcionCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


            DocumentoRecepcion dominio = null;
            if (command.iddocumentorecepcion.HasValue)
                dominio = _DocumentoRecepcionRepository.Get(x => x.iddocumentorecepcion == command.iddocumentorecepcion).LastOrDefault();
            else
                dominio = new DocumentoRecepcion();

            dominio.activo = command.activo;
            dominio.documentocliente = command.documentocliente;
            dominio.dua = command.dua;
            dominio.fechahoraregistro = command.fechahoraregistro;
            dominio.fechahorarecepcion = command.fechahorarecepcion;
            dominio.guiaremision = command.guiaremision;
            dominio.idfabricante = command.idfabricante;
            dominio.numerofacturacomercial = command.numerofacturacomercial;
            dominio.fechafacturacomercial = command.fechafacturacomercial;
            dominio.idorigen= command.idorigen;
            dominio.idpartner = command.idpartner;
            dominio.idtiporecibo= command.idtiporecibo;
            dominio.idusuarioregistro = command.idusuarioregistro;
            dominio.numerodocumento = "TEMP";
            dominio.idordenservicio = command.idordenservicio;
            
            


            try
            {
                if (!command.iddocumentorecepcion.HasValue)
                    _DocumentoRecepcionRepository.Add(dominio);
                _DocumentoRecepcionRepository.Commit();

                dominio.numerodocumento = dominio.iddocumentorecepcion.ToString().PadLeft(6, '0');
                _DocumentoRecepcionRepository.Commit();

                return new InsertarActualizarDocumentoRecepcionOutput() {        iddocumentorecepcion = dominio.iddocumentorecepcion };

            }
            catch (Exception ex)
            {
              //  _ValortablaRepository.Delete(dominio);
                //_ValortablaRepository.Commit();
                throw;
            }

        }
    }
}
