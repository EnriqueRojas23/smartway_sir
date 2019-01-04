




producto = { "selecciones": [{ "x": 0, "y": 0, "width": 0, "height": 0, "tipo": "0" , "parte" : "" } ]};
const canvasdelantera = document.getElementById('iddelantera');
const ctx_delantera = canvasdelantera.getContext('2d');


const canvasposterior = document.getElementById('idposterior');
const ctx_posterior = canvasposterior.getContext('2d');


const canvasinferior = document.getElementById('idinferior');
const ctx_inferior = canvasinferior.getContext('2d');

const canvassuperior = document.getElementById('idsuperior');
const ctx_superior = canvassuperior.getContext('2d');

const canvasizquierda = document.getElementById('idizquierda');
const ctx_izquierda = canvasizquierda.getContext('2d');

const canvasderecha = document.getElementById('idderecha');
const ctx_derecha = canvasderecha.getContext('2d');






var rect = {};
var drag = false;

var imageObj1 = null;
var imageObj2 = null;
var imageObj3 = null;
var imageObj4 = null;
var imageObj5 = null;
var imageObj6 = null;

var tipo = "";

$(document).ready(function () {
    inicio();
    
    //$("#MenuEstadoFisico").children().css( "font-weight", "bold" );
     
    $("#MenuEstadoFisico").children().html("")
    $("#MenuEstadoFisico").children().append("<span class='label label-danger'>Estado Físico</span>")

    

});
function inicio()
{
   
    configDivs();
    initTiles();
    
       var dlbAccesoriosODS = $('select[name="AccesoriosSeleccionados"]').bootstrapDualListbox({

                          nonSelectedListLabel: 'Disponibles',
                          selectedListLabel: 'Seleccionados',
                          showFilterInputs: true,
                          moveOnSelect: true,


                      });
    

                      $.fn.animateProgressBar = function () {
                        return this.each(function () {
                            var $bar = $(this);
                            setTimeout(function(){
                                $bar.css('width', $bar.data('width'));
                            }, 0)
                        })
                    };
                
                    $('.js-progress-animate').animateProgressBar();
   

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

function configDivs(){
  

      
      if( $("#idordenserviciotecnico").val() != '' ){
         // $("#botonera").css("visibility" , "hidden")
         // $("#btnguardar").css("visibility" , "hidden")
      }
      else
      {
        $(window).scroll(function(){
            $("#botonera").stop().animate({"marginTop": ($(window).scrollTop()) + "px", "marginLeft":($(window).scrollLeft()) + "px"}, "slow" );
          });

      }
        

    configDelantera()
    configPosterior()

    configDerecho()
    configIzquierdo()

    configSuperior()
    configInferior()

}

function configInferior() {

    imageObj6 = new Image();
    imageObj6.onload = function () { ctx_inferior.drawImage(imageObj6, 0, 0); };
    imageObj6.src = "/Images/Inferior.png"  

    if( $("#idordenserviciotecnico").val() != '' )
    imageObj6.src = "/Images/" + $("#idincidencia").val() + "/Inferior.png"  
    else 
    imageObj6.src = "/Images/Inferior.png"


    canvasinferior.addEventListener('mousedown', mouseDowninferior, false);
    canvasinferior.addEventListener('mouseup', mouseUpinferior, false);
    canvasinferior.addEventListener('mousemove', mouseMoveinferior, false);
}
function configSuperior(){
    imageObj5 = new Image();
    imageObj5.onload = function () { ctx_superior.drawImage(imageObj5, 0, 0); };

    if( $("#idordenserviciotecnico").val() != '' )
    imageObj5.src = "/Images/" + $("#idincidencia").val() + "/Superior.png"  
    else 
    imageObj5.src = "/Images/Superior.png"
    canvassuperior.addEventListener('mousedown', mouseDownsuperior , false);
    canvassuperior.addEventListener('mouseup', mouseUpsuperior, false);
    canvassuperior.addEventListener('mousemove', mouseMovesuperior, false);
 
}
function configIzquierdo(){
    imageObj4 = new Image();
    imageObj4.onload = function () { ctx_izquierda.drawImage(imageObj4, 0, 0); };

    if( $("#idordenserviciotecnico").val() != '' )
    imageObj4.src = "/Images/" + $("#idincidencia").val() + "/LateralIzquierdo.png"  
    else 
    imageObj4.src = "/Images/LateralIzquierdo.png"

    canvasizquierda.addEventListener('mousedown', mouseDownizquierda, false);
    canvasizquierda.addEventListener('mouseup', mouseUpizquierda, false);
    canvasizquierda.addEventListener('mousemove', mouseMoveizquierda, false);
}
function configDerecho(){
    imageObj3 = new Image();
    imageObj3.onload = function () { ctx_derecha.drawImage(imageObj3, 0, 0); };

    if( $("#idordenserviciotecnico").val() != '' )
    imageObj3.src = "/Images/" + $("#idincidencia").val() + "/LateralDerecho.png"  
    else 
    imageObj3.src = "/Images/LateralDerecho.png"

    canvasderecha.addEventListener('mousedown', mouseDownderecha, false);
    canvasderecha.addEventListener('mouseup', mouseUpderecha, false);
    canvasderecha.addEventListener('mousemove', mouseMovederecha, false);
}


function configPosterior(){
    imageObj2 = new Image();
    imageObj2.onload = function () { ctx_posterior.drawImage(imageObj2, 0, 0); };

    if( $("#idordenserviciotecnico").val() != '' )
    imageObj2.src = "/Images/" + $("#idincidencia").val() + "/Posterior.png"  
    else 
    imageObj2.src = "/Images/Posterior.png"  

    canvasposterior.addEventListener('mousedown', mouseDownposterior, false);
    canvasposterior.addEventListener('mouseup', mouseUpposterior, false);
    canvasposterior.addEventListener('mousemove', mouseMoveposterior, false);

}
function configDelantera(){
    imageObj1 = new Image();
    imageObj1.onload = function () { ctx_delantera.drawImage(imageObj1, 0, 0); };
    if( $("#idordenserviciotecnico").val() != '' )
    imageObj1.src = "/Images/" + $("#idincidencia").val() + "/Delantera.png"  
    else 
    imageObj1.src = "/Images/Delantera.png"  
    canvasdelantera.addEventListener('mousedown', mouseDown, false);
    canvasdelantera.addEventListener('mouseup', mouseUp, false);
    canvasdelantera.addEventListener('mousemove', mouseMove, false);
}




function Registrar()
{
    var  data = $("form").serialize()
    let id = $("#idincidencia").val();
    let reparado = $("#reparadoensucursal").val()


    if(reparado == 'False'){
        let idsucursalreparacion = $("#idsucursalreparacion").val()
        if(idsucursalreparacion  == ""){
        swal("No puede continuar","Su sucursal no cuenta con servicio de reparación, debe seleccionar una sucursal distinta", "warning")
        return
        }
    }

    swal({
        title: "Registrar Estado Físico",
        text: "¿Está seguro que desea guardar el estado físico? ",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Guardar',
        closeOnConfirm: true,
        closeOnCancel: true
    },
     function (isConfirm) {
           if (isConfirm) {

            var Pic = document.getElementById("iddelantera").toDataURL("image/png");
            Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "")
 
 
            var Pic2 = document.getElementById("idposterior").toDataURL("image/png");
            Pic2 = Pic2.replace(/^data:image\/(png|jpg);base64,/, "")
 
            var Pic3 = document.getElementById("idderecha").toDataURL("image/png");
            Pic3 = Pic3.replace(/^data:image\/(png|jpg);base64,/, "")
 
            var Pic4 = document.getElementById("idizquierda").toDataURL("image/png");
            Pic4 = Pic4.replace(/^data:image\/(png|jpg);base64,/, "")
 
            var Pic5 = document.getElementById("idsuperior").toDataURL("image/png");
            Pic5 = Pic5.replace(/^data:image\/(png|jpg);base64,/, "")
 
            var Pic6 = document.getElementById("idinferior").toDataURL("image/png");
            Pic6 = Pic6.replace(/^data:image\/(png|jpg);base64,/, "")
    
            var url2 = UrlHelper.Action("SaveImage","Agendamiento","Agendamiento")
            $.ajax({
                type: 'POST',
                url:url2,
                data: '{ "id": "'+ id +'" , "imageData" : "' + Pic + '" , "imageData2" : "' + Pic2 + '" , "imageData3" : "'
                 + Pic3 + '" , "imageData4" : "' + Pic4 + '" , "imageData5" : "' + Pic5 + '", "imageData6" : "' + Pic6 + '"}',
                //data: { imageData :  Pic , idincidencia : $("#idincicencia").val() },
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (msg) {
                
                 
                }
            });


    
       let vurl = UrlHelper.Action("RegistrarEstadoFisico","Agendamiento","Agendamiento")
      $.ajax({
        type: "POST",
        url: vurl,
        data: data,
        dataType: "JSON",
        success: function (response) {
            if(response.res){ 
                let url = "http://104.36.166.65/repsw/ot.aspx?idordenservicio=" + String(response.idordenservicio);
                let vurl = UrlHelper.Action("SeguimientoIncidencias","Agendamiento","Agendamiento")

                swal("Registro exitoso.", "Se ha generado la OST : " + response.numeroordenservicio , "success")
            

                setInterval(function() {                
                 window.open(url);
                 window.location.href = vurl
                }, 3000)

                

            }
        }
    });


           
           
       

           
        }
    });

}





