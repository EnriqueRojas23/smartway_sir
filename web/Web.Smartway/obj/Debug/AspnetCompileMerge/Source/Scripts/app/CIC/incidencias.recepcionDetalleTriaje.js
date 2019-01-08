var oDocumentosTable;
var btnNoRecepcionarTodo = "#btnNoRecepcionarTodo";
var btnFinalizarRecepcion = "#btnFinalizarRecepcion";
var DatosComboClasificacion;
var DatosComboEvaluacion;
var RecepcionFinalizada;


$(document).ready(function () {

    $(btnNoRecepcionarTodo).click(function (event) { btnNoRecepcionarTodo_onclick(this, event); });
    $(btnFinalizarRecepcion).click(function (event) { btnFinalizarRecepcion_onclick(this, event); });
    RecepcionFinalizada = $("#recepcionFinalizadaTriaje").val();

    CargarDataCombos();
    CargaDetalleGuia();

    document.getElementById('txtEscanDocumento').focus();
});

function CargarDataCombos() {
    $.ajax(
    {
        type: "POST",
        async: true,
        url: $("#tblDetalleGuia").data("urlcmb"),
        success: function (data) {
            DatosComboClasificacion = data.resA;
            DatosComboEvaluacion = data.resB;
        },
        error: function (request, status, error) {
            swal({ title: "¡Error!", text: "¡Ha ocurrido un error, al cargar el combo!", type: "error", confirmButtonText: "Aceptar" });
        }
    });
}

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
                                function (data, type, full) {
                                    return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                }
                   },
                   { "title": "N° Documento", "data": "documento_interno", "name": "documento_interno", "autoWidth": true, "class": "text-center" },
                   { "title": "Item", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true },
                   { "title": "Descripción", "data": "pro_str_descripcion", "name": "pro_str_descripcion", "autoWidth": true, "class": "text-center" },
                   { "title": "Barra", "data": "pro_str_codigobarra", "name": "pro_str_codigobarra", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "✔", "data": "barra_coincide", "name": "barra_coincide", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full) {
                           var requiere = full.requiere_barra;
                           var barra = data;

                           if (RecepcionFinalizada == "True") {
                               if (requiere == false) {
                                   return "<span class='label label-primary'>" + " " + "NO REQUIERE" + " " + "</span>";
                               }
                               else {

                                   return "<span class='label label-primary'>" + " " + "SI" + " " + "</span>";
                               }
                           }
                           else {
                               if (requiere == false) {
                                   return "<span class='label label-primary'>" + " " + "NO REQUIERE" + " " + "</span>";
                               }
                               else {
                                   if (barra == true) {
                                       return "<span class='label label-primary'>" + " " + "SI" + " " + "</span>";
                                   }
                                   else {
                                       return "<span class='label label-danger'>" + " " + "NO" + " " + "</span>";
                                   }
                               }
                           }
                       }
                   },
                   { "title": "Serie/Imei", "data": "pro_str_serieimei", "name": "pro_str_serieimei", "autoWidth": true, "class": "text-center" },
                   {
                        "title": "✔", "data": "imei_coincide", "name": "imei_coincide", "autoWidth": true, "class": "text-center",
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
                                else {

                                    return "<span class='label label-primary'>" + " " + "SI" + " " + "</span>";
                                }
                            }
                            else {
                                if (requiere == false) {
                                    return "<span class='label label-primary'>" + " " + "NO REQUIERE" + " " + "</span>";
                                }
                                else {
                                    if (imei == true) {
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
                       "title": "Recepción Triaje", "data": "dci_bit_recepcionalma", "name": "dci_bit_recepcionalma", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           var recepcion = data;
                           var recepcion_triaje = full.dci_bit_recepciontriaje;

                           if (recepcion == true)
                           {
                               if (recepcion_triaje == true)
                               {
                                   return "<span class='label label-primary'>" + " " + "SI" + " " + "</span>";
                               }
                               else
                               {
                                   return "<span class='label label-danger'>" + " " + "NO" + " " + "</span>";
                               }
                           }
                           else
                           {
                               return "--"
                           }
                       }
                   },
                   {
                       "title": "Evaluación Triaje", "data": "evat_int_id", "name": "evat_int_id", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           var recepcion = full.dci_bit_recepcionalma;
                           var eval = data;
                           var id = full.dci_int_id;

                           if (recepcion == true)
                           {
                               if (RecepcionFinalizada == "True")
                               {
                                   var Controlselect = "<select disabled id='ddlEvaluacion_" + id + "' onchange='ActualizarEvaluacion(" + id + ");'>"
                                   Controlselect = Controlselect + '<option value="0">[Seleccionar]</option>';
                                   $.each(DatosComboEvaluacion, function (i, state)
                                   {
                                       if (eval == state.Value)
                                       {
                                           Controlselect = Controlselect + '<option selected value="' + state.Value + '">' + state.Text + '</option>';
                                       }
                                       else {
                                           Controlselect = Controlselect + '<option value="' + state.Value + '">' + state.Text + '</option>';
                                       }
                                   });
                                   Controlselect = Controlselect + '</select>';
                                   return Controlselect;
                               }
                               else
                               {
                                   var Controlselect = "<select id='ddlEvaluacion_" + id + "' onchange='ActualizarEvaluacion(" + id + ");'>"
                                   Controlselect = Controlselect + '<option value="0">[Seleccionar]</option>';
                                   $.each(DatosComboEvaluacion, function (i, state) {
                                       if (eval == state.Value) {
                                           Controlselect = Controlselect + '<option selected value="' + state.Value + '">' + state.Text + '</option>';
                                       }
                                       else {
                                           Controlselect = Controlselect + '<option value="' + state.Value + '">' + state.Text + '</option>';
                                       }
                                   });
                                   Controlselect = Controlselect + '</select>';
                                   return Controlselect;
                               }
                           }
                           else
                           {
                               return "--"
                           }
                            
                       }
                   },
                    {
                        "title": "Derivar", "data": "clat_int_id", "name": "clat_int_id", "autoWidth": true, "class": "text-center",
                        "mRender": function (data, type, full) {
                            var recepcion = full.dci_bit_recepcionalma;
                            var clasificacion = data;
                            var id = full.dci_int_id;

                            if (recepcion == true)
                            {

                                if (RecepcionFinalizada == "True")
                                {
                                    var Controlselect = "<select disabled id='ddlArea_" + id + "' onchange='ActualizarArea(" + id + ");'>"
                                    Controlselect = Controlselect + '<option value="0">[Seleccionar]</option>';
                                    $.each(DatosComboClasificacion, function (i, state) {
                                        if (clasificacion == state.Value) {
                                            Controlselect = Controlselect + '<option selected value="' + state.Value + '">' + state.Text + '</option>';
                                        }
                                        else {
                                            Controlselect = Controlselect + '<option value="' + state.Value + '">' + state.Text + '</option>';
                                        }
                                    });
                                    Controlselect = Controlselect + '</select>';
                                    return Controlselect;
                                }
                                else
                                {
                                    var Controlselect = "<select id='ddlArea_" + id + "' onchange='ActualizarArea(" + id + ");'>"
                                    Controlselect = Controlselect + '<option value="0">[Seleccionar]</option>';
                                    $.each(DatosComboClasificacion, function (i, state) {
                                        if (clasificacion == state.Value) {
                                            Controlselect = Controlselect + '<option selected value="' + state.Value + '">' + state.Text + '</option>';
                                        }
                                        else {
                                            Controlselect = Controlselect + '<option value="' + state.Value + '">' + state.Text + '</option>';
                                        }
                                    });
                                    Controlselect = Controlselect + '</select>';
                                    return Controlselect;
                                }

                               
                            }
                            else
                            {
                                return "--"
                            }

                        }
                    },
           ]
       });
}

