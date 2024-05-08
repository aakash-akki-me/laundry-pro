const servises = [
    {
        name: "Dry Cleaning",
        price: 200,
    },
    {
        name: "Wash & Fold",
        price: 100,
    },
    {
        name: "Ironing",
        price: 30,
    },
    {
        name: "Stain Removal",
        price: 500,
    },
    {
        name: "Leather & Suede Cleaning",
        price: 999,
    },
    {
        name: "Wedding Dress Cleaning",
        price: 2800,
    },
    
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
            addToCart()
        }else if(e.target.innerText.toLowerCase().includes("remove")){
            cart.pop(servises[Number(e.target.id)])
            e.target.innerHTML = addToCartButton;
            e.target.classList.toggle("btn-remove")
            e.target.classList.toggle("btn-add")
            addToCart()
        }
    }
})

//  to show the added items in the cart and set the total amount in total section
function addToCart() {
    cartItems.innerHTML = "";
    let totalAmount = 0;
    cart.forEach((elem, index)=> {
        totalAmount += elem.price;
        cartItems.innerHTML += `<div id="${index}" class="tabel-title">
        <span class="tb-dt">${index + 1}</span>
        <span class="tb-dt"> ${elem.name}</span>
        <span class="tb-dt right"> ${elem.price}.00 $</span>
      </div>`
    })
    document.querySelector('.total-price').innerHTML = totalAmount + " $";
}

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
        statusDiv.style.color = "red";
    }else{
        statusDiv.innerText = "Your order create sucessfully Email sand to you!";
        statusDiv.style.color = "rgb(86 98 249)";
        reset()
    }
})

function reset(){
    cart = [];
    servisesDisplay();
    fullname.value = "";
    email.value = "";
    phone.value = "";
    addToCart()
}