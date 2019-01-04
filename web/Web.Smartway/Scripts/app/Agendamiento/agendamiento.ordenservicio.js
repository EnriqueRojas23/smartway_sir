const $grilla = $("#gridordenes")
const $pagergrilla = $("#gridordenespager")
const $btnImprimir = $("#btnImprimir")
const $btnEntregar = $("#btnEntregar")
const $btnEntregarDelivery = $("#btnEntregarDelivery")


const $btnRegresar = $("#btnRegresar")
const $btnBuscar = $("#btnBuscar")
const $btnImprimirsalida = $("#btnImprimirSalida")

$(document).ready(function (){
   inicio()
})
function inicio(){

    configurarControles()
    configurarGrilla()
    configurarGrillaCotizacion()
}

function configurarControles() {
    


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
    $btnImprimir.click(function(){
        var url = "http://104.36.166.65/repsw/ot.aspx?idordenservicio=" + $("#idordenserviciotecnico").val() ;
        window.open(url);
    }) 
    $btnImprimirsalida.click(function(){
        var url = "http://104.36.166.65/repsw/otsalida.aspx?idordenservicio=" + $("#idordenserviciotecnico").val() ;
        window.open(url);
    }) 

     $btnEntregarDelivery.click(function(event) {
          btnEntregar_click()
     });


     $btnEntregar.click(function(event) {
              btnEntregar_click()


    });

     $btnBuscar.click(function(event) {
        reload()
     });

     $btnRegresar.click(function(event) {
        let vurl = UrlHelper.Action("SeguimientoOrdenes", "OrdenServicio", "Agendamiento")
        window.location.href = vurl;
     });


}
function reload(){


      let idtipoordenservicio = $("#idtipoordenservicio").val();
    let fechahorainicio = $("#fechahorainicio").val();
    let fechahorafin = $("#fechahorafin").val();
    let numeroordenservicio = $("#numeroordenservicio").val();
        let idestado = $("#idestado").val();

    var vdataurl = $grilla.data("dataurl") + 
     "?idtipoordenservicio="  + idtipoordenservicio 
     + "&idestado="  + idestado 
     + "&fechainicio=" + fechahorainicio 
     + "&fechafin=" + fechahorafin 
     + "&numeroordenservicio=" + numeroordenservicio 


    
    $grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function configurarGrilla()
{
    let idtipoordenservicio = $("#idtipoordenservicio").val();
    let fechahorainicio = $("#fechahorainicio").val();
    let fechahorafin = $("#fechahorafin").val();
    let numeroordenservicio = $("#numeroordenservicio").val();
    let idestado = $("#idestado").val();





    $.jgrid.defaults.height = 320;
    $.jgrid.defaults.responsive = true;
    var vdataurl = $grilla.data("dataurl") + 
     "?idtipoordenservicio="  + idtipoordenservicio 
     + "&idestado="  + idestado 
     + "&fechainicio=" + fechahorainicio 
     + "&fechafin=" + fechahorafin 
     + "&numeroordenservicio=" + numeroordenservicio 


    $grilla.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['','N° OST' ,'Tipo OS', 'N° Doc.', 'Cliente' 
        , 'Suc. Origen','Suc. Destino', 'Cod.', 'Producto', 'Estado','Acciones' ],
        colModel:
        [
            { key: true, hidden: true, name: 'idordenserviciotecnico', align: 'center' },
            { key: false, name: 'numeroost', width:'90', align: 'center',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'tipoordenservicio',width:'50',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'numerodocumento',  width:'90', align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'nombrecliente',  width:'150', align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'sucursalorigen',  align: 'center', width:'90',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'sucursaldestino',  align: 'center', width:'90',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'codigoproducto',  align: 'center', width:'70',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'producto',  align: 'center', width:'210',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'estado',  align: 'center', width:'210',  sortable: false,  formatter: formateditcolor  },
            { key: false, name: 'idordenserviciotecnico',  align: 'center', width:'110',  sortable: false,  formatter: displayButtons  },
            //{ key: false, hidden: false, editable: false ,name: 'idordenserviciotecnico', width:'140' , index: 'idordenserviciotecnico' ,  formatter:  displayButtons,classes:"grid-col"}
            
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
    var editar = '<div class="btn-group"><button type="button" title="Editar" class="btn btn-primary btn-xs " onclick="verDetalle(' + cellvalue + ')"><i class="fa fa-search"></i> Atender </button>';
    return   editar  ;
}
function verDetalle(id){
    let vurl = UrlHelper.Action("DetalleOrdenServicio","OrdenServicio","Agendamiento") + "?idordenservicio=" + id;
    window.location.href = vurl;
}

function configurarGrillaCotizacion()
{

    var $grillaCotizacion = $("#griddetalle")
    var $griddetallepager = $("#griddetallepager")

   

 
    $.jgrid.defaults.height = 120;
    $.jgrid.defaults.responsive = true;
    var vdataurl = $grillaCotizacion.data("dataurl") + "?idordenservicio=" + $("#idordenserviciotecnico").val();
    //'✓'
    $grillaCotizacion.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['','Descripción','Diagnostico' , 'Reparación' ,'Repuestos','Costo'],
        colModel:
        [
            { key: true, hidden: true, name: 'idcotizaciondetalle', align: 'center' },
            { key: false, name: 'descripcion', width:'140',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'diagnostico', width:'200',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'reparacion',  align: 'center', width:'200', sortable: false,  formatter: formatedit  },
            { key: false, name: 'repuesto',  align: 'center', width:'200', sortable: false,  formatter: formatedit  },
            { key: false, name: 'costototal', align: 'center',width:'190',sortable: false, formatter: 'currency' ,formatoptions: CONFIG_JQGRID.get('formatoptions_currency_pen') },
            // { key: false, hidden: false, editable: false ,name: 'index', width:'140' , index: 'index' ,  formatter:  displayButtons,classes:"grid-col"}
        ],
        pager: $griddetallepager,
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

function Aprobar()
{

    let idcotizacion = $("#idcotizacion").val()
    let idordenservicio = $("#idordenserviciotecnico").val()

    let url = UrlHelper.Action("AprobarDesaprobarCotizacion","OrdenServicio","Agendamiento")
 swal({
        title: "Aprobar Cotización",
        text: "¿Está seguro que desea aprobar la cotización? ",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Aprobar',
        closeOnConfirm: true,
        closeOnCancel: true
    },
     function (isConfirm) {
           if (isConfirm) {
    jQuery.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: { "idcotizacion" : idcotizacion , "estado": "aprobado" , "idordenservicio" : idordenservicio },
      success: function(data, textStatus, xhr) {
        if(data.res){
          swal("Cotización aprobada","La cotización fue aprobada por el usuario","success")
          let vurl = UrlHelper.Action("SeguimientoOrdenes","OrdenServicio","Agendamiento")
          window.location.href = vurl;
        }
        else{
            alert(data.res)
        }


      },
      error: function(xhr, textStatus, errorThrown) {
        //called when there is an error
      }

        
    });
  }});
}

function Rechazar()
{

    let idcotizacion = $("#idcotizacion").val()

    let url = UrlHelper.Action("AprobarDesaprobarCotizacion","OrdenServicio","Agendamiento")
 swal({
        title: "Rechazar Cotización",
        text: "¿Está seguro que desea guardar la cotización? ",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Rechazar',
        closeOnConfirm: true,
        closeOnCancel: true
    },
     function (isConfirm) {
           if (isConfirm) {

    jQuery.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: { "idcotizacion" : idcotizacion , "estado": "rechazado" , "idordenservicio" : idordenservicio },
      success: function(data, textStatus, xhr) {
        if(data.res){
            swal("Cotización no aprobada","La cotización fue rechazada por el usuario","success")
            let vurl = UrlHelper.Action("SeguimientoOrdenes","OrdenServicio","Agendamiento")
            window.location.href = vurl;
        }
        else{
             alert(data.res)
        }


      },
      error: function(xhr, textStatus, errorThrown) {
        //called when there is an error
      }

        
    });
  } 
 });

}
function btnEntregar_click(){
        let vurl = UrlHelper.Action("EntregarAlCliente","OrdenServicio","Agendamiento")
        swal({
        title: "Entregar al cliente",
        text: "¿Está seguro que desea entregar el producto al cliente? ",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Entregar',
        closeOnConfirm: true,
        closeOnCancel: true
    },
     function (isConfirm) {
           if (isConfirm) {

    $.ajax({
        type: "POST",
        url: vurl,
        data: {
            "idordenservicio" : $("#idordenserviciotecnico").val()
        },
        dataType: "JSON",
        success: function (data) {
            if(data.res)
            {
                swal("Entrega al cliente","El producto fue entregado al cliente con éxito", "success");
                let vurl = UrlHelper.Action("SeguimientoOrdenes","OrdenServicio","Agendamiento") 
                window.location.href = vurl;
            }
          }
              });
        }
     });
}