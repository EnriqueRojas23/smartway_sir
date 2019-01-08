var oDocumentosTable;

$(document).ready(function () {

    Configurar_DatePicker();
    Configurar_Combos();
    configurarGrilla();

    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
        $('#gridlistaincidencias').setGridWidth(width);
    });

});


function configurarGrilla() {

    var ci = $('#ci_int_id').val();
    var ti = $('#ti_int_id').val();
    var mc = $('#mc_int_id').val();
    var eta = $('#eta_int_id').val();
    var tien = $('#co_tien').val();
    var fechaIn = $('#inc_dat_fechaInicio').val();
    var fechaFin = $('#inc_dat_fechaFin').val();
    var nro = $('#numeroIncidencia').val();

    oDocumentosTable =
      $('.dataTables-tblIncidencias').DataTable({
          "scrollY": "50vh",
          "scrollX": true,
          "iDisplayLength": 25,
          "processing": true,
          //"searching": false,
          "serverSide": true,
          "order": [[ 0, "desc" ]],
          "ajax":
           {
              "url": $('#tblIncidencias').data("url"),
              "data": function (d)
              {
                  d.ci = $('#ci_int_id').val();
                  d.ti = $('#ti_int_id').val();
                  d.mc = $('#mc_int_id').val();
                  d.eta = $('#eta_int_id').val();
                  d.tien = $('#co_tien').val();
                  d.fechaIn = $('#inc_dat_fechaInicio').val();
                  d.fechaFin = $('#inc_dat_fechaFin').val();
                  d.nro = $('#numeroIncidencia').val();
                  d.libro = $('#inc_str_libroreclamaciones').val();
                  d.dni = $('#cli_str_documento').val();
                  d.cliente = $('#cli_str_nombres').val()
              },
              "type": "POST",
              "datatype": "json",
          },
          "columns": [
                  { "key": true, "title": "N°", "data": "inc_int_id", "name": "inc_int_id", "autoWidth": "true" },
                  {
                      "title": "Acciones", "class": "text-center", "data": "inc_int_id", "autoWidth": "true", "mRender":

                        function (data, type, full)
                        {
                            if (full.inc_bit_eliminado == true)
                            {
                                return "<span class='label'> SIN ACCIONES</span>";
                            }
                            else
                            {
                                return "<div><button type='button' data-toggle='tooltip' data-placement='top' class='btn-warning btn btn-xs btn-outline ' onclick='editarIncidencia(" + data + ");' > <i class='fa fa-edit'></i> Editar </button> <button type='button' data-toggle='tooltip' data-placement='top' class='btn-danger btn btn-xs btn-outline' title='Eliminar Incidencia'  onclick='EliminarIncidencia(" + data + ");' > <i class='fa fa-trash'></i> </button></div>";
                            }
                        }
                  },
                  { "title": "Tipo", "data": "ti_str_descripcion", "name": "ti_str_descripcion", "autoWidth": true, "class": "text-center" },
                  {
                      "title": "N° Incidencia", "data": "inc_str_numero", "name": "inc_str_numero", "autoWidth": true, "class": "text-center",
                      "mRender": function (data, type, full)
                       {
                           return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                       }
                  },
                  {
                      "title": "N° Libro", "data": "inc_str_libroreclamaciones", "name": "inc_str_libroreclamaciones", "autoWidth": true, "class": "text-center",
                      "mRender": function (data, type, full)
                      {
                           return "<span >" + " " + data + " " + "</span>";
                       }
                  },
                  { "title": "Usuario", "data": "usr_str_nombre", "name": "usr_str_nombre", "autoWidth": true },
                  { "title": "Tienda", "data": "tie_str_descrip", "name": "tie_str_descrip", "autoWidth": true, "class": "text-center" },
                  {
                      "title": "Etapa", "data": "eta_str_descripcion", "name": "eta_str_descripcion", "autoWidth": true, "class": "text-center",
                      "mRender": function (data, type, full) {
                          return "<span class='label label-info'>" + " " + data + " " + "</span>";
                      }
                  },
                  {
                      "title": "Estado", "data": "est_str_descripcion", "name": "est_str_descripcion", "autoWidth": true, "class": "text-center",
                       "mRender":
                        function (data, type, full) {
                            return "<span class='label " +  full.label_estado + "'>" + " " + data + " " + "</span>";
                        }
                  },
                  { "title": "Fecha", "data": "inc_dat_fecharegistro", "name": "inc_dat_fecharegistro", "autoWidth": true, "class": "text-center" },
                  { "title": "DNI", "data": "cli_str_documento", "name": "cli_str_documento", "autoWidth": true, "class": "text-center" },
                  { "title": "Cliente", "data": "cli_str_nombre", "name": "cli_str_nombre", "autoWidth": true },
                  { "title": "Doc. Compra", "data": "tdoc_str_numero", "name": "tdoc_str_numero", "autoWidth": true, "class": "text-center" },
                  { "title": "Cód. Producto", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true, "class": "text-center" },
                  { "title": "Producto", "data": "pro_str_descripcion", "name": "pro_str_descripcion", "autoWidth": true },
          ],
      });
}


