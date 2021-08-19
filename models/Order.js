module.exports = (sequelize, Model, DataTypes) => {
  class Order extends Model {}
  Order.init(
    {
      productList: {
        type: DataTypes.STRING,
        allowNull: false,
        // quantity: {
        //   type: DataTypes.NUMBER,
        //   allowNull: false,
        // },
      },

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
