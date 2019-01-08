var pedidodetalle_gridproductos = "#gridproductos";
var pedidodetalle_gridpedidospager = "#gridproductospager";

var pedidodetalle_gridproductostransferir = "#gridproductostransferir";
var pedidodetalle_gridproductostransferirspager = "#gridproductostransferirspager";

$(document).ready(function () {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.emptyrecords

    ConfigurarGrilla_gridproductos();
    ConfigurarGrilla_gridproductostransferir();

    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
        //$(pedidodetalle_gridproductos).setGridWidth(width);
        $(pedidodetalle_gridpedidospager).width($("#gbox_gridproductos").width() + 2)
    });

    $("button#btnGenerarComprobante").click(function (event) { GenerarComprobante(this); })

});

function ConfigurarGrilla_gridproductos() {
    var grilla = $(pedidodetalle_gridproductos);
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        colNames: ['', 'Cod. Producto', 'Descripción', 'Cantidad', 'Precio <br /> Unitario', 'Importe'],
        colModel:
        [
            { key: true, hidden: true, name: 'dpe_int_id', index: 'dpe_int_id' },
            { key: false, hidden: false, name: 'pro_str_codigo', index: 'pro_str_codigo', width: '120', align: 'center' },
            { key: false, hidden: false, name: 'pro_str_descripcion', index: 'pro_str_descripcion', width: '280', align: 'Left' },
            { key: false, hidden: false, name: 'dpe_int_cantidad', index: 'dpe_int_cantidad', width: '80', align: 'center' },
            { key: false, hidden: false, name: 'dpe_dec_preciounitario', index: 'dpe_dec_preciounitario', width: '80', align: 'right' },
            { key: false, hidden: false, name: 'dpe_dec_subtotal', index: 'dpe_dec_subtotal', width: '80', align: 'right' },
        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        pager: $(pedidodetalle_gridpedidospager),
        rowNum: CONFIG_JQGRID.get('rownum'),
        rowList: CONFIG_JQGRID.get('rowlist'),
        emptyrecords: CONFIG_JQGRID.get('emptyrecords'),
        autowidth: true,
        height: 100,
        //autoheight: true,
        shrinkToFit: false,
        viewrecords: true,
        loadComplete: function (data) { showEmptyRecordsGrid(this); }
    });


    $("#pg_gridproductospager").remove();
}

function ConfigurarGrilla_gridproductostransferir() {

    var grilla = $(pedidodetalle_gridproductostransferir);
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        colNames: ['', 'Cod. Producto', 'Descripción', 'Tienda Origen', 'Tienda Destino', 'Cant. Transferir', 'Estado'],
        colModel:
        [
            { key: true, hidden: false, name: 'tra_int_id', index: 'tra_int_id', width: '30', align: 'center' },
            { key: false, hidden: false, name: 'pro_str_codigo', index: 'pro_str_codigo', width: '30', align: 'center' },
            { key: false, hidden: false, name: 'pro_str_descripcion', index: 'pro_str_descripcion', width: '30', align: 'left' },
            { key: false, hidden: false, name: 'tiendaorigen', index: 'tiendaorigen', width: '30', align: 'left' },
            { key: false, hidden: false, name: 'tiendadestino', index: 'tiendadestino', width: '30', align: 'left' },
            { key: false, hidden: false, name: 'tra_int_cant', index: 'tra_int_cant', width: '30', align: 'center' },
            { key: false, hidden: false, name: 'est_str_descrip', index: 'est_str_descrip', width: '30', align: 'left' },
        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        pager: $(pedidodetalle_gridproductostransferirspager),
        rowNum: CONFIG_JQGRID.get('rownum'),
        rowList: CONFIG_JQGRID.get('rowlist'),
        emptyrecords: CONFIG_JQGRID.get('emptyrecords'),
        autowidth: true,
        //height: 100,
        autoheight: true,
        shrinkToFit: true,
        viewrecords: true,
        loadComplete: function (data) { showEmptyRecordsGrid(this); }
    });


}

function GenerarComprobante(obj)
{
    var urlmodal = $(obj).data("urlmodal");
    $.get(urlmodal, function (data) {
       $("#modalcontent").html(data);
       $("#modalcontainer").modal("show");
    });
}

function GenerarComprobanteModal_Complete(xhr, status) {
    var jsonres = xhr.responseJSON;
    if (jsonres.res == true) {
        vurl = jsonres.url;
        $(document).attr("location", vurl);
    }
    else { CheckValidationErrorResponse(jsonres, null, $("#ValidationSummaryComprobanteModal")); }
}