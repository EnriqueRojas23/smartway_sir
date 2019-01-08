var incidencia = $('#inc_int_id').val();
var oPropuestasTable;
var oSolicitudesTable;
var oDocumentosInternosTable;

$(document).ready(function () {

    mostrarMensajeResultado();

    oPropuestasTable = $('.dataTables-Propuestas').DataTable({
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',

        "serverSide": true,
        "ajax": {
            "url": $('#tblPropuestas').data("url") + "?incidencia=" + incidencia,
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "key": true, "title": "ID", "data": "inp_int_id", "name": "inp_int_id", "autoWidth": true, "class": "text-center" },
                { "title": "Propuesta", "data": "prop_str_descripcion", "name": "prop_str_descripcion", "autoWidth": true },
                { "title": "Observación", "data": "prop_str_observacion", "name": "prop_str_observacion", "autoWidth": true },
                { "title": "Estado", "class": "text-center", "data": "prop_str_estado", "name": "prop_str_estado", "autoWidth": true, "mRender":
                        function (data, type, full)
                        {
                            var estado = data;
                            return "<span class='label label-" + full.label_estado + "'><i class='fa " + full.imagen_estado + "' ></i>" + " " + estado + " " + "</span>";
                        }
                },
                {
                    "title": "Generar ODR", "class": "text-center", "data": "odr", "mRender":
                         function (data, type, full)
                         {
                             var odr = data;
                             var id = full.inp_int_id;
                             var estado = full.prop_str_estado;

                             if (estado == "Aceptada")
                             {
                                 if (odr == true)
                                 {
                                     //return "<span> ODR Generada <i class='fa fa-check text-navy'></i></span>"
                                     if (estado == "Rechazada")
                                     {
                                         return "<span class='label label-danger'>" + "Autorización Rechazada" + "</span>";
                                     }
                                     else if (estado == "Aceptada")
                                     {
                                         return "<span class='label label-primary'>" + "Autorización Aceptada" + "</span>";
                                     }
                                     else
                                     {
                                         return "<span class='label label-warning'>" + "Autorización Pendiente" + "</span>";
                                     }
                                 }
                                 else
                                 {
                                     return "<div class='btn-group'><button  type='button' class='btn-warning btn btn-xs btn-outline'  id='btnGenerarODR' onClick='GenerarODR(" + id + "," + incidencia + ")' > Generar ODR <i class='fa fa-gear fa-spin'></i></button></div>"
                                 } 
                             }
                             else if (estado == "Rechazada")
                             {
                                 return "<span class='label label-danger'>" + "Autorización Rechazada" + "</span>";
                             }
                             else
                             {
                                 return "<span class='label label-warning'>" + "Autorización Pendiente" + "</span>";
                             }
                         }
                },
                { "title": "Solicitud", "class": "text-center", "data": "solicitud", "mRender":
                      function (data, type, full)
                      {
                          var solicitud = data;
                          var id = full.inp_int_id;
                          if (solicitud == true)
                          {
                              return "<a><i class='fa fa-check text-navy'></i></a>"
                          }
                          else
                          {
                              return "<div class='btn-group'><button  type='button' class='btn-success btn btn-xs btn-outline'  id='lnkSolicitar' onClick='EnviarSolicitud(" + id + "," + incidencia + ")' > Enviar Solicitud  <i class='fa fa-envelope'></i></button></div>"
                          }
                      }
                }
               
        ],
        buttons: [
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'Propuestas Incidencia' },
            { extend: 'pdf',   title: 'Propuestas Incidencia' },
            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                }
            }
        ]

    });

    $("#btnActualizarPropuestas").button()
                  .click(function (e) {
                      oPropuestasTable.draw();
                      oSolicitudesTable.draw();
                      oDocumentosInternosTable.draw();
                  });

    oSolicitudesTable = $('.dataTables-Solicitudes').DataTable({
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',

        "serverSide": true,
        "responsive": true,
        "ajax": {
            "url": $('#tblSolicitudes').data("url") + "?incidencia=" + incidencia,
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "key": true, "title": "ID", "data": "sol_int_id", "name": "sol_int_id", "autoWidth": true, "class": "text-center" },
                { "title": "Motivo", "data": "motivo", "name": "motivo", "autoWidth": true },
                { "title": "Observación", "data": "sol_str_observacion", "name": "sol_str_observacion", "autoWidth": true },
                { "title": "Para", "data": "autorizador", "name": "autorizador", "autoWidth": true },
                { "title": "Fecha Envío", "data": "sol_dat_fechenvio", "name": "sol_dat_fechenvio", "autoWidth": true },
                { "title": "Fecha Respuesta", "data": "sol_dat_fechrespuesta", "name": "sol_dat_fechrespuesta", "autoWidth": true },
                {
                    "title": "Estado", "data": "sol_str_estado", "name": "sol_str_estado", "autoWidth": true, "class": "text-center", "mRender":
                            function (data, type, full) {
                                var estado = data;
                                return "<span class='label label-" + full.label_estado + "'><i class='fa " + full.imagen_estado + "' ></i>" + " " + estado + " " + "</span>";
                            }
                },
                 {
                     "title": "Propuesta", "class": "text-center", "data": "prop_str_estado", "name": "prop_str_estado", "autoWidth": true, "mRender":
                          function (data, type, full) {
                              var estado = data;
                              return "<span class='label label-" + full.label_estado_prop + "'><i class='fa " + full.imagen_estado_prop + "' ></i>" + " " + estado + " " + "</span>";
                          }
                 },
                { "title": "Motivo", "data": "sol_str_motrespuesta", "name": "sol_str_motrespuesta", "autoWidth": true },
                { "title": "Observación", "data": "sol_str_obsrespuesta", "name": "sol_str_obsrespuesta", "autoWidth": true },
              
        ],
        buttons: [
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'Solicitudes Incidencia' },
            { extend: 'pdf', title: 'Solicitudes Incidencia' },
            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                }
            }
        ]

    });

   $(function () {
       $('#frmPropuesta').submit(function (event) {
            event.preventDefault();

            var idPropuesta = $("#prop_in_id").val();

            if (idPropuesta == "") {

                swal({ title: "¡Error!", text: "¡Seleccionar una propuesta!", type: "error", confirmButtonText: "Aceptar" });
            }
            else {

                swal({
                    title: "Registro de Propuesta",
                    text: "¿Está seguro de registrar la propuesta?",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Registrar',
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function () {
                    showLoading();
                    //$('#frmPropuesta').submit();
                    $('#frmPropuesta').unbind('submit').submit()
                });
            }
            
        });

   });

   cargaGrillaDocumentosInternos();

    $("#btnActualizarSolicitudes").button()
              .click(function (e) {
                  oPropuestasTable.draw();
                  oSolicitudesTable.draw();
                  oDocumentosInternosTable.draw();
              });

   $("#btnActualizarDocumentosInternos").button()
              .click(function (e) {
                  oPropuestasTable.draw();
                  oSolicitudesTable.draw();
                  oDocumentosInternosTable.draw();
              });

   AlertaRespuestasPendientes();

});

