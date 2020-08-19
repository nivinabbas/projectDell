function getUserID() {
    return localStorage.getItem('UserID');
}
console.log(getUserID() )
getUserPannel()
function getUserPannel() {

    return new Promise((resolve, reject) => {
        const userID = getUserID();

        fetch('/api/userPannel', {
            method: 'POST',
            body: JSON.stringify({ id: userID }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                resolve(data)
                document.getElementById("inputData").innerHTML=`
                <div id="wrapperPannel" onsubmit="handleText(event)">
                <div id="name">${data.user.name}</div>
                <form id="inputform">
                <input type='text' name="tweet" placeholder="enterTweet">
                <button type="submit"> Tweet </button>
                <form>
                
                </div>`
            })
            .catch(err=>reject(err))

    })

}


function handleText(e){
    e.preventDefault()
    const userID = getUserID();
    const text=e.target.elements.tweet.value;
    
    fetch('/addPosts', {
        method: 'POST',
        body: JSON.stringify({name:userID, text}),
        headers: {
          'Content-Type': 'application/json'
        },
      })


location.reload()
}

const getPosts = new Promise((resolve, reject) => {
    fetch('/getPosts')
        .then(res => res.json())
        .then(Post => resolve(Post))
  });
 




(async()=>{
    const post= await getPosts;
    

    let postsList = "";
    post.forEach(post => {
        postsList += `
        <div class="container"> 
            <div> ${post.username}</div>
            <div> ${post.text} </div>
         </div>`

    
});
    
    document.getElementById("posts").innerHTML = postsList;


})();

