const links = document.getElementById("links");
const user = document.getElementById("user");
const user_info = document.getElementById("user-info");
const productsDiv = document.getElementById("products");
const items_added_Div = document.getElementById("item-added");
const items_count = document.querySelector(".badge");
const total_price=document.getElementById("total-price")

function render() {
  if (localStorage.getItem("email")) {
    links.remove();
    user_info.style.display = "flex";
    user.innerHTML = `Hello ${localStorage.getItem("first_name")}`;
  } else {
    links.style.display = "flex";
    user.textContent = "";
    user_info.textContent = "";
  }
}
render();

cartItems = JSON.parse(localStorage.getItem("itemsIncart"));
update_it_price();

function drawItem() {
  productsDiv.innerHTML = cartItems
    .map((item) => {
      return `<div class="card mb-3 d-flex align-items-center gap-3 me-5 col-8" style="max-width: 515px;max-height:180px">
                    <div class="row g-0 d-flex  p-2">
                        <div class="col-md-4">
                            <img src="${item.image}" class="img-fluid h-75  mt-3 rounded-3" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <p class="card-title fw-semibold">${item.name}</p>
                                <p class="card-text">category: ${item.category}</p>
                                <p class="card-text fw-bold">Price: <small class="text-muted tp-item-${item.id}">${item.total}</small></p>
                            </div>
                            <div class="btn-cart  d-flex justify-content-around">
                                <div id="plus-minus">
                                    <i class="bi bi-file-minus" onclick="updateQty('minus',${item.id})">
                                    </i><span>${item.qte}</span>
                                    <i class="bi bi-file-plus" onclick="updateQty('plus',${item.id})"></i>
                                </div>
                                <button class="p-1 bbc bg-danger btn-add-${item.id} d-block rounded bg-primary fw-bold"
                                    onclick="removeFromCart(${item.id})">Remove from cart</button>
                            </div>
                        </div>

                    </div>
                </div>
   
    
    `;
    })
    .join("");
}
drawItem();
function updateCarty() {
  
 
  drawItem();
   update_it_price();
  totalCalculation();
  addCartToLocal()
  
};
///

function updateQty(op, id) {
  cartItems = cartItems.map((item) => {
    let qte = item.qte;
    let total = item.total*qte
    

    if (item.id === id) {
      if (op === "plus") {
        let price = item.price;
        qte++;
        total=price*qte
      } else if (op === "minus") {
        let price = item.price;
        qte--;
        total=price*qte
      }
    }

    return {
      ...item,
      qte,
      total:total
    };
  });
  updateCarty();
}

const addCartToLocal = () => {
  localStorage.setItem("itemsIncart", JSON.stringify(cartItems));
};
function totalCalculation() {
    if(cartItems.length>0){
  total_price.innerHTML=`Total Price : $ `+cartItems.map((item)=>item.price*item.qte).reduce((acc,curr)=>acc+curr,0);
  items_count.innerHTML = cartItems
    .map((item) => item.qte)
    .reduce((acc, curr) => acc + curr, 0);
}else{
    total_price.innerHTML='The cart is empty';
}}
const subtotal=()=>{
    cartItems=cartItems.map((el) => {
        el.total=el.price*el.qte;
      
    }); 
}
totalCalculation();
function update_it_price() {
  cartItems.forEach((el) => {
    let total=el.total
    total=el.price*el.price
    return {...el,total:total}
  })
  
}

const removeFromCart=(id)=>{
    cartItems=cartItems.filter(item=>item.id!==id);
    updateCarty();
}
console.log(cartItems);
