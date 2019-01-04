var btverificar = "#btverificar";
var btcancelar = "#btcancelar";
var btasignartienda = "#btasignartienda";
var btasignarmotorizado = "#btasignarmotorizado";
var btliberar = "#btliberar";

var btclosemodal = "#btnclosemodal";

$(document).ready(function () {
    obtenerControlesDisponibles();
    configurarGrilla();
    //configurarGrillaSeguimiento();

    configurarGrillaTransferencia();


    ////$('#containermodal').on('show.bs.modal', function(event) {
    ////    var vUrl = $("#newProduct").data("url");
    ////    $.get(vUrl, function (data) {
    ////        $(".modal-content").html(data);
    ////    });
    ////});
    $(btnGenerarComprobante).click(function (event) { btverificar_onclick(this, event); })
    //$(btcancelar).click(function (event) { btcancelar_onclick(this, event); })
    //$(btasignartienda).click(function (event) { btasignartienda_onclick(this, event); })
    //$(btasignarmotorizado).click(function (event) { btasignarmotorizado_onclick(this, event); })
    //$(btliberar).click(function (event) { btliberar_onclick(this, event); })



    $(btclosemodal).click(function (event) { btclosemodal_onclick(this, event) })
    
});
function configurarGrillaTransferencia() {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.height = 120;
    $.jgrid.defaults.responsive = true;

    var idPedido = $('#ped_int_id').val();
    var grilla = $("#gridproductostransferir");
    var pagergrilla = $("#gridproductostransferirspager");
    var vdataurl = $(grilla).data("dataurl") + "?idPedido=" + idPedido;

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        styleUI: 'Bootstrap',
        colNames: ['', 'Cod. Producto', 'Descripción', 'Tienda Origen', 'Tienda Destino', 'Cant. Transferir', 'Estado', 'Nro. Guia Remisión', 'Nro. Guia Entrada'],
        colModel:
        [
            { key: true, hidden: false, name: 'tra_int_id', index: 'tra_int_id', width: '150', align: 'center', formatter: confirmarTransferencia_formmatter },
            { key: false, hidden: false, name: 'pro_str_codigo', index: 'pro_str_codigo', width: '100', align: 'center' },
            { key: false, hidden: false, name: 'pro_str_descripcion', index: 'pro_str_descripcion', width: '350', align: 'left' },
            { key: false, hidden: false, name: 'tiendaorigen', index: 'tiendaorigen', width: '180', align: 'left' },
            { key: false, hidden: false, name: 'tiendadestino', index: 'tiendadestino', width: '180', align: 'left' },
            { key: false, hidden: false, name: 'tra_int_cant', index: 'tra_int_cant', width: '80', align: 'center' },
            { key: false, hidden: false, name: 'est_str_descrip', index: 'est_str_descrip', width: '120', align: 'center' },
            { key: false, hidden: false, name: 'nro_guia_remision', index: 'nro_guia_remision', width: '120', align: 'center' },
            { key: false, hidden: false, name: 'tra_str_guiaentrada', index: 'tra_str_guiaentrada', width: '120', align: 'center' },

        ],
        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        emptyrecords: 'No se encontraron registros',
        autowidth: true,
        //autoheight: true,
        //width: 1200,
        shrinkToFit: false,
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




function btclosemodal_onclick(obj, event){
    $("#modalcontainer").modal("hide");
}

function btverificar_onclick(obj, event) {
    var url = $(obj).data("url");
    $.get(url, function(data){
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
    });
}

function btcancelar_onclick(obj, event) {
    var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
    });
}

function btasignartienda_onclick(obj, event) { }

function btasignarmotorizado_onclick(obj, event) {
    var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");

        inicializarControlesMotorizado();
    });
}
function inicializarControlesMotorizado()
{
    $("#ddlListadoProveedores").change(function (event) {
        ddlListadoProveedores_onChange(this, event)
    });

}

function btliberar_onclick(obj, event) { }
 
