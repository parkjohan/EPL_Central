// Get the objects we need to modify
let addMatchForm = document.getElementById('add-match-form');

// Modify the objects we need
addMatchForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMatchDate = document.getElementById("input-matchDate");
    let inputTeamHome = document.getElementById("input-teamHome");
    let inputTeamHomeScore = document.getElementById("input-teamHomeScore");
    let inputTeamAway = document.getElementById("input-teamAway");
    let inputTeamAwayScore = document.getElementById("input-teamAwayScore");
    let inputTeamWon = document.getElementById("input-teamWon");

    // Get the values from the form fields
    let matchDateValue = inputMatchDate.value;
    let teamHomeValue = inputTeamHome.value;
    let teamHomeScoreValue = inputTeamHomeScore.value;
    let teamAwayValue = inputTeamAway.value;
    let teamAwayScoreValue = inputTeamAwayScore.value;
    let teamWonValue = inputTeamWon.value;

    // Put our data we want to send in a javascript object
    let data = {
        matchDate: matchDateValue,
        teamHome: teamHomeValue,
        teamHomeScore: teamHomeScoreValue,
        teamAway: teamAwayValue,
        teamAwayScore: teamAwayScoreValue,
        teamWon: teamWonValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-match", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputMatchDate.value = '';
            inputTeamHome.value = '';
            inputTeamHomeScore.value = '';
            inputTeamAway.value = '';
            inputTeamAwayScore.value = '';
            inputTeamWon.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from epl_matches
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("matches-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let matchDateCell = document.createElement("TD");
    let teamHomeCell = document.createElement("TD");
    let teamHomeScoreCell = document.createElement("TD");
    let teamAwayCell = document.createElement("TD");
    let teamAwayScoreCell = document.createElement("TD");
    let teamWonCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id;
    matchDateCell.innerText = newRow.matchDate;
    teamHomeCell.innerText = newRow.teamHome;
    teamHomeScoreCell.innerText = newRow.teamHomeScore;
    teamAwayCell.innerText = newRow.teamAway;
    teamAwayScoreCell.innerText = newRow.teamAwayScore;
    teamWonCell.innerText = newRow.teamWon;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(matchDateCell);
    row.appendChild(teamHomeCell);
    row.appendChild(teamHomeScoreCell);
    row.appendChild(teamAwayCell);
    row.appendChild(teamAwayScoreCell);
    row.appendChild(teamWonCell);

    // Add the row to the table
    currentTable.appendChild(row);
}