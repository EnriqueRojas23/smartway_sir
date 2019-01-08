var oDocumentosTable;
var oDetalleOGPTable;
var btnModalGenerarOGP = "#btnModalGenerarOGP";

$(document).ready(function () {

    $(btnModalGenerarOGP).click(function (event) { btnModalGenerarOGP_onclick(this, event); });

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


    $("#btnBuscar").button()
                   .click(function (e) {
                       oDocumentosTable.draw();
                   });
 
    CargaListaOGP();
});

function CargaListaOGP()
{
    oDocumentosTable =
       $('.dataTables-tblRecepcionGuias').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "processing": true,
           "serverSide": true,
           "order": [[ 0, "desc" ]],
           "ajax": {
               "url": $('#tblRecepcionGuias').data("url"),
               "data": function ( d ) {
                   d.tienda = $('#tienda').val();
                   d.guia = $('#guia').val();
                   d.FechaIniGuia = $('#FechaIniEmision').val();
                   d.FechaFinGuia = $('#FechaFinEmision').val();
                   d.TipoDocumento = $('#tipoDocInterno').val();
                   d.estadoGuia = $('#estado').val();
                   d.FechaIniRecojo = $('#FechaIniRecojo').val();
                   d.FechaFinRecojo = $('#FechaFinRecojo').val()
               },
               "type": "POST",
               "datatype": "json"
           },


           "columns": [
                   {
                       "key": true, "title": "Id", "data": "guia_int_id", "name": "guia_int_id", "autoWidth": true, "class": "text-center",
                       "mRender":
                                function (data, type, full) {
                                    return "<span class='label label-success'>" + " " + data + " " + "</span>";
                                }

                   },
                   { "title": "Tienda", "data": "gui_str_tienda", "name": "gui_str_tienda", "autoWidth": true },
                   { "title": "N° Guia", "data": "gui_str_numero", "name": "gui_str_numero", "autoWidth": true },
                   { "title": "Fecha Emisión", "data": "gui_dat_fecha", "name": "gui_dat_fecha", "autoWidth": true, "class": "text-center" },
                   { "title": "Tipo", "data": "tdi_str_codigo", "name": "tdi_str_codigo", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Estado Guia", "data": "estado", "name": "estado", "autoWidth": true, "class": "text-center",
                       "mRender":
                               function (data, type, full)
                               {
                                   var label = full.label_estado
                                   return "<span class='" + label + "'>" + " " + data + " " + "</span>";
                               }
                   },
                   { "title": "Final Recepción", "data": "gui_dat_fechrecepcion", "name": "gui_dat_fechrecepcion", "autoWidth": true, "class": "text-center" },
                   { "title": "Usuario Recepción", "data": "usuario_recepcion", "name": "usuario_recepcion", "autoWidth": true },
                   { "title": "Guia Ingreso", "data": "gui_str_igringreso", "name": "gui_str_igringreso", "autoWidth": true },
                   {
                       "title": "Acciones", "class": "text-center", "data": "guia_int_id", "mRender": function (data, type, full)
                       {
                           var id = data;
                           var recepcion = full.gui_bit_recepcionalmacen;

                           if (recepcion == true)
                           {
                               var lnk = $("<button type='button' data-toggle='tooltip' data-placement='top' title='Ver Detalle' class='btn-primary btn btn-xs btn-outline ' href='#' > <i class='fa fa-search'></i> Detalle </button>");
                               $(lnk).attr("onClick", "RecepcionarGuia(" + id + ")");

                               var lnkFaltantes = $("<a>Faltantes</a>");
                               var lnkSobrantes = $("<a>Sobrantes</a>");
                               $(lnkFaltantes).attr("onClick", "ReporteFaltantes(" + id + ")");
                               $(lnkSobrantes).attr("onClick", "ReporteSobrantes(" + id + ")");

                               var lnkReportes = $("<div class='btn-group'><button data-toggle='dropdown' class='btn btn-xs btn-primary dropdown-toggle'><i class='fa fa-print'></i> <span class='caret'></span></button>" +
                                                    "<ul class='dropdown-menu'>" +
                                                    "    <li>" + $(lnkFaltantes)[0].outerHTML + "</li>" +
                                                    "    <li>" + $(lnkSobrantes)[0].outerHTML + "</li>" +
                                                    "</ul></div>");

                               return "<div class='btn-group'>" + $(lnkReportes)[0].outerHTML + $(lnk)[0].outerHTML + "</div>"
                           }
                           else

                           {
                               return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Recepcionar Guia' class='btn-warning btn btn-xs btn-outline ' onclick='RecepcionarGuia(" + id + ");' href='#' > <i class='fa fa-inbox'></i> Recepcionar</button></div>"
                           }
                       }
                   },
           ],
           buttons: [
               { extend: 'copy' },
               { extend: 'csv' },
               { extend: 'excel', title: 'Guias de Salida'},
               { extend: 'pdf', title: 'Guias de Salida' },
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

function RecepcionarGuia( guia)
{
    var url = $('#tblRecepcionGuias').data("urlrcv") + "?guia=" + guia;
    window.location = url;
}

function ReporteFaltantes(guia)
{
    var url = $('#tblRecepcionGuias').data("urlfal") + "?guia=" + guia;

    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
    });
}

function ReporteSobrantes(guia) {

    var url = $('#tblRecepcionGuias').data("urlsob") + "?guia=" + guia;

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