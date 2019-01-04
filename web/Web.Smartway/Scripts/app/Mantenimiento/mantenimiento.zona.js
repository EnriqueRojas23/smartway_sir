var btnNuevo = "#btnNuevo";

$(document).ready(function () {
 $(btnNuevo).click(function (event) { btnAgregarCliente_onclick(this, event); });
 $("#btnBuscar").button()
									 .click(function (e) {
											 oClientesTable.draw();
									 });


 // $("#valor").keypress(function (event) {
 //                if (event.which == 13) {
 //                    $("#btnBuscar").click();
 //                }
 //            });

CargaListaCliente();
//configurarGrilla();
CargaListaDistritos();


});





$(document).keydown(function (e) {
		if (e.which == 81 && e.ctrlKey)
			 $("#btnNuevo").click();

});
$(function() {
		$('.focus :input').focus();
});


function CargaListaCliente() {


		oClientesTable =
			 $('.dataTables-tblZona').DataTable({
					 responsive: true,
					 dom: '<"html5buttons"B>lTfgitp',
					 "processing": true,
					 "serverSide": true,
						"oLanguage": {
								"oPaginate": {
										"sPrevious": "<< Atrás",
										"sNext" : "Siguiente >>",
										"sFirst": "<<",
										"sLast": ">>"
										},
								"sSearch" : "Búsqueda:"
								,"sInfo": "_START_ de _END_"
								,"sLengthMenu":  ""  }
								,


					 "ajax": {
							 "url": $('#tblZona').data("url"),
							 "data": function (d) {
									 d.criterio = $('#criterio').val();
							 },
							 "type": "POST",
							 "datatype": "json"
					 },
					 "columns": [
									 {
											 "key": true, "title": "Id", "data": "idzona", "name": "idzona", visible: false, "autoWidth": true, "class": "text-center",
											 "mRender":
																	function (data, type, full) {
																			return "<span class='label label-primary'>" + " " + data + " " + "</span>";
																	}
									 },
									 { "title": "Zona", "data": "zona", "name": "zona", "autoWidth": true, "class": "text-center" },
									 { "title": "Departamento", "data": "departamento", "name": "departamento", "autoWidth": true, "class": "text-center" },
									 { "title": "Cant. Distritos", "data": "cantidad", "name": "cantidad", "autoWidth": true, "class": "text-center" },
									 {
											 "title": "Acciones", "class": "text-center", "data": "idzona", "Width": "15%", "mRender":

												function (data, type, full) {
														return  "<button type='button' data-toggle='tooltip' data-placement='top'  class='btn-info btn btn-xs btn-outline' onclick='editarzona(" + data + ");' href='#' > <i class='fa fa-university'></i> </button></div>"
															 + "<button type='button' data-toggle='tooltip' data-placement='top'  class='btn-primary btn btn-xs btn-outline' onclick=\"mostrardistritos(" + data + ",'" +  full.zona + "')\"  href='#' > <i class='fa fa-search'></i> </button></div>";

												}
									 },

					 ],
					 buttons: [
							 { extend: 'excel', title: 'Listado de Zonas', exportOptions: { columns: [ 1, 2, 3  ] } },
							 { extend: 'pdf', title: 'Listado de Zonas', exportOptions: { columns: [ 1, 2, 3 ] } }

					 ]

			 });
}

function btnAgregarCliente_onclick(obj, event) {


    var url = UrlHelper.Action("AgregarZonaModal", "Mantenimiento", "Mantenimiento")

	//  var url = $(obj).data("url");
		$.get(url, function (data) {
				$("#modalcontent").html(data);
				$("#modalcontainer").modal("show");
				inicializandoEventosModalDocumentos();
				BeginDropDownlist();
				configurarGrilla();
		});
}

function OnCompleteTransaction(xhr, status)
{
		var jsonres = xhr.responseJSON;
		//CleanValidationError();

		if (jsonres.res == true)
		{
			 swal({
					 title: "Registro Exitoso",
					 text: "Se registró correctamente el dato.",
						type: "success"
				},
			 function ()
			 {
					 $("#modalcontainer").modal("hide");
					 oClientesTable.draw();
			 });

		}
		else
		{
				sweetAlert(jsonres.mensaje, null, "error");
				$("#modalcontainer").modal("hide");

		}

}

