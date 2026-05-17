const text = document.querySelector('#text');
const password = document.querySelector('#password');
const cancelButon = document.getElementById("cancel");
const loginForm = document.getElementById('login_form');

text.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.textContent = type === 'password' ? '◡' : '👁';
});


cancelButon.addEventListener('click', function() {
    loginForm.reset(); 
});

const login = async () => {
  const login = document.getElementById("login").value;
  const passwordValue = document.getElementById("password").value; 
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password: passwordValue,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert("Login successful");
    } else {
      alert(data.message || "Ошибка авторизации");
    }
  } catch (error) {
    console.error(error);
    alert("Не удалось связаться с сервером");
  }
};



const registration = async (event) => {
  event.preventDefault();

  const login = document.getElementById("login").value;
  const passwordValue = document.getElementById("password").value;
  const repeatPassword = document.getElementById("repeat-password").value;

  if (passwordValue.length < 8) {
    alert("Пароль должен содержать минимум 8 символов");
    return;
  }

  if (passwordValue !== repeatPassword) {
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
        login,
        password: passwordValue,
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


const regForm = document.getElementById("registration-form");
if (regForm) {
  regForm.addEventListener("submit", registration);
}
