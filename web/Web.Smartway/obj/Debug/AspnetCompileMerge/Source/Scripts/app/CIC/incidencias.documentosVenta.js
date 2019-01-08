var oDocumentosTable;
var btnEnviarDocumento = "#btnEnviar";

function DetalleTabla(d)
{
    return '<table class= "table-hover" cellpadding="5" cellspacing="0"  style="padding-left:50px;">' +
        '<tr>' +
            '<td style="color:black;font-weight:bold;padding: 8px;" >RUC/DNI : </td>' +
            '<td style="padding: 8px;">' + d.CO_CLIE + '</td>' +
        '</tr>' +
        '<tr>' +
            '<td style="color:black;font-weight:bold;padding: 8px;" >Nombre Completo : </td>' +
            '<td style="padding: 8px;">' + d.NO_CLIE + '</td>' +
        '</tr>' +
        '<tr>' +
            '<td style="color:black;font-weight:bold;padding: 8px;" >Dirección : </td>' +
            '<td style="padding: 8px;">' + d.DE_DIRE + '</td>' +
        '</tr>' +
        '<tr>' +
            '<td style="color:black;font-weight:bold;padding: 8px;" >Tarjeta : </td>' +
            '<td style="padding: 8px;">' + d.NU_TARJ + '</td>' +
        '</tr>' +
    '</table>';
}

$(document).ready(function ()
{

    $('#data_1 .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#data_2 .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $(btnEnviarDocumento).click(function (event) { btnEnviarDocumento_onclick(this, event); });

    $("#btnBuscar").button()
                   .click(function (e)
                   {
                       var tienda =  $('#tienda').val();
                       var FechaInicio =  $('#FechaInicio').val();
                       var FechaFin =  $('#FechaFin').val();

                       if (tienda == "" || FechaInicio == "" || FechaInicio == "")
                       {
                           swal({ title: "¡Error!", text: "Ingresar tienda, fecha de inicio y fecha fin por favor!", type: "error", confirmButtonText: "Aceptar" });
                       }
                       else
                       {
                           oDocumentosTable.draw();
                       }
                   });
    $('#importe').numeric('.');

    CargaDocumentos();

  

});



function CargaDocumentos()
{
    oDocumentosTable =
       $('.dataTables-tblDocumentos').DataTable({
           "processing": true,
           "scrollX": true,
           "searching":false,
           "serverSide": true,
           "iDisplayLength": 50,
           "ajax": {
               "url": $('#tblDocumentos').data("url"),
               "data": function ( d ) {
                   d.tienda = $('#tienda').val(),
                   d.FechaInicio = $('#FechaInicio').val(),
                   d.FechaFin = $('#FechaFin').val(),
                   d.docCliente = $('#docCLiente').val(),
                   d.nomCliente = $('#nomCliente').val(),
                   d.articulo = $('#articulo').val(),
                   d.tarjeta = $('#tarjeta').val(),
                   d.importe = $('#importe').val()
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns":
               [
                    {
                        "className": 'details-control',
                        "orderable": false,
                        "data": null,
                        "defaultContent": ''
                    },
                   { "title": "Fecha", "data": "FE_DOCU", "name": "FE_DOCU", "autoWidth": true, "class": "text-center" },
                   { "title": "Tipo", "data": "TI_DOCU", "name": "TI_DOCU", "autoWidth": true, "class": "text-center" },
                   { "title": "Tienda", "data": "CO_TIEN", "name": "CO_TIEN", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "N° Documento", "data": "NU_DOCU", "name": "NU_DOCU", "sWidth": "15%", "class": "text-center",
                     "mRender":
                     function (data, type, full) 
                     {
                        return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                     }
                   },
                   { "title": "Cantidad", "data": "CANTIDAD", "name": "CANTIDAD", "autoWidth": true, "class": "text-center" },
                   { "title": "Total(S/.)", "data": "IM_TOTA", "name": "IM_TOTA", "autoWidth": true, "class": "text-center" },
                   { "title": "Motivo", "data": "CO_MOTI_DEVO", "name": "CO_MOTI_DEVO", "autoWidth": true, "class": "text-center" },   
                   { "title": "Estado", "data": "CO_ESTA_DOCU", "name": "CO_ESTA_DOCU", "autoWidth": true, "class": "text-center" },
                    {
                        "title": "Acciones", "class": "text-center", "data": "NU_DOCU", "sWidth": "12%", "mRender":
                        function (data, type, full)
                        {
                            var lnk = $("<button type='button' data-toggle='tooltip' data-placement='top'  title='Ver Documento en Paperless' class='btn-success btn btn-xs btn-outline'  href='#' > <i class='fa fa-search'></i> Paperless </button>");
                            $(lnk).attr("onClick", "verDocumentoPaperless('" + full.TI_DOCU + "¬" + full.NU_DOCU_P + "¬" + full.FE_DOCU_P + "¬" + full.IM_TOTA + "')");

                            return "<div class='btn-group'>" + $(lnk)[0].outerHTML + "</div>"
                        }
                    },
           ]
       });

    $('.dataTables-tblDocumentos tbody').on('click','td.details-control', function ()
    {
            var tr = $(this).closest('tr');
            var row = oDocumentosTable.row(tr);

            if (row.child.isShown())
            {
                row.child.hide();
                tr.removeClass('shown');
            }
            else
            {
                row.child(DetalleTabla(row.data())).show();
                tr.addClass('shown');
            }
    });
}


function ConfirmarProgramacion(id)
{
    var url = $('#tblProgramacion').data("urlcnf") + "?id=" + id;

    swal({
        title: "¿Está seguro de confirmar la Programación?",
        text: "Una vez confirmada no podra editar o eliminar la programación.",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, Confirmar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
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
              success: function (data) {
                  if (data.res == true)
                  {
                      swal("¡Confirmada!", "La Programación fue confirmada de forma correcta.", "success");
                      oDocumentosTable.draw();
                  }
                  else
                  {
                      swal({ title: "¡Error!", text: "Ocurrió un error al confirmar la Programación!", type: "error", confirmButtonText: "Aceptar" });
                  }

              },
              error: function (request, status, error) {
                  swal({ title: "¡Error!", text: "Ocurrió un error al confirmar la Programación!", type: "error", confirmButtonText: "Aceptar" });
              }
          });
      }
  });
}

