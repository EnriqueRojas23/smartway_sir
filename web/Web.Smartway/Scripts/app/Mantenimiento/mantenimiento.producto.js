const $grilla = $("#gridproducto");
const $pagergrilla = $("#gridproductopager");
const $btnNuevo =  $("#btnNuevo");
const $btnBuscar =  $("#btnBuscar");
const $btnCancelar = $("#btnCancelar")

$(document).ready(function () {
    inicio();
   //$("html, body").animate({ scrollTop: "100px" });
});
function inicio ()
{
    configurarGrilla();
    configurarBotones()

}
function configurarBotones()
{
    $btnNuevo.click(function (event) { btnAgregarProducto_onclick(this, event); });
    $btnBuscar.click(function (event) { reload();});
   

}
function configurarGrilla() {

    $.jgrid.defaults.height = 800;
    $.jgrid.defaults.responsive = true;

    let codigo = $("#codigo_search").val();
    let descripcion = $("#descripcion_search").val();
    let idtipoproducto = $("#idtipoproducto_search").val();
    let idmodelo = $("#idmodelo_search").val();
    let idfabricante = $("#idfabricante_search").val();

    var vdataurl = $grilla.data("dataurl") + "?codigo=" + codigo
    + "&descripcion=" + descripcion
    + "&idtipoproducto=" + idtipoproducto
    + "&idmodelo=" + idmodelo
    + "&idfabricante=" + idfabricante


    $grilla.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        colNames: ['','Código', 'Producto','Repuesto', 'Tipo' , 'Fabricante', 'Modelo','Peso' , 'Volumen', 'Moneda','Precio' ,'Acciones'],
        colModel:
        [
            { key: true, hidden: true, name: 'idproducto', index: 'idproducto' ,classes:"grid-col"},
            { key: false, hidden: false,  editable: true, name: 'codigoproducto',index: 'codigoproducto' ,width:'90' ,classes:"grid-col",formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'descripcionlarga',index: 'descripcionlarga' ,width:'290' ,classes:"grid-col",formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'repuesto',index: 'repuesto' ,width:'90' ,classes:"grid-col",formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'tipoproducto',width:'100', index: 'tipoproducto' ,classes:"grid-col",formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'fabricante', index: 'fabricante' ,classes:"grid-col",formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'modelo', index: 'modelo' ,classes:"grid-col" ,formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'peso', index: 'peso' ,classes:"grid-col", formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'volumen', index: 'volumen' ,classes:"grid-col", formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'moneda', index: 'moneda' ,classes:"grid-col", formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'preciounitario', index: 'preciounitario' ,classes:"grid-col", formatter: formatedit},
            { key: false, hidden: false, editable: false ,name: 'idproducto', width:'140' , index: 'idproducto' ,  formatter:  displayButtons,classes:"grid-col"}
        ],
        pager: $pagergrilla,
        rowNum: 40,
        rowList: [40, 80, 120, 160],
        emptyrecords: 'No se encontraron registros',
        autowidth: true,
        viewrecords: true,
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


    });
     $("#grid").jqGrid('bindKeys', {
                onEnter: function(rowid) {
                    doeditRow(rowid);
                }
            }  );


}


function btnAgregarProducto_onclick(obj, event) {
    const url = UrlHelper.Action("NuevoProducto", "Producto", "Mantenimiento")
    window.location.href = url;
}

function OnCompleteTransaction(xhr, status)
{
    var jsonres = xhr.responseJSON;
    CleanValidationError();

    if (jsonres.res == true)
    {
       swal({
           title: "Registro Exitoso",
           text: "Se registró correctamente el dato.",
            type: "success"
        },
       function ()
       {
          //  reload();
           //$("#modalcontainer").modal("hide");
       });

    }
    else
    {
        sweetAlert("Verificar Errores", null, "error");
        CheckValidationErrorResponse(jsonres);
    }

}

