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
                   .click(function (e)
                   {
                       oDocumentosTable.draw();
                   });

    CargaOrdenesPendientes();
});

function CargaOrdenesPendientes()
{
    oDocumentosTable =
       $('.dataTables-tblOrdenesPendientes').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "processing": true,
           "serverSide": true,
           "iDisplayLength": 25,
           "ajax": {
               "url": $('#tblOrdenesPendientes').data("url"),
               "data": function ( d ) {
                   d.tienda = $('#tienda').val();
                   d.tipo = $('#tipo').val();
                   d.FechaInicio = $('#FechaInicio').val();
                   d.FechaFin = $('#FechaFin').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           'columnDefs': [
            {
                'targets': 0,
                'checkboxes': { 'selectRow': true }
            }],
           "columns": [
                   { "key": true, "data": "dci_int_id", "autoWidth": "true" },
                   {
                       "title": "Id", "data": "dci_int_id", "name": "dci_int_id", "autoWidth": true, "class": "text-center",
                     "mRender":
                                function (data, type, full)
                                {
                                    return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                }
                   },
                   { "title": "Tienda", "data": "dci_str_tienda", "name": "dci_str_tienda", "sWidth": "6%", "class": "text-center" },
                   { "title": "Tipo", "data": "tdi_str_codigo", "name": "tdi_str_codigo", "sWidth": "6%", "class": "text-center" },
                   {
                       "title": "N° ODR/ODS", "data": "numero", "name": "numero", "sWidth": "10%", "class": "text-center",
                         "mRender":
                                    function (data, type, full) {
                                        return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                    }
                   },
                   { "title": "Fecha ODR/ODS", "data": "dci_dat_fechcreacion", "name": "dci_dat_fechcreacion", "sWidth": "12%", "class": "text-center" },
                   { "title": "Código", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true, "class": "text-center" },
                   { "title": "Descripción", "data": "pro_str_descripcion", "name": "pro_str_descripcion", "sWidth": "40%", "class": "text-center" },
                   { "title": "Clasificación", "data": "clasificacion", "name": "clasificacion", "autoWidth": true, "class": "text-center" },
           ],
           'select': { 'style': 'multi' },
           'order': [[1, 'asc']],
           buttons: [
               { extend: 'copy' },
               { extend: 'csv' },
               { extend: 'excel', title: 'Guias Programadas'},
               { extend: 'pdf', title: 'Guias Programadas' },
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



function btnAsociarGuiaOrdenesOnclick()
{
 
    var TotalDetalle = oDocumentosTable.data().count()

    var rows_selected = oDocumentosTable.column(0).checkboxes.selected();

    if (rows_selected.length == 0)
    {
        swal({ title: "¡Error!", text: "¡Seleccionar por lo menos una orden a asociar!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else
    {
        var array = [];

        $.each(rows_selected, function (index, rowId)
        {
            array.push(rowId)
        });

        $('#OrdenesAsociadas').val(array.toString());

        var dataModelo = $("#FrmOrdenesPendientes").serialize();
        var url = $('#btnAsociar').data("url")
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    data: dataModelo,
                    success: function (data)
                    {
                        if (data.res == false)
                        {
                            swal({ title: "¡Error!", text: "¡No puede asociar 2 tipos de ordenes diferentes a una misma guia!", type: "error", confirmButtonText: "Aceptar" });
                        }
                        else
                        {
                            showLoading();

                            var tienda  = $('#tienda').val();
                            var ordenes = $('#OrdenesAsociadas').val();
                            var url = $('#btnAsociar').data("urlpop") + "?tienda= " + tienda + "&ordenes=" + ordenes;
                            $.get(url, function (data)
                            {
                              
                                $("#modalcontentIncidenciasP").html(data);
                                $("#modalcontainerIncidenciasP").modal("show");

                                $('#data_6 .input-group.date').datepicker({
                                    todayBtn: "linked",
                                    keyboardNavigation: false,
                                    forceParse: false,
                                    calendarWeeks: true,
                                    autoclose: true,
                                    format: 'dd/mm/yyyy'
                                });
                            });
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al validar las ordenes!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
    }
}



function OnCompleteTransaction_RegistrarGuia(xhr, status)
{
    var jsonres = xhr.responseJSON;
    CleanValidationError();

    if (jsonres.res == true)
    {
       swal({
           title: "Asociación Completa",
           text: "Se asociaron las ordenes de forma correcta.",
            type: "success"
        },
       function ()
       {
           $("#modalcontainerIncidenciasP").modal("hide");
           var vurl = $('#btnAsociar').data("urlbak");
           window.location.href = vurl;
       });

        //swal({
        //    title: "Asociación Completa",
        //    text: "Se asociaron las ordenes de forma correcta.",
        //    type: "success"
        //});

        //$("#modalcontainerIncidenciasP").modal("hide");
        //oDocumentosTable.draw();
    }
    else
    {
        sweetAlert("Verificar Errores", null, "error");
        CheckValidationErrorResponse(jsonres);
    }

}





function ConvertirFecha(fecha) {
    array_Fecha = fecha.split("/");

    var dia = array_Fecha[0];
    var mes = (array_Fecha[1] - 1)
    var ano = array_Fecha[2];
    var fechaReal = new Date(ano, mes, dia);
    return fechaReal;
}


function showLoading() {
    $.blockUI({
        message: '<div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div>  <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div>  <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
        theme: false,
        baseZ: 100000
    });
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

function CleanValidationError() {
    $(".validation-summary-errors").html("");
}