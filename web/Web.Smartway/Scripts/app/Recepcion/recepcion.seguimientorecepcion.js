const $grilla = $("#gridordenes")
const $grilladetalle = $("#gridordenesdetalle")



const $pagergrilla = $("#gridordenespager")
const $pagergrilladetalle = $("#gridordenesdetallepager")
const $btnImprimir = $("#btnImprimir")
const $btnEntregar = $("#btnEntregar")
const $btnRegresar = $("#btnRegresar")
const $btnBuscar = $("#btnBuscar")

$(document).ready(function (){
   inicio()
})
function inicio() {

    configurarControles()
    configurarGrilla()
    configurarGrillaDetalle()
    configurarGrillaCotizacion()
}

function configurarControles(){
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

     $btnEntregar.click(function(event) {
             
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
        data: {"idordenservicio" : $("#idordenserviciotecnico").val()
       } ,
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

    debugger;    

    var vdataurl = $grilla.data("dataurl") + 
      "?fechahorainicio=" + fechahorainicio 
     + "&fechahorafin=" + fechahorafin 
     + "&numeroordenservicio=" + numeroordenservicio 


    
    $grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function configurarGrilla()
{
    let idtipoordenservicio = $("#idtipoordenservicio").val();
    let fechahorainicio = $("#fechahorainicio").val();
    let fechahorafin = $("#fechahorafin").val();
    let numeroordenservicio = $("#numeroordenservicio").val();

  

    $.jgrid.defaults.height = 320;
    $.jgrid.defaults.responsive = true;


    var vdataurl = $grilla.data("dataurl") + 
       "?fechahorainicio=" + fechahorainicio 
     + "&fechahorafin=" + fechahorafin 
     + "&numeroordenservicio=" + numeroordenservicio 


     


    $grilla.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['','N° Recepción' ,'Tipo Recibo',  'DUA' 
        , 'N° Factura','F. Factura', 'GR', 'Partner', 'Fabricante','F. Recepción','Acciones' ],
        colModel:
        [
            { key: true, hidden: true, name: 'iddocumentorecepcion', align: 'center' },
            { key: false, name: 'numerodocumento',width:'50',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'TipoRecibo', width:'90', align: 'center',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'dua',  width:'50', align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'numerofacturacomercial',  align: 'center', width:'90',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'fechafacturacomercial',  width:'90' ,align: 'center', sortable: true, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' } },
            { key: false, name: 'guiaremision',  align: 'center', width:'70',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'partner',  align: 'center', width:'80',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'fabricante',  align: 'center', width:'80',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'fechahorarecepcion',   width:'90' ,align: 'center', sortable: true, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' } },
            { key: false, name: 'iddocumentorecepcion',  align: 'center', width:'40',  sortable: false,  formatter: displayButtons  },
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
    var editar = '<div class="btn-group"><button type="button" title="Editar" class="btn btn-primary btn-xs " onclick="verDetalle(' + cellvalue + ')"><i class="fa fa-search"></i>  </button>';
    return   editar  ;
}
function verDetalle(id){
    $("html, body").animate({ scrollTop: "900px" });


    var vdataurl = $grilladetalle.data("dataurl") + "?iddocumentorecepcion=" + id ;
    $grilladetalle.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function configurarGrillaDetalle()
{


    $.jgrid.defaults.height = 320;
    $.jgrid.defaults.responsive = true;

    var vdataurl = $grilladetalle.data("dataurl") + "?iddocumentorecepcion=" + 0;    

    console.log(vdataurl);

    $grilladetalle.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['','Código' ,'Producto',  'Modelo', 'Tipo'  ,'Serie' , 'IMEI' , 'Mac', 'Cantidad', 'N° Pallet' , 'Caja' , 'Fila'  ],
        colModel:
        [
            { key: true, hidden: true, name: '', align: 'center' },
            { key: false, name: 'codigoproducto',width:'100',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'descripcionlarga', width:'100', align: 'center',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'modelo',  align: 'center', width:'40',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'Tipo',  align: 'center', width:'40',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'serie',  width:'100', align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'imei',  align: 'center', width:'90',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'mac',  width:'90' ,align: 'center', sortable: true, formatter: formatedit },
            { key: false, name: 'cantidad',  align: 'center', width:'60',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'numeropallet',  align: 'center', width:'80',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'caja',  align: 'center', width:'80',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'fila',   width:'40' ,align: 'center', sortable: true, formatter: formatedit },
        ],
        pager: $pagergrilladetalle,
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
