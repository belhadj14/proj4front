const links = document.getElementById("links")
const user = document.getElementById("user")
const user_info = document.getElementById("user-info")
const productsDiv = document.getElementById("products");
const items_added_Div = document.getElementById("item-added");
const items_count = document.querySelector(".badge");
const sc_icon = document.querySelector(".sc");
const cart_prod = document.querySelector(".cart-products");
sc_icon.addEventListener("click",()=>{
let pos = window.getComputedStyle(cart_prod).display;
cart_prod.style.display=(pos==="none")?"block":"none"

})







function render() {
    if (localStorage.getItem("email")) {
        links.remove();
        user_info.style.display = "flex"
        user.innerHTML = `Hello ${localStorage.getItem("first_name")}`

    } else {
        links.style.display = "flex";
        user.textContent = "";
        user_info.textContent = ""

    }
}
render();

let cart = JSON.parse(localStorage.getItem("itemsIncart"))||[];
let favItems=JSON.parse(localStorage.getItem("Favorite"))||[];

function drawItem(products) {
  productsDiv.innerHTML = products.map((item) => {
    const inCart = cart.some(c => c.id === item.id);
    const inFav = favItems.some(f => f.id === item.id);

    return `
      <div class="col-sm-7 col-md-3 product cc border border-black rounded-2 mt-3 p-0 me-3 d-flex flex-column">
        <img class="w-100" src=${item.image} alt="">
        <div class="details text-center d-flex flex-column justify-content-between">
          <div class="details-body p-1 d-flex flex-column justify-content-center align-items-center row">
            <h5 class="w-auto text-center">${item.name}</h5>
            <h6 class="w-auto">Price: $<span class="price-span">${item.price}</span></h6>
            <h6 class="w-auto">Category: <span class="category-span">${item.category}</span></h6>
          </div>
          <div class="btn-icon d-inline-flex justify-content-center gap-2 align-items-center mb-auto">
            <i class="bi bi-heart-fill fs-3 i${item.id} ${inFav ? "text-danger" : "text-secondary"}" onclick="addToFav(${item.id})"></i>
            <button class="p-1 bb btn-add-${item.id} rounded fw-bolder ${inCart ? "bg-danger" : "bg-primary"}" onclick="addToCart(${item.id})">
              ${inCart ? "Remove from cart" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>`;
  }).join("");
}


drawItem(products);




let changeLabel=false

// updateCart();


function addToCart(id) {
  let itemInCart = cart.find((item) => item.id === id);
  let btn = document.querySelector(".btn-add-" + id);

  if (itemInCart) {
    // already in cart → remove it
    cart = cart.filter((item) => item.id !== id);
    btn.innerHTML = "Add to cart";
    // btn.style.width='150px';
    btn.classList.remove("bg-danger");
    btn.classList.add("bg-primary");
    
  } else {
    // not in cart → add it
    let citem = products.find((item) => item.id === id);
    cart.push({ ...citem, qte: 1, total: citem.price });

    btn.innerHTML = "Remove from cart";
    // btn.style.width='250px';
    btn.classList.remove("bg-primary");
    btn.classList.add("bg-danger");
    
  }

  updateCart();
}



updateCart()

const addToFav = (id) => {
  const favItem = products.find(item => item.id === id);
  if (!favItem) return;

  const icon = document.querySelector(".i" + id); 

  const exists = favItems.some(item => item.id === id);

  if (!exists) {
    favItems.push(favItem);
    icon.classList.add("text-danger");
    icon.classList.remove("text-secondary");
  } else {
    favItems = favItems.filter(item => item.id !== id);
    icon.classList.remove("text-danger");
    icon.classList.add("text-secondary");
  }

  updateCart();
};

updateCart()

function updateCart() {
    drawItemCart();
    totalCalculation();
    // addToFav();
    
    localStorage.setItem("itemsIncart",JSON.stringify(cart))
    localStorage.setItem("Favorite",JSON.stringify(favItems))
}
function drawItemCart() {
    items_added_Div.innerHTML = '';
    cart.forEach((item) => {
        items_added_Div.innerHTML +=
            `<div id="it-cart">
            <div id="tit-pr">
        <p id="name">${item.name}</p>
        <p id="price">price: $ ${item.price}<p/>
    </div>
    <div id="plus-minus">
    <i class="bi bi-file-minus" onclick="updateQte('minus',${item.id})">
    </i><span>${item.qte}</span>
    <i class="bi bi-file-plus" onclick="updateQte('plus',${item.id})"></i></div>
    </div>
    `

    })
};
function updateQte(op, id) {
    cart = cart.map((item) => {
        let qte=item.qte;
        if(item.id===id){
            if(op==="plus"){
                qte++;
            }else if(op==="minus"){
                qte-=1;
                
               
            }
        }
        return{
            ...item,
            qte
        }}).filter((item) => item.qte > 0);
        
        updateCart();
    }
        
function totalCalculation(){
    let sum=cart.map((item)=>item.price*item.qte).reduce((acc,curr)=>acc+curr,0);
    items_count.innerHTML=cart.map((item)=>item.qte).reduce((acc,curr)=>acc+curr,0);
}

function deleteItem(id){
    cart=cart.filter((item)=>item.id!==id);
    
    updateCart();
}

// let favItems=JSON.parse(localStorage.setItem("favItems", JSON.stringify(favItems)))||[];




let form_select=document.getElementById("form-select")
let form_input=document.getElementById("form-input")


function filterItems() {
  let text = form_input.value.toLowerCase();
  let categ = form_select.value;

  let filtered = products.filter(item => {
    if (categ === "name") {
      return item.name.toLowerCase().includes(text);
    } else if (categ === "category") {
      return item.category.toLowerCase().includes(text);
    } else {
      // if nothing selected, search in both
      return (
        item.name.toLowerCase().includes(text) ||
        item.category.toLowerCase().includes(text)
      );
    }
  });

  drawItem(filtered);
}

// initial render
drawItem(products);

// re-run filter whenever input or select changes

// run filter on input typing and select change
form_input.addEventListener("input", filterItems);
form_select.addEventListener("change", filterItems);


function toggleHeart(icon) {
  icon.classList.toggle("text-danger");    // red
  icon.classList.toggle("text-secondary"); // gray
}