function editarcliente(id)
{
    var url = UrlHelper.Action("EditarClienteModal", "Seguimiento", "Seguimiento") + "?id=" + id;

    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        inicializandoEventosModalDocumentos(id);
    });
}
function rowSave(id,str)
{

  $("#griddirecciones").jqGrid('saveRow',id, finalizando);

}
function finalizando(resonsse)
{

  var respuesta =  JSON.parse(resonsse.responseText);

   if(respuesta.res == false)
   {
     swal({ title: "Error", text: "Código duplicado", type: "error", confirmButtonText: "Aceptar" });
     successfuncdir();
     return false;
  }
  else {
    successfuncdir();
    return true;
  }

}
function agregardireccion(id)
{
    var url = UrlHelper.Action("DireccionesModal", "Seguimiento", "Seguimiento") + "?idcliente=" + id;

    $("#txtidcliente").val(id);
      $.get(url, function (data) {
          $("#modalcontentL").html(data);
          $("#modalcontainerL").modal("show");

          inicializandoModalDireccion(id);




          $("#addrowp").click( function() {
                $("#griddirecciones").jqGrid('addRowData',0,1,"first");
                $("#griddirecciones").editRow(0,true);



    });
  });
}

function resetProviciasValues()
{
  var grilla = $("#griddirecciones");
  //$(grilla).setColProp('provincia', { editoptions: { fcnUrlControlGrid('provinciavacia') } });
}
function formatedit (cellvalue, options, rowObject)
{
  if(cellvalue == null)
    return "";
  else
    return " "  + cellvalue ;

}


function inicializandoEventosModalDocumentos(id)
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

