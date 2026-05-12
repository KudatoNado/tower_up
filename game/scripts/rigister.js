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










 const form = document.querySelector('.trip-form');
const tripType = document.getElementById("one-way");
const roundTrip = document.getElementById("round-trip");
const from = document.querySelector(".from-place");
const to = document.getElementById("to-place");
const depart = document.getElementById("depart");
const backDestination = document.getElementById("return");
const adults = document.getElementById("adults");
const children = document.getElementById("children");
const infants = document.getElementById("infants");
const planeClass = document.getElementById("plane-class");

form.addEventListener("submit", async (e) => { 
    e.preventDefault();

    // const fd = new FormData(form);
    
    
    // const payload = {
    //     tripType: tripType.value,
    //     roundTrip: roundTrip.value,
    //     from: from.value,
    //     to: to.value,
    //     depart: depart.value,
    //     backDestination: backDestination.value,
    //     adults: adults.value,
    //     children: children.value,
    //     infants: Number(fd.get("infants")), 
    //     planeClass: planeClass.value
    // };

});






















async function createBooking() {
    const url = '/booking';
    
    const payload = {
        tripType: tripType.value,
        roundTrip: roundTrip.value,
        from: from.value,
        to: to.value,
        depart: depart.value,
        backDestination: backDestination.value,
        adults: adults.value,
        children: children.value,
        infants: Number(fd.get("infants")), 
        planeClass: planeClass.value
    };

    console.log('Check payload data:', payload);

    try {
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload) 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json(); 
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error); 
    }
  }
//example GET-request
async function getData() {
    const url = "https://example.org/products.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  }