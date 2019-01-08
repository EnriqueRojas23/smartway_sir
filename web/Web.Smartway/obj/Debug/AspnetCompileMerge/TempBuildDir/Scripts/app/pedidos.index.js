$(document).ready(function() {
    configurarGrilla();
    $("#btnHojaRuta").click(function (event) { btnHojaRuta_onClick(this, event); });
});

function getRowData_gridproductos() {
    var grilla = $("#gridpedidos");
    var rowId = grilla.jqGrid('getGridParam', 'selrow');
    if (rowId == null) {
        alert("Tiene que seleccionar un pedido");
        return;
    }
    return grilla.jqGrid("getRowData", rowId);
}

function btnHojaRuta_onClick(obj, event) {
    var numpedido, numproducto, desproducto;
    var rowdata = getRowData_gridproductos();

       idpedido = rowdata.ped_str_numero;

       var vUrl = $(obj).data("url").trim() + "?id=" + idpedido.trim();
      $(window).attr("location", vUrl);

}

function configurarGrilla() {

    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.height = 320;
    $.jgrid.defaults.responsive = true;
    
    var storageName = "filters";
    $("#IdEstadoPedido").val(1);
    var form = $("#frmfiltroindex");
    var grilla = $("#gridpedidos");
    var pagergrilla = $("#gridpedidospager");
    var vdataurl = $(grilla).data("dataurl") + "?est=" + 1;

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        postData: getDataForm(),
        styleUI: 'Bootstrap',
        colNames: ['', '', 'Num. Pedido', 'Cliente', 'Dirección', 'Ubigeo', 'Fecha Pedido', 'Estado', 'Monto Total', 'Tiempo Estimado', 'Tipo Entrega'],
        colModel:
        [
            { key: true, hidden: true, name: 'ped_int_id', index: 'ped_int_id' },
            { key: false, hidden: false, name: 'ped_int_id', index: 'ped_int_id', width: '20', align: 'center', formatter: editarPedido },
            { key: false, hidden: false, name: 'ped_int_id', index: 'ped_int_id', width: '20', align: 'center', formatter: verDetallePedido },
            { key: false, hidden: false, name: 'ped_str_numero', index: 'ped_str_numero', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_str_cliente', index: 'ped_str_cliente', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_str_direccion', index: 'ped_str_direccion', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'dis_str_descrip', index: 'dis_str_descrip', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_dat_fechapedido', index: 'ped_dat_fechapedido', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'est_str_descrip', index: 'est_str_descrip', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_dec_montototal', index: 'ped_dec_montototal', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_str_tiempoestimado', index: 'ped_str_tiempoestimado', width: '20', align: 'center' },
            { key: false, hidden: false, name: 'ped_str_tipoentrega', index: 'ped_str_tipoentrega', width: '20', align: 'center' },
            
        ],
        pager: $(pagergrilla),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        emptyrecords: 'No se encontraron registros',
        autowidth: true,
        autoheight: true,
        multiselect: true,
        jsonReader:
        {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            id: 0
        },
        beforeRequest: function ()
        {
            var $self = $(this);
              
                        
            var postData = $self.jqGrid('getGridParam', 'postData');
            $.each(postData, function (index, value) {
                if (value.name == "rows"){
                    postData[index].value = postData.rows;
                }
                if (value.name == "page") {
                    postData[index].value  = postData.page;
                }
                if (value.name == "sord") {
                    postData[index].value = postData.sord;
                }
            })
            $self.jqGrid('setGridParam', { postData: postData});
        },
    });
   
}

function getDataForm()
{
    var form = $("#frmfiltroindex");
    return form.serializeArray();
}

function verDetallePedido(cellvalue, options, rowObject) {
    var control = '<a href="javascript:irDetalle(' + cellvalue + ')">Ver</a>';
    return control;
}
function editarPedido(cellvalue, options, rowObject) {
    var control = '<a href="javascript:irEditar(' + cellvalue + ')">Ver</a>';
    return control;
}

function irEditar(id) {
    var grilla = $("#gridpedidos");
    var vUrl = $(grilla).data("urledit") + "?id=" + id;
    $(window).attr("location", vUrl);
}
function irDetalle(id) {
    var grilla = $("#gridpedidos");
    var vUrl = $(grilla).data("urldetail") + "?id=" + id;
    $(window).attr("location", vUrl);
}

function cargarPedido(objname, id, dni, numero)
{
    var lis = $("#ulestado").find("li");
    $(lis).removeClass("active");
    
    if (id == 0) $("#" + objname).removeClass("active");
    else $("#" + objname).addClass("active");

    $("#IdEstadoPedido").val(id);
    ocultarColumnas(id);

   
}

function buscarPedido(IdEstado)
{
    var grilla = $("#gridpedidos");
    $("#IdEstadoPedido").val(IdEstado);
    $(grilla).jqGrid('setGridParam', {postData: getDataForm() }).trigger('reloadGrid');
}

function ocultarColumnas(idest)
{
    var grilla = $("#gridpedidos");
    var tipo = "GEN";
    
    $(grilla).jqGrid('hideCol', 'cb');
    if (idest == 6) {
        $(grilla).jqGrid('showCol', 'cb');
        tipo = "HRT";
    }


    var vUrl = $("#filtroscab").data("url") + "?tipo=" +  tipo;
    $.get(vUrl, function (data) {
        $("#filtroscab").html(data);
        buscarPedido(idest);
    });


}

function IngresarHojaRuta(obj)
{
    var grilla = $("#gridpedidos");
    var selRowId = grilla.jqGrid('getGridParam', 'selarrrow').toString();
    var vUrl = $(obj).data("urlinshr");

    $.ajax({
        url: vUrl,
        type: "post",
        datatype: "json",
        data: { idsped: selRowId },
        success: function (data) {
            if (data.res) {
                alert("Se registro correctamente la hoja de ruta");
            } else {
                alert(data.msj);
            }
        },
        error: function (data) {
            alert(data.error.toString());
        }
    });

}



