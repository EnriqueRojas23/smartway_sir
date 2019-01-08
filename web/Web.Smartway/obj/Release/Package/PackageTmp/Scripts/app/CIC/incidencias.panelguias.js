var oDocumentosTable;
var oDetalleProgramacionTable;
var oDetalleProgramacionEditarTable;
var oDetalleGuiasDisponiblesTable;

var btnModalProgramarRecojo = "#btnModalProgramarRecojo";

$(document).ready(function () {

    $(btnModalProgramarRecojo).click(function (event) { btnModalProgramarRecojo_onclick(this, event); });

    $('#data_1 .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#data_2 .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $("#btnBuscar").button()
                   .click(function (e) {
                       oDocumentosTable.draw();
                   });

    CargaListaGuiasProgramadas();
});

function CargaListaGuiasProgramadas()
{
    oDocumentosTable =
       $('.dataTables-tblGuiasProgramadas').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "iDisplayLength": 100,
           "processing": true,
           "order": [[0, "desc"]],
           "serverSide": true,
           "ajax": {
               "url": $('#tblGuiasProgramadas').data("url"),
               "data": function ( d ) {
                   d.tienda = $('#tienda').val();
                   d.guia = $('#guia').val();
                   d.destino = $('#destino').val();
                   d.FechaInicio = $('#FechaInicio').val();
                   d.FechaFin = $('#FechaFin').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   {
                       "key": true, "title": "Id", "data": "guia_int_id", "name": "guia_int_id", "autoWidth": true, "class": "text-center",
                     "mRender":
                                function (data, type, full)
                                {
                                    return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                }
                   },
                   { "title": "Tienda", "data": "gui_str_tienda", "name": "gui_str_tienda", "autoWidth": true, "class": "text-center" },
                   { "title": "Tipo", "data": "gui_str_coddocumento", "name": "gui_str_coddocumento", "autoWidth": true, "class": "text-center" },
                   { "title": "Fecha Guia", "data": "gui_dat_fecha", "name": "gui_dat_fecha", "autoWidth": true, "class": "text-center" },
                   { "title": "N° Guia", "data": "gui_str_numero", "name": "gui_str_numero", "autoWidth": true, "class": "text-center" },
                   { "title": "Origen", "data": "gui_str_almacenorigen", "name": "gui_str_almacenorigen", "autoWidth": true, "class": "text-center" },
                   { "title": "Destino", "data": "gui_str_almacendestino", "name": "gui_str_almacendestino", "autoWidth": true, "class": "text-center" },
                   { "title": "Fecha Recojo", "data": "prog_dat_fechrecojo", "name": "prog_dat_fechrecojo", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Estado Guia", "data": "estado_guia", "name": "estado_guia", "sWidth": "15%", "class": "text-center",
                     "mRender":
                                    function (data, type, full)
                                    {
                                        var estado = data;
                                        return "<span class='label label-primary'>" + " " + estado + " " + "</span>";
                                    }
                   },
                   {
                       "title": "Programación", "class": "text-center", "data": "guia_int_id", "sWidth": "15%", "mRender":

                        function (data, type, full)
                        {
                            var estado_prog = full.estado_programacion;
                            var estado_guia = full.estado_guia;
                            var id = data;
                            if (estado_prog == "Programada")
                            {
                                if (estado_guia == "Recojo Programado")
                                {
                                    return "<span class='label label-warning'>" + " " + estado_prog + " " + "</span>";
                                }
                                else
                                {
                                    return "<span class='label label-primary'>" + " " + estado_prog + " " + "</span>";
                                  
                                }
                            }
                            else
                            {
                                if (estado_prog == null)
                                {
                                    return "<span class='label label-danger'> Programación Pendiente</span>";
                                }
                                else
                                {
                                    return "<span class='label label-primary'>" + " " + estado_prog + " " + "</span>";
                                }
                            }
                        }
                   },
           ],
           buttons: [
               { extend: 'copy' },
               { extend: 'csv' },
               { extend: 'excel', title: 'Guias Programadas'},
               { extend: 'pdf', title: 'Guias Programadas' },
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



function ConfirmarEntrega(id)
{
    var url = $('#tblGuiasProgramadas').data("urlcnf") + "?id=" + id;

    swal({
        title: "¿Está seguro de confirmar la entrega de la guia?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, Confirmar Entrega",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
  function (isConfirm)
  {
      if (isConfirm) {

          $.ajax(
          {
              type: "POST",
              async: true,
              url: url,
              success: function (data) {
                  if (data.res == true)
                  {
                      swal("¡Confirmada!", "La entrega fue confirmada de forma correcta.", "success");
                      oDocumentosTable.draw();
                  }
                  else
                  {
                      swal({ title: "¡Error!", text: "Ocurrió un error al confirmar la entrega!", type: "error", confirmButtonText: "Aceptar" });
                  }

              },
              error: function (request, status, error) {
                  swal({ title: "¡Error!", text: "Ocurrió un error al confirmar la entrega!", type: "error", confirmButtonText: "Aceptar" });
              }
          });
      }
  });
}


function VerDetalleProgramacion(id)
{
    var url = $('#tblProgramacion').data("urldtl") + "?id=" + id;
    $.get(url, function (data) {
        $("#modalcontentIncidenciasL").html(data);
        $("#modalcontainerIncidenciasL").modal("show");
        CargaGuiasProgramacion();
    });
}

function ConvertirFecha(fecha) {
    array_Fecha = fecha.split("/");

    var dia = array_Fecha[0];
    var mes = (array_Fecha[1] - 1)
    var ano = array_Fecha[2];
    var fechaReal = new Date(ano, mes, dia);
    return fechaReal;
}