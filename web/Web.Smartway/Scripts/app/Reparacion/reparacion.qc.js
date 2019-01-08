
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
     var fechainicio = $("#fechainicio").val();
    var fechafin = $("#fechafin").val();
    var idestado = $("#idestado").val();
    var numeroordenservicio = $("#numeroordenservicio").val();
     var serie = $("#serie").val()

    $.jgrid.defaults.height = 520;
    $.jgrid.defaults.responsive = true;
    var vdataurl = $grilla.data("dataurl") +    "?fechainicio="  + fechainicio 
     + "&fechafin=" + fechafin + "&idestado=" + idestado + "&numeroordenservicio=" + numeroordenservicio 
        + "&serie=" + serie 


    $grilla.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['','Orden Servicio','Tipo','Producto', 'Serie' ,'IMEI', 'Fec.Asignación', 'Sucursal Origen', 'EnGarantia','Estado' ,'Técnico Asignado', 'Acciones' ],
        colModel:
        [
            { key: true, hidden: true, name: 'idordenserviciotecnico', align: 'center' },
            { key: false, name: 'numeroost', width:'90', align: 'center',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'tipoordenservicio',  width:'70', align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'producto',  align: 'left', width:'210',  sortable: false,  formatter: formatedit  },
             { key: false, name: 'serie',  align: 'left', width:'210',  sortable: false,  formatter: formatedit  },
              { key: false, name: 'imei',  align: 'left', width:'210',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'fechaAsignacion',  align: 'center',width:'80', sortable: false, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' } },
            { key: false, name: 'sucursalorigen',  align: 'center', width:'110',  sortable: false,  formatter: formatedit  },
            { key: false,hidden: true,  name: 'engarantia',  width:'200', align: 'left', sortable: false, formatter: formateditcolor },
            { key: false, name: 'ostestado',  width:'200', align: 'left', sortable: false, formatter: formateditcolor },
            { key: false, name: 'tecnicoAsignado',  align: 'center', width:'110',  sortable: false,  formatter: displayButtonsAsignacion  },
            { key: false, name: 'idordenserviciotecnico',  align: 'left', width:'110',  sortable: false,  formatter: displayButtons  }
            //{ key: false, hidden: false, editable: false ,name: 'idordenserviciotecnico', width:'140' , index: 'idordenserviciotecnico' ,  formatter:  displayButtons,classes:"grid-col"}
            
        ],
        pager: $pagergrilla,
        rowNum: 40,
        rowList: [40, 80, 120,160,200],
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
  
}
function displayButtonsAsignacion(cellvalue, options, rowObject)
{
    var editar = ''
    if(rowObject.idestado == 1)
        return '';
    if(cellvalue=='')
    {
        editar = '<div class="btn-group"><button type="button" title="Editar" class="btn btn-danger btn-xs " onclick="asignar(' + rowObject.idordenserviciotecnico  + ')"><i class="fa fa-plus"></i> Asignar </button>';
    }
    else
    {
            editar = cellvalue;
    }
   return   editar  ;
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

    let $btnAprobar = $("#btnAprobar")
    let $btnRechazar = $("#btnRechazar")
    let idordenservicio  = $("#idordenserviciotecnico").val()
    let URL_AprobarQC = UrlHelper.Action("JsonAprobarQC","Reparacion","Reparacion")

      $btnAprobar.click(function (e) { 
        e.preventDefault();
         
        $.ajax({
            url: URL_AprobarQC,
            type: 'POST',
            dataType: 'json',
            data: {idordenservicio: idordenservicio, aprobado : true },
        })
        .done(function() {
            swal("Aprobación Exitosa","La aprobación de la Orden de Servicio se dió correctamente.", "success")
            $("#modalcontainer").modal("hide")
            reload()
           
        })
        .fail(function() {
          
        })
        
        
        
        
      });
        $btnRechazar.click(function (e) { 
        e.preventDefault();
          $.ajax({
            url: URL_AprobarQC,
            type: 'POST',
            dataType: 'json',
            data: {idordenservicio: idordenservicio, aprobado : false },
        })
        .done(function() {
            swal("Operación Exitosa","La operación se ejecutó correctamente.", "success")
            reload()
            $("#modalcontainer").modal("hide")


           
        })
        .fail(function() {
          
        })
        
      });
}





function reload()
{

    var fechainicio = $("#fechainicio").val();
    var fechafin = $("#fechafin").val();
    var idestado = $("#idestado").val();
    var numeroordenservicio = $("#numeroordenservicio").val();
     var serie = $("#serie").val()

    $.jgrid.defaults.height = 520;
    $.jgrid.defaults.responsive = true;
    var vdataurl = $grilla.data("dataurl") +    "?fechainicio="  + fechainicio 
     + "&fechafin=" + fechafin + "&idestado=" + idestado + "&numeroordenservicio=" + numeroordenservicio 
        + "&serie=" + serie 

    $grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}



function buscarGuias()
{
    reloadModal()
}


function recepcionar(id)
{
    let vurl = UrlHelper.Action("RecepcionOrdenServicio","Recepcion","Recepcion") + "?id=" + id;
    window.location.href = vurl;
}
function aprobar(id){
    
    let URL_AprobarQCModal = UrlHelper.Action("AprobarQCModal","Reparacion","Reparacion") + "?idordenservicio=" + id  

    $.get(URL_AprobarQCModal, function(data) {
      $("#modalcontent").html(data)
      $("#modalcontainer").modal("show")

      inicializandoModal()
    });


}


function displayButtons(cellvalue, options, rowObject)
{
    var aprobar = "<div class='btn-group'><div class='btn-group'><button type='button' title='Editar' class='btn btn-primary btn-xs'  onclick='aprobar(" + cellvalue + ")'><i class='fa fa-check-circle-o'></i></button>";
    var ver = "<div class='btn-group'><button type='button' title='Editar' class='btn btn-primary btn-xs'  onclick='verDetalle(" + cellvalue + ")'><i class='fa fa-search'></i></button></div>";
    return   aprobar   ;
}

function verDetalle(id){
    let vurl = UrlHelper.Action("DetalleOrdenServicio","OrdenServicio","Agendamiento") + "?idordenservicio=" + id;
    window.location.href = vurl;
}

function OnCompleteTransaction(xhr, status)
{
    var jsonres = xhr.responseJSON;

    if(jsonres.res)
    {
        swal("Registro exitoso", "Se ha registrado satisfactoriamente", "success")
        $("#modalcontainer").modal("hide");
        reload()
    }
    else

    {

    }

  
    

}
