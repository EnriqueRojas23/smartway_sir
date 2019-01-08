var oDocumentosTable;
var oDocumentosFaltantesTable;
var oDocumentosSobrantesTable;
var PorcentajeAvance;


var CO_EMPR = $('#CO_EMPR').val();
var TIPO_INGRESO = $('#TI_DOCU').val();
var GUIA_INGRESO = $('#NU_DOCU').val();
var ALMACEN_INGRESO = $('#CO_ALMA').val();

var CO_EMPR_FALTANTE = $('#CO_EMPR_FAL').val();
var TIPO_FALTANTE = $('#TI_DOCU_FAL').val();
var OPER_FALTANTE = $('#TI_OPER_FAL').val();
var GUIA_FALTANTE = $('#NU_DOCU_FAL').val();
var ALMACEN_FALTANTE = $('#CO_ALMA_FAL').val();

var CO_EMPR_SOBRANTE = $('#CO_EMPR_SOB').val();
var TIPO_SOBRANTE = $('#TI_DOCU_SOB').val();
var OPER_SOBRANTE = $('#TI_OPER_SOB').val();
var GUIA_SOBRANTE = $('#NU_DOCU_SOB').val();
var ALMACEN_SOBRANTE = $('#CO_ALMA_SOB').val();

$(document).ready(function () {

    CargaDetalleRecepcion();
    CargaFaltantesRecepcion();
    CargaSobrantesRecepcion();
});


function CargaDetalleRecepcion()
{
    oDocumentosTable =
       $('.dataTables-tblDetalleGuia').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "pageLength": 25,
           "searching": true,
           "ordering": true,
           "processing": false,
           "serverSide": true,
           "ajax": {
               "url": $('#tblDetalleGuia').data("url") + "?empresa=" + CO_EMPR + "&tipo=" + TIPO_INGRESO + "&doc=" + GUIA_INGRESO + "&alma=" + ALMACEN_INGRESO,
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   {
                       "key": true, "title": "Id", "data": "NU_SECU", "name": "NU_SECU", "autoWidth": true, "class": "text-center",
                       "mRender":
                                function (data, type, full)
                                {
                                    return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                }
                   },
                   { "title": "Item", "data": "CO_ITEM", "name": "CO_ITEM", "autoWidth": true, "class": "text-center" },
                   { "title": "Descripción", "data": "DE_ITEM", "name": "DE_ITEM", "autoWidth": true, "class": "text-center" },
                   { "title": "IMEI", "data": "CO_LOTE_REFE", "name": "CO_LOTE_REFE", "autoWidth": true, "class": "text-center" },
                   { "title": "Cantidad Guia", "data": "CA_DOCU_MOVI", "name": "CA_DOCU_MOVI", "autoWidth": true, "class": "text-center" },
                   { "title": "Cantidad Confirmada", "data": "CA_DOCU_DEST", "name": "CA_DOCU_DEST", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Diferencia", "data": "DIFERENCIA", "name": "DIFERENCIA", "autoWidth": true, "class": "text-center",
                       "mRender":
                                   function (data, type, full)
                                   {
                                       if (data < 0)
                                       {
                                           return "<span class='label label-danger'>" + " " + data + " " + "</span>";
                                       }
                                       else if (data > 0) {
                                           return "<span class='label label-warning'>" + " " + data + " " + "</span>";
                                       }
                                       else {
                                           return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                       }
                                   }
                   },
                  
           ],
           buttons: [
                { extend: 'copy' },
                { extend: 'csv' },
                { extend: 'excel', title: 'Detalle' },
                { extend: 'pdf', title: 'Detalle' },
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


function CargaFaltantesRecepcion()
{
    oDocumentosFaltantesTable =
       $('.dataTables-tblDetalleFaltantes').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "pageLength": 25,
           "searching": true,
           "ordering": true,
           "processing": false,
           "serverSide": true,
           "ajax": {
               "url": $('#tblDetalleFaltantes').data("url") + "?empresa=" + CO_EMPR_FALTANTE + "&tipo=" + TIPO_FALTANTE + "&operacion=" + OPER_FALTANTE + "&doc=" + GUIA_FALTANTE + "&alma=" + ALMACEN_FALTANTE,
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   {
                       "key": true, "title": "Id", "data": "NU_SECU", "name": "NU_SECU", "autoWidth": true, "class": "text-center",
                       "mRender":
                                function (data, type, full) {
                                    return "<span class='label label-danger'>" + " " + data + " " + "</span>";
                                }
                   },
                   { "title": "Item", "data": "CO_ITEM", "name": "CO_ITEM", "autoWidth": true, "class": "text-center" },
                   { "title": "Descripción", "data": "DE_ITEM", "name": "DE_ITEM", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Cantidad", "data": "CA_DOCU_MOVI", "name": "CA_DOCU_MOVI", "autoWidth": true, "class": "text-center",

                       "mRender":
                                 function (data, type, full)
                                 {
                                     return "<span class='label label-danger'>" + " " + data + " " + "</span>";

                                 }
                   },
                   { "title": "Observación", "data": "DE_OBSE_0001", "name": "DE_OBSE_0001", "autoWidth": true, "class": "text-center" },
           ],
           buttons: [
                { extend: 'copy' },
                { extend: 'csv' },
                { extend: 'excel', title: 'Faltantes' },
                { extend: 'pdf', title: 'Faltantes' },
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

function CargaSobrantesRecepcion()
{

    oDocumentosSobrantesTable =
       $('.dataTables-tblDetalleSobrantes').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "pageLength": 25,
           "searching": true,
           "ordering": true,
           "processing": false,
           "serverSide": true,
           "ajax": {
               "url": $('#tblDetalleSobrantes').data("url") + "?empresa=" + CO_EMPR_SOBRANTE + "&tipo=" + TIPO_SOBRANTE + "&operacion=" + OPER_SOBRANTE + "&doc=" + GUIA_SOBRANTE + "&alma=" + ALMACEN_SOBRANTE,
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   {
                       "key": true, "title": "Id", "data": "NU_SECU", "name": "NU_SECU", "autoWidth": true, "class": "text-center",
                       "mRender":
                                function (data, type, full) {
                                    return "<span class='label label-danger'>" + " " + data + " " + "</span>";
                                }
                   },
                   { "title": "Item", "data": "CO_ITEM", "name": "CO_ITEM", "autoWidth": true, "class": "text-center" },
                   { "title": "Descripción", "data": "DE_ITEM", "name": "DE_ITEM", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Cantidad", "data": "CA_DOCU_MOVI", "name": "CA_DOCU_MOVI", "autoWidth": true, "class": "text-center",

                       "mRender":
                                 function (data, type, full) {
                                     return "<span class='label label-danger'>" + " " + data + " " + "</span>";

                                 }
                   },
                   { "title": "Observación", "data": "DE_OBSE_0001", "name": "DE_OBSE_0001", "autoWidth": true, "class": "text-center" },
           ],
           buttons: [
                { extend: 'copy' },
                { extend: 'csv' },
                { extend: 'excel', title: 'Sobrantes' },
                { extend: 'pdf', title: 'Sobrantes' },
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

function Regresar()
{
    var url = $('#btnRegresar').data("url");
    window.location = url;
}