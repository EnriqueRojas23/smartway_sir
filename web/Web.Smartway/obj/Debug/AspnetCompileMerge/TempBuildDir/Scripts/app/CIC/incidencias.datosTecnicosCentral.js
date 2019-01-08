var incidencia    = $('#inc_int_id').val();
var ordenServicio = $('#dci_int_id').val();
var oListaTable;
var oDocumentosTable;
var btnEnviarTercero   = "#btnEnviar";
var btnRetornarTercero = "#btnRetornar";
var btnSubirArchivo = "#btnRegistrarArchivo";


$(document).ready(function () {

    cambiarTabActivo();

    $(btnEnviarTercero).click(function (event) { btnEnviarTercero_onclick(this, event); });
    $(btnRetornarTercero).click(function (event) { btnRetornarTercero_onclick(this, event); });
    $(btnSubirArchivo).click(function (event)  { btnSubirArchivo_onclick(this, event); });

    

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
                { "title": "Fecha", "data": "dtec_dat_fechcreacion", "name": "dtec_dat_fechcreacion", "autoWidth": true}

        ],
        buttons: [
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'Registro Técnico Central' },
            { extend: 'pdf', title: 'Registro Técnico Central' },
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

    $(function ()
    {
        $('#frmDatosTecnicosCentral').submit(function (event)
        {
            event.preventDefault();
          
            swal({
                title: "Registro de Datos Técnicos Central",
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
                  function ()
                  {
                      showLoading();
                      $('#frmDatosTecnicosCentral').unbind('submit').submit()
                  });
        });

    });
   
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

    oDocumentosTable =
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
                   { "title": "Acciones", "class": "text-center", "data": "inarc_int_id", "mRender": function (data, type, full) { var id = data; return "<div class='btn-group'><button type='button' class='btn-primary btn btn-xs btn-outline' onclick='downloadFile(" + id + ");return false;' href='#' > Descargar  <i class='fa fa-download'></i></button><button type='button'  class='btn-danger btn btn-xs btn-outline' onclick='EliminarArchivo(" + id + ")' > Eliminar <i class='fa fa-trash'></i></button></div>" } },

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

    $("#btnActualizarAdjuntos").button()
                   .click(function (e) {
                       oDocumentosTable.draw();
                   });

    CargarComboTipoArchivo();
    CargarComboDestino();
    mostrarMensajeResultado();
});

function cambiarTabActivo()
{
    if ($("#hdfTabActivo").val())
    {
        var Tab = $("#hdfTabActivo").val();

        if (Tab == "taller")
        {
            $("#tbTercero").removeClass('active');
            $("#tbTaller").addClass('active');
            $("#tbAdjuntos").removeClass('active');
            $("#tbDocumento").removeClass('active');
        }
        else if (Tab == "adjunto")
        {
            $("#tbTercero").removeClass('active');
            $("#tbTaller").removeClass('active');
            $("#tbAdjuntos").addClass('active');
            $("#tbDocumento").removeClass('active');
        }
        else if (Tab == "tercero")
        {
            $("#tbTercero").addClass('active');
            $("#tbTaller").removeClass('active');
            $("#tbAdjuntos").removeClass('active');
            $("#tbDocumento").removeClass('active');
        }
    }
   
}

