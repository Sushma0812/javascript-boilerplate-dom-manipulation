function getRepo(cb){
    // const httpRequest = new XMLHttpRequest();
    // httpRequest.open("GET",'https://gitlab-cts.stackroute.in/api/v4/projects');
    // httpRequest.setRequestHeader('Private-Token','LTYzFYWJ2jzyGhmsE1gR')
    // httpRequest.onreadystatechange = () => {
    //     if(httpRequest.readyState === 4){
    //         cb(null,JSON.parse(httpRequest.response));
            
    //     }
    // }
    // httpRequest.send();
    fetch('https://gitlab-cts.stackroute.in/api/v4/projects',{
        headers: {
            'Private-Token': 'LTYzFYWJ2jzyGhmsE1gR',
        }
    })
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
   cb(null,myJson)
  });
}

function getIssues(repositoryId,cb){
    // const httpRequest = new XMLHttpRequest();
    // httpRequest.open("GET",`https://gitlab-cts.stackroute.in/api/v4/projects/${repositoryId}/issues`);
    // httpRequest.setRequestHeader('Private-Token','LTYzFYWJ2jzyGhmsE1gR')
    // httpRequest.onreadystatechange = () => {
    //     if(httpRequest.readyState === 4){
    //         cb(null,JSON.parse(httpRequest.response));
            
    //     }
    // }
    // httpRequest.send();
    fetch(`https://gitlab-cts.stackroute.in/api/v4/projects/${repositoryId}/issues`,{
        headers: {
            'Private-Token': 'LTYzFYWJ2jzyGhmsE1gR',
        }
    })
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
   cb(null,myJson)
  });

}

getRepo((err,repositories) => {
     const tbody= document.getElementsByTagName('tbody')[0];
     let tbodyInnerHtml = "";
     repositories.forEach((repo) => {
         getIssues(repo.id,(err,issues) => {
             let countInitial = {
                 total : 0,
                 my_issues:0
             };
             const counts = issues.reduce((accumulator,issues) => {
                 accumulator.total +=1;
                 accumulator.my_issues +=issues.author.name ==="Amisha.Gupta"?1:0;
                 return accumulator;
             },countInitial);
             const trInnerHTML = '<th>'+repo.path_with_namespace+'</th>'
             +'<td>'+counts.total+'</td>'
             +'<td>'+repo.open_issues_count+'</td>'
             +'<td>'+counts.my_issues+'</td>';
             const tr = document.createElement('tr');
             tr.innerHTML = trInnerHTML;
             tbody.appendChild(tr);
         })
     });
     tbody.innerHTML = tbodyInnerHtml;
 })

function getMyCount(event){
    event.preventDefault();
    let repositoryName = document.getElementById('countQueryRepositoryInput').value;
    let countType = document.getElementById('countQueryIssueType').value;
    let table = document.getElementsByTagName('table')[0];
    let thead = table.getElementsByTagName('thead')[0];
    let headerRow = thead.getElementsByTagName('tr')[0];
    let headCells = headerRow.getElementsByTagName('th')
    let countTypeIndex;
    for(let i=0;i<headCells.length;i++){
        if(headCells[i].innerHTML === countType){
            countTypeIndex = i;
        }
        
    } 
    let tbody = table.getElementsByTagName('tbody')[0];
    let bodyRows = tbody.getElementsByTagName('tr');
    let rowArray = [...bodyRows];
    let row = [];
    row = rowArray.filter(function(row) {
        return row.getElementsByTagName('th')[0].innerText ===
         repositoryName;
        
    })
    document.getElementById('count').innerHTML = 
    row[0].getElementsByTagName('td')[countTypeIndex-1].innerText;
}