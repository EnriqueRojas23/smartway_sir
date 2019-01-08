/*
archivo: seguridad.usuarios.listarusuarios
*/

var listarusuario_frmsearch = "#frmSearchListado";

var gridlistausuario = "#gridlistausuario";
var gridlistausuariopager = "#gridlistausuariopager";


$(document).ready(function () {
    $.jgrid.defaults.height = 320;
    $.jgrid.defaults.responsive = true;

    $('#btnNuevo').click(function (event) { btnNuevo_onclick(this, event); });
    configurarGrilla();
    configurarPopUpNuevo();
    mostrarMensajeResultado();

});
function configurarPopUpNuevo() {
    $(function () {
        $('#frmSistemaNuevo').submit(function () {
            event.preventDefault();
            swal({
                title: "Registro de Sistema",
                text: "Esta seguro que desea registrar este sistema?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Registrar',
                closeOnConfirm: false,
                closeOnCancel: true
            },
               function () {
                   $('#frmSistemaNuevo').submit();
               });
        
        });
    });
}
function mostrarMensajeResultado() {
    if ($("#hdfMensaje").val()) {
        var mensaje = $("#hdfMensaje").val();
        swal("¡Registro Correcto!", mensaje, "success");
    }
}


function btnNuevo_onclick(obj, event) {
    var url = $(obj).data("url");
   
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        configurarPopUpNuevo();
    });
}

function configurarGrilla() {

     var grilla = $('#gridlistasistema');
     var pagergrilla = $('#gridlistasistemapager');

     var nombre = $('#NombreCompleto').val();
     var vdataurl = $(grilla).data("dataurl") + '?nom=' + nombre;

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
       // postData: getDataForm(),
        colNames: ['', 'Código', 'Nombre', 'Descripción',  'Acciones'],
        colModel:
        [
            { key: true, hidden: true, name: 'pag_int_id', index: 'pag_int_id' },
            { key: false, hidden: false, name: 'pag_str_codmenu', index: 'pag_str_codmenu', width: '50', align: 'left' },
            { key: false, hidden: false, name: 'pag_str_nombre', index: 'pag_str_nombre', width: '100', align: 'left' },
            { key: false, hidden: false, name: 'pag_str_descrip', index: 'pag_str_descrip', width: '200', align: 'left' },
            //{ key: false, hidden: false, name: 'pag_str_url', index: 'pag_str_url', width: '150', align: 'left' },
            { key: false, hidden: false, name: 'pag_int_id', index: 'pag_int_id', width: '120', align: 'center', formatter: bottoneditarsistema_formatter },

        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        pager: $('#gridlistasistemapager'),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        emptyrecords: CONFIG_JQGRID.get('emptyrecords'),
        autoheight: true,
        autowidth: true,
        shrinkToFit: true,
        beforeRequest: function () {
            var $self = $(this);
            var postData = $self.jqGrid('getGridParam', 'postData');
            $.each(postData, function (index, value) {
                if (value.name == "rows") {
                    postData[index].value = postData.rows;
                }
                if (value.name == "page") {
                    postData[index].value = postData.page;
                }
                if (value.name == "sord") {
                    postData[index].value = postData.sord;
                }
                 if (value.name == "sidx") {
                    postData[index].value = postData.sidx;
                }
            })
            $self.jqGrid('setGridParam', { postData: postData });
        },
      
    });

}

function getDataForm() {

    var form = $(listarusuario_frmsearch);
    return form.serializeArray();
}

function btnlistarbusquedasecundario_onclick(searchdefault) {
    var form = $.find("form[data-typeform=search]");
    if (form == null || form == undefined || form.length <= 0) return;

    var controles = $(form).find("[data-ctrlsearch]");
    if (controles == null || controles == undefined || controles.length <= 0) return;

    var strfiltro = "";
    $.each(controles, function () {
        var valor = $.trim($(this).val());
        var nombre = $(this).data("ctrlsearch");

        if (valor != "") {
            strfiltro = strfiltro + " {" + nombre + ":" + valor + "}";
        }
    })

    if (searchdefault != undefined) $(searchdefault).val(strfiltro);
}

function bottoneditarsistema_formatter(cellvalue, options, rowObject)
{
    var acciones = $("<div class='btn-group'></div>");
    
    var control = $("<button></button>");
    control.append("<i class='fa fa-edit'></i>")
    control.attr("title","Editar")
    control.addClass("btn btn-primary btn-xs btn-outline")
    control.attr("id", "lnk" + cellvalue);
    control.attr("onclick", "irEditarSistema('" + cellvalue + "')");
    

    var btnGridT = $("#templatetrash").clone(false)[0];
    $(btnGridT).attr("id", "btngrid_trash_" + cellvalue);
    $(btnGridT).attr("onclick", "eliminarPagina(this, " + cellvalue + ")");
    $(btnGridT).show();



    acciones.append(control);
    acciones.append(btnGridT.outerHTML);

    var htmlcontrol = acciones[0].outerHTML;
    return htmlcontrol
}
function eliminarPagina(obj, id)
{
    
    var vUrl = $(obj).data("url");
    swal({
        title: "Eliminar Sistema",
        text: "¿Está seguro que desea eliminar el Sistema?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Eliminar',
        closeOnConfirm: false,
        closeOnCancel: true
    },
       function (isConfirm) {
           if (isConfirm) {
               $.ajax({

                   url: vUrl,
                   type: "post",
                   datatype: "json",
                   data: { id: id },
                   success: function (data) {
                       if (data.res) {
                           swal("¡Se elmininó con exito!", "", "success");
                             $("#modalcontainer").modal("hide");
                            reload();
                       } else {
                           swal({ title: "Error", text: "Ocurrio un error", type: "error", confirmButtonText: "Aceptar" });
                       }
                   },
                   error: function (data) {
                       alert(data.error.toString());
                   }
               });
           }
     });
}

