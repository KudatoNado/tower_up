const text = document.querySelector('#text');
const password = document.querySelector('#password');

text.addEventListener('click', function () {

    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    
 
    this.textContent = type === 'password' ? '◡' : '👁';
});