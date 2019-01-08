const grilla = $("#gridsucursal");
const pagergrilla = $("#gridsucursalpager");

$(document).ready(function () {
  $("html, body").animate({ scrollTop: "100px" });
  $("#btnNuevo").click(function (event) { btnAgregarSucursal_onclick(this, event); });
  $("#btnBuscar").click(function (event) {     reload();          });
  configurarGrilla();
});


function btnAgregarSucursal_onclick(obj, event) {
    var url = UrlHelper.Action("AgregarSucursalModal", "Mantenimiento", "Mantenimiento")
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
         inicializandoEventosModalDocumentos();
         configComboSucursal();
         valodation()
     
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
        CheckValidationErrorWindowAlert(jsonres);
    }

}

function editarcliente(id)
{
    var url = UrlHelper.Action("EditarClienteModal", "Seguimiento", "Seguimiento") + "?id=" + id;
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        inicializandoEventosModalDocumentos();
        configComboSucursal();


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
function inicializandoEventosModalDocumentos()
{
      //$("#ddltipopago").attr('disabled', 'true');
      //$("#ddltipopago").trigger('chosen:updated');

     var config = {
            '.chosen-select': {max_selected_options: 5 ,
                 allow_single_deselect: false ,
                 no_results_text: 'Oops, no se encontró el ubigeo!',
                  placeholder_text_multiple: "Seleccione una opción"
                }

        }

        for (var selector in config) {
            $(selector).chosen(config[selector]);
        }


}
function configComboSucursal() {

//   if($("#idtiposucursal").val() == 1)
//   {
//     $("#idpartner").attr('disabled', 'true');
//     $("#idpartner").removeAttr('required');

//     $("#ddltipopago").removeAttr('disabled');
//     $("#ddltipopago").attr('required', 'true');

//     $("#ddltipopago").trigger('chosen:updated');
//   } 
//   else{
//     $("#idpartner").removeAttr('disabled');
//     $("#idpartner").attr('required', 'true');

//     $("#ddltipopago").attr('disabled', 'true');
//     $("#ddltipopago").removeAttr('required');

//     $("#ddltipopago").val(1).change();

//     $("#ddltipopago").trigger('chosen:updated');    
//   }

//   $("#idtiposucursal").change(function(event) {
//     if($("#idtiposucursal").val() == 1)
//     {
//        $("#idpartner").attr('disabled', 'true');
//        $("#idpartner").removeAttr('required');

//        $("#ddltipopago").removeAttr('disabled');
//        $("#ddltipopago").attr('required', 'true');

//        $("#ddltipopago").trigger('chosen:updated');




//     }
//     else {
//        $("#idpartner").removeAttr('disabled');
//        $("#idpartner").attr('required', 'true');

//        $("#ddltipopago").attr('disabled', 'true');
//        $("#ddltipopago").removeAttr('required');

//        $("#ddltipopago").val(1).change();

//        $("#ddltipopago").trigger('chosen:updated');
//     }
//   });
}
function ChangeComboDireccion() {
     $("#ddlUbigeo").chosen().change(function () {
     var iddistrito = (+$(this).val());
     $("#iddistrito").val(iddistrito);
    })
}



function configurarGrilla() {
  $.jgrid.defaults.height = 200;
  $.jgrid.defaults.responsive = true;




    var codigo = $("#codigo").val();
    var nombre = $("#nombre").val();
    var idtipopartner = $("#idpartner_search").val();

    var vdataurl = $(grilla).data("dataurl") + "?codigo=" + codigo + "&nombre=" + nombre + "&idtipopartner="+ idtipopartner;


    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        colNames: ['', 'Código','Sucursal', 'Dirección' , 'Tipo Sucursal', 'Tipo Pago', 'Delivery', 'Condición Recojo' , 'Condición Entrega', 'Activo' ,'Acciones'],
        colModel:
        [
            { key: true, hidden: true, name: 'idsucursal', index: 'idsucursal' ,classes:"grid-col"},
            { key: false, hidden: false,  editable: true, name: 'codigo' ,width:'60',index: 'codigo' ,classes:"grid-col",formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'nombre',width:'130', index: 'nombre' ,classes:"grid-col",formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'direccion', index: 'direccion' ,classes:"grid-col",formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'tiposucursal', width:'70',index: 'tiposucursal' ,classes:"grid-col" ,formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'tipopago', width:'250',index: 'tipopago' ,classes:"grid-col", formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'delivery', width:'60', index: 'delivery' , align: 'center' ,classes:"grid-col", formatter: semaforo},
            { key: false, hidden: false,  editable: true, name: 'condicionrecojo', index: 'condicionrecojo' ,classes:"grid-col", formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'condicionentrega', index: 'condicionentrega' ,classes:"grid-col", formatter: formatedit},
            { key: false, hidden: false,  editable: true, name: 'activo', width:'50', index: 'activo', align: 'center' ,classes:"grid-col", formatter: semaforo},
            { key: false, hidden: false, editable: false ,name: 'idsucursal', width:'100' , index: 'idsucursal' ,  formatter:  displayButtons,classes:"grid-col"}
        ],
        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        emptyrecords: 'No se encontraron registros',
        autowidth: true,
        viewrecords: true,
        autoheight: true,
        onSelectRow: function (rowid, status) {
            //updateIdsOfSelectedRows(rowid, status);


        },


        afterInsertRow: function(id, currentData, jsondata) {

        },
         beforeSubmit: function () {

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
        //var restore = "<button type='button' title='Zona' class='btn btn-primary btn-xs btn-outline' onclick='irEliminar(" + cellvalue + ")''><i class='fa fa-university'></i> </button>";

        return guardar + control 
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




function irEliminar(id)
{
   var url = UrlHelper.Action("EliminarSucursal", "Mantenimiento", "Mantenimiento");
    swal({
        title: "Eliminar Sucursal",
        text: "¿Está seguro que desea eliminar la sucursal?",
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
          
            $.ajax({
                   type: "POST",
                   url: url ,
                   datatype: "JSON",
                   data: { "idsucursal": id },
                   success: function (response) {
                       if(response.res)
                       {
                        swal("Sucursales", response.msj, "success");
                        reload()
                       }
                       else 
                       {
                        swal("Sucursales", response.msj, "error");
                        reload()
                       }
                   },
                   error: function (request, status, error)
                   {
                       swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                   }
               });
          }
     });

}


function editarsucursal(id)
{
     var url = UrlHelper.Action ("EditarSucursalModal", "Mantenimiento", "Mantenimiento") + "?idsucursal=" + id;

     $.get(url, function(data) {
       $("#modalcontent").html(data);
       $("#modalcontainer").modal('show');

       $("#ddltipopago").val($("#idtipopago").val().split(','));
       $("#ddltipopago").trigger('chosen:updated');
       
       inicializandoEventosModalDocumentos();
       configComboSucursal();

       valodation()
 
     });
}
function reload()
{
      let codigo = $("#codigo").val();
      let nombre = $("#nombre").val();
      let idtipopartner = $("#idpartner_search").val();

      var vdataurl = $(grilla).data("dataurl") + "?codigo=" + codigo + "&nombre=" + nombre + "&idtipopartner="+ idtipopartner;
      $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function guardar()
{

}

function valodation()
{
    $("#frmAgregarSucursal").validate( {
        ignore: '*:not([name])', //Fixes your name issue
        rules : {
           codigo : {
                    required : true,
                    minlength: 3,
          },
          nombre : {
                  required : true,
                  minlength : 3,
                  maxlength : 50,
          },
          idtiposucursal : {
                required : true
          },
          iddistrito : "required",
          direccion : "required",
          contacto : "required",
          email : "required",
          telefono : "required",
          idcondicionrecojo : "required",
          idcondicionentrega : "required",
          reparacion : "required",
      },

    });
}