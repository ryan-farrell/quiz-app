const leaderboardList = document.getElementById('leaderboard-table-body');

highScores.forEach(score => {
    tableRow = document.createElement('tr');
    tableDataOne = document.createElement('td'); 
    tableDataTwo = document.createElement('td'); 

    tableDataOne.innerHTML = `${score.name}`;
    tableDataTwo.innerHTML = `${score.score}`;
    tableRow.className = 'leaderboard-table-row';
    tableRow.appendChild(tableDataOne);
    tableRow.appendChild(tableDataTwo);
    leaderboardList.appendChild(tableRow);
});
