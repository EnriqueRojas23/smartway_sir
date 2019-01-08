using AutoMapper;
using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using ServiceAgents.Common;
using System.Collections.Generic;
using System.Linq;
using Web.Smartway.Areas.Mantenimiento.Models;

namespace Web.Smartway.DataAccess.Mantenimiento
{
    public class DiagnosticoData
    {

        public IEnumerable<DiagnosticoModel> listarDiagnostico(int? idcategoriareparacion, int? idfabricante, int? idtipoproducto, bool? garantia , int? iddiagnostico = null)
        {
            var parametros = new ListarDiagnosticoParameters {
                idcategoriareparacion = idcategoriareparacion  
                , idfabricante = idfabricante
                ,idtipoproducto = idtipoproducto
                ,iddiagnostico = iddiagnostico
                ,garantia = garantia
            };
            var resultado = (ListarDiagnosticoResult)parametros.Execute();

            Mapper.CreateMap<ListarDiagnosticoDto, DiagnosticoModel>();
            return Mapper.Map<IEnumerable<ListarDiagnosticoDto>, IEnumerable<DiagnosticoModel>>(resultado.Hits);

        }
        public static IEnumerable<TipoDiagnosticoModel> GetListarTiposDiagnostico()
        {

            var parametros = new ListarTipoDiagnosticoParameters {    };
            var resultado = (ListarTipoDiagnosticoResult)parametros.Execute();

            Mapper.CreateMap<ListarTipoDiagnosticoDto, TipoDiagnosticoModel>();
            return Mapper.Map<IEnumerable<ListarTipoDiagnosticoDto>, IEnumerable<TipoDiagnosticoModel>>(resultado.Hits);
        }
       
        public int InsertarActualizarDiagnostico (DiagnosticoModel model)
        {
            Mapper.CreateMap<DiagnosticoModel, InsertarActualizarDiagnosticoCommand>();
            var command = Mapper.Map<DiagnosticoModel, InsertarActualizarDiagnosticoCommand> (model);
            var result = (InsertarActualizarDiagnosticoOutput) command.Execute();
            return result.iddiagnostico;
        }


        public int InsertarActualizarDiagnosticoxTipoProducto (DiagnosticoxTipoProductoModel model)
        {
            Mapper.CreateMap<DiagnosticoxTipoProductoModel, InsertarActualizarDiagnosticoxTipoProductoCommand>();
            var command = Mapper.Map<DiagnosticoxTipoProductoModel, InsertarActualizarDiagnosticoxTipoProductoCommand>(model);
            var result = (InsertarActualizarDiagnosticoxTipoProductoOutput)command.Execute();
            return result.iddiagnosticotipoproducto;

        }
        public int EliminarTipoProductoxDiagnostico (int iddiagnostico)
        {
            var command = new EliminarDiagnosticoxTipoProductoCommand { iddiagnosticosmartway = iddiagnostico };
            var result = (InsertarActualizarDiagnosticoxTipoProductoOutput)command.Execute();
            return result.iddiagnosticotipoproducto;
        }
    }
}