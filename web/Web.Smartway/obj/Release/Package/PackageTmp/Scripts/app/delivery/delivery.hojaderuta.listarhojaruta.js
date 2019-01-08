var listarpedido_frmsearchpedido = "#frmSearchPedidohr";
var listarpedido_gridpedidoshr = "#gridpedidoshr";
var listarpedido_gridpedidoshrpager = "#gridpedidoshrpager";

$(document).ready(function () {

    configurarGrilla();
    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
        $(listarpedido_gridpedidoshr).setGridWidth(width);
    });

});


function configurarGrilla() {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.height = 320;
    $.jgrid.defaults.responsive = true;

    var grilla = $(listarpedido_gridpedidoshr);
    var pagergrilla = $(listarpedido_gridpedidoshrpager);
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        postData: getDataForm(),
        colNames: ['', '', '', 'Num. Hoja Ruta', 'Transporte', 'Monto Total', 'Total Entregar', 'Total Vuelto'],
        colModel:
        [
            { key: true, hidden: true, name: 'hr_int_id', index: 'hr_int_id' },
            { key: false, hidden: false, name: 'hr_int_id', index: 'hr_int_id', width: '100', align: 'center', formatter: verHojaRuta },
            { key: false, hidden: false, name: 'hr_int_id', index: 'hr_int_id', width: '100', align: 'center', formatter: verLiquidar },
            { key: false, hidden: false, name: 'hr_str_numero', index: 'hr_str_numero', width: '120', align: 'center' },
            { key: false, hidden: false, name: 'mot_str_placa', index: 'mot_str_placa', width: '120', align: 'center' },
            { key: false, hidden: false, name: 'ped_dec_montototal', index: 'ped_dec_montototal', width: '120', align: 'right', formatter: 'currency', formatoptions: CONFIG_JQGRID.get('formatoptions_currency_pen') },
            { key: false, hidden: false, name: 'ped_dec_montopagar', index: 'ped_dec_montopagar', width: '120', align: 'right', formatter: 'currency', formatoptions: CONFIG_JQGRID.get('formatoptions_currency_pen') },
            { key: false, hidden: false, name: 'vuelto', index: 'vuelto', width: '120', align: 'right', formatter: 'currency', formatoptions: CONFIG_JQGRID.get('formatoptions_currency_pen') },
        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        pager: $(listarpedido_gridpedidoshrpager),
        rowNum: CONFIG_JQGRID.get('rownum'),
        rowList: CONFIG_JQGRID.get('rowlist'),
        emptyrecords: CONFIG_JQGRID.get('emptyrecords'),
        autoheight: true,
        autowidth: true,
        shrinkToFit: false,
        //multiselect: true,
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
            var texto = $("#EstadoHRDescripcion").val() + " (" + numerofilas + ")";

            $("#titulo_estado").html(texto);
            setStyleCheckBoxGrid(this);
        },
    });
}

function getDataForm() {
    var form = $(listarpedido_frmsearchpedido);
    return form.serializeArray();
}

function verHojaRuta(cellvalue, options, rowObject) {

    var control = $("<a></a>");
    control.append("Hoja de Ruta")
    control.attr("id", "lnk" + cellvalue);
    control.attr("href", "javascript:ExportarHR('" + cellvalue + "')");

    var htmlcontrol = control[0].outerHTML;
    return htmlcontrol
}

function verLiquidar(cellvalue, options, rowObject) {

    var control = $("<a></a>");
    control.append("Liquidar")
    control.attr("id", "lnk" + cellvalue);
    control.attr("href", "javascript:IrLiquidacion('" + cellvalue + "')");

    var htmlcontrol = control[0].outerHTML;
    return htmlcontrol
}

function btnlistarpedidohrbusquedasecundario_onclick(searchdefault) {
    var form = $.find("form[data-typeform=search]");
    if (form == null || form == undefined || form.length <= 0) return;

    var controles = $(form).find("[data-ctrlsearch]");
    if (controles == null || controles == undefined || controles.length <= 0) return;

    var strfiltro = "";
    $.each(controles, function () {
        var valor = $.trim($(this).val());
        var nombre = $(this).data("ctrlsearch");

        if (valor != "") {
            strfiltro = strfiltro + " {" + nombre + ":" + valor + "}";
        }
    })

    if (searchdefault != undefined) $(searchdefault).val(strfiltro);
}

function cargarListaHojaRuta(obj, idest) {
    var width = $('.jqGrid_wrapper').width();
    $(listarpedido_gridpedidoshr).setGridWidth(width);

    var lnkcontrol = $(document.getElementById(obj));
    if (idest == undefined || obj == undefined || lnkcontrol.length <= 0) return;
    var texto = $(lnkcontrol[0]).html();

    limpiarfiltros();
    //ocultarColumnas(idest);

    $("#EstadoHRDescripcion").val(texto);
    $("#IdEstadoHR").val(idest);

    $("#titulo_estado").html($("#EstadoHRDescripcion").val());
    $(listarpedido_gridpedidoshr).jqGrid('setGridParam', { postData: getDataForm() }).trigger('reloadGrid');

}

function limpiarfiltros() {
    var form = $.find("form[data-typeform=search]");
    if (form == null || form == undefined || form.length <= 0) return;

    var controles = $(form).find("input[type!=hidden],select");
    $.each(controles, function () {
        setCleanControlText(this);
    });
}

function ExportarHR(id) {
  
    var vUrl = $(listarpedido_gridpedidoshr).data("urlexport") + "?idHr=" + id;
    $(window).attr("location", vUrl);
}

function irLiquidacion(id) {
    var vUrl = $(listarpedido_gridpedidoshr).data("urlliq") + "?idhr=" + id;
    $(window).attr("location", vUrl);
}