function ActualizarEvaluacion(id)
{
    var motivo = $("#ddlEvaluacion_" + id).val();
    var url = $("#tblDetalleGuia").data("urledit") + "?documento=" + id + "&evaluacion=" + motivo;

    $.ajax(
    {
        type: "POST",
        async: true,
        url: url,
        success: function (data) {
            if (data.res == true) {
                oDocumentosTable.draw();
            }
            else {
                swal({ title: "¡Error!", text: "¡Ocurrió un error al realizar la modificación", type: "error", confirmButtonText: "Aceptar" });
            }
        },
        error: function (request, status, error) {
            swal({ title: "¡Error!", text: "¡Ocurrió un error al realizar la modificación!", type: "error", confirmButtonText: "Aceptar" });
        }
    });
}

function ActualizarArea(id) {
    var area = $("#ddlArea_" + id).val();
    var url = $("#tblDetalleGuia").data("urlarea") + "?documento=" + id + "&area=" + area;

    $.ajax(
    {
        type: "POST",
        async: true,
        url: url,
        success: function (data) {
            if (data.res == true) {
                oDocumentosTable.draw();
            }
            else {
                swal({ title: "¡Error!", text: "¡Ocurrió un error al realizar la modificación", type: "error", confirmButtonText: "Aceptar" });
            }
        },
        error: function (request, status, error) {
            swal({ title: "¡Error!", text: "¡Ocurrió un error al realizar la modificación!", type: "error", confirmButtonText: "Aceptar" });
        }
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

    swal({
        title: "Finalizar Recepción",
        text: "¿Esta seguro de finalizar la recepción?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Finalizar',
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function ()
    {
        var dataModelo = $("#FrmRecepcionGuiaTriaje").serialize();
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
                            swal("¡Recepción Finalizada!", "La recepción de la guia se realizó de forma correcta.", "success");
                            CancelarRecepcion()
                        }
                        else {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al finalizar la recepción!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al finalizar la recepción!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
    });
}



$('#txtEscanDocumento').bind('keyup', function (e) {
    var key = e.keyCode || e.which;
    if (key === 13) {
        RecepcionarDocumento();
    };
});



function RecepcionarDocumento() {

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
                        if (data.res == true)
                        {

                            if (data.barra == true) {
                                $("#txtEscanDocumento").val("");
                                document.getElementById('txtEscanDocumento').disabled = true;
                                document.getElementById('txtEscanBarra').disabled = false;
                                document.getElementById('txtEscanBarra').focus();
                                oDocumentosTable.draw();
                            }
                            else if (data.imei == true) {
                                $("#txtEscanDocumento").val("");
                                document.getElementById('txtEscanDocumento').disabled = true;
                                document.getElementById('txtEscanImei').disabled = false;
                                document.getElementById('txtEscanImei').focus();
                                oDocumentosTable.draw();
                            }
                            else
                            {
                                $("#txtEscanDocumento").val("");
                                document.getElementById('txtEscanDocumento').focus();
                                oDocumentosTable.draw();

                            }
                        }
                        else {
                            swal("¡Error!", data.mensaje, "error");
                            document.getElementById('txtEscanDocumento').focus();
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error recepcionar el documento!", type: "error", confirmButtonText: "Aceptar" });
                        document.getElementById('txtEscanDocumento').focus();
                    }
                });
    }

}

