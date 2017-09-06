var el = document.getElementById('issueInputform');
if(el){
    el.addEventListener('submit', saveIssue, false);
  }

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

function fetchIssues() {

    let issues  = JSON.parse(localStorage.getItem('issues'));
    if (issues) {
        return [];
    }else{
        return issues;
    }
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