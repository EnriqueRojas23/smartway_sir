var oDocumentosTable;
var oDocumentosSobrantesTable;
var btnFinalizarRecepcion = "#btnFinalizarRecepcion";
var DatosMotivoNoRecepcion;
var RecepcionFinalizada;
var PorcentajeAvance;

$(document).ready(function ()
{
    $(btnFinalizarRecepcion).click(function (event) { btnFinalizarRecepcion_onclick(this, event); });

    CargaDetalleGuia();
    CargaDetalleSobrantes();

    document.getElementById('txtEscanBarra').focus();
    PorcentajeAvance = $("#porcentaje").val();
    $('.progress-bar').css('width', PorcentajeAvance + '%').attr('aria-valuenow', PorcentajeAvance);
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
                       "key": true, "title": "Id", "data": "NU_SECU", "name": "NU_SECU", "autoWidth": true, "class": "text-center"
                   },
                   {
                       "title": "Item", "data": "CO_ITEM", "name": "CO_ITEM", "autoWidth": true, "class": "text-center",

                       "mRender": function (data, type, full)
                       {
                           var documento = full.item_coincide;

                           if (documento == true)
                           {
                               return "<span class='label label-primary text-center'>" + " " + data + " " + "</span>";
                           }
                           else
                           {
                               if (full.recibido == true)
                               {
                                   return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                               }
                               else
                               {
                                   return "<span class='label label-danger'>" + " " + data + " " + "</span>";
                               }
                           }
                       }

                   },
                   { "title": "Descripción", "data": "DE_ITEM", "name": "DE_ITEM", "autoWidth": true, "class": "text-center" },
                   { "title": "Serie/IMEI", "data": "CO_LOTE_REFE", "name": "CO_LOTE_REFE", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "✔", "data": "imei_coincide", "name": "imei_coincide", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           var requiere = full.REQUIERE_IMEI;
                           var imei = data;

                           if (requiere == false)
                           {
                               return "<span class='label label-primary'>" + " " + "NO REQUIERE" + " " + "</span>";
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
                   },
                   { "title": "Cantidad Guia", "data": "CA_DOCU_ALMA", "name": "CA_DOCU_ALMA", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Contada", "data": "cant_confirmada", "name": "cant_confirmada", "width": "5%", "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           return "<input  disabled class='text-center' type='number'min='0' max='500' style='width:50px' value='" + data + "'> </input>"
                       }
                   },
                   { "title": "Diferencia", "data": "diferencia", "name": "CA_DOCU_ALMA", "diferencia": true, "class": "text-center" },
                   {
                       "title": "Recepción", "data": "recibido", "name": "recibido", "autoWidth": true, "class": "text-center",
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
                   {
                       "title": "Status", "data": "status", "name": "status", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                            var estado = data;

                            if (estado == "FALTANTE")
                            {
                                return "<span class='label label-danger'>" + " " + estado + " " + "</span>";
                            }
                            else if (estado == "SOBRANTE")
                            {
                                return "<span class='label label-warning'>" + " " + estado + " " + "</span>";
                            }
                            else
                            {
                                return "<span class='label label-primary'>" + " " + estado + " " + "</span>";
                            }
                        }
                   }
           ]
       });
}

