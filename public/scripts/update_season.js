var inputUpdateBtns = document.querySelectorAll("#update-data");
let updateSeasonBtn = document.getElementById("update-season-btn")

Array.prototype.forEach.call(inputUpdateBtns, function addClickListener(inputUpdateBtns) {
    inputUpdateBtns.addEventListener('click', function (event) {
        // code here to handle click
        console.log("OPEN MODAL");
    });
});

if (updateSeasonBtn != null) {
    // Add update functionality to the update button when clicked
    updateSeasonBtn.addEventListener("click", function (e) {

        e.preventDefault();

        // Get the playerID to update specific row
        let id = document.getElementById("update-data").parentElement.firstChild.nodeValue;
        console.log(id);

        // Get the form fields needed for new info
        let updatedSeasonStartDate = document.getElementById("input-seasonStartDateUpdated");
        let updatedSeasonEndDate = document.getElementById("input-seasonEndDateUpdated");
        //let updatedMatchOfSeasonID = document.getElementById("matchID-dropdownUpdated");

        // Get the values from the form fields
        let updatedSeasonStartDateValue = updatedSeasonStartDate.value;
        let updatedSeasonEndDateValue = updatedSeasonEndDate.value;
        //let updatedMOSID = updatedMatchOfSeasonID.value;

        // Setup JS data object
        let data = {
            seasonStartDate: updatedSeasonStartDateValue,
            seasonEndDate: updatedSeasonEndDateValue
            //matchOfTheSeasonID: updatedMOSID
        }

        console.log("Updating row.... need to figure out how to change specific row");
        console.log("new start date: " + data.seasonStartDate);

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