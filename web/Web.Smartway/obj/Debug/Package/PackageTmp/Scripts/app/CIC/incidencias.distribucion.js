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
    CargaListaOGP();
});

function CargaListaOGP()
{
    oDocumentosTable =
       $('.dataTables-tblProgramacion').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "processing": true,
           "serverSide": true,
           "ajax": {
               "url": $('#tblProgramacion').data("url"),
               "data": function ( d ) {
                   d.destino = $('#destino').val();
                   d.transporte = $('#transporte').val();
                   d.FechaInicio = $('#FechaInicio').val();
                   d.FechaFin = $('#FechaFin').val();
                   d.estado = $('#estado').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   { "key": true, "title": "Id", "data": "prog_int_id", "name": "prog_int_id", "autoWidth": true, "class": "text-center" ,
                     "mRender":
                                function (data, type, full) {
                                    return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                }

                   },
                   { "title": "Destino", "data": "dest_int_descripcion", "name": "dest_int_descripcion", "autoWidth": true, "class": "text-center" },
                   { "title": "Transporte", "data": "trans_str_descripcion", "name": "trans_str_descripcion", "autoWidth": true, "class": "text-center" },
                   { "title": "Recojo Programado", "data": "prog_dat_fechrecojo", "name": "prog_dat_fechrecojo", "autoWidth": true, "class": "text-center" },
                   //{ "title": "Fecha Final Recojo", "data": "prog_dat_fechfinalrecojo", "name": "prog_dat_fechfinalrecojo", "autoWidth": true, "class": "text-center" },
                   { "title": "Estado", "data": "est_str_descripcion", "name": "est_str_descripcion", "sWidth": "15%","class": "text-center" ,
                     "mRender":
                                    function (data, type, full)
                                    {
                                        var estado = data;
                                        return "<span class='label label-" + full.label_estado + "'>" + " " + estado + " " + "</span>";
                                    }
                   },
                   { "title": "Fecha Creación", "data": "prog_dat_fechcreacion", "name": "prog_dat_fechcreacion", "autoWidth": true, "class": "text-center" },
                   { "title": "Usuario", "data": "usuario", "name": "usuario", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Acciones", "class": "text-center", "data": "prog_int_id", "sWidth": "12%", "mRender":
                         function (data, type, full)
                         {
                             var id = data;
                             var confirmada = full.prog_bit_confirmada;

                             if (confirmada == true)
                             {
                                 return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Ver Detalle Programación' class='btn-primary btn btn-xs btn-outline ' onclick='VerDetalleProgramacion(" + id + ");return false;' href='#' > <i class='fa fa-search'></i> Ver</button><button type='button' data-toggle='tooltip' data-placement='top' title='Reporte Programación' class='btn-success btn btn-xs btn-outline ' onclick='ReporteDistribucionModal(" + id + ");return false;' href='#' > <i class='fa fa-file-pdf-o'></i> Reporte</button></div>"
                             }
                             else
                             {
                                 return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Ver Detalle Programación' class='btn-primary btn btn-xs btn-outline ' onclick='VerDetalleProgramacion(" + id + ");return false;' href='#' > <i class='fa fa-search'></i> </button><button type='button' data-toggle='tooltip' data-placement='top' title='Editar Programación' class='btn-success btn btn-xs btn-outline ' onclick='EditarDetalleProgramacion(" + id + ");return false;' href='#' > <i class='fa fa-edit'></i> </button><button type='button' data-toggle='tooltip' data-placement='top' title='Programar' class='btn-primary btn btn-xs btn-outline ' onclick='ConfirmarProgramacion(" + id + ");return false;' href='#' > <i class='fa fa-check-circle-o'></i> </button><button type='button' data-toggle='tooltip' data-placement='top' title='Eliminar Programación'  class='btn-danger btn btn-xs btn-outline' onclick='EliminarProgramacionModal(" + id + ")' > <i class='fa fa-trash'></i> </button></div>";
                             }
                         }
                   },
           ],
           buttons: [
               { extend: 'copy' },
               { extend: 'csv' },
               { extend: 'excel', title: 'Ordenes de Garantía'},
               { extend: 'pdf'  , title: 'Ordenes de Garantía'},
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

function EliminarProgramacionModal(id)
{
    var url = $('#tblProgramacion').data("urldel") + "?id=" + id;
    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
        CargaGuiasEliminarProgramacion();
    });
}

function ConfirmarProgramacion(id)
{
    var url = $('#tblProgramacion').data("urlcnf") + "?id=" + id;

    swal({
        title: "¿Está seguro de confirmar la Programación?",
        text: "Una vez confirmada no podra editar o eliminar la programación.",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, Confirmar",
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
                      swal("¡Confirmada!", "La Programación fue confirmada de forma correcta.", "success");
                      oDocumentosTable.draw();
                  }
                  else
                  {
                      swal({ title: "¡Error!", text: "Ocurrió un error al confirmar la Programación!", type: "error", confirmButtonText: "Aceptar" });
                  }

              },
              error: function (request, status, error) {
                  swal({ title: "¡Error!", text: "Ocurrió un error al confirmar la Programación!", type: "error", confirmButtonText: "Aceptar" });
              }
          });
      }
  });
}


