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
 
    CargaGuias();
});

function CargaGuias()
{
    oDocumentosTable =
       $('.dataTables-tblRecepcionGuias').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "processing": true,
           "pageLength": 25,
           "serverSide": true,
           "order": [[ 0, "desc" ]],
           "ajax": {
               "url": $('#tblRecepcionGuias').data("url"),
               "data": function ( d ) {
                   d.origen = $('#tienda_origen').val();
                   d.destino = $('#tienda_destino').val();
                   d.guia = $('#guia').val();
                   d.FechaIniGuia = $('#FechaIniEmision').val();
                   d.FechaFinGuia = $('#FechaFinEmision').val();
                   d.estadoGuia = $('#estado').val();
               },
               "type": "POST",
               "datatype": "json"
           },


           "columns": [
                   { "title": "Tipo", "data": "TI_DOCU", "name": "TI_DOCU", "visible": true, "autoWidth": true, "class": "text-center" },
                   {
                       "title": "N° Guia", "data": "NU_DOCU", "name": "NU_DOCU", "autoWidth": true, "class": "text-center",
                       "mRender":
                                   function (data, type, full) {
                                       return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                   }
                   },
                   { "title": "Origen", "data": "ORIGEN", "name": "ORIGEN", "autoWidth": true },
                   { "title": "Destino", "data": "DESTINO", "name": "DESTINO", "autoWidth": true, "class": "text-center" },
                   { "title": "Fecha Emisión", "data": "FECHA", "name": "FECHA", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Estado", "data": "ESTADO", "name": "ESTADO", "autoWidth": true, "class": "text-center",
                       "mRender":
                               function (data, type, full)
                               {
                                   var label = full.LABEL_ESTADO
                                   return "<span class='" + label + "'>" + " " + data + " " + "</span>";
                               }
                   },

                   { "title": "Fecha Recepción", "data": "FECHA_RECEPCION", "name": "FECHA_RECEPCION", "autoWidth": true, "class": "text-center" },
                   { "title": "Usuario Recepción", "data": "USUARIO_RECEPCION", "name": "USUARIO_RECEPCION", "autoWidth": true },
                   { "title": "Guia Ingreso", "data": "GUIA_INGRESO", "name": "GUIA_INGRESO", "autoWidth": true },
                   {
                       "title": "Acciones", "class": "text-center", "data": "guia_int_id", "mRender": function (data, type, full)
                       {
                           var id = data;
                           var recepcion = full.RECIBIDO;

                           if (recepcion == true)
                           {

                               var lnk = $("<button type='button' data-toggle='tooltip' data-placement='top' title='Ver Detalle' class='btn-primary btn btn-xs btn-outline'  href='#' > <i class='fa fa-search'></i> Detalle </button>");
                               $(lnk).attr("onClick", "DetalleRecepcion('" + full.CO_EMPR + "¬" + full.TIPO_INGRESO + "¬" + full.GUIA_INGRESO + "¬" + full.ALMACEN_INGRESO +"')");

                               var lnkFaltantes = $("<a>Faltantes</a>");
                               var lnkSobrantes = $("<a>Sobrantes</a>");
                               $(lnkFaltantes).attr("onClick", "ReporteFaltantes('" + full.CO_EMPR + "¬" + full.TIPO_INGRESO + "¬" + full.GUIA_INGRESO + "¬" + full.ALMACEN_INGRESO + "')");
                               $(lnkSobrantes).attr("onClick", "ReporteSobrantes('" + full.CO_EMPR + "¬" + full.TIPO_INGRESO + "¬" + full.GUIA_INGRESO + "¬" + full.ALMACEN_INGRESO + "')");

                               var lnkReportes = $("<div class='btn-group'><button data-toggle='dropdown' class='btn btn-xs btn-primary dropdown-toggle'><i class='fa fa-print'></i> <span class='caret'></span></button>" +
                                                    "<ul class='dropdown-menu'>" +
                                                    "    <li>" + $(lnkFaltantes)[0].outerHTML + "</li>" +
                                                    "    <li>" + $(lnkSobrantes)[0].outerHTML + "</li>" +
                                                    "</ul></div>");

                               return "<div class='btn-group'>" + $(lnkReportes)[0].outerHTML + $(lnk)[0].outerHTML + "</div>"
                           }
                           else
                           {
                               var lnk = $("<button type='button' data-toggle='tooltip' data-placement='top' title='Ver Detalle' class='btn-warning btn btn-xs btn-outline'  href='#' > <i class='fa fa-inbox'></i> Recepcionar </button>");
                               $(lnk).attr("onClick", "RecepcionarGuia('" + full.CO_EMPR + "¬" + full.TI_DOCU + "¬" + full.TI_OPER + "¬" + full.NU_DOCU + "¬" + full.CO_ALMA + "')");

                               return "<div class='btn-group'>" + $(lnk)[0].outerHTML + "</div>"
                           }
                       }
                   },
           ],
           buttons: [
               { extend: 'copy' },
               { extend: 'csv' },
               { extend: 'excel', title: 'Guias de Transferencia'},
               { extend: 'pdf', title: 'Guias de Transferencia' },
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

function RecepcionarGuia(cellvalue)
{
    var variable = cellvalue.split('¬');
    var CO_EMPR = variable[0];
    var TIPO = variable[1];
    var OPERACION = variable[2];
    var GUIA = variable[3];
    var ALMACEN= variable[4];

    var url = $('#tblRecepcionGuias').data("urlrcv") + "?empresa=" + CO_EMPR + "&tipo=" + TIPO + "&operacion=" + OPERACION + "&doc=" + GUIA + "&alma=" + ALMACEN;
    window.location = url;
}

function DetalleRecepcion(cellvalue)
{
    var variable = cellvalue.split('¬');
    var CO_EMPR = variable[0];
    var TIPO_INGRESO = variable[1];
    var GUIA_INGRESO = variable[2];
    var ALMACEN_INGRESO = variable[3];

    var url = $('#tblRecepcionGuias').data("urldtl") + "?empresa=" + CO_EMPR + "&tipo=" + TIPO_INGRESO + "&doc=" + GUIA_INGRESO + "&alma=" + ALMACEN_INGRESO;
    window.location = url;
}

function ReporteFaltantes(cellvalue) {
    var variable = cellvalue.split('¬');
    var CO_EMPR = variable[0];
    var TIPO_INGRESO = variable[1];
    var GUIA_INGRESO = variable[2];
    var ALMACEN_INGRESO = variable[3];

    var url = $('#tblRecepcionGuias').data("urlfal") + "?empresa=" + CO_EMPR + "&tipo=" + TIPO_INGRESO + "&doc=" + GUIA_INGRESO + "&alma=" + ALMACEN_INGRESO;

    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
    });
}

function ReporteSobrantes(cellvalue) {
    var variable = cellvalue.split('¬');
    var CO_EMPR = variable[0];
    var TIPO_INGRESO = variable[1];
    var GUIA_INGRESO = variable[2];
    var ALMACEN_INGRESO = variable[3];

    var url = $('#tblRecepcionGuias').data("urlsob") + "?empresa=" + CO_EMPR + "&tipo=" + TIPO_INGRESO + "&doc=" + GUIA_INGRESO + "&alma=" + ALMACEN_INGRESO;

    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
    });
}

function rellenar(quien, que) {
    if (que.length < 15) {
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