function definirtipo(tipo)
{
    this.tipo = tipo
}

//#region Delantera

function mouseDown(e) {
    if(tipo=='')
    {
        swal("Estado Físico", "Debe seleccionar un tipo de daño en el bloque paint, para poder señalarla en el equipo.")
        return 
    }
    let xy = $("#iddelantera").offset()
    rect.startX = e.pageX - xy.left;
    rect.startY = e.pageY - xy.top;
    drag = true;
}
function mouseUp() {
    if (rect.w > 11 && rect.h > 11) {
        ctx_delantera.strokeStyle = 'blue';
        ctx_delantera.font = "18pt Arial"
        ctx_delantera.fillText(tipo, rect.startX, rect.startY + 20)
    }
    drag = false;
    agregarSeleccion(rect.startX, rect.startY, rect.w, rect.h, 'delantera')
    dibujar();
}
function dibujar() {
    ctx_delantera.clearRect(0, 0, 500, 500);
    ctx_delantera.drawImage(imageObj1, 0, 0);
    for (var i = 1; i < producto.selecciones.length; i++) {
        if(producto.selecciones[i].parte == 'delantera' ){
        ctx_delantera.strokeStyle = 'blue';
        ctx_delantera.strokeRect(producto.selecciones[i].x, producto.selecciones[i].y, producto.selecciones[i].w, producto.selecciones[i].h);
        ctx_delantera.font = "12pt Arial"
        ctx_delantera.fillText(producto.selecciones[i].tipo, producto.selecciones[i].x, producto.selecciones[i].y + 20)
        }
    }
}
function mouseMove(e) {
    if (drag) {
        let xy = $("#iddelantera").offset()
        ctx_delantera.clearRect(0, 0, 500, 500);
        ctx_delantera.drawImage(imageObj1, 0, 0);
        //redibujar
        rect.w = (e.pageX - xy.left ) - rect.startX
        rect.h = (e.pageY - xy.top) - rect.startY
        ctx_delantera.strokeStyle = 'red';
        ctx_delantera.strokeRect(rect.startX, rect.startY, rect.w, rect.h)
    }
}

