$(document).ready(function () {

    configurarGrilla();

});
function configurarGrilla() {
    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.responsive = true;

    var descripcion = $("#txtNombreRol").val();

    var grilla = $("#gridroles");
    var pagergrilla = $("#gridrolespager");
    var vdataurl = $(grilla).data("dataurl") + "?descrip=" + descripcion;


    $(grilla).jqGrid({

        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        styleUI: 'Bootstrap',
        colNames: ['', '', 'Descripción', 'Alias'],
        colModel:
        [
            { key: true, hidden: true, name: 'rol_int_id', index: 'rol_int_id' },
            { key: false, hidden: false, name: 'rol_int_id', index: 'rol_int_id', width: '20', align: 'center', formatter: editarRoles },
            { key: false, hidden: false, name: 'rol_str_descrip', index: 'rol_str_descrip', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'rol_str_alias', index: 'rol_str_alias', width: '20', align: 'center' }
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

function editarRoles(cellvalue, options, rowObject) {
    var control = '<a href="javascript:irDetalle(' + cellvalue + ')">Editar</a>';
    return control;
}

function irDetalle(id) {
    var grilla = $("#gridroles");
    var vUrl = $(grilla).data("urldetail") + "?id=" + id;
    $(window).attr("location", vUrl);
}


