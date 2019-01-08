var btnSubirArchivo     = "#btnSubirArchivo";
var btnExportarExcel = "#btnExportarExcel";
var btnExportarDetalleExcel = "#btnExportarDetalleExcel";
var btnDescargarFormato = "#btnDescargarFormato";
var incidencia = $('#inc_int_id').val();
var ordenServicio = $('#ods_int_id').val();

var oListaTable;
var oListaGruposTable;
var oListaDetalleGrupoTable;

$(document).ready(function () {

    $(btnSubirArchivo).click(function (event) { btnSubirArchivo_onclick(this, event); });
    $(btnExportarExcel).click(function (event) { btnExportarExcel_onclick(this, event); });
    $(btnDescargarFormato).click(function (event) { btnDescargarFormato_onclick(this, event); });
    

    mostrarMensajeResultado();

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

    $(function () {
        $('#FrmGruposComision').submit(function (event)
        {
            var contadorProductos = oListaTable.data().count()
            var errores = $("#errores").val();
            var comision = $("#comision").val();

            var dtFechaActual = new Date();
            var fIniVigencia = ConvertirFecha( $("#FechaInicioVigencia").val());
            var fFinVigencia = ConvertirFecha($("#FechaFinVigencia").val());

            if (fFinVigencia <= fIniVigencia)
            {
                event.preventDefault();
                swal({ title: "¡Error!", text: "¡La fecha final de vigencia no puede ser menor, ni igual a la fecha inicial de vigencia!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
            }
            else if (contadorProductos == 0)
            {
                event.preventDefault();
                swal({ title: "¡Error!", text: "¡No se puede registrar un grupo sin detalle!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
            }
            else
            {

                if (errores > 0)
                {
                    event.preventDefault();
                    swal({ title: "¡Error!", text: "¡Corregir los errores antes de crear el grupo!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
                }
                else {

                    event.preventDefault();

                    swal({

                        title: "Registro de Grupo de Comisión",
                        text: "¿Está seguro de registrar el grupo de comisión?",
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: "Cancelar",
                        confirmButtonColor: '#DD6B55',
                        confirmButtonText: 'Registrar',
                        closeOnConfirm: false,
                        closeOnCancel: true
                    },
                    function ()
                    {
                        showLoading();
                        $('#FrmGruposComision').unbind('submit').submit()
                        //$('#FrmGruposComision').submit();
                    });
                }
            }
        });

    });

    oListaTable =
       $('.dataTables-tblDetalleGrupoComision').DataTable({
           "responsive": true,
           "processing": true,
           "serverSide": true,
           "language": {
               "lengthMenu": "Mostrando _MENU_ registros por página",
               "zeroRecords": "No hay registros para mostrar",
               "search": "Buscar:",
               "info": "Mostrando página _PAGE_ de _PAGES_",
               "infoEmpty": "No hay registros",
               "infoFiltered": "(filtered from _MAX_ total records)"
           },
           "deferLoading": 7000,
           "ajax": {
               "url": $('#tblDetalleGrupoComision').data("url"),
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   { "title": "Id", "data": "id", visible: true, "name": "id", "sWidth": "5%" },
                   { "title": "Código", "data": "codigo", "name": "codigo", "sWidth": "16%" },
                   { "title": "Descripción", "data": "descripcion", "name": "descripcion", "sWidth": "40%" },
                   {
                       "title": "Resultado", "class": "text-center", "data": "resultado", "name": "resultado", "sWidth": "7%", "mRender":
                          function (data, type, full) {
                              var result = data;
                              if (result == "Error")
                              {
                                  return "<span class='label label-danger'>" + " " + result + " " + "</span>";
                              }
                              else
                              {
                                  return "<span class='label label-primary'>" + " " + result + " " + "</span>";
                              }
                          }
                   },
                   { "title": "Error", "data": "descripcion_error", "name": "descripcion_error", "autoWidth": true },
                   { "title": "Acciones", "class": "text-center", "sWidth": "7%", "data": "id", "mRender": function (data, type, full) { var id = data; return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Eliminar'  class='btn-danger btn btn-xs btn-outline' onclick='EliminarDetalleGrupoComision(" + data + ")' > <i class='fa fa-trash'></i></button></div>" } }
           ],
          
       });

    oListaGruposTable =
      $('.dataTables-tblGruposComision').DataTable({
          "responsive": true,
          "processing": true,
          "serverSide": true,
          "language": {
              "lengthMenu": "Mostrando _MENU_ registros por página",
              "zeroRecords": "No hay registros para mostrar",
              "search": "Buscar:",
              "info": "Mostrando página _PAGE_ de _PAGES_",
              "infoEmpty": "No hay registros",
              "infoFiltered": "(filtered from _MAX_ total records)"
          },
          "ajax": {
              "url": $('#tblGruposComision').data("url"),
              "type": "POST",
              "datatype": "json",
              "data": function ( d ) {
                                        d.nombre = $('#nombre').val();
                                        d.FechaInicio = $('#FechaInicio').val();
                                        d.FechaFin = $('#FechaFin').val();
                                        d.estado = $('#estado').val();},
          },
          "columns": [
                  { "title": "Id", "data": "gcom_int_id", "name": "gcom_int_id", "sWidth": "5%" },
                  { "title": "Nombre Grupo", "data": "gcom_str_nombre", "name": "gcom_str_nombre", "sWidth": "15%" },
                  { "title": "% Comisión", "data": "gcom_dec_comision", "name": "gcom_dec_comision", "sWidth": "10%" },
                  { "title": "Fecha Creación", "data": "gcom_dat_fechcreacion", "name": "gcom_dat_fechcreacion", "sWidth": "15%" },
                  { "title": "Fecha Inicial de Vigéncia", "data": "gcom_dat_fechiniciovigencia", "name": "gcom_dat_fechiniciovigencia", "sWidth": "15%" },
                  { "title": "Fecha Final   de Vigéncia", "data": "gcom_dat_fechfinvigencia", "name": "gcom_dat_fechfinvigencia", "sWidth": "15%" },
                  {
                      "title": "Estado", "class": "text-center", "data": "gcom_bit_eliminado", "name": "gcom_bit_eliminado", "sWidth": "7%", "mRender":
                         function (data, type, full) {
                             var result = data;
                             if (result == false)
                             {
                                 return "<span class='label label-primary'>" + " " + "Activo" + " " + "</span>";
                             }
                             else {
                                 return "<span class='label label-danger'>" + " " + "Deshabilitado" + " " + "</span>";
                             }
                         }
                  },
                  { "title": "Acciones", "class": "text-center", "sWidth": "7%", "data": "gcom_int_id", "mRender": function (data, type, full) { var id = data; return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Detalle Grupo'  class='btn-primary btn btn-xs btn-outline' onclick='VerDetalleGrupoComision(" + data + ")' > <i class='fa fa-search'></i></button><button type='button' data-toggle='tooltip' data-placement='top' title='Deshabilitar Grupo'  class='btn-warning btn btn-xs btn-outline' onclick='DeshabilitarGrupoComision(" + data + ")' > <i class='fa fa-ban'></i></button></div>" } }
          ],

      });

    $("#btnBuscarGruposComision").button()
                  .click(function (e) {
                      oListaGruposTable.draw();
                  });

  

});

function ConvertirFecha(fecha)
{
    array_Fecha = fecha.split("/");

    var dia = array_Fecha[0];
    var mes = (array_Fecha[1] - 1)
    var ano = array_Fecha[2];
    var fechaReal = new Date(ano, mes, dia);
    return fechaReal;
}

function btnSubirArchivo_onclick(obj, event) {

    var url = $(obj).data("url");
    var archivo = $("#files").val();

    if (archivo == "")
    {
        $("#errores").val("");
        swal({ title: "¡Error!", text: "¡Seleccionar Archivo Excel!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else
    {
        swal({
            title: "¿Está seguro de cargar el archivo excel?",
            text: "Se realizara la validaciòn del archivo.",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Si, cargar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {

                var dataModelo = $("#FrmSubirExcel").serialize();
                var formData = new FormData(document.getElementById("FrmSubirExcel"));
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
                        if (data == "0")
                        {
                            swal("¡Correcto!", "Se cargó el archivo de forma correcta, no se encontraron errores.", "success");
                            $("#errores").val(data);
                            oListaTable.draw();
                            $("#files").val("");
                        }
                        else if (parseInt(data) > 0)
                        {
                            swal("¡Correcto!", "Se cargó el archivo de forma correcta, pero se encontraron errores.", "success");
                            $("#errores").val(data);
                            oListaTable.draw();
                            $("#files").val("");
                        }
                        else if (data == "-3") {
                            swal("¡Error!", "El archivo no tiene el formato correcto o esta vacío.", "error");
                            $("#errores").val("");
                            $("#files").val("");
                        }
                        else if (data == "-1")
                        {
                            swal("¡Error!", "La extensión del archivo es incorrecta, solo puede cargar archivos .xls y .xlsx.", "error");
                            $("#errores").val("");
                            $("#files").val("");
                        }
                        else if (data == "-2") {
                            swal("¡Error!", "El tamaño del archivo sobrepasa el permitido (máximo 3 MB).", "error");
                            $("#errores").val("");
                            $("#files").val("");
                        }
                        else {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al cargar el archivo!", type: "error", confirmButtonText: "Aceptar" });
                            $("#errores").val("1");
                            $("#files").val("");
                        }
                    },
                    error: function (request, status, error)
                    {
                        swal({ title: "¡Error!", text: "Ocurrió un error al cargar el archivo!", type: "error", confirmButtonText: "Aceptar" });
                        $("#errores").val("");
                        $("#files").val("");
                    }
                });
            }
        });
    }

}

function btnExportarExcel_onclick(obj, event)
{
    var url = $(obj).data("url");
    window.location = url;
}

function btnDescargarFormato_onclick(obj, event)
{
    var url = $(obj).data("url");
    window.location = url;
}

function mostrarMensajeResultado() {
    if ($("#hdfMensaje").val()) {
        var mensaje = $("#hdfMensaje").val();
        swal("¡Registro Correcto!", mensaje, "success");
    }
}

function EliminarDetalleGrupoComision(item) {
    var url = $('#tblDetalleGrupoComision').data("urldel");

    swal({
        title: "¿Está seguro de eliminar este código de item ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
            function (isConfirm) {
                if (isConfirm) {
                    $.ajax(
                    {
                        type: "POST",
                        async: true,
                        url: url,
                        data: { "item": item },
                        success: function (data)
                        {
                            if (data.res == true)
                            {
                                swal("¡Eliminado!", "La código fue eliminado de forma correcta.", "success");
                                $("#errores").val( data.errores );
                                oListaTable.draw();
                            }
                            else {
                                swal({ title: "¡Error!", text: "Ocurrió un error al eliminar el detalle!", type: "error", confirmButtonText: "Aceptar" });
                            }

                        },
                        error: function (request, status, error) {
                            swal({ title: "¡Error!", text: "Ocurrió un error al eliminar el detalle!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
                }
            });

}


function DeshabilitarGrupoComision(id) {
    var url = $('#tblGruposComision').data("urldel");

    swal({
        title: "¿Está seguro de deshabilitar el grupo de comisión?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, deshabilitar.",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
            function (isConfirm) {
                if (isConfirm) {
                    $.ajax(
                    {
                        type: "POST",
                        async: true,
                        url: url,
                        data: { "id": id },
                        success: function (data) {
                            if (data.res == true)
                            {
                                swal("¡Deshabilitado!", "El Grupo fue deshabilitado de forma correcta.", "success");
                                oListaGruposTable.draw();
                            }
                            else {
                                swal({ title: "¡Error!", text: "Ocurrió un error al deshabilitar el grupo!", type: "error", confirmButtonText: "Aceptar" });
                            }
                        },
                        error: function (request, status, error) {
                            swal({ title: "¡Error!", text: "Ocurrió un error al deshabilitar el grupo!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
                }
            });
}

function VerDetalleGrupoComision(id)
{
    var url = $('#tblGruposComision').data("urldtl") + "?id=" + id;
    $.get(url, function (data) {
        $("#modalcontentIncidencias").html(data);
        $("#modalcontainerIncidencias").modal("show");
        CargaDetalleGrupoComision();

        $(btnExportarDetalleExcel).click(function (event) { btnExportarDetalleExcel_onclick(this, event); });
    });
}

function CargaDetalleGrupoComision()
{
    oListaDetalleGrupoTable =
      $('.dataTables-tblDetalleGComision').DataTable({
          "responsive": true,
          "processing": true,
          "serverSide": true,
          "language": {
              "lengthMenu": "Mostrando _MENU_ registros por página",
              "zeroRecords": "No hay registros para mostrar",
              "search": "Buscar:",
              "info": "Mostrando página _PAGE_ de _PAGES_",
              "infoEmpty": "No hay registros",
              "infoFiltered": "(filtered from _MAX_ total records)"
          },
          "ajax": {
              "url": $('#tblDetalleGComision').data("url"),
              "type": "POST",
              "datatype": "json"
          },
          "columns": [
                  { "title": "Id", "data": "gcomd_int_id", visible: true, "name": "gcomd_int_id", "sWidth": "5%" },
                  { "title": "Código item", "data": "gcomd_str_item", "name": "gcomd_str_item", "sWidth": "20%" },
                  { "title": "Descripción Item", "data": "gcomd_str_itemdesc", "name": "gcomd_str_itemdesc", "sWidth": "40%" }
          ],

      }); 
}

function btnExportarDetalleExcel_onclick(obj, event) {
    var url = $(obj).data("url");
    window.location = url;
}


function showLoading() {
    $.blockUI({
        message: '<div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div>  <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div>  <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
        theme: false,
        baseZ: 100000
    });
}

function mostrarMensajeResultado() {
    if ($("#hdfMensaje").val()) {
        var mensaje = $("#hdfMensaje").val();
        swal("¡Registro Correcto!", mensaje, "success");
    }
}
