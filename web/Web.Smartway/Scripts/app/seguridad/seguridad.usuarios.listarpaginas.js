
var listarusuario_frmsearch = "#frmSearchListado";
var gridlistausuario = "#gridlistausuario";
var gridlistausuariopager = "#gridlistausuariopager";


$(document).ready(function () {

    $.jgrid.defaults.height = 370;
    $.jgrid.defaults.responsive = true;
    $('#btnNuevo').click(function (event) { btnNuevo_onclick(this, event); });
    configurarGrilla();
});
function btnNuevo_onclick(obj, event) {
    var url = $(obj).data("url");

    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        $('#btnAgregar').click(function (event) { btnAgregar_onclick(this, event); });
        configurarPopUpNuevo();
    });
}
function btnAgregar_onclick(obj, event)
{
    var url = $(obj).data("url");
    var dataModelo = $('form').serialize();

    var padre = $('#pag_str_codmenu_padre').val();
    var nombre = $('#pag_str_nombre').val();
    var controller = $('#pag_str_controller').val();
    var action = $('#pag_str_action').val();
    var area = $('#pag_str_attributes').val();
    var sec = $('#pag_int_secuencia').val();
    var niv = $('#pag_int_nivel').val();
    

    validation($('#pag_int_secuencia'));
    validation($('#pag_str_codmenu_padre'));
    validation($('#pag_str_nombre'));
    validation($('#pag_str_controller'));
    validation($('#pag_str_action'));
    validation($('#pag_str_attributes'));
    validation($('#pag_int_nivel'));


    if (padre == "" || nombre == "" || controller == "" || action == "" || area == "" || sec == "" || niv == "") {
       
        swal({ title: "Error", text: "Debe completar los datos requeridos", type: "error", confirmButtonText: "Aceptar" });
     }
     else {


    swal({
        title: "Nueva Pantalla",
        text: "¿Está seguro que desea agregar esta pantalla?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Agregar',
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
                              if (data.res == "1") {
                                    swal({ title: "Correcto", text: "Se registró correctamente", type: "success", confirmButtonText: "Aceptar" });
                                    $("#modalcontainer").modal("hide");
                                    reload();

                                }
                              else { swal({ title: "Error", text: "La página ya existe", type: "error", confirmButtonText: "Aceptar" }); }
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
    var vdataurl = $('#gridlistapaginas').data("dataurl");
    $('#gridlistapaginas').jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}


function configurarPopUpNuevo() {

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    $(function () {
        $('#frmPaginaNuevo').submit(function () {
            event.preventDefault();
            swal({
                title: "Registro de Pantalla",
                text: "Esta seguro que desea registrar esta pantalla?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Registrar',
                closeOnConfirm: false,
                closeOnCancel: true
            },
               function () {
                   $('#frmPaginaNuevo').submit();
               });

        });
    });
}

    function configurarPopUpEditar() {
        $(function () {
            $('#frmPaginaModificar').submit(function () {
                event.preventDefault();
                swal({
                    title: "Actualizar de Pantalla",
                    text: "Esta seguro que desea actualizar esta pantalla?",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Actualizar',
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                   function () {
                       $('#frmPaginaModificar').submit();
                   });

            });
        });
    }
function configurarGrilla() {

    var grilla = $('#gridlistapaginas');
    var pagergrilla = $('#gridlistapaginaspager');

var nombre = $('#nombre').val();

    var vdataurl = $(grilla).data("dataurl") + "?nom=" + nombre;

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['', 'Código', 'Nombre','Controlador','Acción' ,'Acciones' ],
        colModel:
        [
            { key: true, hidden: true, name: 'pag_int_id', index: 'pag_int_id' },
            { key: false, hidden: false, name: 'pag_str_codmenu', index: 'pag_str_codmenu', width: '70', align: 'left' },
            { key: false, hidden: false, name: 'pag_str_nombre', index: 'pag_str_nombre', width: '150', align: 'left' },
            { key: false, hidden: false, name: 'pag_str_controller', index: 'pag_str_controller', width: '150', align: 'left' },
            { key: false, hidden: false, name: 'pag_str_action', index: 'pag_str_action', width: '70', align: 'left' },
            { key: false, hidden: false, name: 'pag_int_id', index: 'pag_int_id', width: '120', align: 'center', formatter: bottoneditarpagina_formatter },

        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        pager: $('#gridlistapaginaspager'),
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

function bottoneditarpagina_formatter(cellvalue, options, rowObject)
{

    var acciones = $("<div class='btn-group'></div>");

    var control = $("<button></button>");
    control.append("<i class='fa fa-edit'></i>")
    control.attr("title" ,"Editar")
    control.addClass("btn btn-primary btn-xs btn-outline")
    control.attr("id", "lnk" + cellvalue);
    control.attr("onclick", "irEditarPagina('" + cellvalue + "')");

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
        title: "Eliminar Página",
        text: "¿Está seguro que desea eliminar la página?",
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
                   success: function (data)
                   {
                       if (data.res)
                       {
                           swal("¡Se elmininó con exito!", "", "success");
                             $("#modalcontainer").modal("hide");
                            reload();
                       } else {
                           swal({ title: "Error", text: data.mensaje, type: "error", confirmButtonText: "Aceptar" });
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

function irEditarPagina(id)
{
    var vUrl = $("#gridlistapaginas").data("edit") + "?id=" + id;
    $.get(vUrl, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        configurarPopUpNuevo();
        $('#btnActualizar').click(function (event) { btnActualizar(this, event); });   

    });
}

function btnActualizar(obj, event)
{
    var url = $(obj).data("url");
    var dataModelo = $('form').serialize();

    var padre = $('#pag_str_codmenu_padre').val();
    var nombre = $('#pag_str_nombre').val();
    var controller = $('#pag_str_controller').val();
    var action = $('#pag_str_action').val();
    var area = $('#pag_str_attributes').val();
    var sec = $('#pag_int_secuencia').val();

    validation($('#pag_int_secuencia'));
    validation($('#pag_str_codmenu_padre'));
    validation($('#pag_str_nombre'));
    validation($('#pag_str_controller'));
    validation($('#pag_str_action'));
    validation($('#pag_str_attributes'));

    if (padre == "" || nombre == "" || controller == "" || action == "" || area == "" || sec == "") {

        swal({ title: "Error", text: "Debe completar los datos requeridos", type: "error", confirmButtonText: "Aceptar" });
    }
    else {

        swal({
            title: "Editar Pantalla",
            text: "¿Está seguro que desea editar esta pantalla?",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Guardar',
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
                                    if (data.res == "1") {
                                        swal({ title: "Correcto", text: "Se registró correctamente", type: "success", confirmButtonText: "Aceptar" });
                                        $("#modalcontainer").modal("hide");
                                        reload();
                                    }
                                    else { swal({ title: "Error", text: "La página ya existe", type: "error", confirmButtonText: "Aceptar" }); }
                                },
                                error: function (request, status, error) {
                                    swal({ title: "Error", text: "Ocurrió un error al registrar", type: "error", confirmButtonText: "Aceptar" });
                                }
                            });
                }
            });
    }
}



function crearUsuario(obj)
{
    var vUrl = $(obj).data("url");
    $(window).attr("location", vUrl);
}
function copyFunction(e)
{
     $("#nombre").val($("#SearchDefault").val());
    
}
function buscarpagina()
{
   var grilla = $('#gridlistapaginas'); 
   var nombre = $('#nombre').val();
    

    var vdataurl = $(grilla).data("dataurl") + "?nom=" + nombre;
     $(grilla).jqGrid('setGridParam', {  url: vdataurl }).trigger('reloadGrid');

}

function BuscarModelo()
{
    var grilla = $('#gridlistapaginas'); 
    var vdataurl = $(grilla).data("dataurl");
     $(grilla).jqGrid('setGridParam', {  postData: getDataForm() , url: vdataurl }).trigger('reloadGrid');

}



function validation(obj) {
    if (obj.val() == "")
        obj.css('border-color', '#F3866F');
    else
        obj.css('border-color', '');
}


