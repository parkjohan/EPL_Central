var inputUpdateBtns = document.querySelectorAll("#update-data");
let updateTeamBtn = document.getElementById("update-team-btn")

Array.prototype.forEach.call(inputUpdateBtns, function addClickListener(inputUpdateBtns) {
    inputUpdateBtns.addEventListener('click', function (event) {
        // code here to handle click
        console.log("OPEN MODAL");
    });
});

if (updateTeamBtn != null) {
    // Add update functionality to the update button when clicked
    updateTeamBtn.addEventListener("click", function (e) {

        e.preventDefault();

        // Get the playerID to update specific row
        let id = document.getElementById("update-data").parentElement.firstChild.nodeValue;
        console.log(id);

        // Get the form fields needed for new info
        let updatedTeamName = document.getElementById("input-teamNameUpdated");
        let updatedCity = document.getElementById("input-cityUpdated");
        let updatedCoachName = document.getElementById("input-headCoachLnameUpdated");

        // Get the values from the form fields
        let updatedTeamNameValue = updatedTeamName.value;
        let updatedCityValue = updatedCity.value;
        let updatedCoachNameValue = updatedCoachName.value;

        // Setup JS data object
        let data = {
            teamName: updatedTeamNameValue,
            city: updatedCityValue,
            headCoachLname: updatedCoachNameValue
        }

        console.log("Updating row.... need to figure out how to change specific row");
        console.log("id to update: " + id);
        console.log("new team name: " + data.teamName);
        console.log("new city: " + data.city);
        console.log("new coach: " + data.headCoachLname);
/*
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/update-team", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        //xhttp.send(JSON.stringify(data));
*/
        console.log("UPDATING");
    })
}