function verDocumentoPaperless(cellvalue)
{
    var variable = cellvalue.split('¬');
    var TI_DOCU = variable[0];
    var NU_DOCU = variable[1];
    var FECHA = variable[2];
    var TOTAL = variable[3];

    $("#modalVerDocumentoPaperless").modal("show");

    $('#txtTDocumentoP').val(TI_DOCU);
    $('#txtDocumentoP').val(NU_DOCU);
    $('#txtFechaP').val(FECHA);
    $('#txtMontoP').val(TOTAL);

    var iframe = document.getElementById("ifPaperless")
    iframe.src = iframe.src;

}

function btnEnviarDocumento_onclick(obj, event)
{
    var url = $(obj).data("url");

    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");

        var btnEnviar = "#btnEnviarMensaje";
        $(btnEnviar).click(function (event) { btnEnviar_onclick(this, event); });
        $('.summernote').summernote();

        //$(function ()
        //{
        //    $('#FrmEnviarCorreo').submit(function (event)
        //    {
        //        $("#__hdfPrueba").val($('.summernote').code());

        //        event.preventDefault();
        //        swal({
        //            title: "Enviar Mensaje",
        //            text: "¿Está seguro de enviar el mensaje?",
        //            type: "info",
        //            showCancelButton: true,
        //            cancelButtonText: "Cancelar",
        //            confirmButtonColor: '#DD6B55',
        //            confirmButtonText: 'Enviar',
        //            closeOnConfirm: false,
        //            showLoaderOnConfirm: true,
        //            closeOnCancel: true,
        //        },
        //            function ()
        //            {
        //                showLoading();
        //                $('#FrmEnviarCorreo').unbind('submit').submit()
        //            });
        //    });

        //});


    });
}

function btnEnviar_onclick(obj, event)
{
    var url = $(obj).data("url");

    var para = $("#para").val();
    var asunto = $("#asunto").val();
    var archivo = $("#files").val();
    var contenido = $('.summernote').code();

    $("#hdfmensaje").val(htmlEscape(contenido));

    if (para == "" || asunto == "" || contenido=="")
    {
        swal({ title: "¡Error!", text: "¡Ingresar asunto, correo y mensaje a enviar!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else
    {
        swal({
            title: "¿Está seguro de enviar el mensaje?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Si, enviar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm)
        {
            if (isConfirm)
            {

                var dataModelo = $("#FrmEnviarCorreo").serialize();
                var formData = new FormData(document.getElementById("FrmEnviarCorreo"));
                formData.append("dato", "valor");
                $.ajax(
                {
                    url: url,
                    type: "POST",
                    dataType: "html",
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data)
                    {
                        if (data == "1")
                        {
                            swal("¡Correcto!", "Se envio el correo de forma correcta.", "success");
                        }
                        else
                        {
                            swal({ title: "¡Error!", text: "Ocurrió un error al enviar el mensaje!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    },
                    error: function (request, status, error)
                    {
                        swal({ title: "¡Error!", text: "Ocurrió un error al enviar el mensaje!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
            }
        });
    }

}

function htmlEscape(str)
{
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
}