function ChangeComboDireccion() {

    $("#ddlUbigeo").chosen().change(function () {




        var iddistrito = (+$(this).val());
        $("#iddistrito").val(iddistrito);

    })
}
function eliminarcliente(id)
{
    var vUrl = UrlHelper.Action("EliminarCliente", "Seguimiento", "Seguimiento") + "?id=" + id;
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


function reload()
{

   var codigo = $("#codigo_search").val();
   var descripcion = $("#descripcion_search").val();
   var idtipoproducto = $("#idtipoproducto_search").val();
   var idfabricante = $("#idfabricante_search").val();
   var idmodelo = $("#idmodelo_search").val();

   

    var vdataurl = $grilla.data("dataurl") 
    + "?codigo=" + codigo 
    + "&descripcion=" + descripcion 
    + "&idtipoproducto=" + idtipoproducto 
    + "&idmodelo=" + idmodelo 
    + "&idfabricante=" + idfabricante; 

    $grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');


}


function displayButtons(cellvalue, options, rowObject)
{
        var rela = ''
        if(rowObject["repuesto"] == "True"){
           rela = "<div class='btn-group' role='group' aria-label='Basic example'><button type='button' title='Relacionar' class='btn btn-primary btn-xs btn-outline' onclick='vincularreparacion(" + cellvalue + ")''><i class='fa fa-link'></i> </button>";
        }
        else
         rela = "<div class='btn-group' role='group' aria-label='Basic example'><button type='button' title='Relacionar' class='btn btn-primary btn-xs btn-outline' onclick='vincularproducto(" + cellvalue + ")''><i class='fa fa-link'></i> </button>"; 
        var guardar = "<button type='button' title='Editar' class='btn btn-primary btn-xs btn-outline' onclick='irEditar(" + cellvalue + ")''><i class='fa fa-edit'></i> </button>";
        var control = "<button type='button' title='Eliminar' class='btn btn-primary btn-xs btn-outline' onclick='irEliminar(" + cellvalue + ")''><i class='fa fa-trash'></i></button></div>";

        return rela + guardar + control ;
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
    var vdataurl =  UrlHelper.Action("JsonGetListarProveedorxCliente", "Seguimiento", "Seguimiento") + "?idcliente=" + id;
    $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');

}
var someRetValue;
function successfuncdir ()
{


    var grilla = $("#griddirecciones");
    var id =  $("#txtidcliente").val();

    var vdataurl =  UrlHelper.Action("JsonGetDirecciones", "Seguimiento", "Seguimiento") + "?idcliente=" + id;
    $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');

}

function mostrarproveedores(id,nombre)
{


    $("html, body").animate({ scrollTop: "900px" });

    $('#lblcliente').text('Cliente: ' + nombre);
    $("#txtidcliente").val(id);
    var grilla = $("#gridproveedores");
    var vdataurl =  UrlHelper.Action("JsonGetListarProveedorxCliente", "Seguimiento", "Seguimiento") + "?idcliente=" + id;
    $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}

var lastSelection;
function editRow(id) {

    var grilla = $("#griddirecciones");
    $.each($.find("select[name='idasignacion']"), function(){

        $(this).on( "keydown", function(event) {
          if(event.which == 13)
            $(grilla).saveRow("rowid", false);
        });

    })

    if (id && id !== lastSelection) {
        $("#griddirecciones").jqGrid('restoreRow', lastSelection);
        $("#griddirecciones").jqGrid('editRow', id, true);
        lastSelection = id;
    }
}
function irEliminar(id)
{
   var url = UrlHelper.Action("EliminarProducto", "Producto", "Mantenimiento");
    swal({
        title: "Eliminar Producto",
        text: "¿Está seguro que desea eliminar esta Producto?",
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
                   data: { "idproducto": id },
                   success: function (data) {
                       swal("¡Se ha eliminado correctamente!", data.msj, "success");
                       reload()
                   },
                   error: function (request, status, error)
                   {
                       swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                   }
               });
          }
     });

}
function irEliminarDireccion(id)
{
   var url = UrlHelper.Action("EliminarDireccion", "Seguimiento", "Seguimiento");
    swal({
        title: "Inactivar Dirección",
        text: "¿Está seguro que desea Inactivar esta Dirección?",
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
                   data: { "iddireccion": id },
                   success: function (data) {
                       swal("¡Se ha inactivado correctamente!", data.msj, "success");
                           var id =  $("#txtidcliente").val();
                          var grilla = $("#griddirecciones");
                          var vdataurl =  UrlHelper.Action("JsonGetDirecciones", "Seguimiento", "Seguimiento") + "?idcliente=" + id;
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

function validateFloatKeyPress(el, evt)
{

   var charCode = (evt.which) ? evt.which : event.keyCode;

    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }

    if (charCode == 46 && el.value.indexOf(".") !== -1) {
        return false;
    }

    if (el.value.indexOf(".") !== -1)
    {
        var range = document.selection.createRange();

        if (range.text != ""){
        }
        else
        {
            var number = el.value.split('.');
            if (number.length == 2 && number[1].length > 1)
                return false;
        }
    }

    return true;
}
function irEditar(id)
{   
    const url = UrlHelper.Action("EditarProducto", "Producto", "Mantenimiento") + "?idproducto=" + id
    window.location.href = url;
}
function vincularproducto(id){
    let url = UrlHelper.Action("ModelAsociarRepuestoaProducto", "Producto", "Mantenimiento") + "?idproducto=" + id;
    $.get(url, function(data) { 
        $("#modalcontent").html(data);
        $("#modalcontainer").modal('show');
        var dlbAccesoriosODS = $('select[name="RepuestosSeleccionados"]').bootstrapDualListbox({
            nonSelectedListLabel: 'Disponibles',
            selectedListLabel: 'Seleccionados',
            showFilterInputs: true,
            moveOnSelect: true,
        });
    });
}
function vincularreparacion(id){
    let url = UrlHelper.Action("ModelAsociarReparacion", "Producto", "Mantenimiento") + "?idrepuesto=" + id;
    $.get(url, function(data) { 
        $("#modalcontent").html(data);
        $("#modalcontainer").modal('show');
        var dlbAccesoriosODS = $('select[name="RepuestosSeleccionados"]').bootstrapDualListbox({
            nonSelectedListLabel: 'Disponibles',
            selectedListLabel: 'Seleccionados',
            showFilterInputs: true,
            moveOnSelect: true,
        });
    });
}
function RegistrarReparacionesxProducto()
{
    let  seleccionados = $("#RepuestosSeleccionados").val().toString()
    let  idrepuesto = $("#idrepuesto").val()
    let Vurl = UrlHelper.Action("RegistrarReparaciones","Producto","Mantenimiento")
        $.ajax({
            type: "POST",
            url: Vurl,
            data: { repuestos : seleccionados , idrepuesto : idrepuesto },
            dataType: "JSON",
            success: function (response) {
                $("#modalcontainer").modal('hide');
            },
            error: function (request, status, error)
            {
                swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
            }

        });

   
}
function RegistrarRepuestosxProducto()
{
    let  seleccionados = $("#RepuestosSeleccionados").val().toString()
    let  idproducto = $("#idproducto").val()
    let Vurl = UrlHelper.Action("RegistrarRepuestos","Producto","Mantenimiento")
        $.ajax({
            type: "POST",
            url: Vurl,
            data: { repuestos: seleccionados, idproducto : idproducto },
            dataType: "JSON",
            success: function (response) {
                $("#modalcontainer").modal('hide');
            },
            error: function (request, status, error)
            {
                swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
            }

        });

   
}