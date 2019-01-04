
const $grilla = $("#gridreparaciones")
const $pagergrilla = $("#gridreparacionespager")
const $btnBuscar = $("#btnBuscar")
const $btnNuevo = $("#btnNuevo")




$(document).ready(function () {
    inicio();
});
function inicio()
{
    configurarGrilla();
    configurarControles();
}
function configurarGrilla()
{

    $.jgrid.defaults.height = 520;
    $.jgrid.defaults.responsive = true;


    var fechainicio = $("#fechainicio").val();
    var fechafin = $("#fechafin").val();
    var numeroordenservicio = $("#numeroordenservicio").val();
    var serie = $("#serie").val()


  var vdataurl = $grilla.data("dataurl") +    "?fechainicio="  + fechainicio 
     + "&fechafin=" + fechafin 
     + "&serie=" + serie 
     + "&numeroordenservicio=" + numeroordenservicio


    $grilla.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['','Orden Servicio','Tipo','Producto',  'Serie','Imei','MAC', 'Fec.Asignación', 'Sucursal Origen','Estado' ,'Reparación', 'Acciones' ],
        colModel:
        [
            { key: true, hidden: true, name: 'idordenserviciotecnico', align: 'center' },
            { key: false, name: 'numeroost', width:'90', align: 'center',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'tipoordenservicio',  width:'50', align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'producto',  align: 'left', width:'210',  sortable: false,  formatter: formatedit  },
               { key: false, name: 'serie',  align: 'left', width:'120',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'imei',  align: 'left', width:'120',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'mac',  align: 'left', width:'120',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'fechaAsignacion',  align: 'center',width:'80', sortable: false, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' } },
            { key: false, name: 'sucursalorigen',  align: 'center', width:'110',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'otestado',  width:'120', align: 'left', sortable: false, formatter: formateditcolor },
            { key: false, name: 'idordentrabajo',  align: 'center', width:'110',  sortable: false,  formatter: displayButtonsIniciar  },
            { key: false, name: 'idordenserviciotecnico',  align: 'left', width:'110',  sortable: false,  formatter: displayButtons  }
            //{ key: false, hidden: false, editable: false ,name: 'idordenserviciotecnico', width:'140' , index: 'idordenserviciotecnico' ,  formatter:  displayButtons,classes:"grid-col"}
            
        ],
        pager: $pagergrilla,
        rowNum: 20,
        rowList: [20, 40,60,80],
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
function configurarControles()
{
    $('#data_2 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });
   
    $btnBuscar.click(function (e) { 
        e.preventDefault();
        reload()
        
    });
    $btnNuevo.click(function (e) { 
        e.preventDefault();
        var url = UrlHelper.Action("ProgramarGuiasModal", "Despacho", "Despacho") 

          $.get(url, function (data) {
              $("#modalcontentL").html(data);
              $("#modalcontainerL").modal("show");
    
              inicializandoModal();
              configurarGrillaModal();
    
    
        });
      });

   

}
function inicializandoModal()
{
    $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });
}



function seleccionar_formmatterIncidencia(cellvalue, options, rowObject) {
    var lnk = $("<button type='button' class='btn btn-primary btn-outline btn-xs' ><i class='fa fa-check-circle-o'></i>   "+ cellvalue +"</button>");
    $(lnk).attr("onClick", "VerIncidencia('" + rowObject.idincidencia + "')"); 

    return $(lnk)[0].outerHTML;

}
function displayButtons(cellvalue, options, rowObject)
{
    var editar = '<div class="btn-group"><button type="button" title="Editar" class="btn btn-primary btn-xs " onclick="recepcionar(' + cellvalue + ')"><i class="fa fa-edit"></i> Recepcionar </button>';
   return   editar  ;
}
function displayButtonsIniciar(cellvalue, options, rowObject)
{
   if(rowObject.otestado == "En Atención")
   return  '<div class="btn-group"><button type="button" title="Editar" class="btn btn-danger btn-xs " onclick="continuar(' + cellvalue + ')"><i class="fa fa-edit"></i> Continuar </button>';
   else if(rowObject.otestado == "Completada")
       return '';
   else if(rowObject.otestado == "Cotización Completa")
       return '';
   else
   return  '<div class="btn-group"><button type="button" title="Editar" class="btn btn-danger btn-xs " onclick="iniciar(' + cellvalue + ')"><i class="fa fa-plus"></i> Iniciar </button>';
}

function reload()
{
    var fechainicio = $("#fechainicio").val();
    var fechafin = $("#fechafin").val();
    var numeroordenservicio = $("#numeroordenservicio").val();
    var serie = $("#serie").val()


  var vdataurl = $grilla.data("dataurl") +    "?fechainicio="  + fechainicio 
     + "&fechafin=" + fechafin 
     + "&serie=" + serie 
     + "&numeroordenservicio=" + numeroordenservicio
 

    $grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}

function reloadModal()
{

    
    var idsucursalorigen = $("#searchmodal_idsucursalorigen").val();
    var idsucursaldestino = $("#searchmodal_idsucursaldestino").val();

    const $grillamodal = $("#gridguias")
    const $pagergrillamodal = $("#gridguiaspager")


    var vdataurl = $grillamodal.data("dataurl") + 
     "?idsucursalorigen="  + idsucursaldestino 
     + "&idsucursaldestino=" + idsucursaldestino 


    $grillamodal.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}


function buscarGuias()
{
    reloadModal()
}

function Programar()
{
    const $grillamodal = $("#gridguias")
    let  selIds  =$grillamodal.jqGrid('getGridParam', 'selarrrow');
    let fecharecojo = $("#fecharecojo").val()
    let idtransporte = $("#ddltransportista").val()

    if(selIds == '')
    {
         swal("No puede continuar","Debe seleccionar al menos una guia")
         return;
    }
    if(idtransporte=='')
    {
        swal("No puede continuar","Debe seleccionar un transportista")
        return;
    }
    if(fecharecojo=='')
    {
        swal("No puede continuar","Debe seleccionar una fecha de recojo")
        return;
    }

   let vurl = UrlHelper.Action("JsonGenerarDespacho","Despacho","Despacho")

   $.ajax({
       type: "POST",
       url: vurl,
       data: {ids : String(selIds) , fecharecojo :fecharecojo, idtransporte : idtransporte  },
       dataType: "JSON",
       success: function (response) {
           if(response.res)
           {
               $("#modalcontainerL").modal("hide");
               reload()
               swal("Registro Correcto","El registro se he realizado correctamente", "success")

           }
       }
   });

}
function recepcionar(id)
{
    let vurl = UrlHelper.Action("RecepcionOrdenServicio","Recepcion","Recepcion") + "?id=" + id;
    window.location.href = vurl;
}
function asignar(id)
{

    
    let vurl = UrlHelper.Action("AsignarTecnicoModal","Reparacion","Reparacion") + "?id=" + id;
    

    $.get(vurl,function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");

         let $btnAsignar = $("#btnAsignar")
         $btnAsignar.click(function (){
            let vurl2 = UrlHelper.Action("AsignarTecnico","Reparacion","Reparacion");       
            $.ajax({
                type: "POST",
                url: vurl2,
                data: {"id": id, idtecnico : $("#idtecnico").val() },
                dataType: "JSON",
                success: function (response) {
                    reload()
                    $("#modalcontainer").modal("hide");
                }
            });

         })

            
    });
}
function iniciar(id){
    let vurl = UrlHelper.Action("JsonIniciarReparacion","Reparacion","Reparacion")
    $.ajax({
        type: "POST",
        url: vurl,
        data: {"id" : id },
        dataType: "JSON",
        success: function (response) {
            if(response.res){

              if(!response.engarantia)
              {
                if(response.cotizado)
                {
                    let vurl = UrlHelper.Action("RepararOrden","Reparacion","Reparacion") + "?id=" + id;
                    window.location.href = vurl;
                }
                else
                {
                    let vurl = UrlHelper.Action("Cotizar","Cotizacion","Reparacion") + "?idordentrabajo=" + id;
                    window.location.href = vurl;
                }
              }
              else
              {
                 let vurl = UrlHelper.Action("RepararOrden","Reparacion","Reparacion") + "?id=" + id;
                    window.location.href = vurl;
              }
            }
            else{
                swal("No se pudo continuar", "Hubo un error al momento de iniciar la reparación", "warning")
            }
        }
    });
}
function continuar(id){
    let vurl = UrlHelper.Action("RepararOrden","Reparacion","Reparacion") + "?id=" + id;
    window.location.href = vurl;
}


function displayButtons(cellvalue, options, rowObject)
{
    var editar = '<div class="btn-group"><button type="button" title="Editar" class="btn btn-primary btn-xs " onclick="verDetalle(' + cellvalue + ')"><i class="fa fa-search"></i></button>';
    return   editar  ;
}
function verDetalle(id){
    let vurl = UrlHelper.Action("DetalleOrdenServicio","OrdenServicio","Agendamiento") + "?idordenservicio=" + id;
    window.location.href = vurl;
}

