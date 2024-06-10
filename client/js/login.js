const TITLE = 'Welcome to our ToDo App!!!';

function changeHtml(file) { window.location.href = file }



async function validatePassword(email, pass) {
  try {
    let person = {
      username: email,
      password: pass
    }
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(person)
    });

    const data = await response.json(); // Parse the JSON response
    person.validate = data.ok
    console.log(person); // Logs true or false based on the server response
    return person
  } catch (error) {
    alert(error);
    console.error('Error:', error);
  }
}





async function loginBtnClicked(event) {
  event.preventDefault();
   const username = document.getElementById('username-input').value;
  const password = document.getElementById('password-input').value;
  localStorage.username = username
  let validate = await validatePassword(username, password)
  let loginBtn = document.querySelector('#login-btn');
  loginBtn.innerText = 'Logging In...';
  if (validate.validate == true) {
    displayApp()
  } else {
    
    document.getElementById('Invalid').style.display = 'block'
    setTimeout(()=>{document.getElementById('Invalid').style.display = 'none'},4000)
    loginBtn.innerText = 'LogIn';
  }
  
}



function displayApp() {
  changeHtml("./index.html")

}

function displayTitleTillIndex(index) {
  let subTitle = TITLE.substring(0, index + 1);
  let h1El = document.querySelector('#app-title');
  if (index < TITLE.length - 1) subTitle += '_';
  h1El.innerText = subTitle;
}


function displayTitle() {
  for (let i = 0; i < TITLE.length; i++) {
    setTimeout(function () {
      displayTitleTillIndex(i);
    }, i * 100);
  }

}

document.addEventListener('DOMContentLoaded', function () {
  displayTitle();
  setTimeout(displayTasks, 1000)

});