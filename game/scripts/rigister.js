const text = document.querySelector('#text');
const password = document.querySelector('#password');
const cancelButon = document.getElementById("cancel");
const loginForm = document.getElementById('login_form');

text.addEventListener('click', function () {

    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    
 
    this.textContent = type === 'password' ? '◡' : '👁';
});


 cancelButon = loginForm.reset();
 cancelButon.addEventListener('click', function(){
     
 });

 

 const login = async (event) => {
  event.preventDefault();

  const name = document.getElementById("login").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      password,
    }),
  });

  const data = await response.json();

  console.log(data);

  if (response.ok) {
    alert("Login successful");
  } else {
    alert(data.message);
  }
};

document
  .getElementById("login_form")
  .addEventListener("submit", login);



  const registration = async (event) => {
    event.preventDefault();
  
    const name = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;
  
    if (password.length < 8) {
      alert("Пароль должен содержать минимум 8 символов");
      return;
    }
  
    if (password !== repeatPassword) {
      alert("Пароли не совпадают");
      return;
    }
  
    try {
      const response = await fetch("/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });
  
      const data = await response.json();
  
      console.log(data);
  
      if (!response.ok) {
        throw new Error(data.message);
      }
  
      alert("Регистрация успешна");
  
    } catch (error) {
      console.error(error);
      alert("Ошибка регистрации");
    }
  };
  
  document
    .getElementById("registration-form")
    .addEventListener("submit", registration);

