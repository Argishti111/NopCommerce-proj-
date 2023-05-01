using FluentMigrator;
using Nop.Core.Domain.Orders;

namespace Nop.Data.Migrations
{
    [NopMigration("2023/05/01 12:00:00:2551770", "Order. Add return shipping address identifier", UpdateMigrationType.Data, MigrationProcessType.Update)]
    internal class AddReturnShippingIdToOrder : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Column(nameof(Order.ReturnShippingAddressId))
            .OnTable(nameof(Order))
            .AsInt32()
            .Nullable()
            .ForeignKey(primaryTableName: "Address", primaryColumnName: "Id");
        }
    }
}
