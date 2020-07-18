const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

if (finalScore != null) {
    finalScore.innerText = mostRecentScore;
}

if (username != null) {
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
});
}

saveHighScore = e => {
    console.log('clicked the save button');
    e.preventDefault();
}