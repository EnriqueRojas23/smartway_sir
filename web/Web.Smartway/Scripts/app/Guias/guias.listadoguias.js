const URL_NuevaGuia = UrlHelper.Action("NuevaGuia", "Guias", "Guias");

const $grilla = $("#gridguias");
const $pagergrilla = $("#gridguiaspager");



const $grilladetalle = $("#griddetalle");
const $pagergrilladetalle = $("#gridetallepager");

$(document).ready(function () {
    Inicio();



});

function Inicio() {

    cargarControles();
    configurarGrilla();
    configurarGrillaDetalle();

}

function cargarControles() {



    $("#btnNuevo").click(function () {
        $.get(URL_NuevaGuia, function (data) {
            $("#modalcontent").html(data);
            $("#modalcontainer").modal("show");
            

               $('#data_3 .input-group.date').datepicker({
                    todayBtn: "linked",
                    keyboardNavigation: false,
                    forceParse: false,
                    calendarWeeks: true,
                    autoclose: true,
                    format: 'dd/mm/yyyy'
                });

            $('#numeroguia').mask('000-0000000');

        })
    })

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
        $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

}
function configurarGrilla() {




    $.jgrid.defaults.height = 520;
    $.jgrid.defaults.responsive = true;
    var vdataurl = $grilla.data("dataurl") +
        "?idsucursalorigen="
        + "&idsucursaldestino=";


        //alert(vdataurl);

    $grilla.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['', 'N° Guía', 'Dirección Origen', 'Dirección Destino', 'Fecha Guía', 'Destinatario', 'Acciones'],
        colModel:
            [
                { key: true, hidden: true, name: 'idguiaremision', align: 'center' },
                { key: false, name: 'numeroguia', align: 'center', sortable: false, formatter: formatedit },
                { key: false, name: 'direccionorigen', align: 'center', sortable: false, formatter: formatedit },
                { key: false, name: 'direcciondestino', align: 'center', sortable: false, formatter: formatedit },
                { key: false, name: 'fechaguiaremision', width: '140', align: 'center', sortable: false, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' } },
                { key: false, name: 'destinatario', align: 'center', width: '110', sortable: false, formatter: formatedit },
                { key: false, hidden: false, editable: false, name: 'idguiaremision', width: '140', index: 'idguiaremision', formatter: displayButtons, classes: "grid-col" }

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
function displayButtonsDetalle(cellvalue, options, rowObject) {
    var imprimir = '<div class="btn-group"><button type="button" title="Eliminar" class="btn btn-primary btn-xs " onclick="EliminarDetalle(' + cellvalue + ')"><i class="fa fa-trash"></i> </button></div>';
       return imprimir ;
}
function displayButtons(cellvalue, options, rowObject) {
    var editar = '<div class="btn-group"><button type="button" title="Agregar" class="btn btn-dangers btn-xs " onclick="agregarDetalle(' + cellvalue + ')"><i class="fa fa-plus"></i> </button>';
    var ver = '<button type="button" title="Ver" class="btn btn-primary btn-xs " onclick="verDetalle(' + cellvalue + ')"><i class="fa fa-search"></i> </button>';
    var imprimir = '<button type="button" title="Imprimir" class="btn btn-primary btn-xs " onclick="imprimir(' + cellvalue + ')"><i class="fa fa-print"></i> </button></div>';
       return editar  +  ver + imprimir ;
}
function OnCompleteTransaction(xhr, status)
{
    var jsonres = xhr.responseJSON;
    CleanValidationError();

    if (jsonres.res == true)
    {
       swal({
           title: "Registro exitoso.",
           text: "Se ha creado la cabecera de la Guía.",
            type: "success"
        },
       function ()
       {
           $("#modalcontainer").modal("hide");
            reload();
       });

       
    }
    else
    {
        sweetAlert("Verificar Errores", null, "error");
        CheckValidationErrorResponse(jsonres);
    }

}
function reload()
{
    let codigoalmacen = $("#codigoalmacen").val();
    let idsucursal = $("#idsucursal").val();

    var vdataurl = $grilla.data("dataurl") +
        "?idsucursalorigen=" + codigoalmacen
        + "&idsucursaldestino=" + idsucursal;

    $grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function agregarDetalle(id) {

    let URL_NuevoDetalle = UrlHelper.Action("NuevoDetalleGuia", "Guias", "Guias") + "?id=" + id;

    $.get(URL_NuevoDetalle, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");

        let url_obtenerost = UrlHelper.Action("obtenerOrdenServicio", "OrdenServicio", "Agendamiento");
        $('#codigo').on('blur', function () {
            
               $.ajax({
                   type: "POST",
                   url: url_obtenerost,
                   data: { numeroordenservicio : $('#codigo').val()  },
                   dataType: "JSON",
                   success: function (response) {
                       $('#codigo').val(response.jsonObject.numeroost);
                       $('#descripcion').val(response.jsonObject.producto);
                       $('#cantidad').val(1);
                       $("#idordenservicio").val(response.jsonObject.idordenserviciotecnico)
                   }
               }); 

        });

    });

}
function verDetalle(id)
{

    $("html, body").animate({ scrollTop: "900px" });

    reloadGrid_Detalle(id);
}


function reloadGrid_Detalle(id)
{
    var vdataurl = $grilladetalle.data("dataurl") + "?idguiaremision=" + id;
    $grilladetalle.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}

function configurarGrillaDetalle() {



    $.jgrid.defaults.height = 520;
    $.jgrid.defaults.responsive = true;
    var vdataurl = $grilladetalle.data("dataurl") + "?idguiaremision=" ;


    $grilladetalle.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['', 'Código', 'Descripción', 'Cantidad',  'Acciones'],
        colModel:
            [
                { key: true, hidden: true, name: 'idguiadetalle', align: 'center' },
                { key: false, name: 'codigo',width: '40', align: 'center', sortable: false, formatter: formatedit },
                { key: false, name: 'descripcion',width: '440', align: 'left', sortable: false, formatter: formatedit },
                { key: false, name: 'cantidad', width: '40',align: 'center', sortable: false, formatter: formatedit },
                { key: false, hidden: false, width: '40' ,editable: false, name: 'idguiadetalle', index: 'idguiadetalle', formatter: displayButtonsDetalle, classes: "grid-col" }

            ],
        pager: $pagergrilladetalle,
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
function imprimir(id)
{
    var url = "http://104.36.166.65/repsw/guiatransportista.aspx?idguiaremision=" + String(id);
    window.open(url);
}