var oDocumentosTable;
var oDocumentosSobrantesTable;
var btnNoRecepcionarTodo  = "#btnNoRecepcionarTodo";
var btnFinalizarRecepcion = "#btnFinalizarRecepcion";
var RecepcionFinalizada;

$(document).ready(function ()
{
    RecepcionFinalizada = $("#recepcionFinalizada").val();
    document.getElementById('txtEscanDocumento').focus();

    if (RecepcionFinalizada == "True" )
    {
        CargaDetalleGuiaRecepcionada();
    }
    else
    {
        CargaDetalleGuia();
    }


    $(btnNoRecepcionarTodo).click(function (event) { btnNoRecepcionarTodo_onclick(this, event); });
    $(btnFinalizarRecepcion).click(function (event) { btnFinalizarRecepcion_onclick(this, event); });

});



function CargaDetalleGuia()
{
    oDocumentosTable =
       $('.dataTables-tblDetalleGuia').DataTable({
           responsive: true,
           "searching": false,
           "ordering": false,
           "processing": false,
           "serverSide": true,
           "ajax": {
               "url": $('#tblDetalleGuia').data("url"),
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                    {
                        "key": true, "title": "Id", "data": "dci_int_id", "name": "dci_int_id", "autoWidth": true, "class": "text-center",
                        "mRender":
                        function (data, type, full) 
                        {
                            return "<span class='label'>" + " " + data + " " + "</span>";
                        }
                    },
                   {
                       "title": "Documento", "data": "documento_interno", "name": "documento_interno", "autoWidth": true, "class": "text-center",
                       "mRender":
                        function (data, type, full)
                        {
                            var recepcion = full.dci_bit_recepciontienda;
                            if (recepcion == true)
                            {
                                return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                            }
                            else
                            {
                                return "<span class='label label-default'>" + " " + data + " " + "</span>";
                            }
                        }
                   },
                   {
                       "title": "Item", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true,

                       "mRender": function (data, type, full)
                       {
                           var documento = full.documento_coincide;

                           if (RecepcionFinalizada != "True")
                           {
                               if (documento == true) {
                                   return "<span class='label label-primary text-center'>" + " " + data + " " + "</span>";
                               }
                               else {
                                   return "<span class='label label-danger text-center'>" + " " + data + " " + "</span>";

                               }
                           }
                           else
                           {
                               return "<span>" + " " + data + " " + "</span>";
                           }
                       }

                   },
                   { "title": "Descripción", "data": "pro_str_descripcion", "name": "pro_str_descripcion", "autoWidth": true, "class": "text-center" },
                   { "title": "IMEI", "data": "pro_str_serieimei", "name": "pro_str_serieimei", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "IMEI Coincide ✔", "data": "imei_coincide", "name": "imei_coincide", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           var requiere = full.requiere_imei;
                           var imei = data;

                           if (RecepcionFinalizada == "True")
                           {
                               if (requiere == false)
                               {
                                   return "<span class='label label-primary'>" + " " + "NO REQUIERE" + " " + "</span>";
                               }
                               else 
                               {

                                  return "<span class='label label-primary'>" + " " + "SI" + " " + "</span>";
                               }
                           }
                           else
                           {
                               if (requiere == false)
                               {
                                   return "<span class='label label-default'>" + " " + "NO REQUIERE" + " " + "</span>";
                               }
                               else
                               {
                                   if (imei == true)
                                   {
                                       return "<span class='label label-primary'>" + " " + "SI" + " " + "</span>";
                                   }
                                   else {
                                       return "<span class='label label-danger'>" + " " + "NO" + " " + "</span>";
                                   }
                               }
                           }
                       }
                   },
                   {
                       "title": "Recepción", "data": "dci_bit_recepciontienda", "name": "dci_bit_recepciontienda", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           var recepcion = data;

                           if (recepcion == true)
                           {
                               return "<span class='label label-primary'>" + " " + "SI" + " " + "</span>";
                           }
                           else
                           {
                               return "<span class='label label-danger'>" + " " + "NO" + " " + "</span>";
                           }
                       }
                   },
                  

           ]
       });
}

