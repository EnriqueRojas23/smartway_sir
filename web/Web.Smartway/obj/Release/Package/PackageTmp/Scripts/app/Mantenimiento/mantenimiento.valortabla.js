var btnNuevo = "#btnNuevo";

$(document).ready(function () {
 $(btnNuevo).click(function (event) { btnBuscarDocumento_onclick(this, event); });
 $("#btnBuscar").button()
                   .click(function (e) {
                       oDocumentosTable.draw();
                   });
    CargaListaEtapa();


 $("#valor").keypress(function (event) {
                if (event.which == 13) {
                    $("#btnBuscar").click();
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


function CargaListaEtapa() {

    oDocumentosTable =
       $('.dataTables-tblValorTabla').DataTable({
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
               "url": $('#tblValorTabla').data("url"),
               "data": function (d) {
                   d.valor = $('#valor').val();
                   d.idMaestroTabla = $('#idmaestrotabla').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   {
                       "key": true, "title": "Id", "data": "idvalortabla", "name": "idvalortabla", visible: false, "autoWidth": true, "class": "text-center",
                       "mRender":
                                  function (data, type, full) {
                                      return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                  }
                   },
                   { "title": "N°", "data": "idvalortabla", "name": "idvalortabla", "autoWidth": true, "class": "text-center" },
                   { "title": "Valor", "data": "valor", "name": "valor", "autoWidth": true, "class": "text-center" },
                  { "title": "Orden", "data": "orden", "name": "orden", "autoWidth": true, "class": "text-center" },
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
                       "title": "Acciones", "class": "text-center", "data": "idvalortabla", "Width": "15%", "mRender":

                        function (data, type, full) {
                            return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top'  class='btn-primary btn btn-xs btn-outline' onclick='editarvalor(" + data + ");' href='#' > <i class='fa fa-edit'></i> Editar</button>"
                            + "<button type='button' data-toggle='tooltip' data-placement='top'  class='btn-danger btn btn-xs btn-outline' onclick='eliminarvalortabla(" + data + ");' href='#' > <i class='fa fa-trash'></i> Eliminar</button></div>";

                        }
                   },

           ],
           buttons: [
               { extend: 'excel', title: 'Listado de Códigos', exportOptions: { columns: [ 1, 2, 3 ,5 ] } },
               { extend: 'pdf', title: 'Listado de Códigos', exportOptions: { columns: [ 1, 2, 3 ,5 ] } }

           ]

       });
}

function btnBuscarDocumento_onclick(obj, event) {


    var url = UrlHelper.Action("AgregarValorTablaModal", "Mantenimiento", "Mantenimiento")


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
           //var vurl = $('#btnAsociar').data("urlbak");
           //window.location.href = vurl;
           oDocumentosTable.draw();
       });

    }
    else
    {
        sweetAlert("Verificar Errores", jsonres.msj, "error");
        $("#modalcontainer").modal("hide");
        oDocumentosTable.draw();
        CheckValidationErrorResponse(jsonres);
    }

}
function editarvalor(id)
{
    var url = UrlHelper.Action("EditarValorTablaModal", "Mantenimiento", "Mantenimiento") + "?id=" + id;

  //  var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        inicializandoEventosModalDocumentos(id);
    });
}
function inicializandoEventosModalDocumentos(id)
{
    $('#hdidmoneda').val(id);
}

function eliminarvalortabla(id)
{
    var vUrl = UrlHelper.Action("EliminarValorTabla", "Mantenimiento", "Mantenimiento") + "?id=" + id;
    swal({
        title: "Eliminar Valor",
        text: "¿Está seguro que desea eliminar este dato?",
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
                            oDocumentosTable.draw();

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
