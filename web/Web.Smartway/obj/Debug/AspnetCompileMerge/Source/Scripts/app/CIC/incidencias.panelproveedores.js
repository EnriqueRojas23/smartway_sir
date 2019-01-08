var oDocumentosTable;
var btnEnviarMasivo = "#btnEnviarMasivo";

$(document).ready(function () {


    $('#data_2 .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $(btnEnviarMasivo).click(function (event) { btnEnviarMasivo_onclick(this, event); });
    $("#btnBuscar").button()
                   .click(function (e) {
                       oDocumentosTable.draw();
                   });
    CargaListaDocumentosProveedor();
});

function CargarComboProveedor() {
    $("#ddlTipoProveedor").change(function ()
    {
        var tipo = $("#ddlTipoProveedor").val();

        if (tipo == "") {
            swal({ title: "¡Error!", text: "¡Seleccionar el tipo de proveedor!", type: "error", confirmButtonText: "Aceptar" });
        }
        else {

            $.ajax(
               {
                   type: "POST",
                   async: true,
                   url: $("#ddlTipoProveedor").data("url").trim(),
                   data: { "tipoProveedor": tipo },
                   success: function (data) {
                       var $select = $('#ddlProveedor');
                       $select.empty();
                       $("#ddlProveedor").append('<option value="0">[Seleccionar Proveedor]</option>');
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

function CargaListaDocumentosProveedor()
{
    oDocumentosTable =
       $('.dataTables-tblTallerProveedores').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "iDisplayLength": 25,
           "processing": true,
           "serverSide": true,
           "ajax": {
               "url": $('#tblTallerProveedores').data("url"),
               "data": function ( d ) {
                   d.tienda = $('#tienda').val();
                   d.documento = $('#documento').val();
                   d.TipoDocumento = $('#tipoDocInterno').val();
                   d.asesor = $('#tecnico').val();
                   d.FechaIniAsigTecnico = $('#FechaIniAsigTec').val();
                   d.FechaFinAsigTecnico = $('#FechaFinAsigTec').val()
               },
               "type": "POST",
               "datatype": "json"
           },
           'columnDefs': [
            {
                'targets': 0,
                'checkboxes': { 'selectRow': true }
            }],
           "columns": [
                   { "key": true, "data": "dci_int_id", "autoWidth": "true" },
                   { "title": "N°", "data": "dci_int_id", "name": "dci_int_id", "sWidth": "6%" },
                   {

                       "title": "Tienda", "data": "dci_str_tienda", "name": "dci_str_tienda", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                       }
                   },
                   {
                       "title": "Documento", "data": "documento_interno", "name": "documento_interno", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           return "<strong>" + " " + data + " " + "</strong>";
                       }
                   },
                   {
                       "title": "Item", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true,
                       "mRender": function (data, type, full)
                       {
                           return "<strong>" + " " + data + " " + "</strong>";
                       }
                   },
                   { "title": "Serie/Imei", "data": "pro_str_serieimei", "name": "pro_str_serieimei", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Recepción", "data": "dci_dat_fechrecepcionstc", "name": "dci_dat_fechrecepcionstc", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           if (data == "")
                           {
                               var id = full.dci_int_id;
                               return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' class='btn-danger btn btn-xs btn-outline ' onclick='RecepcionarDocumentoProveedor(" + id + ");' href='#' > <i class='fa fa-inbox'></i> Recepcionar</button></div>";
                           }
                           else
                           {
                               return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                           }
                        }
                   },
                   {
                       "title": "Asesor", "data": "tecnico", "name": "tecnico", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           var Recepcion = full.dci_dat_fechrecepcionstc;
                           if (Recepcion == "")
                           {
                               return "<span class='label'> Sin Recepción</span>";
                           }
                           else
                           {
                               if (data.trim() == "")
                               {
                                   var id = full.dci_int_id;
                                   return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' class='btn-warning btn btn-xs btn-outline ' onclick='asignarAsesor(" + id + ");' href='#' > <i class='fa fa-edit'></i> Asignar</button></div>";
                               }
                               else
                               {
                                   var Reparacion = full.dci_dat_fechfinreparacion;

                                   if (Reparacion != null & Reparacion != "")
                                   {
                                       return "<span class='label label-success'>" + " " + data + " " + "</span>";
                                   }
                                   else {
                                       var id = full.dci_int_id;
                                       return "<span class='label label-default'><a onclick='asignarAsesor(" + id + ")'>" + " " + data + " " + "</a></span>";
                                   }
                               }
                           }
                       }

                   },
                   { "title": "Asignación", "data": "dci_dat_fechasigtecnico", "name": "dci_dat_fechasigtecnico", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Datos Técnicos", "data": "datos_tecnico", "name": "datos_tecnico", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           var Recepcion = full.dci_dat_fechrecepcionstc;
                           var Datatecnico = full.tecnico;
                           var id = full.dci_int_id;
                           var Reparacion = full.dci_dat_fechfinreparacion;

                           if (Recepcion == "")
                           {
                               return "<span class='label'> Sin Recepción</span>";
                           }
                           else
                           {
                               if (Datatecnico.trim() == "")
                               {
                                   return "<span class='label'> Sin Recepción</span>";
                               }
                               else
                               {
                                   if (Reparacion != null & Reparacion != "")
                                   {
                                       return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top'  class='btn-primary btn btn-xs btn-outline ' onclick='AgregarDatosTecnicos(" + id + ");' href='#' > <i class='fa fa-search'></i> Ver</button></div>";
                                   }
                                   else
                                   {
                                       return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top'  class='btn-primary btn btn-xs btn-outline ' onclick='AgregarDatosTecnicos(" + id + ");' href='#' > <i class='fa fa-edit'></i> Agregar</button></div>";
                                   }
                                   
                               }
                           }
                        }
                   },
                    {
                        "title": "Proveedor", "data": "proveedor", "name": "proveedor", "autoWidth": true, "class": "text-center",
                        "mRender": function (data, type, full)
                        {
                            if (data.trim() == "")
                            {
                                return "<span>" + " " + data + " " + "</span>";
                            }
                            else
                            {
                                return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                            }
                        }
                    },
                   {
                       "title": "Guia Proveedor", "data": "guia_proveedor", "name": "guia_proveedor", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           if (data.trim() == "")
                           {
                               return "<span>" + " " + data + " " + "</span>";
                           }
                           else
                           {
                               return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                           }
                       }
                   },
                   { "title": "Fin Reparación", "data": "dci_dat_fechfinreparacion", "name": "dci_dat_fechfinreparacion", "autoWidth": true, "class": "text-center" },
           ],
           'select': { 'style': 'multi' },
           buttons: [
           { extend: 'copy' },
           { extend: 'csv' },
           { extend: 'excel', title: 'Panel Proveedores' },
           { extend: 'pdf', title: 'Panel Proveedores' },
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
}

function RecepcionarDocumentoProveedor(documento)
{
    var url = $("#tblTallerProveedores").data("urlrcv") + "?documento=" + documento;

    swal({
        title: "Recepcionar Documento",
        text: "¿Esta seguro de recepcionar el documento?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Recepcionar',
        closeOnConfirm: false,
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
                            swal("¡Recepción Finalizada!", "La recepción se realizó de forma correcta.", "success");
                        }
                        else {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al realizar la recepción!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al al realizar la recepción!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
    });
}


function asignarAsesor(documento)
{
    $("#hdfDocumentoInterno").val(documento)
    $("#modalAsignarAsesorProveedor").modal("show");
}


function GrabarAsignacionAsesor()
{
    var DocumentoInterno = $("#hdfDocumentoInterno").val();
    var tecnico = $("#ddlAsesorAsignado").val();

    if (tecnico == "")
    {
        swal({ title: "¡Error!", text: "¡Seleccionar asesor!", type: "error", confirmButtonText: "Aceptar" });
    }
    else
    {
        var url = $("#tblTallerProveedores").data("urlasig") + "?documento=" + DocumentoInterno + "&tecnico=" + tecnico;

        $.ajax(
        {
            type: "POST",
            async: true,
            url: url,
            success: function (data)
            {
                if (data.res == true)
                {
                    $("#ddlAsesorAsignado").val("");
                    $("#modalAsignarAsesorProveedor").modal("hide");
                    oDocumentosTable.draw();
                    swal("¡Asesor Asignado!", "La asignación del asesor se realizó de forma correcta.", "success");
                }
                else {
                    swal({ title: "¡Error!", text: "¡Ocurrió un error al asignar al asesor!", type: "error", confirmButtonText: "Aceptar" });
                }
            },
            error: function (request, status, error) {
                swal({ title: "¡Error!", text: "¡Ocurrió un error al asignar al asesor!", type: "error", confirmButtonText: "Aceptar" });
            }
        });
    }
}


function AgregarDatosTecnicos(id)
{ 
    var url = $('#tblTallerProveedores').data("urltec") + "?documento=" + id;
    window.location = url;
}

function btnEnviarMasivo_onclick(obj, event)
{
    var TotalEnvios = oDocumentosTable.column(0).checkboxes.selected();

    if (TotalEnvios.length == 0)
    {
        swal({ title: "¡Error!", text: "¡Seleccionar por lo menos un documento!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else
    {
        $("#hdfDocumentoInterno").val(documento)
        $("#modalEnvioMasivoProveedor").modal("show");
        CargarComboProveedor();
        $('#ddlTipoProveedor').val("");
        $('#ddlProveedor').val("");
        $('#txtObservacionEnvio').val("");
        $('#ListaDocumentos').val("");
    }
}


function GenerarEnvioMasivo()
{
    var proveedor = $('#ddlProveedor').val();

    if(proveedor == 0 || proveedor == "")
    {
        swal({ title: "¡Error!", text: "Seleccionar proveedor.", type: "error", confirmButtonText: "Aceptar" });
    }
    else
    {
        var url = $("#btnGenerarEnvioMasivo").data("url")
        var TotalEnvios = oDocumentosTable.column(0).checkboxes.selected();
        $('#ListaDocumentos').val(TotalEnvios.toArray().toString());

        var dataModelo = $("#FrmEnvioMasivo").serialize();
        swal({
            title: "Generar Envío Masivo",
            text: "¿Esta seguro de generar el envío masivo?",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Generar',
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function () {
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
                                $("#modalEnvioMasivoProveedor").modal("hide");
                                oDocumentosTable.draw();
                                oDocumentosTable.column(0).checkboxes.deselectAll();
                                swal({ title: "¡Envío Finalizado!", text: data.mensaje, type: "success", confirmButtonText: "Aceptar" });
                            }
                            else
                            {
                                $("#modalEnvioMasivoProveedor").modal("hide");
                                oDocumentosTable.column(0).checkboxes.deselectAll();
                                swal({ title: "¡Error!", text: data.mensaje , type: "error", confirmButtonText: "Aceptar" });
                            }
                        },
                        error: function (request, status, error)
                        {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al al realizar la recepción!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
        });
    }

}