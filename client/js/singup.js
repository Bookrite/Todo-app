function displayM(mass, color) {
    document.getElementById('message').innerText = mass
    document.getElementById('message').style.color = color
    document.getElementById('message').style.border = `1px solid ${color}`;
    document.getElementById('message').style.display = 'block';
    setTimeout(() => { document.getElementById('message').style.display = 'none' }, 4000)
}


async function getUserInfo() {
    let newUser = {}
    newUser.name = document.getElementById('name').value
    newUser.email = document.getElementById('email').value
    newUser.pass = document.getElementById('pass').value
    console.log(newUser)
    return newUser
}
function removeSignUpInput() {
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
                displayM('Please fill out name, email, and password.', 'red')
            } else if (response.status === 409) {
                displayM('Email already exists, please try again.', 'red')
                removeSignUpInput()
            } else {
                displayM('An error has occurred.', 'red')
                removeSignUpInput()
            }
        } else if (response.status === 201) {
            displayM('You successfully signed up', 'green');
            setTimeout(() => { window.location.href = "./login.html" }, 2000)

        }

    } catch (error) {
        displayM('An error has occurred.' , 'red')
    }
}








