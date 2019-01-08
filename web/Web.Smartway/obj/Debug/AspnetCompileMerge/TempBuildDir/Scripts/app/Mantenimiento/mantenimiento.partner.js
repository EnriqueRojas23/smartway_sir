
$(document).ready(function () {

  $("html, body").animate({ scrollTop: "100px" });



 $("#btnNuevo").click(function (event) { btnAgregarPartner_onclick(this, event); });
 $("#btnBuscar").click(function (event) {    reload();           });

 configurarGrilla();



});


function btnAgregarPartner_onclick(obj, event) {


    var url = UrlHelper.Action("AgregarPartnerModal", "Mantenimiento", "Mantenimiento")


  //  var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");


      inicializandoEventosModal();




    });
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
           reload();
           $("#modalcontainer").modal("hide");
       });

    }
    else
    {
        sweetAlert("Verificar Errores", null, "error");
        CheckValidationErrorResponse(jsonres);
    }

}

// function editarcliente(id)
// {
//     var url = UrlHelper.Action("EditarClienteModal", "Seguimiento", "Seguimiento") + "?id=" + id;

//     $.get(url, function (data) {
//         $("#modalcontent").html(data);
//         $("#modalcontainer").modal("show");
//         inicializandoEventosModal(id);
//     });
// }
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


function inicializandoEventosModal(id)
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
// function configComboSucursal(){
//   $("#idtiposucursal").change(function(event) {
//     if($("#idtiposucursal").val() == 1)
//     {
//        $("#idpartner").attr('disabled', 'true');
//        $("#idpartner").removeAttr('required');
//
//        $("#idtipopago").removeAttr('disabled');
//        $("#idtipopago").attr('required', 'true');
//
//
//
//
//     }
//     else {
//        $("#idpartner").removeAttr('disabled');
//        $("#idpartner").attr('required', 'true');
//
//        $("#idtipopago").attr('disabled', 'true');
//        $("#idtipopago").removeAttr('required');
//
//        $("#idtipopago").val(1).change();
//     }
//   });
// }
function ChangeComboDireccion() {

    $("#ddlUbigeo").chosen().change(function () {




        var iddistrito = (+$(this).val());
        $("#iddistrito").val(iddistrito);

    })
}



function reload()
{

      var numerodocumento = $("#numerodocumento").val();
      var razonsocial = $("#razonsocial").val();

    var grilla = $("#gridpartner");

    var vdataurl = $(grilla).data("dataurl") + "?numerodocumento=" + numerodocumento + "&razonsocial=" + razonsocial ;
    $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');


}

function configurarGrilla() {
  $.jgrid.defaults.height = 400;
  $.jgrid.defaults.responsive = true;

    var grilla = $("#gridpartner");
    var pagergrilla = $("#gridpartnerpager");


    var numerodocumento = $("#numerodocumento").val();
    var razonsocial = $("#razonsocial").val();
    //var idtipopartner = $("#idpartner_search").val();

    var vdataurl = $(grilla).data("dataurl") + "?numerodocumento=" + numerodocumento + "&razonsocial=" + razonsocial ;


    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        colNames: ['','Tipo', 'RUC','Razón Social', 'Dirección' , 'Teléfono', 'Condición Pago','Línea Crédito' , 'Activo' ,'Acciones'],
        colModel:
        [
            { key: true, hidden: true, name: 'idpartner', index: 'idpartner' ,classes:"grid-col"},
           { key: false, hidden: false,  editable: true, name: 'tipopartner',index: 'tipopartner' ,width:'90' ,classes:"grid-col",formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'numerodocumento',index: 'numerodocumento' ,width:'90' ,classes:"grid-col",formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'razonsocial',width:'220', index: 'razonsocial' ,classes:"grid-col",formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'direccion', index: 'direccion' ,classes:"grid-col",formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'telefono', index: 'telefono' ,classes:"grid-col" ,formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'condicionpago', index: 'condicionpago' ,classes:"grid-col", formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'lineacredito', index: 'lineacredito' ,classes:"grid-col", formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'activo', index: 'activo', align: 'center' ,classes:"grid-col", formatter: semaforo},
            { key: false, hidden: false, editable: false ,name: 'idpartner', width:'100' , index: 'idpartner' ,  formatter:  displayButtons,classes:"grid-col"}
        ],
        pager: $(pagergrilla),
        rowNum: 20,
        rowList: [20, 40, 60, 80],
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

function displayButtons(cellvalue, options, rowObject)
{

        var guardar = "<button type='button' title='Editar' class='btn btn-primary btn-xs btn-outline' onclick='editarsucursal(" + cellvalue + ")''><i class='fa fa-edit'></i> </button>";
        var control = "<button type='button' title='Eliminar' class='btn btn-primary btn-xs btn-outline' onclick='irEliminar(" + cellvalue + ")''><i class='fa fa-trash'></i></button>";
        var restore = "<button type='button' title='Zona' class='btn btn-primary btn-xs btn-outline' onclick='irEliminar(" + cellvalue + ")''><i class='fa fa-university'></i> </button>";

        return guardar + control + restore;
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
   var url = UrlHelper.Action("EliminarPartner", "Mantenimiento", "Mantenimiento");
    swal({
        title: "Eliminar Partner",
        text: "¿Está seguro que desea eliminar este Partner.?",
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
                   data: { "idpartner": id },
                   success: function (data) {
                       swal("¡Se ha eliminado correctamente!", data.msj, "success");
                           reload();
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
function editarsucursal(id)
{
     var url = UrlHelper.Action ("EditarPartnerModal", "Mantenimiento", "Mantenimiento") + "?idpartner=" + id;

     $.get(url, function(data) {
     $("#modalcontent").html(data);
     $("#modalcontainer").modal('show');
     inicializandoEventosModal(id)
    });



}
