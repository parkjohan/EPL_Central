// Get the objects we need to modify
let addPlayerForm = document.getElementById('add-player-form');
let updatePlayerForm = document.getElementById('update-player-form');
let updatebtn = document.getElementById('update-player-info-btn');
var inputUpdateBtns = document.querySelectorAll("#update-data");

Array.prototype.forEach.call(inputUpdateBtns, function addClickListener(inputUpdateBtns) {
    inputUpdateBtns.addEventListener('click', function (event) {
        // code here to handle click
        console.log("OPEN MODAL");
    });
});

if (updatebtn != null) {
    // Add update functionality to the update button when clicked
    updatebtn.addEventListener("click", function (e) {

        e.preventDefault();

        // Get the playerID to update specific row
        let id = document.getElementById("player-ID");

        // Get the form fields needed for new info
        let updatedPlayerFname = document.getElementById("input-playerFnameUpdated");
        let updatedPlayerLname = document.getElementById("input-playerLnameUpdated");
        let updatedTeamID = document.getElementById("teamID-dropdownUpdated");
        let updatedNationality = document.getElementById("input-nationalityUpdated");

        // Get the values from the form fields
        let updatedFnameValue = updatedPlayerFname.value;
        let updatedLnameValue = updatedPlayerLname.value;
        //let updatedTeamIDValue = updatedTeamID.value;
        let updatedNationalityValue = updatedNationality.value;

        // Setup JS data object
        let data = {
            playerFname: updatedFnameValue,
            playerLname: updatedLnameValue,
            nationality: updatedNationalityValue
        }

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/update-player", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                console.log("Updating row.... need to figure out how to change specific row");
            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

        console.log("UPDATING");
    })
}

// Modify the objects we need
addPlayerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPlayerFname = document.getElementById("input-playerFname");
    let inputPlayerLname = document.getElementById("input-playerLname");
    let inputTeamID = document.getElementById("teamID-dropdown");
    let inputNationality = document.getElementById("input-nationality");

    // Get the values from the form fields
    let playerFnameValue = inputPlayerFname.value;
    let playerLnameValue = inputPlayerLname.value;
    let teamIDValue = inputTeamID.value;
    let nationalityValue = inputNationality.value;

    // Put our data we want to send in a javascript object
    let data = {
        playerFname: playerFnameValue,
        playerLname: playerLnameValue,
        teamID: teamIDValue,
        nationality: nationalityValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-player", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPlayerFname.value = '';
            inputPlayerLname.value = '';
            inputTeamID.value = '';
            inputNationality.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})


// Creates a single row from an Object representing a single record from epl_top_players
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("players-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let fNameCell = document.createElement("TD");
    let lNameCell = document.createElement("TD");
    let teamIDCell = document.createElement("TD");
    let nationalityCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.playerID;
    fNameCell.innerText = newRow.playerFname;
    lNameCell.innerText = newRow.playerLname;
    teamIDCell.innerText = newRow.teamID;
    nationalityCell.innerText = newRow.nationality;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(fNameCell);
    row.appendChild(lNameCell);
    row.appendChild(teamIDCell);
    row.appendChild(nationalityCell);

    // Add the row to the table
    currentTable.appendChild(row);
}