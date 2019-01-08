var oDocumentosTable;

$(document).ready(function () {


    $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $("#btnBuscar").button()
                   .click(function (e) {
                       oDocumentosTable.draw();
                   });

    CargaListaOrdenesReparacion();
});

function CargaListaOrdenesReparacion()
{
    oDocumentosTable =
       $('.dataTables-tblODR').DataTable({
           dom: '<"html5buttons"B>lTfgitp',
           "processing": true,
           "order": [[ 1, "desc" ]],
           "serverSide": true,
           "scrollY": "50vh",
           "scrollX": true,
           "iDisplayLength": 25,
           "ajax": {
               "url": $('#tblODR').data("url"),
               "data": function ( d ) {
                   d.tienda = $('#tienda').val();
                   d.odr = $('#odr').val();
                   d.Fecha = $('#Fecha').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns":
               [
                   {
                       "key": true, "title": "Id", "data": "inc_int_id", "name": "inc_int_id", visible: true, "autoWidth": true, "class": "text-center",
                     "mRender":
                                function (data, type, full)
                                {
                                    return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                }
                   },
                   {
                       "title": "Incidencia", "data": "incidencia", "name": "incidencia", "autoWidth": true, "class": "text-center",
                       "mRender":
                                   function (data, type, full) {
                                       return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                   }
                   },
                   {
                       "title": "N° de ODR", "data": "odr", "name": "ods", "autoWidth": true, "class": "text-center"
                   },
                   { "title": "Tienda", "data": "tienda", "name": "tienda", "autoWidth": true, "class": "text-center" },
                   { "title": "Fecha", "data": "inc_dat_fechacreacion", "name": "inc_dat_fechacreacion", "autoWidth": true, "class": "text-center" },
                   { "title": "Usuario", "data": "usuario", "name": "usuario", "autoWidth": true, "class": "text-center" },
                   { "title": "Código Item", "data": "item", "name": "item", "autoWidth": true, },
                   {
                       "title": "Propuesta", "class": "text-center", "data": "propuesta", "name": "propuesta", "autoWidth": true, "mRender":
                        function (data, type, full)
                        {
                              var estado = data;
                              return "<span class='label label-" + full.label_estado + "'><i class='fa " + full.imagen_estado + "' ></i>" + " " + estado + " " + "</span>";
                        }
                   },
                   { "title": "N° Guía Salida", "data": "guia_salida", "name": "guia_salida", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Acciones", "class": "text-center", "data": "inc_int_id", "sWidth": "15%", "mRender":
                        function (data, type, full)
                        {
                            var iddocumento = full.dci_int_id;
                            var estado = full.propuesta;

                            if (full.odr_generada == true)
                            {
                                return "<div><button type='button' data-toggle='tooltip' data-placement='top' class='btn-success btn btn-xs btn-outline ' onclick='DetalleCompleto(" + data + ");'> <i class='fa fa-search'></i> Detalle </button><button type='button' data-toggle='tooltip' title='Seguimiento 'data-placement='top' class='btn-primary btn btn-xs btn-outline ' onclick='MostrarSeguimiento(" + iddocumento + ");'> <i class='fa fa-history'></i> </button><button type='button' data-toggle='tooltip' title='Imprimir ODR 'data-placement='top' class='btn-primary btn btn-xs btn-outline ' onclick='ImprimirODR(" + full.inc_int_id + ");'> <i class='fa fa-print'></i> </button></div>";
                            }
                            else
                            {
                                if (estado == "Aceptada")
                                {
                                    return "<div class='btn-group'><button  type='button' class='btn-primary btn btn-xs btn-outline'  id='btnGenerarODR' onClick='GenerarODR(" + full.inc_int_id + ")' > Generar ODR <i class='fa fa-gear fa-spin'></i></button></div>"
                                }
                                else if (estado == "Rechazada")
                                {
                                    return "<span class='label label-default'>" + "SIN ACCIONES" + "</span>";
                                }
                                else
                                {
                                    if (full.solicitud == true)
                                    {
                                        return "<span class='label label-default'>" + "SIN ACCIONES" + "</span>";
                                    }
                                    else
                                    {
                                        var id = full.inp_int_id;
                                        return "<div class='btn-group'><button  type='button' class='btn-danger btn btn-xs btn-outline'  id='lnkSolicitar' onClick='EnviarSolicitud(" + id + "," + full.inc_int_id + ")' > Enviar Solicitud  <i class='fa fa-envelope'></i></button></div>"
                                    }
                                }
                               
                            }
                            
                        }
                   },
           ],
           buttons: [
               { extend: 'copy' },
               { extend: 'csv' },
               { extend: 'excel', title: 'Ordenes de Reparación'},
               { extend: 'pdf', title: 'Ordenes de Reparación' },
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

function DetalleCompleto(incidencia)
{
    var vUrl = $('#tblODR').data("urldtl") + "?incidencia=" + incidencia;
    $(window).attr("location", vUrl);
}



function ConvertirFecha(fecha) {
    array_Fecha = fecha.split("/");

    var dia = array_Fecha[0];
    var mes = (array_Fecha[1] - 1)
    var ano = array_Fecha[2];
    var fechaReal = new Date(ano, mes, dia);
    return fechaReal;
}


function MostrarSeguimiento(documento)
{

    var url = $('#tblODR').data("urlseg") + "?documento=" + documento;
    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
    });
}

function ImprimirTicketConformidad(odr)
{
    var url = $('#tblODR').data("urltck") + "?ods=" + odr;
    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
    });
}

function GenerarODR(incidencia)
{
    var vUrl = $('#tblODR').data("urlodr") + "?inc_int_id=" + incidencia;
    $(window).attr("location", vUrl);
}


function ImprimirODR(incidencia)
{
    var url = $('#tblODR').data("urlimp") + "?incidencia=" + incidencia;
    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
    });
}

function EnviarSolicitud(propuesta,incidencia)
{
    var url = $('#tblODR').data("urlsol") + "?incidencia=" + incidencia;
    $.get(url, function (data) {
        $("#modalcontentIncidenciasP").html(data);
        $("#modalcontainerIncidenciasP").modal("show");
        inicializandoModalSolicitud(propuesta);
    });
}

function inicializandoModalSolicitud(propuesta)
{
    $('#hfIdPropuesta').val(propuesta);
}