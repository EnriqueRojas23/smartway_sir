var oMenoresTable;
var oGarantiaTable;
var oClasificacionTable;
var oCargaMasivaTable;

var btnAgregarProductoMenor         = "#btnAgregarProductoMenor";
var btnAgregarGarantiaProducto = "#btnAgregarGarantiaProducto";
var btnAgregarClasificacionProducto = "#btnAgregarClasificacionProducto";

var btnCargaMasivaMenores = "#btnCargaMasivaMenores";
var btnCargaMasivaGarantia = "#btnCargaMasivaGarantia";
var btnCargaMasivaClasificacion     = "#btnCargaMasivaClasificacion";

$(document).ready(function () {

    $(btnAgregarProductoMenor).click(function (event) { btnAgregarProductoMenor_onclick(this, event); });
    $(btnAgregarGarantiaProducto).click(function (event) { btnAgregarGarantiaProducto_onclick(this, event); });
    $(btnAgregarClasificacionProducto).click(function (event) { btnAgregarClasificacionProducto_onclick(this, event); });

    $(btnCargaMasivaMenores).click(function (event) { btnCargaMasivaMenores_onclick(this, event); });
    $(btnCargaMasivaGarantia).click(function (event) { btnCargaMasivaGarantia_onclick(this, event); });
    $(btnCargaMasivaClasificacion).click(function (event) { btnCargaMasivaClasificacion_onclick(this, event); });

    CargaListaMenores();
    CargaListaGarantias();
    CargaListaClasificacion();

    $("#btnBuscarMenores").button()
                  .click(function (e)
                  {
                      oMenoresTable.draw();
                  });

    $("#btnBuscarGarantia").button()
               .click(function (e) {
                   oGarantiaTable.draw();
               });

    $("#btnBuscarClasificacion").button()
             .click(function (e) {
                 oClasificacionTable.draw();
             });
});

