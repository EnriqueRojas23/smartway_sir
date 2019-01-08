$(document).ready(function () {
    configurarGrilla();
});

function configurarGrilla() {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.height = 320;
    $.jgrid.defaults.responsive = true;

    $("#IdEstadoPedido").val(5);

    var form = $("#frmfiltroindex");
    var grilla = $("#gridpedidos");
    var pagergrilla = $("#gridpedidospager");
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        postData: getDataForm(),
        styleUI: 'Bootstrap',
        colNames: ['', '', 'Num. Pedido', 'Cliente', 'Dirección', 'Ubigeo', 'Fecha Pedido', 'Estado', 'Monto Total', 'Tiempo Estimado', 'Tipo Entrega'],
        colModel:
        [
            { key: true, hidden: true, name: 'ped_int_id', index: 'ped_int_id' },
            { key: false, hidden: false, name: 'ped_int_id', index: 'ped_int_id', width: '20', align: 'center', formatter: verDetallePedido },
            { key: false, hidden: false, name: 'ped_str_numero', index: 'ped_str_numero', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_str_cliente', index: 'ped_str_cliente', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_str_direccion', index: 'ped_str_direccion', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'dis_str_descrip', index: 'dis_str_descrip', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_dat_fechapedido', index: 'ped_dat_fechapedido', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'est_str_descrip', index: 'est_str_descrip', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_dec_montototal', index: 'ped_dec_montototal', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_str_tiempoestimado', index: 'ped_str_tiempoestimado', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_str_tipoentrega', index: 'ped_str_tipoentrega', width: '20', align: 'center' },

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

function getDataForm() {
    var form = $("#frmfiltroindex");
    return form.serializeArray();
}

function verDetallePedido(cellvalue, options, rowObject) {
    var control = '<a href="javascript:irDetalle(' + cellvalue + ')">Atender Pedido</a>';
    return control;
}

function irDetalle(id) {
    var grilla = $("#gridpedidos");
    var vUrl = $(grilla).data("urldetail") + "?id=" + id;
    $(window).attr("location", vUrl);
}

function cargarPedido(objname, id) {
    var lis = $("#ulestado").find("li");
    $(lis).removeClass("active");

    if (id == 0) $("#" + objname).removeClass("active");
    else $("#" + objname).addClass("active");

    $("#IdEstadoPedido").val(id);
    buscarPedido();


}

function buscarPedido() {
    var grilla = $("#gridpedidos");
    $(grilla).jqGrid('setGridParam', { postData: getDataForm() }).trigger('reloadGrid');
}
