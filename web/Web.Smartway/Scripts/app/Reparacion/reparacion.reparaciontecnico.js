const urlFinalizar = UrlHelper.Action("FinalizarReparacion","Reparacion","Reparacion")
const urlPausar = UrlHelper.Action("JsonPausarReparacion","Reparacion","Reparacion")

const $btnAgregar = $("#btnAgregar");
const $grilla = $("#griddetalle")
const $pagergrilla = $("#griddetallepager")
const $btnPausar = $("#btnPausar")
const $btnFinalizar = $("#btnFinalizar")

const countDownDate = new Date($("#tiempotrabajo").val());

function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')+' ' +
                [d.getHours(),
                 d.getMinutes(),
                 d.getSeconds()].join(':');
}
// Update the count down every 1 second
var x = setInterval(function() {

var inicio  = convertDate($("#tiempotrabajo").val());






  var now = new Date();
  var inicio2 = new Date(inicio);



  // Find the distance between now and the count down date
  var distance = now - inicio2  ;


  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("dia").innerHTML = days  ;
  document.getElementById("hora").innerHTML = hours  ;
  document.getElementById("minuto").innerHTML = minutes ;
  document.getElementById("segundo").innerHTML = seconds ;

  // If the count down is finished, write some text
  // if (distance < 0) {
  //   clearInterval(x);
  //   document.getElementById("demo").innerHTML = "EXPIRED";
  // }
}, 1000);


