


const $btnRealizarEvaluacion = $("#btnRealizarEvaluacion");

$(document).ready(function () {

    inicio();
     //$("#MenuEvaluacion").children().css( "font-weight", "bold" );

     $("#MenuEvaluacion").children().html("")
     $("#MenuEvaluacion").children().append("<span class='label label-danger'>Evaluación de Garantía</span>")

});
function inicio()
{
    initTiles();
    configurarControles();
}


function initTiles(){
    $(".live-tile").css('height', function(){
        return $(this).data('height')
    }).liveTile();

    $(document).one('pjax:beforeReplace', function(){
        $('.live-tile').liveTile("destroy", true).each(function(){
            var data = $(this).data("LiveTile");
            if (typeof (data) === "undefined")
                return;
            clearTimeout(data.eventTimeout);
            clearTimeout(data.flCompleteTimeout);
            clearTimeout(data.completeTimeout);
        });
    });
}
function configurarControles(){

    $btnRealizarEvaluacion.click(function (e) { 

        var dataModelo = $('form').serialize();
        var url = UrlHelper.Action("realizarEvaluacion","Evaluacion","Agendamiento")

        swal({
            title: "Realizar Evaluación",
            text: "¿Está seguro que desea realizar la evaluación? ",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Evaluar',
            closeOnConfirm: true,
            closeOnCancel: true
        },
         function (isConfirm) {
               if (isConfirm) {


        $.ajax({
            type: "POST",
            url: url,
            data: dataModelo,
            success: function (response) {

                   if(response==false){
                        swal("No se puede continuar" ,"Debe elegir todas las condiciones","warning");
                    }
                    else{
                      var url = UrlHelper.Action("Propuesta", "Propuesta", "Agendamiento") + "?idincidencia=" + $("#idincidencia").val()
                      window.location = url

                        //RealizarEvaluacion_Callback(response);
                    }
                 }
            });


          
            }
        }
    )
    });

    




}

function RealizarEvaluacion_Callback(data)
{
    $("#modalcontent").html(data);
    $("#modalcontainer").modal("show");
    
    var vUrl = UrlHelper.Action("RegistrarPropuesta","Agendamiento","Agendamiento")

    var $btnAceptarPropuesta = $("#btnAceptarPropuesta");
    $btnAceptarPropuesta.click(function (){


        var propuesta = $("#idpropuesta").val();
        if (propuesta == 0)
        {
            swal({ title: "¡Error!", text: "¡Seleccionar una propuesta!", type: "error", confirmButtonText: "Aceptar" });
        }
        else
        {
            $.ajax({
                type: "POST",
                url: vUrl ,
                data: {"idincidencia": $("#idincidencia").val(),
                 "idpropuesta" : propuesta , 
                 "observacion" : $("#ObservacionPropuesta").val() ,
                 "engarantia" : $("#engarantia").val() ,
                },
                dataType: "json",
                success: function (response) {

                     if(response.res)
                     {
                        if(response.cotizacion)
                        {
                            var urlCotizacion = UrlHelper.Action("CotizarIncidencia","Agendamiento","Agendamiento") 

                            urlCotizacion = urlCotizacion + "?idincidencia=" + response.idincidencia
                            $(window).attr("location", urlCotizacion);

                            
                        }
                        else if(response.finalizar)
                        {

                            swal("Incidencia Finalizada","Se ha procedido a cerrar la incidencia","success")

                            var urlSeguimiento = UrlHelper.Action("SeguimientoIncidencias","Agendamiento","Agendamiento") 
                            $(window).attr("location", urlSeguimiento);
                        }


                     }
                    
                }
            });
        }

    });



    
}
function Antecedentes(id){

  let URL_VerAntecedentes = UrlHelper.Action("AntecedentesModal", "Evaluacion" , "Agendamiento") 
  $.get(URL_VerAntecedentes, function(data) {
      $("#modalcontentL").html(data)
      $("#modalcontainerL").modal("show")
        cargarTablasAntecedente();

  });


}
function cargarTablasAntecedente()
{
    var incidencia = $("#idincidencia").val();
        
    // $('.dataTables-AntDocumentos').DataTable({
    //      responsive: true,
    //     "searching": false,
    //     "processing": true,
    //     "serverSide": true,
    //     "ajax": {
    //         "url": $('#tblAntDocCompra').data("url") + "?incidencia=" + incidencia + "&tipo=" + "Documento",
    //         "type": "POST",
    //         "datatype": "json"
    //     },
    //     "columns": [
    //             { "title": "Documento Compra", "data": "tdoc_str_numero", "name": "tdoc_str_numero", "autoWidth": true },
    //             { "title": "Tipo Incidencia", "data": "ti_str_descripcion", "name": "ti_str_descripcion", "autoWidth": true },
    //             { "title": "N° Incidencia", "data": "inc_str_numero", "name": "inc_str_numero", "autoWidth": true },
    //             { "title": "fecha", "data": "inc_dat_fecharegistro", "name": "inc_dat_fecharegistro", "autoWidth": true },
    //             { "title": "Producto", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true },
    //             { "title": "Motivo", "data": "mrc_str_descripcion", "name": "mrc_str_descripcion"}
    //     ],
    // });

    $('.dataTables-AntProductos').DataTable({
        responsive: true,
        "searching": false,
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": $('#tblAntProductos').data("url") + "&incidencia=" + incidencia,
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "title": "Documento Compra", "data": "numerocomprobante", "name": "numerocomprobante", "autoWidth": true },
                { "title": "Año Incidencia", "data": "anioincidencia", "name": "anioincidencia", "autoWidth": true },
                { "title": "N° Incidencia", "data": "numeroincidencia", "name": "numeroincidencia", "autoWidth": true },
                { "title": "Serie", "data": "serie", "name": "serie", "autoWidth": true },
                { "title": "IMEI", "data": "imei", "name": "imei", "autoWidth": true },
                { "title": "fecha", "data": "fechahoraregistro", "name": "fechahoraregistro", "autoWidth": true },
                { "title": "Producto", "data": "producto", "name": "producto", "autoWidth": true },
                { "title": "Falla", "data": "falla", "name": "falla", "autoWidth": true }
        ]
    });

    $('.dataTables-AntCliente').DataTable({
        responsive: true,
        "searching": false,
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": $('#tblAntCliente').data("url") + "&incidencia=" + incidencia ,
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "title": "Documento Compra", "data": "numerocomprobante", "name": "numerocomprobante", "autoWidth": true },
                { "title": "Año Incidencia", "data": "anioincidencia", "name": "anioincidencia", "autoWidth": true },
                { "title": "N° Incidencia", "data": "numeroincidencia", "name": "numeroincidencia", "autoWidth": true },
                { "title": "Serie", "data": "serie", "name": "serie", "autoWidth": true },
                { "title": "IMEI", "data": "imei", "name": "imei", "autoWidth": true },
                { "title": "fecha", "data": "fechahoraregistro", "name": "fechahoraregistro", "autoWidth": true },
                { "title": "Producto", "data": "producto", "name": "producto", "autoWidth": true },
                { "title": "Falla", "data": "falla", "name": "falla", "autoWidth": true }
        ]
    });

}