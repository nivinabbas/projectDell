let table=document.getElementById('selectedData')

const getTasks= new Promise((resolve, reject) => {
    fetch('/Tickets')
        .then(res => res.json())
        .then(task => resolve(task))
  });

(async()=>{
    const tasks= await getTasks;
    tasks.forEach(item => {
        let row=table.insertRow();
        let cell=row.insertCell();
        let cell1=row.insertCell();
        let cell2=row.insertCell();
       cell.innerHTML=`${item.jiraItem.jiraId}`
       cell1.innerHTML=`${item.jiraItem.jiraName}`
       cell2.innerHTML=`${item.diffItem.updatedFields.newValue}`
       console.log(item.diffItem.updatedFields)
    
});
   
    
})();