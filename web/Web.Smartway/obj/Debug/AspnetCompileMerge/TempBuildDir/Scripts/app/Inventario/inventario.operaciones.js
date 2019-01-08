const $ddlsucursal = $("#idsucursal")
const $ddlalmacen = $('#idalmacen')
const $ddlproducto = $('#idproducto')
const $btnBuscar = $('#btnBuscar')
const $btnOperacion = $("#btnOperacion")

let $grilla = $("#gridinventario")


const URL_cargaalmacen = UrlHelper.Action("listarAlmacenes","Inventario","Inventario")
const URL_cargaproductos = UrlHelper.Action("listarproductos","Inventario", "Inventario")
const URL_obtenerproducto = UrlHelper.Action("ObtenerProducto","Inventario", "Inventario")
const URL_obtenerinventario = UrlHelper.Action("JsonListarInventario","Inventario", "Inventario")



$(document).ready(function($) {
	inicio()


});



function inicio(){
	cargarcontroles()
    configurarChosenSelect();
    configurarBotones()
    configurarGrilla()

      $("#formInventario").validate({
        ignore: '*:not([name])',
        invalidHandler: function(form, validator) {
            var errors = validator.numberOfInvalids();
            if(errors > 0)
            {
              if(validator.errorList[0].element.id == 'ddlcliente'){
                 $("html, body").animate({ scrollTop: "100px" });
                 $('#idcliente').data('chosen').activate_action();
               }
               validator.errorList[0].element.focus();
            }
        } ,
        errorPlacement: function (error, element) {
                if (element.data().chosen) { 
                    element.next().after(error);
                } else {
                    element.after(error);
                }
        },



    });
}
function configurarBotones(){
   
   $btnBuscar.click(function(event) {
       event.preventDefault();

      $("#serie").valid();
      $("#imei").valid();
      
      if($ddlsucursal.val() == "") 
      {
      	 swal("No puede continuar", "Debe seleccionar una sucursal", "warning")
      	 return 
      }

     if($ddlalmacen.val() == "") {
      	 swal("No puede continuar", "Debe seleccionar un almacén", "warning")
      	 return 
     }
     reload()

     // if($ddlproducto.val() == "") {
     //  	 swal("No puede continuar", "Debe seleccionar un producto", "warning")
     //  	 return 
     // }

  
     // $.ajax({
     // 	url: URL_obtenerinventario,
     // 	type: 'POST',
     // 	dataType: 'json',
     // 	data: { idalmacen  : $ddlalmacen.val() 
     // 		, idproducto : $ddlproducto.val()
     // 		, serie : ''
     // 		,imei : '' },
     // })
     // .done(function(data) {

     //  if(data.res)
     //  {

     //        var dateString = data.inventario.fechahoraregistro.substr(6);
     //        var currentTime = new Date(parseInt(dateString ));
     //        var month = currentTime.getMonth() + 1;
     //        var day = currentTime.getDate();
     //        var year = currentTime.getFullYear();
     //        var date = day + "/" + month + "/" + year;

     //        $("#p_descripcionlarga").html(data.inventario.descripcionlarga)
     //        $("#p_codigoproducto").html("<i class='fa fa-caret-up'></i>" + data.inventario.codigoproducto)
     //        $("#s_almacen").html(data.inventario.nombrealmacen)	
     //        $("#p_estado").html(data.inventario.estado)	
     //        $("#p_cantidad").html(data.inventario.cantidad)	
     //        $("#p_fecharegistro").html(date)	
     // }
     // else
     // {
     //   swal("No se encuentra disponible en este almacén","", "warning")
     // }
    

     // })
     // .fail(function() {
     // 	console.log("error");
     // })
     // .always(function() {
     // 	console.log("complete");
     // });
     




   });

}
function configurarChosenSelect(id)
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
function cargarcontroles(){

     $ddlproducto.change(function(event) {
       $.ajax({
       	url: URL_obtenerproducto,
       	type: 'POST',
       	dataType: 'json',
       	data: {idproducto: $ddlproducto.val() },
       })
       .done(function(response){
                $("#imei").attr("disabled", true)
                $("#serie").attr("disabled", true)

                $("#imei").removeAttr("required")
                $("#serie").removeAttr("required")

               if(response.requiereserie){
                    $("#serie").removeAttr("disabled")
                    $("#serie").attr("required", true)
                }
                if(response.requiereimei){
                    //$("#requiereimei").attr('checked','checked')
                    $("#imei").attr("required", true)
                    $("#imei").removeAttr("disabled")
                }
       })
       .fail(function() {
          	console.log("error");
       })
       
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

  

  $btnOperacion.click(function(event) {
   let URL_popupModificarProductoInventario = UrlHelper.Action("ModificarProductoInventarioModal", "Inventario","Inventario") +  "?idproducto=1"
    $.get(URL_popupModificarProductoInventario, function(data) {
        $("#modalcontent").html(data)
        $("#modalcontainer").modal("show")
 


        cargarControlesModal()

        


    });

    /* Act on the event */
  });  //19119081474015   5346.66




}
function operarar(id){
  
 let URL_popupModificarProductoInventario = UrlHelper.Action("ModificarProductoInventarioModal", "Inventario","Inventario") +  "?idinventario=" + id
    $.get(URL_popupModificarProductoInventario, function(data) {
        $("#modalcontent").html(data)
        $("#modalcontainer").modal("show")
        cargarControlesModal()
    });

}
function cargarControlesModal(){
  
 $("#idsucursal_2") .change(function(event) { 

      
      $.ajax({
        url: URL_cargaalmacen,
        type: 'POST',
        dataType: 'json',
        data: { idsucursal :  $("#idsucursal_2").val()    },
        success: function(data) {
          
          
            $("#idalmacen_2").empty();
            $("#idalmacen_2").append('<option value="">--Seleccionar--</option>');

                $.each(data, function (i, state) {
                    $('<option>', {
                        value: state.Value
                    }).html(state.Text).appendTo($("#idalmacen_2"));
                });
                //$("#idreparacion").trigger("chosen:updated")



        },
        error: function(xhr, textStatus, errorThrown) {
          //called when there is an error
        } ///
      });
    });

}
function configurarGrilla()
{


    $.jgrid.defaults.height = 300;
    $.jgrid.defaults.responsive = true;

    $pagergrilla = $("#gridinventariopager")


     let idproducto = $("#idproducto").val()
    let idalmacen = $("#idalmacen").val()
    let serie = $("#serie").val()
    let imei = $("#imei").val()

    
   var vdataurl = $grilla.data("dataurl") + 
    "?idproducto="  + idproducto 
    + "&idalmacen=" + idalmacen 
    + "&serie=" + serie 
    + "&imei=" + imei 
   
   

    $grilla.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['','Código', 'Producto' , 'Modelo' ,'Serie','IMEI', 'Repuesto' ,'Estado' , 'Cantidad' , 'Acciones' ],
        colModel:
        [
            { key: true, hidden: true, name: 'idinventario', align: 'center' },
            { key: false, name: 'codigoproducto', width:'40', align: 'left',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'descripcionlarga',  align: 'left',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'modelo',  align: 'left', width:'40', sortable: false, formatter: formatedit },
            { key: false, name: 'serie',  width:'90', align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'imei',  width:'90', align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'repuesto',  width:'40', align: 'center', sortable: false, formatter: semaforo },
            { key: false, name: 'estado',  width:'120', align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'cantidad', width:'20', align: 'center',  sortable: false,  formatter: formatedit  },
            { key: false, hidden: false, editable: false ,name: 'idinventario', width:'40' , index: 'idinventario' ,  formatter:  displayButtons,classes:"grid-col"}
            
        ],
        pager: $pagergrilla,
        rowNum: 10,
        rowList: [10, 20],
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
    var editar = '<div class="btn-group"><button type="button" title="Editar" class="btn btn-primary btn-xs " onclick="operarar(' + cellvalue + ')"><i class="fa fa-edit"></i> Operar </button>';
    return   editar  ;
}
function reload(){
  
    let idproducto = $("#idproducto").val()
    let idalmacen = $("#idalmacen").val()
    let serie = $("#serie").val()
    let imei = $("#imei").val()



    
   var vdataurl = $grilla.data("dataurl") + 
    "?idproducto="  + idproducto 
    + "&idalmacen=" + idalmacen 
    + "&serie=" + serie 
    + "&imei=" + imei 
   
    $grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function OnCompleteTransaction(xhr,status){
   
   if(status=='success'){
     var jsonres = xhr.responseJSON;
     if(jsonres.res){
       swal("Operación exitosa","Se han realizado los cambios de manera exitosa.","success")
       $("#modalcontainer").modal("hide")
       reload()

     }else{
        swal("Error en operación", jsonres.msj ,"success")
        $("#modalcontainer").modal("hide")
         reload()
     }



   }
   else {
    swal("Error","Error al realizar la llamada","warning")

   }



}