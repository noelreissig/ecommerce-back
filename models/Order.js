module.exports = (sequelize, Model, DataTypes) => {
	class Order extends Model {}
	Order.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			deliveryAddress: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			deliveryCity: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			deliveryDepartment: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			deliveryPostalCod: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			deliveryDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "Pago Pendiente",
			},
			paymentMethod: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},

		{
			sequelize,
			modelName: "order",
		}
	);

	return Order;
};
