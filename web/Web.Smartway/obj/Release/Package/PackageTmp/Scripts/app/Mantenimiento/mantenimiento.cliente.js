
var btnNuevo = "#btnNuevo";

$(document).ready(function () {
  $("html, body").animate({ scrollTop: "100px" });



 $(btnNuevo).click(function (event) { btnAgregarCliente_onclick(this, event); });
 $("#btnBuscar").button()
                   .click(function (e) {
                       oClientesTable.draw();

                       var grilla = $("#gridproveedores");
                       var id =  $("#txtidcliente").val();
                       var vdataurl =  UrlHelper.Action("JsonGetListarProveedorxCliente", "Seguimiento", "Seguimiento") + "?idcliente=0" ;
                        $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
                   });



      $("#criterio").keypress(function (event) {
                if (event.which == 13) {
                    $("#btnBuscar").click();
                }
            });

CargaListaCliente();
configurarGrilla();

$("#addrow").click( function() {

             var id =  $('#txtidcliente').val()
              if(id=='')
              {
                 sweetAlert("Debe seleccionar un cliente", null, "error");
                return;
              }
              else
              {


                  $("#gridproveedores").jqGrid('addRowData',0,1,"first");
                  $("#gridproveedores").editRow(0,true,null);

              }


  });


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
       $('.dataTables-tblCliente').DataTable({
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
               "url": $('#tblCliente').data("url"),
               "data": function (d) {
                   d.criterio = $('#criterio').val();
                   d.inactivo  = $("#activo").is(':checked');

               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   {
                       "key": true, "title": "Id", "data": "idcliente", "name": "idcliente", visible: false, "autoWidth": true, "class": "text-center",
                       "mRender":
                                  function (data, type, full) {
                                      return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                  }
                   },
                   { "title": "RUC", "data": "ruc", "name": "ruc", "autoWidth": true, "class": "text-center" },
                   { "title": "Nombre corto", "data": "nombrecorto", "name": "nombrecorto", "autoWidth": true, "class": "text-center" },
                   { "title": "Razón Social", visible: false, "data": "razonsocial", "name": "razonsocial", "autoWidth": true, "class": "text-center" },
                   { "title": "Dirección", "data": "direccion", "name": "direccion", "autoWidth": true, "class": "text-center" },
                   { "title": "Ubigeo", visible: false ,"data": "ubigeo", "name": "ubigeo", "autoWidth": true, "class": "text-center" },
                   { "title": "Linea Crédito", "data": "lineacredito", "name": "lineacredito", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Activo", "data": "activo", "name": "activo", "autoWidth": true, "class": "text-center",
                       "mRender":
                                  function (data, type, full) {
                                       if(data==true)
                                         return "<div><input type='checkbox' checked disabled name='your-group' value='unit-in-group' /> </div>";
                                      else
                                         return "<div><input type='checkbox'  disabled name='your-group' value='unit-in-group' /> </div>";
                                  }
                   },

                   {
                       "title": "Activo", visible: false, "data": "activo", "name": "activo", "autoWidth": true, "class": "text-center",
                       "mRender":
                                  function (data, type, full) {
                                       if(data==true)
                                         return "<span class='label label-primary'>" + "Activo" + "</span>";
                                      else
                                         return "<span class='label label-primary'>" + "Inactivo" + "</span>";
                                  }
                   },

                   {
                       "title": "Acciones", "class": "text-center", "data": "idcliente", "Width": "15%", "mRender":

                        function (data, type, full) {
                            return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Editar'  class='btn btn-primary btn-xs btn-outline' onclick='editarcliente(" + data + ");' href='#' > <i class='fa fa-edit'></i> </button>"
                            + "<button type='button' data-toggle='tooltip' data-placement='top'  class='btn btn-primary btn-xs btn-outline' title='Eliminar' onclick='eliminarcliente(" + data + ");' href='#' > <i class='fa fa-trash'></i> </button></div>"
                            + "<button type='button' data-toggle='tooltip' data-placement='top'  class='btn btn-primary btn-xs btn-outline' title='Direcciones' onclick='agregardireccion(" + data + ");' href='#' > <i class='fa fa-university'></i> </button></div>"
                               + "<button type='button' data-toggle='tooltip' data-placement='top'  class='btn btn-primary btn-xs btn-outline' title='Ver Proveedores' onclick=\"mostrarproveedores(" + data + ",'" +  full.nombrecorto + "');\" href='#' > <i class='fa fa-search'></i> </button></div>";

                        }
                   },

           ],
           buttons: [
               { extend: 'excel', title: 'Listado de Clientes', exportOptions: { columns: [ 1, 2, 3 ,4,5,6,7,9 ] } },
               { extend: 'pdf', title: 'Listado de Clientes', exportOptions: { columns: [ 1, 2, 3 ,4,5,6,7,9] } }

           ]

       });
}

function btnAgregarCliente_onclick(obj, event) {


    var url = UrlHelper.Action("AgregarClienteModal", "Mantenimiento", "Mantenimiento")


  //  var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        inicializandoEventosModalDocumentos();


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
           $("#modalcontainer").modal("hide");
           oClientesTable.draw();
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
function inicializandoModalDireccion(id)
{

    $.jgrid.defaults.height = 420;
    $.jgrid.defaults.width = 520;
    $.jgrid.defaults.responsive = true;


    var grilla = $("#griddirecciones");
    var pagergrilla = $("#griddirecionespager");

    var vdataurl = $(grilla).data("dataurl")  + "?idcliente=" + id ;
    var vdataedit = $(grilla).data("editurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        colNames: ['', 'Cod.','Dirección','Departamento', 'Provincias','Distrito','Acciones'],
        colModel:
        [
            { key: true, hidden: true, name: 'iddireccion', index: 'iddireccion' ,classes:"grid-col"},
            { key: false, hidden: false, editable: true, name: 'codigo', index: 'codigo' , width: '40',classes:"grid-col" ,
            editoptions : {
               aftersavefunc: function (id) {  },
                keys: true,
              }
            },
            { key: false, hidden: false, editrules: {required: true} , editable: true ,name: 'direccion', index: 'direccion', width: '200', align: 'center',classes:"grid-col" },
            { key: false, hidden: false, editrules: {required: true} ,editable: true ,name: 'departamento'
                    , index: 'departamento', width: '160', align: 'center'
                    , classes:"grid-col",formatter: formatedit
                    , edittype: "select"
                    , editoptions: {
                                  dataUrl: fcnUrlControlGrid_Direccion('departamento'),
                                  dataInit: function (elem, i) {
                                          var v = $(elem).val();
                                          $(grilla).setColProp('provincia', {
                                             editoptions:
                                             {

                                                 dataUrl: fcnUrlControlGrid_Direccion('provincia' , i.rowId)
                                             }
                                           });
                                          //$(grilla).setColProp('direccion', { editoptions: { dataUrl: fcnUrlControlGrid('s') }});
                                        },
                                         dataEvents: [
                                         {
                                              type: 'change',
                                              fn: function(e) {
                                               var v = parseInt($(e.target).val(), 10);
                                               resetProviciasValues();
                                               var iddepartamento = v;
                                                var url = UrlHelper.Action("ListarProvincias", "Seguimiento", "Seguimiento");
                                                $.ajax(
                                                   {
                                                     type: "POST",
                                                     async: true,
                                                     url: url ,
                                                     data: { "iddepartamento": iddepartamento },
                                                     success: function (data) {

                                                      var row = $(e.target).closest('tr.jqgrow');
                                                      var rowId = row.attr('id');

                                                      var $select = $("select#" + rowId + "_provincia", row[0]);
                                                      $select.empty();
                                                      $select.append('<option value="">[Provincia]</option>');
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



                                              }
                                          }
                ]
              }
            },
            { key: false, hidden: false, editrules: {required: true} ,editable: true ,name: 'provincia'
                    , index: 'provincia', width: '160', align: 'center'
                    , classes:"grid-col",formatter: formatedit
                    , edittype: "select"
                    , editoptions: {
                                  dataUrl: fcnUrlControlGrid_Direccion('provincia'),
                                  dataInit: function (elem, i) {
                                          var v = $(elem).val();
                                          $(grilla).setColProp('distrito', {
                                            editoptions:
                                            {

                                                dataUrl: fcnUrlControlGrid_Direccion('distrito' , i.rowId)
                                            }
                                          });
                                          //$(grilla).setColProp('direccion', { editoptions: { dataUrl: fcnUrlControlGrid('s') }});
                                        },
                                         dataEvents: [
                                         {
                                              type: 'change',
                                              fn: function(e) {
                                               var v = parseInt($(e.target).val(), 10);
                                               resetProviciasValues();
                                               var idprovincia = v;
                                                var url = UrlHelper.Action("ListarDistritos", "Seguimiento", "Seguimiento");
                                                $.ajax(
                                                   {
                                                     type: "POST",
                                                     async: true,
                                                     url: url ,
                                                     data: { "idprovincia": idprovincia },
                                                     success: function (data) {

                                                      var row = $(e.target).closest('tr.jqgrow');
                                                      var rowId = row.attr('id');

                                                      var $select = $("select#" + rowId + "_distrito", row[0]);
                                                      $select.empty();
                                                      $select.append('<option value="">[Distrito]</option>');
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



                                              }
                                          }
                ]
              }
            },
            { key: false, hidden: false, editrules: {required: true} ,editable: true ,name: 'distrito'
                    , index: 'distrito', width: '160', align: 'center'
                    , classes:"grid-col",formatter: formatedit
                    , edittype: "select"
                    , editoptions: { dataUrl: fcnUrlControlGrid_Direccion('distrito', '')}
            },

         { key: false, hidden: false, editable: false ,name: 'iddireccion', width:'120' , index: 'iddireccion' ,  formatter:  displayButtonsDirecciones,classes:"grid-col"}
        ],
        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        emptyrecords: 'No se encontraron registros',
        autowidth: true,
        viewrecords: true,
        autoheight: true,
        editable:true,
      // addedrow: "last",
        addParams: {
            position: "last",
            addRowParams: editOptionsNew
            },
        editParams: editOptionsNew,
        editurl: vdataedit,

         onSelectRow: function (rowid, status) {
            //updateIdsOfSelectedRows(rowid, status);


        },

        afterInsertRow: function(id, currentData, jsondata) {

        },
        beforeInsertRow: function(id, currentData, jsondata) {


        },
         beforeSubmit: function () {

          },
         afterSubmit: function(response,postdata){

               if(response.responseText=="ok")
                    success=true;
                else success = false;

                return [success,response.responseText]
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
        afterSubmit: function(response,postdata){

               if(response.responseText=="ok")
                    success=true;
                else success = false;

                return [success,response.responseText]
    },



    });


}
function displayButtonsDirecciones(cellvalue, options, rowObject)
{

        var editar = "<button type='button' title='Editar' class='btn btn-danger btn-xs btn-outline' onclick=\"$('#griddirecciones').editRow('" + options.rowId  + "', successfuncdir)\";><i class='fa fa-edit'></i> </button>";
        var guardar = "<button type='button' title='Guardar' class='btn btn-danger btn-xs btn-outline' onclick=\"rowSave('" + options.rowId  + "', '' );\"><i class='fa fa-save'></i> </button>";
        var control = '<button type="button" class="btn btn-warning btn-xs btn-outline" onclick="irEliminarDireccion(' + cellvalue + ')"><i class="fa fa-trash"></i></button>';
        var restore = "<button type='button' title='Cancelar' class='btn btn-danger btn-xs btn-outline' onclick=\"$('#griddirecciones').restoreRow('" + options.rowId + "'); successfuncdir();\"><i class='fa fa-times-circle'></i> </button>";
                                                                                                                //$("#griddirecciones").jqGrid('saveRow',0,  {


        return editar + guardar + control + restore;
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

        ChangeComboDireccion();
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




function configurarGrilla(id) {



    $.jgrid.defaults.height = 100;
    $.jgrid.defaults.responsive = true;

    var grilla = $("#gridproveedores");
    var pagergrilla = $("#gridproveedorespager");



    var vdataurl = $(grilla).data("dataurl")  ;
    var vdataedit = $(grilla).data("editurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        colNames: ['', '','Proveedor','Acciones'],
        colModel:
        [
            { key: true, hidden: true, name: 'idproveedorcliente', index: 'idproveedorcliente' ,classes:"grid-col"},
            { key: false, hidden: true,  editable: true, name: 'idcliente', index: 'idcliente' ,classes:"grid-col"},
            { key: false, hidden: false, editable: true ,name: 'razonsocial', index: 'razonsocial', width: '100', align: 'center',classes:"grid-col",formatter: formatedit, edittype: "select", editoptions: { dataUrl: fcnUrlControlGrid('razonsocial') }, classes: "grid-col" },
            { key: false, hidden: false, editable: false ,name: 'idproveedorcliente', width:'20' , index: 'idproveedorcliente' ,  formatter:  displayButtons,classes:"grid-col"}
        ],
        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        emptyrecords: 'No se encontraron registros',
        autowidth: true,
        viewrecords: true,
        autoheight: true,
        editable:true,
//        addedrow: "last",
        addParams: {
            position: "last",
            addRowParams: editOptionsNew
            },
        editParams: editOptionsNew,
        editurl: vdataedit,

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

        var guardar = "<button type='button' title='Guardar' class='btn btn-primary btn-xs btn-outline' onclick=\"$('#gridproveedores').saveRow('" + options.rowId + "', successfunc)\";><i class='fa fa-save'></i> </button>";
        var control = "<button type='button' title='Eliminar' class='btn btn-primary btn-xs btn-outline' onclick='irEliminar(" + cellvalue + ")''><i class='fa fa-trash'></i></button>";
        var restore = "<button type='button' title='Cancelar' class='btn btn-primary btn-xs btn-outline' onclick=\"$('#gridproveedores').restoreRow('" + options.rowId + "'); mostrarproveedores('" + $("#txtidcliente").val() + "'); \"><i class='fa fa-times-circle'></i> </button>";

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
   var url = UrlHelper.Action("EliminarProveedor", "Seguimiento", "Seguimiento");
    swal({
        title: "Eliminar Proveedor Autorizado",
        text: "¿Está seguro que desea eliminar esta Proveedor Autorizado?",
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
                          var vdataurl =  UrlHelper.Action("JsonGetListarProveedorxCliente", "Seguimiento", "Seguimiento") + "?idcliente=" + id;
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
