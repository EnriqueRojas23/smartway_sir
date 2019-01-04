const $btnCotizar = $("#btnCotizar");
const $grilla = $("#griddetalle")
const $pagergrilla = $("#griddetallepager")



$(document).ready(function () {
    inicio();
   
    $("#MenuPropuesta").children().html("")
    $("#MenuPropuesta").children().append("<span class='label label-danger'>Propuesta</span>")
  
    $("#frmPropuesta").validate();
     



});
function inicio()
{
    configurarControles();
    initTiles();
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
function configurarChosenSelect(id)
{

     var config = {
            '.chosen-select': {max_selected_options: 5 ,
                 allow_single_deselect: false ,
                 no_results_text: 'Oops, no se encontró el ubigeo!' }

        }

        for (var selector in config) {
            $(selector).chosen(config[selector]);
        }

}
function configurarControles()
{

    configurarChosenSelect();
    configurarCombos();
    configurarBotones();
    
  
}
function configurarBotones()
{

    $btnCotizar.click(function (e) { 
        e.preventDefault();
;
        let iddiagnostico = $("#iddiagnostico").val()
        if(iddiagnostico=='')
        {
            swal("Cotizar","Debe seleccionar un diagnóstico","warning")
            return;
        }
        let idreparacion = $("#idreparacion").val()
        if(idreparacion=='')
        {
            swal("Cotizar","Debe seleccionar una reparación","warning")
            return;
        }
        let idrepuesto = $("#idrepuesto").val()
        if(idrepuesto=='')
        {
            swal("Cotizar","Debe seleccionar un repuesto","warning")
            return;
        }

        vurl = UrlHelper.Action("CotizarIncidencia","Agendamiento","Agendamiento")
        $.ajax({
            type: "POST",
            url: vurl,
            data: {"iddiagnostico" : iddiagnostico, "idreparacion" : idreparacion , "idrepuesto" : idrepuesto },
            dataType: "JSON",
            success: function (data) {
                if(data.res)
                {
                    swal("Cotización", "Se agregó con éxito" , "success")
                    reload()
                    $("#p_total").html(data.total.toFixed(2))
                    $("#p_subtotal").html(data.subtotal.toFixed(2))
                    $("#p_igv").html(data.igv.toFixed(2))
                }
            }
        });
    });
    if($("#idincidenciasolucion").val() != '')
    {
        $("#idpropuesta").attr("disabled", true)
    }
    if($("#observacion").val() != '')
    {
        $("#observacion").attr("disabled", true)
    }
}
function configurarCombos()
{
    var vdataurl_1 = UrlHelper.Action("cargarReparacion","Agendamiento","Agendamiento");
    $("#iddiagnostico").change(function (){
        event.preventDefault();
        
        $.ajax({
            type: "POST",
            url: vdataurl_1,
            data: { "iddiagnostico" : this.value  },
            dataType: "JSON",
            success: function (data) {
                var $select = $('#idreparacion');
                $select.empty();
                $("#idreparacion").append('<option value="">[Seleccionar]</option>');
                $.each(data.listareparacion, function (i, state) {
                    $('<option>', {
                        value: state.Value
                    }).html(state.Text).appendTo($select);
                });
            }
        });
    });

        var vdataurl_2 = UrlHelper.Action("cargarRepuestos","Agendamiento","Agendamiento");
        $("#idreparacion").change(function (){
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: vdataurl_2,
                data: { "idreparacion" : this.value  },
                dataType: "JSON",
                success: function (data) {
                    var $select = $('#idrepuesto');
                    $select.empty();
                    $select.append('<option value="">[Seleccionar]</option>');
                    $.each(data.listarepuestos, function (i, state) {
                        $('<option>', {
                            value: state.Value
                        }).html(state.Text).appendTo($select);
                    });
                }
            });
        });


}
function reload()
{
    var vdataurl = $grilla.data("dataurl") + "?idincidencia=" + $("#idincidencia").val();
    $grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}




function displayButtons(cellvalue, options, rowObject)
{
    var eliminar = '<button type="button" class="btn btn-primary btn-xs btn-outline" onclick="irEliminar(' + cellvalue + ')"><i class="fa fa-trash"></i></button>';
     return     eliminar ;
}
function VerIncidencia(id)
{
    let vurl = UrlHelper.Action("VerIncidencia","Agendamiento","Agendamiento") + "?idincidencia=" + id;
    window.location.href = vurl;
}

function Registrar()
{
    let clienteaceptacotizacion = $("#clienteaceptacotizacion").is(":checked");
    let idsucursal = $("#idsucursal").val()
    let iddirecciondelivery = $("#iddirecciondelivery").val()
    let idincidencia = $("#idincidencia").val()

    let vurl = UrlHelper.Action("registrarIncidencia","Agendamiento","Agendamiento")
    $.ajax({
        type: "POST",
        url: vurl,
        data: {"aceptada":clienteaceptacotizacion 
        , "idsucursal": idsucursal
        , "iddireccion" :  iddirecciondelivery 
        ,"idincidencia" :idincidencia
       } ,
        dataType: "JSON",
        success: function (data) {
            alert(data.res)
            
        }
    });
}
function OnCompleteTransaction(xhr, status)
{
    var jsonres = xhr.responseJSON;
    CleanValidationError();

    if (jsonres.res == true){
        swal({
            title: "Registro Completo",
            text: "Se ha registrado de forma correcta.",
            type: "success"
        },
        function (){
                let url = UrlHelper.Action("EstadoFisico","Agendamiento","Agendamiento") + "?idincidencia=" + jsonres.idincidencia;
                window.location.href = url;
        });
    }
    else{
        sweetAlert("Verificar Errores", null, "error");
        CheckValidationErrorResponse(jsonres);
    }
}

function Registrar(){

    // swal({
    //     title: "Registro de la propuesta",
    //     text: "¿Está seguro que desea registrar este propuesta?",
    //     type: "warning",
    //     showCancelButton: true,
    //     cancelButtonText: "Cancelar",
    //     confirmButtonColor: '#DD6B55',
    //     confirmButtonText: 'Registrar',
    //     closeOnConfirm: true,
    //     closeOnCancel: true
    // },
    // function (isConfirm) {
    //     if (isConfirm) {
    //         event.preventDefault();
    //     }
    // });

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