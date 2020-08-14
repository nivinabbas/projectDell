import React from 'react'
import "./Header.css"

export function Header() {
  const table = document.getElementById("datatabel");
  function getAllTasks(event) {
    const fieldName = "status";
    console.log(fieldName)
    event.preventDefault();
    fetch('/getUpdatedTasksByFieldName', {
      method: 'POST',
      body: JSON.stringify({ fieldName }),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    ).then(res => res.json())
      .then(data => {
        let items = "";
        console.log("client2")
        console.log(data)
        data.forEach(element => {
          
          console.log(element);
          console.log(element.tasks);
          element.tasks.forEach((task) => {
            
            // console.log(task.diffItem.updatedFields);
            // console.log(task.diffItem.updatedFields[0]);
            // let row = table.insertRow();
            // let cell = row.insertCell();
            // let cell1 = row.insertCell();
            // let cell2 = row.insertCell();
            // let cell3 = row.insertCell();
            // let cell4 = row.insertCell();
            // cell.innerHTML = `${task.jiraItem.jiraId}`;
            // cell1.innerHTML = `${task.diffItem.updatedFields[0].fieldName}`;
            // cell2.innerHTML = `${task.diffItem.updatedFields[0].oldValue}`;
            // cell3.innerHTML = `${task.diffItem.updatedFields[0].newValue}`;
            
            // cell4.innerHTML = `${new Date(task.diffItem.updateTime).getDay()+1}/${new Date(task.diffItem.updateTime).getMonth()+1}/${new Date(task.diffItem.updateTime).getFullYear()}`;
            items+=task.jiraItem.jiraId;
            
          });
        });
        const root = document.getElementById('root');
        root.innerHTML = items;
      })
  }
  

  return(

    <div className="Wrapper">
      <button onClick={getAllTasks}>ok</button>
      <h1 id="headerTitle">Modification by field</h1>
      <div id="root"></div>


    </div>


    
  )
}