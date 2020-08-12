let table=document.getElementById('selectedData')

/*const getTasks= new Promise((resolve, reject) => {
    fetch('/Tickets')
        .then(res => res.json())
        .then(task => resolve(task))
  });*/

(async()=>{
    const tasks= await getTasks;
    /*let row=table.insertRow();*/
   /* let cell=row.insertCell();
    let cell1=row.insertCell();
    let cell2=row.insertCell();*/
    let taskList = "";
    tasks.forEach(item => {
        let row=table.insertRow();
        let cell=row.insertCell();
        let cell1=row.insertCell();
        let cell2=row.insertCell();
       cell.innerHTML=`${item.id}`
       cell1.innerHTML=`${item.name}`
       cell2.innerHTML=`${item.oldvalue}`
       
    
});
   
/*document.getElementById("selectedData").innerHTML = namesList;*/
    
})();