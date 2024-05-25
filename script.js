

const servises = [
    {name: "Dry Cleaning",price: 200},
    {name: "Wash & Fold",price: 100,},
    {name: "Ironing",price: 30,},
    {name: "Stain Removal",price: 500,},
    {name: "Leather & Suede Cleaning",price: 999,},
    {name: "Wedding Dress Cleaning",price: 2800,},
]
let cart = [];
const servisesDiv = document.querySelector('.servises');
const cartItems = document.querySelector('.added-item-box')

// to display servises on the left side of the servises dev
function servisesDisplay () {
    servisesDiv.innerHTML = ""
     servises.forEach((element, index) => {
        servisesDiv.innerHTML += `<div class="service">
        <p class="name-price"><span class="name">${element.name}</span> $<span class="price">${element.price}</span></p>
        <button type="button" class="add-to-cart" id="${index}"> 
          Add to cart   
          <span class="material-symbols-outlined">
            add_circle
            </span>
        </button>
      </div>`
    });
}
servisesDisplay()

// button contant 
const addToCartButton = `Add to cart     
<span class="material-symbols-outlined">
  add_circle
  </span>`;
const removeToCartButton = `Remove to cart   
<span class="material-symbols-outlined">
  do_not_disturb_on
  </span>`;

//    to add and remove the items in cart and change the button according to the conditons
servisesDiv.addEventListener('click', (e) => {
    // console.log(e)
    if(e.target.classList.contains("add-to-cart")){
        if(e.target.innerText.toLowerCase().includes("add")){
            e.target.classList.toggle("btn-remove")
            e.target.classList.toggle("btn-add")
            e.target.innerHTML = removeToCartButton;
            cart.push(servises[Number(e.target.id)])
            console.log(cart);
            addToCart()
        }else if(e.target.innerText.toLowerCase().includes("remove")){
            let newCart = []
            for(let i = 0; i < cart.length; i++){
                if(cart[i] !== servises[Number(e.target.id)]) newCart.push(cart[i])
            };
            cart = newCart
            e.target.innerHTML = addToCartButton;
            e.target.classList.toggle("btn-remove")
            e.target.classList.toggle("btn-add")
            addToCart()
        }
    }
})
let itemsForCart;
//  to show the added items in the cart and set the total amount in total section
function addToCart() {
    cartItems.innerHTML = "";
    let totalAmount = 0;
    itemsForCart = ""
    cart.forEach((elem, index)=> {
        totalAmount += elem.price;
        itemsForCart += `<div id="${index}" class="tabel-title">
        <span class="tb-dt">${index + 1}</span>
        <span class="tb-dt"> ${elem.name}</span>
        <span class="tb-dt"> ${elem.price}.00 $</span>
      </div>`
    })
    cartItems.innerHTML = itemsForCart;
    document.querySelector('.total-price').innerHTML = totalAmount + " $";
}


// submit the order and then reset the page
const buyBtn = document.querySelector('#add-Item')
const statusDiv = document.querySelector('.status')
const fullname = document.querySelector('#fullName')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
buyBtn.addEventListener('click', () => {
    // console.log(cart.length);
    if(cart.length === 0){
        statusDiv.innerText = "Please Select a item First!";
        statusDiv.style.color = "red";
    }else if(fullname.value === "" || email.value === "" || phone.value === ""){
        statusDiv.innerText = "Please fill the details First!";
        statusDiv.style.BackgroundColor = "rgba(86 98 249 0.6)";
        statusDiv.style.color = "red";
    }else{
        let orderDet = ""
        cart.forEach((elem) => 
           orderDet += `${elem.name}   ${elem.price}/n`
        )

        console.log(orderDet);
        sandMail(fullname.value, email.value, phone.value, orderDet)
        statusDiv.innerText = "Thank you For Booking the Service We will get back to you soon!";
        statusDiv.style.color = "rgb(86 98 249)";
        statusDiv.style.BackgroundColor = "rgba(86 98 249 0.6)";
        reset()
    }
})

// reset function to change the ui to make it default 
function reset(){
    cart = [];
    servisesDisplay();
    fullname.value = "";
    email.value = "";
    phone.value = "";
    addToCart()
}

document.getElementById('menu-btn').addEventListener('click', ()=>{
    const nav_menu = document.querySelector('.nav-links');
    nav_menu.classList.toggle('show')
    
})  

function sandMail(fullname, mail, phoneNum, orderDet){
    (function(){
      emailjs.init("TRc4wW4uG_3Nkg3se");
    })();
    var params = {
        to_name:fullname,
        email:mail,
        phone:phoneNum,
        orderDetails:orderDet,
    }
    
    var servicID = "service_bnuubfr";
    var templateID = "template_c6wa9ib"; 

    window.emailjs.send(servicID, templateID, params)
    .then(res => {
        alert("email sand sucseccfully" , res)
    })
    .catch((e) =>{
        alert(e)
    })
}