﻿var ddlListadoZona;
var ddListadoTipo;
var lstListaTienda;
var hdIdPedidos;

var asignarpedido_gridproductos = "#gridproductos";
var asignarpedidopedidodetalle_gridpedidospager = "#gridproductospager";

var asignarpedido_gridproductostransferir = "#gridproductostransferir";
var asignarpedido_gridproductostransferirspager = "#gridproductostransferirspager";


$(document).ready(function () {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.emptyrecords

    configurarGrilla_gridproductos();
    configurarGrilla_transferencia();
    
    ddlListadoZona = $("#IdZona");
    ddListadoTipo = $("#IdTipoTienda");
    lstListaTienda = $("#TiendasSeleccionadas");
    hdIdPedidos = $("#IdPedido");
  
    //este onchange cambia el ListBox de las tuendas
    $(ddListadoTipo).change(function (event) {
        ddListadoTipo_onChange(this, event);
    });

    //este onchange cambia el ListBox de las tiendas
    $(ddlListadoZona).change(function (event) {
        ddlListadoZona_onChange(this, event)
    });

    //este onchange cambia el grid de los prodictos
    $(lstListaTienda).change(function (event) {
        lstListaTienda_onChange(this, event);
    });

    $("#btnNuevaTransferencia").click(function (event) {
        btnNuevaTransferencia_onClick(this, event);
    });

    //$("#btnAsignarTienda").click(function () { });

    $("#btnRegresarListadoPed").click(function (event) {
        var vUrl = $(this).data("url");
        $(window).attr("location", vUrl);
    });

});


function configurarGrilla_gridproductos() {

    var vdataurl = $(asignarpedido_gridproductos).data("dataurl");
    $(asignarpedido_gridproductos).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        colNames: ['', '', '', 'Cod. Producto', 'Descripción', 'Cantidad', 'Stock'],
        colModel:
        [
            { key: true, hidden: true, name: 'pro_int_id', index: 'pro_int_id' },
            { hidden: true, name: 'ped_int_id' },
            { hidden: true, name: 'ped_str_numero' },
            { hidden: false, name: 'pro_str_codigo', index: 'pro_str_codigo', width: '100', align: 'center' },
            { hidden: false, name: 'pro_str_descripcion', index: 'pro_str_descripcion', width: '250', align: 'left' },
            { hidden: false, name: 'dpe_int_cantidad', index: 'dpe_int_cantidad', width: '120', align: 'right' },
            { hidden: false, name: 'pro_int_stock', index: 'pro_int_stock', width: '120', align: 'right' },
        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        pager: $(asignarpedidopedidodetalle_gridpedidospager),
        rowNum: CONFIG_JQGRID.get('rownum'),
        rowList: CONFIG_JQGRID.get('rowlist'),
        emptyrecords: CONFIG_JQGRID.get('emptyrecords'),
        autowidth: true,
        height: 120,
        shrinkToFit: false,
        viewrecords: true,
        caption: "Productos del Pedido"

    });
}

