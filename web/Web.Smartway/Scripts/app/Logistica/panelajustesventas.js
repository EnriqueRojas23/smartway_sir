var oDocumentosTable;

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

    CargaAjustes();

    $('#tblAjustes tbody').on('click', 'button', function ()
    {
        if ( this.id == "btnIngresarJust")
        {
           var datos = oDocumentosTable.row($(this).parents('tr')).data();
           var url = $("#tblAjustes").data("urlins");

           $.ajax(
           {
               type: "POST",
               url: url,
               contentType: 'application/json; charset=utf-8',
               data: JSON.stringify(datos),
               success: function (data)
               {
                   $("#modalcontentIncidenciasP").html(data);
                   $("#modalcontainerIncidenciasP").modal("show");
               },
               error: function (request, status, error)
               {
                   swal({ title: "¡Error!", text: "Ocurrió un error al cargar los datos!", type: "error", confirmButtonText: "Aceptar" });
               }
            });
        }

        if (this.id == "btnVerJust")
        {
            var datos = oDocumentosTable.row($(this).parents('tr')).data();
            var url = $("#tblAjustes").data("urlins");

            $.ajax(
            {
                type: "POST",
                url: url,
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(datos),
                success: function (data)
                {
                    $("#modalcontentIncidenciasP").html(data);
                    $("#modalcontainerIncidenciasP").modal("show");
                },
                error: function (request, status, error) {
                    swal({ title: "¡Error!", text: "Ocurrió un error al cargar los datos!", type: "error", confirmButtonText: "Aceptar" });
                }
            });
        }
    });

});