function configurarGrilla() {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.responsive = true;

    var grilla = $("#gridproductos");
    var pagergrilla = $("#gridproductospager");
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        styleUI: 'Bootstrap',
        colNames: ['','Cod. Producto', 'Descripción', 'Cantidad', 'Precio Unitario', 'Importe'],
        colModel:
        [
            { key: true, hidden: true, name: 'dpe_int_id', index: 'dpe_int_id' },
            { key: false, hidden: false, name: 'pro_str_codigo', index: 'pro_str_codigo', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'pro_str_descripcion', index: 'pro_str_descripcion', width: '20', align: 'center'},
            { key: false, hidden: false, name: 'dpe_int_cantidad', index: 'dpe_int_cantidad', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'dpe_dec_preciounitario', index: 'dpe_dec_preciounitario', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'dpe_dec_subtotal', index: 'dpe_dec_subtotal', width: '20', align: 'center', summaryType: 'sum', summaryTpl: '<b>Suma: {0}</b>' },
            //{ key: false, hidden: false,  name: 'dpe_dec_subtotal', index: 'dpe_dec_subtotal', width: '80', align: 'right', sorttype: 'number', formatter: 'number', summaryType: 'mysum' },
        ],
        footerrow: true,
        gridComplete: function() {
            var $grid = $('#gridproductos');
            var colSum = $grid.jqGrid('getCol', 'dpe_dec_subtotal', false, 'sum');
            $grid.jqGrid('footerData', 'set', { 'dpe_dec_subtotal': colSum });
            },
       


        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        emptyrecords: 'No se encontraron registros',
        autowidth: true,
      //  multiselect: true,
        jsonReader:
        {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            id: 0
        },
        onSelectRow: function (rowId, status, e) {
            //if (rowId == lastSel) {
            //    $(grilla).jqGrid("resetSelection");
            //    lastSel = undefined;
            //    status = false;
            //} else {
            //    lastSel = rowId;
            //}
        },
        beforeSelectRow: function (rowId, e) {
            $(grilla).jqGrid("resetSelection");
            return true;
        }
    });
    var parseTotal = $(grilla).jqGrid('getCol', 'Total', false, 'sum');
    $(grilla).jqGrid('footerData', 'set', { Total: parseTotal });
}

function confirmarTransferencia_formmatter(cellvalue, options, rowObject) {

    var control = "";
    if (rowObject.nro_guia_remision == null)
        control = '<a href="javascript:ConfirmarTransferencia(' + cellvalue + ')">Confirmar Transferencia</a>';
    return control;     
}

function ConfirmarTransferencia(id)
{
    var grilla = $("#gridproductostransferir");
    var vurl = $(grilla).data("urlct");
    
    $.ajax({
        url: vurl,
        type: "post",
        datatype: "json",
        data: { id: id },
        success: function (data) {
            if (data.res) {
                alert("Se realizo la transferencia correctamente");
                $(grilla).jqGrid().trigger('reloadGrid');
            }
            else CheckValidationErrorWindowAlert(data);
        },
        error: function (data) {
            CheckValidationErrorWindowAlert(data);
        },
    });
  
}


function configurarGrillaSeguimiento() {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.responsive = true;

    var grilla = $("#gridseguimiento");
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        styleUI: 'Bootstrap',
        colNames: ['Estado', 'Fecha'],
        colModel:
        [
            { key: false, hidden: false, name: 'est_str_descrip', index: 'est_str_descrip', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'seg_dat_fecha', index: 'seg_dat_fecha', width: '20', align: 'center' },
        ],

      
        emptyrecords: 'No se encontraron registros',
        autowidth: true,
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

function OnCompleteTransaction(xhr, status)
{
    var result = $.parseJSON(xhr.responseText);


    alert('entré');
    
    //actualizando campos
    var desest = result.model.DescripcionEstado;
    $("#span_est_str_descrip").html(desest);


    var desveri = result.model.Verificado;
    $("#span_verificado").html(desveri);  







    $(".wf").attr("disabled", "disabled");
    //desabilitando botones
    $.each(result.model.Controles, function (index, value) { $("#" + value).removeAttr("disabled"); });

    //cerrando modal 
    $("#modalcontainer").modal("hide");
}

function obtenerControlesDisponibles()
{
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

function GenerarComprobanteModal_Complete(xhr, status) {
    var jsonres = xhr.responseJSON;
    if (jsonres.res == true) {
        vurl = jsonres.url;
        $(document).attr("location", vurl);
    }
    else { CheckValidationErrorResponse(jsonres, null, $("#ValidationSummaryComprobanteModal")); }
}