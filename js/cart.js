const links = document.getElementById("links");
const user = document.getElementById("user");
const user_info = document.getElementById("user-info");
const productsDiv = document.getElementById("products");
const favproductsDiv = document.getElementById("favProducts");
const items_added_Div = document.getElementById("item-added");
const items_count = document.querySelector(".badge");
const total_price = document.getElementById("total-price");

function render() {
  if (localStorage.getItem("email")) {
    links.remove();
    user_info.style.display = "flex";
    user.innerHTML = `Hello ${localStorage.getItem("first_name")}`;
  } else {
    links.style.display = "flex";
    user.textContent = "";
    user_info.style.display = "none";
  }
}
render();

let cartItems = JSON.parse(localStorage.getItem("itemsIncart")) || [];
let favItems = JSON.parse(localStorage.getItem("Favorite")) || [];

function drawItem() {
  productsDiv.innerHTML = cartItems
    .map((item) => {
      return `
      <div class="card mb-3 d-flex align-items-center gap-3 me-5 col-5" style="max-width: 450px;max-height:250px">
        <div class="row g-0 d-flex p-2">
          <div class="col-md-4">
            <img src="${item.image}" class="img-fluid h-75 mt-3 rounded-3" alt="">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <p class="card-title fw-semibold">${item.name}</p>
              <p class="card-text">category: ${item.category}</p>
              <p class="card-text fw-bold">Price: 
                <small class="text-muted tp-item-${item.id}">${item.total}</small>
              </p>
            </div>
            <div class="btn-cart d-flex justify-content-around">
              <div id="plus-minus">
                <i class="bi bi-file-minus" onclick="updateQty('minus',${item.id})"></i>
                <span>${item.qte}</span>
                <i class="bi bi-file-plus" onclick="updateQty('plus',${item.id})"></i>
              </div>
              <button class="p-1 bbc bg-danger btn-add-${item.id} d-block rounded bg-primary fw-bold"
                onclick="removeFromCart(${item.id})">Remove from cart</button>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join("");
}
drawItem();

function drawFav(favItems) {
  favproductsDiv.innerHTML = favItems
    .map((item) => {
      return `
      <div class="col-sm-12 col-md-4 col-lg-2 product cc fv border border-black rounded-2 mt-3 p-0 me-3 d-flex flex-column">
        <img class="w-100 h-50" src="${item.image}" alt="">
        <div class="details bg-blue pt-1 text-center d-flex flex-column justify-content-start">
          <div class="details-body pt-1 d-flex flex-column justify-content-center align-items-center row">
            <h6 class="w-auto text-center">${item.name}</h6>
            <p class="w-auto text-center">Category: 
              <span class="category-span">${item.category}</span>
            </p>
          </div>
          <div class="btn-icon-fav d-inline-flex favheart justify-content-center gap-1 align-items-center mb-auto">
            <i class="bi bi-heart-fill fs-3 text-danger" onclick="removeFav(${item.id})"></i>
          </div>
        </div>
      </div>`;
    })
    .join("");
}
drawFav(favItems);

function updateCarty() {
  drawItem();
  addCartToLocal();
  drawFav(favItems);
  totalCalculation();
  update_it_price();
}

function updateQty(op, id) {
  cartItems = cartItems
    .map((item) => {
      let qte = item.qte;
      let total = item.total;

      if (item.id === id) {
        let price = item.price;
        if (op === "plus") {
          qte++;
        } else if (op === "minus" && qte > 0) {
          qte--;
        }
        total = price * qte;
      }

      return { ...item, qte, total };
    })
    .filter((item) => item.qte > 0);

  updateCarty();
}

const addCartToLocal = () => {
  localStorage.setItem("itemsIncart", JSON.stringify(cartItems));
};

function totalCalculation() {
  if (cartItems.length > 0) {
    total_price.innerHTML =
      `Total Price : $ ` +
      cartItems
        .map((item) => item.price * item.qte)
        .reduce((acc, curr) => acc + curr, 0);

    items_count.innerHTML = cartItems
      .map((item) => item.qte)
      .reduce((acc, curr) => acc + curr, 0);
  } else {
    total_price.innerHTML = "The cart is empty";
    items_count.innerHTML = "0";
  }
}

const subtotal = () => {
  cartItems = cartItems.map((el) => {
    return { ...el, total: el.price * el.qte };
  });
};

function update_it_price() {
  return cartItems.map((el) => {
    let total = el.price * el.qte;
    return { ...el, total };
  });
}

function removeFromCart(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  updateCarty();
}


function removeFav(id) {
  favItems = favItems.filter(item => item.id !== id);
  localStorage.setItem("Favorite", JSON.stringify(favItems)); // ✅ update storage
  updateCarty();
}

totalCalculation();
console.log(cartItems);
