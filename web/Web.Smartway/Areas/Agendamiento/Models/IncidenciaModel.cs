using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Web;
using System.Web.Mvc;
using Web.Smartway.Areas.Mantenimiento.Models;
using Web.Smartway.DataAccess.Agendamiento;
using Web.Smartway.DataAccess.Mantenimiento;

namespace Web.Smartway.Areas.Agendamiento.Models
{


    public class IncidenciaModel
    {

        public long? idincidencia { get; set; }
        public string numeroincidencia { get; set; }
        public int idtipoincidencia { get; set; }
        public int idtiposolucion { get; set; }
        public int idsucursal { get; set; }
        public bool reparadoensucursal { get; set; }
        public bool sucursaldelivery { get; set; }

        public int idcliente { get; set; }
        public string descripcion { get; set; }
        public int idrequerimientocliente { get; set; }
        public int? idfalla { get; set; }
        public int? idtipodocumentocompra { get; set; }
        public long? iddocumentocompra { get; set; }
        public DateTime fechahoracompra { get; set; }
        public int? idsucursalventa { get; set; }
        public int? idsucursaldestino { get; set; }
        public int idproducto { get; set; }
        public string imei { get; set; }
        public string serie { get; set; }


        public int? periodogarantia { get; set; }
        public int? idtipogarantia { get; set; }
        public bool engarantia { get; set; }
        public int idtipodocumento { get; set; }


        public int cantidad { get; set; } // que es cantidad?
        public decimal? descuento { get; set; }
        public decimal total { get; set; }
        public bool atendidaxcallcenter { get; set; }
        public int? idcita { get; set; }
        public int idestado { get; set; }
        public int idetapa { get; set; }
        public int idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }

        public string numeroreclamacion { get; set; }
        public string nombrecliente { get; set; }
        public string numerodocumento { get; set; }
        public string email { get; set; }
        public string telefono { get; set; }
        public string distrito { get; set; }
        public string direccion { get; set; }
        public string celular { get; set; }
        public string numerocomprobante { get; set; }
        public string numeroordenservicio { get; set; }
        public DateTime? fechaemision { get; set; }
        public bool ventaenlinea { get; set; }
        public string sucursalcompra { get; set; }
        public bool libroactivo { get; set; }
        public bool editarsucursal { get; set; }
        public int idpartner { get; set; }
        public int idfabricante { get; set; }
        public string ItemIncidencia { get; set; }
        public bool itemRequerido { get; set; }
        public bool incidenciagarantia { get; set; }

        /// <summary>
        /// Libro Reclamaciones
        /// </summary>
        public int condicionreclamo { get; set; }

        /// <summary>
        /// Búsqueda
        /// </summary>
        public DateTime fechainicio { get; set; }
        public DateTime fechafin { get; set; }
        public int idtipoproducto { get; set; }
        public DateTime fecharegistro { get; set; }
        public string tipoincidencia { get; set; }
        public string sucursal { get; set; }
        public string cliente { get; set; }
        public string usuarioregistro { get; set; }
        public string estado { get; set; }
        public string codigoproducto { get; set; }
        public string descripcionlarga { get; set; }

        public bool editar { get; set; }
        public string garantia { get; set; }
        /// <summary>
        /// AtenciónEvaluacion
        /// </summary>
        public string falla { get; set; }
        public string producto { get; set; }
        public string requerimientocliente { get; set; }

        public int anioincidencia { get; set; }
        public string direccioncliente { get; set; }
        public int __tipooperacion { get; set; }

        public IEnumerable<SelectListItem> ListaAccesorios { get; set; }
        public string[] AccesoriosSeleccionados { get; set; }
        public string accesorios { get; set; }

        public bool requiereevaluacion { get; set; }

        public bool evaluacionrealizada { get; set; }
        public bool cotizacionrealizada { get; set; }
        public bool revisionfisicarealizada { get; set; }
        public int? ideva { get; set; }
        public long? idcotizacion { get; set; }
        public long? idordenserviciotecnico { get; set; }

        public long idordenservicio_aux { get; set; }

        public long? idincidenciasolucion { get; set; }

        public int? idpropuesta { get; set; }
        public string observacionsolucion { get; set; }

        public  int? idsucursalreparacion { get; set; }
        public int iddirecciondelivery { get; set; }

        public byte[] partedelantera { get; set; }
        public byte[] parteposterior { get; set; }
        public byte[] partesuperior { get; set; }
        public byte[] parteinferior { get; set; }
        public byte[] partederecha { get; set; }
        public byte[] parteizquierda { get; set; }


        public string str_total { get; set; }
        public string str_igv { get; set; }
        public string str_subtotal { get; set; }



        public decimal igv { get; set; }
        public decimal subtotal { get; set; }
        public bool activo { get; set; }



