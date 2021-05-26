// Get the objects we need to modify
let addSeasonForm = document.getElementById('add-season-form');

// Modify the objects we need
addSeasonForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSeasonStartDate = document.getElementById("input-seasonStartDate");
    let inputSeasonEndDate = document.getElementById("input-seasonEndDate");
    let inputMatchOfTheSeasonID = document.getElementById("input-matchOfTheSeasonID")

    // Get the values from the form fields
    let seasonStartDateValue = inputSeasonStartDate.value;
    let seasonEndDateValue = inputSeasonEndDate.value;
    let matchOfTheSeasonIDValue = inputMatchOfTheSeasonID.value;

    // Put our data we want to send in a javascript object
    let data = {
        seasonStartDate: seasonStartDateValue,
        seasonEndDate: seasonEndDateValue,
        matchOfTheSeasonID: matchOfTheSeasonIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-season", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputSeasonStartDate.value = '';
            inputSeasonEndDate.value = '';
            inputMatchOfTheSeasonID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Creates a single row from an Object representing a single record from epl_seasons
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("season-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let startDateCell = document.createElement("TD");
    let endDateCell = document.createElement("TD");
    let matchOfSeasonIDCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id;
    startDateCell.innerText = newRow.seasonStartDate;
    endDateCell.innerText = newRow.seasonEndDate;
    matchOfSeasonIDCell.innerText = newRow.matchOfTheSeasonID;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(startDateCell);
    row.appendChild(endDateCell);
    row.appendChild(matchOfSeasonIDCell);

    // Add the row to the table
    currentTable.appendChild(row);
}