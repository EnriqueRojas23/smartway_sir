$(document).ready(function() {
    configurarGrilla();

    $('#formliq').submit(function () {
        var grilla = $("#gridpedidoshr");
        var ids = $(grilla).jqGrid('getDataIDs');
        $("#IdsPedidos").val(ids.toString());


    });
    
    $("#MontoEfectivo").change(function () { CalculoDiferencia(); })
    $("#MontoVoucher").change(function () { CalculoDiferencia(); })
    $("#RespTransportista").change(function () { CalculoDiferencia(); })
    CalculoDiferencia();

});

function configurarGrilla()
{
    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.height = 320;
    $.jgrid.defaults.responsive = true;

    var grilla = $("#gridpedidoshr");
    var pagergrilla = $("#gridpedidoshrpager");
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'GET',
        styleUI: 'Bootstrap',
        colNames: ['', 'Num. Pedido', 'Cliente', 'Monto Total', 'Fecha Pedido', 'Medio Pago', 'Pago con S/.', 'Nro. Comprobante', 'Estado'],
        colModel:
        [
            { key: true, hidden: true, name: 'ped_int_id', index: 'ped_int_id' },
            { key: false, hidden: false, name: 'ped_str_numero', index: 'ped_str_numero', width: '80', align: 'center' },
            { key: false, hidden: false, name: 'cliente', index: 'cliente', width: '150', align: 'left' },
            { key: false, hidden: false, name: 'ped_dec_montototal', index: 'ped_dec_montototal', width: '80', align: 'right', formatter: 'currency', formatoptions: { thousandsSeparator: ',' } },
            { key: false, hidden: false, name: 'ped_dat_fechapedido', index: 'ped_dat_fechapedido', width: '120', align: 'center', formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y'} },
            { key: false, hidden: false, name: 'med_str_descrip', index: 'med_str_descrip', width: '200', align: 'center' },
            { key: false, hidden: false, name: 'pagaconefectivo', index: 'pagaconefectivo', width: '80', align: 'right', formatter: 'currency', formatoptions: { thousandsSeparator: ',' } },
            { key: false, hidden: false, name: 'ped_str_docventa', index: 'ped_str_docventa', width: '80', align: 'center' },
            { key: false, hidden: false, name: 'est_str_descrip', index: 'est_str_descrip', width: '120', align: 'center' },
  
        ],
        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        emptyrecords: 'No se encontraron registros',
        autowidth: true,
        height: 200,
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

    function OnCompleteTransactionMoto(xhr, status) {
        var result = $.parseJSON(xhr.responseText);
    }

function DisplayErrors(errors) {
    for (var i = 0; i < errors.length; i++) {
        $("<label for='" + errors[i].Key + "' class='error'></label>")
        .html(errors[i].Value[0]).appendTo($("input#" + errors[i].Key).parent());
    }
}

function LiquidacionHr_Error(data) {
    DisplayErrors(data.Errors);
}

function LiquidacionHr_Complete(xhr, status) {
    alert(status);
}

function LiquidacionHr_Success(xhr, status) {
    alert(status);
}

function OnCompleteTransaction_LiquidacionHr(xhr, status) {

    var jsonres = xhr.responseJSON;

    if (jsonres.res == true)
    {
        vurl = jsonres.url;
        $(document).attr("location", vurl);
        //alert("Se completo la liquidación de la hoja de Ruta");
    }
    else { CheckValidationErrorResponse(jsonres); }
}

function CalculoDiferencia()
{
    var montototal = $.isNumeric($("#total").val()) ? parseFloat($("#total").val()) : 0;   // parseFloat($("#total").val());
    var montoefectivo = $.isNumeric($("#MontoEfectivo").val()) ? parseFloat($("#MontoEfectivo").val()) : 0; // parseFloat($("#MontoEfectivo").val()) != NaN ? 0 : parseFloat($("#MontoEfectivo").val());
    var montovoucher = $.isNumeric($("#MontoVoucher").val()) ? parseFloat($("#MontoVoucher").val()) : 0;//parseFloat($("#MontoVoucher").val()) != NaN ? 0 : parseFloat($("#MontoVoucher").val());
    var resptransporte = $.isNumeric($("#RespTransportista").val()) ? parseFloat($("#RespTransportista").val()) : 0;//parseFloat($("#RespTransportista").val()) != NaN ? 0 : parseFloat($("#RespTransportista").val());
    
    var diferencia = montototal - (montoefectivo + montovoucher + resptransporte);
    $("#Diferencia").val(diferencia);
    $("#spandiferencia").html(diferencia);

    if (diferencia != 0) {
        $("#btnLiquidar").attr("disabled", "Disabled");
    } else { $("#btnLiquidar").removeAttr("disabled"); }

}