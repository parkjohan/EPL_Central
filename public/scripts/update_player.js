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
        //let updatedTeamID = document.getElementById("teamID-dropdownUpdated");
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
        console.log(data.playerFname);
/*
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
*/
        console.log("UPDATING");
    })
}