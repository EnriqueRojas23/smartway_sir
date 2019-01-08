$(document).ready(function () {

    configurarGrilla();

});
function configurarGrilla() {
    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.responsive = true;

    var id = $("#txtIdTransporte").val();

    var grilla = $("#gridtransporte");
    var pagergrilla = $("#gridtransportepager");
    var vdataurl = $(grilla).data("dataurl") + "?id=" + id;
    

    $(grilla).jqGrid({

        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        styleUI: 'Bootstrap',
        colNames: ['', 'Nombre Moto', 'Empresa', 'Estado Motorizado', 'Nombre Transportista', 'Activo'],
        colModel:
        [
            { key: false, hidden: false, name: 'mot_int_id', index: 'mot_int_id', width: '20', align: 'center', formatter: irDetalle },
            { key: false, hidden: false, name: 'mot_str_nombMoto', index: 'mot_str_nombMoto', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'pro_int_id', index: 'pro_int_id', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'mot_str_estado', index: 'mot_str_estado', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'mot_str_conductor', index: 'mot_str_conductor', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'mot_str_act', index: 'mot_str_act', width: '20', align: 'center' }
        ],
        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        emptyrecords: 'No se encontraron registros',
        autowidth: true,
        autoheight: true,
        multiselect: true,
        jsonReader:
        {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            id: 0
        },
        beforeSelectRow: function (rowid, e) {
            jQuery("#list47").jqGrid('resetSelection');
            return (true);
        }
    });
    $(grilla)
        .jqGrid('setSelection', '4');
}

function irDetalle(cellvalue, options, rowObject) {
    var control = '<a href="javascript:irDetalle(' + cellvalue + ')">Ver Detalle</a>';
    return control;
}

function irDetalle(id) {
    var grilla = $("#gridtransporte");
  //  var vUrl = $(grilla).data("urldetail") + "?id=" + id
  //  $(window).attr("location", vUrl);
}

