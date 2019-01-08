$(document).ready(function () {
    configurarGrilla();
});

function configurarGrilla() {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.height = 320;
    $.jgrid.defaults.responsive = true;

    $("#IdEstadoHR").val(14);
    var grilla = $("#gridpedidos");
    var pagergrilla = $("#gridpedidospager");
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        postData: getDataForm(),
        styleUI: 'Bootstrap',
        colNames: ['', '', '', 'Num. Hoja Ruta', 'Transporte', 'Monto Total', 'Total Entregar', 'Total Vuelto'],
        colModel:
        [
            { key: true, hidden: true, name: 'hr_int_id', index: 'hr_int_id' },
            { key: false, hidden: false, name: 'hr_int_id', index: 'hr_int_id', width: '20', align: 'center', formatter: verHojaRuta },
            { key: false, hidden: false, name: 'hr_int_id', index: 'hr_int_id', width: '20', align: 'center', formatter: verLiquidar },
            { key: false, hidden: false, name: 'hr_str_numero', index: 'hr_str_numero', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'mot_str_placa', index: 'mot_str_placa', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_dec_montototal', index: 'ped_dec_montototal', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_dec_montopagar', index: 'ped_dec_montopagar', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'vuelto', index: 'vuelto', width: '20', align: 'center' },
        ],
        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        emptyrecords: 'No se encontraron registros',
        autowidth: true,
        autoheight: true,
        jsonReader:
        {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            id: 0
        },

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
    });

}

function verHojaRuta(cellvalue, options, rowObject) {
    var control = '<a href="javascript:ExportarHR(' + cellvalue + ')">Hoja de Ruta</a>';
    return control;
}

function verLiquidar(cellvalue, options, rowObject) {
    var control = '<a href="javascript:irLiquidacion(' + cellvalue + ')">Liquidar</a>';
    return control;
}

function irLiquidacion(id) {
    var grilla = $("#gridpedidos");
    var vUrl = $(grilla).data("urlliq") + "?idhr=" + id;
    $(window).attr("location", vUrl);
}

function ExportarHR(id) {
    var grilla = $("#gridpedidos");
    var vUrl = $(grilla).data("urlexport") + "?idHr=" + id;
    $(window).attr("location", vUrl);
}

function getDataForm() {
    var form = $("#frmfiltroindex");
    return form.serializeArray();
}


function buscarPedido() {
    var grilla = $("#gridpedidos");
    $(grilla).jqGrid('setGridParam', { postData: getDataForm() }).trigger('reloadGrid');
}


function cargarPedido(objname, id, dni, numero) {


    var lis = $("#ulestado").find("li");
    $(lis).removeClass("active");

    if (id == 0) $("#" + objname).removeClass("active");
    else $("#" + objname).addClass("active");

    $("#IdEstadoHR").val(id);
    buscarPedido();
}
