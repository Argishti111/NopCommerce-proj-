using FluentMigrator;
using Nop.Core.Domain.Catalog;

namespace Nop.Data.Migrations
{
    [NopMigration("2023/03/30 12:00:00:2551770", "Product. Add customer identifier", UpdateMigrationType.Data, MigrationProcessType.Update)]
    public class AddCustomerIdToProduct : AutoReversingMigration
    {
        /// <summary>Collect the UP migration expressions</summary>
        public override void Up()
        {
            Create.Column(nameof(Product.CustomerId))
            .OnTable(nameof(Product))
            .AsInt32()
            .Nullable()
            .ForeignKey(primaryTableName:"Customer",primaryColumnName:"Id");
        }
    }
}