        public HtmlString BuildRoot(long? idincidencia)
        {
            if (idincidencia.HasValue)
            {
                var model = new IncidenciaData().ObtenerIncidencia(idincidencia.Value);

                var Navtag = new TagBuilder("nav");
                Navtag.AddCssClass("navbar navbar");

                var Divtag = new TagBuilder("div");
                Divtag.AddCssClass("container-fluid");


                var tag = new TagBuilder("ol");
                tag.AddCssClass("nav navbar-nav");


                var itemTag = construir_li("MenuIncidencia", "Ver Incidencia","Agendamiento",  "VerIncidencia",  idincidencia.ToString(), false, true);
                tag.InnerHtml += itemTag.ToString();



                if (model.idetapa == 1)
                {
                    if (model.requiereevaluacion)
                    {
                        var itemTag2 = construir_li("MenuEvaluacion", "Evaluación de Garantía","Evaluacion", "AtencionEvaluacion" , idincidencia.ToString(), true, true);
                        tag.InnerHtml += itemTag2.ToString();

                        var itemTab3 = construir_li("MenuPropuesta", "Propuesta","Propuesta", "Propuesta" , idincidencia.ToString(), true, false);
                        tag.InnerHtml += itemTab3.ToString();

                        var itemTag5 = construir_li("MenuEstadoFisico", "Estado Físico","Agendamiento", "EstadoFisico" , idincidencia.ToString(),true, false);
                        tag.InnerHtml += itemTag5.ToString();
                    }
                    else
                    {
                        var itemTab3 = construir_li("MenuPropuesta", "Propuesta","Propuesta", "Propuesta?idincidencia=", idincidencia.ToString(),true, true);
                        tag.InnerHtml += itemTab3.ToString();

                        var itemTag5 = construir_li("MenuEstadoFisico", "Estado Físico","Agendamiento", "EstadoFisico" , idincidencia.ToString(),true, false);
                        tag.InnerHtml += itemTag5.ToString();

                    }
      


                }
                else if (model.idetapa == 2)
                {
                    if (model.requiereevaluacion)
                    {
                        var itemTag2 = construir_li("MenuEvaluacion", "Evaluación de Garantía","Evaluacion", "AtencionEvaluacion" , idincidencia.ToString(),false, true);
                        tag.InnerHtml += itemTag2.ToString();
                    }

                    var itemTab3 = construir_li("MenuPropuesta", "Propuesta","Propuesta", "Propuesta" , idincidencia.ToString(),true, true);
                    tag.InnerHtml += itemTab3.ToString();

                    //var itemTag4 = construir_li("MenuCotizar", "Cotizacion", "/Agendamiento/Cotizacion/CotizarIncidencia?idincidencia=" + idincidencia, true, false);
                    //tag.InnerHtml += itemTag4.ToString();
                    var itemTag5 = construir_li("MenuEstadoFisico", "Estado Físico","Agendamiento", "EstadoFisico" , idincidencia.ToString(), true, false);
                    tag.InnerHtml += itemTag5.ToString();

                }
                else if (model.idetapa == 3)
                {
                    if (model.requiereevaluacion)
                    {
                        var itemTag2 = construir_li("MenuEvaluacion", "Evaluación de Garantía", "Evaluacion", "AtencionEvaluacion" , idincidencia.ToString(), false, true);
                        tag.InnerHtml += itemTag2.ToString();
                    }

                    var itemTab3 = construir_li("MenuPropuesta", "Propuesta","Propuesta", "Propuesta" , idincidencia.ToString(), false, true);
                    tag.InnerHtml += itemTab3.ToString();

                    //var itemTag4 = construir_li("MenuCotizar", "Cotizacion", "/Agendamiento/Cotizacion/CotizarIncidencia?idincidencia=" + idincidencia, true, true);
                    //tag.InnerHtml += itemTag4.ToString();
                    var itemTag5 = construir_li("MenuEstadoFisico", "Estado Físico","Agendamiento", "EstadoFisico", idincidencia.ToString(), true, true);
                    tag.InnerHtml += itemTag5.ToString();
                }
                else if (model.idetapa == 4)
                {
                    if (model.requiereevaluacion)
                    {
                        var itemTag2 = construir_li("MenuEvaluacion", "Evaluación de Garantía","Evaluacion", "AtencionEvaluacion", idincidencia.ToString(), false, true);
                        tag.InnerHtml += itemTag2.ToString();
                    }

                    var itemTab3 = construir_li("MenuPropuesta", "Propuesta","Propuesta", "Propuesta" , idincidencia.ToString(),false, true);
                    tag.InnerHtml += itemTab3.ToString();

                    //var itemTag4 = construir_li("MenuCotizar", "Cotizacion", "/Agendamiento/Cotizacion/CotizarIncidencia?idincidencia=" + idincidencia, false, true);
                    //tag.InnerHtml += itemTag4.ToString();

                    var itemTag5 = construir_li("MenuEstadoFisico", "Estado Físico","Agendamiento", "EstadoFisico", idincidencia.ToString(),false, true);
                    tag.InnerHtml += itemTag5.ToString();

                }
          

                Divtag.InnerHtml += tag.ToString();
                Navtag.InnerHtml += Divtag.ToString();

                return new MvcHtmlString(Navtag.ToString());
            }
            else
            {
                var tag = new TagBuilder("ul");
                tag.Attributes.Add("id", "ulestado");
                tag.AddCssClass("nav nav-pills nav-stacked");


                var itemTag = new TagBuilder("li");
                var linkTag = new TagBuilder("a");
                linkTag.InnerHtml = "Ver Incidencia" + " <span class='badge'>" + "Activo" + "</span>";
                //linkTag.Attributes.Add("href", @Url.Action("VerIncidencia", "Agendamiento", new { idincidencia = @Model.idincidencia }", 1));

                itemTag.Attributes.Add("id", "MenuIncidencia");

                itemTag.InnerHtml = linkTag.ToString();
                tag.InnerHtml += itemTag.ToString();
                return new MvcHtmlString(tag.ToString());
            }

        }
        private TagBuilder construir_li(string id, string nombre, string controller,string ruta, string idincidencia, bool pendiente, bool pasoanterior)
        {
            var itemTag = new TagBuilder("li");
            var linkTag = new TagBuilder("a");
            linkTag.InnerHtml = nombre + (pendiente ? "<sup class='text-warning fw-semi-bold'>Pendiente</sup>" : "");
            itemTag.Attributes.Add("id", id);
            if (!pasoanterior)
                linkTag.Attributes.Add("href", "javascript:    swal('No puede continuar','Tiene que completar el paso previo','warning')");
            else
            {
                string dominio = ConfigurationManager.AppSettings["dominio"].ToString();
                if(!string.IsNullOrEmpty(dominio))
                    ruta = dominio + ruta;
                linkTag.Attributes.Add("onClick", "HrefLink('" + ruta + "','"+ controller +"', '"+ idincidencia +"')");
            }

            itemTag.InnerHtml = linkTag.ToString();
   


            return itemTag;
        }

    }
    public class LibroReclamacionesModel
    {
        public int idreclamo { get; set; }
        public string numeroreclamacion { get; set; }
        public int idsucursal { get; set; }
        public int idtiporeclamo { get; set; }
        public DateTime fechahorareclamo { get; set; }
        public int idusuarioregistro { get; set; }
        public int idcondicionreclamo { get; set; }
        public string motivo { get; set; }
        public string detalle { get; set; }
        public int tipoenviorespuesta { get; set; }
        public bool aceptaregistrodatos { get; set; }
        public string respuesta { get; set; }
        public DateTime fecharespuesta { get; set; }
        public bool escaladoaindecopi { get; set; }
        public int idsedeindecopi { get; set; }
        public int idresponsable { get; set; }
        public DateTime fechahorarecepcion { get; set; }
        public string respuestaaindecopi { get; set; }
        public int diasrespuesta { get; set; }
        public long idincidencia { get; set; }
        public int idestado { get; set; }

    }
    public class EvaluacionModel : IncidenciaModel
    {


        public long? idevaluaciongarantia { get; set; }
        public int idcondicion { get; set; }
        public bool valor { get; set; }
        public string observacion { get; set; }


        //Datos Evaluación
        public List<ListarCondiciones> ListaCondiciones { get; set; }
        public List<GarantiaModel> ListaGarantias{ get; set; }

        //Datos Incidencia

        public string requerimiento { get; set; }
        public string monto { get; set; }
        public string fecha { get; set; }
        
        public string vencimiento { get; set; }

        //Datos Propuesta
        public string ResultadoEvaluacion { get; set; }
        public bool Evaluacion { get; set; }
        public int idpropuesta { get; set; }
        public string ObservacionPropuesta { get; set; }



    }

    public class ListarCondiciones
    {
        public int idcondicion { get; set; }
        public string tipocondicion { get; set; }
        public string descripcion { get; set; }

        public bool? activo { get; set; }

        public bool valor { get; set; }

    }

    public class EstadoFisicoModel
    {
        public long idincidencia { get; set; }
        public string idsaccesorios { get; set; }
    }


    public class PropuestaModel 
    {

        public int idpropuestasolucion { get; set; }
        public bool requiereaprobacion { get; set; }
        public string descripcion { get; set; }
        public bool requieredocumentointerno { get; set; }
        public bool requierecotizacion { get; set; }
        public int idpropuesta { get; set; }
    }
    public class SolucionModel : IncidenciaModel
    {
        //public long? idincidenciasolucion { get; set; }
        public bool clientesatisfecho { get; set; }
        public string observacion { get; set; }
        public bool evaluacion { get; set; }
        public string resultadoevaluacion { get; set; }

    }

    public class AccesorioModel
    {
        public int idaccesorio { get; set; }
        public string descripcion { get; set; }
    }

}

