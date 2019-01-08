var listarusuario_frmsearch = "#frmSearchListado";

var gridlistarol = "#gridlistarol";
var gridlistarolpager = "#gridlistarolpager";

$(document).ready(function () {


    $.jgrid.defaults.height  = 370;
    $.jgrid.defaults.responsive = true;
    $('#btnNuevo').click(function (event) { btnNuevo_onclick(this, event); });
    configurarGrilla();
});

function btnNuevo_onclick(obj, event)
{
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


function btnRegistrar_onclick(obj, event)
{
    var url = $(obj).data("url");
    var dataModelo = $('form').serialize();
    var descrip = $('#rol_str_descrip').val();
    var alias = $('#rol_str_alias').val();
    var usuario = $('#rol_str_usuario').val();

    validation($('#rol_str_descrip'));
    validation($('#rol_str_alias'));
    validation($('#rol_str_usuario'));
       


    if (descrip == "" || alias == "" || usuario == "")
    {
        swal({ title: "Error", text: "Debe completar los datos correctamente", type: "error", confirmButtonText: "Aceptar" });
    }
    else {


        swal({
            title: "Registro de Rol",
            text: "¿Está seguro que desea registrar este rol?",
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
                                if (data.res) {

                                    swal({ title: "Correcto", text: "Se registró correctamente", type: "success", confirmButtonText: "Aceptar" });
                                     $("#modalcontainer").modal("hide");
                                    reload();
                                }
                              
                                else {
                                    swal({ title: "Error!", text: "El rol ya existe", type: "error", confirmButtonText: "Aceptar" });

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

function reload()
{
    var vdataurl = $('#gridlistarol').data("dataurl");
    $('#gridlistarol').jqGrid('setGridParam', { url: vdataurl }).trigger('reloadGrid');
}
function configurarPopUpNuevo()
{
    $(function () {
        $('#frmUsuarioNuevo').submit(function () {
            event.preventDefault();
            swal({
                title: "Registro de Rol",
                text: "¿Está seguro que desea registrar este Rol?",
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
function configurarGrilla()
{
    var grilla = $(gridlistarol);
    var pagergrilla = $(gridlistarolpager);
    var nombre = $('#NombreRol').val();
    var vdataurl = $(grilla).data("dataurl") + '?nom=' + nombre;

    $(grilla).jqGrid({
        url: vdataurl,
        responsive:true,
        datatype: 'json',
        mtype: 'POST',
        colNames: ['','Nombre del Rol', 'Alias del Rol','Activo','Acciones',],
        colModel:
        [
            { key: true,  hidden: true,  name: 'rol_int_id', index: 'rol_int_id' },
            { key: false, hidden: false, name: 'rol_str_alias', index: 'rol_str_alias',  align: 'left' },
            { key: false, hidden: false, name: 'rol_str_descrip', index: 'rol_str_descrip',  align: 'left' },
            { key: false, hidden: false, name: 'rol_bit_activo', index: 'rol_bit_activo', width: '50', align: 'center', formatter: "checkbox"},
            { key: false, hidden: false, name: 'rol_int_id', index: 'rol_int_id', width: '100', align: 'center', formatter: bottonasignarrol_formatter }

        ],
        jsonReader: CONFIG_JQGRID.get('jsonReader'),
        pager: $(gridlistarolpager),
        rowNum:10,
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
            })
            $self.jqGrid('setGridParam', { postData: postData });
        },

    });

}

function getDataForm()
{
    var form = $(listarusuario_frmsearch);
    return form.serializeArray();
}

function btnlistarbusquedasecundario_onclick(searchdefault)
{
    var form = $.find("form[data-typeform=search]");
    if (form == null || form == undefined || form.length <= 0) return;

    var controles = $(form).find("[data-ctrlsearch]");
    if (controles == null || controles == undefined || controles.length <= 0) return;

    var strfiltro = "";
    $.each(controles, function () {
        var valor = $.trim($(this).val());
        var nombre = $(this).data("ctrlsearch");

        if (valor != "")
        {
            strfiltro = strfiltro + " {" + nombre + ":" + valor + "}";
        }
    })

    if (searchdefault != undefined) $(searchdefault).val(strfiltro);
}


function bottonasignarrol_formatter(cellvalue, options, rowObject)
{
    var acciones = $("<div class='btn-group'></div>");
    var control = $("<button></button>");
    control.append("<i class='fa fa-check-circle'></i>")
    control.attr("title", "Asignar Opciones");
    control.addClass("btn btn-primary btn-xs btn-outline")
    control.attr("id", "lnk" + cellvalue);
    control.attr("onclick", "irAsignarMenuOpcion('" + cellvalue + "')");

    var btnGridM = $("#templatemod").clone(false)[0];
    $(btnGridM).attr("id", "btngrid_mod_" + cellvalue);
    $(btnGridM).attr("onclick", "irModificarRol(this, " + cellvalue + ")");
    $(btnGridM).show();



    var btnGridT = $("#templatetrash").clone(false)[0];
    $(btnGridT).attr("id", "btngrid_trash_" + cellvalue);
    $(btnGridT).attr("onclick", "eliminarRol(this, " + cellvalue + ")");
    $(btnGridT).show();

    acciones.append(control);
    acciones.append(btnGridT.outerHTML);
    acciones.append(btnGridM.outerHTML);

    var htmlcontrol = acciones[0].outerHTML;
    return htmlcontrol
}
function eliminarRol(obj,id)
{
    var vUrl = $(obj).data("url");
    swal({
        title: "Eliminar Rol",
        text: "¿Está seguro que desea eliminar el Rol?",
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
                       }
                       else
                       {
                           swal({ title: "Error", text: data.mensaje, type: "error", confirmButtonText: "Aceptar" });
                       }
                   },
                   error: function (data)
                   {
                       swal({ title: "Error", text: data.error.toString() , type: "error", confirmButtonText: "Aceptar" });
                   }
               });
           }
     });
}

function irModificarRol(obj,id)
{
     var vUrl = $(gridlistarol).data("edit") + "?id=" + id;
    $.get(vUrl, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        configurarPopUpNuevo();

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });

        $('#btnActualizar').click(function (event) { btnActualizar_onclick(this, event); });   

    });
}
function btnActualizar_onclick(obj,event )
{
    var url = $(obj).data("url");
    var dataModelo = $('form').serialize();

    var descrip = $('#rol_str_descrip').val();
    var alias = $('#rol_str_alias').val();
    var usuario = $('#rol_str_usuario').val();

    validation($('#rol_str_descrip'));
    validation($('#rol_str_alias'));
    validation($('#rol_str_usuario'));
       
    if (descrip == "" || alias == ""  || usuario =="") {
        swal({ title: "Error", text: "Debe completar los datos correctamente", type: "error", confirmButtonText: "Aceptar" });
    }
    else {
        swal({
            title: "Actualizar Rol",
            text: "¿Está seguro que desea actualizar este rol?",
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
                                if (data.res) {

                                    swal({ title: "Correcto", text: "Se actualizó correctamente", type: "success", confirmButtonText: "Aceptar" });
                                     $("#modalcontainer").modal("hide");
                                    reload();
                                }
                              
                                else {
                                    swal({ title: "Error!", text: "El rol ya existe", type: "error", confirmButtonText: "Aceptar" });

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

function irAsignarMenuOpcion(id)
{
    var vUrl = $(gridlistarol).data("urlasig") + "?id=" + id;  
    //$(document).attr("location", vUrl);
    $.get(vUrl, function (data) {
        $("#modalcontent").html(data);
        $("#modalcontainer").modal("show");
        configurarPopUpAsignar();
    });

}
function buscarrol()
{
    var grilla = $('#gridlistarol'); 
    var nombre = $('#NombreRol').val();    
    var vdataurl = $(grilla).data("dataurl") + '?nom=' + nombre;

    $(grilla).jqGrid('setGridParam', {  url: vdataurl }).trigger('reloadGrid');
    
}

function validation(obj) {
    if (obj.val() == "")
        obj.css('border-color', '#F3866F');
    else
        obj.css('border-color', '');
}

function configurarPopUpAsignar()
{
    $('#jstreemenu').jstree({
        "checkbox": {
            "keep_selected_style": true
        },
        "core": {
            "check_callback": true,
            'themes': {
                'responsive': false
            }
        },
        "plugins": ['checkbox', 'types', 'dnd'],
        'types': {
            'default': {
                'icon': 'fa fa-folder'
            },
            'html': {
                'icon': 'fa fa-file-code-o'
            },
            'svg': {
                'icon': 'fa fa-file-picture-o'
            },
            'css': {
                'icon': 'fa fa-file-code-o'
            },
            'img': {
                'icon': 'fa fa-file-image-o'
            },
            'js': {
                'icon': 'fa fa-file-text-o'
            }
        },
    });


    $("#jstreemenu li[role=treeitem]").each(function () {
        if ($(this).data("selectoption") == "True") {
            $(this).addClass("jstree-select-custom");
            $(this).addClass("jstree-select-custom");
            $('#jstreemenu').jstree("check_node", this);
        }
        else {
            $(this).removeClass("jstree-select-custom");
        }
    });
    $("#jstreemenu a[role=presentation]").each(function () {

        if ($(this).data("selected") == "True") {
            $(this).addClass("jstree-clicked");
        }
        else {
            $(this).removeClass("jstree-clicked");
        }
    });

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
    }).on('ifChanged', function (e) {
        var sC, sA = "", sM = "", sE = "";
        sC = e.currentTarget.checked;

        if ($.trim($("#idmenutree").val()) == "") return;
        var jstreenode = $("#jstreemenu").find("[data-idmenu=" + $("#idmenutree").val() + "]");

        $(jstreenode).data("selectoption", sC);
        setJsTreeHidden($("#idmenutree").val(), 'data-selectoption', sC);
        if ($("#chkA").is(":checked")) sA = "A";
        if ($("#chkM").is(":checked")) sM = "M";
        if ($("#chkE").is(":checked")) sE = "E";


        setJsTreeHidden($("#idmenutree").val(), 'data-permiso', sA + sM + sE);

    });

}

var elementsIds = '';

function GuardarAsignacion(obj) {
    elementsIds = '';
    var rol = $('#rol_int_id').val();

    //$("#jstreemenu").jstree().get_selected(true)[0].data.idmenu
    var ids = $("#jstreemenu").jstree().get_selected(true);

    ids.forEach(logArrayElements);
    var vUrl = $(obj).data("url") + "?ids=" + elementsIds.substring(1, elementsIds.length) + "&rol=" + rol;
    swal({
        title: "Actualizar Permisos",
        text: "¿Está seguro que desea actualizar los permisos?",
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
                            url: vUrl,
                            //data: dataModelo,
                            success: function (data) {
                                if (data.res == "1") {
                                    swal({ title: "Correcto", text: "Se actualizaron los permisos", type: "success", confirmButtonText: "Aceptar" });
                                }
                            },
                            error: function (request, status, error) {
                                swal({ title: "¡Error!", text: "Ocurrió un error al actualizar", type: "error", confirmButtonText: "Aceptar" });
                            }
                        });
            }
        });
}
function logArrayElements(elements)
{
    elementsIds = elementsIds + ',' + elements.data.idmenu;
}
