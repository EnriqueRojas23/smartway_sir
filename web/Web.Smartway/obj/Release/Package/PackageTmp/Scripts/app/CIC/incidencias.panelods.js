var oDocumentosTable;

$(document).ready(function () {


    $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $("#btnBuscar").button()
                   .click(function (e) {
                       oDocumentosTable.draw();
                   });

    CargaListaOrdenesServicioCliente();
});

function CargaListaOrdenesServicioCliente()
{
    oDocumentosTable =
       $('.dataTables-tblODS').DataTable({
           //responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "processing": true,
           "serverSide": true,
           "scrollY": "50vh",
           "scrollX": true,
           stateSave: true,
           "iDisplayLength": 25,
           "ajax": {
               "url": $('#tblODS').data("url"),
               "data": function ( d ) {
                   d.tienda = $('#tienda').val();
                   d.ods = $('#ods').val();
                   d.Fecha = $('#Fecha').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   {
                     "key": true, "title": "Id", "data": "dci_int_id", "name": "dci_int_id", visible:true, "autoWidth": true, "class": "text-center",
                     "mRender":
                                function (data, type, full)
                                {
                                    return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                }
                   },
                   {
                       "title": "N° de Orden", "data": "ods", "name": "ods", "autoWidth": true, "class": "text-center",
                       "mRender":
                                   function (data, type, full) {
                                       return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                   }
                   },
                   { "title": "Tienda", "data": "dci_str_tienda", "name": "dci_str_tienda", "autoWidth": true, "class": "text-center" },
                   { "title": "Fecha", "data": "dci_dat_fechcreacion", "name": "dci_dat_fechcreacion", "autoWidth": true, "class": "text-center" },
                   { "title": "Usuario", "data": "usuario", "name": "usuario", "autoWidth": true, "class": "text-center" },
                   { "title": "DNI/RUC", "data": "cli_str_documento", "name": "cli_str_documento", "autoWidth": true, },
                   { "title": "Cliente", "data": "cliente", "name": "cliente", "autoWidth": true, },
                   {
                       "title": "STC", "data": "stc", "name": "stc", "autoWidth": true, "class": "text-center",
                       "mRender":
                        function (data, type, full)
                        {
                            if (data == "SI")
                            {
                                return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                            }
                            else {
                                return "<span class='label label-warning'>" + " " + data + " " + "</span>";
                            }
                        }
                   },
                   { "title": "GR Salida", "data": "guia_salida", "name": "guia_salida", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Reingreso Tienda", "data": "devuelto", "name": "devuelto", "autoWidth": true, "class": "text-center",
                       "mRender":
                        function (data, type, full) {

                            if (data != "SI")
                            {
                                return "<span class='label label-danger'>" + " " + data + " " + "</span>";
                            }
                            else 
                            {
                                return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                            }
                        }
                   },
                   {
                       "title": "GR Reingreso ", "data": "guia_dev", "name": "guia_dev", "autoWidth": true, "class": "text-center",
                       "mRender":
                        function (data, type, full)
                        {
                            if (data == "NO")
                            {
                                return "<span class='label label-danger'>" + " " + data + " " + "</span>";
                            }
                            else
                            {
                                return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                            }
                        }
                   },
                   {
                       "title": "Acciones", "class": "text-center", "data": "inc_int_id", "sWidth": "15%", "mRender":

                        function (data, type, full)
                        {
                            var docdevuelto = full.devuelto;
                            var iddocumento = full.dci_int_id;

                            if (docdevuelto == 'SI')
                            {
                                if (full.dci_bit_entregacliente == true)
                                {
                                    return "<div><button type='button' data-toggle='tooltip' data-placement='top' class='btn-success btn btn-xs btn-outline ' onclick='DetalleCompleto(" + data + ");return false;' href='#' > <i class='fa fa-search'></i> Detalle </button><button type='button' data-toggle='tooltip' data-placement='top' class='btn-success btn btn-xs btn-outline ' onclick='ImprimirTicketConformidad(" + iddocumento + ");return false;' href='#' > <i class='fa fa-print'></i> Ticket </button><button type='button' data-toggle='tooltip' title='Seguimiento 'data-placement='top' class='btn-primary btn btn-xs btn-outline ' onclick='MostrarSeguimiento(" + iddocumento + ");'> <i class='fa fa-history'></i> </button></button><button type='button' data-toggle='tooltip' title='Imprimir ODS' data-placement='top' class='btn-primary btn btn-xs btn-outline ' onclick='ImprimirODS(" + full.inc_int_id + ");'> <i class='fa fa-print'></i> </button></div>";
                                }
                                else
                                {
                                    return "<div><button type='button' data-toggle='tooltip' data-placement='top' class='btn-success btn btn-xs btn-outline ' onclick='DetalleCompleto(" + data + ");return false;' href='#' > <i class='fa fa-search'></i> Detalle </button><button type='button' data-toggle='tooltip' data-placement='top' class='btn-danger btn btn-xs btn-outline ' onclick='ConfirmarEntregaCliente(" + iddocumento + ");' > <i class='fa fa-user'></i> Entregar </button><button type='button' data-toggle='tooltip' title='Seguimiento 'data-placement='top' class='btn-primary btn btn-xs btn-outline ' onclick='MostrarSeguimiento(" + iddocumento + ");'> <i class='fa fa-history'></i> </button></button><button type='button' data-toggle='tooltip' title='Imprimir ODS' data-placement='top' class='btn-primary btn btn-xs btn-outline ' onclick='ImprimirODS(" + full.inc_int_id + ");'> <i class='fa fa-print'></i> </button></div>";
                                }
                            }
                            else
                            {
                                return "<div><button type='button' data-toggle='tooltip' data-placement='top' class='btn-success btn btn-xs btn-outline ' onclick='DetalleCompleto(" + data + ");'> <i class='fa fa-search'></i> Detalle </button><button type='button' data-toggle='tooltip' title='Seguimiento 'data-placement='top' class='btn-primary btn btn-xs btn-outline ' onclick='MostrarSeguimiento(" + iddocumento + ");'> <i class='fa fa-history'></i> </button></button><button type='button' data-toggle='tooltip' title='Imprimir ODS 'data-placement='top' class='btn-primary btn btn-xs btn-outline ' onclick='ImprimirODS(" + full.inc_int_id + ");'> <i class='fa fa-print'></i> </button></div>";
                            }
                        }
                   },
           ],
           buttons: [
               { extend: 'copy' },
               { extend: 'csv' },
               { extend: 'excel', title: 'Ordenes de Servicio Cliente'},
               { extend: 'pdf',   title: 'Ordenes de Servicio Cliente' },
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

function DetalleCompleto(incidencia)
{
    var vUrl = $('#tblODS').data("urldtl") + "?incidencia=" + incidencia;
    $(window).attr("location", vUrl);
}



function ConvertirFecha(fecha) {
    array_Fecha = fecha.split("/");

    var dia = array_Fecha[0];
    var mes = (array_Fecha[1] - 1)
    var ano = array_Fecha[2];
    var fechaReal = new Date(ano, mes, dia);
    return fechaReal;
}

function ConfirmarEntregaCliente(ods)
{
    swal({
        title: "¿Desea confirmar la entrega al cliente?",
        text: "Al confirmar la entrega, se generará una guia de salida del producto.",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, confirmar la entrega",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
  function (isConfirm) {
      if (isConfirm)
      {
          var url = $('#tblODS').data("urlcnf") + "?ods=" + ods;

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
                          title: "¡Entregada!",
                          text: "Se confirmó la entrega al cliente de forma correcta y se generó  la guia de salida : " + data.guiaingreso + ", ya puede imprimir el ticket de conformidad",
                          type: "success",
                          showCancelButton: false,
                          confirmButtonClass: "btn-danger",
                          confirmButtonText: "Aceptar",
                          cancelButtonText: "Cancelar",
                          closeOnConfirm: true,
                          closeOnCancel: true
                      },
                         function (isConfirm) {
                             if (isConfirm)
                             {
                                 ImprimirTicketConformidad(ods);
                                 //oDocumentosTable.draw();
                             }
                         });
                  }
                  else
                  {
                      swal({ title: "¡Error!", text: data.mensaje , type: "error", confirmButtonText: "Aceptar" });
                  }

              },
              error: function (request, status, error)
              {
                  swal({ title: "¡Error!", text: "Ocurrió un error al confirmar la entrega al cliente!", type: "error", confirmButtonText: "Aceptar" });
              }
          });
      }
  });
}


function MostrarSeguimiento(documento)
{

    var url = $('#tblODS').data("urlseg") + "?documento=" + documento;
    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
    });
}

function ImprimirTicketConformidad(ods)
{
    var url = $('#tblODS').data("urltck") + "?ods=" + ods;
    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
    });
}

function ImprimirODS(incidencia)
{
    var url = $('#tblODS').data("urlimp") + "?incidencia=" + incidencia;

    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
    });
}