function CargaListaMenores()
{
    oMenoresTable =
       $('.dataTables-tblMenores').DataTable({
           responsive: true,
           "processing": true,
           "serverSide": true,
           "searching": false,
           "ajax": {
               "url": $('#tblMenores').data("url"),
               "data": function ( d ) {
                   d.codigo = $('#txtCodigo').val();
                   d.descripcion = $('#txtDescripcion').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   { "key": true, "title": "Id", "data": "prom_int_id", "name": "prom_int_id", "autoWidth": true, "class": "text-center",
                     "mRender":
                        function (data, type, full)
                        {
                            return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                        }
                   },
                   { "title": "Código", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true, "class": "text-center" },
                   { "title": "Descripción", "data": "pro_str_descripcion", "name": "pro_str_descripcion", "autoWidth": true, "class": "text-center" },
                   { "title": "Fecha", "data": "prom_dat_fechcreacion", "name": "prom_dat_fechcreacion", "autoWidth": true, "class": "text-center" },
                   { "title": "Usuario", "data": "usuario", "name": "usuario", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Acciones", "class": "text-center", "data": "prom_int_id", "sWidth": "12%", "mRender":
                         function (data, type, full)
                         {
                             return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Eliminar' class='btn-danger btn btn-xs btn-outline ' onclick='EliminarProductoMenor(" + data + ");return false;' href='#' > <i class='fa fa-times-circle'></i> Eliminar</button></div>"
                         }
                   },
           ]
       });
}

function CargaListaGarantias() {
    oGarantiaTable =
       $('.dataTables-tblGarantias').DataTable({
           responsive: true,
           "processing": true,
           "serverSide": true,
           "searching": false,
           "ajax": {
               "url": $('#tblGarantias').data("url"),
               "data": function (d) {
                   d.codigo = $('#txtCodigoGarantia').val();
                   d.descripcion = $('#txtDescripcionGarantia').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   {
                       "key": true, "title": "Id", "data": "gar_int_id", "name": "gar_int_id", "autoWidth": true, "class": "text-center",
                       "mRender":
                          function (data, type, full) {
                              return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                          }
                   },
                   { "title": "Código", "data": "gar_str_producto", "name": "gar_str_producto", "autoWidth": true, "class": "text-center" },
                   { "title": "Descripción", "data": "pro_str_descripcion", "name": "pro_str_descripcion", "autoWidth": true, "class": "text-center" },
                   { "title": "Garantía", "data": "gar_str_garantia", "name": "gar_str_garantia", "autoWidth": true, "class": "text-center" },
                   { "title": "Fecha", "data": "gar_dat_fechcreacion", "name": "gar_dat_fechcreacion", "autoWidth": true, "class": "text-center" },
                   { "title": "Usuario", "data": "usuario", "name": "usuario", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Acciones", "class": "text-center", "data": "gar_int_id", "sWidth": "12%", "mRender":
                         function (data, type, full) {
                             return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Eliminar' class='btn-danger btn btn-xs btn-outline ' onclick='EliminarGarantiaProducto(" + data + ");return false;' href='#' > <i class='fa fa-times-circle'></i> Eliminar</button></div>"
                         }
                   },
           ]
       });
}

function CargaListaClasificacion()
{
    oClasificacionTable =
       $('.dataTables-tblClasificacion').DataTable({
           responsive: true,
           "processing": true,
           "serverSide": true,
           "searching": false,
           "ajax": {
               "url": $('#tblClasificacion').data("url"),
               "data": function (d)
               {
                   d.codigo = $('#txtCodigoClasificacion').val();
                   d.descripcion = $('#txtDescripcionClasificacion').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   {
                       "key": true, "title": "Id", "data": "pcla_int_id", "name": "pcla_int_id", "autoWidth": true, "class": "text-center",
                       "mRender":
                          function (data, type, full)
                          {
                              return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                          }
                   },
                   { "title": "Código", "data": "pcla_str_producto", "name": "pcla_str_producto", "autoWidth": true, "class": "text-center" },
                   { "title": "Descripción", "data": "pro_str_descripcion", "name": "pro_str_descripcion", "autoWidth": true, "class": "text-center" },
                   { "title": "STC", "data": "clat_str_descripcion", "name": "clat_str_descripcion", "autoWidth": true, "class": "text-center" },
                   { "title": "Almacén", "data": "claa_str_descripcion", "name": "claa_str_descripcion", "autoWidth": true, "class": "text-center" },
                   { "title": "Destino", "data": "claa_str_almacen", "name": "claa_str_almacen", "autoWidth": true, "class": "text-center" },
                   { "title": "Usuario", "data": "usr_str_red", "name": "usr_str_red", "autoWidth": true, "class": "text-center" },
                   { "title": "Fecha", "data": "pcla_dat_fechcreacion", "name": "pcla_dat_fechcreacion", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Acciones", "class": "text-center", "data": "pcla_int_id", "sWidth": "12%", "mRender":
                         function (data, type, full)
                         {
                             return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Eliminar' class='btn-danger btn btn-xs btn-outline ' onclick='EliminarClasificacionProducto(" + data + ");return false;' href='#' > <i class='fa fa-times-circle'></i> Eliminar</button></div>"
                         }
                   },
           ]
       });
}

function btnAgregarProductoMenor_onclick(obj, event){

    var url = $(obj).data("url") + "?tipo=menores";

    $.get(url, function (data)
    {
        $("#modalcontentIncidenciasP").html(data);
        $("#modalcontainerIncidenciasP").modal("show");

        document.getElementById('txtEscanProducto').focus();

        $('#txtEscanProducto').bind('keyup', function (e) {
            var key = e.keyCode || e.which;
            if (key === 13)
            {
                BuscarProducto();
            };
        });

    });
}

function btnAgregarGarantiaProducto_onclick(obj, event) {

    var url = $(obj).data("url") + "?tipo=garantia";

    $.get(url, function (data) {
        $("#modalcontentIncidenciasP").html(data);
        $("#modalcontainerIncidenciasP").modal("show");

        document.getElementById('txtEscanProducto').focus();

        $('#txtEscanProducto').bind('keyup', function (e) {
            var key = e.keyCode || e.which;
            if (key === 13) {
                BuscarProducto();
            };
        });

    });
}

function btnAgregarClasificacionProducto_onclick(obj, event) {

    var url = $(obj).data("url") + "?tipo=clasificacion";

    $.get(url, function (data) {
        $("#modalcontentIncidenciasP").html(data);
        $("#modalcontainerIncidenciasP").modal("show");

        document.getElementById('txtEscanProducto').focus();

        $('#txtEscanProducto').bind('keyup', function (e) {
            var key = e.keyCode || e.which;
            if (key === 13) {
                BuscarProducto();
            };
        });

    });
}

function BuscarProducto()
{
    var barra = $('#txtEscanProducto').val();
    $.ajax(
            {
                type: "POST",
                async: true,
                url: $("#txtEscanProducto").data("url").trim(),
                data: { "codigo": barra },
                success: function (data) {
                    if (data.pro_int_id > 0)
                    {
                        $("#codigo").val(data.pro_str_codigo);
                        $("#descripcion").val(data.pro_str_descripcion);
                    }
                    else {
                        swal({ title: "¡Error!", text: "¡No se encontró la barra del producto en la base de datos!", type: "error", confirmButtonText: "Aceptar" });
                        $('#txtEscanProducto').val("");
                        $("#codigo").val("");
                        $("#descripcion").val("");
                    }

                },
                error: function (request, status, error) {
                    $('#txtEscanProducto').val("");
                    swal({ title: "¡Error!", text: "¡No se pudo cargar los datos del producto!", type: "error", confirmButtonText: "Aceptar" });
                }
            });
}

function AgregarProducto()
{
    var tipo = $("#tipo").val();
    var codigo = $("#codigo").val();
    var descripcion = $("#descripcion").val();
    var garantia = $("#id_garantia").val();

    var clasificacion_stc     = $("#clasificacion_stc").val();
    var clasificacion_almacen = $("#clasificacion_almacen").val();

    if (codigo == "")
    {
        swal({ title: "¡Error!", text: "¡Ingresar producto!", type: "error", confirmButtonText: "Aceptar" })
    }
    else if (tipo == "garantia" && garantia =="")
    {
        swal({ title: "¡Error!", text: "¡Seleccionar garantía!", type: "error", confirmButtonText: "Aceptar" })
    }
    else if (tipo == "clasificacion" && clasificacion_stc == "")
    {
        swal({ title: "¡Error!", text: "¡Seleccionar clasificación STC!", type: "error", confirmButtonText: "Aceptar" })
    }
    else if (tipo == "clasificacion" && clasificacion_almacen == "")
    {
        swal({ title: "¡Error!", text: "¡Seleccionar clasificación Almacén!", type: "error", confirmButtonText: "Aceptar" })
    }
    else
    {
        swal({
            title: "¿Está seguro de registrar el producto?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Grabar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: true
        },
      function (isConfirm)
      {
          if (isConfirm)
          {
              var dataModelo = $("#frmAgregarProductoMatenimiento").serialize();
              var url        = $('#btnAgregarProducto').data("url")

              $.ajax(
              {
                  type: "POST",
                  async: true,
                  url: url,
                  data: dataModelo,
                  success: function (data)
                  {
                      if (data.res == true)
                      {
                          swal("¡Correcto!", data.mensaje, "success");
                          $("#modalcontainerIncidenciasP").modal("hide");

                          if (tipo == "menores")
                          {
                              oMenoresTable.draw();
                          }
                          else if (tipo == "garantia")
                          {
                              oGarantiaTable.draw();
                          }
                          else if (tipo == "clasificacion")
                          {
                              oClasificacionTable.draw();
                          }
                      }
                      else
                      {
                          swal({ title: "¡Error!", text: data.mensaje, type: "error", confirmButtonText: "Aceptar" });
                      }

                  },
                  error: function (request, status, error) {
                      swal({ title: "¡Error!", text: "¡Ocurrió un error al agregar el producto!", type: "error", confirmButtonText: "Aceptar" });
                  }
              });
          }
      });

    }
}

function EliminarProductoMenor(id)
{
    swal({
        title: "¿Está seguro de eliminar el producto de la lista?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function (isConfirm) {
        if (isConfirm) {
            var url = $('#tblMenores').data("urldel") + "?id=" + id
            $.ajax(
            {
                type: "POST",
                async: true,
                url: url,
                success: function (data)
                {
                    if (data.res != true)
                    {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar el producto!", type: "error", confirmButtonText: "Aceptar" });
                        oMenoresTable.draw();
                    }
                    else
                    {
                        oMenoresTable.draw();
                    }
                },
                error: function (request, status, error)
                {
                    swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar  el producto!", type: "error", confirmButtonText: "Aceptar" });
                }
            });
        }
    });
}

function EliminarGarantiaProducto(id)
{
    swal({
        title: "¿Está seguro de eliminar el producto de la lista?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function (isConfirm) {
        if (isConfirm) {
            var url = $('#tblGarantias').data("urldel") + "?id=" + id
            $.ajax(
            {
                type: "POST",
                async: true,
                url: url,
                success: function (data)
                {
                    if (data.res != true)
                    {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar el producto!", type: "error", confirmButtonText: "Aceptar" });
                        oGarantiaTable.draw();
                    }
                    else
                    {
                        oGarantiaTable.draw();
                    }
                },
                error: function (request, status, error) {
                    swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar  el producto!", type: "error", confirmButtonText: "Aceptar" });
                }
            });
        }
    });
}

function EliminarClasificacionProducto(id) {
    swal({
        title: "¿Está seguro de eliminar el producto de la lista?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function (isConfirm) {
        if (isConfirm) {
            var url = $('#tblClasificacion').data("urldel") + "?id=" + id
            $.ajax(
            {
                type: "POST",
                async: true,
                url: url,
                success: function (data)
                {
                    if (data.res != true)
                    {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar el producto!", type: "error", confirmButtonText: "Aceptar" });
                        oClasificacionTable.draw();
                    }
                    else
                    {
                        oClasificacionTable.draw();
                    }
                },
                error: function (request, status, error) {
                    swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar  el producto!", type: "error", confirmButtonText: "Aceptar" });
                }
            });
        }
    });
}

function btnCargaMasivaMenores_onclick(obj, event)
{
    var url = $(obj).data("url") + "?tipo=menores";

    $.get(url, function (data)
    {
        $("#modalcontentIncidenciasL").html(data);
        $("#modalcontainerIncidenciasL").modal("show");

        var btnSubirArchivo = "#btnSubirArchivo";
        var btnDescargarFormato = "#btnDescargarFormato";
        var btnExportarDetalleExcel = "#btnExportarDetalleExcel";
        var btnGrabarMasivo = "#btnGrabar";


        $(btnSubirArchivo).click(function (event) { btnSubirArchivo_onclick(this, event); });
        $(btnDescargarFormato).click(function (event) { btnDescargarFormato_onclick(this, event); });
        $(btnExportarExcel).click(function (event) { btnExportarExcel_onclick(this, event); });
        $(btnGrabarMasivo).click(function (event) { btnGrabarMasivo_onclick(this, event); });

        CargaTablaMasivaMenores();

    });

}

function btnCargaMasivaGarantia_onclick(obj, event)
{
    var url = $(obj).data("url") + "?tipo=garantia";

    $.get(url, function (data) {
        $("#modalcontentIncidenciasL").html(data);
        $("#modalcontainerIncidenciasL").modal("show");

        var btnSubirArchivo = "#btnSubirArchivo";
        var btnDescargarFormato = "#btnDescargarFormato";
        var btnExportarDetalleExcel = "#btnExportarDetalleExcel";
        var btnGrabarMasivo = "#btnGrabar";


        $(btnSubirArchivo).click(function (event) { btnSubirArchivo_onclick(this, event); });
        $(btnDescargarFormato).click(function (event) { btnDescargarFormato_onclick(this, event); });
        $(btnExportarExcel).click(function (event) { btnExportarExcel_onclick(this, event); });
        $(btnGrabarMasivo).click(function (event) { btnGrabarMasivo_onclick(this, event); });

        CargaTablaMasivaGarantias();

    });

}

function btnCargaMasivaClasificacion_onclick(obj, event) {
    var url = $(obj).data("url") + "?tipo=clasificacion";

    $.get(url, function (data) {
        $("#modalcontentIncidenciasL").html(data);
        $("#modalcontainerIncidenciasL").modal("show");

        var btnSubirArchivo = "#btnSubirArchivo";
        var btnDescargarFormato = "#btnDescargarFormato";
        var btnExportarDetalleExcel = "#btnExportarDetalleExcel";
        var btnGrabarMasivo = "#btnGrabar";


        $(btnSubirArchivo).click(function (event) { btnSubirArchivo_onclick(this, event); });
        $(btnDescargarFormato).click(function (event) { btnDescargarFormato_onclick(this, event); });
        $(btnExportarExcel).click(function (event) { btnExportarExcel_onclick(this, event); });
        $(btnGrabarMasivo).click(function (event) { btnGrabarMasivo_onclick(this, event); });

        CargaTablaMasivaClasificacion();

    });

}

function btnDescargarFormato_onclick(obj, event)
{
    var tipo = $("#tipo").val();
    var url = $(obj).data("url") + "?tipo=" + tipo;
    window.location = url;
}

function btnExportarExcel_onclick(obj, event)
{
    var url = $(obj).data("url");
    window.location = url;
}

function CargaTablaMasivaMenores() {

    oCargaMasivaTable =
           $('.dataTables-tblCargaMasiva').DataTable({
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
                   "url": $('#tblCargaMasiva').data("url"),
                   "type": "POST",
                   "datatype": "json"
               },
               "columns": [
                       { "title": "Código", "data": "codigo", "name": "codigo", "sWidth": "16%", "class": "text-center" },
                       {
                           "title": "Resultado", "class": "text-center", "data": "resultado", "name": "resultado", "class": "text-center", "sWidth": "7%", "mRender":
                              function (data, type, full) {
                                  var result = data;
                                  if (result == "Error") {
                                      return "<span class='label label-danger'>" + " " + result + " " + "</span>";
                                  }
                                  else {
                                      return "<span class='label label-primary'>" + " " + result + " " + "</span>";
                                  }
                              }
                       },
                       { "title": "Error", "data": "descripcion_error", "class": "text-center", "name": "descripcion_error", "sWidth": "40%" }
               ],

           });
}

function CargaTablaMasivaGarantias() {

    oCargaMasivaTable =
           $('.dataTables-tblCargaMasiva').DataTable({
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
                   "url": $('#tblCargaMasiva').data("url"),
                   "type": "POST",
                   "datatype": "json"
               },
               "columns": [
                       { "title": "Código", "data": "codigo", "name": "codigo", "sWidth": "16%", "class": "text-center" },
                       { "title": "Id Garantía", "data": "id_garantia", "name": "id_garantia", "sWidth": "10%", "class": "text-center" },
                       { "title": "Garantía STC", "data": "garantia", "name": "garantia", "sWidth": "20%", "class": "text-center" },
                       {
                           "title": "Resultado", "class": "text-center", "data": "resultado", "name": "resultado", "sWidth": "7%", "class": "text-center", "mRender":
                              function (data, type, full) {
                                  var result = data;
                                  if (result == "Error") {
                                      return "<span class='label label-danger'>" + " " + result + " " + "</span>";
                                  }
                                  else {
                                      return "<span class='label label-primary'>" + " " + result + " " + "</span>";
                                  }
                              }
                       },
                       { "title": "Error", "data": "descripcion_error", "name": "descripcion_error", "class": "text-center", "sWidth": "40%" }
               ],

           });
}

function CargaTablaMasivaClasificacion() {

    oCargaMasivaTable =
           $('.dataTables-tblCargaMasiva').DataTable({
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
                   "url": $('#tblCargaMasiva').data("url"),
                   "type": "POST",
                   "datatype": "json"
               },
               "columns": [
                       { "title": "Código", "data": "codigo", "name": "codigo", "sWidth": "16%", "class": "text-center" },
                       { "title": "ID STC", "data": "id_clasificacion_stc", "name": "id_clasificacion_stc", "sWidth": "10%", "class": "text-center" },
                       { "title": "Clasificación STC", "data": "clasificacion_stc", "name": "clasificacion_stc", "sWidth": "20%", "class": "text-center" },
                       { "title": "ID ALM", "data": "id_clasificacion_almacen", "name": "id_clasificacion_almacen", "sWidth": "10%", "class": "text-center" },
                       { "title": "Clasificación ALM", "data": "clasificacion_almacen", "name": "clasificacion_almacen", "sWidth": "20%", "class": "text-center" },
                       {
                           "title": "Resultado", "class": "text-center", "data": "resultado", "name": "resultado", "class": "text-center", "sWidth": "7%", "mRender":
                              function (data, type, full) {
                                  var result = data;
                                  if (result == "Error") {
                                      return "<span class='label label-danger'>" + " " + result + " " + "</span>";
                                  }
                                  else {
                                      return "<span class='label label-primary'>" + " " + result + " " + "</span>";
                                  }
                              }
                       },
                       { "title": "Error", "data": "descripcion_error", "name": "descripcion_error", "sWidth": "40%", "class": "text-center" }
               ],

           });
}