function configurarGrilla_transferencia() {

    //var idPedido = $(hdIdPedidos).val();
    var vdataurl = $(asignarpedido_gridproductostransferir).data("dataurl"); //+ "?idPedido=" + idPedido;

    $(asignarpedido_gridproductostransferir).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        colNames: ['', '  ', 'Cod. Producto', 'Descripción', 'Tienda Origen', 'Tienda Destino', 'Cant. Transferir', 'Estado'],
        colModel:
        [
            { key: true, hidden: true, name: "tra_int_id" },
            { key: false, hidden: false, name: "tra_int_id", sortable: false, width: '100', align: 'center', formatter: formatter_eliminartransferenciabd },
            { key: false, hidden: false, name: 'pro_str_codigo', index: 'pro_str_codigo', width: '150', align: 'center', sortable: false, },
            { key: false, hidden: false, name: 'pro_str_descripcion', index: 'pro_str_descripcion', width: '300', align: 'left', sortable: false, },
            { key: false, hidden: false, name: 'tiendaorigen', index: 'tiendaorigen', width: '200', align: 'left', sortable: false, },
            { key: false, hidden: false, name: 'tiendadestino', index: 'tiendadestino', width: '200', align: 'left', sortable: false, },
            { key: false, hidden: false, name: 'tra_int_cant', index: 'tra_int_cant', width: '80', align: 'center', sortable: false, },
            { key: false, hidden: false, name: 'est_str_descrip', index: 'est_str_descrip', width: '150', align: 'left', sortable: false, },
        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        pager: $(asignarpedido_gridproductostransferirspager),
        rowNum: CONFIG_JQGRID.get('rownum'),
        rowList: CONFIG_JQGRID.get('rowlist'),
        //emptyrecords: CONFIG_JQGRID.get('emptyrecords'),
        autowidth: true,
        height: 100,
        shrinkToFit: false,
        //viewrecords: true,
        caption: "Productos a Transferir"
    });





}

function formatter_eliminartransferenciabd(cellvalue, options, rowObject) {
    var control = '<a href="javascript:eliminarTransaferenciabd(\'' + cellvalue + '\')">Eliminar</a>';
    return control;
}

function ddListadoTipo_onChange(obj, event) {
    var idzona = $(ddlListadoZona).val();
    var idtipo = $(ddListadoTipo).val();

    fillTienda(idzona, idtipo);
}

function ddlListadoZona_onChange(obj, event) {
    var idzona = $(ddlListadoZona).val();
    var idtipo = $(ddListadoTipo).val();

    fillTienda(idzona, idtipo);
}

function lstListaTienda_onChange(obj, event) {

    var grilla = $(asignarpedido_gridproductos);
    var idpedido = $(hdIdPedidos).val();
    var idtienda = $(lstListaTienda).val();

    $("#hIdTiendaDestino").val(idtienda);

    //aramando url para actualizar grilla
    var vdataurl = $(grilla).data("dataurl") + "&idtienda=" + idtienda 
    $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}

