var listarusuario_frmsearch = "#form";
var gridlistausuario = "#gridlistausuario";
var gridlistausuariopager = "#gridlistausuariopager";

$(document).ready(function () {

    $.jgrid.defaults.height = 420;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.responsive = true;
    $('#btnNuevo').click(function (event) { btnNuevo_onclick(this, event); });
    configurarGrilla();
    mostrarMensajeResultado();
});

function btnActualizar_onclick(obj, event) {

    var url = $(obj).data("url");
    var dataModelo = $('form').serialize();
    var tipoacceso = $('#Usr_str_tipoacceso').val();
    var usrred = $('#Usr_str_red').val();
    var nombre = $('#Usr_str_nombre').val();
    var apellido = $('#Usr_str_apellidos').val();
    var email = $('#Usr_str_email').val();

    validation($('#Usr_str_email'));
    validation($('#Usr_str_red'));
    validation($('#Usr_str_nombre'));
    validation($('#Usr_str_apellidos'));

    if (tipoacceso == "" || usrred == "" || nombre == "" || apellido == "" ) {
               
        swal({ title: "Error", text: "Debe completar todos los datos correctamente", type: "error", confirmButtonText: "Aceptar" });
        if(tipoacceso == 'EX')
        {
            if(email == ""|| validationEmail($('#Usr_str_email'))==false)
            {
               swal({ title: "Error", text: "Debe completar todos los datos correctamente", type: "error", confirmButtonText: "Aceptar" });
            }
        }
    }
    else {
        swal({
            title: "Actualizar Usuario",
            text: "¿Está seguro que desea actualizar este usuario?",
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
                                if (data.res == "3") {
                                    swal({ title: "Error!", text: "El usuario ya existe", type: "error", confirmButtonText: "Aceptar" });
                                }
                                else if (data.res == "1") {
                                    swal({ title: "Correcto", text: "Se actualizó correctamente", type: "success", confirmButtonText: "Aceptar" });
                                    $("#modalcontainer").modal("hide");
                                    reload();

                                }
                            },
                            error: function (request, status, error) {

                                swal({ title: "Error!", text: "Ocurrió un error al registrar", type: "error", confirmButtonText: "Aceptar" });
                            }
                        });
            }
        });
    }
}



function btnRegistrar_onclick(obj, event) {

    var url = $(obj).data("url");
    var dataModelo = $('form').serialize();
    var tipoacceso = $('#Usr_str_tipoacceso').val();
    var usrred = $('#Usr_str_red').val();
    var nombre = $('#Usr_str_nombre').val();
    var apellido = $('#Usr_str_apellidos').val();
    var email = $('#Usr_str_email').val();
    var dni = $('#usr_str_dni').val();
    var pas = $('#usr_str_password').val();

    validation($('#Usr_str_email'));
    validation($('#Usr_str_red'));
    validation($('#Usr_str_nombre'));
    validation($('#Usr_str_apellidos'));
    validation($('#usr_str_dni'));
    validation($('#usr_str_password'));

  if(tipoacceso == 'AD')
  {     
      if (tipoacceso == "" || usrred == "" || nombre == "" || apellido == "" || dni == "" || pas == "")
      {
               
        swal({ title: "Error", text: "Debe completar todos los datos correctamente", type: "error", confirmButtonText: "Aceptar" });
    }
    else {
        swal({
            title: "Registro de Usuario",
            text: "¿Está seguro que desea registrar este usuario?",
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
                                if (data.res == "3") {
                                    swal({ title: "Error!", text: "El usuario ya existe", type: "error", confirmButtonText: "Aceptar" });
                                }
                                else if(data.res =="2") {
                                    swal({ title: "Correcto", text: "Se registró correctamente, pero no se envió el correo de manera satisfactoria", type: "success", confirmButtonText: "Aceptar" });
                                    $("#modalcontainer").modal("hide");
                                    reload();

                                }
                                else if (data.res == "1") {
                                    swal({ title: "Correcto", text: "Se registró correctamente", type: "success", confirmButtonText: "Aceptar" });
                                    $("#modalcontainer").modal("hide");
                                    reload();

                                }
                            },
                            error: function (request, status, error) {
                           
                                swal({ title: "Error!", text: "Ocurrió un error al registrar", type: "error", confirmButtonText: "Aceptar" });
                            }
                        });
            }
        });
    }
}
    else 
    {

         if (tipoacceso == "" || usrred == "" || nombre == "" || apellido == "" || email == "" || validationEmail($('#Usr_str_email'))==false ) {
                       
                swal({ title: "Error", text: "Debe completar todos los datos correctamente", type: "error", confirmButtonText: "Aceptar" });
            }
            else {


                swal({
                    title: "Registro de Usuario",
                    text: "¿Está seguro que desea registrar este usuario?",
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
                                        if (data.res == "3") {
                                            swal({ title: "Error!", text: "El usuario ya existe", type: "error", confirmButtonText: "Aceptar" });
                                        }
                                        else if(data.res =="2") {
                                            swal({ title: "Correcto", text: "Se registró correctamente, pero no se envió el correo de manera satisfactoria", type: "success", confirmButtonText: "Aceptar" });
                                            $("#modalcontainer").modal("hide");
                                            reload();

                                        }
                                        else if (data.res == "1") {
                                            swal({ title: "Correcto", text: "Se registró correctamente", type: "success", confirmButtonText: "Aceptar" });
                                            $("#modalcontainer").modal("hide");
                                            reload();

                                        }
                                    },
                                    error: function (request, status, error) {
                                   
                                        swal({ title: "Error!", text: "Ocurrió un error al registrar", type: "error", confirmButtonText: "Aceptar" });
                                    }
                                });
                    }
                });
    }
}


}
function reload()
{
    var vdataurl = $(gridlistausuario).data("dataurl");
    $(gridlistausuario).jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}


