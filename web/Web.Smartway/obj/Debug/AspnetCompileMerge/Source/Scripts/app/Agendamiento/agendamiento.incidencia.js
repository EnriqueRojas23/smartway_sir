const $btnBuscar  =$("#btnBuscar");

const $btnNuevo = $("#btnNuevo");
const $grilla = $("#gridincidencia")
const $pagergrilla = $("#gridincidenciapager")




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
        reload();
        
    });

}
function reload(){
    var numeroincidencia =  $('#numeroincidencia').val()
    var numerodocumento =  $('#numerodocumento').val()
    var fechainicio =  $('#fechainicio').val()
    var fechafin =  $('#fechafin').val()


    var vdataurl = $grilla.data("dataurl")  + "?numeroincidencia=" + numeroincidencia + "&numerodocumento=" + numerodocumento
    + "&fechainicio=" + fechainicio + "&fechafin=" + fechafin

    $grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function configurarGrilla()
{
   
        
                    
                var numeroincidencia =  $('#numeroincidencia').val()
                var numerodocumento =  $('#numerodocumento').val()
                var fechainicio =  $('#fechainicio').val()
                var fechafin =  $('#fechafin').val()
        
            $.jgrid.defaults.height = 520;
            $.jgrid.defaults.responsive = true;
            var vdataurl = $grilla.data("dataurl") + "?numeroincidencia=" + numeroincidencia + "&numerodocumento=" + numerodocumento
            + "&fechainicio=" + fechainicio + "&fechafin=" + fechafin
            //'✓' 
            $grilla.jqGrid({
                url: vdataurl,
                datatype: 'json',
                mtype: 'POST',
                colNames: ['','N°' , 'Fecha' ,'Tipo','Garantía', 'Cita',
                'Sucursal', 'Cliente','Usuario Atención', 'Estado', 'N° Documento', 'Cod. Producto', 'Producto', 'Acciones'],
                colModel:
                [
                    { key: true, hidden: true, name: 'idincidencia', align: 'center' },
                    { key: false, name: 'numeroincidencia', width:'240',  align: 'center', sortable: true , formatter: seleccionar_formmatterIncidencia },
                    { key: false, name: 'fechahoraregistro',  align: 'center', sortable: true, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' } },
                    { key: false, name: 'tipoincidencia',  align: 'center',  sortable: false,  formatter: formatedit  },
                    { key: false, name: 'engarantia', width:'120',  align: 'center',  sortable: false,  formatter: semaforo  },
                    { key: false, name: 'idcita',  align: 'center', width:'110',  sortable: false,  formatter: semaforo  },
                    { key: false, name: 'sucursal',  align: 'center',  sortable: false,  formatter: formatedit  },
                    { key: false, name: 'cliente',  align: 'center', width:'320', sortable: true,  formatter: formatedit  },
                    { key: false, name: 'usuarioregistro',  align: 'center', width:'220', sortable: false,  formatter: formatedit  },
                    { key: false, name: 'estado',  align: 'center', width:'220', sortable: false,  formatter: formateditcolor  },
                    { key: false, name: 'numerocomprobante', align: 'center',width:'190',sortable: false },
                    { key: false, name: 'codigoproducto',  align: 'center', sortable: false ,formatter: formatedit },
                    { key: false, name: 'descripcionlarga',  align: 'center', width:'320', sortable: false,formatter: formatedit  },
                    // { key: false, hidden: false, editable: false ,name: 'idincidencia', width:'140' , index: 'idincidencia' ,  formatter:  displayEntrega,classes:"grid-col"},
                    { key: false, hidden: false, editable: false ,name: 'idincidencia', width:'140' , index: 'idincidencia' ,  formatter:  displayButtons,classes:"grid-col"}
                    // { key: false, name: 'total',  align: 'center', sortable: false, formatter: 'currency', formatoptions: CONFIG_JQGRID.get('formatoptions_currency_pen') },
                ],
                pager: $pagergrilla,
                rowNum: 20,
                rowList: [20, 40, 60, 80],
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
    var editar = '<div class="btn-group"><button type="button" title="Editar" class="btn btn-primary btn-xs btn-outline" onclick="editarIncidencia(' + cellvalue + ')"><i class="fa fa-edit"></i> </button>';
    var eliminar = '<button type="button" class="btn btn-primary btn-xs btn-outline" onclick="irEliminar(' + cellvalue + ')"><i class="fa fa-trash"></i></button>';
     return     eliminar ;
}
function displayEntrega(cellvalue, options, rowObject){
    return  '<div class="btn-group"><button type="button" title="Editar" class="btn btn-danger btn-xs " onclick="entregar(' + cellvalue + ')"><i class="fa fa-plus"></i> Entregar </button>';
}
function VerIncidencia(id)
{
    let vurl = UrlHelper.Action("VerIncidencia","Agendamiento","Agendamiento") + "?idincidencia=" + id;
    window.location.href = vurl;
}
function EvaluarPropuesta()
{
    $("#modalcontainer").modal("hide");
    let vurl = UrlHelper.Action("PropuestaSolucion","Agendamiento","Agendamiento") + "?idincidencia=" +  $("#idincidencia").val()    ;
    window.location.href = vurl;

}



function entregar()
{
    swal({
        title: "¿Entregarle al cliente?",
        text: "Esta seguro que desea entregarle al cliente",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Entregarle al cliente',
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function ()
    {
        $.ajax({
            type: "POST",
            url: url,
            data: {},
            async : true,
            dataType: "JSON",
            success: function (response) {
                if(response.res)
                {
                    swal("Recepción de Guía", "La guía ha sido recepcionada satisfactoriamente", "success");

                    
                    let vurl = UrlHelper.Action("PanelTrabajoTecnico","Reparacion","Reparacion")
                    window.location.href = vurl;
                    

                }
                else{
                    alert('no')
                }
            },
            error: function (request, status, error) {
                swal({ title: "Recepción Guías", text: "Ocurrió un error al finalizar la recepción", type: "error", confirmButtonText: "Aceptar" });
            }
        });


    });

}

function irEliminar(){
    alert('eliminando..')
}