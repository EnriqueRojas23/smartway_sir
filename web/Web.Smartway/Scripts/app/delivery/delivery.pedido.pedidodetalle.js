var pedidodetalle_gridproductos = "#gridproductos";
var pedidodetalle_gridpedidospager = "#gridproductospager";

var pedidodetalle_gridproductostransferir = "#gridproductostransferir";
var pedidodetalle_gridproductostransferirspager = "#gridproductostransferirspager";

var pedidodetalle_gridseguimiento = "#gridseguimiento";

//botones
var btverificar = "btverificar";
var btcancelar = "btcancelar";
var btasignartienda = "btasignartienda";
var btasignarmotorizado = "btasignarmotorizado";
var btliberar = "btliberar";
var btnentregar = "btnentregar";


$(document).ready(function () {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.emptyrecords

    ConfigurarGrilla_gridproductos();
    ConfigurarGrilla_gridproductostransferir();
    ConfigurarGrilla_gridseguimiento();
    obtenerControlesDisponibles();


    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
        //$(pedidodetalle_gridproductos).setGridWidth(width);
        $(pedidodetalle_gridpedidospager).width($("#gbox_gridproductos").width() + 2)
    });

    $(".wf").click(function (event) {
        switch (event.target.id)
        {
            case btverificar:
                btverificar_onclick(this, event);
                break;
            case btcancelar:
                btcancelar_onclick(this, event);
                break;
            case btasignartienda:
                btasignartienda_onclick(this, event);
                break;
            case btasignarmotorizado:
                btasignarmotorizado_onclick(this, event);
                break;
            case btliberar:
                btliberar_onclick(this, event);
                break;
            case btnentregar:
                btnentregar_onclick(this, event);
                break;
        }
    });

});

//verificar pedido
function btverificar_onclick(obj, event) {
    var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
    });
}

//cancelar pedido
function btcancelar_onclick(obj, event) {
    var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
    });
}

function btasignarmotorizado_onclick(obj, event) {
    var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        inicializarControlesMotorizado();
    });
}


function btnentregar_onclick(obj, event) {
    var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
    });
}