function CargaDetalleGuiaRecepcionada()
{
    oDocumentosTable =
       $('.dataTables-tblDetalleGuia').DataTable({
           responsive: true,
           "searching": false,
           "ordering": false,
           "processing": false,
           "serverSide": true,
           "ajax": {
               "url": $('#tblDetalleGuia').data("url"),
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                    {
                        "key": true, "title": "Id", "data": "dci_int_id", "name": "dci_int_id", "autoWidth": true, "class": "text-center",
                        "mRender":
                        function (data, type, full) {
                            return "<span class='label'>" + " " + data + " " + "</span>";
                        }
                    },
                   {
                       "title": "Documento", "data": "documento_interno", "name": "documento_interno", "autoWidth": true, "class": "text-center",
                       "mRender":
                        function (data, type, full) {
                            var recepcion = full.dci_bit_recepciontienda;
                            if (recepcion == true) {
                                return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                            }
                            else {
                                return "<span class='label label-default'>" + " " + data + " " + "</span>";
                            }
                        }
                   },
                   {
                       "title": "Item", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true,

                       "mRender": function (data, type, full) {
                           var documento = full.documento_coincide;

                           if (RecepcionFinalizada != "True") {
                               if (documento == true) {
                                   return "<span class='label label-primary text-center'>" + " " + data + " " + "</span>";
                               }
                               else {
                                   return "<span class='label label-danger text-center'>" + " " + data + " " + "</span>";

                               }
                           }
                           else {
                               return "<span>" + " " + data + " " + "</span>";
                           }
                       }

                   },
                   { "title": "Descripción", "data": "pro_str_descripcion", "name": "pro_str_descripcion", "autoWidth": true, "class": "text-center" },
                   { "title": "IMEI", "data": "pro_str_serieimei", "name": "pro_str_serieimei", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Recepcionado", "data": "dci_bit_recepciontienda", "name": "dci_bit_recepciontienda", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full) {
                           var recepcion = data;

                           if (recepcion == true)
                           {
                               return "<span class='label label-primary'>" + " " + "SI" + " " + "</span>";
                           }
                           else {
                               return "<span class='label label-danger'>" + " " + "NO" + " " + "</span>";
                           }
                       }
                   },
                   {
                       "title": "Estado", "data": "dci_bit_recepciontienda", "name": "dci_bit_recepciontienda", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full) {
                           var recepcion = data;

                           if (recepcion == true) {
                               return "<span class='label label-primary'>" + " " + "NORMAL" + " " + "</span>";
                           }
                           else {
                               return "<span class='label label-danger'>" + " " + "REPORTADO FALTANTE" + " " + "</span>";
                           }
                       }
                   },


           ]
       });
}

function CancelarRecepcion()
{
    var url = $('#btnCancelar').data("url");
    window.location = url;
}

