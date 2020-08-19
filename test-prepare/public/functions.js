
function HandleLogin(e) {
    e.preventDefault();
   
    const name = e.target.elements.name.value;
    const password = e.target.elements.password.value;
    console.log(name, password)
    current = name;
    fetch('/login-user', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const { validAdmin , id} = data;
            localStorage.setItem('UserID', id);
            

            if (validAdmin == true) {
                window.location.replace('/mainPage.html')
            }
            if (validAdmin == false) {
                document.getElementById('root').innerText = `Wrong username/password`
                document.getElementById('root').style.color = "red";

            }

        })
}


