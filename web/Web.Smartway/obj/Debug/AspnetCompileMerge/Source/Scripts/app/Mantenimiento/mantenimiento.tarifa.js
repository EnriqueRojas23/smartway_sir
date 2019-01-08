const $btnNuevo = $("#btnNuevo");
const $grilla = $("#gridtarifa");
const $pagergrilla = $("#gridtarifapager");
const $btnBuscar = $("#btnBuscar");
const $addrow =  $("#addrow") ;

var fcnUrlControlGrid = function (str , id)
{
    var urlprincipal = UrlHelper.Action("GetControlDetailsGrid", "Mantenimiento" , "Mantenimiento" ) 
    return urlprincipal + "?control=" + str + "&id=" + id ;
};


$(document).ready(function () {
  inicio()
});


function inicio()
{
    configurarChosenSelected()
    configurarBotones()
    configurarGrilla()

}
function configurarBotones()
{
    
 $btnBuscar.click(function (e) { reload();  });
 $addrow.click( function() { configurarAddrow();});
}

function configurarAddrow()
{
    var id =  $('#idPartnerSeleccionada').val()
    if(id=='')
    {
            sweetAlert( "Agregar Garantia" ,"Debe seleccionar un partner", "warning");
            return;
    }
    else
    {
        $grilla.jqGrid('addRowData',0,1,"first");
        $grilla.editRow(0,true);
    }
}
function configurarChosenSelected(id)
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
function reload()
{
    var id =  $('#idpartner').val()
    var vdataurl = $grilla.data("dataurl")  + "?id=" + id ;
    $grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function configurarGrilla()
{
    $.jgrid.defaults.width = 1200;
    $.jgrid.defaults.height = 400;

    var id =  $('#idpartner').val()
    
    var vdataurl = $grilla.data("dataurl")  + "?id=" + id ;
    var vdataedit = $grilla.data("editurl");

    $grilla.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'Get',
        colNames: ['', 'Tipo Tarifa','Tipo Producto', 'Garantia' ,'Moneda', 'Nivel Reparación', 'Costo','Acciones'],
        colModel:
        [
            { key: true, hidden: true, name: 'idtarifa', index: 'idtarifa' ,classes:"grid-col"},
            { key: false, hidden: false, editable: true ,name: 'tipotarifa'
                    , index: 'tipotarifa', width: '190px',editrules: { required: true}, align: 'center'
                    , classes:"grid-col",formatter: formatedit
                    , edittype: "select"
                    , editoptions: { dataUrl: fcnUrlControlGrid('tipotarifa')}
            },
             { key: false, hidden: false, editable: true ,name: 'tipoproducto'
                    , index: 'tipoproducto', width: '140px', align: 'left'
                    , classes:"grid-col",formatter: formatedit
                    , edittype: "select"
                    , editoptions: { dataUrl: fcnUrlControlGrid('tipoproducto')}
            },
            { key: false, hidden: false, editable: true ,name: 'garantia'
                    , index: 'garantia', width: '130px', align: 'left'
                    , classes:"grid-col",formatter: semaforo
                    , edittype: "select"
                    , editoptions: { dataUrl: fcnUrlControlGrid('condiciongarantia')}
            },

            { key: false, hidden: false, editable: true ,name: 'moneda'
                    , index: 'moneda', width: '100px', align: 'left'
                    , classes:"grid-col",formatter: formatedit
                    , edittype: "select"
                    , editoptions: { dataUrl: fcnUrlControlGrid('moneda')}
             },
             { key: false, hidden: false, editable: true ,name: 'nivelreparacion'
             , index: 'nivelreparacion', width: '100px', align: 'left'
             , classes:"grid-col",formatter: formatedit
             , edittype: "select"
             , editoptions: { dataUrl: fcnUrlControlGrid('nivelreparacion')}
      },
             { key :false , hidden:false, editable: true , name :'costo' 
               , index : 'costo', formatter: formatedit 
               ,editoptions:{
                dataInit: function(element) {
                 $(element).keypress(function(e){
                           var resp =  SoloNumerico(e);
                           if(resp == false)
                            return false;
                          else return true;

                    });
                  }
                }
             },

         { key: false, hidden: false, editable: false ,name: 'idtarifa', width:'140' , index: 'idtarifa' ,  formatter:  displayButtons,classes:"grid-col"}
        ],
        pager: $pagergrilla,
        rowNum: 40,
        rowList: [40, 60, 80, 100],
        emptyrecords: 'No se encontraron registros',
        autowidth: true,
        viewrecords: true,
        autoheight: true,
        editable:true,
        shrinkToFit: true,
        addParams: {
            position: "last",
            addRowParams: editOptionsNew
            },
        editParams: editOptionsNew,
        editurl: vdataedit,
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
        var duplicar = '<button type="button" class="btn btn-warning btn-xs btn-outline" onclick="irduplicar(' + cellvalue + ')"><i class="fa fa-copy"></i></button>';
        var editar = "<button type='button' title='Editar' class='btn btn-success btn-xs btn-outline' onclick=\"$grilla.editRow('" + options.rowId + "')\";><i class='fa fa-edit'></i> </button>";
        var guardar = "<button type='button' title='Guardar' class='btn btn-danger btn-xs btn-outline' onclick=\"$grilla.saveRow('" + options.rowId + "') ;      reload();         \";><i class='fa fa-save'></i> </button>";
        var control = '<button type="button" class="btn btn-warning btn-xs btn-outline" onclick="irEliminar(' + cellvalue + ')"><i class="fa fa-trash"></i></button>';
        var restore = "<button type='button' title='Cancelar' class='btn btn-danger btn-xs btn-outline' onclick=\"$grilla.restoreRow('" + options.rowId + "'); reload(); \"><i class='fa fa-times-circle'></i> </button>";

        return  duplicar + editar + guardar + control + restore;
}
var editOptionsNew = {
        keys: true,
        successfunc: function () {
            var $self = $(this);
            setTimeout(function () {
                $self.trigger("reloadGrid");
            }, 50);
        }
    };


function irEliminar(id)
{
   var url = UrlHelper.Action("EliminarTarifa", "Seguimiento", "Seguimiento");
    swal({
        title: "Eliminar Tarifa",
        text: "¿Está seguro que desea eliminar esta tarifa?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Eliminar',
        closeOnConfirm: false,
        closeOnCancel: true
    },
      function (isConfirm) {
           if (isConfirm) {
   $.ajax(
               {
                   type: "POST",
                   async: true,
                   url: url ,
                   data: { "id": id },
                   success: function (data) {
                    reload();
                    swal("¡Se ha eliminado correctamente!", data.msj, "success");

                   },
                   error: function (request, status, error)
                   {
                       swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                   }
               });
          }
     });

}

function irCopiar()
{

    var idcliente =  $("#idclientecopia").val();
    var idoriginal =  $("#idcliente").val();


   var url = UrlHelper.Action("CopiarTarifa", "Seguimiento", "Seguimiento");
    swal({
        title: "Copiar Tarifa",
        text: "¿Está seguro que desea copiar esta tarifa?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Copiar',
        closeOnConfirm: false,
        closeOnCancel: true
    },
      function (isConfirm) {
           if (isConfirm) {
   $.ajax(
               {
                   type: "POST",
                   async: true,
                   url: url ,
                   data: {  "id": idcliente, "idoriginal": idoriginal},
                   success: function (data) {
                       reload();
                       swal("¡Se ha copiado correctamente!", data.msj, "success");

                   },
                   error: function (request, status, error)
                   {
                       swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                   }
               });
          }
     });

}

function validateFloatKeyPress(el, evt)
{

   var charCode = (evt.which) ? evt.which : event.keyCode;

    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }

    if (charCode == 46 && el.value.indexOf(".") !== -1) {
        return false;
    }

    if (el.value.indexOf(".") !== -1)
    {
        var range = document.selection.createRange();

        if (range.text != ""){
        }
        else
        {
            var number = el.value.split('.');
            if (number.length == 2 && number[1].length > 1)
                return false;
        }
    }

    return true;
}

function irduplicar(id)
{
     var idcliente =  $("#idcliente").val();
     var url = UrlHelper.Action("CopiarTarifaIndividual", "Seguimiento", "Seguimiento");
     $.ajax(
                   {
                       type: "POST",
                       async: true,
                       url: url ,
                       data: {  "id": id},
                       success: function (data) {
                           reload();
                           swal("¡Se ha duplicado correctamente!", data.msj, "success");
                       },
                       error: function (request, status, error)
                       {
                           swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                       }
                   });
 }
