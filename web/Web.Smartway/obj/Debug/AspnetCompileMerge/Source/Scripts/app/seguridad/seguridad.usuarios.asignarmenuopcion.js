
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
         "plugins" : [ "checkbox" ],
        'types': {
            'default': {
                'icon': 'fa fa-folder'
            },
            'html': {
                'icon': 'fa fa-file-code-o'
            },
        },


    });

 // $('#jstreemenu')
 //  // listen for event
 //  .on('changed.jstree', function (e, data) {
 //    var i, j, r = [];
 //    for(i = 0, j = data.selected.length; i < j; i++) {
 //      r.push(data.instance.get_node(data.selected[i]).text);
 //    }
 //    //$('#event_result').html('Selected: ' + r.join(', '));
 //    alert(r.join(','));
 //  })
 //  // create the instance
 //  .jstree();


    // $('#jstreemenu').on("select_node.jstree", function (e, data) {
    //     var vUrl = $('#btnGuardar').data("urlas") + "?id=" + data.node.data.idmenu;
    //     $.ajax(
    //         {
    //             type: "POST",
    //             async: true,
    //             url: vUrl,
    //             //data: dataModelo,
    //             success: function (data) {
    //                 // $("#CodigoMenu").val(data.cod);
    //                 // $("#NombreMenu").val(data.des);
    //
    //             },
    //             error: function (request, status, error) {
    //
    //                 //  swal({ title: "Error!", text: "Ocurrió un error al actualizar", type: "error", confirmButtonText: "Aceptar" });
    //             }
    //         });
    // });




    $("#jstreemenu li[role=treeitem]").each(function () {
        if ($(this).data("selectoption") == "True") {
          //  $(this).addClass("jstree-select-custom");
          //  $(this).addClass("jstree-select-custom");
            $('#jstreemenu').jstree("check_node", this);

        }
        else {
            $(this).removeClass("jstree-select-custom");
        }
        // if($(this).data("selected") == "True")
        // {
        //      $(this).addClass("jstree-clicked");
        // }
        // else {
        //     $(this).removeClass("jstree-clicked");
        // }

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


    // $("#jstreemenu")
    // .on('changed.jstree', function (e, data) {
    //     if (data && data.selected && data.selected.length)
    //     {
    //         llenarDatos(document.getElementById(data.selected));
    //     }
    //     else {
    //         //$('#data .content').hide();
    //         //$('#data .default').text('Select a file from the tree.').show();
    //     }
    // });



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

function llenarDatos(obj)
{
    var idmenutree = $(obj).data("idmenu");
    $("#idmenutree").val(idmenutree);
    $("#idmenutreeauto").val($(obj).attr("id"));

    var valormenutree = $(obj).find("input[type=hidden]");
    if (valormenutree.length > 0) $("#valormenutree").val($(valormenutree).val());


    var codmenu = $(obj).data("codmenu");
    var desmenu = $(obj).data("desmenu");
    var tipmenu = $(obj).data("tipomenu") == "M" ? "Menú" : "Item";
    var urlmenu = $(obj).data("url");

    var selectedmenu = getJsTreeHidden(idmenutree, 'data-selectoption');//$(obj).data("selectoption");
    var permisosmenu = getJsTreeHidden(idmenutree, 'data-permiso'); //$(obj).data("permiso") == undefined ? "" : $(obj).data("permiso");

    $("#CodigoMenu").val(codmenu);
    $("#NombreMenu").val(desmenu);
    $("#TipoMenu").val(tipmenu);
    $("#Url").val(urlmenu);

    var agregar = permisosmenu.indexOf("A") >= 0 ? 'check' : 'uncheck';
    var modificar = permisosmenu.indexOf("M") >= 0 ? 'check' : 'uncheck';
    var eliminar = permisosmenu.indexOf("E") >= 0 ? 'check' : 'uncheck';
    var consultar = selectedmenu.toLowerCase().indexOf("true") >= 0 ? 'check' : 'uncheck';


    $('#chkC').iCheck(consultar);

    $('#chkA').iCheck('enable');
    $('#chkM').iCheck('enable');
    $('#chkE').iCheck('enable');

    if ($(obj).data("tipomenu") == "I") {
        $('#chkA').iCheck(agregar);
        $('#chkM').iCheck(modificar);
        $('#chkE').iCheck(eliminar);
    } else {
        $('#chkA').iCheck('uncheck');
        $('#chkM').iCheck('uncheck');
        $('#chkE').iCheck('uncheck');

        $('#chkA').iCheck('disable');
        $('#chkM').iCheck('disable');
        $('#chkE').iCheck('disable');

    }







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
                            success: function (data) {
                                if (data.res == "1") {
                                    swal({ title: "Correcto", text: "Se actualizaron los permisos", type: "success", confirmButtonText: "Aceptar" });
                                }
                            },
                            error: function (request, status, error) {

                                swal({ title: "Error!", text: "Ocurrió un error al actualizar", type: "error", confirmButtonText: "Aceptar" });
                            }
                        });
            }
        });





    //  alert(elementsIds.substring(1,elementsIds.length-1));

}
function logArrayElements(elements)
{
    elementsIds = elementsIds + ',' +  elements.data.idmenu;
}