function btnNuevo_onclick(obj, event) {
    var url = $(obj).data("url");

    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        configurarPopUpNuevo();

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });

        $('#btnRegistrar').click(function (event) { btnRegistrar_onclick(this, event); });
    });
}
function modificarUsuario(obj, id)
{
    var grilla = $(gridlistausuario);
    var url = grilla.data("edit") + "?id=" + id;

    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        configurarPopUpEditar();

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });

        $('#btnActualizar').click(function (event) { btnActualizar_onclick(this, event); });
    });
}
function mostrarMensajeResultado()
{
    if ($("#hdfMensaje").val()) {
        var mensaje = $("#hdfMensaje").val();
        if ($('#hdfexito').val() == "1") {
            swal("¡Registro Correcto!", mensaje, "success");
        }
        else
        {
            swal({ title: "Verificar", text: "El usuario ya existe", type: "error", confirmButtonText: "Aceptar" });
        }
    }
}

function configurarPopUpNuevo()
{
    $('#show-hide-passwd').on('click', function (e) {
        e.preventDefault();
        var current = $(this).attr('action');
        if (current == 'hide') {
            $(this).prev().attr('type', 'text');
            $(this).removeClass('input-group-addon').addClass('input-group-addon').attr('action', 'show');
            $("#iVerPas").removeClass('glyphicon glyphicon-eye-open').addClass('glyphicon glyphicon-eye-close');
        }
        if (current == 'show')
        {
            $(this).prev().attr('type', 'password');
            $(this).removeClass('input-group-addon').addClass('input-group-addon').attr('action', 'hide');
            $("#iVerPas").removeClass('glyphicon glyphicon-eye-close').addClass('glyphicon glyphicon-eye-open');
        }
    })

    var options1 = {};
    options1.ui = {
        container: "#pwd-container1",
        showVerdictsInsideProgressBar: true,
        viewports: {
            progress: ".pwstrength_viewport_progress"
        }
    };
    options1.common = {
        debug: false,
    };
    $('.pswstrusuario').pwstrength(options1);



    $(function ()
    {
        $('#frmUsuarioNuevo').submit(function () {
            event.preventDefault();
            swal({
                title: "Registro de Usuario",
                text: "¿Está seguro que desea registrar este usuario?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Registrar',
                closeOnConfirm: false,
                closeOnCancel: true
            },
               function () {
                   $('#frmUsuarioNuevo').submit();
               });

        });
    });
}

