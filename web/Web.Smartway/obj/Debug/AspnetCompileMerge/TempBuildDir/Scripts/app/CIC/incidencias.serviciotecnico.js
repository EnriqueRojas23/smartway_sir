var oDocumentosTable;
var oDetalleOGPTable;


$(document).ready(function () {


    $('#data_2 .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });


    $("#btnBuscar").button()
                   .click(function (e) {
                       oDocumentosTable.draw();
                   });
    
    CargaListaOGP();
});


function CargaListaOGP()
{
    oDocumentosTable =
       $('.dataTables-tblRecepcionServicioTecnico').DataTable({
           responsive: true,
           "iDisplayLength": 100,
           "processing": true,
           "scrollY": '35vh',
           "scrollCollapse": true,
           "serverSide": true,
           "ajax": {
               "url": $('#tblRecepcionServicioTecnico').data("url"),
               "data": function ( d ) {
                   d.tienda = $('#tienda').val();
                   d.documento = $('#documento').val();
                   d.TipoDocumento = $('#tipoDocInterno').val();
                   d.tecnico = $('#tecnico').val();
                   d.FechaIniAsigTecnico = $('#FechaIniAsigTec').val();
                   d.FechaFinAsigTecnico = $('#FechaFinAsigTec').val()
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
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
                       "title": "Recepción STC", "data": "dci_dat_fechrecepcionstc", "name": "dci_dat_fechrecepcionstc", "autoWidth": true, "class": "text-center",
                       "mRender": function (data, type, full)
                       {
                           if (data == "")
                           {
                               var id = full.dci_int_id;
                               return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' class='btn-danger btn btn-xs btn-outline ' onclick='RecepcionarDocumentoSTC(" + id + ");' href='#' > <i class='fa fa-inbox'></i> Recepcionar</button></div>";
                           }
                           else
                           {
                               return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                           }
                        }
                   },
                   {
                       "title": "Técnico", "data": "tecnico", "name": "tecnico", "autoWidth": true, "class": "text-center",
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
                                   return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' class='btn-warning btn btn-xs btn-outline ' onclick='asignarTecnicoStc(" + id + ");' href='#' > <i class='fa fa-edit'></i> Asignar</button></div>";
                               }
                               else
                               {
                                   var Reparacion = full.dci_dat_fechfinreparacion;
                                   if (Reparacion != null & Reparacion != "")
                                   {
                                       return "<span class='label label-success'>" + " " + data + " " + "</span>";
                                   }
                                   else
                                   {
                                       var id = full.dci_int_id;
                                       return "<span class='label label-default'><a onclick='asignarTecnicoStc(" + id + ")'>" + " " + data + " " + "</a></span>";
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
                                       return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top'  class='btn-primary btn btn-xs btn-outline ' onclick='AgregarDatosTecnicosStc(" + id + ");' href='#' > <i class='fa fa-search'></i> Ver</button></div>";
                                   }
                                   else
                                   {
                                       return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top'  class='btn-primary btn btn-xs btn-outline ' onclick='AgregarDatosTecnicosStc(" + id + ");' href='#' > <i class='fa fa-edit'></i> Agregar</button></div>";
                                   }
                                   
                               }
                           }
                        }
                   },
                    {
                        "title": "Tercero", "data": "tercero", "name": "tercero", "autoWidth": true, "class": "text-center",
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
                       "title": "Guia Tercero", "data": "guia_tercero", "name": "guia_tercero", "autoWidth": true, "class": "text-center",
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
       });
}

function RecepcionarDocumentoSTC(documento)
{
    var url = $("#tblRecepcionServicioTecnico").data("urlrcv") + "?documento=" + documento;

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


function asignarTecnicoStc(documento)
{
    $("#hdfDocumentoInterno").val(documento)
    $("#modalAsignarTecnicoSTC").modal("show");
}


function GrabarAsignacionTecnicoStc()
{
    var DocumentoInterno = $("#hdfDocumentoInterno").val();
    var tecnico = $("#ddlTecnicoAsignado").val();

    if (tecnico == "")
    {
        swal({ title: "¡Error!", text: "¡Seleccionar técnico!", type: "error", confirmButtonText: "Aceptar" });
    }
    else
    {
        var url = $("#tblRecepcionServicioTecnico").data("urlasig") + "?documento=" + DocumentoInterno + "&tecnico=" + tecnico;

        $.ajax(
        {
            type: "POST",
            async: true,
            url: url,
            success: function (data)
            {
                if (data.res == true)
                {
                    $("#ddlTecnicoAsignado").val("");
                    $("#modalAsignarTecnicoSTC").modal("hide");
                    oDocumentosTable.draw();
                    swal("¡Técnico Asignado!", "La asignación del técnico se realizó de forma correcta.", "success");
                }
                else {
                    swal({ title: "¡Error!", text: "¡Ocurrió un error al asignar el técnico!", type: "error", confirmButtonText: "Aceptar" });
                }
            },
            error: function (request, status, error) {
                swal({ title: "¡Error!", text: "¡Ocurrió un error al asignar el técnico!", type: "error", confirmButtonText: "Aceptar" });
            }
        });
    }
}

function AgregarDatosTecnicosStc(id)
{ 
    var url = $('#tblRecepcionServicioTecnico').data("urltec") + "?documento=" + id;
    window.location = url;

}

