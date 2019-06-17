$(document).ready(function () {

    
    $('#dtpfechaini .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#dtpfechafin .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $("#btnBuscarBaseIngreso").click(function (event) {
        BuscarBaseIngreso();
    });
    $("#btnBuscarBaseIngenico").click(function (event) {
        BuscarBaseIngenico();
    });
    $("#btnBuscarOrdenxRepuesto").click(function (event) {
        BuscarOrdenxRepuesto();
    });
    
   
});
function BuscarBaseIngreso() {
    var fecinicio = $("#fecinicio").val();
    var fecfin = $("#fecfin").val();
    var idestado = $("#idestado").val();

    var url = "http://104.36.166.65/RepSW/rep_baseingreso.aspx?" + "fecinicio=" + fecinicio
        + "&fecfin=" + fecfin + "&idestado=" + idestado;

    window.open(url);
}
function BuscarBaseIngenico() {
    var fecinicio = $("#fecinicio").val();
    var fecfin = $("#fecfin").val();
    var idestado = $("#idestado").val();

    var url = "http://104.36.166.65/RepSW/rep_baseingenico.aspx?" + "fecinicio=" + fecinicio
        + "&fecfin=" + fecfin + "&idestado=" + idestado;

    window.open(url);
}
function BuscarOrdenxRepuesto() {
    var fecinicio = $("#fecinicio").val();
    var fecfin = $("#fecfin").val();
    

    var url = "http://104.36.166.65/RepSW/Rep_RepuestoxOrden.aspx?" + "fecinicio=" + fecinicio
        + "&fecfin=" + fecfin ;

    window.open(url);
}
