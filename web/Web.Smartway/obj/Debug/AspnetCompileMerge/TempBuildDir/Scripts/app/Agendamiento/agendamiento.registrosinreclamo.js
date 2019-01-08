const btnBuscarPersona = "#btnBuscarPersona";
const btnBuscarDocumento = "#btnBuscarDocumento";
const btnNuevoCliente = "#btnNuevoCliente";
const btnEditarCliente = "#btnEditarCliente";
const $btnAgregarDetalle = $("#btnAgregarDetalle");
$idfabricante = $("#idfabricante")
$idtipoproducto = $("#idtipoproducto")

const $btnNuevoDocumento = $("#btnNuevoDocumento")


$(document).ready(function ()
{
    inicio();


    $("#MenuIncidencia").children().css( "font-weight", "bold" );
    if($("#idincidencia").val() != '')
    {
        bloquearcontroles()
    }


    $("#frmRegistrarIncidencia").validate({


        errorClass: "error-class",
        validClass: "valid-class",
        errorElement: 'div',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        onError : function(){
            $('.input-group.error-class').find('.help-block.form-error').each(function() {
              $(this).closest('.form-group').addClass('error-class').append($(this));
            });
        },
        highlight: function(element, errorClass) {
            $(element).removeClass(errorClass);
        },
            
            
    });


   

});
function inicio()
{
    configuracionBotones();
    configurarFechas();
        // $(window).bind('resize', function () {
    //     var width = $('.jqGrid_wrapper').width();
    //     $('#gridclientes').setGridWidth(width);
    //     $('#gridDocumentos').setGridWidth(width);
    //     $('#gridDocumentos').setGridWidth(width);
    //     $('#gridArticulosReclamados').setGridWidth(width);
    // });
}
function configurarFechas()
{
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
}
function configuracionBotones()
{
    $(btnBuscarPersona).click(function (event)   { btnBuscarPersona_onclick(this, event); });
    $(btnBuscarDocumento).click(function (event) { 
        btnBuscarDocumento_onclick(this, event); 
        $btnNuevoDocumento.removeAttr("disabled","disabled")

    });
    $(btnNuevoCliente).click(function (event) { btnAgregarCliente_onclick(this, event); });

    


    $btnNuevoDocumento.click(function (event){

        $btnNuevoDocumento.attr("disabled","disabled")

    
        $('#numerocomprobante').removeAttr("disabled")
        $('#idtipodocumentocompra').removeAttr("disabled")
        $('#idsucursalventa').removeAttr("disabled")
        $('#fechaemision').removeAttr("disabled")




    })

    $(btnEditarCliente).click(function (event) {
       let idcliente = $("#idcliente").val();
       if(idcliente=='')
              swal("No se puede editar", "Debe seleccionar a un cliente" , "warning");
       else
              btnEditarCliente_onclick(idcliente);
    });
    


    $idfabricante.change(function (){  cargarProducto();   });
    $idtipoproducto.change(function (){  cargarProducto();  });



    $("#idproducto").change(function (e) { 
        e.preventDefault();
        let vdataurl = UrlHelper.Action("ObtenerProducto","Agendamiento","Agendamiento")

        let idproducto = $("#idproducto").val()


        $.ajax({
            type: "POST",
            url:  vdataurl,
            data: { "idproducto": idproducto  },
            dataType: "json",
            success: function (response) {

                if(response.requiereserie)
                {
                    $("#requiereserie").attr('checked','checked')
                    $("#txtSerie").attr("required", true)
                    //$("#txtImei").removeAttr("required")
                }
                else {
                    $("#requiereserie").removeAttr('checked')
                    $("#txtSerie").removeAttr("required")
                }
                if(response.requiereimei)
                {
                    $("#txtSolicitarImei").attr('checked','checked')
                    $("#txtImei").attr("required", true)
                    //  $("#txtSerie").removeAttr("required", true)
                }
                else{
                    $("#txtSolicitarImei").removeAttr('checked')
                    $("#txtImei").removeAttr("required")
                }
                
            }
        });


        
    });
    $('#txtImei').blur(function (){

        if( this.value != "")
             ValidarImei();
    });
    $('#txtSerie').blur(function (){
        if(this.value != "")
             ValidarSerie();
    });

    var config = {
        '.chosen-select': {max_selected_options: 5 ,
             allow_single_deselect: false ,
             no_results_text: 'Oops, no se encontró el ubigeo!' }

    }

    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }

}

function inicializandoEventosModal()
{


    $("#ddlDetalleProducto").change(function (event){
           
        let vurl = UrlHelper.Action("ObtenerProducto","Agendamiento","Agendamiento")
        $.ajax({
            type: "POST",
            url: vurl,
            data: {"idproducto" : $("#ddlDetalleProducto").val() },
            dataType: "JSON",
            success: function (response) {
                

                $("#txtDetCodigo").val(response.codigoproducto)
                $("#txtDetDescripcion").val(response.descripcionlarga)
                $("#txtDetCodigo").val(response.codigoproducto)
                $("#txtDetCodigo").val(response.codigoproducto)





            }
        });

    })

     var config = {
            '.chosen-select': {max_selected_options: 5 ,
                 allow_single_deselect: false ,
                 no_results_text: 'Oops, no se encontró el ubigeo!' }

        }

        for (var selector in config) {
            $(selector).chosen(config[selector]);
        }



}

