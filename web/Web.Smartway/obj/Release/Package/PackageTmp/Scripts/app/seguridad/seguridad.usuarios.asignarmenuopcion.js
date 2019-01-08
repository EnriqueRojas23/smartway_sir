
$(document).ready(function () {
    
    $('#jstreemenu').jstree({
         "checkbox" : {
      "keep_selected_style" : true
        },
        "core": {
            "check_callback": true,
            'themes': {
                'responsive': false
            }
        },
        "plugins": ['checkbox','types', 'dnd'],
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
        else{
            $(this).removeClass("jstree-select-custom");
        }
    });
      $("#jstreemenu a[role=presentation]").each(function () {
    
        if($(this).data("selected") == "True")
        {
             $(this).addClass("jstree-clicked");
        }
        else {
            $(this).removeClass("jstree-clicked");
        }
    });


    //ifChanged
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
    }).on('ifChanged', function (e)
    {
       // alert(e.type + ' callback');
       // $(e.target).click();
        var sC, sA ="", sM="", sE="";
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


});

function setJsTreeHidden(id, key, val) {

    var node = $("#jstreemenu").find("[data-idmenu=" + id + "]");
    var node_hidden = $(node).find("input[type=hidden]");
    var hidden = undefined;
    var strvalor = undefined;
    
    $.each(node_hidden, function (){
        if ($(this).val().indexOf('data-idmenu:' + id + '|') >= 0){
            hidden = $(this);
        }
    });
    if (hidden == undefined) return;
    strvalor = hidden.val();
    var array = strvalor.split("|");

    var strnuevovalor = "";
    for (var i = 0; i < array.length; i++)
    {
        if (array[i].indexOf(key) >= 0){
            array[i] = key + ":" + val;
        }
        strnuevovalor += array[i] + "|";
    }
    strnuevovalor = strnuevovalor.substring(0, strnuevovalor.length - 1);
    
    $.each(node_hidden, function () {
        if ($(this).val().indexOf('data-idmenu:' + id + '|') >= 0) {
            $(this).val(strnuevovalor);
        }
    });
}


function getJsTreeHidden(id, key) {
    var node = $("#jstreemenu").find("[data-idmenu=" + id + "]");
    var node_hidden = $(node).find("input[type=hidden]");
    var hidden = undefined;
    var strvalor = undefined;

    $.each(node_hidden, function () {
        if ($(this).val().indexOf('data-idmenu:' + id + '|') >= 0) {
            hidden = $(this);
        }
    });

    if (hidden == undefined) return;
    strvalor = hidden.val();
    var array = strvalor.split("|");

    for (var i = 0; i < array.length; i++) {
        if (array[i].indexOf(key) >= 0) {
            return array[i].split(':')[1];
        }
    }
}


function regresarListado(obj) {
    var vUrl = $(obj).data("url");
    $(document).attr("location", vUrl);
}


var elementsIds = '';
function Guardar(obj)
{
    elementsIds = '';
    var rol = $('#rol_int_id').val();
    
    //$("#jstreemenu").jstree().get_selected(true)[0].data.idmenu
    var ids = $("#jstreemenu").jstree().get_selected(true);

    ids.forEach(logArrayElements); 
    var vUrl = $(obj).data("url") + "?ids=" + elementsIds.substring(1,elementsIds.length) + "&rol=" + rol;
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
                            success: function (data)
                            {
                                if (data.res == "1")
                                {
                                    swal({ title: "Correcto", text: "Se actualizaron los permisos", type: "success", confirmButtonText: "Aceptar" });
                                }
                            },
                            error: function (request, status, error)
                            {
                                swal({ title: "¡Error!", text: "Ocurrió un error al actualizar", type: "error", confirmButtonText: "Aceptar" });
                            }
                        });
            }
        });
}
function logArrayElements(elements)
{
    elementsIds = elementsIds + ',' +  elements.data.idmenu;
}
