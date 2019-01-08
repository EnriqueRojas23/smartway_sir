var btnAgregarDetalle = "#btnAgregarDetalle";
var oDetalleTable;
var incidencia;

$(document).ready(function ()
{
    CargarGrillaDetalle();

    var dlbAccesorios = $('select[name="AccesoriosSeleccionados"]').bootstrapDualListbox({

        nonSelectedListLabel: 'Disponibles',
        selectedListLabel: 'Seleccionados',
        showFilterInputs :false,
        moveOnSelect: true,
    });

    var dlbFallas = $('select[name="FallasSeleccionadas"]').bootstrapDualListbox({

        nonSelectedListLabel: 'Disponibles',
        selectedListLabel: 'Seleccionados',
        showFilterInputs: false,
        moveOnSelect: true,
    });


    $(btnAgregarDetalle).click(function (event)  { btnAgregarDetalle_onclick(this, event); });
   

    $('#data_2 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#data_3 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

});


function btnAgregarDetalle_onclick(obj, event) {

        var url = $(obj).data("url");

        $.get(url, function (data)
        {
            $("#modalcontentIncidenciasP").html(data);
            $("#modalcontainerIncidenciasP").modal("show");
            $('#txtDetDescuento').numeric('.');
            $('#txtDetPrecio').numeric('.');
            document.getElementById('txtEscanProducto').focus();

            $('#txtEscanProducto').bind('keyup', function (e) {
                var key = e.keyCode || e.which;
                if (key === 13) {
                    BuscarProducto();
                };
            });

            var config_chossen = {
                '.chosen-select': {},
                '.chosen-select-deselect': { allow_single_deselect: true },
                '.chosen-select-no-results': { no_results_text: 'Oops, no se encontró el producto!' }
            }

            for (var selector in config_chossen) {
                $(selector).chosen(config_chossen[selector]);
            }

            ChangeComboProductos();
        });
}

function BuscarProducto()
{
    var barra = $('#txtEscanProducto').val();

    $.ajax(
            {
                type: "POST",
                async: true,
                url: $("#txtEscanProducto").data("url").trim(),
                data: { "codigo": barra },
                success: function (data)
                {
                    if (data.pro_int_id > 0)
                    {
                        $("#hdIdProducto").val(data.pro_int_id);
                        $("#txtDetCodigo").val(data.pro_str_codigo);
                        $("#txtDetBarra").val(data.barra);
                        $("#txtDetDescripcion").val(data.pro_str_descripcion);
                        $("#txtDetPrecio").val(data.pro_dec_precio);
                        $("#txtSolicitarImei").val(data.imei);
                        $('#txtEscanProducto').val("");
                    }
                    else
                    {
                        swal({ title: "¡Error!", text: "¡No se encontró la barra del producto en la base de datos!", type: "error", confirmButtonText: "Aceptar" });
                        $('#txtEscanProducto').val("");
                    }
                  
                },
                error: function (request, status, error)
                {
                    $('#txtEscanProducto').val("");
                    swal({ title: "¡Error!", text: "¡No se pudo cargar los datos del producto!", type: "error", confirmButtonText: "Aceptar" });
                }
            });
}

function ChangeComboProductos()
{
    $("#ddlDetalleProducto").chosen().change(function () {

        var pro_int_id = (+$(this).val());

        $.ajax(
            {
                type: "POST",
                async: true,
                url: $("#ddlDetalleProducto").data("url").trim(),
                data: { "producto": pro_int_id },
                success: function (data)
                {
                    $("#hdIdProducto").val(data.pro_int_id);
                    $("#txtDetCodigo").val(data.pro_str_codigo);
                    $("#txtDetDescripcion").val(data.pro_str_descripcion);
                    $("#txtDetPrecio").val(data.pro_dec_precio);
                    $("#txtSolicitarImei").val(data.imei);
                },
                error: function (request, status, error)
                {
                    swal({ title: "¡Error!", text: "¡No se pudo cargar los datos del producto!", type: "error", confirmButtonText: "Aceptar" });
                }
            });
    })
}








function CargarGrillaDetalle()
{
    var vdataurl = $('#tblIncidenciaDetalle').data("url");

    oDetalleTable = $('.dataTables-Detalle').DataTable({
        responsive: true,
        searching: true,
        paging: true,
        ordering: false,
        serverSide: true,
        //"iDisplayLength": 25,
        ajax:
        {
            url : vdataurl,
            type: "POST",
            datatype: "json"
        },
        'columnDefs': [
             {
                 'targets': 0,
                 'checkboxes': { 'selectRow': true }
             }],
        "columns": [
                { "key": true, "data": "id", "autoWidth": "true" },
                { "title": "N°", "data": "id", "name": "id", "sWidth": "6%" },
                { "title": "Código", "data": "co_item", "name": "co_item", "autoWidth": "true" },
                { "title": "Descripción", "data": "de_item", "name": "de_item", "sWidth": "30%" },
                { "title": "IMEI", "data": "serie_imei", "name": "serie_imei", "autoWidth": "true" },
                { "title": "Barra", "data": "barra", "name": "barra", "autoWidth": "true" },
                { "title": "Cantidad", "data": "cantidad", "name": "cantidad", "sWidth": "7%" },
                { "title": "Descuento", "data": "descuento", "name": "descuento", "sWidth": "8%" },
                { "title": "Total", "data": "precio", "name": "precio", "sWidth": "8%" },
        ],
        'select': { 'style': 'os'},
        'order': [[1, 'asc']]
    });

}

function AgregarDetalle()
{

    var id_producto = $("#hdIdProducto").val();
    var co_item = $("#txtDetCodigo").val();
    var co_desc = $("#txtDetDescripcion").val();
    var cantidad = $("#txtDetCantidad").val();
    var descuento = $("#txtDetDescuento").val();
    var precio = $("#txtDetPrecio").val();

    var barra = $("#txtDetBarra").val();

    var NecesitaImei = $("#txtSolicitarImei").val();

    var Imei = $("#txtImeiValidar").val();
    var ImeiValido = $("#chkImeiValido").prop('checked');

    if (id_producto == "" || precio == "" || cantidad == "" || barra == "")
    {
        swal({ title: "¡Error!", text: "¡Ingresar producto, cantidad, código de barra y precio!", type: "error", confirmButtonText: "Aceptar" });
    }
    else if ( NecesitaImei == "SI")
    {
        if (Imei != "")
        {
            if (ImeiValido == false)
            {
                swal({ title: "¡Error!", text: "¡El IMEI no ha sido validado, o no es válido!", type: "error", confirmButtonText: "Aceptar" });
            }
            else {
                var url = $('#tblIncidenciaDetalle').data("urladd") + "?producto=" + id_producto + "&codigo=" + encodeURIComponent(co_item) + "&descripcion=" + co_desc + "&cantidad=" + cantidad + "&descuento=" + descuento + "&precio=" + precio + "&imei=" + Imei + "&barra=" + barra;
                $.ajax(
                        {
                            type: "POST",
                            async: true,
                            url: url,
                            success: function (data)
                            {
                                if (data.res == false) {
                                    swal({ title: "¡Error!", text: "¡Ocurrió un error al agregar el detalle!", type: "error", confirmButtonText: "Aceptar" });
                                }
                            },
                            error: function (request, status, error) {
                                swal({ title: "¡Error!", text: "¡Ocurrió un error al agregar el detalle!", type: "error", confirmButtonText: "Aceptar" });
                            }
                        });

                oDetalleTable.draw();
                $("#modalcontainerIncidenciasP").modal("hide");
            }
        }
        else
        {
            swal({ title: "¡Error!", text: "¡Es obligatorio ingresar el IMEI/SERIE para este producto!", type: "error", confirmButtonText: "Aceptar" });
        }
    }
    else if ( NecesitaImei == "NO")
    {
        var url = $('#tblIncidenciaDetalle').data("urladd") + "?producto=" + id_producto + "&codigo=" + encodeURIComponent(co_item) + "&descripcion=" + co_desc + "&cantidad=" + cantidad + "&descuento=" + descuento + "&precio=" + precio + "&imei=" + "" + "&barra=" + barra;
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data) {
                        if (data.res == false) {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al agregar el detalle!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al agregar el detalle!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });

        oDetalleTable.draw();
        $("#modalcontainerIncidenciasP").modal("hide");
    }
}

