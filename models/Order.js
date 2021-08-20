module.exports = (sequelize, Model, DataTypes) => {
	class Order extends Model {}
	Order.init(
		{
			deliveryAddress: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			deliveryDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},

		{
			sequelize,
			modelName: "order",
		}
	);

	return Order;
};
