let deleteTeamBtn = document.querySelectorAll("#delete-data");
let idValue = deleteTeamBtn.parentElement.parentElement.childElement.value;

Array.prototype.forEach.call(deleteTeamBtn, function addClickListener(deleteTeamBtn) {
    deleteTeamBtn.addEventListener('click', function (event) {
        // code here to handle click
        console.log("deleting...");
        var teamID = this.parentElement.value;
        console.log("ID: " + idValue);
        var payload = {
            'teamID': teamID
        }
        /*
        req.open('DELETE', '/delete-team/' + teamID, true);
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
    
            }
        });
        */
        //req.send(payload);
    });
});