function deleteTeam() {
    var req = new XMLHttpRequest();
    var teamID = this.value;
    var payload = {
        'teamID': teamID
    }
    req.open('DELETE', '/delete-team/' + teamID, true);
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            
            console.log(JSON.parse(req.responseText));
        }
    });
    req.send(payload);
}