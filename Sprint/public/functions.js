const elmtTable = document.getElementById("selectedData");

/*const getTasks= new Promise((resolve, reject) => {
    fetch('/Tickets')
        .then(res => res.json())
        .then(task => resolve(task))
  });*/

<<<<<<< Updated upstream
=======



>>>>>>> Stashed changes
function getData(event) {
  event.preventDefault();
  elmtTable.innerHTML = `<tr>
   <td class="title">TaskId</td>
   <td class="title">Date&time</td>
   <td class="title">New value</td>
  
</tr>`;
  fetch("/getUpdatedByStatus")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        console.log(element);
        console.log(element.tasks);
        element.tasks.forEach((task) => {
          console.log(task.diffItem.updatedFields);
          console.log(task.diffItem.updatedFields[0]);
          let row = elmtTable.insertRow();
          let cell = row.insertCell();
          let cell1 = row.insertCell();
          let cell2 = row.insertCell();
          cell.innerHTML = `${task.jiraItem.jiraId}`;
          cell1.innerHTML = `${task.diffItem.updateTime}`;
          cell2.innerHTML = `${task.diffItem.updatedFields[0].newValue}`;
        });
      });
    });
}