$(document).ready(function () {
    inicio();

});
function inicio()
{
    configurarGrilla();
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

    $btnAgregar.click(function (e) {
        e.preventDefault();

        let iddiagnostico = $("#iddiagnostico").val()
        if(iddiagnostico=='')
        {
            swal("Reparación","Debe seleccionar un diagnóstico","warning")
            return;
        }
        let idreparacion = $("#idreparacion").val()
        if(idreparacion=='')
        {
            swal("Reparación","Debe seleccionar una reparación","warning")
            return;
        }
        let idrepuesto = $("#idrepuesto").val()
        if(idrepuesto=='')
        {
            swal("Reparación","Debe seleccionar un repuesto","warning")
            return;
        }
        vurl = UrlHelper.Action("AgregarReparacion","Reparacion","Reparacion")
        $.ajax({
            type: "POST",
            url: vurl,
            data: {
              "iddiagnostico" : iddiagnostico
            , "idreparacion" : idreparacion
            , "idrepuesto" : idrepuesto
            , "idordenservicio" : $("#idordenserviciotecnico").val()
          },
            dataType: "JSON",
            success: function (data) {
                if(data.res)
                {
                    reload()
                }
                else
                {
                    swal("No puede continuar", data.msj , "warning")
                }
            }
        });

    });

    $btnPausar.click(function (e) {
        e.preventDefault();

        swal({
            title: "¿Esta seguro de pausar la reparación?",
            text: "Para continuar iniciar desde el seguimiento.",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Pausar Reparación',
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function ()
        {
            $.ajax({
                type: "POST",
                url: urlPausar,
                data: {
                    "id": $("#idordentrabajo").val()
                    , "idottiempo": $("#idordentrabajotiempo").val()
                    , "descripcion": $("#descripcion").val()
                },
                async : true,
                dataType: "JSON",
                success: function (response) {
                    if(response.res)
                    {
                        swal("Reparación", "La orden se ha pausado satisfactoriamente", "success");
                        let vurl = UrlHelper.Action("PanelTrabajoTecnico","Reparacion","Reparacion")
                        window.location.href = vurl;
                    }
                    else{
                        alert('no')
                    }
                },
                error: function (request, status, error) {
                    swal({ title: "Recepción Guías", text: "Ocurrió un error al finalizar la recepción", type: "error", confirmButtonText: "Aceptar" });
                }
            });
        });
    })
    $btnFinalizar.click(function (e){
        e.preventDefault();
        swal({
            title: "¿Esta seguro de finalizar la reparación?",
            text: "Tener en cuenta que una vez finalizada se generará la guia de salida.",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Finalizar Reparación',
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function ()
        {
            $.ajax({
                type: "POST",
                url: urlFinalizar,
                data: {
                    "id": $("#idordentrabajo").val()
                    , "idottiempo": $("#idordentrabajotiempo").val()
                    , "descripcion" : $("#descripcion").val()
                },
                async : true,
                dataType: "JSON",
                success: function (response) {
                    if(response.res)
                    {
                        swal("Reparación", "La orden se ha cerrado satisfactoriamente", "success");
                        let vurl = UrlHelper.Action("PanelTrabajoTecnico","Reparacion","Reparacion")
                        window.location.href = vurl;
                    }
                    else{
                        alert('no')
                    }
                },
                error: function (request, status, error) {
                    swal({ title: "Recepción Guías", text: "Ocurrió un error al finalizar la recepción", type: "error", confirmButtonText: "Aceptar" });
                }
            });


        });

    });
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
            , "idfabricante" : 0  },
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
        colNames: ['','','','Descripción','Diagnostico' , 'Reparación' ,'Repuestos','Costosss', ''],
        colModel:
        [
            { key: true, hidden: true, name: 'idordentrabajodetalle', align: 'center' },
            { key: false, hidden: true, name: 'idrepuesto', align: 'center' },
            { key: false, hidden: true, name: 'idinventario', align: 'center' },
            { key: false, name: 'descripcion', width:'240',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'diagnostico', width:'240',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'reparacion',  align: 'center', width:'240', sortable: false,  formatter: formatedit  },
            { key: false, name: 'repuesto',  align: 'center', width:'240', sortable: false,  formatter: formatedit  },
            { key: false, hidden: true,  name: 'costo', align: 'center',width:'190',sortable: false, formatter: 'currency' ,formatoptions: CONFIG_JQGRID.get('formatoptions_currency_pen') },
            { key: false, hidden: false, editable: false ,name: 'idordentrabajodetalle', width:'40' , index: 'index' ,  formatter:  displayButtons,classes:"grid-col"}
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
    var eliminar = '<button type="button" class="btn btn-primary btn-xs btn-outline" onclick="irEliminar(' + cellvalue + ' , ' + rowObject.idinventario + ' , ' + rowObject.idrepuesto +')"><i class="fa fa-trash"></i></button>';
     return     eliminar ;
}
function irEliminar(id, idinventario, idrepuesto)
{
    let  vurl = UrlHelper.Action("JsonEliminarReparacionDetalle","Reparacion","Reparacion")
    $.ajax({
        type: "POST",
        url: vurl,
        data: { "item": id, "idinventario": idinventario, "idrepuesto": idrepuesto },
        dataType: "JSON",
        success: function (response) {
            reload()
        }
    });
}
function VerIncidencia(id)
{
    let vurl = UrlHelper.Action("VerIncidencia","Agendamiento","Agendamiento") + "?idincidencia=" + id;
    window.location.href = vurl;
}
function evaluarEstadoFisico(id)
{
    let vurl = UrlHelper.Action("EstadoFisico","Agendamiento","Agendamiento") + "?idincidencia=" + id;
    window.location.href = vurl;
}
function Antecedentes(id){

  let URL_VerAntecedentes = UrlHelper.Action("AntecedentesModal", "Reparacion" , "Reparacion") + "?id="+ id;
  $.get(URL_VerAntecedentes, function(data) {
      $("#modalcontentL").html(data)
      $("#modalcontainerL").modal("show")
        cargarTablasAntecedente();
  });
}
function cargarTablasAntecedente()
{
    var idordenserviciotecnico = $("#idordenserviciotecnico").val();

    $('.dataTables-AntProductos').DataTable({
        responsive: true,
        "searching": false,
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": $('#tblAntProductos').data("url") + "&idordenserviciotecnico=" + idordenserviciotecnico,
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "title": "N° OS", "data": "numeroordenservicio", "name": "numeroordenservicio", "autoWidth": true },
                { "title": "Fec. Registro", "data": "fechahoraregistro", "name": "fechahoraregistro", "autoWidth": true },
                { "title": "Usuario Recepción", "data": "usuario", "name": "usuario", "autoWidth": true },
                { "title": "Técnico", "data": "tecnico", "name": "tecnico", "autoWidth": true },
                { "title": "Falla", "data": "falla", "name": "falla", "autoWidth": true },
                { "title": "En Garantia", "data": "engarantia", "name": "engarantia", "autoWidth": true ,

                      "mRender" :
                      function(data,type,full){
                        if(data=="True")
                            return "Si"
                        else "No";
                      }
             },
            { "title": "Descripción", "data": "descripcion", "name": "descripcion", "autoWidth": true },
                {
                       "title": "Ver", "class": "text-center", "data": "idordenservicio", "Width": "5%", "mRender":

                        function (data, type, full) {
                            return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Editar'  class='btn btn-primary btn-xs btn-outline' onclick='verDetalle(" + data + ");' href='#' > <i class='fa fa-search'></i> </button>"
                               + "</div>";

                        }
                },
        ]
    });
detalle =
    $('.dataTables-AntCliente').DataTable({
        responsive: true,
        "searching": false,
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": $('#tblAntCliente').data("url") ,
             "data": function (d) {
                   d.idordenserviciotecnico = $("#idordenservicio_aux").val() ;
                  //  d.inactivo  = $("#activo").is(':checked');

               },
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "title": "Diagnostico", "data": "diagnostico", "name": "diagnostico", "autoWidth": true },
                { "title": "Reparación", "data": "reparacion", "name": "reparacion", "autoWidth": true },
                { "title": "Técnico", "data": "tecnico", "name": "tecnico", "autoWidth": true },
                // { "title": "Falla", "data": "falla", "name": "falla", "autoWidth": true }
        ]
    });

}
function verDetalle(id){
     $("#idordenservicio_aux").val(id)
    detalle.draw()
}