function DerivarTodo() {

    var clasificacion = $("#ddlClasificacionDerivar").val();

    if (clasificacion == "")
    {
        swal({ title: "¡Error!", text: "¡Seleccionar área!", type: "error", confirmButtonText: "Aceptar" });
    }
    else {
        var url = $('#btnDerivarTodo').data("url") + "?clasificacion=" + clasificacion;
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data) {
                        if (data.res == true)
                        {
                            $("#modalDerivarTodo").modal("hide");
                            oDocumentosTable.draw();
                        }
                        else
                        {
                            swal("¡Error!", data.mensaje, "error");
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
    }
}

$('#txtEscanImei').bind('keyup', function (e) {
    var key = e.keyCode || e.which;
    if (key === 13) {
        ConfirmarIMEI();
    };
});

function ConfirmarIMEI() {

    var imei = $("#txtEscanImei").val();
    if (imei == "") {
        swal({ title: "¡Error!", text: "¡Ingresar número de IMEI!", type: "error", confirmButtonText: "Aceptar" });
    }
    else {
        var url = $('#txtEscanImei').data("url") + "?imei=" + imei;
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data) {
                        if (data.res == true) {
                            document.getElementById('txtEscanDocumento').disabled = false;
                            $("#txtEscanImei").val("");
                            document.getElementById('txtEscanImei').disabled = true;
                            document.getElementById('txtEscanDocumento').focus();
                            oDocumentosTable.draw();
                        }
                        else {
                            swal("¡Error!", data.mensaje, "error");
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al confirmar el IMEI", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
    }
}

$('#txtEscanBarra').bind('keyup', function (e) {
    var key = e.keyCode || e.which;
    if (key === 13) {
        ConfirmarBarra();
    };
});


function ConfirmarBarra() {

    var barra = $("#txtEscanBarra").val();
    if (barra == "") {
        swal({ title: "¡Error!", text: "¡Ingresar código de Barra!", type: "error", confirmButtonText: "Aceptar" });
    }
    else {
        var url = $('#txtEscanBarra').data("url") + "?barra=" + barra;

        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data) {
                        if (data.res == true) {
                            if (data.imei == true && data.coin_barra == true) {
                                $("#txtEscanBarra").val("");
                                document.getElementById('txtEscanBarra').disabled = true;
                                document.getElementById('txtEscanImei').disabled = false;
                                document.getElementById('txtEscanImei').focus();
                                oDocumentosTable.draw();
                            }
                            else {
                                document.getElementById('txtEscanDocumento').disabled = false;
                                $("#txtEscanBarra").val("");
                                document.getElementById('txtEscanBarra').disabled = true;
                                document.getElementById('txtEscanDocumento').focus();
                                oDocumentosTable.draw();
                            }
                        }
                        else {
                            swal("¡Error!", data.mensaje, "error");
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al confirmar la barra", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
    }
}