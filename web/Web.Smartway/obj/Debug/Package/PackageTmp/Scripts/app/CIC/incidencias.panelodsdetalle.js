var oDocumentosTable;
var incidencia = $('#inc_int_id').val();
var ordenServicio = $('#ods_int_id').val();
var oListaTable;

var oArchivosTable;
var btnSubirArchivo = "#btnRegistrarArchivo";

$(document).ready(function () {

    $(btnSubirArchivo).click(function (event) { btnSubirArchivo_onclick(this, event); });

    var dlbAccesoriosODS = $('select[name="AccesoriosSeleccionados"]').bootstrapDualListbox({

        nonSelectedListLabel: 'Disponibles',
        selectedListLabel: 'Seleccionados',
        showFilterInputs: false,
        moveOnSelect: true,

    });

    var dlbFallasODS = $('select[name="FallasSeleccionadas"]').bootstrapDualListbox({

        nonSelectedListLabel: 'Disponibles',
        selectedListLabel: 'Seleccionados',
        showFilterInputs: false,
        moveOnSelect: true,
    });

    oListaTable =
        $('.dataTables-RegistroTecnico').DataTable({
            responsive: true,
            dom: '<"html5buttons"B>lTfgitp',
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": $('#tblRegistroTecnico').data("url") + "?incidencia=" + incidencia + "&DocumentoInterno=" + ordenServicio,
                "type": "POST",
                "datatype": "json"
            },
            "columns": [
                    { "title": "ID", "data": "dtec_int_id", "name": "dtec_int_id", "autoWidth": true },
                    { "title": "Técnico", "data": "tec_str_nombre", "name": "tec_str_nombre", "autoWidth": true },
                    { "title": "Avería Detectada", "data": "ave_str_descripcion", "name": "ave_str_descripcion", "autoWidth": true },
                    { "title": "Detalle de Avería", "data": "dtec_str_detaveria", "name": "dtec_str_detaveria", "autoWidth": true },
                    { "title": "Trabajo Realizado", "data": "trb_str_descripcion", "name": "trb_str_descripcion", "autoWidth": true },
                    { "title": "Detalle del Trabajo", "data": "dtec_str_dettrabajo", "name": "dtec_str_dettrabajo", "autoWidth": true },
                    { "title": "Destino Final", "data": "destc_str_descripcion", "name": "destc_str_descripcion", "autoWidth": true },
                    { "title": "Transporte", "data": "tp_str_descripcion", "name": "tp_str_descripcion", "autoWidth": true },
                    { "title": "Fecha", "data": "dtec_dat_fechcreacion", "name": "dtec_dat_fechcreacion", "autoWidth": true }

            ],
            buttons: [
                { extend: 'copy' },
                { extend: 'csv' },
                { extend: 'excel', title: 'Registro Técnico' },
                { extend: 'pdf', title: 'Registro Técnico' },
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

    $("#btnActualizar").button()
                   .click(function (e) {
                       oListaTable.draw();
                   });


    $(function () {
        $('#frmDatosTecnicos').submit(function (event) {
            event.preventDefault();
            var DestinoFinal = $("#destc_int_id").val();
            var DestinoFinalSTC = $("#DestinoSTCCentral").val();

            if (DestinoFinal == DestinoFinalSTC)
            {
                var tipoTransporte = $("#tp_int_id").val();

                if (tipoTransporte == 0)
                {
                    swal({ title: "Error", text: "Ingresar el tipo de Transporte.", type: "error" });
                }
                else
                {
                    swal({ title: "Información", text: "La orden de servicio sera guiada al almacén central de Servicio Técnico.", type: "info", closeOnConfirm: false },
                    function () {

                        $("#STCCentral").val(true);

                        swal({
                            title: "Registro de Datos Técnicos",
                            text: "¿Está seguro de realizar el registro?",
                            type: "info",
                            showCancelButton: true,
                            cancelButtonText: "Cancelar",
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'Registrar',
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                            closeOnCancel: true,
                        },
                       function () {

                           showLoading();
                           $('#frmDatosTecnicos').unbind('submit').submit()
                       });
                    });
                }
            }
            else
            {
                swal({
                    title: "Registro de Datos Técnicos",
                    text: "¿Está seguro de realizar el registro?",
                    type: "info",
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Registrar',
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                    closeOnCancel: true,
                },
                   function () {

                       showLoading();
                       $('#frmDatosTecnicos').unbind('submit').submit()
                   });
            }
        });

    });

    mostrarMensajeResultado();

    $("#destc_int_id").change(function () {
        var destino = $("#destc_int_id").val();
        var DestinoFinalSTC = $("#DestinoSTCCentral").val();

        if (destino == DestinoFinalSTC) {
            $("#dvTTransporte").css("display", "");
        }
        else {
            $("#dvTTransporte").css("display", "none");
        }
    })

    
    CargaTablaArchivosInicial();
    CargarComboTipoArchivo();

    $("#btnActualizarAdjuntos").button()
                .click(function (e) {
                    oArchivosTable.draw();
                });
});

function CargarComboTipoArchivo() {
    var proceso = $("#proc_int_id").val();
    if (proceso != "") {
        $.ajax(
         {
             type: "POST",
             async: true,
             url: $("#tarch_int_id").data("url").trim(),
             data: { "proceso": proceso },
             success: function (data) {
                 var $select = $('#tarch_int_id');
                 $select.empty();
                 $("#tarch_int_id").append('<option value="">[Seleccionar tipo de archivo]</option>');
                 $.each(data, function (i, state) {
                     $('<option>', {
                         value: state.Value
                     }).html(state.Text).appendTo($select);
                 });
             },
             error: function (request, status, error) {
                 swal({ title: "¡Error!", text: "Ha ocurrido un error, intentelo mas tarde.", type: "error", confirmButtonText: "Aceptar" });
             }
         });
    }

}

function CargaTablaArchivosInicial()
{
    oArchivosTable =
      $('.dataTables-Documentacion').DataTable({
          responsive: true,
          dom: '<"html5buttons"B>lTfgitp',
          "processing": true,
          "serverSide": true,
          "ajax": {
              "url": $('#tblDocumentos').data("url") + "?incidencia=" + incidencia,
              "type": "POST",
              "datatype": "json"
          },
          "columns": [
                  { "key": true, "title": "ID", "data": "inarc_int_id", "name": "inarc_int_id", "autoWidth": true, "class": "text-center" },
                  { "title": "Proceso", "data": "proc_str_descripcion", "name": "proc_str_descripcion", "autoWidth": true },
                  { "title": "Tipo Documento", "data": "tarch_str_descripcion", "name": "tarch_str_descripcion", "autoWidth": true },
                  { "title": "Descripción", "data": "inarc_str_descripcion", "name": "inarc_str_descripcion", "autoWidth": true },
                  { "title": "Archivo", "data": "inarc_str_nombre", "name": "inarc_str_nombre", "autoWidth": true },
                  { "title": "Acciones", "class": "text-center", "data": "inarc_int_id", "mRender": function (data, type, full) { var id = data; return "<button type='button' class='btn-primary btn btn-xs btn-outline' onclick='downloadFile(" + id + ");return false;' href='#' > Descargar  <i class='fa fa-download'></i></button><button type='button'  class='btn-danger btn btn-xs btn-outline' onclick='EliminarArchivo(" + id + ")' > Eliminar <i class='fa fa-trash'></i></button>" } },

          ],
          buttons: [
              { extend: 'copy' },
              { extend: 'csv' },
              { extend: 'excel', title: 'Documentos' },
              { extend: 'pdf', title: 'Documentos' },
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

function RegistroDetalleFisicoModal() {
    var url = $("#lknDetalleFisico").data("url");

    $.get(url, function (data) {
        $("#modalcontentIncidenciasL").html(data);
        $("#modalcontainerIncidenciasL").modal("show");

        if ($("#EstadoProductoPFrontal").val() != 0) {
            var EstadoDelantero = $("#EstadoProductoPFrontal").val();
            $("#ddlEstadoDelantero").val(EstadoDelantero)
        }
        if ($("#EstadoProductoPPosterior").val() != 0) {
            var EstadoPosterior = $("#EstadoProductoPPosterior").val();
            $("#ddlEstadoPosterior").val(EstadoPosterior)
        }
        if ($("#EstadoProductoPLDerecho").val() != 0) {
            var EstadoLDerecho = $("#EstadoProductoPLDerecho").val();
            $("#ddlLateralDerecho").val(EstadoLDerecho)
        }
        if ($("#EstadoProductoPLIzquierdo").val() != 0) {
            var EstadoLIzquierdo = $("#EstadoProductoPLIzquierdo").val();
            $("#ddlLateralIzquierdo").val(EstadoLIzquierdo)
        }
        if ($("#EstadoProductoPSuperior").val() != 0) {
            var EstadoSuperior = $("#EstadoProductoPSuperior").val();
            $("#ddlEstadoSuperior").val(EstadoSuperior)
        }
        if ($("#EstadoProductoPInferior").val() != 0) {
            var EstadoInferior = $("#EstadoProductoPInferior").val();
            $("#ddlEstadoInferior").val(EstadoInferior)
        }

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

function mostrarMensajeResultado() {
    if ($("#hdfMensaje").val()) {
        if ($("#hdfTipoMensaje").val()) {
            var tipo = $("#hdfTipoMensaje").val()

            if (tipo == "error") {
                var mensaje = $("#hdfMensaje").val();
                swal("¡Error!", mensaje, "error");
            }
            else {
                var mensaje = $("#hdfMensaje").val();
                swal("¡Registro Correcto!", mensaje, "success");
            }
        }
        else {
            var mensaje = $("#hdfMensaje").val();
            swal("¡Registro Correcto!", mensaje, "success");
        }
    }
}

function showLoading() {
    $.blockUI({
        message: '<div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div>  <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div>  <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
        theme: false,
        baseZ: 100000
    });
}

function regresar()
{
    var vUrl = $('#btnRegresar').data("url");
    $(window).attr("location", vUrl);
}



function EliminarArchivo(archivo) {
    var url = $('#tblDocumentos').data("urldel");

    swal({
        title: "¿Está seguro de eliminar el archivo?",
        text: "No podra recuperar el archivo.",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "Cancelar!",
        closeOnConfirm: false,
        closeOnCancel: true
    },
            function (isConfirm) {
                if (isConfirm) {
                    $.ajax(
                    {
                        type: "POST",
                        async: true,
                        url: url,
                        data: { "archivo": archivo },
                        success: function (data) {
                            if (data == true) {
                                swal("¡Eliminado!", "El archivo ha sido eliminado.", "success");
                                oDocumentosTable.draw();
                            }
                            else {
                                swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar el archivo!", type: "error", confirmButtonText: "Aceptar" });
                            }

                        },
                        error: function (request, status, error) {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar el archivo!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
                }
            });
}

function downloadFile(archivo) {
    var url = $('#tblDocumentos').data("urldwn") + "?archivo=" + archivo;
    window.location = url;
}



function btnSubirArchivo_onclick(obj, event) {

    var url = $(obj).data("url");
    var tipoArchivo = $("#tarch_int_id").val();
    var archivo = $("#files").val();


    if (tipoArchivo == "" || archivo == "") {
        swal({ title: "¡Error!", text: "¡Seleccionar tipo  y archivo a registrar!", type: "error", confirmButtonText: "Aceptar" });
    }
    else {
        swal({
            title: "Adjuntar Archivo",
            text: "¿Está seguro de adjuntar el archivo?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Si, adjuntar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                var dataModelo = $("#frmArchivoAdjunto").serialize();
                var formData = new FormData(document.getElementById("frmArchivoAdjunto"));
                formData.append("dato", "valor");

                $.ajax(
                {
                    url: url,
                    type: "POST",
                    dataType: "html",
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data == "0") {
                            swal("¡Correcto!", "Se guardó el archivo de forma correcta.", "success");
                            $("#tarch_int_id").val("");
                            $("#archivo_descripcion").val("");
                            $("#files").val("");
                            oArchivosTable.draw();
                        }
                        else if (data == "-2") {
                            swal("¡Error!", "El tamaño del archivo sobrepasa el permitido (máximo 3 MB).", "error");
                            $("#files").val("");
                        }
                        else {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al cargar el archivo!", type: "error", confirmButtonText: "Aceptar" });
                            $("#files").val("");
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "Ocurrió un error al cargar el archivo!", type: "error", confirmButtonText: "Aceptar" });
                        $("#files").val("");
                    }
                });
            }
        });
    }

}


function ImprimirODS()
{
    var incidencia = $("#inc_int_id").val();

    var url = $('#btnImprimirODS').data("url") + "?incidencia=" + incidencia;

    $.get(url, function (data)
    {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
    });

    //var url = $('#btnImprimirODS').data("url");
    //$.ajax(
    //              {
    //                  type: "POST",
    //                  async: true,
    //                  url: url,
    //                  success: function (data)
    //                  {
    //                      if (data == true)
    //                      {
    //                          swal("¡Eliminado!", data.mensaje, "success");

    //                      }
    //                      else
    //                      {
    //                          swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar el archivo!", type: "error", confirmButtonText: "Aceptar" });
    //                      }
    //                  },
    //                  error: function (request, status, error) {
    //                      swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar el archivo!", type: "error", confirmButtonText: "Aceptar" });
    //                  }
    //              });
}