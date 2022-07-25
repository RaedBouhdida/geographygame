const qa = [
	{
		question: "Which country is not on the equator",
		correct: "Equatorial Guinea",
		incorrect: ["Maldives", "Ecuador", "Sao Tome & Principe", "Gabon"]
	},
	{
		question: "Brazil borders every country in South America but",
		correct: "Chile and Ecuador",
		incorrect: ["Chile and paraguay", "Uruguay and Peru", "Bolivia and Chile", "Ecuador and Uruguay"]
	},
	{
		question: "Mandarin is the most spoken language worldwide what's second",
		correct: "Spanish",
		incorrect: ["English", "French", "Arabic", "Hindi"]
	},
	{
		question: "Which London landmarks is not a UNESCO World Heritage site?",
		correct: "Tower Bridge",
		incorrect: ["Tower of London", "Palace of Westminster", "Giant's Causeway"]
	},
	{
		question: "Which of these is not an African capital",
		correct: "Lagos(Nigeria)",
		incorrect: ["Dakar(Senegal)", "Juba(South Sudan)", "Maputo(mozambique)", "Accra(Ghana)"]
	},
	{
		question: "Which Flag has the most colors",
		correct: "Belize",
		incorrect: ["Guatemala", "Andorra", "Portugal", "South Sudan"]
	},
	{
	    question: "the Amazon river doesn't cross what country",
		correct: "Chile",	
		incorrect: ["Peru", "Venezuela", "Bolivia", "Ecuador"]
    },
	{
		question: "What country has the most time zones",
		correct: "France",
		incorrect: ["Russia", "United States", "Canada", "China"]
    },
	{
		question: "What's the smallest US state",
		correct: "Rhode Island",
		incorrect: ["Conneticut", "Verrmont", "New Jersey", "Delaware"]
	},
	{
		question: "How many countries begin with 'United'",
		correct: "3",
		incorrect: ["2", "4", "5", "6"]
	},	
];

const answerContainer = document.querySelector(".a");
const questionCon = document.querySelector(".q");
const question = document.querySelector(".q-item");
const bar = document.querySelector(".bar");
const barContainer = document.querySelector(".progressBar");
const progressBar = document.querySelector(".bar-w");
const next = document.querySelector(".nextodd");
const startBtn = document.querySelector(".start-game");
const check = document.querySelector("result-cor")
const questions = [];
const player = { score: 0, answers: [] };
let cur = 0;
const holder = [];

(() => {
	loadQuestions();
})();

function loadQuestions() {
	qa.forEach((e) => {
		let temp = [];
		e.incorrect.forEach((ans) => {
			let obj = {
				response: ans,
				correct: false
			};
			temp.push(obj);
		});

		let obj = {
			response: e.correct,
			correct: true
		};
		temp.push(obj);
		let mainTemp = {
			question: e.question,
			options: temp,
			correct: e.correct
		};
		questions.push(mainTemp);
	});
}

function newQuestion() {
	if (cur >= questions.length) {
		next.innerHTML = "View Score";
		results();
	} else {
		next.innerHTML = "Next Question";
	}
	answerContainer.innerHTML = "";
	const el = questions[cur];
	progess();
	console.log(el);
	el.options.sort(() => {
		return 0.5 - Math.random();
	});

	const capQuestion = el.question.charAt(0).toUpperCase() + el.question.slice(1);
	question.textContent = `${capQuestion}?`;
	answerContainer.innerHTML = "";

	el.options.forEach((option) => {
		const divOption = document.createElement("div");
		holder.push(divOption);
		divOption.correctAnswer = el.correct;
		divOption.que = capQuestion;
		divOption.isITcorrect = option.correct;
		divOption.classList.add("a-item");
		divOption.textContent = option.response;
		answerContainer.append(divOption);
		divOption.addEventListener("click", optSelect);
	});
}

function optSelect(e) {
	endTurn();
	if (e.target.isITcorrect) {
		player.score++;
		let obj = {
			que: e.target.que,
			res: e.target.textContent,
			correct: true,
			qNum: cur
		};
		player.answers.unshift(obj);
		e.target.style.color = "#008205";
		e.target.style.backgroundColor = "#dbfff3";
	} else {
		let obj = {
			que: e.target.que,
			res: e.target.textContent,
			correct: false,
			qNum: cur
		};
		player.answers.unshift(obj);
		e.target.style.color = "#e91e63";
		e.target.style.backgroundColor = "#ffd3e2";
	}
	e.target.style.cursor = "pointer";
}

function endTurn() {
	holder.forEach((el) => {
		el.removeEventListener("click", optSelect);
		el.style.backgroundColor = "#ffffff05";
		el.style.color = "#565656";
		el.style.cursor = "default";
	});

	cur++;
	if (cur >= questions.length) {
		next.innerHTML = "View Score";
	} else {
		next.innerHTML = "Next Question";
	}
	$('.footnotefinal').show();
}

function progess() {
	next.classList.add("progressActive");
	question.style.display = "block";

	const currentQ = cur + 1;
	const progressIs = (currentQ / questions.length) * 100;

	if (progressIs === 100) {
		next.innerHTML = "View Score";
		progressBar.style.maxWidth = "100%";
	}
	progressBar.style.width = `${progressIs}%`;
}

startBtn.addEventListener("click", newQuestion);

next.addEventListener("click", () => {
	if (cur >= questions.length) {
		results();
	} else {
		newQuestion();
	}
});

function results() {
	console.log(player.score);
	question.style.display = "block";
	answerContainer.innerHTML = "";
	question.textContent = `Quiz Summary`;
	player.answers.forEach((ans, i) => {
		const resultsMockup = `
		<div class="result">
		<div class="result-q"><span>${ans.qNum}-</span> ${ans.que}</div>
		<div>${ans.res}</div>
		<div>${ans.correct}</div>
		</div>`;
		answerContainer.insertAdjacentHTML("afterbegin", resultsMockup);
	});
	const progressIs = (player.score / questions.length) * 100;
    next.innerHTML = `You got ${player.score} / ${questions.length} points`;
	if (progressIs <= 50) {
		bar.style.backgroundColor = `#ff8585`;
		progressBar.style.backgroundColor = `red`;
		next.style.color = `#ff8585`;
	} else if (progressIs <= 75) {
		bar.style.backgroundColor = `#ffc582`;
		progressBar.style.backgroundColor = `#ff8900`;
		next.style.color = `#ffc582`;
	} else {
		progressBar.style.backgroundColor = `#00d15e`;
		bar.style.backgroundColor = `#bcffda`;
		next.style.color = `#bcffda`;
	}
    progressBar.style.width = `${progressIs}%`;
}
