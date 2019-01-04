
const $grilla = $("#gridprogramacion")
const $pagergrilla = $("#gridprogramacionpager")
const $btnBuscar = $("#btnBuscar")
const $btnNuevo = $("#btnNuevo")




$(document).ready(function () {
    inicio();
});
function inicio()
{
    configurarGrilla();
    configurarControles();
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
function configurarGrillaModal()
{
    var idsucursalorigen = $("#searchmodal_idsucursalorigen").val();
    var idsucursaldestino = $("#searchmodal_idsucursaldestino").val();

    const $grillamodal = $("#gridguias")
    const $pagergrillamodal = $("#gridguiaspager")

    $.jgrid.defaults.height = 220;
    $.jgrid.defaults.responsive = true;
    var vdataurl = $grillamodal.data("dataurl") + 
     "?idsucursalorigen="  + idsucursaldestino 
     + "&idsucursaldestino=" + idsucursaldestino 


    $grillamodal.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['','Cod.' , 'Dirección Origen' ,'Dirección Destino','Tipo OST', 'Nro Guía'],
        colModel:
        [
            { key: true, hidden: true, name: 'idguiaremision', align: 'center' },
            { key: false, name: 'codigoorigen', width:'40',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'direccionorigen', width:'240', align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'direcciondestino',  width:'240' ,align: 'center',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'descripcion',  align: 'center', width:'110',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'numeroguia',  align: 'center',  sortable: false,  formatter: formatedit  },
        ],
        pager: $pagergrillamodal,
        rowNum: 10,
        rowList: [10, 20],
        emptyrecords: 'No se encontraron registros',
        autoheight: true,
        autowidth: true,
        shrinkToFit: true,
        multiselect: true,
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

function configurarGrilla()
{
   
        

            var idsucursalorigen = $("#search_idsucursalorigen").val();
            var idsucursaldestino = $("#search_idsucursaldestino").val();
            var idestado = $("#idestado").val().trim();
            var fechainicio = $("#fechainicio").val();
            var fechafin = $("#fechafin").val();

            $.jgrid.defaults.height = 320;
            $.jgrid.defaults.responsive = true;
            var vdataurl = $grilla.data("dataurl") + 
             "?idsucursalorigen="  + idsucursaldestino 
             + "&idsucursaldestino=" + idsucursaldestino 
             + "&idestado="  + idestado 
             + "&fechainicio=" + fechainicio
             + "&fechafin=" + fechafin;


            //'✓'
            $grilla.jqGrid({
                url: vdataurl,
                datatype: 'json',
                mtype: 'POST',
                colNames: ['','N°' , 'Origen' ,'Destino','Transportista', 'Estado',
                'Fecha Recojo', 'Usuario', 'Acciones'],
                colModel:
                [
                    { key: true, hidden: true, name: 'idprogramacion', align: 'center' },
                    { key: false, name: 'numero', width:'240',  align: 'center', sortable: false, formatter: seleccionar_formmatterIncidencia },
                    { key: false, name: 'sucursalorigen',  align: 'center',  sortable: false,  formatter: formatedit  },
                    { key: false, name: 'sucursaldestino',  align: 'center',  sortable: false,  formatter: formatedit  },
                    { key: false, name: 'razonsocial', width:'110',  align: 'center',  sortable: false,  formatter: formatedit  },
                    { key: false, name: 'estado',  align: 'center', width:'110',  sortable: false,  formatter: formateditcolor     },
                    { key: false, name: 'fecharecojo',  align: 'center', sortable: false, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' } },
                    { key: false, name: 'usuarioprogramacion',  align: 'center', width:'220', sortable: false,  formatter: formatedit  },
                    { key: false, hidden: false, editable: false ,name: 'idprogramacion', width:'140' , index: 'idprogramacion' ,  formatter:  displayButtons,classes:"grid-col"}
                    // { key: false, name: 'total',  align: 'center', sortable: false, formatter: 'currency', formatoptions: CONFIG_JQGRID.get('formatoptions_currency_pen') },
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


function seleccionar_formmatterIncidencia(cellvalue, options, rowObject) {
    var lnk = $("<button type='button' class='btn btn-primary btn-outline btn-xs' ><i class='fa fa-check-circle-o'></i>   "+ cellvalue +"</button>");
    $(lnk).attr("onClick", "VerIncidencia('" + rowObject.idincidencia + "')"); 

    return $(lnk)[0].outerHTML;

}
function displayButtons(cellvalue, options, rowObject)
{
    var editar = '<div class="btn-group"><button type="button" title="Despachar" class="btn btn-primary btn-xs btn-outline" onclick="entregarcurier(' + cellvalue + ')"><i class="fa fa-truck"></i> </button>';
    var eliminar = '<button type="button" class="btn btn-primary btn-xs btn-outline" onclick="irEliminar(' + cellvalue + ')"><i class="fa fa-trash"></i></button>';
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
function entregarcurier(id){
  
  let URL_Enviarguias =  UrlHelper.Action("DespacharGuiasDelivery","Despacho","Despacho")


          swal({
            title: "Entrega para Delivery",
            text: "¿Está seguro que desea realizar la operación? ",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Enviar',
            closeOnConfirm: true,
            closeOnCancel: true
        },
         function (isConfirm) {
               if (isConfirm) {


        $.ajax({
            type: "POST",
            url: URL_Enviarguias,
            data: {"idprogramacion" : id },
            success: function (response) {

               reload()
                 }
            });


          
            }
        }
    )
}