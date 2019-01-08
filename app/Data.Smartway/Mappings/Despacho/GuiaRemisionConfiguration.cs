

using Domain.Smartway.Despacho;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Despacho
{
   
    public class GuiaRemisionConfiguration : EntityTypeConfiguration<GuiaRemision>
    {
        public GuiaRemisionConfiguration()
            : base()
        {
            ToTable("despacho.guiaremision");
            HasKey(p => p.idguiaremision);
        }
    }
}
