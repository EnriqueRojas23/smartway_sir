const btnBuscarPersona = "#btnBuscarPersona";
const btnBuscarDocumento = "#btnBuscarDocumento";
const btnNuevoCliente = "#btnNuevoCliente";
const btnEditarCliente = "#btnEditarCliente";
const $btnAgregarDetalle = $("#btnAgregarDetalle");



const $grilladetalledocumento =  $("#griddetalledocumento")
const $pagergrilladetalledocumento = $("#griddetalledocumentopager")

const $btnNuevoDocumento = $("#btnNuevoDocumento")


$(document).ready(function ()
{
    inicio();
   $("#MenuIncidencia").children().css( "font-weight", "bold" );

    if($("#idincidencia").val() != '')
    {
        $("#MenuIncidencia").children().html("")
        $("#MenuIncidencia").children().append("<span class='label label-danger'>Ver Incidencia</span>")
        bloquearcontroles()
    }
    else
    {

        $("#MenuIncidencia").children().html("")
        $("#MenuIncidencia").children().append("<span class='label label-danger'>Atención Incidencias</span>")

    }


    $("#frmRegistrarIncidencia").validate({
        ignore: '*:not([name])',
        errorClass: "error-class",
        validClass: "valid-class",
        errorElement: 'div',
        errorPlacement: function(error, element) {
            if (element.data().chosen) { 
                element.next().after(error);
            } else {
                element.after(error);
            }
             if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
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
    CargarGrillaDetalle();
    configurarFechas();
        // $(window).bind('resize', function () {
    //     var width = $('.jqGrid_wrapper').width();
    //     $('#gridclientes').setGridWidth(width);
    //     $('#gridDocumentos').setGridWidth(width);
    //     $('#gridDocumentos').setGridWidth(width);
    //     $('#gridArticulosReclamados').setGridWidth(width);
    // });

        
    $('#numerocomprobante').attr("disabled","disabled")
    $('#idtipodocumentocompra').attr("disabled","disabled")
    $('#fechaemision').attr("disabled","disabled")

}
function configurarFechas()
{


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
    
    $("#idpartner").change(function (){
       
      listarSucursales()

    });

    $(btnNuevoCliente).click(function (event) { btnAgregarCliente_onclick(this, event); });

    $btnAgregarDetalle.click(function (event) {
         
        let vurl = UrlHelper.Action("AgregarDetalleIncidenciaModal","Agendamiento","Agendamiento")
        $.get(vurl, function (data) {

            $("#modalcontent").html(data);
            $("#modalcontainer").modal("show");

           

            inicializandoEventosModal()





        });
    })


    $btnNuevoDocumento.click(function (event){

        let vurl = UrlHelper.Action("AgregarDocumentoModal","Agendamiento","Agendamiento")
        $.get(vurl, function (data) {

            $("#modalcontent").html(data);
            $("#modalcontainer").modal("show");

            $('#fechaemision').attr('autocomplete','off');

            $('#data_2 .input-group.date').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: 'dd/mm/yyyy'
            });
            

        });



    })

    $(btnEditarCliente).click(function (event) {
       let idcliente = $("#idcliente").val();
       if(idcliente=='')
              swal("No se puede editar", "Debe seleccionar a un cliente" , "warning");
       else
              btnEditarCliente_onclick(idcliente);
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

        $("#frmAgregarDetalle").validate({
                ignore: '*:not([name])',
                errorClass: "error-class",
                validClass: "valid-class",
                errorElement: 'div',
                errorPlacement: function(error, element) {
                    if (element.data().chosen) { 
                        element.next().after(error);
                    } else {
                        element.after(error);
                    }

                     if(element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
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

                if(response.requiereserie){
                    $("#requiereserie").attr('checked','checked')
                    $("#txtSolicitarImei").attr("required", true)
                    $("#txtSolicitarImei").removeAttr("required")

                   
                }
                if(response.requiereimei){
                    $("#requiereimei").attr('checked','checked')
                    $("#txtSolicitarSerie").attr("required", true)
                    $("#txtSolicitarSerie").removeAttr("required")

                   
                }
                





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

        $("#txtNDocumentoClientePOP").keypress(function (event) {
            if (event.which == 13) {
                BuscarClientePopUp_onClick();
            }
        });


        configurarGrillaClientes()
    });
}
function btnBuscarDocumento_onclick(obj, event) {
      var url = $(obj).data("url");
     $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");

        configurarGrillaDocumentos()



    });
}


function inicializandoEventosModalClientes() {

    $('#hdTipoDocumentoClientePOP').val($("#tper_int_id").val());
    $('#txtTipoDocumentoClientePOP').val($("#tper_int_id option:selected").html());
    $('#txtNDocumentoClientePOP').val($("#cli_str_documento").val());

    configurarGrillaClientes();
}

function inicializandoEventosModalDocumentos()
{
     $('#ddlTDocumentoVPOP').val($("#idtipodocumentocompra").val());
    $("#txtNDocumentoVPOP").val($("#numerocomprobante").val());

    configurarGrillaDocumentos();
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
        colNames: ['', '', '✓', 'Tipo', '','','','N° Documento', 'Fecha', 'Cliente', 'Total'],
        colModel:
        [
            { key: true, hidden: true, name: 'numerocomprobante', align: 'center' },
            { key: false,hidden: true, name: 'idtipocomprobante', align: 'center' },
            { key: false, name: 'iddocumentocompra',  align: 'center', sortable: false, formatter: seleccionar_formmatterDocumento },
            { key: false, name: 'tipodocumentocompra',  align: 'center',  sortable: false },
            { key: false, hidden: true,name: 'idtipodocumentocompra',  align: 'center',  sortable: false },
            { key: false, hidden: true,name: 'idsucursalventa',  align: 'center',  sortable: false },
            { key: false, hidden: true,name: 'idpartner',  align: 'center',  sortable: false },
            { key: false, name: 'numerocomprobante', align: 'center', sortable: false },
            { key: false, name: 'fechaemision',  align: 'center', sortable: false, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' } },
            { key: false, name: 'nombrecliente',  align: 'center', sortable: false },
            { key: false, name: 'total',  align: 'center', sortable: false, formatter: 'currency', formatoptions: CONFIG_JQGRID.get('formatoptions_currency_pen') },
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

    var tipodocumento = $("#ddltipodocumento").val();
    var numdocumento = $("#txtNDocumentoClientePOP").val();

    var vdataurl =   UrlHelper.Action("JsonGetListarClientes","Agendamiento","Agendamiento")  
     + "?tDocumento=" + tipodocumento + "&numDocumento=" + numdocumento;

    $(grilla).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');

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

function seleccionar_formmatterDocumento(cellvalue, options, rowObject) {
    var lnk = $("<button type='button' class='btn btn-primary btn-outline btn-xs' ><i class='fa fa-check-circle-o'></i> Seleccionar </button>");
    $(lnk).attr("onClick", "SeleccionarDocumento('" + cellvalue + '¬' + rowObject.numerocomprobante + '¬' + rowObject.idtipodocumentocompra + '¬' + rowObject.idsucursalventa + '¬' +  rowObject.fechaemision + '¬' +  rowObject.idpartner + "')"); 

    return $(lnk)[0].outerHTML;

}

function SeleccionarDocumento(cellvalue) {



   var variable = cellvalue.split('¬');


    let URL_ValidarProducto = UrlHelper.Action("ValidarProductoInventario","Agendamiento","Agendamiento");

     $.ajax({
         url: URL_ValidarProducto,
         type: 'POST',
         dataType: 'json',
         data: {
                iddocumentocompra: variable[0]
        },
     })
     .done(function(data) {
         if(!data.res)
         {
            swal({ title: "No puede continuar", text: data.msj , type: "warning", confirmButtonText: "Aceptar" });
                $('#iddocumentocompra').val('');
                $('#numerocomprobante').val('');
                $('#idtipodocumentocompra').val('');
                $('#fechaemision').val('');
                $("#idpartner").val('');    
                $("#idpartner").trigger('chosen:updated')
                $('#idsucursalventa').empty();
                reload();
            return 
         }
         else
         {
                $('#iddocumentocompra').val(variable[0]);
                $('#numerocomprobante').val(variable[1]);
                $('#idtipodocumentocompra').val(variable[2]);
                $('#fechaemision').val(variable[4]);
                $("#idpartner").val(variable[5]);    
                $("#idpartner").trigger('chosen:updated')


                   let url  = UrlHelper.Action("JsonListarSucursales", "Agendamiento", "Agendamiento");
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: {"idpartner" : $("#idpartner").val() },
                        dataType: "JSON",
                        success: function (response) {
                            var $select = $('#idsucursalventa');
                            $select.empty();
                            $("#idsucursalventa").append('<option value="">[Sucursales]</option>');
                            $.each(response, function (i, state) {
                                $('<option>', {
                                    value: state.Value
                                }).html(state.Text).appendTo($select);
                            });
                            $("#idsucursalventa").val(variable[3]);
                        }
                    }); 
                    reload();
                 
         }
     })
     .fail(function() {
         console.log("error");
     })
       
     
       $("#modalcontainerIncidencias").modal("hide");
  

}
function reload()
{
    var vdataurl = $grilladetalledocumento.data("url") + "?iddocumentocompra=" + $('#iddocumentocompra').val();
    $grilladetalledocumento.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function seleccionar_formmatterPedido(cellvalue, options, rowObject) {
    var lnk = $("<button type='button' class='btn btn-primary btn-outline btn-xs' ><i class='fa fa-check-circle-o'></i> Seleccionar </button>");
    $(lnk).attr("onClick", "ConfirmarTransferenciaPedido('" + cellvalue + '¬' + rowObject.ped_str_numero + "')");
    return $(lnk)[0].outerHTML;

}




function CargarGrillaDetalle()
{
            $.jgrid.defaults.height = 120;
            $.jgrid.defaults.responsive = true;
            var vdataurl = $grilladetalledocumento.data("url") //+ "?tpersona=" + tipodoccliente + "&numDocCliente=" + numdoccliente + "&tDocumento=" + tipodocumento + "&numDocumento=" + numdocumento;
            //'✓'

            
            $grilladetalledocumento.jqGrid({
                url: vdataurl + "?iddocumentocompra=" + $("#iddocumentocompra").val() ,
                datatype: 'json',
                mtype: 'POST',
                colNames: ['', '' ,'Código' , 'Descripción' ,'IMEI','Serie', 'Cant. Vendida', 'Total'],
                colModel:
                [
                    { key: true, hidden: true, name: 'iddetallecomprobantecliente', align: 'center' },
                    { key: true, hidden: true, name: 'idproducto', align: 'center' },
                    { key: false, name: 'codigoproducto', width:'190', align: 'center',  sortable: false,  formatter: formateditcolor  },
                    { key: false, name: 'descripcionlarga', width:'510',  align: 'center',  sortable: false,  formatter: formatedit  },
                    { key: false, name: 'imei',  align: 'center', width:'210',  sortable: false,  formatter: formatedit  },
                    { key: false, name: 'serie',  align: 'center',  sortable: false,  formatter: formatedit  },
                    { key: false, name: 'cantidad',  align: 'center', width:'220', sortable: false,  formatter: formatedit  },
                    { key: false, name: 'total',  align: 'center', width:'120', sortable: false,formatter: formatedit  },
                ],
                pager: $pagergrilladetalledocumento,
                rowNum: 10,
                rowList: [10, 20],
                emptyrecords: 'No se encontraron registros',
                autoheight: true,
                autowidth: true,
                shrinkToFit: true,
                multiselect: true,
                multiboxonly:true,
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

function AgregarDetalle()
{

    if(!$("#frmAgregarDetalle").valid())
          return;

    var id_producto = $("#ddlDetalleProducto").val();
    var co_item = $("#txtDetCodigo").val();
    var co_desc = $("#txtDetDescripcion").val();
    var precio = $("#txtDetPrecio").val();
    var serie = $("#txtSolicitarSerie").val();
    var imei = $("#txtSolicitarImei").val();



    // if($("#fechaemision").val() == '')
    // {
    //   swal({ title: "Completar Datos", text: "Debe ingresar un documento", type: "warning", confirmButtonText: "Aceptar" });
    //   return 
    // }
    if($("#requiereserie").is(':checked'))
    {
        if(serie=='')
        {
            swal({ title: "Completar Datos", text: "Este producto requiere de una serie", type: "warning", confirmButtonText: "Aceptar" });
            return;
        }
    }
    if($("#requiereimei").is(':checked'))
    {
        if(imei=='')
        {
            swal({ title: "Completar Datos", text: "Este producto requiere de un imei", type: "warning", confirmButtonText: "Aceptar" });
            return;
        }
    }
    
    if (id_producto == "")
    {
        swal({ title: "Completar Datos", text: "Seleccione un Producto", type: "warning", confirmButtonText: "Aceptar" });
        return 
    }
    else 
    {
         let vurl  = UrlHelper.Action("AgregarDetalleIncidencia","Agendamiento","Agendamiento")
         $.ajax(
                   {
                            type: "POST",
                            url: vurl,
                            data: {
                                "idproducto" : id_producto,
                                "serie" : serie,
                                "imei" : imei ,
                                "precio" : precio ,
                                "fechaemision" : $("#fechaemision").val()
                            },
                            success: function (data) {
                                if (data.res == false) {
                                    swal({ title: "No puede continuar", text: data.msj , type: "warning", confirmButtonText: "Aceptar" });
                                }
                            },
                            error: function (request, status, error) {
                                swal({ title: "¡Error!", text: "¡Ocurrió un error al agregar el detalle!", type: "error", confirmButtonText: "Aceptar" });
                            }
                        });

                $("#modalcontainer").modal("hide");
                reload()
        }
   
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
    $numerocomprobante = $("#numerocomprobante")
    if($numerocomprobante.val() == ''){
        swal("No puede continuar", "Debe ingresar un comprobante de pago" , "warning");
        event.preventDefault();
        return ;
    }


    $("#ItemIncidencia").val("");
    var  items_seleccionados  = $grilladetalledocumento.jqGrid('getGridParam', 'selarrrow');
    if(items_seleccionados==''){
       swal("No puede continuar", "Debe seleccionar un elemento" , "warning");
       event.preventDefault();
       return ;
    }
    count = 0;
    $.each(items_seleccionados, function (index, rowId) {
        count ++
        var id =  $grilladetalledocumento.jqGrid('getCell', rowId, 'idproducto');
       $("#ItemIncidencia").val(id);
    });

    if(count > 1){
        event.preventDefault();
        swal("No se puede continuar", "Debe seleccionar solo un item", "warning");
    }

 

}

function RegistrarSinGarantia()
{
    $("#serie").val( $("#txtSerie").val() );
    $("#imei").val( $("#txtImei").val() );
}


function OnCompleteTransaction_Comprobante(xhr, status)
{
    var jsonres = xhr.responseJSON;
    CleanValidationError();

    var dateString = jsonres.fechaemision.substr(6);
    var currentTime = new Date(parseInt(dateString ));
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    var date = day + "/" + month + "/" + year;

    $('#numerocomprobante').val(jsonres.numerocomprobante);
    $('#idtipodocumentocompra').val(jsonres.idtipodocumento);
    $('#fechaemision').val(date);
    $("#iddocumentocompra").val('')
    $grilladetalledocumento.jqGrid("clearGridData");

    $("#modalcontainer").modal("hide");

}

function OnCompleteTransaction_RegistrarIncidencia(xhr, status)
{
    var jsonres = xhr.responseJSON;
    CleanValidationError();

    if (jsonres.res == true){
        swal({
            title: "Registro Completo",
            text: "Se generó el N° de incidencia : " + jsonres.num_incidencia + " de forma correcta.",
            type: "success"
        },
        function (){
            if(jsonres.engarantia== true)
            {


                let url = UrlHelper.Action("AtencionEvaluacion","Evaluacion","Agendamiento") + "?idincidencia=" + jsonres.incidencia;
                window.location.href = url;
            }
            else
            {
               swal("El producto no cuenta con garantía", "El producto seleccionado no cuenta con una garantía en el sistema o esta no ha sido registrada.", "warning")

                var url = UrlHelper.Action("Propuesta", "Propuesta", "Agendamiento") + "?idincidencia=" + jsonres.incidencia;
                window.location = url

            }
        });
    }
    else{
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

        $("#frmNuevoCliente").validate({
            ignore: '*:not([name])',
            errorPlacement: function(error, element) {
                if (element.data().chosen) { 
                    element.next().after(error);
                } else {
                    element.after(error);
                }
                 if(element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } 
              
            },
            
        })

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
        
        $("#frmEditarCliente").validate({
            ignore: '*:not([name])',
            errorPlacement: function(error, element) {
                if (element.data().chosen) { 
                    element.next().after(error);
                } else {
                    element.after(error);
                }
                 if(element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } 
              
            },
            
        })
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
        });
    }
    else
    {
        sweetAlert("Verificar Errores", jsonres.msj , "error");
    }

    $("#modalcontainer").modal("hide");
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
    $("#numerodocumento").attr("disabled", "True")
    $("#idfalla").attr("disabled", "True")

    $("#idfalla").trigger("chosen:updated")

    
    
}
function pendiente(){
    swal("Debe completar la evaluación","La evaluación no ha sido completada","warning")
}
function listarSucursales(){
      let url  = UrlHelper.Action("JsonListarSucursales", "Agendamiento", "Agendamiento");
        $.ajax({
            type: "POST",
            url: url,
            data: {"idpartner" : $("#idpartner").val() },
            dataType: "JSON",
            success: function (response) {
                var $select = $('#idsucursalventa');
                $select.empty();
                $("#idsucursalventa").append('<option value="">[Sucursales]</option>');
                $.each(response, function (i, state) {
                    $('<option>', {
                        value: state.Value
                    }).html(state.Text).appendTo($select);
                });


                    // $select[0].selectedIndex = 1;
                    // $select.change();

            }
        }); 
}