function fillTienda(idzona, idtipo) {
    var listbox = $(lstListaTienda);
    var vUrl = $(listbox).data("url");

    $.ajax({
        url: vUrl,
        type: "post",
        datatype: "json",
        data: { idzona: idzona, idtipo: idtipo },
        success: function (data) {
            if (data.res) {

                $(listbox).find("option").remove();
                $.each(data.lista, function () {
                    var obj = $(this)[0];
                    $("<option>").val(obj.tie_int_id).text(obj.tie_str_descrip).appendTo(listbox);
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

function getRowData_gridproductos() {
    var grilla = $(asignarpedido_gridproductos);
    var rowId = grilla.jqGrid('getGridParam', 'selrow');
    if (rowId == null) {
        alert("Tiene que seleccionar un producto");
        return;
    }
    return grilla.jqGrid("getRowData", rowId);
}

function btnNuevaTransferencia_onClick(obj, event) {


    var numpedido, numproducto, desproducto;
    var rowdata = getRowData_gridproductos();

    numpedido = rowdata.ped_str_numero;
    numproducto = rowdata.pro_str_codigo;
    desproducto = rowdata.pro_str_descripcion;

    //Cargando modal
    var url = $(obj).data("url");
    $.get(url, function (data) {

        //levantando modal
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        $("#tittrsferirprod").html(numpedido + " - " + desproducto + " - ");
        $("#codProducto").html(numproducto);

        $("#hcodigoproducto").val(numproducto);  //obteniendo el codigo del producto en el hidden para el modal.
        inicializandoEventosModal();
    });
}

//tranferencia
function inicializandoEventosModal() {
    configurarGrillaProductos();

    $("#ddlListadoZonaModal").change(function (event) {
        ddlListadoZonaModal_onChange(this, event)
    });

    $("#ddlListadoTiendaOrigenModal").change(function (event) {
        ddlListadoTiendaOrigenModal_onChange(this, event)
    });

    $("#btnAgregarProducto").click(function (event) { btnAgregarProducto_onClick(this, event); });

    $("#btAceptarTransferencia").click(function (event) { btAceptarTransferencia_onClick(this, event); })


}

function configurarGrillaProductos() {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.height = 120;
    $.jgrid.defaults.responsive = true;

    //var idPedido = $('#IdPedido').val();
    var grilla = $("#gridprdtranferir");
    var pagergrilla = $("#gridprdtranferirpager");
    var vdataurl = $(grilla).data("dataurl")

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        styleUI: 'Bootstrap',
        colNames: ['', '  ', 'Cod. <br /> Producto', 'Descripción', 'Cant. <br /> Transferir', 'Tienda  <br /> Origen', 'Stock <br /> Origen', 'Tienda <br /> Destino'],
        colModel:
        [
            { key: true, hidden: true, name: 'Identificador', align: 'center' },
            { name: 'Identificador', width: '80', align: 'center', sortable: false, formatter: formatter_eliminartransferencia },
            { name: 'CodigoProducto', width: '80', align: 'center', sortable: false },
            { name: 'DescripcionProducto', width: '250', align: 'left', sortable: false },
            { name: 'tra_int_cant', width: '80', align: 'center', sortable: false },
            { name: 'TiendaOrigen', width: '150', align: 'left', sortable: false },
            { name: 'StockOrigen', width: '80', align: 'center', sortable: false },
            { name: 'TiendaDestino', width: '150', align: 'left', sortable: false },
        ],
        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        emptyrecords: 'No se encontraron registros',
        height: 150,
        width: 530,
        multiselect: false,
        shrinkToFit: false,
        //forceFit: true,
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
//function que te sirve para llamar al editrow al momento de seleeccionar una fila
function gridproductos_onSelectRow(id) {
    var grilla = $("#gridproductos");
    if (id && id !== lastsel) {
        jQuery(grilla).jqGrid("restoreRow", lastsel);
        jQuery(grilla).jqGrid("editRow", id, true);
        lastsel = id;
    }
}

function ddlListadoZonaModal_onChange(obj, event) {

    //showLoading();
    var vUrl = $(obj).data("url");
    var combobox = $("#ddlListadoTiendaOrigenModal")

    $.ajax({
        url: vUrl,
        type: "post",
        datatype: "json",
        data: { idzona: $(obj).val() },
        success: function (data) {
            if (data.res) {

                $(combobox).find("option").remove();
                $.each(data.lista, function () {
                    var obj = $(this)[0];
                    $("<option>").val(obj.tie_int_id).text(obj.tie_str_descrip).appendTo(combobox);
                });
            }
            else {
                alert(data.msj);
            }
        },
        error: function (data) {
            alert(data.error.toString())
        },

    });


}

function ddlListadoTiendaOrigenModal_onChange(obj, event) {
    var vUrl = $(obj).data("url");
    //var idTienda = $('#lstListaTiendaTra').val();
    var textbox = $("#StockOrigen")
    var spantxtcantidad = $("#spanstockproducto");
    var codigoproducto = $("#hcodigoproducto").val();
    var idtienda = $(obj).val();

    $.ajax({
        url: vUrl,
        type: "post",
        datatype: "json",
        data: { idTienda: idtienda, idProducto: codigoproducto },
        success: function (data) {

            if (data.res) {
                $.each(data.lista, function () {
                    var obj = $(this)[0];
                    textbox.val(obj.pro_int_stock);
                    spantxtcantidad.html(obj.pro_int_stock);
                });
            }
        },
        error: function (data) {
            alert(data.error.toString())
        }
    });
}

function btnAgregarProducto_onClick(obj, event) {

    var grilla = $("#gridprdtranferir");
    var canttransferir = $("#tra_int_cant").val();
    var idtiendaorigen = $("#ddlListadoTiendaOrigenModal").val();
    var tiendaorigentext = $("#ddlListadoTiendaOrigenModal option:selected").text();
    var idtiendadestino = $("#hIdTiendaDestino").val(); //$("#" + lstListaTienda.attr("id") + " option:selected").val();
    var tiendadestinotext = $("#" + lstListaTienda.attr("id") + " option:selected").text();

    //alert(tiendadestinotext);
    var stockorigen = $("#StockOrigen").val();

    var rowdata = getRowData_gridproductos();
    var datamodelo =
        {
            CodigoProducto: rowdata.pro_str_codigo,
            DescripcionProducto: rowdata.pro_str_descripcion,
            TiendaOrigen: tiendaorigentext,
            StockOrigen: stockorigen,
            TiendaDestino: tiendadestinotext,
            NumeroPedido: rowdata.ped_str_numero,
            pro_int_id: rowdata.pro_int_id,
            tra_int_cant: canttransferir,
            tie_int_origen: idtiendaorigen,
            tie_int_destino: idtiendadestino,
            nro_guia_remision: "",
            ped_int_id: rowdata.ped_int_id,
        };

    var vUrl = $(obj).data("url");
    $.ajax({
        url: vUrl,
        type: "post",
        datatype: "json",
        data: datamodelo,
        success: function (data) {
            if (data.res) { $(grilla).jqGrid().trigger('reloadGrid'); }
            else { CheckValidationErrorResponse(data, null, $('#ValidationSummarytpm')); }
        },
        error: function (data) {
            CheckValidationErrorResponse(data.responseJSON, null, $('#ValidationSummarytpm'));
        }

    });

}

function OnCompleteTransaction(xhr, status) {
    var grilla = $("#gridproductostransferir");
    $(grilla).jqGrid().trigger('reloadGrid');
    //Cerrando Modal
    $("#modalcontainer").modal("hide");
    $(lstListaTienda).attr('disabled', true);
}

function formatter_eliminartransferencia(cellvalue, options, rowObject) {
    var control = '<a href="javascript:eliminarTransaferencia(\'' + cellvalue + '\')">Eliminar</a>';
    return control;
}

function formatter_eliminartransferenciabd(cellvalue, options, rowObject) {
    var control = '<a href="javascript:eliminarTransaferenciabd(\'' + cellvalue + '\')">Eliminar</a>';
    return control;
}

function eliminarTransaferencia(idk) {
    var rpta = confirm("Esta seguro de proceder con la eliminación");
    if (!rpta) return;

    var grilla = $("#gridprdtranferir");
    var vUrldel = $(grilla).data("urldel");


    $.ajax({
        url: vUrldel,
        type: "post",
        datatype: "json",
        data: { id: idk },
        success: function (data) {
            if (data.res) {
                $(grilla).jqGrid().trigger('reloadGrid');
            }
        },
        error: function (data) {
            alert(data.error.toString())
        }
    });

}

function eliminarTransaferenciabd(idx) {
    var rpta = confirm("Esta seguro de proceder con la eliminación");
    if (!rpta) return;

    var grilla = $("#gridproductostransferir");
    var vUrldel = $(grilla).data("urldel");

    $.ajax({
        url: vUrldel,
        type: "post",
        datatype: "json",
        data: { id: idx },
        success: function (data) {
            if (data.res) {
                $(grilla).jqGrid().trigger('reloadGrid');
            } else { alert(data.msj); }
        },
        error: function (data) {
            alert(data.error.toString())
        }
    });


}

function OnCompleteTransaction_AsignarPedidoTienda(xhr, status) {
    var jsonres = xhr.responseJSON;
    if (jsonres.res == true) {
        vurl = jsonres.url;
        $(document).attr("location", vurl);
    }
    else { CheckValidationErrorResponse(jsonres); }
}


