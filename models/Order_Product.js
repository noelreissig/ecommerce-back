module.exports = (sequelize, Model, DataTypes) => {
	class Order_Product extends Model {}

	Order_Product.init(
		{
			quantity: {
				type: DataTypes.INTEGER,
			},
			unitPrice: {
				type: DataTypes.DECIMAL(10, 2),
			},
		},
		{
			sequelize,
			modelName: "Order_Product",
		}
	);

	return Order_Product;
};