function CargaAjustes()
{
    oDocumentosTable =
       $('.dataTables-tblAjustes').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           processing: true,
           "serverSide": true,
            //scrollY: '50vh',
           //"scrollCollapse": true,
           "language": {
               "lengthMenu": "Mostrando _MENU_ registros por página",
               "zeroRecords": "No hay registros para mostrar",
               "search": "Buscar:",
               "info": "Mostrando página _PAGE_ de _PAGES_",
               "infoEmpty": "No hay registros",
               "infoFiltered": "(Filtrando de _MAX_ total registros)"
           },
           "iDisplayLength": 50,
           "ajax": {
               "url": $('#tblAjustes').data("url"),
               "data": function ( d ) {
                   d.tienda = $('#tienda').val();
                   d.item = $('#item').val();
                   d.estado = $('#estado').val();
                   d.fecha_i = $('#fech_ini').val();
                   d.fecha_f = $('#fech_fin').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                    { "title": "Fecha", "data": "fecha", "name": "fecha", "class": "text-center" },
                    {
                        "title": "Tienda", "data": "almacen", "name": "almacen", "class": "text-center",
                        "mRender":
                        function (data, type, full)
                        {
                            return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                        }
                    },
                    { "title": "Descripción", "data": "desc_almacen", "name": "desc_almacen"},
                    {
                        "title": "N° Ajuste", "data": "num_ajuste", "name": "num_ajuste", "class": "text-center",
                        "mRender":
                        function (data, type, full) {
                            return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                        }
                    },
                    {
                        "title": "N° Ticket", "data": "num_ticket", "name": "num_ticket", "class": "text-center",
                        "mRender":
                        function (data, type, full) {
                            return "<span class='label label-success'>" + " " + data + " " + "</span>";
                        }
                    },
                    { "title": "Producto", "data": "item", "name": "item", "class": "text-center" },
                    { "title": "Descripción", "data": "desc_item", "name": "desc_item" },
                    { "title": "Cant.", "data": "cantidad", "name": "cantidad", "class": "text-center" },
                    {
                        "title": "Estado", "data": "estado", "estado": "estado","class": "text-center",
                         "mRender":
                        function (data, type, full)
                        {
                            return "<span class='label " + full.label_estado + "'>" + " " + data + " " + "</span>";
                        }
                    },
                    { "title": "Desc. Justificación", "data": "justificacion", "name": "justificacion" },
                      {
                          "title": "Justificación", "data": "grabado", "name": "grabado", "class": "text-center",
                          "mRender":
                          function (data, type, full)
                          {
                              if (data == "NO")
                              {
                                  return "<div class='btn-group'><button type='button' id='btnIngresarJust' style='font-size:10px' data-toggle='tooltip' data-placement='top'> <i class='fa fa-edit'></i> Ingresar</button></div>";
                              }
                              else
                              {
                                  return "<div class='btn-group'><button type='button' id='btnVerJust' style='font-size:10px' data-toggle='tooltip' data-placement='top'> <i class='fa fa-search'></i> Ver</button></div>";
                              }
                          }
                      },
                      {
                         "title": "Cierre", "data": "fecha_cierre", "name": "fecha_cierre", "class": "text-center",
                         "mRender":
                         function (data, type, full)
                         {
                             if (data == "Pendiente" & full.grabado == "SI")
                             {
                                 return "<div class='btn-group'><button type='button'  id='btnCerrarJust' style='font-size:10px' data-toggle='tooltip' data-placement='top' onclick='CerrarAjuste(" + full.id_ajuste + ");' > <i class='fa fa-lock'></i> Cerrar</button></div>";
                             }
                             else
                             {
                                 return "<span class='label label-danger'>" + " " + data + " " + "</span>";
                             }
                         }
                     },
           ],
           buttons: [
               { extend: 'copy' },
               { extend: 'csv' },
               { extend: 'excel', title: 'Ajustes de Ventas Negativas'},
               { extend: 'pdf',   title: 'Ajustes de Ventas Negativas'},
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



function ConvertirFecha(fecha) {
    array_Fecha = fecha.split("/");

    var dia = array_Fecha[0];
    var mes = (array_Fecha[1] - 1)
    var ano = array_Fecha[2];
    var fechaReal = new Date(ano, mes, dia);
    return fechaReal;
}


function OnCompleteTransaction_RegistrarJustificacion(xhr, status)
{
    var jsonres = xhr.responseJSON;
    CleanValidationError();

    if (jsonres.res == true)
    {
        swal({
            title: "Registro Completo",
            text: "Se registró la justificación de forma correcta.",
            type: "success"
        });
        $("#modalcontainerIncidenciasP").modal("hide");
        oDocumentosTable.draw();
        showLoading()
       
    }
    else
    {
        sweetAlert("Verificar Errores", null, "error");
        CheckValidationErrorResponse(jsonres);
    }

  

}

function CleanValidationError() {
    $(".validation-summary-errors").html("");
}

function CheckValidationErrorResponse(response, form, summaryElement) {

    var $list, data = getResponseValidationObject(response);
    if (!data) return false;

    $list = summaryElement || getValidationSummary();
    $list.html("");
    $.each(data.Errors, function (i, item) {

        var $val, lblTxt, errorList = "";

        if (item.Key) {
            $val = $(".field-validation-valid,.field-validation-error")
                        .first("[data-valmsg-for=" + item.Key + "]")
                        .removeClass("field-validation-valid")
                        .addClass("field-validation-error");
            $("input[name=" + item.Key + "]").addClass("input-validation-error")
            lblTxt = $("label[for=" + item.Key + "]").text();
            if (lblTxt) { lblTxt += ": "; }
        }
        if ($val != undefined) {
            if ($val.length) {
                $val.text(item.Value.shift());
                if (!item.Value.length) { return; }
            }
        }

        $.each(item.Value, function (c, val) {
            if (lblTxt == undefined) lblTxt = "";
            errorList += "<li>" + lblTxt + val + "</li>";
        });

        $list.append(errorList);
    });
    if ($list.find("li:first").length) { $list.closest("div").show(); }
    return true;
}

function CerrarAjuste(id)
{
    var url = $("#tblAjustes").data("urlcls");
    

    swal({
        title: "¿Está seguro de cerrar el ajuste?",
        text: "Una vez cerrado ya no se podrá modificar la justificación.",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, cerrar.",
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
                        data: { "id": id },
                        success: function (data)
                        {
                            if (data.res == true)
                            {
                                swal("¡Cerrado!", "El ajuste fue cerrado de forma correcta.", "success");
                                oDocumentosTable.draw();
                            }
                            else
                            {
                                swal({ title: "¡Error!", text: "Ocurrió un error al cerrar el ajuste!", type: "error", confirmButtonText: "Aceptar" });
                            }
                        },
                        error: function (request, status, error) {
                            swal({ title: "¡Error!", text: "Ocurrió un error al cerrar el ajuste!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
                }
    });
}


function showLoading() {
    $.blockUI({
        message: '<div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div>  <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div>  <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
        theme: false,
        baseZ: 100000
    });
}

function ExportarAjustes()
{
    var url = $("#tblAjustes").data("urlexp");
    window.location = url;
}