function CargaDetalleSobrantes()
{
    oDocumentosSobrantesTable =
       $('.dataTables-tblDetalleSobrantes').DataTable({
           responsive: true,
           "searching": false,
           "ordering": true,
           "processing": false,
           "serverSide": true,
           "ajax": {
               "url": $('#tblDetalleSobrantes').data("url"),
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                  {
                      "key": true, "title": "Id", "data": "NU_SECU", "name": "NU_SECU", "autoWidth": true, "class": "text-center"
                  },
                   {
                       "title": "Item", "data": "CO_ITEM", "name": "CO_ITEM", "autoWidth": true, "class": "text-center",

                       "mRender": function (data, type, full) {
                           var documento = full.item_coincide;

                           if (documento == true) {
                               return "<span class='label label-primary text-center'>" + " " + data + " " + "</span>";
                           }
                           else {
                               if (full.recibido == true) {
                                   return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                               }
                               else {
                                   return "<span class='label label-danger'>" + " " + data + " " + "</span>";
                               }
                           }
                       }

                   },
                   { "title": "Descripción", "data": "DE_ITEM", "name": "DE_ITEM", "width": "35%", "class": "text-center" },
                   { "title": "Serie/IMEI", "data": "CO_LOTE_REFE", "name": "CO_LOTE_REFE", "autoWidth": true, "class": "text-center" },
                   { "title": "Cantidad Guia", "data": "CA_DOCU_ALMA", "name": "CA_DOCU_ALMA", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Contada", "data": "cant_confirmada", "name": "cant_confirmada", "width": "5%", "class": "text-center",
                       "mRender": function (data, type, full) {
                           return "<input disabled class='text-center' type='number'min='0' max='500' style='width:50px' value='" + data + "'> </input>"
                       }
                   },
                   {
                       "title": "Status", "data": "status", "name": "status", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full) {
                           var estado = data;

                           if (estado == "FALTANTE") {
                               return "<span class='label label-danger'>" + " " + estado + " " + "</span>";
                           }
                           else if (estado == "SOBRANTE") {
                               return "<span class='label label-warning'>" + " " + estado + " " + "</span>";
                           }
                           else {
                               return "<span class='label label-primary'>" + " " + estado + " " + "</span>";
                           }
                       }
                   },
                   //{ "title": "Acciones", "class": "text-center", "data": "NU_SECU", "mRender": function (data, type, full) { var id = data; return "<div class='btn-group'><button type='button'  class='btn-danger btn btn-xs btn-outline' onclick='EliminarSobrante(" + id + ")' > Eliminar <i class='fa fa-trash'></i></button></div>" } },
           ]
       });
}

