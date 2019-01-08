var oSolicitudesTable;

$(document).ready(function () {


    $("#btnBuscar").button()
                   .click(function (e)
                   {
                       oSolicitudesTable.draw();
                   });

    CargaListaSolicitudesNCR();
});

function CargaListaSolicitudesNCR()
{
    oSolicitudesTable =
       $('.dataTables-tblSolicitudes').DataTable({
           "scrollX": true,
           "scrollY": "50vh",
           dom: '<"html5buttons"B>lTfgitp',
           "processing": true,
           "serverSide": true,
           "stateSave" : true,
           "iDisplayLength": 25,
           "ajax":
               {
               "url": $('#tblSolicitudes').data("url"),
               "data": function ( d ) {
                   d.tienda = $('#tienda').val();
                   d.documento = $('#documento').val();
                   d.estado = $('#estado').val();
                   d.clasificacion = $('#clasificacion_taller').val();
               },
               "type": "POST",
               "datatype": "json",
           },
           "columns": [
                   { "key": true, "title": "Id", "data": "cp_int_id", "name": "cp_int_id", visible: true, "autoWidth": true, "class": "text-center" },
                   { "title": "Tienda", "data": "cp_str_tienda", "name": "cp_str_tienda", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "N° de Orden", "data": "documento", "name": "documento", "autoWidth": true, "class": "text-center",
                       "mRender":
                        function (data, type, full)
                        {
                            return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                        }
                   },
                   { "title": "Motivo", "data": "cp_str_motivo", "name": "cp_str_motivo", "autoWidth": true, "class": "text-center" },
                   { "title": "Código", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true, "class": "text-center" },
                   { "title": "Descripción", "data": "pro_str_descripcion", "name": "pro_str_descripcion", "autoWidth": true, "class": "text-center" },
                   { "title": "Aprobador", "data": "usuario_aprobacion", "name": "usuario_aprobacion", "autoWidth": true, "class": "text-center" },
                   { "title": "Aprobación", "data": "cp_dat_fechaprobacion", "name": "cp_dat_fechaprobacion", "autoWidth": true, "class": "text-center" },
                   {
                      "title": "Nota de Crédito", "data": "cp_str_notacredito", "name": "cp_str_notacredito", "autoWidth": true, "class": "text-center",
                      "mRender":
                      function (data, type, full)
                      {
                          if (data == "")
                          {
                              return data;
                          }
                          else
                          {
                              return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                          }
                      }
                   },
                   {
                       "title": "N° Guia ", "data": "gui_str_numero", "name": "gui_str_numero", "autoWidth": true, "class": "text-center",
                       "mRender":
                       function (data, type, full) {
                           if (data == "") {
                               return data;
                           }
                           else {
                               return "<span class='label label-warning'>" + " " + data + " " + "</span>";
                           }
                       }

                   },
                   { "title": "Usuario NCR", "data": "usuario_generacion", "name": "usuario_generacion", "autoWidth": true, "class": "text-center" },
                   { "title": "Fecha", "data": "cp_dat_fechgeneracion", "name": "cp_dat_fechgeneracion", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Estado", "data": "estado", "name": "estado", "autoWidth": true, "class": "text-center",
                        "mRender":
                         function (data, type, full) {
                             return "<span class='label " +  full.label_estado + "'>" + " " + data + " " + "</span>";
                         }
                   },
                   {
                       "title": "Acciones", "class": "text-center", "data": "cp_int_id", "sWidth": "15%", "mRender":

                        function (data, type, full)
                        {
                            if (full.cp_bit_aprobado == true ||  full.cp_bit_anulado == true)
                            {
                                return "<span class='label'> SIN ACCIONES</span>";
                            }
                            else if (full.estado == "Rechazada")
                            {
                                return "<span class='label'> SIN ACCIONES</span>";
                            }
                            else
                            {
                                return "<div><button type='button' data-toggle='tooltip' data-placement='top' class='btn-primary btn btn-xs btn-outline ' onclick='Aprobar(" + data + ");' > <i class='fa fa-check-circle'></i> Aprobar </button><button type='button' data-toggle='tooltip' data-placement='top' class='btn-danger btn btn-xs btn-outline ' onclick='Rechazar(" + data + ");' > <i class='fa fa-times-circle'></i> Rechazar </button></div>";
                            }
                        }
                   },
           ],
           buttons: [
               { extend: 'copy' },
               { extend: 'csv' },
               { extend: 'excel', title: 'Solicitudes de Cambio de Mercadería'},
               { extend: 'pdf'  , title: 'Solicitudes de Cambio de Mercadería' },
               {
                   extend: 'print',
                   customize: function (win) {
                       $(win.document.body).addClass('white-bg');
                       $(win.document.body).css('font-size', '9px');

                       $(win.document.body).find('table')
                               .addClass('compact')
                               .css('font-size', 'inherit');
                   }
               }
           ]

       });
}

function Aprobar(solicitud)
{
    swal({
        title: "¿Desea aprobar la solicitud de cambio?",
        text: "Al aprobar la solicitud, la tienda podrá generar la nota de crédito.",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, aprobar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
  function (isConfirm)
  {
      if (isConfirm) {
          var url = $('#tblSolicitudes').data("urlapr") + "?solicitud=" + solicitud;
          $.ajax(
          {
              type: "POST",
              async: true,
              url: url,
              success: function (data)
              {
                  if (data.res == true)
                  {

                      swal({
                          title: "¡Aprobada!",
                          text: data.mensaje,
                          type: "success",
                          showCancelButton: false,
                          confirmButtonClass: "btn-danger",
                          confirmButtonText: "Aceptar",
                          cancelButtonText: "Cancelar",
                          closeOnConfirm: true,
                          closeOnCancel: true
                      },
                         function (isConfirm)
                         {
                             if (isConfirm)
                             {
                                 oSolicitudesTable.draw();
                             }
                         });
                  }
                  else
                  {
                      swal({ title: "¡Error!", text: data.mensaje, type: "error", confirmButtonText: "Aceptar" });
                  }

              },
              error: function (request, status, error)
              {
                  swal({ title: "¡Error!", text: "Ocurrió un error al aprobar la solicitud!", type: "error", confirmButtonText: "Aceptar" });
              }
          });
      }
  });
}

function Rechazar(solicitud)
{
    swal({
        title: "¿Desea rechazar la solicitud de cambio?",
        text: "Al rechazar la solicitud, la tienda no podrá generar la nota de crédito.",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, rechazar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
  function (isConfirm) {
      if (isConfirm) {
          var url = $('#tblSolicitudes').data("urlrec") + "?solicitud=" + solicitud;
          $.ajax(
          {
              type: "POST",
              async: true,
              url: url,
              success: function (data) {
                  if (data.res == true) {

                      swal({
                          title: "¡Rechazada!",
                          text: data.mensaje,
                          type: "success",
                          showCancelButton: false,
                          confirmButtonClass: "btn-danger",
                          confirmButtonText: "Aceptar",
                          cancelButtonText: "Cancelar",
                          closeOnConfirm: true,
                          closeOnCancel: true
                      },
                         function (isConfirm) {
                             if (isConfirm) {
                                 oSolicitudesTable.draw();
                             }
                         });
                  }
                  else {
                      swal({ title: "¡Error!", text: data.mensaje, type: "error", confirmButtonText: "Aceptar" });
                  }

              },
              error: function (request, status, error) {
                  swal({ title: "¡Error!", text: "Ocurrió un error al rechazar la solicitud!", type: "error", confirmButtonText: "Aceptar" });
              }
          });
      }
  });
}