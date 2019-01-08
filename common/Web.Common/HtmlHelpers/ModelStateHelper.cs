

using System.Collections;
using System.Web.Mvc;
using System.Linq;
using System.Collections.Generic;

namespace Web.Common.HtmlHelpers
{
    public static class ModelStateHelper
    {
        public static IEnumerable<Error> ErrorsDictionary(this ModelStateDictionary modelState)
        {
            if (modelState.IsValid) return null;
            var result = from ms in modelState
                         where ms.Value.Errors.Any()
                         let fieldKey = ms.Key
                         let errors = ms.Value.Errors
                         from error in errors
                         select new Error(fieldKey, error.ErrorMessage);
            return result;
        }

        public static IEnumerable Errors(this ModelStateDictionary modelState)
        {
            if (!modelState.IsValid)
            {
                return modelState.ToDictionary(kvp => kvp.Key,
                    kvp => kvp.Value.Errors
                                    .Select(e => e.ErrorMessage).ToArray())
                                    .Where(m => m.Value.Count() > 0);
            }
            return null;
        }

    }

    public class Error
    {
        public Error(string key, string message)
        {
            Key = key;
            Message = message;
        }

        private string Key { get; set; }
        private string Message { get; set; }
    }

}
