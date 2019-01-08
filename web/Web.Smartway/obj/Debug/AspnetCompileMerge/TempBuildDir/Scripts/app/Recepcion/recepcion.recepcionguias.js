
const $grilla = $("#gridguias")
const $pagergrilla = $("#gridguiaspager")
const $btnBuscar = $("#btnBuscar")
const $btnNuevo = $("#btnNuevo")

$(document).ready(function () {
    inicio();
});
function inicio()
{
    configurarGrilla();
    configurarControles();
   // CargaDetalleGuia();
}
function configurarGrilla()
{
    var idsucursalorigen = $("#searchmodal_idsucursalorigen").val();
    var idsucursaldestino = $("#searchmodal_idsucursaldestino").val();



    $.jgrid.defaults.height = 520;
    $.jgrid.defaults.responsive = true;
    var vdataurl = $grilla.data("dataurl") + 
     "?idsucursalorigen="  + idsucursaldestino 
     + "&idsucursaldestino=" + idsucursaldestino 


    $grilla.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['','N° Guía' , 'Dirección Origen' ,'Dirección Destino','Tipo OST', 'Cod. Sucursal Origen', 'Acciones'],
        colModel:
        [
            { key: true, hidden: true, name: 'idguiaremision', align: 'center' },
            { key: false, name: 'numeroguia',  align: 'center',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'codigoorigen', width:'140',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'direccionorigen',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'direcciondestino',  align: 'center',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'descripcion',  align: 'center', width:'110',  sortable: false,  formatter: formatedit  },
            { key: false, hidden: false, editable: false ,name: 'idguiaremision', width:'140' , index: 'idguiaremision' ,  formatter:  displayButtons,classes:"grid-col"}
            
        ],
        pager: $pagergrilla,
        rowNum: 10,
        rowList: [10, 20],
        emptyrecords: 'No se encontraron registros',
        autoheight: true,
        autowidth: true,
        shrinkToFit: true,
        multiselect: false,
        jsonReader:
        {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            id: 0
        },
    });

}
function configurarControles()
{
    $('#data_2 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });
   
    $btnBuscar.click(function (e) { 
        e.preventDefault();
        reload()
        
    });
    $btnNuevo.click(function (e) { 
        e.preventDefault();
        var url = UrlHelper.Action("ProgramarGuiasModal", "Despacho", "Despacho") 

          $.get(url, function (data) {
              $("#modalcontentL").html(data);
              $("#modalcontainerL").modal("show");
    
              inicializandoModal();
              configurarGrillaModal();
    
    
        });
      });
}
function inicializandoModal()
{
    $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });
}



function seleccionar_formmatterIncidencia(cellvalue, options, rowObject) {
    var lnk = $("<button type='button' class='btn btn-primary btn-outline btn-xs' ><i class='fa fa-check-circle-o'></i>   "+ cellvalue +"</button>");
    $(lnk).attr("onClick", "VerIncidencia('" + rowObject.idincidencia + "')"); 

    return $(lnk)[0].outerHTML;

}
function displayButtons(cellvalue, options, rowObject)
{
    var editar = '<div class="btn-group"><button type="button" title="Editar" class="btn btn-primary btn-xs " onclick="recepcionar(' + cellvalue + ')"><i class="fa fa-edit"></i> Recepcionar </button>';
   return   editar  ;
}

function reload()
{

    var idsucursalorigen = $("#search_idsucursalorigen").val();
    var idsucursaldestino = $("#search_idsucursaldestino").val();
    var idestado = $("#idestado").val().trim();
    var fechainicio = $("#fechainicio").val();
    var fechafin = $("#fechafin").val();

    var vdataurl = $grilla.data("dataurl") + 
     "?idsucursalorigen="  + idsucursaldestino 
     + "&idsucursaldestino=" + idsucursaldestino 
     + "&idestado="  + idestado 
     + "&fechainicio=" + fechainicio
     + "&fechafin=" + fechafin;

    $grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}

function reloadModal()
{

    
    var idsucursalorigen = $("#searchmodal_idsucursalorigen").val();
    var idsucursaldestino = $("#searchmodal_idsucursaldestino").val();

    const $grillamodal = $("#gridguias")
    const $pagergrillamodal = $("#gridguiaspager")


    var vdataurl = $grillamodal.data("dataurl") + 
     "?idsucursalorigen="  + idsucursaldestino 
     + "&idsucursaldestino=" + idsucursaldestino 


    $grillamodal.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}


function buscarGuias()
{
    reloadModal()
}