function configurarPopUpEditar()
{
    $('#show-hide-passwdedit').on('click', function (e) {
        e.preventDefault();
        var current = $(this).attr('action');
        if (current == 'hide') {
            $(this).prev().attr('type', 'text');
            $(this).removeClass('input-group-addon').addClass('input-group-addon').attr('action', 'show');
            $("#iVerPasedit").removeClass('glyphicon glyphicon-eye-open').addClass('glyphicon glyphicon-eye-close');
        }
        if (current == 'show') {
            $(this).prev().attr('type', 'password');
            $(this).removeClass('input-group-addon').addClass('input-group-addon').attr('action', 'hide');
            $("#iVerPasedit").removeClass('glyphicon glyphicon-eye-close').addClass('glyphicon glyphicon-eye-open');
        }
    })

    var options1 = {};
    options1.ui = {
        container: "#pwd-containeredit",
        showVerdictsInsideProgressBar: true,
        viewports: {
            progress: ".pwstrength_viewport_progressedit"
        }
    };
    options1.common = {
        debug: false,
    };
    $('.pswstrusuarioedit').pwstrength(options1);


    $(function ()
    {
        $('#frmUsuarioModificar').submit(function ()
        {
            event.preventDefault();
            swal({
                title: "Actualizar Usuario",
                text: "¿Está seguro que desea actualizar este usuario?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Registrar',
                closeOnConfirm: false,
                closeOnCancel: true
            },
               function ()
               {
                   $('#frmUsuarioModificar').submit();
               });

        });
    });
}

function configurarGrilla() {

    var nombre = $('#NombreCompleto').val()
    var rol = $('#IdRol').val();
    var grilla = $(gridlistausuario);
    var pagergrilla = $(gridlistausuariopager);
    var vdataurl = $(grilla).data("dataurl") + "?nom=" + nombre + "&rol=" + rol;

    $(grilla).jqGrid({
        url: vdataurl,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['','Usuario', 'Nombres', 'Apellidos', 'Correo Electronico',  'Último Ingreso','Tienda', 'Bloqueado','Acciones'],
        colModel:
        [
            { key: true, hidden: true, name: 'usr_int_id', index: 'usr_int_id' },
            { key: false, hidden: false, name: 'usr_str_red', index: 'usr_str_red', width: '120', align: 'left' },
            { key: false, hidden: false, name: 'usr_str_nombre', index: 'usr_str_nombre', width: '140', align: 'left' },
            { key: false, hidden: false, name: 'usr_str_apellidos', index: 'usr_str_apellidos', width: '140', align: 'left' },
            { key: false, hidden: false, name: 'usr_str_email', index: 'usr_str_email', width: '200', align: 'left' },
            { key: false, hidden: false, name: 'usr_dat_ultfeclogin', index: 'usr_dat_ultfeclogin', width: '120', align: 'center', formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' } },
            { key: false, hidden: false, name: 'usr_str_tienda', index: 'usr_str_tienda', width: '80', align: 'center'},
            { key: false, hidden: false, name: 'usr_int_bloqueado', index: 'usr_int_bloqueado', width: '80', align: 'center', formatter: formateditb },
            { key: false, hidden: false, name: 'usr_int_id', index: 'usr_int_id', width: '180', align: 'center', formatter: bottonaAcciones_formatter }

        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        pager: $(gridlistausuariopager),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        emptyrecords: CONFIG_JQGRID.get('emptyrecords'),
        autoheight: true,
        autowidth: true,
        shrinkToFit: true,
        beforeRequest: function ()
        {
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
function formateditb (cellvalue, options, rowObject)
{
    if (cellvalue == "0")
    {
       return "<i class='fa fa-square-o'></i>";
    }
    else if (cellvalue == "1")
    {
       return "<i class='fa fa-check-square-o'></i>";
    }

  
}
function formatedit (cellvalue, options, rowObject)
{
    if (cellvalue == "Activo")
    {
       return "<span class='label label-success'>" + " " + cellvalue + " " + "</span>";
    }
    else if (cellvalue == "Eliminado")
    {
       return "<span class='label label-danger'>" + " " + cellvalue + " " + "</span>";
    }

  
}
function getDataForm() {
    var form = $('form');
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


function bottonaAcciones_formatter(cellvalue, options, rowObject)
{
    var acciones = $("<div class='btn-group'></div>");

    var control = $("<button></button>");
    control.append("<i class='fa fa-check-circle'></i>")
    control.attr("title", "Asignar Rol");
    control.addClass("btn btn-primary btn-xs btn-outline")
    control.attr("id", "lnk" + cellvalue);
    control.attr("onclick", "irAsignarRol('" + cellvalue + "')");

    var btnGridM = $("#templatemod").clone(false)[0];
    $(btnGridM).attr("id", "btngrid_mod_" + cellvalue);
    $(btnGridM).attr("onclick", "modificarUsuario(this, " + cellvalue + ")");
    $(btnGridM).show();

    var btnGridR = $("#templatereset").clone(false)[0];
    $(btnGridR).attr("id", "btngrid_reset_" + cellvalue);
    $(btnGridR).attr("onclick", "resetearPwd(this, " + cellvalue + ")");
    $(btnGridR).show();


    var btnGridT = $("#templatetrash").clone(false)[0];
    $(btnGridT).attr("id", "btngrid_trash_" + cellvalue);
    $(btnGridT).attr("onclick", "eliminarUsuario(this, " + cellvalue + ")");
    $(btnGridT).show();

    acciones.append(control);
    acciones.append(btnGridM.outerHTML);
    acciones.append(btnGridR.outerHTML);
    acciones.append(btnGridT.outerHTML);
    var htmlcontrol = acciones[0].outerHTML;
    return htmlcontrol
}


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

function desbloquearUsuario(obj,id)
{
     var vUrl = $(obj).data("url");
    swal({
        title: "Desbloquear Usuario",
        text: "¿Está seguro que desea desbloquear este usuario?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Desbloquear',
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
                       if (data.success) {
                           swal("¡Se ha desbloqueado correctamente!", data.msj, "success");
                           $("#modalcontainer").modal("hide");
                            reload();

                       } else {
                           swal({ title: "Error", text: data.msj , type: "error", confirmButtonText: "Aceptar" });
                       }
                   },
                   error: function (data) {
                       alert(data.error.toString());
                   }
               });
           }
     });
}
function eliminarUsuario(obj, id)
{
    var vUrl = $(obj).data("url");
    swal({
        title: "Eliminar Usuario",
        text: "¿Está seguro que desea eliminar este usuario?",
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
                       if (data.success)
                       {
                           swal("¡Se ha eliminado correctamente!", data.msj, "success");
                           $("#modalcontainer").modal("hide");
                            reload();

                       } else {
                           swal({ title: "Error", text: data.msj , type: "error", confirmButtonText: "Aceptar" });
                       }
                   },
                   error: function (data)
                   {
                       alert(data.error.toString());
                   }
               });
           }
     });
}

