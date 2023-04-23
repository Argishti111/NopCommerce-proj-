using Nop.Web.Framework.Models;
using System.Collections.Generic;

namespace Nop.Web.Areas.Admin.Models.Customers
{
    /// <summary>
    /// Represents a product model to add to the customer
    /// </summary>
    public partial record AddProductToCustomerModel : BaseNopModel
    {
        #region Ctor

        public AddProductToCustomerModel()
        {
            SelectedProductIds = new List<int>();
        }
        #endregion

        #region Properties

        public int CustomerId { get; set; }

        public IList<int> SelectedProductIds { get; set; }

        #endregion
    }
}
