$(document).ready(function () {
    //este onchange cambia el ListBox de las tiendas
    $("#ddlListadoProveedores").change(function (event) {
        ddlListadoProveedores_onChange(this, event)
    });


});



//function Asignar_Motorizado()
//{
//    var id = $("#lstListaMotorizado").val();
//    var ida = $("#IdPedido").val();
//    var vUrl = "/Pedido/AsignarMotorizado" + "?id=" + id + "&ida=" + ida;
//    $(window).attr("location", vUrl);
//}

function OnCompleteTransaction(xhr, status) {

var grilla = $("#gridproductostransferir");
$(grilla).jqGrid().trigger('reloadGrid');
//cerrando modal 
$("#modalcontainer").modal("hide");
}
