
var gridrolesdisponibles = "#gridrolesdisponibles";
var gridrolesdisponiblespager = "#gridrolesdisponiblespager";

var gridrolesasignados = "#gridrolesasignados";
var gridrolesasignadospager = "#gridrolesasignadospager";

var formsubmit = "#formsubmit";

$(document).ready(function ()
{
	//$.jgrid.defaults.width = 780;
	//$.jgrid.defaults.height = 320;
	$.jgrid.defaults.responsive = true;




});

function configurarGrilla_RolesDisponibles()
{
    var grilla = $(gridrolesdisponibles);
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'GET',
        colNames: ['', 'Nombre'],
        colModel:
        [
            { key: true, hidden: true, name: 'rol_int_id', index: 'rol_int_id' },
            { key: false, hidden: false, name: 'rol_str_alias', index: 'rol_str_alias', width: '120', align: 'left' },
        
        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        rowNum: CONFIG_JQGRID.get('rownum'),
        rowList: CONFIG_JQGRID.get('rowlist'),
        emptyrecords: CONFIG_JQGRID.get('emptyrecords'),
        //pager: $(gridrolesdisponiblespager),
        autoheight: true,
        autowidth: true,
        shrinkToFit: false,
        multiselect: true

    });
}

function configurarGrilla_RolesAsignados()
{
    var grilla = $(gridrolesasignados);
    var vdataurl = $(grilla).data("dataurl");

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'GET',
        colNames: ['', 'Nombre'],
        colModel:
        [
            { key: true, hidden: true, name: 'rol_int_id', index: 'rol_int_id' },
            { key: false, hidden: false, name: 'rol_str_alias', index: 'rol_str_alias', width: '120', align: 'left' },

        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        rowNum: CONFIG_JQGRID.get('rownum'),
        rowList: CONFIG_JQGRID.get('rowlist'),
        emptyrecords: CONFIG_JQGRID.get('emptyrecords'),
        //pager: $(gridrolesasignadospager),
        autoheight: true,
        autowidth: true,
        shrinkToFit: false,
        multiselect: true

    });

}

function moverItem(accion, gorigen, gdestino)
{
    var grillaOrigen = $(gorigen);
    var grillaDestino = $(gdestino);
    var ids = undefined;

    //obtener los ids del grid origen
    if (accion == "TODO") ids = $(grillaOrigen).jqGrid('getDataIDs');
    else if (accion == "SELECT") ids = $(grillaOrigen).jqGrid('getGridParam', 'selarrrow');

    if (ids == undefined || ids.length == 0) {
        alert("No se encontraron datos para mover");
        return;
    }

    var idarray = [];
    $.each(ids, function () {
        idarray.push(this);
    })
    //pasando data de la grilla origen al destino
    for (var i = 0; i < idarray.length; i++)
    {
        var dataorigen = $(grillaOrigen).jqGrid('getRowData', idarray[i]);
        if (dataorigen.rol_int_id != undefined) {
            $(grillaDestino).jqGrid('addRowData', idarray[i], dataorigen, "last");
            jQuery(grillaOrigen).jqGrid("delRowData", idarray[i]);
        }
    }
}

function regresarListado(obj)
{
    var vUrl = $(obj).data("url");
    $(document).attr("location", vUrl);
}
function Asignar(obj)
{
    var url = $(obj).data("url");

    var ids = $(gridrolesasignados).jqGrid('getDataIDs');
   
    $("#idsRolesDestino").val(ids);



    var dataModelo = $('form').serialize();





       swal({
            title: "Asignar Rol",
            text: "¿Está seguro que desea registrar los cambios?",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Registrar',
            closeOnConfirm: false,
            closeOnCancel: true
        },
                function (isConfirm) {
            if (isConfirm) {
                $.ajax(
                        {
                            type: "POST",
                            async: true,
                            url: url,
                            data: dataModelo,
                            success: function (data) {
                                if(data.res == true) {
                                    swal({ title: "Correcto", text: "Se registró correctamente", type: "success", confirmButtonText: "Aceptar" });
                                    $("#modalcontainer").modal("hide");
                                    //reload();

                                }
                                else 
                                {
                                    swal({ title: "Correcto", text: "Se registró correctamente.", type: "success", confirmButtonText: "Aceptar" });
                                    $("#modalcontainer").modal("hide");
                                }

                            },
                            error: function (request, status, error) {
                           
                                swal({ title: "Error!", text: "Ocurrió un error al registrar", type: "error", confirmButtonText: "Aceptar" });
                            }
                        });
            }
        });


}

