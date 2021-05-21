document.getElementById('add-team-form').addEventListener('click', function(event){
        
        var inputTeamName = document.getElementById("input-teamName").value;
        var inputTeamCity = document.getElementById("input-city").value;
        var inputHeadCoachLname = document.getElementById("input-headCoachLname").value;
        var req = new XMLHttpRequest();
        var payload = inputTeamName + inputTeamCity + inputHeadCoachLname;
    
        req.open("POST", "http://httpbin.org/post", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(payload));
        req.addEventListener('load', function(){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
                printPostResults(response);
        }
        else
        {
            console.log("Please try again.");
        }
        });

        
        event.preventDefault();

    });




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