var e = document.getElementById('issueInputform');

function saveIssue(e){
    let issuesDescription = document.getElementById('issueDescInput').value;
    let issuesServerity = document.getElementById('issuesServerityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueId = chance.guid();
    let issueStatus = 'open';

    let issue = {
        id: issueId,
        description: issuesDescription,
        serverity: issuesServerity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if(localStorage.getItem('issues') == null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputform').reset();

    fetchIssues();

    e.preventDefault();
}

function setStatusClosed() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'closed';
        }
    }

    localStorage.getItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}

function deleteIssue() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.getItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}

function fetchIssues() {

    let issues  = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList');
    
    issuesList.innerHTML = "";

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let desc = issues[i].description;
        let serverity = issues[i].serverity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

        issuesList.innerHTML += '<div class="well">'+
                                '<h6>Issue ID: ' + id + '</h6>' +
                                '<p><span class="label label-info">' + status + '</span></h6>'+
                                '<h3>' + desc + '</h3>' +
                                '<p><span class="glyphicon glyphicon-time></span>' + serverity + '</p>' +
                                '<p><span class="glyphicon glyphicon-user></span>' + assignedTo + '</p>' +
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' +
                                '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
                                '</div>';
    }
}