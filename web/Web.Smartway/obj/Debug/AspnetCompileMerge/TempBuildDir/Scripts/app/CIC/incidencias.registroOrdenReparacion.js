var btnBuscarPersona = "#btnBuscarPersona";
var btnBuscarDocumento = "#btnBuscarDocumento";
var btnAgregarDetalle = "#btnAgregarDetalle";
var oDetalleTable;

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

    $(btnBuscarPersona).click(function (event)   { btnBuscarPersona_onclick(this, event); });
    $(btnBuscarDocumento).click(function (event) { btnBuscarDocumento_onclick(this, event); });
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

    $(".touchspin3").TouchSpin({
        verticalbuttons: true,
        buttondown_class: 'btn btn-white',
        buttonup_class: 'btn btn-white'
    });

    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
        $('#gridclientes').setGridWidth(width);
        $('#gridDocumentos').setGridWidth(width);
        $('#gridDocumentos').setGridWidth(width);
        $('#gridArticulosReclamados').setGridWidth(width);
    });


    if (document.getElementById('cli_str_documento') != null)
    {
        $('#cli_str_documento').numeric();
        document.getElementById('cli_str_documento').setAttribute('maxlength', '8');
    }

    $("#tper_int_id").change(function ()
    {
        var tpersona = $("#tper_int_id").val();
        if (tpersona == 1)
        {
            $('#cli_str_documento').numeric();
            document.getElementById('cli_str_documento').setAttribute('maxlength', '8');
        }
        else if (tpersona == 2)
        {
            $('#cli_str_documento').numeric();
            document.getElementById('cli_str_documento').setAttribute('maxlength', '11');
        }
        else if (tpersona == 3)
        {
            $('#cli_str_documento').numeric();
            document.getElementById('cli_str_documento').setAttribute('maxlength', '12');
        }
        else
        {
            $('#cli_str_documento').numeric();
            document.getElementById('cli_str_documento').setAttribute('maxlength', '8');
        }
    })

});

function btnBuscarPersona_onclick(obj, event) {

    var url = $(obj).data("url");
    $.get(url, function (data)
    {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
        inicializandoEventosModalClientes();
    });
}
function btnBuscarDocumento_onclick(obj, event) {

    var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
        inicializandoEventosModalDocumentos();
    });
}
function btnBuscarPedido_onclick()
{
    var url = $("#btnBuscarPedido").data("url");
    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
        inicializandoEventosModalPedidos();
    });

}

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


function inicializandoEventosModalClientes() {

    $('#hdTipoDocumentoClientePOP').val($("#tper_int_id").val());
    $('#txtTipoDocumentoClientePOP').val($("#tper_int_id option:selected").html());
    $('#txtNDocumentoClientePOP').val($("#cli_str_documento").val());
   
    configurarGrillaClientes();
}

function inicializandoEventosModalDocumentos()
{
    $('#hdTipoDocumentoVPOP').val($("#tdoc_int_id").val());
    $('#ddlTDocumentoVPOP').val($("#tdoc_int_id").val());
    $('#txtNDocumentoVPOP').val($("#tdoc_str_numero").val());
    configurarGrillaDocumentos();
}
function inicializandoEventosModalPedidos()
{
    $('#txtPedido').val($("#pedidodelivery").val());
    configurarGrillaPedido();
}

function configurarGrillaClientes() {

    var grilla = $("#gridclientes");
    var pagergrilla = $("#gridclientespager");

    var tipodocumento = $("#hdTipoDocumentoClientePOP").val().trim();
    var numdocumento = $("#txtNDocumentoClientePOP").val();


    $.jgrid.defaults.width = 640;
    $.jgrid.defaults.height = 120;
    $.jgrid.defaults.responsive = true;
    var vdataurl = $(grilla).data("dataurl") + "?tDocumento=" + tipodocumento + "&numDocumento=" + numdocumento;

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['✓', '', '', 'Tipo', 'N° Documento', 'Nombres', 'Apellidos', 'E-mail', 'Telefono', 'Móvil', 'Dirección', 'Sexo'],
        colModel:
        [
            { key: false, name: 'cli_int_id', align: 'center', sortable: false, formatter: seleccionar_formmatterCliente },
            { key: true,  hidden: true, name: 'cli_int_id', align: 'center' },
            { key: false, hidden: true, name: 'tper_int_id', align: 'center' },
            { key: false, name: 'tper_str_codigo', align: 'center', sortable: false },
            { key: false, name: 'cli_str_documento', align: 'center', sortable: false },
            { key: false, name: 'cli_str_nombre',  align: 'center', sortable: false },
            { key: false, name: 'cli_str_apellido',  align: 'center', sortable: false },
            { key: false, hidden: true, name: 'cli_str_mail', width: '220', align: 'center', sortable: false },
            { key: false, hidden: true, name: 'cli_str_telefono', width: '100', align: 'center', sortable: false },
            { key: false, hidden: true, name: 'cli_str_movil', width: '100', align: 'center', sortable: false },
            { key: false, hidden: true, name: 'cli_str_direccion', width: '200', align: 'center', sortable: false },
            { key: false, hidden: true, name: 'cli_str_sexo', width: '50', align: 'center', sortable: false },
        ],
        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20],
        emptyrecords: 'No se encontraron registros',
        autoheight: true,
        responsive : true,
        //autowidth: true,
        shrinkToFit: true,
        jsonReader:
        {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            id: 0
        },
    });

}

