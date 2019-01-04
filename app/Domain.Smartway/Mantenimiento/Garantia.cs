using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Smartway.Mantenimiento
{
    public class Garantia : Entity
    {
        [Key]
        public int idgarantia { get; set; }
        public int idpartner { get; set; }
        public int idfabricante { get; set; }
        public int idtipoproducto { get; set; }
        public int idtipogarantia { get; set; }
        public int periodo { get; set; }
        public bool documentocompra { get; set; }
        public bool reparacion { get; set; }
        public bool activo { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }


    }
}