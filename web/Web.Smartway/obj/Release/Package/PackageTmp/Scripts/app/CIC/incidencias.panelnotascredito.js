var oSolicitudesTable;

$(document).ready(function () {


    $("#btnBuscar").button()
                   .click(function (e)
                   {
                       oSolicitudesTable.draw();
                   });

    CargaListaSolicitudesCambio();
});

function CargaListaSolicitudesCambio()
{
    oSolicitudesTable =
       $('.dataTables-tblSolicitudes').DataTable({
           //responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "processing": true,
           "scrollY": "50vh",
           "scrollX": true,
           "serverSide": true,
           "stateSave" : true,
           "iDisplayLength": 25,
           "ajax":
               {
               "url": $('#tblSolicitudes').data("url"),
               "data": function ( d ) {
                   d.tienda = $('#tienda').val();
                   d.documento = $('#documento').val();
                   d.estado = $('#estado').val();
                   d.clasificacion = null;
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   { "key": true, "title": "Id", "data": "cp_int_id", "name": "cp_int_id", visible: true, "autoWidth": true, "class": "text-center" },
                   { "title": "Tienda", "data": "cp_str_tienda", "name": "cp_str_tienda", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "N° de Orden", "data": "documento", "name": "documento", "autoWidth": true, "class": "text-center",
                       "mRender":
                        function (data, type, full)
                        {
                            return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                        }
                   },
                   { "title": "Código", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true, "class": "text-center" },
                   { "title": "Descripción", "data": "pro_str_descripcion", "name": "pro_str_descripcion", "autoWidth": true, "class": "text-center" },
                   { "title": "Origen", "data": "clasificacion_taller", "name": "clasificacion_taller", "autoWidth": true, "class": "text-center" },
                   { "title": "BOL/FACT", "data": "tdoc_str_numero", "name": "tdoc_str_numero", "autoWidth": true, "class": "text-center" },
                   { "title": "Aprobado por", "data": "usuario_aprobacion", "name": "usuario_aprobacion", "autoWidth": true, "class": "text-center" },
                   { "title": "F. Aprobación", "data": "cp_dat_fechaprobacion", "name": "cp_dat_fechaprobacion", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Nota de Crédito", "data": "cp_str_notacredito", "name": "cp_str_notacredito", "autoWidth": true, "class": "text-center",
                       "mRender":
                       function (data, type, full)
                       {
                           if (data == "")
                           {
                               return  data ;
                           }
                           else {
                               return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                           }
                       }
                   },
                   {
                       "title": "N° Guia ", "data": "gui_str_numero", "name": "gui_str_numero", "autoWidth": true, "class": "text-center",
                       "mRender":
                       function (data, type, full)
                       {
                           if (data == "") {
                               return data;
                           }
                           else {
                               return "<span class='label label-warning'>" + " " + data + " " + "</span>";
                           }
                       }

                   },
                   { "title": "Fecha NCR", "data": "cp_dat_fechgeneracion", "name": "cp_dat_fechgeneracion", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "Estado", "data": "estado", "name": "estado", "autoWidth": true, "class": "text-center",
                        "mRender":
                         function (data, type, full) {
                             return "<span class='label " +  full.label_estado + "'>" + " " + data + " " + "</span>";
                         }
                   },
                   {
                       "title": "Acciones", "class": "text-center", "data": "cp_int_id", "sWidth": "15%", "mRender":

                        function (data, type, full)
                        {
                            if (full.cp_bit_generado == false && full.cp_bit_aprobado == true && full.cp_bit_anulado == false)
                            {
                                return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' class='btn-primary btn btn-xs btn-outline ' onclick='Generar(" + data + ");' > <i class='fa fa-check-circle'></i> Generar Nota de Crédito </button></div>";
                            }
                            else
                            {
                                return "<span class='label'> SIN ACCIONES</span>";
                              
                            }
                        }
                   },
           ],
           buttons: [
               { extend: 'copy' },
               { extend: 'csv' },
               { extend: 'excel', title: 'Solicitudes de Cambio de Mercadería'},
               { extend: 'pdf'  , title: 'Solicitudes de Cambio de Mercadería' },
               {
                   extend: 'print',
                   customize: function (win) {
                       $(win.document.body).addClass('white-bg');
                       $(win.document.body).css('font-size', '9px');

                       $(win.document.body).find('table')
                               .addClass('compact')
                               .css('font-size', 'inherit');
                   }
               }
           ]

       });
}

function Generar(solicitud)
{
    swal({
        title: "¿Desea generar la nota de crédito?",
        text: "Una vez generarada, se imprimira la nota de crédito en ofisis.",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, generar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
  function (isConfirm)
  {
      if (isConfirm)
      {
          swal({
              title: "¡Escanear DNI del vendedor!",
              text: "DNI",
              type: "input",
              showCancelButton: true,
              closeOnConfirm: false,
              animation: "slide-from-top",
              inputPlaceholder: "Ingresar o escanear número de DNI del vendedor"
          },
           function (inputValue)
           {
               if (inputValue === false)
               {
                   return false;
               }
               if (inputValue === "")
               {
                   swal.showInputError("¡Ingresar o escanear número de DNI!"); return false
               }
               if (inputValue.length != 8)
               {
                   swal.showInputError("¡El número de DNI debe tener 8 dígitos!"); return false
               }
               else
               {
                   var url = $('#tblSolicitudes').data("urlgen") + "?solicitud=" + solicitud + "&vendedor=" + inputValue;
                   $.ajax(
                   {
                       type: "POST",
                       async: true,
                       url: url,
                       success: function (data)
                       {
                           if (data.res == true)
                           {

                               swal({
                                   title: "¡Generada!",
                                   text: data.mensaje,
                                   type: "success",
                                   showCancelButton: false,
                                   confirmButtonClass: "btn-danger",
                                   confirmButtonText: "Aceptar",
                                   cancelButtonText: "Cancelar",
                                   closeOnConfirm: true,
                                   closeOnCancel: true
                               },
                                  function (isConfirm)
                                  {
                                      if (isConfirm)
                                      {
                                          oSolicitudesTable.draw();
                                      }
                                  });
                           }
                           else
                           {
                               swal({ title: "¡Error!", text: data.mensaje, type: "error", confirmButtonText: "Aceptar" });
                           }

                       },
                       error: function (request, status, error)
                       {
                           swal({ title: "¡Error!", text: "Ocurrió un error al generar la pre nota de crédito!", type: "error", confirmButtonText: "Aceptar" });
                       }
                   });

               }
           });
      }
  });
}
