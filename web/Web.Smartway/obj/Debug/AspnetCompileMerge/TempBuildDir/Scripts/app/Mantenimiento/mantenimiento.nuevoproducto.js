
$btnCancelar = $("#btnCancelar")


$(document).ready(function () {
//  $("html, body").animate({ scrollTop: "100px" });
 inicio()

  $("#frmProducto").validate({
    ignore: '*:not([name])', //Fixes your name issue
    rules : {
        codigoproducto : {
            required : true,
            minlength: 3,
        },
        idtipomercaderia: "required",
        idtipoproducto: "required",
        idfabricante: "required",
        descripcioncorta : "required",
        descripcionlarga : "required",
        idfamilia : "required",
        idmodelo : "required",
        stockMaximo : { 
            required : true,
            
        },
        stockMinimo : "required"

    },     
    invalidHandler: function(form, validator) {
        var errors = validator.numberOfInvalids();
        if(errors > 0)
        {
          if(validator.errorList[0].element.id == 'stockMaximo'||validator.errorList[0].element.id == 'stockMinimo' ){
             swal("Complete los datos", "Existen datos en otras pestañas que debe ingresar", "warning");
           }
           validator.errorList[0].element.focus();
        }
    } , 
    errorPlacement: function (error, element) {
        element.next().after(error);
        //check whether chosen plugin is initialized for the element
        if (element.data().chosen) { //or if (element.next().hasClass('chosen-container')) {
            element.next().after(error);
        } else {
            element.after(error);
        }
    },
      

  });

});




function OnCompleteTransaction(xhr, status)
{
    var jsonres = xhr.responseJSON;

    if (jsonres.res == true)
    {
       swal({
           title: "Registro Exitoso",
           text: "Se registró correctamente el dato.",
           type: "success"
        },
       function ()
       {
         const url = UrlHelper.Action("Producto", "Producto", "Mantenimiento")
         window.location.href = url;
       });

    }
    else
    {
        sweetAlert("Verificar Errores", null, "error");
    }

}
function inicio()
{
    configurarBotones()
}
function configurarBotones(){
    $btnCancelar.click(function (event) {  
        let url = UrlHelper.Action("Producto","Producto","Mantenimiento")
        window.location.href =  url

    } )
}