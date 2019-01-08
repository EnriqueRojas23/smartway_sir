$(document).ready(function ()
{

    var dlbAccesoriosODS = $('select[name="AccesoriosSeleccionados"]').bootstrapDualListbox({

        nonSelectedListLabel: 'Disponibles',
        selectedListLabel: 'Seleccionados',
        showFilterInputs :false,
        moveOnSelect: true,

    });

    var dlbFallasODS = $('select[name="FallasSeleccionadas"]').bootstrapDualListbox({

        nonSelectedListLabel: 'Disponibles',
        selectedListLabel: 'Seleccionados',
        showFilterInputs: false,
        moveOnSelect: true,
    });

    $("#ddlImeiCorrecto").change(function ()
    {
        var coincide = $("#ddlImeiCorrecto").val();
        var producto = $("#CodigoProducto").val();
        var tienda = $("#TiendaCompra").val();

        if (coincide == "SI")
        {
            document.getElementById('txtSerieImei').disabled = true;
        }
        else
        {
            swal({
                title: "¡Registrar IMEI!",
                text: "IMEI:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Ingresar IMEI"
            },
            function (inputValue)
            {
                if (inputValue === false)
                {
                    $("#ddlImeiCorrecto").val("SI")
                    return false;
                }
                if (inputValue === "")
                {
                   swal.showInputError("¡Ingresar IMEI!"); return false
                }
                if (inputValue.length != 15)
                {
                    swal.showInputError("¡El IMEI debe tener 15 dígitos!"); return false
                }
                else
                {
                    var url = $('#txtSerieImei').data("url") + "?tienda=" + tienda + "&co_item=" + producto + "&imei=" + inputValue;
                    $.ajax(
                    {
                        type: "POST",
                        async: true,
                        url: url,
                        success: function (data)
                        {
                            if (data.res == true)
                            {
                                swal("Correcto!", "Se ingresó el IMEI: " + inputValue, "success");
                                $("#ddlImeiCorrecto").val("SI");
                                $("#txtSerieImei").val(inputValue);
                                $("#SerieImei").val(inputValue);
                            }
                            else
                            {
                                swal.showInputError(data.mensaje); return false
                            }
                        },
                        error: function (request, status, error)
                        {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al validar el IMEI!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });

                }
            });
            
        }
    })

    $(function ()
    {
        $('#frmRegistrarODS').submit(function (event)
        {
            event.preventDefault();

            var imei = $("#txtSerieImei").val();
            var producto = $("#CodigoProducto").val();
            var tienda = $("#TiendaCompra").val();

            if (imei != "") {
                var url = $('#txtSerieImei').data("url") + "?tienda=" + tienda + "&co_item=" + producto + "&imei=" + imei;
                $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data) {
                        if (data.res == true) {
                            swal
                            ({
                                title: "Registro de Orden de Servicio",
                                text: "¿Está seguro de generar la ODS?",
                                type: "warning",
                                showCancelButton: true,
                                cancelButtonText: "Cancelar",
                                confirmButtonColor: '#DD6B55',
                                confirmButtonText: 'Generar',
                                closeOnConfirm: false,
                                closeOnCancel: true
                            },
                           function () {
                               showLoading();
                               $('#frmRegistrarODS').unbind('submit').submit()
                           });
                        }
                        else {
                            swal({ title: "¡Error!", text: data.mensaje, type: "error", confirmButtonText: "Aceptar" });
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al validar el IMEI!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
            }
            else
            {
                showLoading();
                $('#frmRegistrarODS').unbind('submit').submit()

            }
        });

    });

    mostrarMensajeResultado();
  
});

function showLoading() {
    $.blockUI({
        message: '<div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div>  <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div>  <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
        theme: false,
        baseZ: 100000
    });
}

function RegistroDetalleFisicoModal()
{
    var url = $("#lknDetalleFisico").data("url");

    $.get(url, function (data)
    {
        $("#modalcontentIncidenciasL").html(data);
        $("#modalcontainerIncidenciasL").modal("show");

        if ($("#EstadoProductoPFrontal").val() != 0 ) {
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
            var EstadoSuperior= $("#EstadoProductoPSuperior").val();
            $("#ddlEstadoSuperior").val(EstadoSuperior)
        }
        if ($("#EstadoProductoPInferior").val() != 0) {
            var EstadoInferior = $("#EstadoProductoPInferior").val();
            $("#ddlEstadoInferior").val(EstadoInferior)
        }

    });
}

function RegistrarDetalleFisicoProducto()
{
    var EstadoDelantero = $("#ddlEstadoDelantero").val();
    $("#EstadoProductoPFrontal").val(EstadoDelantero)
    var EstadoPosterior = $("#ddlEstadoPosterior").val();
    $("#EstadoProductoPPosterior").val(EstadoPosterior)
    var EstadoLDerecho = $("#ddlLateralDerecho").val();
    $("#EstadoProductoPLDerecho").val(EstadoLDerecho)
    var EstadoLIzquierdo = $("#ddlLateralIzquierdo").val();
    $("#EstadoProductoPLIzquierdo").val(EstadoLIzquierdo)
    var EstadoSuperior = $("#ddlEstadoSuperior").val();
    $("#EstadoProductoPSuperior").val(EstadoSuperior)
    var EstadoInferior = $("#ddlEstadoInferior").val();
    $("#EstadoProductoPInferior").val(EstadoInferior)

    $("#modalcontainerIncidenciasL").modal("hide");
}

function CancelarOrdenServicio()
{
    var incidencia =   $("#inc_int_id").val();
    var vUrl = $("#btnCancelarODS").data("url") + "?inc_int_id=" + incidencia;
    $(window).attr("location", vUrl);
}

function mostrarMensajeResultado()
{
    if ($("#hdfMensaje").val()) {
        var mensaje = $("#hdfMensaje").val();
        swal("¡Registro Correcto!", mensaje, "success");
    }
}

function ImprimirODS()
{
    var incidencia = $("#inc_int_id").val();

    var url = $('#btnImprimirODS').data("url") + "?incidencia=" + incidencia;
    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
    });
}


