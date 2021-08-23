module.exports = (sequelize, Model, DataTypes) => {
	const bcrypt = require("bcryptjs");

	class User extends Model {
		static async hashPassword(password) {
			return await bcrypt.hash(password, 10);
		}
		async validPassword(plaintextPassword) {
			return await bcrypt.compare(plaintextPassword, this.password);
		}
	}

	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
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
			address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phone: {
				type: DataTypes.INTEGER,
				allowNull: false,
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
			modelName: "user",
		}
	);
	// beforeCreate es una Hooks de Sequelize (funciones que se ejecutan solas en cierto momento)
	User.beforeCreate(async (user, options) => {
		user.password = await bcrypt.hash(user.password, 10);
	});

	return User;
};
