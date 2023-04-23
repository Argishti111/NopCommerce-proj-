using FluentMigrator;
using Nop.Core.Domain.Customers;

namespace Nop.Data.Migrations
{
    [NopMigration("2023/04/17 12:00:00:2551770", "Customer. Add return shipping address identifier", UpdateMigrationType.Data, MigrationProcessType.Update)]
    internal class AddReturnShippingAddressIdToCustomer : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Column(nameof(Customer.ReturnShippingAddressId))
            .OnTable(nameof(Customer))
            .AsInt32()
            .Nullable()
            .ForeignKey(primaryTableName: "Address", primaryColumnName: "Id");
        }
    }
}