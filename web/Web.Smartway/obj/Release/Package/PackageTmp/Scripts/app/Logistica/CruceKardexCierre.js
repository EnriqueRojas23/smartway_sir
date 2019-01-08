var oDocumentosTable;

$(document).ready(function () {

    mostrarMensajeResultado();

    $("#btnBuscar").button()
                   .click(function (e) {
                       oDocumentosTable.draw();
                   });

    $(function () {
        $('#FrmCruceKardexCierre').submit(function (event)
        {
            event.preventDefault();
            showLoading();
            $('#FrmCruceKardexCierre').unbind('submit').submit()

        });

    });
    CargaCruce();
});

function CargaCruce()
{
    oDocumentosTable =
       $('.dataTables-tblResumen').DataTable({
           responsive: true,
           //"ordering": false,
           //dom: '<"html5buttons"B>lTfgitp',
           processing: true,
           "serverSide": true,
           "language": {
               "lengthMenu": "Mostrando _MENU_ registros por página",
               "zeroRecords": "No hay registros para mostrar",
               "search": "Buscar:",
               "info": "Mostrando página _PAGE_ de _PAGES_",
               "infoEmpty": "No hay registros",
               "infoFiltered": "(Filtrando de _MAX_ total registros)"
           },
           "iDisplayLength": 100,
           "ajax": {
               "url": $('#tblResumen').data("url"),
               "data": function ( d ) {
                   d.anio = $('#anio_cierre').val();
                   d.mes = $('#mes_cierre').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                    { "title": "Periodo", "data": "PERIODO", "name": "PERIODO", "class": "text-center", "sWidth": "8%" },
                    { "title": "Tienda", "data": "TIENDA", "name": "TIENDA", "class": "text-center", "sWidth": "8%" },
                    { "title": "Homologado", "data": "CO_HOMOLOGADO", "name": "CO_HOMOLOGADO", "class": "text-center", "sWidth": "10%" },
                    { "title": "Item", "data": "ITEM", "name": "ITEM", "sWidth": "10%" },
                    { "title": "Descripción.", "data": "DESCRIPCION", "name": "DESCRIPCION","sWidth": "25%" },
                    { "title": "Ingresos.", "data": "INGRESOS", "name": "INGRESOS", "class": "text-center" },
                    { "title": "Salidas", "data": "SALIDAS", "name": "SALIDAS", "class": "text-center" },
                    { "title": "Saldo Final", "data": "SALDO_FINAL", "name": "SALDO_FINAL", "class": "text-center" },
                    { "title": "Saldo Tastac_Mens", "data": "SALDO_TASTAC_MENS", "name": "SALDO_TASTAC_MENS", "class": "text-center" },
                    { "title": "Diferencia", "data": "DIFERENCIA", "name": "DIFERENCIA", "class": "text-center" },
           ],
       });
}


function mostrarMensajeResultado()
{
    if ($("#hdfTipo").val() == "error")
    {
        var mensaje = $("#hdfMensaje").val();
        swal("¡Error!", mensaje, "error");
    }
    else if ($("#hdfTipo").val() == "correcto")
    {
        var mensaje = $("#hdfMensaje").val();
        swal("¡Carga Correcta!", mensaje, "success");
    }
}


function showLoading() {
    $.blockUI({
        message: '<div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div>  <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div>  <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
        theme: false,
        baseZ: 100000
    });
}


function Exportar()
{
    var url = $("#tblResumen").data("urlexp");
    window.location = url;
}
