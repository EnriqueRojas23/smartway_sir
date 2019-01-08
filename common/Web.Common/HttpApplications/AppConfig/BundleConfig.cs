using System.Web.Optimization;

namespace Web.Common.HttpApplications.AppConfig
{
    public class BundleConfig
    {
        // Para obtener más información acerca de Bundling, consulte http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/plugins/jquery-ui/jquery-ui.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/messages_es_PE*",
                        "~/Scripts/jquery.validate*"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información sobre los formularios. De este modo, estará
            // preparado para la producción y podrá utilizar la herramienta de creación disponible en http://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/bootstrap/bootstrap.css",
                        "~/Content/bootstrap.extension.css",
                        "~/Content/ui.jqgrid.css",
                        "~/Content/website.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Scripts/plugins/jquery-ui/jquery-ui.css"));

            bundles.Add(new StyleBundle("~/Content/jqgrid").Include(
                        "~/Content/jqgrid/ui.jqgrid.css"));

            bundles.Add(new ScriptBundle("~/bundles/jqgrid").Include(
                       "~/Scripts/jqgrid/jquery.jqGrid.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqgrid/plugins").Include(
                        "~/Scripts/jqgrid/plugins/grid.addons.js",
                        "~/Scripts/jqgrid/plugins/grid.postext.js",
                        "~/Scripts/jqgrid/plugins/grid.setcolumns.js",
                        "~/Scripts/jqgrid/plugins/jquery.contextmenu.js",
                        "~/Scripts/jqgrid/plugins/jquery.searchFilter.js",
                        "~/Scripts/jqgrid/plugins/jquery.tablednd.js",
                        "~/Scripts/jqgrid/plugins/ui.multiselect.js"
                       ));
        }
    }
}