function btnSubirArchivo_onclick(obj, event)
{
    var url = $(obj).data("url");
    var archivo = $("#files").val();
    var tipo = $("#tipo").val();

    if (archivo == "")
    {
        $("#totalRegistros").val("");
        $("#total").val("");
        swal({ title: "¡Error!", text: "¡Seleccionar Archivo Excel!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else {
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
        function (isConfirm)
        {
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
                            oCargaMasivaTable.draw();
                            $("#files").val("");
                        }
                        else if (parseInt(data) > 0)
                        {
                            swal("¡Correcto!", "Se cargó el archivo de forma correcta, pero se encontraron errores.", "success");
                            $("#errores").val(data);
                            oCargaMasivaTable.draw();
                            $("#files").val("");
                        }
                        else if (data == "-3") {
                            swal("¡Error!", "El archivo no tiene el formato correcto o esta vacío.", "error");
                            $("#errores").val("");
                            $("#files").val("");
                        }
                        else if (data == "-1") {
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

function btnGrabarMasivo_onclick(obj, event)
{
   
    var contadorProductos = oCargaMasivaTable.data().count()
    var errores = $("#errores").val();

    if (contadorProductos == 0)
    {
        event.preventDefault();
        swal({ title: "¡Error!", text: "¡Primero deber cargar un archivo!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else {

        if (errores > 0)
        {
            swal({ title: "¡Error!", text: "¡Corregir los errores antes de cargar los datos!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
        }
        else
        {
            swal({

                title: "¿Está seguro de cargar los datos?",
                text: "Tener en cuenta que se eliminaran todos los registros cargados anteriormente.",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Cargar',
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm)
            {
                if (isConfirm) {

                    var dataModelo = $("#FrmSubirExcel").serialize();
                    var formData = new FormData(document.getElementById("FrmSubirExcel"));
                    formData.append("dato", "valor");
                    var url = $(obj).data("url");

                    $.ajax(
                    {
                        type: "POST",
                        async: true,
                        url: url,
                        data: dataModelo,
                        success: function (data)
                        {
                            if (data.res == true)
                            {
                                swal("¡Correcto!", data.mensaje, "success");
                                $("#modalcontainerIncidenciasL").modal("hide");

                                oMenoresTable.draw();
                                oClasificacionTable.draw();
                            }
                            else
                            {
                                swal("¡Error!", data.mensaje, "error");
                            }
                        },
                        error: function (request, status, error)
                        {
                            swal({ title: "¡Error!", text: "Ocurrió un error al cargar los datos!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
                }
            });
        }
    }
}