function CancelarRecepcion()
{
    var url = $('#btnCancelar').data("url");
    window.location = url;
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
                            text: "<p  style='font-weight:bold;text-center:left'>Verificar resumen antes de finalizar</p><br><p><ul><li  style='font-weight:bold;text-align:left'>Total por Recibir: " + data.totalPorRecepcionar + "</li><li class='text-success' style='font-weight:bold;text-align:left'>Total Recibidos:  " + data.totalRecepcionados + " </li><li class='text-danger' style='font-weight:bold;text-align:left'>Total Faltantes:  " + data.totalFaltantes + "</li><li class='text-warning' style='font-weight:bold;text-align:left'>Total Sobrantes:  " + data.totalSobrantes + "</li></ul> </p>",
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
                                            if (data.res == true)
                                            {
                                                if (data.guiaingreso != "")
                                                {
                                                    swal({
                                                        title: "¡Recepción Finalizada!",
                                                        text: "La recepción de la guia se realizó de forma correcta, y se generó la guia de ingreso N° " + data.guiaingreso,
                                                        type: "success",
                                                        showCancelButton: false,
                                                        cancelButtonText: "Cancelar",
                                                        confirmButtonColor: '#DD6B55',
                                                        confirmButtonText: 'Aceptar',
                                                        closeOnConfirm: true,
                                                        closeOnCancel: true
                                                    },
                                                       function () {
                                                           CancelarRecepcion()
                                                       });
                                                }
                                                else
                                                {
                                                    swal("¡Recepción Finalizada!", "La recepción de la guia se realizó de forma correcta, y se generó la guia de ingreso N° " + data.guiaingreso + ", pero ocurrió un problema al confirmar el ingreso.", "success");
                                                    CancelarRecepcion()
                                                }
                                            }
                                            else
                                            {
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

$('#txtEscanBarra').bind('keyup', function (e) {
    var key = e.keyCode || e.which;
    if (key === 13)
    {
        RecepcionarProducto();
    };
});


function RecepcionarProducto()
{
    var oTable   = $('.dataTables-tblDetalleGuia').dataTable();
    var producto = $("#txtEscanBarra").val();
    var cantidad = $("#txtCantidad").val();

    if (producto == "")
    {
        swal({ title: "¡Error!", text: "¡Ingresar barra o código de producto a recibir!", type: "error", confirmButtonText: "Aceptar" });
        document.getElementById('txtEscanBarra').focus();
    }
    else
    {
        var url = $('#txtEscanBarra').data("url") + "?codigo=" + producto + "&cantidad=" + cantidad;
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data)
                    {
                        if (data.res == true)
                        {
                            if (data.imei == true)
                            {
                                $("#txtEscanBarra").val("");
                                $("#txtCantidad").val("");
                                document.getElementById('txtEscanBarra').disabled = true;
                                document.getElementById('txtEscanImei').disabled = false;
                                document.getElementById('txtEscanImei').focus();
                                oDocumentosSobrantesTable.draw();
                                oDocumentosTable.draw();
                                oTable.fnPageChange(data.pagina);

                                if (data.sobrante == true) {

                                    swal({ title: "¡Aviso!", text: data.mensaje, type: "info", closeOnConfirm: true, confirmButtonText: "Aceptar" });
                                }
                            }
                            else
                            {
                                $("#txtEscanBarra").val("");
                                $("#txtCantidad").val("");
                                document.getElementById('txtEscanBarra').focus();
                                oDocumentosTable.draw();
                                oDocumentosSobrantesTable.draw();
                                oTable.fnPageChange(data.pagina);

                                if (data.sobrante == true)
                                {
                                    swal({ title: "¡Aviso!", text: data.mensaje, type: "info", closeOnConfirm: true, confirmButtonText: "Aceptar" });
                                }
                            }

                            $("#lblProgreso").empty();
                            $("#lblProgreso").append(data.progreso);
                            $('.progress-bar').css('width', data.porcentaje + '%').attr('aria-valuenow', data.porcentaje);
                        }
                        else
                        {
                            swal("¡Error!", data.mensaje, "error");
                            $("#txtEscanBarra").val("");
                            $("#txtCantidad").val("");
                            document.getElementById('txtEscanBarra').focus();
                            oDocumentosTable.draw();
                            oDocumentosSobrantesTable.draw();
                        }
                    },
                    error: function (request, status, error)
                    {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error recepcionar el producto!", type: "error", confirmButtonText: "Aceptar" });
                        $("#txtCantidad").val("");
                        $("#txtEscanBarra").val("");
                        document.getElementById('txtEscanBarra').focus();
                        oDocumentosSobrantesTable.draw();
                    }
                });
    }
}

$('#txtEscanImei').bind('keyup', function (e) 
{
    var key = e.keyCode || e.which;
    if (key === 13)
    {
       ConfirmarIMEI();
    };
});


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
                            document.getElementById('txtEscanBarra').disabled = false;
                            $("#txtEscanImei").val("");
                            document.getElementById('txtEscanImei').disabled = true;
                            document.getElementById('txtEscanBarra').focus();
                            oDocumentosTable.draw();
                            oDocumentosSobrantesTable.draw();
                            oTable.fnPageChange(data.pagina);

                            $("#lblProgreso").empty();
                            $("#lblProgreso").append(data.progreso);
                            $('.progress-bar').css('width', data.porcentaje + '%').attr('aria-valuenow', data.porcentaje);
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

function EliminarSobrante(sobrante)
{
    var url = $('#tblDetalleSobrantes').data("urldel");

    swal({
        title: "¿Está seguro de eliminar el sobrante?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "Cancelar!",
        closeOnConfirm: true,
        closeOnCancel: true
    },
            function (isConfirm)
            {
                if (isConfirm) {
                    $.ajax(
                    {
                        type: "POST",
                        async: true,
                        url: url,
                        data: { "sobrante": sobrante },
                        success: function (data)
                        {
                            if (data.res == true)
                            {
                                oDocumentosSobrantesTable.draw();
                            }
                            else
                            {
                                swal({ title: "¡Error!", text: data.mensaje, type: "error", confirmButtonText: "Aceptar" });
                            }

                        },
                        error: function (request, status, error) {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar el sobrante!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
                }
            });
}