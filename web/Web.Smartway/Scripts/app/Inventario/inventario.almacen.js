const $grilla = $("#gridalmacen")
const $pagergrilla = $("#gridalmacenpager")
const $btnNuevo = $("#btnNuevo")
const $btnBuscar = $("#btnBuscar")



$(document).ready(function () {
   inicio()
})
function inicio(){
    configurarBotones()
    configurarGrilla()
}
function configurarBotones(){
    const url = UrlHelper.Action("NuevoAlmacenModal", "Mantenimiento","Mantenimiento");
   $btnNuevo.click(function(){
       $.get(url,  function (data, textStatus, jqXHR) {
               $("#modalcontent").html(data);
               $("#modalcontainer").modal('show');
               
            $("#frmNuevoAlmacen").validate(
            {

            })


           },
           "html"
       );
   })
   $btnBuscar.click(function (e){
        event.preventDefault();
        reload()

   })
}

function configurarGrilla()
{



    $.jgrid.defaults.height = 300;
    $.jgrid.defaults.responsive = true;


    let codigoalmacen = $("#codigoalmacen").val();
    let idsucursal = $("#idsucursal").val();

    var vdataurl = $grilla.data("dataurl") + 
    "?codigoalmacen="  + codigoalmacen 
    + "&idsucursal=" + idsucursal 


    $grilla.jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['','Cod. Almacén' , 'Almacén' ,'Sucursal','Tipo','Acciones' ],
        colModel:
        [
            { key: true, hidden: true, name: 'idalmacen', align: 'center' },
            { key: false, name: 'codigoalmacen',  align: 'center',  sortable: false,  formatter: formatedit  },
            { key: false, name: 'nombrealmacen',  align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'sucursal',  width:'90', align: 'center', sortable: false, formatter: formatedit },
            { key: false, name: 'tipoalmacen',  align: 'center',  sortable: false,  formatter: formatedit  },
            { key: false, hidden: false, editable: false ,name: 'idalmacen', width:'40' , index: 'idalmacen' ,  formatter:  displayButtons,classes:"grid-col"}
            
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
function reload(){
    let codigoalmacen = $("#codigoalmacen").val();
    let idsucursal = $("#idsucursal").val();

    var vdataurl = $grilla.data("dataurl") + 
    "?codigoalmacen="  + codigoalmacen 
    + "&idsucursal=" + idsucursal 
    $grilla.jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function displayButtons(cellvalue, options, rowObject)
{
    var editar = '<button type="button" title="Editar" class="btn btn-outline btn-primary btn-xs  " onclick="editar(' + cellvalue + ')"><i class="fa fa-edit"></i></button>';
    var eliminar = '<button type="button" title="Eliminar" class="btn btn-outline btn-primary btn-xs  " onclick="eliminar(' + cellvalue + ')"><i class="fa fa-trash"></i></button>';
   return  '<div class="btn-group">' + editar + eliminar + '</div>' ;
}
function editar(id){
    const url = UrlHelper.Action("EditarAlmacenModal", "Mantenimiento","Mantenimiento") +"?id=" + id
   $.get(url, 
       function (data, textStatus, jqXHR) {
           $("#modalcontent").html(data)
           $("#modalcontainer").modal('show')

           $("#frmEditarAlmacen").validate(
            {

            })

       },
       "HTML"
   );

}
function eliminar(id){
    const url = UrlHelper.Action("EliminarAlmacen", "Mantenimiento","Mantenimiento") +"?id=" + id

    swal({
        title: "Eliminar almacén",
        text: "¿Está seguro que desea eliminar este registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        closeOnConfirm: true,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "JSON",
                    success: function (response) {
                        if(response.res){
                            swal("¡Se eliminó correctamente!", "El registro se ha eliminado correctamente","success" )
                            reload()
                        }
                        else{
                            swal({ title: "Error", text: data.msj , type: "error", confirmButtonText: "Aceptar" });
                        }
                    },
                    error: function (data) {
                        alert(data.Errors.toString());
                    }
                });
            }
      })
   



}
function OnCompleteTransaction(xhr, status){
    var jsonres = xhr.responseJSON;
    if (jsonres.res == true){
        swal({
            title: "Registro Completo",
            text: "Se ha registrado correctamente.",
            type: "success"
        },
        function (){
             reload()
             $("#modalcontainer").modal('hide')
        });
    }
    else{
        sweetAlert("Verificar Errores", null, "error");
        CheckValidationErrorResponse(jsonres);
    }


}