function configurarGrillaDocumentos() {

    var grilla = $("#gridDocumentos");
    var pagergrilla = $("#gridDocumentospager");
    var tipodoccliente = $("#ddlTDocumentoClientePOP").val();
    var numdoccliente = $("#txtNDocumentoClientePOP").val();
    var tipodocumento = $("#ddlTDocumentoVPOP").val().trim();
    var numdocumento = $("#txtNDocumentoVPOP").val();

    $.jgrid.defaults.width = 850;
    $.jgrid.defaults.height = 120;
    $.jgrid.defaults.responsive = true;
    var vdataurl = $(grilla).data("dataurl") + "?tpersona=" + tipodoccliente + "&numDocCliente=" + numdoccliente + "&tDocumento=" + tipodocumento + "&numDocumento=" + numdocumento;

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['', '', '✓', 'Tipo', 'N° Documento', '', 'Tienda', 'Fecha', 'Cliente', 'Total'],
        colModel:
        [
            { key: true, hidden: true, name: 'nu_docu', align: 'center' },
            { key: false,hidden: true, name: 'tdoc_int_id', align: 'center' },
            { key: false, name: 'nu_docu',  align: 'center', sortable: false, formatter: seleccionar_formmatterDocumento },
            { key: false, name: 'ti_docu',  align: 'center',  sortable: false },
            { key: false, name: 'nu_docu', align: 'center', sortable: false },
            { key: false, hidden: true, name: 'co_empr',  align: 'center', sortable: false },
            { key: false, name: 'co_tien', align: 'center', sortable: false },
            { key: false, name: 'fe_docu',  align: 'center', sortable: false, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' } },
            { key: false, name: 'no_clie',  align: 'center', sortable: false },
            { key: false, name: 'im_tota',  align: 'center', sortable: false, formatter: 'currency', formatoptions: CONFIG_JQGRID.get('formatoptions_currency_pen') },
        ],
        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20],
        emptyrecords: 'No se encontraron registros',
        autoheight: true,
        //autowidth: true,
        shrinkToFit: true,
        multiselect: false,
        jsonReader:
        {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            id: 0
        },
    });

}
function configurarGrillaPedido() {

    var grilla = $("#gridPedidos");
    var pagergrilla = $("#gridPedidospager");
    var tipodoccliente = $("#ddlTDocumentoClientePOP").val();
    var numdoccliente = $("#txtNDocumentoClientePOP").val();
    var pedido = $("#txtPedido").val();

    $.jgrid.defaults.width = 850;
    $.jgrid.defaults.height = 120;
    $.jgrid.defaults.responsive = true;
    var vdataurl = $(grilla).data("dataurl") + "?tDocumento=" + tipodoccliente + "&numDocumento=" + numdoccliente + "&numPedido=" + pedido;

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['', '✓', 'Pedido', 'N° Documento', 'Cliente', 'Total','Fecha Pedido'],
        colModel:
        [
            { key: true, hidden: true, name: 'ped_int_id', align: 'center' },
            { key: false, name: 'ped_int_id', align: 'center', sortable: false, formatter: seleccionar_formmatterPedido },
            { key: false, name: 'ped_str_numero', align: 'center', sortable: false },
            { key: false, name: 'cli_str_dni', align: 'center', sortable: false },
            { key: false, name: 'ped_str_cliente', align: 'center', width: '220', sortable: false },
            { key: false, name: 'ped_dec_montototal', align: 'center', sortable: false, formatter: 'currency', formatoptions: CONFIG_JQGRID.get('formatoptions_currency_pen') },
            { key: false, name: 'ped_dat_fechapedido', align: 'center', sortable: false },
        ],
        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20],
        emptyrecords: 'No se encontraron registros',
        autoheight: true,
        //autowidth: true,
        shrinkToFit: true,
        multiselect: false,
        jsonReader:
        {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            id: 0
        },
    });

}

