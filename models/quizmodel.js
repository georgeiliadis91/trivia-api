const Sequelize = require('sequelize');
const db = require('../config/database');

const quiz = db.define('quizdata', {
	difficulty: {
		type: Sequelize.STRING
	},
	question: {
		type: Sequelize.STRING
	},
	option1: {
		type: Sequelize.STRING
	},
	option2: {
		type: Sequelize.STRING
	},
	option3: {
		type: Sequelize.STRING
	},
	correct_answer: {
		type: Sequelize.STRING
	}
});

module.exports = quiz;