function btnNoRecepcionarTodo_onclick(obj, event) {

    var url = $(obj).data("url");

    swal({
        title: "No Recepcionar",
        text: "¿Esta seguro de no recepcionar todo?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'No recepcionar',
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function () {
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data)
                    {
                        if (data.res == true)
                        {
                            oDocumentosTable.draw();
                        }
                        else {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al realizar la acción!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al realizar la acción!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
    });
}

function btnFinalizarRecepcion_onclick(obj, event)
{
    var url = $(obj).data("url");
    var urlval = $(obj).data("urlval");
    var dataModelo = $("#FrmRecepcionGuia").serialize();

    $.ajax(
            {
                type: "POST",
                async: true,
                url: urlval,
                data: dataModelo,
                success: function (data)
                {
                    if (data.res == true)
                    {
                        swal({
                            title: "¿Esta seguro de finalizar la recepción?",
                            text: "<p  style='font-weight:bold;text-center:left'>Verificar resumen antes de finalizar</p><br><p><ul><li  style='font-weight:bold;text-align:left'>Total por Recibir: " + data.totalPorRecepcionar + "</li><li class='text-success' style='font-weight:bold;text-align:left'>Total Recibidos    :  " + data.totalRecepcionados + " </li><li class='text-danger' style='font-weight:bold;text-align:left'>Total Faltantes    :  " + data.totalFaltantes + "</li></ul> </p>",
                            type: "warning",
                            html: true,
                            showCancelButton: true,
                            cancelButtonText: "Cancelar",
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'Finalizar Recepción',
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                        function ()
                        {
                            var dataModelo = $("#FrmRecepcionGuia").serialize();
                            $.ajax(
                                    {
                                        type: "POST",
                                        async: true,
                                        url: url,
                                        data: dataModelo,
                                        success: function (data) {
                                            if (data.res == true) {
                                                if (data.guiaingreso != "") {
                                                    swal({
                                                        title: "¡Recepción de Tienda Finalizada!",
                                                        text: "La recepción de la guia se realizó de forma correcta, y se generó la guia de ingreso N° " + data.guiaingreso,
                                                        type: "success",
                                                        showCancelButton: false,
                                                        cancelButtonText: "Cancelar",
                                                        confirmButtonColor: '#DD6B55',
                                                        confirmButtonText: 'Aceptar',
                                                        closeOnConfirm: true,
                                                        closeOnCancel: true
                                                    },
                                                       function ()
                                                       {
                                                           CancelarRecepcion()
                                                       });
                                                }
                                                else {
                                                    swal("¡Recepción Finalizada!", "La recepción de la guia se realizó de forma correcta, pero ocurrió un problema al generar la guia de ingreso.", "success");
                                                    CancelarRecepcion()
                                                }
                                            }
                                            else {
                                                swal({ title: "¡Error!", text: data.mensaje, type: "error", confirmButtonText: "Aceptar" });
                                            }
                                        },
                                        error: function (request, status, error) {
                                            swal({ title: "¡Error!", text: "¡Ocurrió un error al finalizar la recepción!", type: "error", confirmButtonText: "Aceptar" });
                                        }
                                    });
                        });
                    }
                    else
                    {
                        swal({ title: "¡Error!", text: data.mensaje, type: "error", confirmButtonText: "Aceptar" });
                    }
                },
                error: function (request, status, error)
                {
                    swal({ title: "¡Error!", text: "¡Ocurrió un error al recuperar el resumen de recepción, comunicarse con sistemas!", type: "error", confirmButtonText: "Aceptar" });
                }
     });




    
}

$('#txtEscanDocumento').bind('keyup', function (e)
{
    var key = e.keyCode || e.which;
    if (key === 13)
    {
        RecepcionarDocumento();
    };
});

$('#txtEscanImei').bind('keyup', function (e) 
{
    var key = e.keyCode || e.which;
    if (key === 13)
    {
       ConfirmarIMEI();
    };
});

function RecepcionarDocumento() {
    var oTable = $('.dataTables-tblDetalleGuia').dataTable();
    var documento = $("#txtEscanDocumento").val();

    if (documento == "") {
        swal({ title: "¡Error!", text: "¡Ingresar número de documento!", type: "error", confirmButtonText: "Aceptar" });
        document.getElementById('txtEscanDocumento').focus();
    }
    else {
        var url = $('#txtEscanDocumento').data("url") + "?documento=" + documento;
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data) {
                        if (data.res == true) {
                            if (data.imei == true) {
                                $("#txtEscanDocumento").val("");
                                document.getElementById('txtEscanDocumento').disabled = true;
                                document.getElementById('txtEscanImei').disabled = false;
                                document.getElementById('txtEscanImei').focus();
                                oDocumentosTable.draw();
                                oTable.fnPageChange(data.pagina);
                            }
                            else {
                                $("#txtEscanDocumento").val("");
                                document.getElementById('txtEscanDocumento').focus();
                                oDocumentosTable.draw();
                                oTable.fnPageChange(data.pagina);
                            }
                        }
                        else {
                            swal("¡Error!", data.mensaje, "error");
                            document.getElementById('txtEscanDocumento').focus();
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al recepcionar el documento!", type: "error", confirmButtonText: "Aceptar" });
                        document.getElementById('txtEscanDocumento').focus();
                    }
                });
    }
}

function ConfirmarIMEI() {

    var oTable = $('.dataTables-tblDetalleGuia').dataTable();
    var imei = $("#txtEscanImei").val();
    if (imei == "")
    {
        swal({ title: "¡Error!", text: "¡Ingresar número de IMEI!", type: "error", confirmButtonText: "Aceptar" });
    }
    else
    {
        var url = $('#txtEscanImei').data("url") + "?imei=" + imei;
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data)
                    {
                        if (data.res == true)
                        {
                            document.getElementById('txtEscanDocumento').disabled = false;
                            $("#txtEscanImei").val("");
                            document.getElementById('txtEscanImei').disabled = true;
                            document.getElementById('txtEscanDocumento').focus();
                            oDocumentosTable.draw();
                            oTable.fnPageChange(data.pagina);
                        }
                        else
                        {
                            swal("¡Error!", data.mensaje, "error");
                        }
                    },
                    error: function (request, status, error)
                    {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al confirmar el IMEI", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
    }
}
