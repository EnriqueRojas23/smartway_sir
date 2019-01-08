var listarpedido_frmsearchpedido = "#frmSearchPedido";
var listarpedido_gridpedidos = "#gridpedidos";
var listarpedido_gridpedidospager = "#gridpedidospager";

$(document).ready(function () {

    configurarGrilla();
    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
        $(listarpedido_gridpedidos).setGridWidth(width);
    });

});


function configurarGrilla() {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.height = 320;
    $.jgrid.defaults.responsive = true;

    //$("#IdEstadoPedido").val(1);
    //$("#EstadoDescripcion").val("Por Verificar");

    var grilla = $(listarpedido_gridpedidos);
    var pagergrilla = $(listarpedido_gridpedidospager);
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        postData: getDataForm(),
        //styleUI: 'Bootstrap',
        colNames: ['', '', 'Num. Pedido', 'Cliente', 'Dirección', 'Ubigeo', 'Fecha Pedido', 'Estado', 'Monto Total', 'Tiempo Estimado', 'Tipo Entrega'],
        colModel:
        [
            { key: true, hidden: true, name: 'ped_int_id', index: 'ped_int_id' },
            { key: false, hidden: false, name: 'ped_int_id', index: 'ped_int_id', width: '100', align: 'center', formatter: verAtenderPedido },
            { key: false, hidden: false, name: 'ped_str_numero', index: 'ped_str_numero', width: '120', align: 'center' },
            { key: false, hidden: false, name: 'ped_str_cliente', index: 'ped_str_cliente', width: '250', align: 'left' },
            { key: false, hidden: false, name: 'ped_str_direccion', index: 'ped_str_direccion', width: '250', align: 'left' },
            { key: false, hidden: false, name: 'dis_str_descrip', index: 'dis_str_descrip', width: '200', align: 'left' },
            { key: false, hidden: false, name: 'ped_dat_fechapedido', index: 'ped_dat_fechapedido', width: '120', align: 'center', formatter: 'date', formatoptions: CONFIG_JQGRID.get('formatoptions_date') },
            { key: false, hidden: false, name: 'est_str_descrip', index: 'est_str_descrip', width: '150', align: 'left' },
            { key: false, hidden: false, name: 'ped_dec_montototal', index: 'ped_dec_montototal', width: '80', align: 'right', formatter: 'currency', formatoptions: CONFIG_JQGRID.get('formatoptions_currency_pen') },
            { key: false, hidden: false, name: 'ped_str_tiempoestimado', index: 'ped_str_tiempoestimado', width: '200', align: 'left' },
            { key: false, hidden: false, name: 'ped_str_tipoentrega', index: 'ped_str_tipoentrega', width: '200', align: 'left' },

        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        pager: $(listarpedido_gridpedidospager),
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


function getDataForm() {
    var form = $(listarpedido_frmsearchpedido);
    return form.serializeArray();
}

function verAtenderPedido(cellvalue, options, rowObject) {

    var control = $("<a></a>");
    control.append("Atender Pedido")
    control.attr("id", "lnk" + cellvalue);
    control.attr("href", "javascript:IrDetallePedidoPorAtender('" + cellvalue + "')");

    var htmlcontrol = control[0].outerHTML;
    return htmlcontrol
}

function IrDetallePedidoPorAtender(id)
{
    if (id == undefined) {
        alert(MENSAJES.getError("IrDetallePedidoPorAtender", "err_nullarg"));
        return;
    }
    var vurl = $(listarpedido_gridpedidos).data("urldetail") + "?id=" + id;
    $(window).attr("location", vurl);
}

function btnlistarpedidobusquedasecundario_onclick(searchdefault) {
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

function cargarListaPedido(obj, idest) {
    var width = $('.jqGrid_wrapper').width();
    $(listarpedido_gridpedidos).setGridWidth(width);

    var lnkcontrol = $(document.getElementById(obj));
    if (idest == undefined || obj == undefined || lnkcontrol.length <= 0) return;
    var texto = $(lnkcontrol[0]).html();

    limpiarfiltros();
    ocultarColumnas(idest);

    $("#EstadoDescripcion").val(texto);
    $("#IdEstadoPedido").val(idest);

    $("#titulo_estado").html($("#EstadoDescripcion").val());
    $(listarpedido_gridpedidos).jqGrid('setGridParam', { postData: getDataForm() }).trigger('reloadGrid');

}

function limpiarfiltros() {
    var form = $.find("form[data-typeform=search]");
    if (form == null || form == undefined || form.length <= 0) return;

    var controles = $(form).find("input[type!=hidden],select");
    $.each(controles, function () {
        setCleanControlText(this);
    });
}

function ocultarColumnas(idest) {

    $(listarpedido_gridpedidos).jqGrid('hideCol', 'cb');
    $("#filtros_estado_comprobante").hide();
    if (idest == 6) {
        $(listarpedido_gridpedidos).jqGrid('showCol', 'cb');
        $("#filtros_estado_comprobante").show();
    }


}