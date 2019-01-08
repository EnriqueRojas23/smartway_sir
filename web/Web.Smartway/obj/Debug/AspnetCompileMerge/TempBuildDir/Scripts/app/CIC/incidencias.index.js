$(document).ready(function () {

    $('.ladda-button').ladda('bind', { timeout: 5000000 });

    //$("#ssis_int_id").val("");
    $("#ci_int_id").val("");
    $("#ti_int_id").val("");
    $("#mc_int_id").val("");

    CargarClases($("#ssis_int_id").val());


    $("#ssis_int_id").change(function ()
    {
        var subsistema = $("#ssis_int_id").val();
        if (subsistema == "")
        {
            swal({ title: "Error!", text: "¡Seleccionar el Sub-Sistema!", type: "error", confirmButtonText: "Aceptar" });
        }
        else {

            $.ajax(
               {
                   type: "POST",
                   async: true,
                   url: $("#ssis_int_id").data("url").trim(),
                   data: { "subsistema": subsistema },
                   success: function (data) {
                       var $select = $('#ci_int_id');
                       $select.empty();
                       $("#ci_int_id").append('<option value="">[Clase Incidencia]</option>');
                       $.each(data, function (i, state) {
                           $('<option>', {
                               value: state.Value
                           }).html(state.Text).appendTo($select);
                       });
                   },
                   error: function (request, status, error)
                   {
                       swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                   }
               });
        }
    })

    $("#ci_int_id").change(function ()
    {
        var subsistema = $("#ssis_int_id").val();
        var cincidencia = $("#ci_int_id").val();

        if (cincidencia == "")
        {
            swal({ title: "¡Error!", text: "¡Seleccionar clase de incidencia!", type: "error", confirmButtonText: "Aceptar" });
        }
        else {

            $.ajax(
               {
                   type: "POST",
                   async: true,
                   url :  $("#ci_int_id").data("url").trim(),
                   data: { "susbsistema": subsistema, "IdClaseIncidencia": cincidencia },
                   success: function (data) {
                       var $select = $('#ti_int_id');
                       $select.empty();
                       $("#ti_int_id").append('<option value="">[Tipo Incidencia]</option>');
                       $.each(data, function (i, state) {
                           $('<option>', {
                               value: state.Value
                           }).html(state.Text).appendTo($select);
                       });
                   },
                   error: function (request, status, error)
                   {
                       swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                   }
               });
        }
    })

    $("#ti_int_id").change(function ()
    {
        var subsistema = $("#ssis_int_id").val();
        var cincidencia = $("#ci_int_id").val();
        var tincidencia = $("#ti_int_id").val();

        if (cincidencia == "")
        {
            swal({ title: "¡Error!", text: "¡Seleccionar clase de incidencia!", type: "error", confirmButtonText: "Aceptar" });
        }

        else if (tincidencia == "")
        {
            swal({ title: "¡Error!", text: "¡Seleccionar tipo de incidencia!", type: "error", confirmButtonText: "Aceptar" });
        }
        else
        {
            $.ajax(
               {
                   type: "POST",
                   async: true,
                   url: $("#ti_int_id").data("url").trim(),
                   data: { "subsistema": subsistema, "IdClaseIncidencia": cincidencia, "IdTipoIncidencia": tincidencia },
                   success: function (data) {
                       var $select = $('#mc_int_id');
                       $select.empty();
                       $("#mc_int_id").append('<option value="">[Medio comunicación]</option>');
                       $.each(data, function (i, state) {
                           $('<option>', {
                               value: state.Value
                           }).html(state.Text).appendTo($select);
                       });
                   },
                   error: function (request, status, error)
                   {
                       swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                   }
               });
        }
    })


    $(function () {
        $('#FrmNuevaIncidencia').submit(function (event)
        {
            var subsistema  = $("#ssis_int_id").val();
            var cincidencia = $("#ci_int_id").val();
            var tincidencia = $("#ti_int_id").val();
            var mcomunicacion = $("#mc_int_id").val();

            if (subsistema ="" || cincidencia == "" || tincidencia == "" || mcomunicacion == "")
            {
                event.preventDefault();
                swal({ title: "¡Error!", text: "¡Seleccionar Sub-Sistema, clase, tipo de incidencia y medio de comunicación!", type: "error", confirmButtonText: "Aceptar" });
            }
            else
            {
               
                $('#FrmNuevaIncidencia').submit();
            }
        });

    });


});

function showLoading() {
    $.blockUI({
        message: '<div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div>  <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div>  <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
        theme: false,
        baseZ: 100000
    });
}

function CargarClases(subsistema)
{
    if (subsistema != 0)
    {
        $.ajax(
               {
                   type: "POST",
                   async: true,
                   url: $("#ssis_int_id").data("url").trim(),
                   data: { "subsistema": subsistema },
                   success: function (data) {
                       var $select = $('#ci_int_id');
                       $select.empty();
                       $("#ci_int_id").append('<option value="">[Clase Incidencia]</option>');
                       $.each(data, function (i, state) {
                           $('<option>', {
                               value: state.Value
                           }).html(state.Text).appendTo($select);
                       });
                   },
                   error: function (request, status, error) {
                       swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                   }
               });

    }
}