function EliminarProgramacion()
{
    var motivo = $("#prog_str_moteliminacion").val();
    var FechaRecojo = $("#prog_dat_fechRecojo").val();

    if (motivo == "")
    {
        swal({ title: "¡Error!", text: "¡Ingresar el motivo!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else
    {
        swal({
            title: "¿Está seguro de eliminar la Programación?",
            text: "Se liberaran las guias asociadas.",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                var dataModelo = $("#FrmEliminarProgramacion").serialize();
                var url = $('#btnEliminarProgramacion').data("url")
                $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    data: dataModelo,
                    success: function (data) {
                        if (data.res == true) {
                            swal("¡Eliminado!", "La Programación fue eliminada de forma correcta.", "success");
                            $("#modalcontainerIncidencias").modal("hide");
                            oDocumentosTable.draw();
                        }
                        else {
                            swal({ title: "¡Error!", text: "Ocurrió un error al eliminar la Programación!", type: "error", confirmButtonText: "Aceptar" });
                        }

                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "Ocurrió un error al eliminar la Programación!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
            }
        });
    }
}

function CargaGuiasEliminarProgramacion()
{
    oDetalleProgramacionTable =
       $('.dataTables-tblEliminarProgramacion').DataTable({
           responsive: true,
           "processing": true,
           "serverSide": true,
           "iDisplayLength": 5,
           "ajax": {
               "url": $('#tblEliminarProgramacion').data("url"),
               "data": function (d) {
                   d.guia = "";
                   d.tienda = "";
                   d.FechaGuia ="";
                   d.programacion = $('#prog_int_iddel').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   { "title": "Id", "data": "guia_int_id", "name": "guia_int_id", "autoWidth": "true", visible:false,"class": "text-center" },
                   { "title": "Tienda", "data": "gui_str_tienda", "name": "gui_str_tienda", "autoWidth": "true" },
                   { "title": "Tipo Guia", "data": "tguia_str_codigoofisis", "name": "tguia_str_codigoofisis", "autoWidth": "true" },
                   //{ "title": "Operación", "data": "gui_str_codoperacion", "name": "gui_str_codoperacion", "autoWidth": "true" },
                   { "title": "Origen", "data": "gui_str_almacenorigen", "name": "gui_str_almacenorigen", "autoWidth": "true" },
                   { "title": "Destino", "data": "gui_str_almacendestino", "name": "gui_str_almacendestino", "autoWidth": "true" },
                   { "title": "N° Guia", "data": "gui_str_numero", "name": "gui_str_numero", "autoWidth": "true" },
                   { "title": "Fecha guia", "data": "gui_dat_fecha", "name": "gui_dat_fecha", "autoWidth": "true" },
           ],
           'order': [[1, 'asc']],
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

function EditarDetalleProgramacion(id) {
    var url = $('#tblProgramacion').data("urledt") + "?id=" + id;
    $.get(url, function (data) {
        $("#modalcontentIncidenciasL").html(data);
        $("#modalcontainerIncidenciasL").modal("show");
        CargaDetalleGuiasProgramacionEditar();
    });
}


function btnModalProgramarRecojo_onclick(obj, event) {

    var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontentIncidenciasL").html(data);
        $("#modalcontainerIncidenciasL").modal("show");
        CargaGuiasProgramacion();
    });
}

function CargaDetalleGuiasProgramacionEditar()
{
    $('#data_4 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#data_5 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    oDetalleProgramacionEditarTable =
       $('.dataTables-tblEditarDetalleProgramacion').DataTable({
           responsive: true,
           "processing": true,
           "searching": true,
           "paging": true,
           "serverSide": true,
           "iDisplayLength": 10,
           "ajax": {
               "url": $('#tblEditarDetalleProgramacion').data("url"),
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   { "title": "Id", "data": "guia_int_id", "name": "guia_int_id", "autoWidth": "true", visible: false, "class": "text-center" },
                   { "title": "Tipo", "data": "tipo_tienda", "name": "tipo_tienda", "autoWidth": "true", "class": "text-center" },
                   { "title": "Tienda", "data": "gui_str_tienda", "name": "gui_str_tienda", "autoWidth": "true", "class": "text-center" },
                   { "title": "Tipo", "data": "tdi_str_codigo", "name": "tdi_str_codigo", "autoWidth": "true", "class": "text-center" },
                   { "title": "Tipo Guia", "data": "tguia_str_codigoofisis", "name": "tguia_str_codigoofisis", "autoWidth": "true", "class": "text-center" },
                   { "title": "Origen", "data": "gui_str_almacenorigen", "name": "gui_str_almacenorigen", "autoWidth": "true", "class": "text-center" },
                   { "title": "Destino", "data": "gui_str_almacendestino", "name": "gui_str_almacendestino", "autoWidth": "true", "class": "text-center" },
                   { "title": "N° Guia", "data": "gui_str_numero", "name": "gui_str_numero", "autoWidth": "true", "class": "text-center" },
                   { "title": "Fecha guia", "data": "gui_dat_fecha", "name": "gui_dat_fecha", "autoWidth": "true", "class": "text-center" },
                    {
                        "title": "Tipo Transporte", "data": "tipo_transporte", "name": "tipo_transporte", "autoWidth": "true", "class": "text-center", "mRender":
                         function (data, type, full) {
                             return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                         }

                    },
                    {
                        "title": "Acciones", "class": "text-center", "data": "guia_int_id", "sWidth": "10%", "mRender":
                          function (data, type, full)
                          {
                              var id = data;
                              return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Eliminar Programación'  class='btn-danger btn btn-xs btn-outline' onclick='EliminarDetalleProgramacion(" + id + ")' > <i class='fa fa-trash'></i> Eliminar</button></div>";
                          }
                    },
           ],
           'order': [[1, 'asc']],
       });

    oDetalleGuiasDisponiblesTable = $('.dataTables-tblGuiasDisponibles').DataTable({
           responsive: true,
           "processing": true,
           "searching": true,
           "paging": true,
           "serverSide": true,
           "iDisplayLength": 10,
           "ajax": {
               "url": $('#tblGuiasDisponibles').data("url"),
               "data": function (d) {
                   d.guia = $('#txtNumGuia').val();
                   d.tienda = $('#ddlTiendaGuia').val();
                   d.FechaGuia = $('#txtFechaGuia').val()
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   { "title": "Id", "data": "guia_int_id", "name": "guia_int_id", "autoWidth": "true", visible: false, "class": "text-center" },
                   { "title": "Tipo", "data": "tipo_tienda", "name": "tipo_tienda", "autoWidth": "true", "class": "text-center" },
                   { "title": "Tienda", "data": "gui_str_tienda", "name": "gui_str_tienda", "autoWidth": "true", "class": "text-center" },
                   { "title": "Tipo", "data": "tdi_str_codigo", "name": "tdi_str_codigo", "autoWidth": "true", "class": "text-center" },
                   { "title": "Tipo Guia", "data": "tguia_str_codigoofisis", "name": "tguia_str_codigoofisis", "autoWidth": "true", "class": "text-center" },
                   { "title": "Origen", "data": "gui_str_almacenorigen", "name": "gui_str_almacenorigen", "autoWidth": "true", "class": "text-center" },
                   { "title": "Destino", "data": "gui_str_almacendestino", "name": "gui_str_almacendestino", "autoWidth": "true", "class": "text-center" },
                   { "title": "N° Guia", "data": "gui_str_numero", "name": "gui_str_numero", "autoWidth": "true", "class": "text-center" },
                   { "title": "Fecha guia", "data": "gui_dat_fecha", "name": "gui_dat_fecha", "autoWidth": "true", "class": "text-center" },
                    {
                        "title": "Tipo Transporte", "data": "tipo_transporte", "name": "tipo_transporte", "autoWidth": "true", "class": "text-center", "mRender":
                         function (data, type, full) {
                             return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                         }

                    },
                    {
                        "title": "Acciones", "class": "text-center", "data": "guia_int_id", "sWidth": "10%", "mRender":
                          function (data, type, full) {
                              var id = data;
                              return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Agregar'  class='btn-primary btn btn-xs btn-outline' onclick='AgregarGuiaProgramacion(" + id + ")' > <i class='fa fa-plus-square'></i> Agregar</button></div>";
                          }
                    },
           ],
           'order': [[1, 'asc']],
       });
     
}


function EliminarDetalleProgramacion(id)
{
    var url = $('#tblEditarDetalleProgramacion').data("urldel") + "?id=" + id;
    $.ajax(
            {
                type: "POST",
                async: true,
                url: url,
                success: function (data) {
                    if (data.res == true)
                    {
                        oDetalleProgramacionEditarTable.draw();
                    }
                    else {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar la guia!", type: "error", confirmButtonText: "Aceptar" });
                    }
                },
                error: function (request, status, error) {
                    swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar la guia!", type: "error", confirmButtonText: "Aceptar" });
                }
            });
}

function AgregarGuiaProgramacion(id)
{
    var url = $('#tblGuiasDisponibles').data("urladd") + "?id=" + id;
    $.ajax(
            {
                type: "POST",
                async: true,
                url: url,
                success: function (data)
                {
                    if (data.res == "OK")
                    {
                        oDetalleProgramacionEditarTable.draw();
                        oDetalleGuiasDisponiblesTable.draw();
                    }
                    else if (data.res == "DUP")
                    {
                        swal({ title: "¡Error!", text: "¡La guia seleccionada ya existe en la programación!", type: "error", confirmButtonText: "Aceptar" });
                    }
                    else
                    {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al agregar la guia!", type: "error", confirmButtonText: "Aceptar" });
                    }
                },
                error: function (request, status, error) {
                    swal({ title: "¡Error!", text: "¡Ocurrió un error al agregar la guia!", type: "error", confirmButtonText: "Aceptar" });
                }
            });
}



function CargaGuiasProgramacion()
{
    $('#data_4 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#data_5 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    oDetalleProgramacionTable =
       $('.dataTables-tblDetalleProgramacion').DataTable({
            responsive: true,
           "processing": true,
           "searching": true,
           "paging": true,
           "serverSide": true,
           "iDisplayLength": 10,
           "ajax": {
               "url": $('#tblDetalleProgramacion').data("url"),
               "data": function (d) {
                   d.guia = $('#txtNumGuia').val();
                   d.tienda = $('#ddlTiendaGuia').val();
                   d.FechaGuia = $('#txtFechaGuia').val();
                   d.programacion = $('#prog_int_id').val();
                },
               "type": "POST",
               "datatype": "json"
           },
           'columnDefs': [
             {   'targets': 0,
                 'checkboxes': { 'selectRow': true}
             }],
           "columns": [
                   { "key": true, "data": "guia_int_id","autoWidth": "true"},
                   { "title": "Id", "data": "guia_int_id", "name": "guia_int_id", "autoWidth": "true", visible: false, "class": "text-center" },
                   { "title": "Tipo", "data": "tipo_tienda", "name": "tipo_tienda", "autoWidth": "true", "class": "text-center" },
                   { "title": "Tienda", "data": "gui_str_tienda", "name": "gui_str_tienda", "autoWidth": "true", "class": "text-center" },
                   { "title": "Tipo", "data": "tdi_str_codigo", "name": "tdi_str_codigo", "autoWidth": "true", "class": "text-center" },
                   { "title": "Tipo Guia", "data": "tguia_str_codigoofisis", "name": "tguia_str_codigoofisis", "autoWidth": "true", "class": "text-center" },
                   {
                       "title": "N° Guia", "data": "gui_str_numero", "name": "gui_str_numero", "autoWidth": "true", "class": "text-center", "mRender":
                        function (data, type, full)
                        {
                            return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                        }

                   },
                   { "title": "Origen", "data": "gui_str_almacenorigen", "name": "gui_str_almacenorigen", "autoWidth": "true", "class": "text-center" },
                   { "title": "Destino", "data": "gui_str_almacendestino", "name": "gui_str_almacendestino", "autoWidth": "true", "class": "text-center" },
                   { "title": "Fecha guia", "data": "gui_dat_fecha", "name": "gui_dat_fecha", "autoWidth": "true", "class": "text-center" },
                   {
                        "title": "Tipo Transporte", "data": "tipo_transporte", "name": "tipo_transporte", "autoWidth": "true", "class": "text-center", "mRender":
                         function (data, type, full)
                         {
                             return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                         }

                   },
                   //{
                   //    "title": "Recojo Real", "data": "gui_dat_fecharecojoreal", "name": "gui_dat_fecharecojoreal", "autoWidth": "true", "class": "text-center",
                   //     "mRender":
                   //     function (data, type, full)
                   //     {
                   //         var estado = data;
                   //         return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                   //     }

                   //},
           ],
           'select': {'style': 'multi'},
           'order' : [[1, 'asc']],
       });
}

function BuscarGuiasProgramacion()
{
    oDetalleProgramacionTable.draw();
}

function BuscarGuiasDisponiblesProgramacion()
{
    oDetalleGuiasDisponiblesTable.draw();
}

function btnProgramarRecojoonclick()
{
    var destino = $("#dest_int_id").val();
    var transporte = $("#trans_int_id").val();
    var FechaRecojo = $("#prog_dat_fechRecojo").val();

    var dtFechaActual =  new Date();
    var fRecojo= ConvertirFecha(FechaRecojo);

    if (fRecojo < dtFechaActual)
    {
        swal({ title: "¡Error!", text: "¡La fecha de recojo  no puede ser menor a la fecha actual!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else if (destino == 0 || transporte == 0 || FechaRecojo == "")
    {
        swal({ title: "¡Error!", text: "¡Seleccionar destino, fecha de recojo y transporte!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else
    {
        var TotalDetalle = oDetalleProgramacionTable.data().count()

        var rows_selected = oDetalleProgramacionTable.column(0).checkboxes.selected();

        if (rows_selected.length ==  0)
        {
            swal({ title: "¡Error!", text: "¡Seleccionar por lo menos una guia!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
        }
        else
        {

            $.each(rows_selected, function (index, rowId) {
                $('#FrmProgramarRecojo').append(
                    $('<input>')
                       .attr('type', 'hidden')
                       .attr('name', 'GuiasProgramadas[]')
                       .val(rowId)
                );
            });

            swal({
                title: "Registrar Programación de Recojo",
                text: "¿Esta seguro de programar el recojo?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Registrar',
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function ()
            {
                var dataModelo = $("#FrmProgramarRecojo").serialize();
                var url = $('#btnProgramarRecojo').data("url")
                $.ajax(
                        {
                            type: "POST",
                            async: true,
                            url: url,
                            data: dataModelo,
                            success: function (data) {
                                if (data.res == true)
                                {
                                    var mensaje = "Se registró la programación de forma correcta.";
                                    swal("Correcto", mensaje, "success");
                                    $("#modalcontainerIncidenciasL").modal("hide");
                                    oDocumentosTable.draw();
                                }
                                else {
                                    swal({ title: "¡Error!", text: "¡Ocurrió un error al registrar la programación!", type: "error", confirmButtonText: "Aceptar" });
                                }
                            },
                            error: function (request, status, error) {
                                swal({ title: "¡Error!", text: "¡Ocurrió un error al registrar la programación!", type: "error", confirmButtonText: "Aceptar" });
                            }
                        });
            });
        }
    }
}


function btnGuardarCambiosclick()
{
    var destino = $("#dest_int_id").val();
    var transporte = $("#trans_int_id").val();
    var FechaRecojo = $("#prog_dat_fechRecojo").val();

    var dtFechaActual = new Date();
    var fRecojo = ConvertirFecha(FechaRecojo);

    if (fRecojo < dtFechaActual) {
        swal({ title: "¡Error!", text: "¡La fecha de recojo  no puede ser menor a la fecha actual!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else if (destino == 0 || transporte == 0 || FechaRecojo == "") {
        swal({ title: "¡Error!", text: "¡Seleccionar destino, fecha de recojo y transporte!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else
    {
        swal({
            title: "Editar Programación de Recojo",
            text: "¿Esta seguro de guardar los cambios en la programación?",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Guardar',
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function ()
        {
            var dataModelo = $("#FrmProgramarRecojo").serialize();
            var url = $('#btnGuardarCambios').data("url")
            $.ajax(
                    {
                        type: "POST",
                        async: true,
                        url: url,
                        data: dataModelo,
                        success: function (data)
                        {
                            if (data.res == true)
                            {
                                swal("Correcto", "Se guardaron los cambios de forma correcta.", "success");
                                $("#modalcontainerIncidenciasL").modal("hide");
                                oDocumentosTable.draw();
                            }
                            else
                            {
                                swal({ title: "¡Error!", text: "¡Ocurrió un error al guardar los cambios!", type: "error", confirmButtonText: "Aceptar" });
                            }
                        },
                        error: function (request, status, error) {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al guardar los cambios!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
        });
    }
}


function ConvertirFecha(fecha) {
    array_Fecha = fecha.split("/");

    var dia = array_Fecha[0];
    var mes = (array_Fecha[1] - 1)
    var ano = array_Fecha[2];
    var fechaReal = new Date(ano, mes, dia,24,0,0);
    return fechaReal;
}

function rellenar(quien, que) {
    if (que.length < 15) {
        cadcero = '';
        var guion = que.indexOf('-');
        var serie = "";
        var corre = "";

        if (guion == 4) {
            serie = que.substring(0, 4);
            corre = que.substring(5, que.length);
            for (i = 0; i < (10 - corre.length) ; i++) {
                cadcero += '0';
            }
            quien.value = serie + '-' + cadcero + corre;
        }
    }
}


function ReporteDistribucionModal(id)
{
    var url = $('#tblProgramacion').data("urlrep") + "?id=" + id;
    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
    });
}
