
const $grilla = $("#gridguias")
const $pagergrilla = $("#gridguiaspager")
const $btnBuscar = $("#btnBuscar")
const $btnNuevo = $("#btnNuevo")
let RecepcionFinalizada = "False"
const $btnFinalizarRecepcion = $("#btnFinalizarRecepcion")

$(document).ready(function () {
    inicio();
});
function inicio()
{
   // configurarGrilla();
    configurarControles();
    CargaDetalleGuia();
}
function configurarControles(){

    $btnFinalizarRecepcion.click(function () { btnFinalizarRecepcion_onClick(this,event)})
    
    $('#txtEscanDocumento').bind('keyup', function (e){
    var key = e.keyCode || e.which;
    if (key === 13){
        RecepcionarDocumento();
    };
   });
}

function CargaDetalleGuia()
{
    oDocumentosTable =
       $('.dataTables-tblDetalleGuia').DataTable({
           responsive: true,
           "searching": false,
           "ordering": true,
           "processing": false,
           "serverSide": true,
           "ajax": {
               "url": $('#tblDetalleGuia').data("url") + "?idguiaremision=" + $("#idguiaremision").val(),
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   {
                       "key": true, "title": "Id", "data": "idordenserviciotecnico", "name": "idordenserviciotecnico", "autoWidth": true, "class": "text-center",
                       "mRender":
                                function (data, type, full) {
                                    return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                }

                   },
                   { "title": "N° Documento", "data": "numeroordenservicio", "name": "numeroordenservicio", "autoWidth": true, "class": "text-center" },
                   { "title": "Item", "data": "codigoproducto", "name": "codigoproducto", "autoWidth": true },
                   { "title": "Descripción", "data": "producto", "name": "producto", "autoWidth": true, "class": "text-center" },
                   { "title": "Serie/IMEI", "data": "serie", "name": "serie", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Imei Escaneado", "data": "imei_escaneado", "name": "imei_escaneado", "autoWidth": true, "class": "text-center",

                       "mRender": function (data, type, full)
                       {
                           var escaneo = data;
                           var imei = full.serie;

                           if (RecepcionFinalizada == "True")
                           {
                               return "<span class='label label-primary'>" + " " + imei + " " + "</span>";
                           }
                           else
                           {
                               return  escaneo ;
                           }
                       }

                   },
                   {
                       "title": " Coincide", "data": "imei_coincide", "name": "imei_coincide", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           var requiere = full.requiere_imei;
                           var imei = data;

                           if (RecepcionFinalizada == "True")
                           {
                               if (requiere == false) {
                                   return "<span class='label label-primary'>" + " " + "NO REQUIERE" + " " + "</span>";
                               }
                               else 
                               {

                                       return "<span class='label label-primary'>" + " " + "SI" + " " + "</span>";
                               }
                           }
                           else {
                               if (requiere == false)
                               {
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
                       "title": "Recepción", "data": "recepciondestino", "name": "recepciondestino", "autoWidth": true, "class": "text-center",
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
                       "title": "Fecha Recepción", "data": "fecharecepcion", "name": "fecharecepcion", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full) {
                           var recepcion = data;
                           if (recepcion == null)
                           {
                               return "<input disabled type='date'> </input>"
                           }
                           else {
                               return "<input disabled value='" + data + "'> </input>"
                           }
                       }
                   },
                  
           ]
       });
}

function RecepcionarDocumento()
{

    var documento = $("#txtEscanDocumento").val();
    if (documento == ""){
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
                    success: function (data)
                    {
                        if (data.res == true)
                        {
                            if (data.imei == true)
                            {
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
                                //oDocumentosSobrantesTable.draw();
                            }
                        }
                        else
                        {
                            swal("¡Error!", data.mensaje, "error");
                            document.getElementById('txtEscanDocumento').focus();
                            //oDocumentosSobrantesTable.draw();
                        }
                    },
                    error: function (request, status, error)
                    {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error recepcionar el documento!", type: "error", confirmButtonText: "Aceptar" });
                        document.getElementById('txtEscanDocumento').focus();
                        //oDocumentosSobrantesTable.draw();
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
                        }
                        else {
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

function btnFinalizarRecepcion_onClick(obj,event){

    var dataModelo = $("#FrmRecepcionGuia").serialize();
    var url = $(obj).data("url");
    swal({
        title: "¿Esta seguro de finalizar la recepción?",
        text: "Tener en cuenta que una vez finalizada se generará la guia de ingreso.",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Finalizar Recepción',
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function ()
    {
        $.ajax({
            type: "POST",
            url: url,
            data: dataModelo,
            async : true,
            dataType: "JSON",
            success: function (response) {
                if(response.res)
                {
                    swal("Recepción de Guía", "La guía ha sido recepcionada satisfactoriamente", "success");

                    
                    let vurl = UrlHelper.Action("RecepcionGuias","Recepcion","Recepcion")
                    window.location.href = vurl;
                    

                }
                else{
                    alert('no')
                }
            },
            error: function (request, status, error) {
                swal({ title: "Recepción Guías", text: "Ocurrió un error al finalizar la recepción", type: "error", confirmButtonText: "Aceptar" });
            }
        });


    });
}