function CargarComboDestino()
{
    $("#trb_int_id").change(function ()
    {
        var trabajo = $("#trb_int_id").val();
        var tipoDocumento = $("#tdi_int_id").val();

        if (trb_int_id == "")
        {
            swal({ title: "Error!", text: "¡Seleccionar trabajo realizado!", type: "error", confirmButtonText: "Aceptar" });
        }
        else {

            $.ajax(
               {
                   type: "POST",
                   async: true,
                   url: $("#trb_int_id").data("url").trim(),
                   data: {
                       "tdi_int_id": tipoDocumento,
                       "trb_int_id": trabajo
                   },
                   success: function (data) {
                       var $select = $('#destc_int_id');
                       $select.empty();
                       $("#destc_int_id").append('<option value="">[Seleccionar Destino Final]</option>');
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
    })
}

function CargarComboTipoArchivo()
{
    var proceso = $("#proc_int_id").val();
    if (proceso != "")
    {
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

    function mostrarMensajeResultado() {
        if ($("#hdfMensaje").val()) {
            var mensaje = $("#hdfMensaje").val();
            swal("¡Registro Correcto!", mensaje, "success");
        }
    }

    function showLoading() {
        $.blockUI({
            message: '<div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div>  <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div>  <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
            theme: false,
            baseZ: 100000
        });
    }

    function CancelarDatosTecnicosCentral()
    {
        var url = $('#btnCancelarDatosTecnicos').data("url");
        window.location = url;
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


        if (tipoArchivo == "" || archivo == "")
        {
            swal({ title: "¡Error!", text: "¡Seleccionar tipo  y archivo a registrar!", type: "error", confirmButtonText: "Aceptar" });
        }
        else
        {
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
            function (isConfirm)
            {
                if (isConfirm)
                {
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
                        success: function (data)
                        {
                            if (data == "0")
                            {
                                swal("¡Correcto!", "Se guardó el archivo de forma correcta.", "success");
                                oListaTable.draw();
                                $("#tarch_int_id").val("");
                                $("#archivo_descripcion").val("");
                                $("#files").val("");
                                oDocumentosTable.draw();
                            }
                            else if (data == "-2")
                            {
                                swal("¡Error!", "El tamaño del archivo sobrepasa el permitido (máximo 3 MB).", "error");
                                $("#files").val("");
                            }
                            else
                            {
                                swal({ title: "¡Error!", text: "¡Ocurrió un error al cargar el archivo!", type: "error", confirmButtonText: "Aceptar" });
                                $("#files").val("");
                            }
                        },
                        error: function (request, status, error)
                        {
                            swal({ title: "¡Error!", text: "Ocurrió un error al cargar el archivo!", type: "error", confirmButtonText: "Aceptar" });
                            $("#files").val("");
                        }
                    });
                }
            });
        }

    }

    function btnEnviarTercero_onclick(obj, event)
    {

        var url = $(obj).data("url");
        var tercero     = $("#ter_int_id").val();

        if (tercero == "")
        {
            swal({ title: "¡Error!", text: "¡Seleccionar tercero!", type: "error", confirmButtonText: "Aceptar" });
        }
        else {
            swal({
                title: "Enviar a Tercero",
                text: "¿Está seguro que desea derivar el producto al tercero?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Si, enviar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm)
            {
                if (isConfirm)
                {
                    var dataModelo = $("#frmAtencionTercero").serialize();
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
                                swal("¡Correcto!", data.mensaje, "success");
                                document.getElementById('btnEnviar').disabled = true;
                                document.getElementById('btnRegistrarDatosTecnicos').disabled = true;
                                document.getElementById('btnRetornar').disabled = false;
                                document.getElementById('ter_int_id').disabled = true;
                                document.getElementById('ost_str_obsenvio').disabled = true;

                                $("#dEnvio").append(data.Datos.ost_str_numero);
                                $("#dEstado").append(data.Datos.estado);
                                $("#dEstado").addClass(data.Datos.label_estado);
                                $("#dTipoEnvio").append(data.Datos.tipo_envio);
                                $("#dOperEnvio").append(data.Datos.oper_envio);
                                $("#dGuiaEnvio").append(data.Datos.guia_envio);
                                $("#dFechaEnvio").append(data.Datos.ost_dat_fechenvio);
                                $("#dUsuarioEnvio").append(data.Datos.usuario_envio);
                                $("#ost_int_id").val(data.Datos.ost_int_id);
                            }
                            else
                            {
                                swal("¡Error!", data.mensaje, "error");
                    
                            }
                        },
                        error: function (request, status, error)
                        {
                            swal({ title: "¡Error!", text: "Ocurrió un error al derivar el producto a tercero!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
                }
            });
        }

    }

    function btnRetornarTercero_onclick(obj, event)
    {
        var url = $(obj).data("url");
        var trabajo = $("#trbt_int_id").val();

        if (trabajo == "")
        {
            swal({ title: "¡Error!", text: "¡Seleccionar resultado del trabajo realizado por el tercero!", type: "error", confirmButtonText: "Aceptar" });
        }
        else
        {
            swal({
                title: "Reingreso de Tercero",
                text: "¿Está seguro que desea reingresar el producto enviado?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Si, reingresar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    var dataModelo = $("#frmAtencionTercero").serialize();
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
                                swal("¡Correcto!", data.mensaje, "success");
                                document.getElementById('btnRegistrarDatosTecnicos').disabled = false;
                                document.getElementById('btnRetornar').disabled = true;
                                document.getElementById('trbt_int_id').disabled = true;
                                document.getElementById('ost_str_obsretorno').disabled = true;

                                $("#dRetorno").empty();
                                $("#dRetorno").append(data.Datos.ost_str_numero);
                                $("#dEstadoRetorno").removeClass("label label-danger");
                                $("#dEstadoRetorno").addClass(data.Datos.label_estado);
                                $("#dEstadoRetorno").empty();
                                $("#dEstadoRetorno").append(data.Datos.estado);
                                $("#dTipoRetorno").append(data.Datos.tipo_retorno);
                                $("#dOperRetorno").append(data.Datos.oper_retorno);
                                $("#dGuiaRetorno").append(data.Datos.guia_retorno);
                                $("#dFechaRetorno").append(data.Datos.ost_dat_fechretorno);
                                $("#dUsuarioRetorno").append(data.Datos.usuario_retorno);
                            }
                            else
                            {
                                swal("¡Error!", data.mensaje, "error");
                            }
                        },
                        error: function (request, status, error)
                        {
                            swal({ title: "¡Error!", text: "Ocurrió un error al reingresar el producto!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
                }
            });
        }
    }