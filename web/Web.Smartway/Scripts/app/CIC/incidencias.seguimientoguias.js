var oDocumentosTable;
var oDetalleProgramacionTable;

var btnModalProgramarRecojo = "#btnModalProgramarRecojo";

$(document).ready(function () {

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
    CargaListaIncidencias();
});

function CargaListaIncidencias()
{
    oDocumentosTable =
       $('.dataTables-tblIncidencias').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "processing": true,
           "serverSide": true,
           "iDisplayLength": 25,
           "order": [[0, "desc"]],
           "ajax": {
               "url": $('#tblIncidencias').data("url"),
               "data": function ( d ) {
                   d.tienda = $('#tienda').val();
                   d.incidencia = $('#incidencia').val();
                   d.FechaIni = $('#FechaIni').val();
                   d.FechaFin = $('#FechaFin').val()
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   {
                       "key": true, "title": "Id", "data": "id", "name": "id", "autoWidth": true, "class": "text-center",
                     "mRender":
                                function (data, type, full)
                                {
                                    return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                }

                   },
                   { "title": "Tipo", "data": "tipo", "name": "tipo", "autoWidth": true, "class": "text-center" },
                   { "title": "Tienda", "data": "tienda", "name": "tienda", "autoWidth": true, "class": "text-center" },
                   { "title": "Incidencia", "data": "numero", "name": "numero", "autoWidth": true, "class": "text-center" },
                   { "title": "N° Documento", "data": "documento", "name": "documento", "autoWidth": true, "class": "text-center" },
                   { "title": "Código", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true, "class": "text-center" },
                   { "title": "Descripción", "data": "pro_str_descripcion", "name": "pro_str_descripcion", "autoWidth": true },
                   { "title": "Fecha", "data": "fecha_incidencia", "name": "fecha_incidencia", "autoWidth": true, "class": "text-center" },
                   { "title": "Usuario", "data": "usuario", "name": "usuario", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Acciones", "class": "text-center", "data": "id", "sWidth": "12%", "mRender":
                         function (data, type, full)
                         {
                             var id = data;
                             return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Ver guias incidencia' class='btn-primary btn btn-xs btn-outline ' onclick='VerGuiasIncidencia(" + id + ");' > <i class='fa fa-search'></i> Ver Guias</button></div>"
                         }
                   },
           ],
           buttons: [
               { extend: 'copy' },
               { extend: 'csv' },
               { extend: 'excel', title: 'Incidencias'},
               { extend: 'pdf', title: 'Incidencias' },
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


function VerGuiasIncidencia(id)
{
    var url = $('#tblIncidencias').data("urldtl") + "?incidencia=" + id;
    $.get(url, function (data) {
        $("#modalcontentIncidenciasL").html(data);
        $("#modalcontainerIncidenciasL").modal("show");
        CargaGuiasIncidencia(id);
    });
}


function CargaGuiasIncidencia(id)
{

    oDetalleProgramacionTable =
       $('.dataTables-tblGuiasIncidencia').DataTable({
            responsive: true,
           "processing": true,
           "searching": true,
           "paging": true,
           "serverSide": true,
           "iDisplayLength": 10,
           "order": [[0, "desc"]],
           "ajax": {
               "url": $('#tblGuiasIncidencia').data("url"),
               "data": function (d)
                {

                },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   {
                       "key": true, "title": "Id", "data": "guia_int_id", "name": "guia_int_id", visible: true, "autoWidth": true, "class": "text-center",
                       "mRender":
                                  function (data, type, full) {
                                      return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                  }
                   },
                   { "title": "Almacén", "data": "gui_str_tienda", "name": "gui_str_tienda", "autoWidth": "true", "class": "text-center" },
                   { "title": "Fecha", "data": "gui_dat_fecha", "name": "gui_dat_fecha", "autoWidth": "true", "class": "text-center" },
                   { "title": "Origen", "data": "gui_str_almacenorigen", "name": "gui_str_almacenorigen", "autoWidth": "true", "class": "text-center" },
                   { "title": "Destino", "data": "gui_str_almacendestino", "name": "gui_str_almacendestino", "autoWidth": "true", "class": "text-center" },
                   { "title": "Tipo", "data": "gui_str_coddocumento", "name": "gui_str_coddocumento", "autoWidth": "true", "class": "text-center" },
                   { "title": "operación", "data": "gui_str_codoperacion", "name": "gui_str_codoperacion", "autoWidth": "true", "class": "text-center" },
                   {
                       "title": "N° Guia", "data": "gui_str_numero", "name": "gui_str_numero", "autoWidth": "true", "class": "text-center",
                       "mRender":
                                  function (data, type, full) {
                                      return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                  }
                   },
                   {
                       "title": "N° Guia Ingreso", "data": "gui_str_igringreso", "name": "gui_str_igringreso", "autoWidth": "true", "class": "text-center",
                       "mRender":
                                  function (data, type, full)
                                  {
                                      if (data != "")
                                      {
                                          return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                      }
                                      else
                                      {

                                          return "<span >" + " " + data + " " + "</span>";
                                      }
                                      
                                  }

                   },
                   { "title": "Estado", "data": "estado", "name": "estado", "autoWidth": "true", "class": "text-center" },
                   { "title": "Usuario", "data": "usuario", "name": "usuario", "autoWidth": "true", "class": "text-center" },
                
           ]
       });
}



function ConvertirFecha(fecha) {
    array_Fecha = fecha.split("/");

    var dia = array_Fecha[0];
    var mes = (array_Fecha[1] - 1)
    var ano = array_Fecha[2];
    var fechaReal = new Date(ano, mes, dia);
    return fechaReal;
}