function BuscarClientePopUp_onClick() {

    var grilla = $("#gridclientes");
    var tipodocumento = $("#hdTipoDocumentoClientePOP").val().trim();
    var numdocumento = $("#txtNDocumentoClientePOP").val();
    var vdataurl = $(grilla).data("dataurl") + "?tDocumento=" + tipodocumento + "&numDocumento=" + numdocumento;

    $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');

}

function BuscarDocumentoPopUp_onClick() {

    var grilla = $("#gridDocumentos");
    var tipodoccliente = $("#ddlTDocumentoClientePOP").val();
    var numdoccliente = $("#txtNDocumentoClientePOP").val();
    var tipodocumento = $("#ddlTDocumentoVPOP").val().trim();
    var numdocumento = $("#txtNDocumentoVPOP").val();
    var vdataurl = $(grilla).data("dataurl") + "?tpersona=" + tipodoccliente + "&numDocCliente=" + numdoccliente + "&tDocumento=" + tipodocumento + "&numDocumento=" + numdocumento;
    
    $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');

}

function BuscarPedidosPopUp_onClick() {

    var grilla = $("#gridPedidos");
    var tipodoccliente = $("#ddlTDocumentoClientePOP").val();
    var numdoccliente = $("#txtNDocumentoClientePOP").val();
    var pedido = $("#txtPedido").val();
    var vdataurl = $(grilla).data("dataurl") + "?tDocumento=" + tipodoccliente + "&numDocumento=" + numdoccliente + "&numPedido=" + pedido;
    $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');

}

function seleccionar_formmatterCliente(cellvalue, options, rowObject) {
    var lnk = $("<button title='Seleccionar Cliente' type='button' class='btn btn-primary btn-outline btn-xs' ><i class='fa fa-check-circle-o'></i> Seleccionar </button>");
    $(lnk).attr("onClick", "ConfirmarTransferenciaCliente('" + cellvalue + '¬' + rowObject.tper_int_id + '¬' + rowObject.cli_str_documento + '¬' + rowObject.cli_str_nombre + '¬' + rowObject.cli_str_apellido + '¬' + rowObject.cli_str_mail + '¬' + rowObject.cli_str_telefono + '¬' + rowObject.cli_str_movil + '¬' + rowObject.cli_str_direccion + '¬' + rowObject.cli_str_sexo + "')");
    return $(lnk)[0].outerHTML;

}

function ConfirmarTransferenciaCliente(cellvalue) {
    var variable = cellvalue.split('¬');
    $('#cli_int_id').val(variable[0]);
    $('#tper_int_id').val(variable[1]);
    $('#cli_str_documento').val(variable[2]);
    $('#cli_str_nombres').val(variable[3]);
    $('#cli_str_apellidos').val(variable[4]);
    $('#cli_str_email').val(variable[5]);
    $('#cli_str_telfijo').val(variable[6]);
    $('#cli_str_telmovil').val(variable[7]);
    $('#cli_str_direccion').val(variable[8]);
    $('#cli_str_sexo').val(variable[9]);

    $("#modalcontainerIncidencias").modal("hide");
}

function seleccionar_formmatterDocumento(cellvalue, options, rowObject) {
    var lnk = $("<button type='button' class='btn btn-primary btn-outline btn-xs' ><i class='fa fa-check-circle-o'></i> Seleccionar </button>");
    $(lnk).attr("onClick", "ConfirmarTransferenciaDocumento('" + cellvalue + '¬' + rowObject.tdoc_int_id + '¬' + rowObject.co_empr + '¬' + rowObject.co_tien + '¬' + rowObject.fe_docu + "')");
    return $(lnk)[0].outerHTML;

}

