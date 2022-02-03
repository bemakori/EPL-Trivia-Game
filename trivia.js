const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choices-text'))
const counterText = document.querySelector('#counterText')
const scoreText = document.querySelector('#score')
const fillProgressBar = document.querySelector('#fillProgressBar')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Dubbed the “Centurions”, this is the only team to win the Premier League title by registering 100 points in a single season.",
        choice1: 'Liverpool',
        choice2: 'Manchester City',
        choice3: 'Arsenal',
        choice4: 'Chelsea',
        answer: 2,
    },
    {
        question: "The only EPL team to complete the season undefeated.",
        choice1: 'Manchester United',
        choice2: 'Tottenham Hotspur',
        choice3: 'Aston Villa',
        choice4: 'Arsenal',
        answer: 4,
    },
    {
        question: "Currently, what is the best team in the English Premier League?",
        choice1: 'Manchester City',
        choice2: 'Chelsea',
        choice3: 'Liverpool',
        choice4: 'Arsenal',
        answer: 1,
    },
    {
        question: "The EPL team that won its first Premier League title in the 2019-20 season",
        choice1: 'Manchester City',
        choice2: 'Tottenham Hotspur',
        choice3: 'Liverpool',
        choice4: 'AFC Richmond',
        answer: 3,
    },
    {
        question: "The EPL coach with the best winning ratio (matches coached vs. matches won)",
        choice1: 'Sir Alex Ferguson',
        choice2: 'Jose Mourinho',
        choice3: 'Pep Guardiola',
        choice4: 'Arsene Wenger',
        answer: 3,
    },
    {
        question: "The EPL team that overcame 5000-to-1 odds to clinch the Premier League title",
        choice1: 'Tottenham Hotspur',
        choice2: 'Leicester City',
        choice3: 'Newcastle United',
        choice4: 'AFC Richmond',
        answer: 2,
    },
    {
        question: "The only EPL team to win a domestic treble.",
        choice1: 'Manchester United',
        choice2: 'Chelsea',
        choice3: 'Manchester City',
        choice4: 'Arsenal',
        answer: 3,
    },
    {
        question: "What EPL team has won the most Premier League titles?",
        choice1: 'Chelsea',
        choice2: 'Manchester United',
        choice3: 'Liverpool',
        choice4: 'Aston Villa',
        answer: 2,
    },
    {
        question: "The EPL team that attained 97 points in a season but failed to win the Premier League title.",
        choice1: 'Manchester United',
        choice2: 'Tottenham Hotspur',
        choice3: 'Liverpool',
        choice4: 'Chelsea',
        answer: 3,
    },
    {
        question: "Signed from Juventus in 2019, this Manchester City player, under the tutelage of Pep Guardiola, has become one the best full-backs in the world.",
        choice1: 'Trent Alexander-Arnold',
        choice2: 'João Cancelo',
        choice3: 'Kyle Walker',
        choice4: 'Reece James',
        answer: 2,
    },
    
]

const pointsScore = 100
const totalTriviaQs = 10

startTrivia = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > totalTriviaQs) {
        localStorage.setItem('recentResults', score)

        return window.location.assign('/results.html')
    }

    questionCounter++
    counterText.innerText = `Question ${questionCounter} of ${totalTriviaQs}`
    fillProgressBar.style.width = `${(questionCounter/totalTriviaQs) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let EPLTriviaQ = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(EPLTriviaQ === 'correct') {
            incrementScore(pointsScore)
    
        }

        selectedChoice.parentElement.classList.add(EPLTriviaQ)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(EPLTriviaQ)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startTrivia()