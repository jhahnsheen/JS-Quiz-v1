// function to clear high scores
clearScores = () => {
    window.localStorage.removeItem('allScores');
    window.location.reload();
};

// function to print high scores
getHighScores = () => {
    // print empty array if no items, else print scores from localstorage
    const scores = JSON.parse(window.localStorage.getItem('allScores')) || [];

    // sort the scores from highest to lowest
    // I'll be honest, I ripped this straight from the homework because I couldn't figure this out on my own
    scores.sort(function(x, y) {
        return x.score - y.score;
    });

    //append list items for display
    scores.forEach(function(entry) {
        let list = document.createElement('li');
        list.textContent = entry.initials + ' with a score of ' + entry.score;
        let printList = document.getElementById('highscores');
        printList.appendChild(list);
    });
};

// event listener for button click
document.getElementById('clearButton').onclick = clearScores();

// post high scores on page load
getHighScores();