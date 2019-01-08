
$(document).ready(function () {

    Configurar_DatePicker();
    Configurar_Combos();
    configurarGrilla();

})
function configurarGrilla() {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.height = 320;
    $.jgrid.defaults.responsive = true;

    //$("#IdEstadoPedido").val(1);
    //$("#EstadoDescripcion").val("Por Verificar");

    var grilla = $('gridincidencias');
    var pagergrilla = $('gridincidenciaspager');
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        //postData: getDataForm(),
        //styleUI: 'Bootstrap',
        colNames: ['', 'Num. Pedido', 'Cliente', 'Dirección', 'Ubigeo', 'Fecha Pedido', 'Estado', 'Monto Total', 'Tiempo Estimado', 'Tipo Entrega'],
        colModel:
        [
            { key: true, hidden: true, name: 'ped_int_id', index: 'ped_int_id' },
            { key: false, hidden: false, name: 'ped_str_numero', index: 'ped_str_numero', width: '120', align: 'center' },
            { key: false, hidden: false, name: 'ped_str_cliente', index: 'ped_str_cliente', width: '250', align: 'left' },
            { key: false, hidden: false, name: 'ped_str_direccion', index: 'ped_str_direccion', width: '250', align: 'left' },
            { key: false, hidden: false, name: 'dis_str_descrip', index: 'dis_str_descrip', width: '200', align: 'left' },
            { key: false, hidden: false, name: 'ped_dat_fechapedido', index: 'ped_dat_fechapedido', width: '120', align: 'center', formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' } },
            { key: false, hidden: false, name: 'est_str_descrip', index: 'est_str_descrip', width: '150', align: 'left' },
            { key: false, hidden: false, name: 'ped_dec_montototal', index: 'ped_dec_montototal', width: '80', align: 'right', formatter: 'currency', formatoptions: CONFIG_JQGRID.get('formatoptions_currency_pen') },
            { key: false, hidden: false, name: 'ped_str_tiempoestimado', index: 'ped_str_tiempoestimado', width: '200', align: 'left' },
            { key: false, hidden: false, name: 'ped_str_tipoentrega', index: 'ped_str_tipoentrega', width: '200', align: 'left' },

        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        pager: pagergrilla,
        rowNum: CONFIG_JQGRID.get('rownum'),
        rowList: CONFIG_JQGRID.get('rowlist'),
        emptyrecords: CONFIG_JQGRID.get('emptyrecords'),
        autoheight: true,
        autowidth: true,
        shrinkToFit: false,
        multiselect: true,
        beforeRequest: function () {
            var $self = $(this);
            var postData = $self.jqGrid('getGridParam', 'postData');
            $.each(postData, function (index, value) {
                if (value.name == "rows") {
                    postData[index].value = postData.rows;
                }
                if (value.name == "page") {
                    postData[index].value = postData.page;
                }
                if (value.name == "sord") {
                    postData[index].value = postData.sord;
                }
            })
            $self.jqGrid('setGridParam', { postData: postData });
        },
        loadComplete: function (data) {
            var numerofilas = $(this).getGridParam("records");
            var texto = $("#EstadoDescripcion").val() + " (" + numerofilas + ")";

            $("#titulo_estado").html(texto);
            setStyleCheckBoxGrid(this);
        },
    });

    ocultarColumnas(1);

}
function buscarIncidencias() {
    var grilla = $("#gridlistaincidencias");
    var ci = $('#ci_int_id').val();
    var ti = $('#ti_int_id').val();
    var mc = $('#mc_int_id').val();
    var eta = $('#eta_int_id').val();
    var tien = $('#co_tien').val();
    var fechaIn = $('#inc_dat_fechaInicio').val();
    var fechaFin = $('#inc_dat_fechaFin').val();
    var nro = $('#numeroIncidencia').val();


    var vdataurl = $(grilla).data("dataurl") + "?ci=" + ci + "&ti=" + ti + "&mc=" + mc + "&eta=" + eta + "&tien=" + tien +
        "&fechaIn=" + fechaIn + "&fechaFin=" + fechaFin + "&nro=" + nro;

    $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function Configurar_Combos()
{

    var subsistema = "1";


    $("#ci_int_id").change(function () {
        var cincidencia = $("#ci_int_id").val();

        if (cincidencia == "") {
            swal({ title: "Error!", text: "Seleccionar clase de incidencia", type: "error", confirmButtonText: "Aceptar" });
        }
        else {
            $.ajax(
               {
                   type: "POST",
                   async: true,
                   url: $("#ci_int_id").data("url").trim(),
                   data: { "subsistema" : subsistema , "IdClaseIncidencia": cincidencia },
                   success: function (data) {
                       var $select = $('#ti_int_id');
                       $select.empty();
                       $("#ti_int_id").append('<option value="">[ Todos ]</option>');
                       $.each(data, function (i, state) {
                           $('<option>', {
                               value: state.Value
                           }).html(state.Text).appendTo($select);
                       });
                   },
                   error: function (request, status, error) {
                       swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                   }
               });
        }
    })
    $("#ti_int_id").change(function () {
        var cincidencia = $("#ci_int_id").val();
        var tincidencia = $("#ti_int_id").val();
        $.ajax(
               {
                   type: "POST",
                   async: true,
                   url: $("#ti_int_id").data("url").trim(),
                   data: { "IdClaseIncidencia": cincidencia, "IdTipoIncidencia": tincidencia , "subsistema" : subsistema},
                   success: function (data) {
                       var $select = $('#mc_int_id');
                       $select.empty();
                       $("#mc_int_id").append('<option value="">[Medio comunicación]</option>');
                       $.each(data, function (i, state) {
                           $('<option>', {
                               value: state.Value
                           }).html(state.Text).appendTo($select);
                       });
                   },
                   error: function (request, status, error) {
                       swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                   }
               });
    })
}

function Configurar_DatePicker()
{
    
    $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });
    $('#data_2 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#data_3 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $(".touchspin3").TouchSpin({
        verticalbuttons: true,
        buttondown_class: 'btn btn-white',
        buttonup_class: 'btn btn-white'
    });

    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
        $('#gridclientes').setGridWidth(width);
        $('#gridDocumentos').setGridWidth(width);
        $('#gridDocumentos').setGridWidth(width);
        $('#gridArticulosReclamados').setGridWidth(width);
    });


}

  
function buscarEnvios()
{

}