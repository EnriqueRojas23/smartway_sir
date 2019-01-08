var oDocumentosTable;

$(document).ready(function () {

    $('#data_1 .input-daterange').datepicker({
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
       $('.dataTables-tblRecepcionGuiasTienda').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "processing": true,
           "serverSide": true,
           "iDisplayLength": 25,
           "order": [[0, "desc"]],
           "ajax": {
               "url": $('#tblRecepcionGuiasTienda').data("url"),
               "data": function ( d ) {
                   d.tienda = $('#tienda').val();
                   d.guia = $('#guia').val();
                   d.FechaIniGuia = $('#FechaIniEmision').val();
                   d.FechaFinGuia = $('#FechaFinEmision').val();
                   d.TipoDocumento = $('#tipoDocInterno').val();
                   d.estadoGuia = $('#estado').val()
               },
               "type": "POST",
               "datatype": "json"
           },


           "columns": [
                   {
                       "key": true, "title": "Id", "data": "guia_int_id", "name": "guia_int_id", "autoWidth": true, "class": "text-center",
                       "mRender":
                                function (data, type, full) {
                                    return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                }

                   },
                   { "title": "Tipo", "data": "tdi_str_codigo", "name": "tdi_str_codigo", "autoWidth": true, "class": "text-center" },
                   { "title": "Almacén", "data": "gui_str_tienda", "name": "gui_str_tienda", "autoWidth": true, "class": "text-center" },
                   { "title": "N° Guia", "data": "gui_str_numero", "name": "gui_str_numero", "autoWidth": true },
                   { "title": "Destino", "data": "gui_str_tiendadestino", "name": "gui_str_tiendadestino", "autoWidth": true, "class": "text-center" },
                   { "title": "Emisión", "data": "gui_dat_fecha", "name": "gui_dat_fecha", "autoWidth": true, "class": "text-center" },
                   { "title": "Items", "data": "total_items", "name": "total_items", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Estado", "data": "estado", "name": "estado", "autoWidth": true, "class": "text-center",
                       "mRender":
                               function (data, type, full)
                               {
                                   var label = full.label_estado
                                   return "<span class='" + label + "'>" + " " + data + " " + "</span>";
                               }
                   },
                   { "title": "Fecha Recepción", "data": "gui_dat_fechrecepciontienda", "name": "gui_dat_fechrecepciontienda", "autoWidth": true, "class": "text-center" },
                   { "title": "Usuario", "data": "usuario_recepcion", "name": "usuario_recepcion", "autoWidth": true },
                   { "title": "Guia Ingreso", "data": "gui_str_igringreso", "name": "gui_str_igringreso", "autoWidth": true },
                   {
                       "title": "Acciones", "class": "text-center", "data": "guia_int_id", "mRender": function (data, type, full)
                       {
                           var id = data;
                           var recepcion = full.gui_bit_recepciontienda;

                           if (recepcion == true)
                           {
                               return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Ver Detalle' class='btn-primary btn btn-xs btn-outline ' onclick='RecepcionarGuia(" + id + ");' href='#' > <i class='fa fa-search'></i> Ver Detalle </button></div>"
                           }
                           else
                           {
                               return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Recepcionar Guia' class='btn-warning btn btn-xs btn-outline ' onclick='RecepcionarGuia(" + id + ");' href='#' > <i class='fa fa-inbox'></i> Recepcionar Guia</button></div>"
                           }
                       }
                   },
           ],
           buttons: [
               { extend: 'copy' },
               { extend: 'csv' },
               { extend: 'excel', title: 'Guias'},
               { extend: 'pdf', title: 'Guias' },
               {
                   extend: 'print',
                   customize: function (win) {
                       $(win.document.body).addClass('white-bg');
                       $(win.document.body).css('font-size', '9px');

                       $(win.document.body).find('table')
                               .addClass('compact')
                               .css('font-size', 'inherit');
                   }
               }
           ]

       });
}

function RecepcionarGuia(guia)
{
    var url = $('#tblRecepcionGuiasTienda').data("urlrcv") + "?guia=" + guia;
    window.location = url;
}

//function RecepcionarGuia(guia)
//{
//    swal({
//        title: "¿Está seguro de recepcionar la guia?",
//        text: "Al confirmar la recepción se generará una guia de ingreso en OFISIS",
//        type: "warning",
//        showCancelButton: true,
//        confirmButtonClass: "btn-danger",
//        confirmButtonText: "Si, recepcionar guia",
//        cancelButtonText: "Cancelar",
//        closeOnConfirm: false,
//        closeOnCancel: true
//    },
//  function (isConfirm)
//  {
//      if (isConfirm)
//      {
//          var url = $('#tblRecepcionGuiasTienda').data("urlrcv") + "?guia=" + guia;

//          $.ajax(
//          {
//              type: "POST",
//              async: true,
//              url: url,
//              success: function (data)
//              {
//                  if (data.res == true)
//                  {
//                      swal("¡Recepcionada!", "La guia fue recepcionada de forma correcta y se generó  la guia : " + data.guiaingreso, "success");
//                      oDocumentosTable.draw();
//                  }
//                  else {
//                      swal({ title: "¡Error!", text: "Ocurrió un error al recepcionar la guia!", type: "error", confirmButtonText: "Aceptar" });
//                  }

//              },
//              error: function (request, status, error) {
//                  swal({ title: "¡Error!", text: "Ocurrió un error al recepcionar la guia!", type: "error", confirmButtonText: "Aceptar" });
//              }
//          });
//      }
//  });
//}