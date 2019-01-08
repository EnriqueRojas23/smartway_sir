using Domain.Smartway.Seguridad;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;

namespace Data.Smartway.Mappings.Seguridad
{
    public class RolConfiguration : EntityTypeConfiguration<Rol>
    {
        public RolConfiguration() : base()
        {
            ToTable("seguridad.tbl_seg_rol");

            HasKey(p => p.rol_int_id);
            //Property(p => p.rol_int_id).IsRequired();
        }

    }
}