function ConfirmarTransferenciaDocumento(cellvalue) {
    var variable = cellvalue.split('¬');
    $('#tdoc_str_numero').val(variable[0]);
    $('#tdoc_int_id').val(variable[1]);
    $('#tie_str_tiendahecho').val(variable[3]);
    $('#inc_dat_fechahecho').val(variable[4]);
    $("#modalcontainerIncidencias").modal("hide");

    var ti_docu = variable[1];
    var nu_docu = variable[0];
    var co_empr = variable[2];
    var co_tien = variable[3];

    var url = $('#tblIncidenciaDetalle').data("urldetail") + "?tDocumento=" + ti_docu + "&numDocumento=" + nu_docu + "&empresa=" + co_empr + "&tienda=" + co_tien;

    $.ajax(
            {
                type: "POST",
                async: true,
                url: url,
                success: function (data) {
                    if (data == false)
                    {
                        swal({ title: "¡Error!", text: "¡No se encontró el detalle del documento!", type: "error", confirmButtonText: "Aceptar" });
                    }
                },
                error: function (request, status, error) {
                    swal({ title: "¡Error!", text: "¡No se encontró el detalle del documento!", type: "error", confirmButtonText: "Aceptar" });
                }
            });

    oDetalleTable.draw();
}

function seleccionar_formmatterPedido(cellvalue, options, rowObject) {
    var lnk = $("<button type='button' class='btn btn-primary btn-outline btn-xs' ><i class='fa fa-check-circle-o'></i> Seleccionar </button>");
    $(lnk).attr("onClick", "ConfirmarTransferenciaPedido('" + cellvalue + '¬' + rowObject.ped_str_numero + "')");
    return $(lnk)[0].outerHTML;

}

function ConfirmarTransferenciaPedido(cellvalue) {
    var variable = cellvalue.split('¬');
    $('#pedidodelivery').val(variable[1]);
    $("#modalcontainerIncidencias").modal("hide");

    var idPedido = variable[0];
    var url = $('#tblIncidenciaDetalle').data("urlped") + "?pedido=" + idPedido ;

    $.ajax(
            {
                type: "POST",
                async: true,
                url: url,
                success: function (data) {
                    if (data == false) {
                        swal({ title: "¡Error!", text: "¡No se encontró el detalle del pedido!", type: "error", confirmButtonText: "Aceptar" });
                    }
                },
                error: function (request, status, error) {
                    swal({ title: "¡Error!", text: "¡No se encontró el detalle del pedido!", type: "error", confirmButtonText: "Aceptar" });
                }
            });

    oDetalleTable.draw();
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

function ValidarImei()
{
    var tienda = $("#co_tien").val();
    var Item = $("#txtDetCodigo").val();
    var Imei = $("#txtImeiValidar").val();
    var ImeiValido = $("#chkImeiValido").prop('checked');

    if (Imei == "" || Item == "")
    {
        swal({ title: "¡Error!", text: "¡Ingresar item y IMEI a validar!", type: "error", confirmButtonText: "Aceptar" });
    }
    else {

        var url = $('#btnAgregarDetalle').data("urlimei") + "?tienda=" + tienda + "&co_item=" + Item + "&imei=" + Imei;
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data)
                    {
                        if (data.res == true)
                        {
                            document.getElementById("txtImeiValidar").disabled = true;
                            $("#chkImeiValido").prop('checked', true);
                            swal("Resultado Validación",  data.mensaje, "success");
                        }
                        else
                        {
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

function SoloRegistrar()
{
    $("#ItemIncidencia").val("");
    var items_seleccionados = oDetalleTable.column(0).checkboxes.selected();

    $.each(items_seleccionados, function (index, rowId) {
        var valor  = $("#ItemIncidencia").val();
        $("#ItemIncidencia").val(valor + ',' + rowId);
    });

    if ($("#ItemIncidencia").val().length > 1) { $("#ItemIncidencia").val($("#ItemIncidencia").val().substring(1));}
    $("#soloregistro").val(true);
}

function RegistrarContinuar()
{
    $("#ItemIncidencia").val("");
    var items_seleccionados = oDetalleTable.column(0).checkboxes.selected();

    $.each(items_seleccionados, function (index, rowId)
    {
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
            text: "Se generó el N° de incidencia : " + jsonres.num_incidencia + " de forma correcta.",
            type: "success"
        },
        function ()
        {
            if (jsonres.soloregistro == true)
            {
                var vurl = $("#btnSoloRegistrar").data("url");
                window.location.href = vurl;
            }
            else
            {
                var vurl = $("#btnSoloRegistrarContinuar").data("url");
                window.location.href = vurl + "?inc_int_id=" + jsonres.incidencia;
            }

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