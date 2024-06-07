
async function getUserInfo(){
    let newUser = {}
    newUser.name = document.getElementById('name').value
    newUser.email = document.getElementById('email').value
    newUser.pass = document.getElementById('pass').value
    console.log(newUser)
    return newUser
}
function removeSignUpInput(){
  document.getElementById('name').value = null
    document.getElementById('email').value = null
    document.getElementById('pass').value = null
}

async function addUser() {
  try {
      const newUser = await getUserInfo();
      
      const response = await fetch('http://localhost:3000/user', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
      });

      if (!response.ok) {
          if (response.status === 400) {
            
              alert('Please fill out name, email, and password.');
              
          } else if (response.status === 409) {
              alert('Email already exists, please try again.');
          } else {
              alert('An error occurred, please try again.');
          }
      } else if (response.status === 201) {
          alert('Successful!');
          removeSignUpInput();
          window.location.href = "./login.html"
      }

  } catch (error) {
      alert(error);
      console.error('Error:', error);
  }
}








