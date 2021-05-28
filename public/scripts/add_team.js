// Get the objects we need to modify
let addTeamForm = document.getElementById('add-team-form');

// Modify the objects we need
addTeamForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTeamName = document.getElementById("input-teamName");
    let inputCity = document.getElementById("input-city");
    let inputHeadCoachLname = document.getElementById("input-headCoachLname");

    // Get the values from the form fields
    let teamNameValue = inputTeamName.value;
    let cityValue = inputCity.value;
    let headCoachLnameValue = inputHeadCoachLname.value;

    // Put our data we want to send in a javascript object
    let data = {
        teamName: teamNameValue,
        city: cityValue,
        headCoachLname: headCoachLnameValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-team", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTeamName.value = '';
            inputCity.value = '';
            inputHeadCoachLname.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Creates a single row from an Object representing a single record from epl_teams
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("team-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let teamNameCell = document.createElement("TD");
    let teamCityCell = document.createElement("TD");
    let headCoachLnameCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id;
    teamNameCell.innerText = newRow.teamName;
    teamCityCell.innerText = newRow.city;
    headCoachLnameCell.innerText = newRow.headCoachLname;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(teamNameCell);
    row.appendChild(teamCityCell);
    row.appendChild(headCoachLnameCell);

    // Add the row to the table
    currentTable.appendChild(row);
}