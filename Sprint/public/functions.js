const elmtTable = document.getElementById("selectedData");

/*const getTasks= new Promise((resolve, reject) => {
    fetch('/Tickets')
        .then(res => res.json())
        .then(task => resolve(task))
  });*/



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