function ValidarImei() {
    var tienda = $("#co_tien").val();
    var Item = $("#txtDetCodigo").val();
    var Imei = $("#txtImeiValidar").val();
    var ImeiValido = $("#chkImeiValido").prop('checked');

    if (Imei == "" || Item == "") {
        swal({ title: "¡Error!", text: "¡Ingresar item y IMEI a validar!", type: "error", confirmButtonText: "Aceptar" });
    }
    else {

        var url = $('#btnAgregarDetalle').data("urlimei") + "?tienda=" + tienda + "&co_item=" + encodeURIComponent(Item) + "&imei=" + Imei;
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data) {
                        if (data.res == true) {
                            document.getElementById("txtImeiValidar").disabled = true;
                            $("#chkImeiValido").prop('checked', true);
                            swal("Resultado Validación", data.mensaje, "success");
                        }
                        else {
                            $("#chkImeiValido").prop('checked', false);
                            swal("Resultado Validación", data.mensaje, "error");
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al validar el IMEI!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
    }
}



function EliminarDetalle( id)
{

    var url = $('#tblIncidenciaDetalle').data("urldel") + "?id=" + id;
    $.ajax(
            {
                type: "POST",
                async: true,
                url: url,
                success: function (data) {
                    if (data.res == true)
                    {
                        oDetalleTable.draw();
                    }
                },
                error: function (request, status, error) {
                    swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar el detalle!", type: "error", confirmButtonText: "Aceptar" });
                }
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

function rellenar(quien, que)
{
    if (que.length < 15)
    {
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


function showLoading() {
    $.blockUI({
        message: '<div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div>  <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div>  <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
        theme: false,
        baseZ: 100000
    });
}


function RegistrarContinuar()
{
    $("#ItemIncidencia").val("");
    var items_seleccionados = oDetalleTable.column(0).checkboxes.selected();

    $.each(items_seleccionados, function (index, rowId){
        var valor = $("#ItemIncidencia").val();
        $("#ItemIncidencia").val(valor + ',' + rowId);
    });
    
    if ($("#ItemIncidencia").val().length > 1){$("#ItemIncidencia").val($("#ItemIncidencia").val().substring(1));}

    $("#soloregistro").val(false);
}

function OnCompleteTransaction_RegistrarIncidencia(xhr, status)
{
    var jsonres = xhr.responseJSON;
    CleanValidationError();

    if (jsonres.res == true)
    {
        swal({
            title: "Registro Completo",
            text: "Se generó el N° de incidencia : " + jsonres.num_incidencia + " y la ODR : " +  jsonres.odr + " de forma correcta.",
            type: "success"
        },
        function ()
        {
            incidencia = jsonres.incidencia;;
            document.getElementById('btnSoloRegistrarContinuar').disabled = true;
            document.getElementById('btnImprimirODR').disabled = false;
        });

    }
    else
    {
        sweetAlert("Verificar Errores", null, "error");
        CheckValidationErrorResponse(jsonres);
    }

}

function CheckValidationErrorResponse(response, form, summaryElement) {

    var $list, data = getResponseValidationObject(response);
    if (!data) return false;

    $list = summaryElement || getValidationSummary();
    $list.html("");
    $.each(data.Errors, function (i, item) {

        var $val, lblTxt, errorList = "";

        if (item.Key) {
            $val = $(".field-validation-valid,.field-validation-error")
                        .first("[data-valmsg-for=" + item.Key + "]")
                        .removeClass("field-validation-valid")
                        .addClass("field-validation-error");
            $("input[name=" + item.Key + "]").addClass("input-validation-error")
            lblTxt = $("label[for=" + item.Key + "]").text();
            if (lblTxt) { lblTxt += ": "; }
        }
        if ($val != undefined) {
            if ($val.length) {
                $val.text(item.Value.shift());
                if (!item.Value.length) { return; }
            }
        }

        $.each(item.Value, function (c, val) {
            if (lblTxt == undefined) lblTxt = "";
            errorList += "<li>" + lblTxt + val + "</li>";
        });

        $list.append(errorList);
    });
    if ($list.find("li:first").length) { $list.closest("div").show(); }
    return true;
}

function CleanValidationError()
{
    $(".validation-summary-errors").html("");
}

function ImprimirODR()
{

    var url = $('#btnImprimirODR').data("url") + "?incidencia=" + incidencia;
    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
    });
}