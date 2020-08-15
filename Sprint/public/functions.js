const elmtTable = document.getElementById("selectedData");

/*const getTasks= new Promise((resolve, reject) => {
    fetch('/Tickets')
        .then(res => res.json())
        .then(task => resolve(task))
  });*/
  getAlldata()
function getAlldata(){
  elmtTable.innerHTML = 
  `<tr>
       <td class="title">TaskId</td>
       <td class="title">Date&time</td>
      <td class="title">Old Value</td>
      <td class="title">New Value</td>
      </tr>`;
    fetch('/Tickets')
       .then(res => res.json())
       .then((data) => {
          console.log(data)
          data.forEach((element) => {
            console.log(element)
            console.log(element.jiraItem)
          
        let row = elmtTable.insertRow();
        let cell = row.insertCell();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        let cell3 = row.insertCell();
        cell.innerHTML = `${element.jiraItem.jiraId}`;
        cell1.innerHTML = `${new Date(element.diffItem.updateTime).getDay()+1}/${new Date(element.diffItem.updateTime).getMonth()+1}/${new Date(element.diffItem.updateTime).getFullYear()}`;
        cell2.innerHTML = `${element.diffItem.updatedFields[0].oldValue}`;
        cell3.innerHTML = `${element.diffItem.updatedFields[0].newValue}`;
        })
      
    });
  }


    



function getData(event) {
  event.preventDefault();

  const oldnewvalue=event.target.elements.oldOrnew.value;
  const statusField=event.target.elements.statusOfValue.value;
  console.log(oldnewvalue)
  console.log(statusField)

  elmtTable.innerHTML = 
    `<tr>
     <td class="title">TaskId</td>
     <td class="title">Date&time</td>
     <td class="title">Value</td>
     </tr>`;

  fetch('/getUpdatedByStatus' ,{
        method: 'POST',
        body: JSON.stringify( {oldnewvalue , statusField }),
        headers: {
            "Content-Type": "application/json"
        }
      })
     .then((res)=> res.json())
      .then((data) => {
      data.forEach((element) => {
        console.log(element);
        console.log(element.tasks);
        element.tasks.forEach((task) => {
          console.log(task.diffItem.updatedFields);
          console.log(task.diffItem.updatedFields[0]);
          console.log(statusField)
          let row = elmtTable.insertRow();
          let cell = row.insertCell();
          let cell1 = row.insertCell();
          let cell2 = row.insertCell();
          cell.innerHTML = `${task.jiraItem.jiraId}`;
          cell1.innerHTML = `${new Date(task.diffItem.updateTime).getDay()+1}/${new Date(task.diffItem.updateTime).getMonth()+1}/${new Date(task.diffItem.updateTime).getFullYear()}`;

            if(oldnewvalue==='oldValue')
          cell2.innerHTML = `${task.diffItem.updatedFields[0].oldValue}`;
            else {
          cell2.innerHTML = `${task.diffItem.updatedFields[0].newValue}`;
          }
        });
      });
    });
}
