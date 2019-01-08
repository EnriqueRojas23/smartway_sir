const $ddlsucursal = $("#idsucursal")
const $ddlalmacen = $('#idalmacen')

const $btnValidar = $('#btnValidar')
const $btnSelectFile = $('#btnSelectFile')

const URL_cargaalmacen = UrlHelper.Action("listarAlmacenes","Recepcion","Recepcion")
const URL_guardarIngreso = UrlHelper.Action("guardarIngreso", "Despacho","Despacho")
const URL_subirarchivo = UrlHelper.Action("SubirArchivo", "Despacho", "Despacho")

let $grilla = $("#gridcargadetalle")
//const URL_subirarchivo = UrlHelper.Action("SubirArchivo","Inventario", "Inventario")


$(document).ready(function() {
   
   inicio()
   $("#formOrdenIngreso").validate({
     errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        onError : function(){
            $('.input-group.error-class').find('.help-block.form-error').each(function() {
              $(this).closest('.form-group').addClass('error-class').append($(this));
            });
        },
        highlight: function(element, errorClass) {
            $(element).removeClass(errorClass);
        },

   })
   	  


});

function inicio(){
  configurarControles()
  configurarGrilla()
  

}
function configurarControles(){
	configurarCombos()
	configurarBotones()
  configurarChosenSelect()
}
function configurarBotones(){

;

 

  $btnSelectFile.click(function(event) {
     
     $.get(URL_subirarchivo, function(data) {
 		$("#modalcontent").html(data);
 		$("#modalcontainer").modal("show")
 		$("#error").hide();

 		    $(function () {
               $('#frmDocumentacion').submit(function (event)
                  {
                      var dataString;
                      event.preventDefault();
                           var action = $("#frmDocumentacion").attr("action");
                           if ($("#frmDocumentacion").attr("enctype") == "multipart/form-data") {
                                dataString = new FormData($("#frmDocumentacion").get(0));
                                contentType = false;
                                processData = false;
                            }
                            $.ajax({
                              url: action,
                              type: 'POST',
                              dataType: 'json',
                              data: dataString,
                              contentType : contentType,
                              processData : processData,
                             }).done(function(data) {
                                          if(data.res)
                                          {
                                            $("#modalcontainer").modal("hide");
                                            $("#p_mensaje").html(data.archivo)
                                            reload()
                                            swal({
                                            title: "Registro Exitoso",
                                            text: data.msj,
                                            type: "success"
                                            });
                                          }
                                          else {
                                          	$("#error").val(data.msj)
                                             $("#error").fadeIn(2000).fadeOut(5000);
                                          }
                                   }).fail(function() {
                                     console.log("error");
                                   }).always(function() {
                                     console.log("complete");
                                   });
                      });
                  });






     });

  });
  

}
function configurarChosenSelect()
{

     var config = {
            '.chosen-select': {max_selected_options: 5 ,
                 allow_single_deselect: false ,
                 no_results_text: 'Oops, no se encontró el ubigeo!' }

        }

        for (var selector in config) {
            $(selector).chosen(config[selector]);
        }

}
function configurarCombos(){

  $('#data_1 .input-group.date').datepicker({
	        todayBtn: "linked",
	        keyboardNavigation: false,
	        forceParse: false,
	        calendarWeeks: true,
	        autoclose: true,
	        format: 'dd/mm/yyyy'
        });


	 $ddlsucursal.change(function(event) {
    	
    	$.ajax({
    	  url: URL_cargaalmacen,
    	  type: 'POST',
    	  dataType: 'json',
    	  data: { idsucursal :  $ddlsucursal.val()    },
    	  success: function(data) {
    	  	
    	    
            $ddlalmacen.empty();
            $ddlalmacen.append('<option value="">--Seleccionar--</option>');

                $.each(data, function (i, state) {
                    $('<option>', {
                        value: state.Value
                    }).html(state.Text).appendTo($ddlalmacen);
                });
                //$("#idreparacion").trigger("chosen:updated")



    	  },
    	  error: function(xhr, textStatus, errorThrown) {
    	    //called when there is an error
    	  }
    	});
    });

}
function OnCompleteTransaction(xhr, status)
{
    var jsonres = xhr.responseJSON;
    CleanValidationError();

    if (jsonres.res == true)
    {
        swal({
            title: "Registro Completo",
            text: "Se registro de forma correcta.",
            type: "success"
        },
        function ()
        {
              let vurl = UrlHelper.Action("SeguimientoRecepcion","Recepcion","Recepcion") 
                window.location.href = vurl;
        });

    }
    else
    {
        swal("No se pudo cargar el archivo", jsonres.msj , "error");
        $("#modalcontainer").modal("hide");
        
    }

}
function configurarGrilla()
{



    $.jgrid.defaults.height = 1000;
    $.jgrid.defaults.responsive = true;

    $pagergrilla = $("#gridcargadetallepager")

    var vdataurl = $grilla.data("dataurl") 
   

    $grilla.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['', 'Item' ,'SKU','Serie', 'IMEI', 'MAC'  ],
        colModel:
        [
            { key: true, hidden: true, name: 'idfila', align: 'center' },
            { key: false, name: 'item',width:'30',  align: 'center',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'codigo',  align: 'center',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'serie',  width:'90', align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'imei',  width:'90', align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'mac',  width:'90', align: 'center', sortable: false, formatter: formatedit },
            //{ key: false, name: 'pallet', width:'90', align: 'center', sortable: false, formatter: formatedit },
            //{ key: false, name: 'fabricante',  width:'90', align: 'center', sortable: false, formatter: formatedit },
            
        ],
        pager: $pagergrilla,
        rowNum: 50,
        rowList: [ 50 ,100, 150,200, 250 , 300 , 350 ],
        emptyrecords: 'No se encontraron registros',
        autoheight: true,
        autowidth: true,
        shrinkToFit: true,
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
    });

}
function displayButtons(cellvalue, options, rowObject)
{
    var editar = '<button type="button" title="Editar" class="btn btn-outline btn-primary btn-xs  " onclick="editar(' + cellvalue + ')"><i class="fa fa-edit"></i></button>';
    var eliminar = '<button type="button" title="Eliminar" class="btn btn-outline btn-primary btn-xs  " onclick="eliminar(' + cellvalue + ')"><i class="fa fa-trash"></i></button>';
   return  '<div class="btn-group">' + editar + eliminar + '</div>' ;
}
function reload(){
	var vdataurl = $grilla.data("dataurl") 
	$grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}