function Programar()
{
    const $grillamodal = $("#gridguias")
    let  selIds  =$grillamodal.jqGrid('getGridParam', 'selarrrow');
    let fecharecojo = $("#fecharecojo").val()
    let idtransporte = $("#ddltransportista").val()

    if(selIds == '')
    {
         swal("No puede continuar","Debe seleccionar al menos una guia")
         return;
    }
    if(idtransporte=='')
    {
        swal("No puede continuar","Debe seleccionar un transportista")
        return;
    }
    if(fecharecojo=='')
    {
        swal("No puede continuar","Debe seleccionar una fecha de recojo")
        return;
    }

   let vurl = UrlHelper.Action("JsonGenerarDespacho","Despacho","Despacho")

   $.ajax({
       type: "POST",
       url: vurl,
       data: {ids : String(selIds) , fecharecojo :fecharecojo, idtransporte : idtransporte  },
       dataType: "JSON",
       success: function (response) {
           if(response.res)
           {
               $("#modalcontainerL").modal("hide");
               reload()
               swal("Registro Correcto","El registro se he realizado correctamente", "success")

           }
       }
   });

}
function recepcionar(id)
{
    let vurl = UrlHelper.Action("RecepcionOrdenServicio","Recepcion","Recepcion") + "?id=" + id;
    window.location.href = vurl;
}
function CargaDetalleGuia()
{
    oDocumentosTable =
       $('.dataTables-tblDetalleGuia').DataTable({
           responsive: true,
           "searching": false,
           "ordering": true,
           "processing": false,
           "serverSide": true,
           "ajax": {
               "url": $('#tblDetalleGuia').data("url"),
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   {
                       "key": true, "title": "Id", "data": "dci_int_id", "name": "dci_int_id", "autoWidth": true, "class": "text-center",
                       "mRender":
                                function (data, type, full) {
                                    return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                }

                   },
                   { "title": "N° Documento", "data": "documento_interno", "name": "documento_interno", "autoWidth": true, "class": "text-center" },
                   { "title": "Item", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true },
                   { "title": "Descripción", "data": "pro_str_descripcion", "name": "pro_str_descripcion", "autoWidth": true, "class": "text-center" },
                   { "title": "Serie/IMEI", "data": "pro_str_serieimei", "name": "pro_str_serieimei", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Escaneado", "data": "imei_escaneado", "name": "imei_escaneado", "autoWidth": true, "class": "text-center",

                       "mRender": function (data, type, full)
                       {
                           var escaneo = data;
                           var imei = full.pro_str_serieimei;

                           if (RecepcionFinalizada == "True")
                           {
                               return "<span class='label label-primary'>" + " " + imei + " " + "</span>";
                           }
                           else
                           {
                               return  escaneo ;
                           }
                       }

                   },
                   {
                       "title": " Coincide", "data": "imei_coincide", "name": "imei_coincide", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           var requiere = full.requiere_imei;
                           var imei = data;

                           if (RecepcionFinalizada == "True")
                           {
                               if (requiere == false) {
                                   return "<span class='label label-primary'>" + " " + "NO REQUIERE" + " " + "</span>";
                               }
                               else 
                               {

                                       return "<span class='label label-primary'>" + " " + "SI" + " " + "</span>";
                               }
                           }
                           else {
                               if (requiere == false)
                               {
                                   return "<span class='label label-primary'>" + " " + "NO REQUIERE" + " " + "</span>";
                               }
                               else {
                                   if (imei == true) {
                                       return "<span class='label label-primary'>" + " " + "SI" + " " + "</span>";
                                   }
                                   else {
                                       return "<span class='label label-danger'>" + " " + "NO" + " " + "</span>";
                                   }
                               }
                           }
                       }
                   },
                   {
                       "title": "Recepción", "data": "dci_bit_recepcionalma", "name": "dci_bit_recepcionalma", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full) {
                           var recepcion = data;

                           if (recepcion == true)
                           {
                               return "<span class='label label-primary'>" + " " + "SI" + " " + "</span>";
                           }
                           else {
                               return "<span class='label label-danger'>" + " " + "NO" + " " + "</span>";
                           }
                       }
                   },
                  
                   {
                       "title": "Fecha Recepción", "data": "dci_dat_fechrecepcionalma", "name": "dci_dat_fechrecepcionalma", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full) {
                           var recepcion = data;
                           if (recepcion == "")
                           {
                               return "<input disabled type='date'> </input>"
                           }
                           else {
                               return "<input disabled value='" + data + "'> </input>"
                           }
                       }
                   },
                   {
                       "title": "Motivo No Recepción", "data": "mnr_int_id", "name": "mnr_int_id", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full) {
                           var motivo = data;
                           var recepcion = full.dci_bit_recepcionalma;
                           var id = full.dci_int_id;


                           if (recepcion == true)
                           {
                               return "<span class='label label-primary'>" + " " + "Documento Recepcionado" + " " + "</span>";
                           }
                           else
                           {
                               var Controlselect = "<select id='ddlMotivo_" + id + "' onchange='ActualizarMotivo(" + id + ");'>"
                               Controlselect = Controlselect + '<option value="0">[Seleccionar]</option>';
                               $.each(DatosMotivoNoRecepcion, function (i, state) {
                                   if (motivo == state.Value)
                                   {
                                       Controlselect = Controlselect + '<option selected value="' + state.Value + '">' + state.Text + '</option>';
                                   }
                                   else {
                                       Controlselect = Controlselect + '<option value="' + state.Value + '">' + state.Text + '</option>';
                                   }
                               });
                               Controlselect = Controlselect + '</select>';
                               return Controlselect;
                           }                   
                       }
                   },
           ]
       });
}
