const axios = require('axios');
const quiz = require('../models/quizmodel');

require('dotenv').config();

const baseUrl = process.env.FETCH_BASEURL;
const tokenUrl = process.env.FETCH_TOKENURL;

module.exports = async function fetchData() {
	let response_code = 0;

	const token = await getToken();

	//fetch pages
	while (response_code != 1) {
		await axios
			.get(baseUrl, {
				params: {
					amount: 50,
					type: 'multiple',
					token: token,
					category: 21
				}
			})
			.then(res => {
				response_code = res.data.response_code;
				res.data.results.forEach(quizset => insertValues(quizset));
			})
			.catch(error => console.log(error));
	}

	console.log('=========FINISHED==========');
};

async function insertValues(data) {
	try {
		await quiz.create({
			question: data.question,
			option1: data.incorrect_answers[0],
			option2: data.incorrect_answers[1],
			option3: data.correct_answer,
			correct_answer: data.correct_answer
		});
	} catch (error) {
		console.log(error);
	}
}

async function getToken() {
	let token = '';
	await axios
		.get(tokenUrl, {
			params: {
				command: 'request'
			}
		})
		.then(res => {
			token = res.data.token;

			return token;
		})
		.catch(error => console.log(error));
}
