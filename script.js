const menu = document.getElementById("menu-list");
const confirmOrder = document.getElementById("confirm-order")
let dish = {};

//loadin Menu list for user.

async function getMenu() {
    // window.location.href = "index-menu.html";
    const url = `https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`

    let respone = await fetch(url);
    let result = await respone.json();

    for (let i = 0; i < result.length; i++) {
        let dish = result[i];

        let card = document.createElement("div");
        card.className = "card";

//adding dish image for menu list
        let imageElement = document.createElement("img");
        imageElement.className = "image";
        imageElement.src = dish.imgSrc;

        card.appendChild(imageElement);

        //creating name for menu list

        let nameElement = document.createElement("h2");
        nameElement.innerText = dish.name;

        card.appendChild(nameElement);

        // adding price for menu list

        let priceElement = document.createElement("span");
        priceElement.innerText = dish.price+" "+"$";

        card.appendChild(priceElement);

        
        // creating button to order dish

        let orderElement = document.createElement("button");
        orderElement.innerText = "Order";
        orderElement.dataset.dishName = nameElement.innerText;
        orderElement.dataset.dishPrice = priceElement.innerText;

        orderElement.className = "order-btn";

        orderElement.addEventListener("click", (e)=>{
            dish[e.target.dataset.dishName] = e.target.dataset.dishPrice;

        })

        card.appendChild(orderElement);

        menu.appendChild(card);
    }
    confirmOrder.style.display = "block";
    
}

confirmOrder.addEventListener("click", ()=>{
    const order = takeOrder();
    order.then(()=>{
        const orderPrep = orderprep();
    orderPrep.then(()=>{
        const payment = payOrder();
        payment.then(()=>{
            const Thanks = thankYou();
        })
    })
    }).catch((error)=>{
        console.log("Error occured"+error);
    })

})
function takeOrder(){
    // All order given by user in "dish variable"
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            let total = 0;
            for(let i=0; i<dish.length; i++){
               total += parseInt(dish[i].substring(1))
            }
            alert("Total Bill"+" "+total);
            
            resolve()

        },2500)
    })
}
function orderprep(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve({order_status:true, paid:false})
        },1500)
    })
}
function payOrder(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve({order_status:true, paid:true})
        },1000)
    })
}
function thankYou(){
    alert("thankyou for eating with us today!")
}


