const username = document.querySelector('#username')
const saveResultsBtn = document.querySelector('#saveResultsBtn')
const finalScore = document.querySelector('#finalScore')
const recentResults = localStorage.getItem('recentResults')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const topScores = 5

finalScore.innerText = recentResults

username.addEventListener('keyup', () => {
    saveResultsBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: recentResults,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('highscore.html')
    
}