function btnBuscarPersona_onclick(obj, event) {
    var url = $(obj).data("url");

    $.get(url, function (data)
    {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
        configurarGrillaClientes()
    });
}



function inicializandoEventosModalClientes() {

    $('#hdTipoDocumentoClientePOP').val($("#tper_int_id").val());
    $('#txtTipoDocumentoClientePOP').val($("#tper_int_id option:selected").html());
    $('#txtNDocumentoClientePOP').val($("#cli_str_documento").val());

    configurarGrillaClientes();
}



function configurarGrillaClientes() {

    var grilla = $("#gridclientes");
    var pagergrilla = $("#gridclientespager");

    var tipodocumento = $("#hdTipoDocumentoClientePOP").val().trim();
    var numdocumento = $("#txtNDocumentoClientePOP").val();


    $.jgrid.defaults.width = 640;
    $.jgrid.defaults.height = 220;
    $.jgrid.defaults.responsive = true;
    var vdataurl = $(grilla).data("dataurl") + "?tDocumento=" + tipodocumento + "&numDocumento=" + numdocumento;

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['✓', '', '', 'Tipo', 'N° Documento', 'Nombres', 'E-mail', 'Telefono', 'Móvil', 'Dirección'],
        colModel:
        [
            { key: false, name: 'idcliente', align: 'center', sortable: false, formatter: seleccionar_formmatterCliente },
            { key: true,  hidden: true, name: 'idcliente', align: 'center' },
            { key: false, hidden: true, name: 'idtipodocumento', align: 'center' },
            { key: false, name: 'tipodocumento', align: 'center', sortable: false },
            { key: false, name: 'numerodocumento', align: 'center', sortable: false },
            { key: false, name: 'nombre',  align: 'center', sortable: false },
            { key: false, hidden: true, name: 'email', width: '220', align: 'center', sortable: false },
            { key: false, hidden: true, name: 'telefono', width: '100', align: 'center', sortable: false },
            { key: false, hidden: true, name: 'celular', width: '100', align: 'center', sortable: false },
            { key: false, hidden: true, name: 'direccion', width: '200', align: 'center', sortable: false },
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

function seleccionar_formmatterCliente(cellvalue, options, rowObject) {
    var lnk = $("<button title='Seleccionar Cliente' type='button' class='btn btn-primary btn-outline btn-xs' ><i class='fa fa-check-circle-o'></i> Seleccionar </button>");
    $(lnk).attr("onClick", "ConfirmarTransferenciaCliente('" + cellvalue + '¬' + rowObject.idtipodocumento + '¬' + rowObject.numerodocumento + '¬' + rowObject.nombre + '¬' + rowObject.email + '¬' + rowObject.telefono + '¬' + rowObject.celular + '¬' + rowObject.direccion + "')");
    return $(lnk)[0].outerHTML;

}

function ConfirmarTransferenciaCliente(cellvalue) {
    var variable = cellvalue.split('¬');
    $('#idcliente').val(variable[0]);
    $('#idtipodocumento').val(variable[1]);
    $('#numerodocumento').val(variable[2]);
    $('#nombrecliente').val(variable[3]);
    $('#email').val(variable[4]);
    $('#telefono').val(variable[5]);
    $('#celular').val(variable[6]);
    $('#direccion').val(variable[7]);

    $('#numerodocumento').valid();


    $("#modalcontainerIncidencias").modal("hide");
}

function BuscarClientePopUp_onClick() {

    var grilla = $("#gridclientes");

    var tipodocumento = $("#ddltipodocumento").val();
    var numdocumento = $("#txtNDocumentoClientePOP").val();

    var vdataurl =   UrlHelper.Action("JsonGetListarClientes","Agendamiento","Agendamiento")  
     + "?tDocumento=" + tipodocumento + "&numDocumento=" + numdocumento;

    $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');

}







function ValidarImei()
{
    var Item = $("#txtDetCodigo").val();
    var Imei = $("#txtImeiValidar").val();
    var ImeiValido = $("#chkImeiValido").prop('checked');

    if (Imei == "" || Item == "")
    {
        swal({ title: "¡Error!", text: "¡Ingresar item y IMEI a validar!", type: "error", confirmButtonText: "Aceptar" });
    }
    else {

        var url = $('#txtImeiValidar').data("url") + "?co_item=" + Item + "&imei=" + Imei;
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data) {

                        
                        if (data.result == true)
                        {
                            $("#chkImeiValido").prop('checked', true);
                            swal("Resultado Validación", "El IMEI es válido.", "success");
                        }
                        else
                        {
                            $("#chkImeiValido").prop('checked', false);
                            swal("Resultado Validación", "El IMEI es inválido.", "error");
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al validar el IMEI!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
    }
}



function SoloRegistrar()
{



    $("#ItemIncidencia").val("");

    var  items_seleccionados  = $grilladetalledocumento.jqGrid('getGridParam', 'selarrrow');
    if(items_seleccionados=='')
    {
       swal("No puede continuar", "Debe seleccionar un elemento" , "warning");
       event.preventDefault();
    }
    count = 0;
    $.each(items_seleccionados, function (index, rowId) {
        count ++
        var id =  $grilladetalledocumento.jqGrid('getCell', rowId, 'idproducto');
       $("#ItemIncidencia").val(id);
    });
    if(count > 1)
    {
        event.preventDefault();
        swal("No se puede continuar", "Debe seleccionar solo un item", "warning");
    }

 

}

function RegistrarSinGarantia()
{
    $("#serie").val( $("#txtSerie").val() );
    $("#imei").val( $("#txtImei").val() );
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
            let url = "";
             if(jsonres.engarantia){
                url = UrlHelper.Action("AtencionEvaluacion","Agendamiento","Agendamiento") + "?idincidencia=" + jsonres.incidencia;
             }
             else{
                url = UrlHelper.Action("EstadoFisico","Agendamiento","Agendamiento")+ "?idincidencia=" + jsonres.incidencia;
             }
             window.location.href = url;
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

function btnAgregarCliente_onclick(obj, event) {
    var url = UrlHelper.Action("AgregarClienteModal", "Agendamiento", "Agendamiento")
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");


        var config = {
            '.chosen-select': {max_selected_options: 5 ,
                 allow_single_deselect: false ,
                 no_results_text: 'Oops, no se encontró el ubigeo!' }

        }

        for (var selector in config) {
            $(selector).chosen(config[selector]);
        }
    });
}
function btnEditarCliente_onclick(id)
{
    var url = UrlHelper.Action("EditarClienteModal", "Agendamiento", "Agendamiento") + "?id=" + id;

    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");

        var config = {
            '.chosen-select': {max_selected_options: 5 ,
                 allow_single_deselect: false ,
                 no_results_text: 'Oops, no se encontró el ubigeo!' }

        }

        for (var selector in config) {
            $(selector).chosen(config[selector]);
        }
    });
}
function OnCompleteTransaction_Cliente(xhr, status)
{
    var jsonres = xhr.responseJSON;
    
    if (jsonres.res == true)
    {
        swal({
            title: "Actualización Completa",
            text: "Se actualizó el cliente de forma correcta.",
            type: "success"
        },
        function ()
        {
            $('#idtipodocumento').val(jsonres.idtipodocumento);
            $('#numerodocumento').val(jsonres.numerodocumento);
            $('#nombrecliente').val(jsonres.nombre);
            $('#email').val(jsonres.email);
            $('#telefono').val(jsonres.telefono);
            $('#celular').val(jsonres.celular);
            $('#direccion').val(jsonres.direccion);
            $("#idcliente").val(jsonres.idcliente);
            $("#modalcontainer").modal("hide");
        });
    }
    else
    {
        sweetAlert("Verificar Errores", null, "error");
        CheckValidationErrorResponse(jsonres);
    }


}
function ValidarImei()
{
}
function ValidarSerie()
{
}
function bloquearcontroles()
{
    if($("#editarsucursal").val() == "True")
    {
        $("#idsucursal").removeAttr("disabled");
    }

    $("#idsucursal").attr("disabled", "True")
    $("#btnBuscarPersona").attr("disabled", "True")
    $("#btnEditarCliente").attr("disabled", "True")
    $("#btnNuevoCliente").attr("disabled", "True")
    $("#idpartner").attr("disabled", "True")
    $("#idtipodocumentocompra").attr("disabled", "True")
    $("#numerocomprobante").attr("disabled", "True")
    $("#btnBuscarDocumento").attr("disabled", "True")
    $("#fechaemision").attr("disabled", "True")
    $("#idsucursalventa").attr("disabled", "True")
    $("#descripcion").attr("disabled", "True")
    $("#idsintoma").attr("disabled", "True")
    $("#idrequerimientocliente").attr("disabled", "True")
    
    
}






function cargarProducto(){

    let idtipoproducto = $idtipoproducto.val()
    let idfabricante = $idfabricante.val()
  
    if(idtipoproducto == '') return
    if(idfabricante == '') return

    let vurl = UrlHelper.Action("cargarProductos","Agendamiento","Agendamiento")

    $.ajax({
        type: "POST",
        url: vurl,
        data:  {idtipoproducto :idtipoproducto , idfabricante: idfabricante   } ,
        dataType: "JSON",
        success: function (response) {

            var $select = $('#idproducto');
            $select.empty();      
            
            $select.append('<option value="">[--]</option>');
            $.each(response, function (i, state) {
                $('<option>', {
                    value: state.Value
                }).html(state.Text).appendTo($select);
            });
            $select.trigger("chosen:updated")

        }
    });

    

}