function editarzona(id)
{
    var url = UrlHelper.Action("EditarZonaModal", "Mantenimiento", "Mantenimiento") + "?id=" + id;
		$("#idzona").val(id);
		$.get(url, function (data) {
				$("#modalcontent").html(data);
				$("#modalcontainer").modal("show");
				inicializandoEventosModalDocumentos(id);
				configurarGrillaEditar();
				BeginDropDownlistEditar();
		});
}
function agregardireccion(id)
{
    var url = UrlHelper.Action("EditarClienteModal", "Mantenimiento", "Mantenimiento") + "?id=" + id;

			$.get(url, function (data) {
					$("#modalcontent").html(data);
					$("#modalcontainer").modal("show");
					inicializandoEventosModalDocumentos(id);
			});
}

function inicializandoEventosModalDocumentos(id)
{

		 var config = {
						'.chosen-select': {},
						'.chosen-select-deselect': { allow_single_deselect: true },
						'.chosen-select-no-results': { no_results_text: 'Oops, no se encontró la dirección!' }
				}

				for (var selector in config) {
						$(selector).chosen(config[selector]);
				}

				ChangeComboDireccion();



		$('#hdidmoneda').val(id);
}
function ChangeComboDireccion() {

		$("#ddlDireccion").chosen().change(function () {


				var iddireccion = (+$(this).val());

				$.ajax(
						{
								type: "POST",
								async: true,
								url: $("#ddlDireccion").data("url").trim(),
								data: { "iddireccion": iddireccion },
								success: function (data) {
										$("#ubigeo").val(data.ubigeo);
										$("#iddireccion").val(data.iddireccion);
										$("#idubigeo").val(data.iddistrito);

								},
								error: function (request, status, error) {
										swal({ title: "Error!", text: "¡No se pudo cargar los datos de la dirección!", type: "error", confirmButtonText: "Aceptar" });
								}
						});
		})
}
function eliminarcliente(id)
{
    var vUrl = UrlHelper.Action("EliminarCliente", "Mantenimiento", "Mantenimiento") + "?id=" + id;
		swal({
				title: "Eliminar Cliente",
				text: "¿Está seguro que desea eliminar este registro?",
				type: "warning",
				showCancelButton: true,
				cancelButtonText: "Cancelar",
				confirmButtonColor: '#DD6B55',
				confirmButtonText: 'Eliminar',
				closeOnConfirm: true,
				closeOnCancel: true
		},
			 function (isConfirm) {
					 if (isConfirm) {
							 $.ajax({

									 url: vUrl,
									 type: "post",
									 datatype: "json",
									 data: { id: id },
									 success: function (data) {
											 if (data.res) {
													 swal("¡Se eliminó correctamente!", data.msj, "success");
													 $("#modalcontainer").modal("hide");
														oClientesTable.draw();

											 } else {
													 swal({ title: "Error", text: data.msj , type: "error", confirmButtonText: "Aceptar" });
											 }
									 },
									 error: function (data) {
											 alert(data.Errors.toString());
									 }
							 });
					 }
		 });
}

