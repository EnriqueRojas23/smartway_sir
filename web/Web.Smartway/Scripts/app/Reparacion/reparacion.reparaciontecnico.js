const urlFinalizar = UrlHelper.Action("FinalizarReparacion", "Reparacion", "Reparacion");
const urlPausar = UrlHelper.Action("JsonPausarReparacion", "Reparacion", "Reparacion");

const $btnAgregar = $("#btnAgregar");
const $grilla = $("#griddetalle");
const $pagergrilla = $("#griddetallepager");
const $btnPausar = $("#btnPausar");
const $btnFinalizar = $("#btnFinalizar");


var lapse1_fin = convertDate($("#lapse1_fin").val());
var lapse1_inicio = convertDate($("#lapse1_inicio").val());

var lapse2_inicio = convertDate($("#lapse2_inicio").val());
var lapse2_fin =  convertDate($("#lapse2_fin").val());

var lapse3_fin = convertDate($("#lapse3_fin").val());
var lapse3_inicio = convertDate($("#lapse3_inicio").val());

var lapse4_inicio = convertDate($("#lapse4_inicio").val());
var lapse4_fin =  convertDate($("#lapse4_fin").val());

var lapse5_fin = convertDate($("#lapse5_fin").val());
var lapse5_inicio = convertDate($("#lapse5_inicio").val());

var lapse6_inicio = convertDate($("#lapse6_inicio").val());
var lapse6_fin =  convertDate($("#lapse6_fin").val());

var lapse7_fin = convertDate($("#lapse7_fin").val());
var lapse7_inicio = convertDate($("#lapse7_inicio").val());

var lapse8_inicio = convertDate($("#lapse8_inicio").val());
var lapse8_fin =  convertDate($("#lapse8_fin").val());

var lapse9_inicio = convertDate($("#lapse9_inicio").val());
var lapse9_fin =  convertDate($("#lapse9_fin").val());

var lapse10_inicio = convertDate($("#lapse10_inicio").val());
var lapse10_fin =  convertDate($("#lapse10_fin").val());


const countDownDate = new Date($("#tiempotrabajo").val());



function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    let dia = String(inputFormat).substring(0, 2);
    let mes = String(inputFormat).substring(3, 5);
    let anio = String(inputFormat).substring(6, 10);

    let hora = String(inputFormat).substring(11, 13);
    let minuto = String(inputFormat).substring(14, 16);
    let segundo = String(inputFormat).substring(17, 19);

    inputFormat = String(inputFormat).substring(0, 19);

    var d = new Date(anio, mes - 1, dia, hora, minuto, segundo);
    return d;
}

    var x = setInterval(function() {

        var now = new Date();
        var ultimoinicio = '';
        var distancia1 = 0;
        var distancia2 = 0;
        var distancia3 = 0;
        var distancia4 = 0;

        var algo = $("#inicios").val();

        
        //if ($("#lapse10_inicio").val() === undefined)
        //    if ($("#lapse9_inicio").val() === undefined)
        //        if ($("#lapse8_inicio").val() === undefined)
        //            if ($("#lapse7_inicio").val() === undefined)
        //                if ($("#lapse6_inicio").val() === undefined)
        //                    if ($("#lapse5_inicio").val() === undefined)

        if ($("#lapse4_inicio").val() === undefined) {

            if ($("#lapse3_inicio").val() === undefined) {

                if ($("#lapse2_inicio").val() === undefined) {

                    ultimoinicio = new Date(lapse1_inicio);
                }
                else {
                    ultimoinicio = new Date(lapse2_inicio);
                    distancia1 = lapse1_fin - lapse1_inicio;
                }
            }
            else {
                ultimoinicio = new Date(lapse3_inicio);
                distancia1 = lapse1_fin - lapse1_inicio;
                distancia2 = lapse2_fin - lapse2_inicio;
                
            }
        }
        else   {
            ultimoinicio = new Date(lapse4_inicio);
            distancia1 = lapse1_fin - lapse1_inicio;
            distancia2 = lapse2_fin - lapse2_inicio;
            distancia3 = lapse3_fin - lapse3_inicio;
        }
            

        
       // Calcula el cronometro 
        var ultima_distancia = now - ultimoinicio;

    
        distance = ultima_distancia + distancia1 + distancia2 + distancia3 + distancia4;
    

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
        '.chosen-select': {
            max_selected_options: 5,
            allow_single_deselect: false,
            no_results_text: 'Oops, no se encontró el ubigeo!'
        }

    };

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

        let iddiagnostico = $("#iddiagnostico").val();
        if(iddiagnostico==='')
        {
            swal("Reparación","Debe seleccionar un diagnóstico","warning")
            return;
        }
        let idreparacion = $("#idreparacion").val();
        if(idreparacion==='')
        {
            swal("Reparación","Debe seleccionar una reparación","warning")
            return;
        }
        let idrepuesto = $("#idrepuesto").val()
        if(idrepuesto==='')
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
            , "idottiempo" : $("#idordentrabajotiempo").val()
            , "idordentrabajo" : $("#idordentrabajo").val()
          },
            dataType: "JSON",
            success: function (data) {
                if(data.res)
                {
                    reload()
                }
                else
                {
                    swal({
                            title: "No puede continuar",
                            type: "warning",
                            confirmButtonClass: "btn-danger",
                            text:"Motivo: " + data.msj , 
                            confirmButtonText: "Aceptar",
                            showCancelButton: false,
                            },
                            function(){

                                    let vurl = UrlHelper.Action("PanelTrabajoTecnico","Reparacion","Reparacion")
                                    window.location.href = vurl;
                       });        
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
                    , "informetecnico" : $("#informetecnico").val()
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
                   
                },
                error: function (request, status, error) {
                    swal({ title: "Recepción Guías", text: "Ocurrió un error al finalizar la recepción", type: "error", confirmButtonText: "Aceptar" });
                }
            });
        });
    })
    $btnFinalizar.click(function (e){
        e.preventDefault();


        var count = $grilla.jqGrid('getGridParam', 'records');
        if (count === 0) {
            swal("No puede finalizar la orden", "Debe tener al menos una reparación", "error");
            return;
        }
        


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
                    , "informetecnico" : $("#informetecnico").val()
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
        colNames: ['','','','Descripción','Diagnostico' , 'Reparación' ,'Repuestos', 'Serie', 'IMEI' ,'Costos', ''],
        colModel:
        [
            { key: true, hidden: true, name: 'idordentrabajodetalle', align: 'center' },
            { key: false, hidden: true, name: 'idrepuesto', align: 'center' },
            { key: false, hidden: true, name: 'idinventario', align: 'center' },
            { key: false, name: 'descripcion', width:'240',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'diagnostico', width:'240',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'reparacion',  align: 'center', width:'240', sortable: false,  formatter: formatedit  },
            { key: false, name: 'repuesto',  align: 'center', width:'240', sortable: false,  formatter: formatedit  },
            { key: false, name: 'serie',  align: 'center', width:'240', sortable: false,  formatter: formatedit  },
            { key: false, name: 'imei',  align: 'center', width:'240', sortable: false,  formatter: formatedit  },
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
function VerDetalle(id) {

    let URL_VerAntecedentes = UrlHelper.Action("DetalleOTSModal", "Reparacion", "Reparacion") + "?id=" + id;
    $.get(URL_VerAntecedentes, function (data) {
        $("#modalcontentL").html(data);
        $("#modalcontainerL").modal("show");
        cargarTablasAntecedente();
    });
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
                        if(data==="True")
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
