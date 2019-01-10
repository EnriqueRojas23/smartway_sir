var renderer;

$(document).ready(function () {

    Graph();
    Graph2();
    Graph3();

});


function Graph()
{
    var urlData = $('#btnActualizar').data("url");
    var data = "";
    $.ajax({
        type: 'GET',
        url: urlData,
        dataType: 'json',
        async: true,
        contentType: "application/json; charset=utf-8",
        data: {},
        success: function (result)
        {
            dataEjeX = result.dataEjeX;
            data1 = result.data1;
            data2 = result.data2;
            data3 = result.data3;
            data4 = result.data4;
            //alert(data1);
            CargarGrafico(dataEjeX, data1, data2, data3, data4);
            
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });

}



function CargarGrafico(DataEjeX, datos1,datos2,datos3,datos4 )
{
    var EjeX  = JSON.parse(DataEjeX);
    var array1 = JSON.parse(datos1);
    var array2 = JSON.parse(datos2);
    var array3 = JSON.parse(datos3);
    var array4 = JSON.parse(datos4);

    $('#container').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'VENTA OCTUBRE 2016  VS. PPTO VS. OCTUBRE 2015 (TOTAL EN MILES DE SOLES)'
        },
        subtitle: {
            text: 'Smartway'
        },
        xAxis: {
            categories: EjeX
        },
        yAxis: {
            title: {
                text: 'Miles de Soles'
            }
        },
        plotOptions: {
            line: {
                dataLabels:
                    {
                    enabled: true
                },
                enableMouseTracking: true
            },
 
        },
        series: [{
            name: 'VTA PROM 2015',
            data: array1,
            dashStyle: 'dot',
        },
        {
            name: 'PROYECCION 2016',
            data: array2,
            dashStyle: 'ShortDash',
        }, {
            name: 'VTA PROM 2016',
            data: array3,
            dashStyle: 'none',
        },
        {
            name: 'PPTO 2016',
            data: array4,
            dashStyle: 'ShortDash',
        }, ]
    });   
}

function Graph2()
{
    var urlData = $('#btnActualizar2').data("url");
    var data = "";
    $.ajax({
        type: 'GET',
        url: urlData,
        dataType: 'json',
        async: true,
        contentType: "application/json; charset=utf-8",
        data: {},
        success: function (result)
        {
            dataEjeX = result.dataEjeX;
            data1 = result.data1;
            data2 = result.data2;
            data3 = result.data3;
            CargarGrafico2(dataEjeX, data1, data2, data3);

        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });

}

function CargarGrafico2(DataEjeX, datos1, datos2, datos3)
{
    var EjeX = JSON.parse(DataEjeX);
    var array1 = JSON.parse(datos1);
    var array2 = JSON.parse(datos2);
    var array3 = JSON.parse(datos3);


    $('#container2').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'EVOLUCIÓN DE TICKET MEDIO , ITEM X TICKET Y PRECIO PROMEDIO 16-15-14'
        },
        subtitle: {
            text: 'Smartway'
        },
        xAxis: {
            categories: EjeX
        },
        yAxis: [{
            title: {  text: '', },
            min: 0,
            max: 100,
            minRange:10
        }, {
            title: { text: '',},
            min: 1.2,
            minRange: 2,
            opposite: true
        }],
        plotOptions: {
            line: {
                dataLabels:
                    {
                        enabled: true
                    },
                enableMouseTracking: true
            },

        },
        series: [{
            yAxis: 0,
            name: 'TICKET MEDIO',
            data: array1,
            dashStyle: 'none',
            lineWidth: 8,
            color: '#FE9A2E'
        },
        {
            yAxis: 0,
            name: 'PRECIO PROMEDIO',
            data: array2,
            dashStyle: 'none',
            lineWidth: 8,
            color: '#A4A4A4'
        }, {
            yAxis: 1,
            name: 'ITEM X TICKET',
            data: array3,
            dashStyle: 'none',
            lineWidth: 8,
            color: '#B43104'
        },]
    });
}

function Graph3() {
    var urlData = $('#btnActualizar3').data("url");
    var data = "";
    $.ajax({
        type: 'GET',
        url: urlData,
        dataType: 'json',
        async: true,
        contentType: "application/json; charset=utf-8",
        data: {},
        success: function (result) {
            dataEjeX = result.dataEjeX;
            data1 = result.data1;
            data2 = result.data2;
            data3 = result.data3;
            data4 = result.data4;
            data5 = result.data5;
            data6 = result.data6;
            CargarGrafico3(dataEjeX, data1, data2, data3, data4, data5, data6);

        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });

}

function CargarGrafico3(DataEjeX, datos1, datos2, datos3, datos4, datos5, datos6) {

    var EjeX = JSON.parse(DataEjeX);
    var array1 = JSON.parse(datos1);
    var array2 = JSON.parse(datos2);
    var array3 = JSON.parse(datos3);
    var array4 = JSON.parse(datos4);
    var array5 = JSON.parse(datos5);
    var array6 = JSON.parse(datos6);


    $('#container3').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'T.M 2016 VS T.M 2015 / IxT 2016 VS IxT 2015 / PRECIO PROM. 2016 VS PRECIO PROM. 2015 (JULIO)'
        },
        subtitle: {
            text: 'Smartway'
        },
        xAxis: {
            categories: EjeX
        },
        yAxis: [{
            title: { text: '', },
            min: 20,
            max: 80,
            minRange: 20
        }, {
            title: { text: '', },
            min: 1.2,
            minRange: 2,
            opposite: true
        }],
        plotOptions: {
            line: {
                dataLabels:
                    {
                        enabled: true
                    },
                enableMouseTracking: true
            },

        },
        series: [{
            yAxis: 0,
            name: 'T.M. 2016',
            data: array1,
            dashStyle: 'none',
            color: '#B43104'
        },
        {
            yAxis: 0,
            name: 'T.M. 2015',
            data: array2,
            dashStyle: 'dot',
            color: '#642EFE'
        },
        {
            yAxis: 0,
            name: 'PRECIO PROM 2016',
            data: array3,
            dashStyle: 'none',
            color: '#A4A4A4'
        },
         {
             yAxis: 0,
             name: 'PRECIO PROM 2015',
             data: array4,
             dashStyle: 'dot',
             color: '#A4A4A4'
         },

        {
            yAxis: 1,
            name: 'ITEM X TICKET 2016',
            data: array5,
            dashStyle: 'none',
            color: '#FE9A2E'
        },
        {
            yAxis: 1,
            name: 'ITEM X TICKET 2015',
            data: array6,
            dashStyle: 'dot',
            color: '#FE9A2E'
        }, ]
    });
}