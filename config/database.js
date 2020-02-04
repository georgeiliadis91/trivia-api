const Sequelize = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: 'localhost',
		dialect: 'postgres',
		subQuery: false,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		define: {
			timestamps: false
		}
	}
);
