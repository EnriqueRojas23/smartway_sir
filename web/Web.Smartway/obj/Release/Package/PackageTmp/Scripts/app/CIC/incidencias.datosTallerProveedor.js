var incidencia    = $('#inc_int_id').val();
var orden= $('#dci_int_id').val();
var oListaTable;
var btnEnviarProveedor   = "#btnEnviar";
var btnRetornarProveedor = "#btnRetornar";



$(document).ready(function ()
{
    $(btnEnviarProveedor).click(function (event) { btnEnviarProveedor_onclick(this, event); });
    $(btnRetornarProveedor).click(function (event) { btnRetornarProveedor_onclick(this, event); });


    oListaTable =
        $('.dataTables-RegistroTecnico').DataTable({
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        "processing": true, 
        "serverSide": true,
        "ajax": {
            "url": $('#tblRegistroTecnico').data("url") + "?incidencia=" + incidencia + "&DocumentoInterno=" + orden,
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

    CargarComboDestino();
    CargarComboProveedor();
    mostrarMensajeResultado();
});


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

function CargarComboProveedor() {
    $("#tprv_int_id").change(function () {
        var tipo = $("#tprv_int_id").val();

        if (tipo == "") {
            swal({ title: "¡Error!", text: "¡Seleccionar el tipo de proveedor!", type: "error", confirmButtonText: "Aceptar" });
        }
        else {

            $.ajax(
               {
                   type: "POST",
                   async: true,
                   url: $("#tprv_int_id").data("url").trim(),
                   data: { "tipoProveedor": tipo },
                   success: function (data) {
                       var $select = $('#prv_int_id');
                       $select.empty();
                       $("#prv_int_id").append('<option value="0">[Seleccionar Proveedor]</option>');
                       $.each(data, function (i, state) {
                           $('<option>', {
                               value: state.Value
                           }).html(state.Text).appendTo($select);
                       });
                   },
                   error: function (request, status, error) {
                       swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                   }
               });
        }
    })
}



function CancelarDatosTecnicosCentral()
{
    var url = $('#btnCancelarDatosTecnicos').data("url");
    window.location = url;
}


function btnEnviarProveedor_onclick(obj, event)
{

    var url = $(obj).data("url");
    var proveedor     = $("#prv_int_id").val();

    if (proveedor == "" || proveedor == 0)
    {
        swal({ title: "¡Error!", text: "¡Seleccionar provedor!", type: "error", confirmButtonText: "Aceptar" });
    }
    else {
        swal({
            title: "Enviar a Proveedor",
            text: "¿Está seguro que desea derivar el producto al proveedor?",
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
                var dataModelo = $("#frmAtencionProveedor").serialize();
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
                            document.getElementById('tprv_int_id').readOnly = true;
                            document.getElementById('prv_int_id').readOnly = true;
                            document.getElementById('otp_str_obsenvio').disabled = true;

                            $("#dEnvio").append(data.Datos.otp_str_numero);
                            $("#dEstado").append(data.Datos.estado);
                            $("#dEstado").addClass(data.Datos.label_estado);
                            $("#dTipoEnvio").append(data.Datos.tipo_envio);
                            $("#dOperEnvio").append(data.Datos.oper_envio);
                            $("#dGuiaEnvio").append(data.Datos.guia_envio);
                            $("#dFechaEnvio").append(data.Datos.otp_dat_fechenvio);
                            $("#dUsuarioEnvio").append(data.Datos.usuario_envio);
                            $("#otp_int_id").val(data.Datos.otp_int_id);
                            $("#prvr_int_id").val(data.Datos.prv_int_id);
                        }
                        else
                        {
                            swal("¡Error!", data.mensaje, "error");
                    
                        }
                    },
                    error: function (request, status, error)
                    {
                        swal({ title: "¡Error!", text: "Ocurrió un error al derivar el producto al proveedor!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
            }
        });
    }

}

function btnRetornarProveedor_onclick(obj, event)
{
    var url = $(obj).data("url");
    var trabajo = $("#trbp_int_id").val();

    if (trabajo == "" || trabajo == 0)
    {
        swal({ title: "¡Error!", text: "¡Seleccionar resultado del trabajo realizado por el proveedor!", type: "error", confirmButtonText: "Aceptar" });
    }
    else
    {
        swal({
            title: "Reingreso de Proveedor",
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
                var dataModelo = $("#frmAtencionProveedor").serialize();
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
                            document.getElementById('trbp_int_id').disabled = true;
                            document.getElementById('otp_str_obsretorno').disabled = true;

                            $("#dRetorno").empty();
                            $("#dRetorno").append(data.Datos.otp_str_numero);
                            $("#dEstadoRetorno").removeClass("label label-danger");
                            $("#dEstadoRetorno").addClass(data.Datos.label_estado);
                            $("#dEstadoRetorno").empty();
                            $("#dEstadoRetorno").append(data.Datos.estado);
                            $("#dTipoRetorno").append(data.Datos.tipo_retorno);
                            $("#dOperRetorno").append(data.Datos.oper_retorno);
                            $("#dGuiaRetorno").append(data.Datos.guia_retorno);
                            $("#dFechaRetorno").append(data.Datos.otp_dat_fechretorno);
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