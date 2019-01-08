var pedidodetalle_gridproductos = "#gridproductos";
var pedidodetalle_gridpedidospager = "#gridproductospager";

var btnAgregarDetalle = "#btnAgregarDetalle";

$(document).ready(function () {
    ConfigurarGrilla_gridproductos();
    $(btnAgregarDetalle).click(function (event) { btnAgregarDetalle_onclick(this, event); });
});
function ConfigurarGrilla_gridproductos() {
    var grilla = $(pedidodetalle_gridproductos);
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        colNames: ['','', 'Cod. Producto', 'Descripción', 'Cantidad', 'Precio <br /> Unitario', 'Importe'],
        colModel:
        [
            { key: true, hidden: true, name: 'dpe_int_id', index: 'dpe_int_id' },
            { key: true, hidden: false, name: 'dpe_int_id',  width: '100',index: 'dpe_int_id', formatter: bottoneliminarproducto_formatter },
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
function btnAgregarDetalle_onclick(obj, event) {

    var url = $(obj).data("url");

    $.get(url, function (data) {
        $("#modalcontentIncidenciasP").html(data);
        $("#modalcontainerIncidenciasP").modal("show");

        var config = {
            '.chosen-select': {},
            '.chosen-select-deselect': { allow_single_deselect: true },
            '.chosen-select-no-results': { no_results_text: 'Oops, no se encontró el producto!' }
        }

        for (var selector in config) {
            $(selector).chosen(config[selector]);
        }

        ChangeComboProductos();
    });
}
function ChangeComboProductos() {

    $("#ddlDetalleProducto").chosen().change(function () {

        var pro_int_id = (+$(this).val());

        $.ajax(
            {
                type: "POST",
                async: true,
                url: $("#ddlDetalleProducto").data("url").trim(),
                data: { "producto": pro_int_id },
                success: function (data) {
                    $("#hdIdProducto").val(data.pro_int_id);
                    $("#txtDetCodigo").val(data.pro_str_codigo);
                    $("#txtDetDescripcion").val(data.pro_str_descripcion);
                    $("#txtDetPrecio").val(data.pro_dec_precio);
                },
                error: function (request, status, error) {
                    swal({ title: "Error!", text: "¡No se pudo cargar los datos del producto!", type: "error", confirmButtonText: "Aceptar" });
                }
            });
    })
}

function AgregarDetalle() {

    var id_producto = $("#txtDetCodigo").val();
    var co_item = $("#txtDetCodigo").val();
    var co_desc = $("#txtDetDescripcion").val();
    var cantidad = $("#txtDetCantidad").val();
    var descuento = $("#txtDetDescuento").val();
    var precio = $("#txtDetPrecio").val();
    var idPedido = $('#ped_int_id').val();

    if (id_producto == "" || precio == "" || cantidad == "") {
        swal({ title: "¡Error!", text: "¡Ingresar producto, cantidad y precio!", type: "error", confirmButtonText: "Aceptar" });
    }
    else {
        var url = $('#gridproductos').data("urladd") + "?pedido=" + idPedido + "&codigo=" + co_item + "&descripcion=" + co_desc + "&cantidad=" + cantidad + "&descuento=" + descuento + "&precio=" + precio;
        var grilla = $(pedidodetalle_gridproductos);
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data) {
                        if (data.res == true) {
                            swal("¡Correcto!", "El detalle fue eliminado", "success")
                            var vdataurl = $(grilla).data("dataurl") + '?id=' + idPedido;
                            $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');

                            $('#totalventa').val(data.ped_dec_montototal);



                        }
                        else {
                            swal({ title: "¡Error!", text: "Ocurrió un error al eliminar el detalle", type: "error", confirmButtonText: "Aceptar" });
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "Error!", text: "¡Ocurrió un error al agregar el detalle!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });

        //oDetalleTable.draw();
        $("#modalcontainerIncidenciasP").modal("hide");
    }
}

function bottoneliminarproducto_formatter(cellvalue, options, rowObject) {
    var control = $("<button></button>");
    control.append("<i class='fa fa-cut'></i>")
    control.append("Eliminar")
    control.addClass("btn btn-primary btn-xs btn-outline")
    control.attr("id", "lnk" + cellvalue);
    control.attr("onclick", "irEliminarProducto('" + cellvalue + "')");

    var htmlcontrol = control[0].outerHTML;
    return htmlcontrol
}
function irEliminarProducto(id)
{
    swal({
        title: "Eliminar Producto",
        text: "¿Esta seguro que desea eliminar el detalle del pedido?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Eliminar',
        closeOnConfirm: false,
        closeOnCancel: true
    },
     function () {
         var grilla = $(pedidodetalle_gridproductos);
         var vUrl = $(grilla).data("delete");
               $.ajax(
                {
                    url: vUrl,
                    type: "POST",
                    async: true,
                    data: { id: id },
                    success: function (data) {
                        if (data.resp == true) {
                            swal("¡Correcto!", "El detalle fue eliminado", "success")
                            var vdataurl = $(grilla).data("dataurl") + '?id=' + id;
                            $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');

                            $('#totalventa').val(data.ped_dec_montototal);



                        }
                        else {
                            swal({ title: "¡Error!", text: "Ocurrió un error al eliminar el detalle", type: "error", confirmButtonText: "Aceptar" });
                        }

                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "Ocurrió un error al eliminar el detalle", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
           });

 
  
}