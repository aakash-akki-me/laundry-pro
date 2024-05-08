document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("ivvesMVnjYzeKWyVu");
    
    
    let services = [
        { name: "Washing", price: 50 },
        { name: "Cleaning", price: 75 },
        { name: "Drying", price: 60 },
        { name: "Ironing", price: 45 },
        { name: "Fold Service", price: 80 },
        { name: "Stain Removal", price: 55 },
        { name: "Delicate Fabric Care", price: 70 },
        { name: "Ironing", price: 45 },
    ];
    
    function generateServiceList() {
        const servicesList = document.getElementById("services-list");
        servicesList.innerHTML = "";
        services.forEach(service => {
            const listItem = document.createElement("li");
            listItem.classList.add("flex", "items-center", "justify-between");
            listItem.innerHTML = `
                <div class="flex items-center">
                    <span class="text-lg">${service.name}</span>
                    <span class="ml-2 text-blue-500">₹${service.price}</span>
                </div>
                <button class="bg-blue-500 text-white px-4 py-2 rounded-full add-item-button" data-service-name="${service.name}" data-price="${service.price}">Add Item</button>
            `;
            servicesList.appendChild(listItem);
        });
    }
    
    generateServiceList();
    
    let cart = []; 
    
    function updateCart() {
        const cartItems = document.getElementById("cart-items");
        cartItems.innerHTML = "";
        let totalPrice = 0;
        Object.entries(cart).forEach(([name, price], index) => {
            totalPrice += price;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${name}</td>
                <td>₹${price}</td>
            `;
            cartItems.appendChild(row);
        });
    
        document.getElementById("total-amount").textContent = `$${totalPrice}`;
    
        const addButtons = document.querySelectorAll(".add-item-button");
        addButtons.forEach(button => {
            const serviceName = button.dataset.serviceName;
            if (cart.hasOwnProperty(serviceName)) {
                button.textContent = "Remove Item";
                button.classList.add("bg-red-500");
                button.classList.remove("bg-blue-500");
            } else {
                button.textContent = "Add Item";
                button.classList.add("bg-blue-500");
                button.classList.remove("bg-red-500");
            }
        });
    }
    
    function toggleItem(serviceName, price) {
        if (cart.hasOwnProperty(serviceName)) {
            delete cart[serviceName];
        } else {
            cart[serviceName] = price;
        }
        updateCart();
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        const fullName = document.getElementById("full-name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
    
        if (fullName === "" || email === "" || phone === "") {
            alert("Please fill in all fields.");
            return;
        }
    
        window.emailjs.send("service_scr8i7s", "template_uo7zbgn")
            .then(() => {
                alert("Email sent successfully.");
            })
            .catch(error => {
                console.error("Email sending failed:", error);
                alert("Email sending failed. Please try again later.");
            });
    }
    
    document.querySelectorAll(".add-item-button").forEach(button => {
        button.addEventListener("click", () => {
            const serviceName = button.dataset.serviceName;
            const price = parseInt(button.dataset.price);
            toggleItem(serviceName, price);
        });
    });
    
    document.getElementById("booking-form").addEventListener("submit", handleSubmit);
    });