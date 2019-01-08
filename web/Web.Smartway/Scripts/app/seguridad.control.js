$(document).ready(function () {

    configurarGrilla();

});
function configurarGrilla() {
    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.responsive = true;

    var descripcion = $("#txtNombreControl").val();

    var grilla = $("#gridcontrol");
    var pagergrilla = $("#gridcontrolpager");
    var vdataurl = $(grilla).data("dataurl") + "?descrip=" + descripcion;


    $(grilla).jqGrid({

        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        styleUI: 'Bootstrap',
        colNames: ['', '', 'Descripción', 'Comentario'],
        colModel:
        [
            { key: true, hidden: true, name: 'con_int_id', index: 'con_int_id' },
            { key: false, hidden: false, name: 'con_int_id', index: 'con_int_id', width: '20', align: 'center', formatter: editarControl },
            { key: false, hidden: false, name: 'con_str_descrip', index: 'con_str_descrip', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'con_str_comentario', index: 'con_str_comentario', width: '20', align: 'center' }
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

function editarControl(cellvalue, options, rowObject) {
    var control = '<a href="javascript:irDetalle(' + cellvalue + ')">Editar</a>';
    return control;
}

function irDetalle(id) {
    var grilla = $("#gridcontrol");
    var vUrl = $(grilla).data("urldetail") + "?id=" + id
    $(window).attr("location", vUrl);
}