function resetearPwd(obj, id)
{
    var vUrl = $(obj).data("url");
    $.ajax({

        url: vUrl,
        type: "post",
        datatype: "json",
        data: { id: id},
        success: function (data) {
            if (data.res) {
                alert(data.msj);
            } else {
                alert(data.msj);
            }
        },
        error: function (data) {
            alert(data.error.toString());
        }

    });
}

function irEditarSistema(idsis)
{
    var url = $('#gridlistasistema').data("dataedit2") + "?idsis=" + idsis;
    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        configurarPopUpEditar();
    });


    //var vUrl = $(gridlistausuario).data("urlasig") + "?id=" + id;
    //$(document).attr("location", vUrl);
}

function crearUsuario(obj)
{
    var vUrl = $(obj).data("url");
    $(window).attr("location", vUrl);
}
function configurarPopUpEditar() {
    $(function () {
        $('#frmSistemaNuevo').submit(function () {
            event.preventDefault();
            swal({
                title: "Actualización de Sistema",
                text: "¿Está seguro que desea actualizar este sistema?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Actualizar',
                closeOnConfirm: false,
                closeOnCancel: true
            },
               function () {
                   $('#frmSistemaNuevo').submit();
               });

        });
    });
}


function Guardar(obj)
{
    var url = $(obj).data("url");
    var dataModelo = $('form').serialize();

    var nombre = $('#pag_str_nombre').val();
    var descrip = $('#pag_str_descrip').val();
    var pagurl = $('#pag_str_url').val();

    validation($('#pag_str_nombre'));
    validation($('#pag_str_descrip'));
    validation($('#pag_str_url'));
     if (nombre == "" || descrip == ""  || nombre =="" || pagurl== "") {
       
        swal({ title: "Error", text: "Debe completar los datos requeridos", type: "error", confirmButtonText: "Aceptar" });
    }
     else {


        swal({
            title: "Registro de Sistema",
            text: "¿Está seguro que desea registrar este sistema?",
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
                                if (data.res == true) {
                                    swal({ title: "Correcto", text: "Se registró correctamente", type: "success", confirmButtonText: "Aceptar" });
                                    $("#modalcontainer").modal("hide");
                                    reload();
                                }else { swal({ title: "Error", text: "El sistema ya existe", type: "error", confirmButtonText: "Aceptar" }); }
                            },
                            error: function (request, status, error) {
                           
                                swal({ title: "Error!", text: "Ocurrió un error al registrar", type: "error", confirmButtonText: "Aceptar" });
                            }
                        });
            }
        });
    }

}

function actualizar(obj)
{
    var url = $(obj).data("url");
    var dataModelo = $('form').serialize();

    var nombre = $('#pag_str_nombre').val();
    var descrip = $('#pag_str_descrip').val();
    var pagurl = $('#pag_str_url').val();

    validation($('#pag_str_nombre'));
    validation($('#pag_str_descrip'));
    validation($('#pag_str_url'));
     if (nombre == "" || descrip == ""  || nombre =="" || pagurl== "") {
       
        swal({ title: "Error", text: "Debe completar los datos requeridos", type: "error", confirmButtonText: "Aceptar" });
    }
     else {


        swal({
            title: "Actualizar  Sistema",
            text: "¿Está seguro que desea actualizar este sistema?",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Actualizar',
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
                                if (data.res == true) {
                                    swal({ title: "Correcto", text: "Se registró correctamente", type: "success", confirmButtonText: "Aceptar" });
                                    $("#modalcontainer").modal("hide");
                                    reload();
                                }
                                 else { swal({ title: "Error", text: "El sistema ya existe", type: "error", confirmButtonText: "Aceptar" }); }
                            },
                            error: function (request, status, error) {
                           
                                swal({ title: "Error!", text: "Ocurrió un error al registrar", type: "error", confirmButtonText: "Aceptar" });
                            }
                        });
            }
        });
    }

}
function reload() {
    var vdataurl = $('#gridlistasistema').data("dataurl");
    $('#gridlistasistema').jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}

function buscarsistemas()
{  


    var grilla = $('#gridlistasistema'); 
    var nombre = $('#NombreCompleto').val();

    var vdataurl = $(grilla).data("dataurl") + '?nom=' + nombre;


     $(grilla).jqGrid('setGridParam', {  url: vdataurl }).trigger('reloadGrid');
}