function editarIncidencia(cellvalue)
{
    var url = $('#tblIncidencias').data("urledit") + "?inc_int_id=" + cellvalue;
    $(window).attr("location", url);
}



function bottoneditarsistema_formatter(cellvalue, options, rowObject) {
    var control = $("<button></button>");
    control.append("<i class='fa fa-check-circle'></i>")
    control.append("Editar")
    control.addClass("btn btn-primary btn-xs btn-outline")
    control.attr("id", "lnk" + cellvalue);
    control.attr("onclick", "irEditarSistema('" + cellvalue + "')");

    var htmlcontrol = control[0].outerHTML;
    return htmlcontrol
}


function buscarIncidencias()
{
    oDocumentosTable.draw();
}

function Configurar_Combos()
{
    var subsistema = 1;

    $("#ci_int_id").change(function ()
    {
        var cincidencia = $("#ci_int_id").val();

        if (cincidencia == "")
        {
            swal({ title: "Error!", text: "Seleccionar clase de incidencia", type: "error", confirmButtonText: "Aceptar" });
        }
        else {
            $.ajax(
               {
                   type: "POST",
                   async: true,
                   url: $("#ci_int_id").data("url").trim(),
                   data: {  "susbsistema" : subsistema  ,"IdClaseIncidencia": cincidencia },
                   success: function (data) {
                       var $select = $('#ti_int_id');
                       $select.empty();
                       $("#ti_int_id").append('<option value="">[ Todos ]</option>');
                       $.each(data, function (i, state) {
                           $('<option>', {
                               value: state.Value
                           }).html(state.Text).appendTo($select);
                       });
                   },
                   error: function (request, status, error) {
                       swal({ title: "Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                   }
               });
        }
    })
}

function Configurar_DatePicker() {

    $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });
    $('#data_2 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
      });

    $('#data_3 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

}

function EliminarIncidencia(incidencia)
{
    var url = $('#tblIncidencias').data("urldel");

    swal({
        title: "¿Está seguro de eliminar la incidencia?",
        text: "No se podra recuperar la información.",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "Cancelar!",
        closeOnConfirm: false,
        closeOnCancel: true
    },
            function (isConfirm)
            {
                if (isConfirm)
                {
                    $.ajax(
                    {
                        type: "POST",
                        async: true,
                        url: url,
                        data: { "incidencia": incidencia },
                        success: function (data)
                        {
                            if (data.result == true)
                            {
                                swal("¡Eliminado!", data.mensaje, "success");
                                oDocumentosTable.draw();
                            }
                            else
                            {
                                swal({ title: "¡Error!", text: data.mensaje, type: "error", confirmButtonText: "Aceptar" });
                            }

                        },
                        error: function (request, status, error)
                        {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar la incidencia !", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
                }
            });
}
