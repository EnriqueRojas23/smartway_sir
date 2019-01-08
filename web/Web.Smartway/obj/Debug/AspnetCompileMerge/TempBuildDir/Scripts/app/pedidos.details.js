var btverificar = "#btverificar";
var btcancelar = "#btcancelar";
var btasignartienda = "#btasignartienda";
var btasignarmotorizado = "#btasignarmotorizado";
var btliberar = "#btliberar";
var btnentregar = "#btnentregar";

var btclosemodal = "#btnclosemodal";

$(document).ready(function () {
    obtenerControlesDisponibles();
    configurarGrilla();
    configurarGrillaTransferencia();
    configurarGrillaSeguimiento();

    $(btverificar).click(function(event) { btverificar_onclick(this, event); });
    $(btcancelar).click(function(event) { btcancelar_onclick(this, event); });
    $(btasignartienda).click(function(event) { btasignartienda_onclick(this, event); });
    $(btasignarmotorizado).click(function(event) { btasignarmotorizado_onclick(this, event); });
    $(btliberar).click(function (event) { btliberar_onclick(this, event); });
    $(btnentregar).click(function (event) { btnentregar_onclick(this, event); });
    
    $(btclosemodal).click(function(event) { btclosemodal_onclick(this, event); });

});

function btnentregar_onclick(obj, event) {
    var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
    });
}

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
        colNames: ['', 'Cod. Producto', 'Descripción', 'Tienda Origen', 'Tienda Destino', 'Cant. Transferir', 'Estado'],
        colModel:
        [
            //{ key: true, hidden: true, name: 'pro_int_id', index: 'pro_int_id' },
            //{
            //    name: "tra_int_id", width: '20', formatter: "actions", formatoptions:
            //      {
            //          keys: true,
            //          editOptions: {},
            //          addOptions: {},
            //          delOptions: {}
            //      }
            //},
            { key: true, hidden: false, name: 'pro_int_id', index: 'pro_int_id', width: '30', align: 'center' },
            { key: false, hidden: false, name: 'pro_str_codigo', index: 'pro_str_codigo', width: '30', align: 'center' },
            { key: false, hidden: false, name: 'pro_str_descripcion', index: 'pro_str_descripcion', width: '30', align: 'center' },
            { key: false, hidden: false, name: 'tiendaorigen', index: 'tiendaorigen', width: '30', align: 'center' },
            { key: false, hidden: false, name: 'tiendadestino', index: 'tiendadestino', width: '30', align: 'center' },
            { key: false, hidden: false, name: 'tra_int_cant', index: 'tra_int_cant', width: '30', align: 'center' },
            { key: false, hidden: false, name: 'est_str_descrip', index: 'est_str_descrip', width: '30', align: 'center' },
        ],
        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        emptyrecords: 'No se encontraron registros',
        autowidth: true,
        autoheight: true,
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


        onSelectRow: function (ids) {
            gridproductos_onSelectRow(ids);
        }
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

function btasignartienda_onclick(obj, event)
{
    var vurl = $(obj).data("url");
    $(window).attr("location", vurl);
}

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
        colNames: ['', 'Cod. Producto', 'Descripción', 'Cantidad', 'Precio Unitario', 'Importe'],
        colModel:
        [
            { key: true, hidden: true, name: 'dpe_int_id', index: 'dpe_int_id' },
            { key: false, hidden: false, name: 'pro_str_codigo', index: 'pro_str_codigo', width: '40', align: 'center' },
            { key: false, hidden: false, name: 'pro_str_descripcion', index: 'pro_str_descripcion', width: '100', align: 'Left'},
            { key: false, hidden: false, name: 'dpe_int_cantidad', index: 'dpe_int_cantidad', width: '30', align: 'center' },
            { key: false, hidden: false, name: 'dpe_dec_preciounitario', index: 'dpe_dec_preciounitario', width: '50', align: 'right' },
            { key: false, hidden: false, name: 'dpe_dec_subtotal', index: 'dpe_dec_subtotal', width: '50', align: 'right' },
            //{ key: false, hidden: false,  name: 'dpe_dec_subtotal', index: 'dpe_dec_subtotal', width: '80', align: 'right', sorttype: 'number', formatter: 'number', summaryType: 'mysum' },
        ],
        //footerrow: true,
        //gridComplete: function() {
        //    var $grid = $('#gridproductos');
        //    var colSum = $grid.jqGrid('getCol', 'dpe_dec_subtotal', false, 'sum');
        //    $grid.jqGrid('footerData', 'set', { 'dpe_dec_subtotal': colSum });
        //    },
       


        //pager: $(pagergrilla),
        rowNum: 50,
        //rowList: [10, 20, 30, 40],
        emptyrecords: 'No se encontraron registros',
        height: 100,
        autowidth: 400,
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
    //var parseTotal = $(grilla).jqGrid('getCol', 'Total', false, 'sum');
    //$(grilla).jqGrid('footerData', 'set', { Total: parseTotal });
}

function configurarGrillaSeguimiento() {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.responsive = true;


    var vdataurl = $(grilla).data("dataurl") + "?idPedido=" + idPedido;

    var idPedido = $('#ped_int_id').val();

    var grilla = $("#gridseguimiento");
    var vdataurl = $(grilla).data("dataurl") + "?sidx=" + idPedido;

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
    
    //actualizando campos
    var desest = result.model.DescripcionEstado;
    $("#span_est_str_descrip").html(desest);


    var desveri = result.model.Verificado;
    $("#span_verificado").html(desveri);  


    var grilla = $("#gridseguimiento");
    $(grilla).jqGrid().trigger('reloadGrid');




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
