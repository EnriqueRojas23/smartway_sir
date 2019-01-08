var btnContribucionMes = "#btnContribucionMes";
var btnContribucionAno = "#btnContribucionAno";

var btnVentaMes = "#btnVentaMes";
var btnVentaAno = "#btnVentaAno";

$(document).ready(function ()
{
    $('.ladda-button').ladda('bind', { timeout: 5000000 });
    $('[data-toggle="tooltip"]').tooltip();
    
    $(btnContribucionMes).click(function (event) { btnContribucionMes_onclick(this, event); });
    $(btnContribucionAno).click(function (event) { btnContribucionAno_onclick(this, event); });

    $(btnVentaMes).click(function (event) { btnVentaMes_onclick(this, event); });
    $(btnVentaAno).click(function (event) { btnVentaAno_onclick(this, event); });
});


function btnContribucionMes_onclick(obj, event)
{
    var anio = $('#anio').val();
    var mes  = $('#mes').val();

    if (anio == "" || mes =="")
    {
        swal({ title: "¡Error!", text: "¡Seleccionar año y mes!", type: "error", confirmButtonText: "Aceptar" });
    }
    else
    {
        var url = $(obj).data("url") + "?anio=" + anio + "&mes=" + mes;
        $.get(url, function (data)
        {
            var valor = parseFloat($('#hdfMContribucion').val());

            $("#modalcontentIncidenciasL").html(data);
            $("#modalcontainerIncidenciasL").modal({ show: false });
            CargarGrafico('container', valor);
            $("#modalcontainerIncidenciasL").on('shown', function () { });
            $("#modalcontainerIncidenciasL").modal("show");
        });
    }
}


function btnContribucionAno_onclick(obj, event)
{
    var anio = $('#anio').val();
    var mes = $('#mes').val();

    if (anio == "" || mes == "")
    {
        swal({ title: "¡Error!", text: "¡Seleccionar año y mes!", type: "error", confirmButtonText: "Aceptar" });
    }
    else
    {
        var url = $(obj).data("url") + "?anio=" + anio + "&mes=" + mes;
        $.get(url, function (data)
        {
            var valor = parseFloat($('#hdfAContribucion').val());

            $("#modalcontentIncidenciasL").html(data);
            $("#modalcontainerIncidenciasL").modal({ show: false });
            CargarGrafico('container2', valor);
            $("#modalcontainerIncidenciasL").on('shown', function () { });
            $("#modalcontainerIncidenciasL").modal("show");
        });
    }
}


function btnVentaMes_onclick(obj, event)
{
    var anio = $('#anio').val();
    var mes  = $('#mes').val();

    if (anio == "" || mes == "")
    {
        swal({ title: "¡Error!", text: "¡Seleccionar año y mes!", type: "error", confirmButtonText: "Aceptar" });
    }
    else
    {
        var url = $(obj).data("url") + "?anio=" + anio + "&mes=" + mes;

        $.get(url, function (data)
        {
            //var valor = parseFloat($('#hdfMContribucion').val());
            $("#modalcontentIncidenciasL").html(data);
            $("#modalcontainerIncidenciasL").modal({ show: false });
            //CargarGrafico('container', valor);
            $("#modalcontainerIncidenciasL").on('shown', function () { });
            $("#modalcontainerIncidenciasL").modal("show");
        });
    }
}





function CargarGrafico(contenedor, val)
{
    var valor = parseFloat(val);

    $(function () {

        Highcharts.chart(contenedor, {

            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },

            title: {
                text: 'Constribución'
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 150,
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',
                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: '%'
                },
                plotBands: [{
                    from: 100,
                    to: 150,
                    color: '#55BF3B' // green
                }, {
                    from: 97,
                    to: 99.99,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 0,
                    to: 96.99,
                    color: '#DF5353' // red
                }]
            },

            series: [{
                name: 'Contribución',
                data: [valor],
                tooltip: {
                    valueSuffix: ' %'
                }
            }]

        }
       );
    });

}

