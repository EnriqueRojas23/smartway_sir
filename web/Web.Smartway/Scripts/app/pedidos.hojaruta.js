$(document).ready(function () {
	configurarGrilla();
});

function configurarGrilla() {

	$.jgrid.defaults.width = 780;
	$.jgrid.defaults.height = 320;
	$.jgrid.defaults.responsive = true;


	var grilla = $("#gridpedidos");
	var pagergrilla = $("#gridpedidospager");
	var vdataurl = $(grilla).data("dataurl") + "?est=" + 13;

	$(grilla).jqGrid({
		url: vdataurl,
		datatype: 'json',
		mtype: 'Get',
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
	//	multiselect: true,
		jsonReader:
        {
        	root: "rows",
        	page: "page",
        	total: "total",
        	records: "records",
        	repeatitems: false,
        	id: 0
        },
		//beforeSelectRow: function (rowid, e) {
		//    jQuery("#list47").jqGrid('resetSelection');
		//    return (true);
		//}
	});
	//$(grilla)
	//    .jqGrid('setSelection', '4');
}

function verHojaRuta(cellvalue, options, rowObject) {
	var control = '<a href="javascript:irDetalle(' + cellvalue + ')">Hoja de Ruta</a>';
	return control;
}
function verLiquidar(cellvalue, options, rowObject) {
    var control = '<a href="javascript:irDetalle(' + cellvalue + ')">Liquidar</a>';
    return control;
}
function irDetalle(id) {
	var grilla = $("#gridpedidos");
	var vUrl = $(grilla).data("urldetail") + "?id=" + id;
	$(window).attr("location", vUrl);
}

function cargarPedido(objname, id, dni, numero) {


	dni = $('#txtDNI').val();
	numero = $('#txtNumero').val();
	var grilla = $("#gridpedidos");
	var vdataurl = $(grilla).data("dataurl") + "?est=" + id + "&dni=" + dni + "&numero=" + numero;
	$('#txtNumero').val('');


	var lis = $("#ulestado").find("li");

	$(lis).removeClass("active");

	if (id == 0) {
		$("#" + objname).removeClass("active");
	}
	else {
		$("#" + objname).addClass("active");
	}


	$(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}

