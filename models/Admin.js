module.exports = (sequelize, Model, DataTypes) => {
	const bcrypt = require("bcryptjs");

	class Admin extends Model {
		static async hashPassword(password) {
			return await bcrypt.hash(password, 10);
		}
		async validPassword(plaintextPassword) {
			return await bcrypt.compare(plaintextPassword, this.password);
		}
	}

	Admin.init(
		{
			firstname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				Validite: { isEmail: true },
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			token: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: "admin",
		}
	);
	// beforeCreate es una Hooks de Sequelize (funciones que se ejecutan solas en cierto momento)
	Admin.beforeCreate(async (admin, options) => {
		admin.password = await bcrypt.hash(admin.password, 10);
	});

	return Admin;
};