function bottonmodificarusr_formatter(cellvalue, options, rowObject)
{
    var btnGrid = $("#templatemod").clone(false)[0];
    $(btnGrid).attr("id", "btngrid_mod_" + cellvalue);
    $(btnGrid).attr("onclick", "modificarUsuario(this, " + cellvalue + ")");
    $(btnGrid).show();
    return btnGrid.outerHTML;
}


function bottonrestablecerpwd_formatter(cellvalue, options, rowObject)
{
    var btnGrid = $("#templatereset").clone(false)[0];
    $(btnGrid).attr("id", "btngrid_reset_" + cellvalue);
    $(btnGrid).attr("onclick", "resetearPwd(this, " + cellvalue + ")");
    $(btnGrid).show();
    return btnGrid.outerHTML;
}



function resetearPwd(obj, id)
{
    var vUrl = $(obj).data("url");
    swal({
        title: "Resetear Contraseña",
        text: "¿Está seguro que resetear la contraseña?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Generar',
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
                           swal("¡Se ha enviado un correo al usuario!", data.msj, "success");
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

function irAsignarRol(id)
{
    var url = $(gridlistausuario).data("urlasig") + "?id=" + id;

    $.get(url, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        configurarGrilla_RolesDisponibles();
        configurarGrilla_RolesAsignados();

        var dlbRoles = $('select[name="RolesSeleccionados"]').bootstrapDualListbox({

            nonSelectedListLabel: 'Roles Disponibles',
            selectedListLabel: 'Roles Asignados',
            showFilterInputs: true,
            moveOnSelect: true,
            selectorMinimalHeight: 200
        });
    });

}

function crearUsuario(obj)
{
    var vUrl = $(obj).data("url");
    $(window).attr("location", vUrl);
}

function buscarusuarios()
{
   var nombre = $('#NombreCompleto').val()
   var rol = $('#IdRol').val();
   var grilla = $("#gridlistausuario");
   var vdataurl = $(grilla).data("dataurl") + "?nom=" + nombre + "&rol=" + rol;
   $(grilla).jqGrid('setGridParam', { url: vdataurl  }).trigger('reloadGrid');
   //$(grilla).jqGrid('setGridParam', { url: vdataurl, postData:getDataForm()  }).trigger('reloadGrid');
   reload();
}
function recargar()
{
    var grilla = $("#gridlistausuario");
    var dataModelo = $('form').serialize();
    var vdataurl = $(grilla).data("dataurl");
    $(grilla).jqGrid('setGridParam', { url: vdataurl, postData:getDataForm()  }).trigger('reloadGrid');
}

function validation(obj) {
    if (obj.val() == "")
        obj.css('border-color', '#F3866F');
    else
        obj.css('border-color', '');
}