function CargaListaDistritos()
{
		$.jgrid.defaults.height = 320;
		$.jgrid.defaults.width = 550;
		$.jgrid.defaults.responsive = false;
		var grilla = $("#griddistritoszona");
		var pagergrilla = $("#griddistritoszonapager");



		var vdataurl = $(grilla).data("dataurl")  ;

		$(grilla).jqGrid({
				url: vdataurl,
				datatype: 'json',
				mtype: 'Get',
				colNames: ['','','Zona','Departamento','Provincia', 'Distrito'],
				colModel:
				[
						{ key: true, hidden: true, name: 'iddistrito', index: 'iddistrito' ,classes:"grid-col"},
						{ key: true, hidden: true, name: 'iddistrito', index: 'iddistrito' ,classes:"grid-col"},
						{ key: false, hidden: false, editable: true ,name: 'zona', index: 'zona', width: '120', align: 'center',classes:"grid-col"},
						{ key: false, hidden: false, editable: true ,name: 'departamento', index: 'departamento', width: '120', align: 'center',classes:"grid-col"},
						{ key: false, hidden: false, editable: true ,name: 'provincia', index: 'provincia', width: '120', align: 'center',classes:"grid-col"},
						{ key: false, hidden: false, editable: true ,name: 'distrito', index: 'distrito', width: '120', align: 'center',classes:"grid-col"},
						//{ key: false, hidden: false, editable: false ,name: 'iddistrito', width:'20' , index: 'iddistrito' ,  formatter:  displayButtons,classes:"grid-col"}
				],
				pager: $(pagergrilla),
				rowNum: 10,
				rowList: [10, 20, 30, 40],
				emptyrecords: 'No se encontraron registros',
				autowidth: true,
				viewrecords: true,
				autoheight: true,
				editable:true,
				loadComplete: function (data) {
						var numerofilas = $(this).getGridParam("records");
						setStyleCheckBoxGrid(this);
				},
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
function setStyleCheckBoxGrid(grilla) {
		var controles = $(grilla).find("input[type=checkbox]");
		var div = $('<div class="checkbox checkbox-primary"></div>');

		$.each(controles, function () {

				//obteniendo objetos
				var checkboxHtml = $(this)[0].outerHTML;
				var checkparent = $(this).parent();
				var divclone = $(div).clone(false)[0];

				//estableciendo valores
				$(divclone).html(checkboxHtml + '<label />');
				checkparent.html("");
				checkparent.html(divclone);

		});
}
function mostrardistritos(id,nombre)
{
		//$("#txtidcliente").val(id);
		 $('#lblZona').text('Zona seleccionada :  ' +  nombre);
		 $('#idzona').val(id);
		var grilla = $("#griddistritoszona");
        var vdataurl = UrlHelper.Action("JsonGetListarDistritoxZona", "Mantenimiento", "Mantenimiento") + "?idzona=" + id;
		$(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function configurarGrilla() {


		$.jgrid.defaults.height = 220;
		$.jgrid.defaults.width = 450;
		$.jgrid.defaults.responsive = false;
		var grilla = $("#griddistritos");
		var pagergrilla = $("#griddistritospager");



		var vdataurl = $(grilla).data("dataurl")  ;

		$(grilla).jqGrid({
				url: vdataurl,
				datatype: 'json',
				mtype: 'Get',
				colNames: ['','Distrito'],
				colModel:
				[
						{ key: true, hidden: true, name: 'iddistrito', index: 'iddistrito' ,classes:"grid-col"},
//            { key: false, hidden: false,  width:'160' , name: 'iddistrito', index: 'iddistrito',align: 'center' , formatter: VerCheckBox},
						{ key: false, hidden: false, editable: true ,name: 'distrito', index: 'distrito', width: '320', align: 'center',classes:"grid-col", classes: "grid-col" },
						//{ key: false, hidden: false, editable: false ,name: 'iddistrito', width:'20' , index: 'iddistrito' ,  formatter:  displayButtons,classes:"grid-col"}
				],
				pager: $(pagergrilla),
				rowNum: 100,
				rowList: [100, 200, 300, 400],
				emptyrecords: 'No se encontraron registros',
				//autowidth: true,
				viewrecords: true,
				//autoheight: true,
				editable:true,
				multiselect: true,
				onSelectRow: function (rowid, status) {
						updateIdsOfSelectedRows(rowid, status);
				},
				onSelectAll: function (aRowids, status) {
						var i, count, id;
						for (i = 0, count = aRowids.length; i < count; i++) {
								id = aRowids[i];
								updateIdsOfSelectedRows(id, status);
						}
				},
				jsonReader:
				{
						root: "rows",
						page: "page",
						total: "total",
						records: "records",
						repeatitems: false,
						id: 0
				},
				 loadComplete: function (data) {
						var numerofilas = $(this).getGridParam("records");
						setStyleCheckBoxGrid(this);
				},


		});


}
function displayButtons(cellvalue, options, rowObject)
		{

				var guardar = "<button type='button' title='Guardar' class='btn btn-danger btn-xs btn-outline' onclick=\"$('#gridproveedores').saveRow('" + options.rowId + "', successfunc)\";><i class='fa fa-save'></i> </button>";
				var control = '<button type="button" class="btn btn-warning btn-xs btn-outline" onclick="irEliminar(' + cellvalue + ')"><i class="fa fa-trash"></i></button>';

				return guardar + control;
		}
function formatedit (cellvalue, options, rowObject)
{

		return " "  + cellvalue ;

}
var editOptionsNew = {
				keys: true,
				successfunc: function () {
						var $self = $(this);
						setTimeout(function () {
								$self.trigger("reloadGrid");
						}, 50);
				}
		};
function successfunc ()
{
		 var grilla = $("#gridproveedores");
		 var id =  $("#txtidcliente").val();
         var vdataurl = UrlHelper.Action("JsonGetListarProveedorxCliente", "Mantenimiento", "Mantenimiento") + "?idcliente=" + id;
		$(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');

}

var lastSelection;
function editRow(id) {
		alert('entre');
		var grilla = $("#gridasignacion");
		$.each($.find("select[name='idasignacion']"), function(){

				$(this).on( "keydown", function(event) {
					if(event.which == 13)
						$(grilla).saveRow("rowid", false);
				});

		})

		if (id && id !== lastSelection) {
				$("#gridasignacion").jqGrid('restoreRow', lastSelection);
				$("#gridasignacion").jqGrid('editRow', id, true);
				lastSelection = id;
		}
}
function irEliminar(id)
{
    var url = UrlHelper.Action("EliminarProveedor", "Mantenimiento", "Mantenimiento");
		swal({
				title: "Eliminar Proveedor",
				text: "¿Está seguro que desea eliminar esta proveedor?",
				type: "warning",
				showCancelButton: true,
				cancelButtonText: "Cancelar",
				confirmButtonColor: '#DD6B55',
				confirmButtonText: 'Eliminar',
				closeOnConfirm: false,
				closeOnCancel: true
		},
			function (isConfirm) {
					 if (isConfirm) {
	 $.ajax(
							 {
									 type: "POST",
									 async: true,
									 url: url ,
									 data: { "idproveedor": id },
									 success: function (data) {
											 swal("¡Se ha eliminado correctamente!", data.msj, "success");
													 var id =  $("#txtidcliente").val();
													var grilla = $("#gridproveedores");
                                                    var vdataurl = UrlHelper.Action("JsonGetListarProveedorxCliente", "Mantenimiento", "Mantenimiento") + "?idcliente=" + id;
													$(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
									 },
									 error: function (request, status, error)
									 {
											 swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
									 }
							 });
					}
		 });

}


function BeginDropDownlist()
{
	 $("#iddepartamento").change(function ()
		{
				var iddepartamento = $("#iddepartamento").val();
                var url = UrlHelper.Action("ListarProvincias", "Mantenimiento", "Mantenimiento");
				$.ajax(
							 {
									 type: "POST",
									 async: true,
									 url: url ,
									 data: { "iddepartamento": iddepartamento },
									 success: function (data) {
											 var $select = $('#idprovincia');
											 $select.empty();
											 $("#idprovincia").append('<option value="">[Provincia]</option>');
											 $.each(data, function (i, state) {
													 $('<option>', {
															 value: state.Value
													 }).html(state.Text).appendTo($select);
											 });
									 },
									 error: function (request, status, error)
									 {
											 swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
									 }
							 });
		});
		 $("#idprovincia").change(function ()
				{
						 var id = $("#idprovincia").val();

						var grilla = $("#griddistritos");
                        var vdataurl = UrlHelper.Action("JsonGetListarDistritos", "Mantenimiento", "Mantenimiento") + "?idprovincia=" + id;
						$(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');

				});
}
function VerCheckBox(cellvalue, options, rowObject) {
		var control = $("<input type='checkbox' onclick=actualizaSeleccion('" +  cellvalue + "') value='"+ cellvalue + "'> <br>");
		var htmlcontrol = control[0].outerHTML;
		return htmlcontrol
}
function VerEditarCheckBox(cellvalue, options, rowObject) {

		var control = $("<input type='checkbox' onclick=actualizaSeleccion(" +  rowObject["iddistrito"] + "," + cellvalue + ") value='"+  rowObject["iddistrito"] + "'> <br>");
		if(cellvalue == true)
		{
			control.attr("checked", true);
		}
		else
		{
			//control.attr("checked", "false");
		}

		var htmlcontrol = control[0].outerHTML;
		return htmlcontrol
}
function actualizaSeleccion(id , valor)
{


    var vdataurl = UrlHelper.Action("AgregarDistrito", "Mantenimiento", "Mantenimiento") + "?iddistrito=" + id;
			$.ajax(
							 {
									 type: "POST",
									 async: true,
									 url: vdataurl ,
									 data: { "idproveedor": id },
									 success: function (data) {

									 },
									 error: function (request, status, error)
									 {
											 swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
									 }
							 });
}
function configurarGrillaEditar() {

		$.jgrid.defaults.height = 520;
		$.jgrid.defaults.width = 450;
		$.jgrid.defaults.responsive = false;
		var grilla = $("#griddistritoseditar");
		var pagergrilla = $("#griddistritoseditarpager");



		var vdataurl = $(grilla).data("dataurl")  + "?idzona="  +  $("#idzona").val();

		$(grilla).jqGrid({
				url: vdataurl,
				datatype: 'json',
				mtype: 'Get',
				colNames: ['','Distrito'],
				colModel:
				[
						{ key: true, hidden: true, name: 'iddistrito', index: 'iddistrito' ,classes:"grid-col"},
						//{ key: false, hidden: false,  width:'160' , name: 'idzona', index: 'idzona',align: 'center' , formatter: VerEditarCheckBox},
						{ key: false, hidden: false, editable: true ,name: 'distrito', index: 'distrito', width: '320', align: 'center',classes:"grid-col", classes: "grid-col" },
						//{ key: false, hidden: false, editable: false ,name: 'iddistrito', width:'20' , index: 'iddistrito' ,  formatter:  displayButtons,classes:"grid-col"}
				],
				pager: $(pagergrilla),
				rowNum: 100,
				rowList: [100, 200, 300, 400],
				emptyrecords: 'No se encontraron registros',
				autowidth: true,
				viewrecords: true,
				autoheight: true,
				editable:true,
				multiselect: true,
				onSelectRow: function (rowid, status) {
						updateIdsOfSelectedRows(rowid, status);
				},
				onSelectAll: function (aRowids, status) {
						var i, count, id;
						for (i = 0, count = aRowids.length; i < count; i++) {
								id = aRowids[i];
								updateIdsOfSelectedRows(id, status);
						}
				},
				jsonReader:
				{
						root: "rows",
						page: "page",
						total: "total",
						records: "records",
						repeatitems: false,
						id: 0
				},
					loadComplete: function (data) {



					 var i, count, $grid = $("#griddistritoseditar");

						var rowArray = $("#griddistritoseditar").jqGrid('getDataIDs');
						for (i = 0, count = rowArray.length; i < count; i += 1)
						{
								$grid.jqGrid('setSelection', rowArray[i], true);
								$grid.find('#'+i+'input[type=checkbox]').prop('checked',true);
						}

						var numerofilas = $(this).getGridParam("records");
						setStyleCheckBoxGrid(this);
				},



		});


}
var idsOfSelectedRows = [];
function BeginDropDownlistEditar()
{
	 $("#iddepartamento").change(function ()
		{
				var iddepartamento = $("#iddepartamento").val();
                var url = UrlHelper.Action("ListarProvincias", "Mantenimiento", "Mantenimiento");
				$.ajax(
							 {
									 type: "POST",
									 async: true,
									 url: url ,
									 data: { "iddepartamento": iddepartamento },
									 success: function (data) {
											 var $select = $('#idprovincia');
											 $select.empty();
											 $("#idprovincia").append('<option value="">[Provincia]</option>');
											 $.each(data, function (i, state) {
													 $('<option>', {
															 value: state.Value
													 }).html(state.Text).appendTo($select);
											 });
									 },
									 error: function (request, status, error)
									 {
											 swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
									 }
							 });
		});
		 $("#idprovincia").change(function ()
				{
						 var id = $("#idprovincia").val();
						 var idzona =$("#idzona").val();

						var grilla = $("#griddistritoseditar");
                        var vdataurl = UrlHelper.Action("JsonGetListarDistritoxZonaEditar", "Mantenimiento", "Mantenimiento") + "?idprovincia=" + id+ "&idzona=" + idzona;
						$(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');

				});
}


var updateIdsOfSelectedRows = function (id, isSelected) {
		var contains = $.inArray(id, idsOfSelectedRows) == -1 ? false : true; //.contains(id);
		if (!isSelected && contains) {
				for (var i = 0; i < idsOfSelectedRows.length; i++) {
						if (idsOfSelectedRows[i] == id) {
								idsOfSelectedRows.splice(i, 1);
								break;
						}
				}
		}
		else if (!contains) {
				idsOfSelectedRows.push(id);
		}

		$('#distritos').val(idsOfSelectedRows.toString());
};
