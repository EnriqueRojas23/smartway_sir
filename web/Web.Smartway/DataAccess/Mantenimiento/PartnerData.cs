using ServiceAgents.Common;
using System.Collections.Generic;
using CommandContracts.Smartway.Mantenimiento;
using Web.Smartway.Areas.Mantenimiento.Models;
using CommandContracts.Smartway.Mantenimiento.Output;
using AutoMapper;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;

namespace Web.Smartway.DataAccess.Mantenimiento
{
    public class PartnerData
    {
        public IEnumerable<PartnerModel> ListarPartner(string numerodocumento, string razonsocial )
        {
            var parameters = new ListarPartnerParameters  { numerodocumento = numerodocumento, razonsocial = razonsocial };
            var respuesta =   (ListarPartnerResult)parameters.Execute();
            Mapper.CreateMap<ListarPartnerDto, PartnerModel>();
            return Mapper.Map<IEnumerable<ListarPartnerDto>, IEnumerable<PartnerModel>>(respuesta.Hits);
        }
        public int InsertarActualizarPartner(PartnerModel partner)
        { 
            Mapper.CreateMap<PartnerModel, InsertarActualizarPartnerCommand>();
            var command = Mapper.Map<PartnerModel, InsertarActualizarPartnerCommand>(partner);
            var resp = (InsertarActualizarPartnerOutput)command.Execute();
            return resp.idpartner;

        }
        public PartnerModel ObtenerPartner (int idpartner)
        {
            var parameter = new ObtenerPartnerParameter { idpartner = idpartner };
            var result = (ObtenerPartnerResult)parameter.Execute();
            Mapper.CreateMap<ObtenerPartnerResult, PartnerModel> ();
            return  Mapper.Map<ObtenerPartnerResult, PartnerModel>(result);
        }



    }
}