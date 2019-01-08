const $btnCotizar = $("#btnCotizar");
const $btnAgregarDelivery = $("#btnAgregarDelivery");
const $grilla = $("#griddetalle")
const $pagergrilla = $("#griddetallepager")



$(document).ready(function () {
    inicio();

    //$("#MenuCotizar").children().css( "font-weight", "bold" );

    $("#MenuCotizar").children().html("")
    $("#MenuCotizar").children().append("<span class='label label-danger'>Cotización Incidencia</span>")



});
function inicio()
{
    configurarGrilla();
    configurarControles();
    initTiles();
    
    let total = 0.0
    let subtotal = 0.0
    let igv  = 0.0

    if($("#str_total").val() != '')
         total = parseFloat($("#str_total").val())
    if($("#str_subtotal").val() != '')
         subtotal =  parseFloat($("#str_subtotal").val())
    if($("#str_igv").val() != '')
        igv =  parseFloat($("#str_igv").val())

    $("#p_total").html(total.toFixed(2))
    $("#p_subtotal").html(subtotal.toFixed(2))
    $("#p_igv").html(igv.toFixed(2))


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
function configurarChosenSelect()
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
            return;agr
        }

        vurl = UrlHelper.Action("CotizarIncidencia","Cotizacion","Reparacion")
        $.ajax({
            type: "POST",
            url: vurl,
            data: {
              "iddiagnostico" : iddiagnostico
            , "idreparacion" : idreparacion 
            , "idrepuesto" : idrepuesto 
            , "idpartner" : $("#idpartner").val()
            , "idtipoproducto" : $("#idtipoproducto").val()
          },

            dataType: "JSON",
            success: function (data) {
                if(data.res)
                {
                   //a ya  swal("Cotización", "Se agregó con éxito" , "success")
                    reload()
                    $("#p_total").html(data.total.toFixed(2))
                    $("#p_subtotal").html(data.subtotal.toFixed(2))
                    $("#p_igv").html(data.igv.toFixed(2))

                }
            }
        });

    




        
    });
    $("#btnLimpiar").click(function(event) {
        event.preventDefault();
        let url = UrlHelper.Action("LimpiarCotizacion", "Cotizacion", "Agendamiento");

        $.ajax({
            type: "POST",
            url: url,
            data: {  },
            dataType: "JSON",
            success: function (response) {
                
                reload();
                $btnAgregarDelivery.removeAttr('disabled')
                $("#iddirecciondelivery").removeAttr('disabled')
                $("#iddirecciondelivery option[value='']").attr("selected", "selected");

                $("#p_total").html(response.total)
                $("#p_subtotal").html(response.subtotal)
                $("#p_igv").html(response.igv)

                swal("Cotización", "Se eliminó el detalle con éxito" , "success")

            }
        });

    })
    $btnAgregarDelivery.click(function (e){
   
        let iddireccion =  $("#iddirecciondelivery").val()
        let vurl = UrlHelper.Action("AgregarDelivery","Cotizacion","Agendamiento")

        if(iddireccion=='')
        {
           swal("No puede agregar delivery","Debe seleccionar una dirección", "warning")
           return ;
        }
        $.ajax({
            type: "POST",
            url: vurl,
            data: {"iddireccion": iddireccion , "engarantia" : $("#engarantia").val() },
            dataType: "JSON",
            success: function (data) {
                if(data.res)
                {
                    reload()
                    swal("Cotización", "Se agregó con éxito" , "success")
                    $("#p_total").html(data.total.toFixed(2))
                    $("#p_subtotal").html(data.subtotal.toFixed(2))
                    $("#p_igv").html(data.igv.toFixed(2))

                    $btnAgregarDelivery.attr('disabled','disabled')
                    $("#iddirecciondelivery").attr('disabled','disabled')

                }
            }
        });





    })

}
function configurarCombos()
{
    var vdataurl_1 = UrlHelper.Action("cargarReparacion","Cotizacion","Reparacion");
    $("#iddiagnostico").change(function (){
        event.preventDefault();
        
        $.ajax({
            type: "POST",
            url: vdataurl_1,
            data: { "iddiagnostico" : this.value 
            , "idtipoproducto" : $("#idtipoproducto").val()  
            , "idfabricante" :  $("#idfabricante").val()  },
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
                $("#idreparacion").trigger("chosen:updated")

            }
        });
    });

        var vdataurl_2 = UrlHelper.Action("cargarRepuestos","Cotizacion","Reparacion");
        $("#idreparacion").change(function (){
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: vdataurl_2,
                data: { "idreparacion" : this.value , "idproducto" : $("#idproducto").val() },
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
                    $select.trigger("chosen:updated")
                }
            });
        });

 
}
function reload()
{
    var vdataurl = $grilla.data("dataurl") + "?idordentrabajo=" + $("#idordentrabajo").val();
    $grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function configurarGrilla()
{

        
    $.jgrid.defaults.height = 120;
    $.jgrid.defaults.responsive = true;
    var vdataurl = $grilla.data("dataurl") + "?idordentrabajo=" + $("#idordentrabajo").val();
    //'✓'
    $grilla.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['','Descripción','Diagnostico' , 'Reparación' ,'Repuestos','Costo'],
        colModel:
        [
            { key: true, hidden: true, name: 'idcotizaciondetalle', align: 'center' },
            { key: false, name: 'descripcion', width:'240',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'diagnostico', width:'240',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'reparacion',  align: 'center', width:'220', sortable: false,  formatter: formatedit  },
            { key: false, name: 'repuesto',  align: 'center', width:'220', sortable: false,  formatter: formatedit  },
            { key: false, name: 'costo', align: 'center',width:'190',sortable: false, formatter: 'currency' ,formatoptions: CONFIG_JQGRID.get('formatoptions_currency_pen') },
            // { key: false, hidden: false, editable: false ,name: 'index', width:'140' , index: 'index' ,  formatter:  displayButtons,classes:"grid-col"}
        ],
        pager: $pagergrilla,
        rowNum: 10,
        rowList: [10, 20],
        emptyrecords: 'No se encontraron registros',
        autoheight: true,
        autowidth: true,
        shrinkToFit: true,
        multiselect: false,
        jsonReader:
        {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            id: 0
        },
    });
        

}



