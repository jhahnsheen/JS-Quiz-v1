// function to print high scores
function getHighScores() {
    // print empty array if no items, else print scores from localstorage
    let scores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    // sort the scores from highest to lowest
    // I'll be honest, I ripped this straight from the homework because I couldn't figure this out on my own
    scores.sort(function(x, y) {
        return y.score - x.score;
    });

    //append list items for display
    scores.forEach(function(entry) {
        let list = document.createElement('li');
        list.textContent = `${entry.initials} with a score of ${entry.score}`;
        let printList = document.getElementById('highscores');
        printList.appendChild(list);
    });
}

// function to clear high scores
function clearScores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
}

// event listener for button click
document.getElementById('clearButton').onclick = clearScores;

// post high scores on page load
getHighScores();