function btliberar_onclick(obj, event) {
    //var url = $(obj).data("url");
    //$.get(url, function (data) {
    //    $("#modalcontent").html(data);
    //    $("#modalcontainer").modal("show");
    //});

    swal({
        title: "Liberar Pedido",
        text: "¿Esta seguro que desea liberar el pedido?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Liberar',
        closeOnConfirm: false,
        closeOnCancel: true
    },
           function () {
               var url = $(obj).data("url") + "?id=" + $("#ped_int_id").val();
               $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data) {
                        if (data.resp == true) {
                            swal("¡Correcto!", "¡El pedido fue liberado!", "success")
                        }
                        else {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error!", type: "error", confirmButtonText: "Aceptar" });
                        }

                    },
                    error: function (request, status, error) {
                        swal({ title: "¡?Error!", text: "¡Ocurrió un error!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
           });

}

function btasignartienda_onclick(obj, event) {
    var vurl = $(obj).data("url");
    $(window).attr("location", vurl);
}


function ConfigurarGrilla_gridproductos()
{
    var grilla = $(pedidodetalle_gridproductos);
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        colNames: ['', 'Cod. Producto', 'Descripción', 'Cantidad', 'Precio <br /> Unitario', 'Importe'],
        colModel:
        [
            { key: true,  hidden: true,  name: 'dpe_int_id',            index: 'dpe_int_id' },
            { key: false, hidden: false, name: 'pro_str_codigo',        index: 'pro_str_codigo',        width: '120',    align: 'center' },
            { key: false, hidden: false, name: 'pro_str_descripcion',   index: 'pro_str_descripcion',   width: '280',    align: 'Left' },
            { key: false, hidden: false, name: 'dpe_int_cantidad',      index: 'dpe_int_cantidad',      width: '80',    align: 'center' },
            { key: false, hidden: false, name: 'dpe_dec_preciounitario',index: 'dpe_dec_preciounitario',width: '80',    align: 'right' },
            { key: false, hidden: false, name: 'dpe_dec_subtotal',      index: 'dpe_dec_subtotal',      width: '80',    align: 'right' },
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
            { key: true, hidden: false,  name: 'tra_int_id',          index: 'tra_int_id',          width: '30', align: 'center' },
            { key: false, hidden: false, name: 'pro_str_codigo',      index: 'pro_str_codigo',      width: '30', align: 'center' },
            { key: false, hidden: false, name: 'pro_str_descripcion', index: 'pro_str_descripcion', width: '30', align: 'left' },
            { key: false, hidden: false, name: 'tiendaorigen',        index: 'tiendaorigen',        width: '30', align: 'left' },
            { key: false, hidden: false, name: 'tiendadestino',       index: 'tiendadestino',       width: '30', align: 'left' },
            { key: false, hidden: false, name: 'tra_int_cant',        index: 'tra_int_cant',        width: '30', align: 'center' },
            { key: false, hidden: false, name: 'est_str_descrip',     index: 'est_str_descrip',     width: '30', align: 'left' }, 
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

function ConfigurarGrilla_gridseguimiento() {

    var grilla = $(pedidodetalle_gridseguimiento);
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        colNames: ['Estado', 'Fecha'],
        colModel:
        [
            { key: false, hidden: false, name: 'est_str_descrip', index: 'est_str_descrip', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'seg_dat_fecha', index: 'seg_dat_fecha', width: '20', align: 'center' },
        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        //pager: $(pedidodetalle_gridpedidospager),
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

function obtenerControlesDisponibles() {
    var obj = $("#est_int_id")
    var vUrl = $(obj).data("url");

    $(".wf").attr("disabled", "disabled");

    $.ajax({
        url: vUrl,
        type: "post",
        datatype: "json",
        data: { idest: $(obj).val() },
        success: function (data) {
            $.each(data.result, function (index, value) { $("#" + value).removeAttr("disabled"); });
        },
        error: function (data) {
            alert(data.error.toString())
        }
    });
}

function inicializarControlesMotorizado() {
    $("#ddlListadoProveedores").change(function (event) {
        ddlListadoProveedores_onChange(this, event)
    });

}

function OnCompleteTransaction(xhr, status) {
    var result = $.parseJSON(xhr.responseText);
    $("#span_est_str_descrip").html(result.model.DescripcionEstado);
    $("#span_verificado").html(result.model.Verificado);
    $(pedidodetalle_gridseguimiento).jqGrid().trigger('reloadGrid');

    $(".wf").attr("disabled", "disabled");
    //desabilitando botones
    $.each(result.model.Controles, function (index, value) { $("#" + value).removeAttr("disabled"); });
    //cerrando modal 
    $("#modalcontainer").modal("hide");
}


function ddlListadoProveedores_onChange(obj, event) {
    var vUrl = $(obj).data("url");
    var listbox = $("#mot_int_id")


    $.ajax({
        url: vUrl,
        type: "post",
        datatype: "json",
        data: { proveedor: $(obj).val() },
        success: function (data) {
            if (data.res) {

                $(listbox).find("option").remove();
                $.each(data.lista, function () {
                    var obj = $(this)[0];
                    $("<option>").val(obj.mot_int_id).text(obj.mot_str_conductor).appendTo(listbox);
                });
            }
            else {
                alert(data.msj);
            }
        },
        error: function (data) {
            alert(data.error.toString())
        }
    });



}


function OnCompleteTransactionMoto(xhr, status) {
    var result = $.parseJSON(xhr.responseText);

    //actualizando campos
    var desest = result.model.DescripcionEstado;
    var empresa = result.model.DescripcionEmpresa;
    var motorizado = result.model.DescripcionConductor;
    var placa = result.model.DescripcionPlaca;



    $("#span_est_str_descrip").html(desest);

    $("#span_pro_str_razsocial").html(empresa);

    $("#span_mot_str_placa").html(motorizado);

    $("#span_mot_str_conductor").html(placa);


    $(".wf").attr("disabled", "disabled");
    $.each(result.model.Controles, function (index, value) { $("#" + value).removeAttr("disabled"); });

    //cerrando modal 
    $("#modalcontainer").modal("hide");
}