function showLoading() {
    $.blockUI({
        message: '<div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div>  <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div>  <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
        theme: false,
        baseZ: 100000
    });
}

function EnviarSolicitud(propuesta, incidencia)
{
    var url = $('#tblPropuestas').data("urlsol") + "?incidencia=" + incidencia;
    $.get(url, function (data)
    {
        $("#modalcontentIncidenciasP").html(data);
        $("#modalcontainerIncidenciasP").modal("show");
        inicializandoModalSolicitud(propuesta);
    });
}


function inicializandoModalSolicitud(propuesta)
{
    $('#hfIdPropuesta').val(propuesta);
}


function btnEnviarSolicitud_onClick()
{
    var idPropuesta         = $("#hfIdPropuesta").val();
    var personaAutorizacion = $("#ddlPersonaAutorizacion").val();
    var MotivoSolicitud     = $("#ddlMotivoSolicitud").val();
    var observacion         = $("#txtObservacionSolicitud").val();

    if (personaAutorizacion == "" || MotivoSolicitud == "")
    {
        swal({ title: "¡Error!", text: "¡Ingresar destinatario y motivo de la solicitud!", type: "error", confirmButtonText: "Aceptar" });
    }
    else
    {
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: $("#btnEnviarSolicitud").data("url").trim(),
                    data: { "idPropuesta": idPropuesta, "personaAutorizacion": personaAutorizacion, "MotivoSolicitud": MotivoSolicitud, "observacion": observacion },
                    success: function (data)
                    {
                        if (data == true) {
                            swal("¡Correcto!", "¡Se envió la solicitud de forma correcta!", "success")
                            oPropuestasTable.draw();
                            oSolicitudesTable.draw();
                            $("#modalcontainerIncidenciasP").modal("hide");
                        }
                        else
                        {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al enviar la solicitud!", type: "error", confirmButtonText: "Aceptar" });
                        }
                      
                    },
                    error: function (request, status, error)
                    {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al enviar la solicitud!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
    }
}


function AlertaRespuestasPendientes()
{
    if ($('#RespuestasPendientes').val() > 0)
    {
        toastr.options.closeButton = true;
        toastr.options.debug = false;
        toastr.options.progressBar = true;
        toastr.options.preventDuplicates = false;
        toastr.options.positionClass = "toast-top-right";
        toastr.options.onclick = null;
        toastr.options.showDuration = "400";
        toastr.options.hideDuration = "1000";
        toastr.options.timeOut = "7000";
        toastr.options.extendedTimeOut = "1000";
        toastr.options.showEasing = "swing";
        toastr.options.hideEasing = "linear";
        toastr.options.showMethod = "slideDown";
        toastr.options.hideMethod = "fadeOut";

        toastr.warning('Respuesta Pendiente', 'Aún no se recibe respuesta de la ultima solicitud enviada!')
    }
};

function cargaGrillaDocumentosInternos()
{
    oDocumentosInternosTable = $('.dataTables-tblDocumentosInternos').DataTable({
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',

        "serverSide": true,
        "ajax": {
            "url": $('#tblDocumentosInternos').data("url") + "?incidencia=" + incidencia,
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "key": true, "title": "Id", "data": "dci_int_id", "name": "dci_int_id", "autoWidth": true, "class": "text-center" },
                { "title": "Tipo Documento", "data": "tdi_str_codigo", "name": "tdi_str_codigo", "autoWidth": true },
                { "title": "N° Documento", "data": "numero", "name": "numero", "autoWidth": true },
                { "title": "Fecha Creación", "data": "dci_dat_fechcreacion", "name": "dci_dat_fechcreacion", "autoWidth": true },
                {
                    "title": "Estado", "class": "text-center", "data": "est_str_descripcion", "name": "est_str_descripcion", "autoWidth": true, "mRender":
                          function (data, type, full)
                          {
                              var estado = data;
                              if (estado == "Pendiente")
                              {
                                  return "<span class='label label-warning'>" + " " + estado + " " + "</span>";
                              }
                              else if (estado == "Rechazada") {
                                  return "<span class='label label-danger'>" + " " + estado + " " + "</span>";
                              }
                              else if (estado == "Aprobada") {
                                  return "<span class='label label-primary'>" + " " + estado + " " + "</span>";
                              }
                              else {
                                  return "<span class='label label-primary'>" + " " + estado + " " + "</span>";
                              }
                          }
                },
                { "title": "N° Guia Salida", "data": "guia_salida", "name": "guia_salida", "autoWidth": true, "class": "text-center" },
                {
                    "title": "Acciones", "class": "text-center", "data": "tdi_int_id", "mRender":
                      function (data, type, full)
                      {
                          var tipo = data;
                          if (full.est_str_descripcion == "Rechazada")
                          {
                              return "<div class='btn-group'>--</div>"
                          }
                          else
                          {
                              return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Ver Documento Interno' class='btn-primary btn btn-xs btn-outline ' onclick='VerDocumentoInterno(" + tipo + "," + incidencia + ");return false;' href='#' > <i class='fa fa-search'></i> Ver Documento </button></div>"
                          }
                      }
                },
        ],
        buttons: [
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'Propuestas Incidencia' },
            { extend: 'pdf', title: 'Propuestas Incidencia' },
            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                }
            }
        ]

    });
}

function VerDocumentoInterno(tipo, incidencia)
{
    var vUrl = $('#tblDocumentosInternos').data("urlver") + "?tipo=" + tipo + "&incidencia=" + incidencia;
    $(window).attr("location", vUrl);
}

function mostrarMensajeResultado()
{
    if ($("#hdfMensaje").val())
    {
        var mensaje = $("#hdfMensaje").val();
        swal("¡Registro Correcto!", mensaje, "success");
    }
}

function GenerarODR()
{
    var vUrl = $('#tblPropuestas').data("urlodr") + "?inc_int_id=" + incidencia;
    $(window).attr("location", vUrl);
}
