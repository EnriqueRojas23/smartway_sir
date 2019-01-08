function validate_agregarsucursal()
{
      ignore: '*:not([name])', //Fixes your name issue
      rules : {
          codigo : {
          required : true,
          minlength: 3,
          //uniqueUserName: true
        },
        nombre : {
          required : true,
          minlength : 3,
          maxlength : 50,
        },
        idtiposucursal : {
          required : true
        },
        iddistrito : "required",
        direccion : "required",
        contacto : "required",
        email : "required",
        telefono : "required",
        idcondicionrecojo : "required",
        idcondicionentrega : "required",
        reparacion : "required",


      }
}