function displayButtons(cellvalue, options, rowObject)
{
    var eliminar = '<button type="button" class="btn btn-primary btn-xs btn-outline" onclick="irEliminar(' + cellvalue + ')"><i class="fa fa-trash"></i></button>';
     return     eliminar ;
}
function irEliminar(id)
{
    let  vurl = UrlHelper.Action("EliminarDetalleCotizacion","Cotizacion","Agendamiento")

    $.ajax({
        type: "POST",
        url: vurl,
        data: {"index" : id , "engarantia" : $("#engarantia").val() },
        dataType: "JSON",
        success: function (response) {
            
            swal("Cotización", "Se eliminó el detalle con éxito" , "success")
            reload()
            
            $("#p_total").html(response.total.toFixed(2))
            $("#p_subtotal").html(response.subtotal.toFixed(2))
            $("#p_igv").html(response.igv.toFixed(2))

       

        }
    });


}
function VerIncidencia(id)
{
    let vurl = UrlHelper.Action("VerIncidencia","Agendamiento","Agendamiento") + "?idincidencia=" + id;
    window.location.href = vurl;
}

function Registrar()
{
    //let clienteaceptacotizacion = $("#clienteaceptacotizacion").is(":checked");


    let idsucursal = $("#idsucursal").val()

    //let iddirecciondelivery = $("#iddirecciondelivery").val()
    let idordentrabajo = $("#idordentrabajo").val()

    let vurl = UrlHelper.Action("registrarCotizacion","Cotizacion","Reparacion")


    swal({
        title: "Registrar Cotización",
        text: "¿Está seguro que desea guardar la cotización? ",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Guardar',
        closeOnConfirm: true,
        closeOnCancel: true
    },
     function (isConfirm) {
           if (isConfirm) {

    $.ajax({
        type: "POST",
        url: vurl,
        data: {"idsucursalreparacion": idsucursal
        ,"idordentrabajo" :idordentrabajo
       } ,
        dataType: "JSON",
        success: function (data) {
            if(data.res)
            {
                evaluarEstadoFisico()   
            }
            
        }
    });
           }
     });
}

function evaluarEstadoFisico()
{
    let vurl = UrlHelper.Action("PanelTrabajoTecnico","Reparacion","Reparacion")
    window.location.href = vurl;
}