function agregarSeleccion(x,y,w,h,parte)
{
    var nuevo = {
        x: x,
        y: y,
        w: w,
        h: h,
        tipo:tipo,
        parte:parte
    }
    producto.selecciones.push(nuevo)
}
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function mouseDownposterior(e) {
    if(tipo=='')
    {
        swal("Estado Físico", "Debe seleccionar un tipo de daño en el bloque paint, para poder señalarla en el equipo.")
        return 
    }
    let xy = $("#idposterior").offset()
    rect.startX = e.pageX - xy.left;
    rect.startY = e.pageY - xy.top;
    drag = true;
}
function mouseUpposterior() {
    if (rect.w > 11 && rect.h > 11) {
        ctx_posterior.strokeStyle = 'blue';
        ctx_posterior.font = "18pt Arial"
        ctx_posterior.fillText(tipo, rect.startX, rect.startY + 20)
    }
    drag = false;
    agregarSeleccion(rect.startX, rect.startY, rect.w, rect.h, 'posterior')
    dibujarposterior();
}
function dibujarposterior() {
    ctx_posterior.clearRect(0, 0, 500, 500);
    ctx_posterior.drawImage(imageObj2, 0, 0);
    for (var i = 1; i < producto.selecciones.length; i++) {
        if(producto.selecciones[i].parte == 'posterior' ){
        ctx_posterior.strokeStyle = 'blue';
        ctx_posterior.strokeRect(producto.selecciones[i].x, producto.selecciones[i].y, producto.selecciones[i].w, producto.selecciones[i].h);
        ctx_posterior.font = "12pt Arial"
        ctx_posterior.fillText(producto.selecciones[i].tipo, producto.selecciones[i].x, producto.selecciones[i].y + 20)
        }
    }
}
function mouseMoveposterior(e) {
    if (drag) {
        let xy = $("#idposterior").offset()
        ctx_posterior.clearRect(0, 0, 500, 500);
        ctx_posterior.drawImage(imageObj2, 0, 0);
        //redibujar
        rect.w = (e.pageX - xy.left ) - rect.startX
        rect.h = (e.pageY - xy.top) - rect.startY
        ctx_posterior.strokeStyle = 'red';
        ctx_posterior.strokeRect(rect.startX, rect.startY, rect.w, rect.h)
    }
}
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function mouseDownderecha(e) {
    if(tipo=='')
    {
        swal("Estado Físico", "Debe seleccionar un tipo de daño en el bloque paint, para poder señalarla en el equipo.")
        return 
    }
    let xy = $("#idderecha").offset()
    rect.startX = e.pageX - xy.left;
    rect.startY = e.pageY - xy.top;
    drag = true;
}
function mouseUpderecha() {
    if (rect.w > 11 && rect.h > 11) {
        ctx_derecha.strokeStyle = 'blue';
        ctx_derecha.font = "18pt Arial"
        ctx_derecha.fillText(tipo, rect.startX, rect.startY + 20)
    }
    drag = false;
    agregarSeleccion(rect.startX, rect.startY, rect.w, rect.h,'derecha')
    dibujarderecha();
}
function dibujarderecha() {
    ctx_derecha.clearRect(0, 0, 500, 500);
    ctx_derecha.drawImage(imageObj3, 0, 0);
    for (var i = 1; i < producto.selecciones.length; i++) {
        if(producto.selecciones[i].parte == 'derecha' ){
        ctx_derecha.strokeStyle = 'blue';
        ctx_derecha.strokeRect(producto.selecciones[i].x, producto.selecciones[i].y, producto.selecciones[i].w, producto.selecciones[i].h);
        ctx_derecha.font = "12pt Arial"
        ctx_derecha.fillText(producto.selecciones[i].tipo, producto.selecciones[i].x, producto.selecciones[i].y + 20)
        }
    }
}
function mouseMovederecha(e) {
    if (drag) {
        let xy = $("#idderecha").offset()
        ctx_derecha.clearRect(0, 0, 500, 500);
        ctx_derecha.drawImage(imageObj3, 0, 0);
        //redibujar
        rect.w = (e.pageX - xy.left ) - rect.startX
        rect.h = (e.pageY - xy.top) - rect.startY
        ctx_derecha.strokeStyle = 'red';
        ctx_derecha.strokeRect(rect.startX, rect.startY, rect.w, rect.h)
    }
}
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function mouseDownizquierda(e) {
    if(tipo=='')
    {
        swal("Estado Físico", "Debe seleccionar un tipo de daño en el bloque paint, para poder señalarla en el equipo.")
        return 
    }
    let xy = $("#idizquierda").offset()
    rect.startX = e.pageX - xy.left;
    rect.startY = e.pageY - xy.top;
    drag = true;
}
function mouseUpizquierda() {
    if (rect.w > 11 && rect.h > 11) {
        ctx_izquierda.strokeStyle = 'blue';
        ctx_izquierda.font = "18pt Arial"
        ctx_izquierda.fillText(tipo, rect.startX, rect.startY + 20)
    }
    drag = false;
    agregarSeleccion(rect.startX, rect.startY, rect.w, rect.h,'izquierda')
    dibujarizquierda();
}
function dibujarizquierda() {
    ctx_izquierda.clearRect(0, 0, 500, 500);
    ctx_izquierda.drawImage(imageObj4, 0, 0);
    for (var i = 1; i < producto.selecciones.length; i++) {
        if(producto.selecciones[i].parte == 'izquierda' ){
        ctx_izquierda.strokeStyle = 'blue';
        ctx_izquierda.strokeRect(producto.selecciones[i].x, producto.selecciones[i].y, producto.selecciones[i].w, producto.selecciones[i].h);
        ctx_izquierda.font = "12pt Arial"
        ctx_izquierda.fillText(producto.selecciones[i].tipo, producto.selecciones[i].x, producto.selecciones[i].y + 20)
        }
    }
}
function mouseMoveizquierda(e) {
    if (drag) {
        let xy = $("#idizquierda").offset()
        ctx_izquierda.clearRect(0, 0, 500, 500);
        ctx_izquierda.drawImage(imageObj4, 0, 0);
        //redibujar
        rect.w = (e.pageX - xy.left ) - rect.startX
        rect.h = (e.pageY - xy.top) - rect.startY
        ctx_izquierda.strokeStyle = 'red';
        ctx_izquierda.strokeRect(rect.startX, rect.startY, rect.w, rect.h)
    }
}
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function mouseDowninferior (e) {
    
    if(tipo=='')
    {
        swal("Estado Físico", "Debe seleccionar un tipo de daño en el bloque paint, para poder señalarla en el equipo.")
        return 
    }
    let xy = $("#idinferior").offset()
    rect.startX = e.pageX - xy.left;
    rect.startY = e.pageY - xy.top;
    drag = true;
}
function mouseUpinferior() {
    if (rect.w > 11 && rect.h > 11) {
        ctx_inferior.strokeStyle = 'blue';
        ctx_inferior.font = "18pt Arial"
        ctx_inferior.fillText(tipo, rect.startX, rect.startY + 20)
    }
    drag = false;
    agregarSeleccion(rect.startX, rect.startY, rect.w, rect.h, 'inferior')
    dibujarinferior();
}
function dibujarinferior() {
    ctx_inferior.clearRect(0, 0, 500, 500);
    ctx_inferior.drawImage(imageObj6, 0, 0);
    for (var i = 1; i < producto.selecciones.length; i++) {
        if(producto.selecciones[i].parte == 'inferior' ){
        ctx_inferior.strokeStyle = 'blue';
        ctx_inferior.strokeRect(producto.selecciones[i].x, producto.selecciones[i].y, producto.selecciones[i].w, producto.selecciones[i].h);
        ctx_inferior.font = "12pt Arial"
        ctx_inferior.fillText(producto.selecciones[i].tipo, producto.selecciones[i].x, producto.selecciones[i].y + 20)
        }
    }
}
function mouseMoveinferior(e) {
    if (drag) {
        let xy = $("#idinferior").offset()
        ctx_inferior.clearRect(0, 0, 500, 500);
        ctx_inferior.drawImage(imageObj6, 0, 0);
        //redibujar
        rect.w = (e.pageX - xy.left ) - rect.startX
        rect.h = (e.pageY - xy.top) - rect.startY
        ctx_inferior.strokeStyle = 'red';
        ctx_inferior.strokeRect(rect.startX, rect.startY, rect.w, rect.h)
    }
}
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function mouseDownsuperior (e) {

    if(tipo=='')
    {
        swal("Estado Físico", "Debe seleccionar un tipo de daño en el bloque paint, para poder señalarla en el equipo.")
        return 
    }

    let xy = $("#idsuperior").offset()
    rect.startX = e.pageX - xy.left;
    rect.startY = e.pageY - xy.top;
    drag = true;
}
function mouseUpsuperior() {
    if (rect.w > 11 && rect.h > 11) {
        ctx_superior.strokeStyle = 'blue';
        ctx_superior.font = "18pt Arial"
        ctx_superior.fillText(tipo, rect.startX, rect.startY + 20)
    }
    drag = false;
    agregarSeleccion(rect.startX, rect.startY, rect.w, rect.h,'superior')
    dibujarsuperior();
}
function dibujarsuperior() {
    ctx_superior.clearRect(0, 0, 500, 500);
    ctx_superior.drawImage(imageObj5, 0, 0);
    for (var i = 1; i < producto.selecciones.length; i++) {
        if(producto.selecciones[i].parte == 'superior' ){
        ctx_superior.strokeStyle = 'blue';
        ctx_superior.strokeRect(producto.selecciones[i].x, producto.selecciones[i].y, producto.selecciones[i].w, producto.selecciones[i].h);
        ctx_superior.font = "12pt Arial"
        ctx_superior.fillText(producto.selecciones[i].tipo, producto.selecciones[i].x, producto.selecciones[i].y + 20)
        }
    }
}
function mouseMovesuperior(e) {
    if (drag) {
        let xy = $("#idsuperior").offset()
        ctx_superior.clearRect(0, 0, 500, 500);
        ctx_superior.drawImage(imageObj5, 0, 0);
        //redibujar
        rect.w = (e.pageX - xy.left ) - rect.startX
        rect.h = (e.pageY - xy.top) - rect.startY
        ctx_superior.strokeStyle = 'red';
        ctx_superior.strokeRect(rect.startX, rect.startY, rect.w, rect.h)
    }
}
function borrar()
{
    for (var i = 0; i < producto.selecciones.length; i++) {
        //console.log(producto.selecciones[i].x)
        producto.selecciones.splice([i], 1)
    }

    ctx_delantera.clearRect(0, 0, 500, 500);
    ctx_delantera.drawImage(imageObj1, 0, 0);

}
function borrardelantera()
{
    let seleccionados = producto.selecciones.length - 1;
    for (var i = seleccionados; i >= 0; i--) {
        if(producto.selecciones[i].parte == 'delantera'){
           producto.selecciones.splice([i], 1)
        }
    }
    ctx_delantera.clearRect(0, 0, 500, 500);
    ctx_delantera.drawImage(imageObj1, 0, 0);
}
function borrarposterior()
{
    let seleccionados = producto.selecciones.length - 1;
    for (var i = seleccionados; i >= 0; i--) {
        if(producto.selecciones[i].parte == 'posterior'){
           producto.selecciones.splice([i], 1)
        }
    }
    ctx_posterior.clearRect(0, 0, 500, 500);
    ctx_posterior.drawImage(imageObj2, 0, 0);
}
function borrarinferior()
{
    let seleccionados = producto.selecciones.length - 1;
    for (var i = seleccionados; i >= 0; i--) {
        if(producto.selecciones[i].parte == 'inferior'){
           producto.selecciones.splice([i], 1)
        }
    }
    ctx_inferior.clearRect(0, 0, 500, 500);
    ctx_inferior.drawImage(imageObj6, 0, 0);
}

function borrarsuperior()
{
    let seleccionados = producto.selecciones.length - 1;
    for (var i = seleccionados; i >= 0; i--) {
        if(producto.selecciones[i].parte == 'superior'){
           producto.selecciones.splice([i], 1)
        }
    }
    ctx_superior.clearRect(0, 0, 500, 500);
    ctx_superior.drawImage(imageObj5, 0, 0);
}
function borrarderecho()
{
    let seleccionados = producto.selecciones.length - 1;
    for (var i = seleccionados; i >= 0; i--) {
        if(producto.selecciones[i].parte == 'derecha'){
           producto.selecciones.splice([i], 1)
        }
    }
    ctx_derecha.clearRect(0, 0, 500, 500);
    ctx_derecha.drawImage(imageObj3, 0, 0);
}
function borrarizquierda()
{
    let seleccionados = producto.selecciones.length - 1;
    for (var i = seleccionados; i >= 0; i--) {
        if(producto.selecciones[i].parte == 'izquierda'){
           producto.selecciones.splice([i], 1)
        }
    }
    ctx_izquierda.clearRect(0, 0, 500, 500);
    ctx_izquierda.drawImage(imageObj4, 0, 0);
}
