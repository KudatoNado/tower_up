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
     
 })