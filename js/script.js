const productsContainer = document.querySelector("#products-container")
const user = document.querySelector("#user");
const links = document.querySelector("#links");
const cartIcon = document.querySelector(".shopping_cart")
const badge = document.querySelector(".badge")


products = [
    {
        id: 1,
        name: "Black Bracelet",
        imgUrl: "images/black bracelet.jpg",
        category: "Bracelets",
        price: "400"
    },

    {
        id: 2,
        name: "Gold Watch",
        imgUrl: "images/gold-watch-ring-white-plate.jpg",
        category: "Watches",
        price: "200"
    },

    {
        id: 3,
        name: "Golden Bracelet",
        imgUrl: "images/golden set bracelet 2.jpg",
        category: "Bracelets",
        price: "400"
    },

    {
        id: 4,
        name: "Golden Earing",
        imgUrl: "images/silver set.jpg",
        category: "Earings",
        price: "400"
    },
    {
        id: 5,
        name: "Golden Earing",
        imgUrl: "images/silver ring.jpg",
        category: "Earings",
        price: "400"
    },
    {
        id: 6,
        name: "Golden Earing",
        imgUrl: "images/still-life-tech-device.jpg",
        category: "Earings",
        price: "400"
    },
    {
        id: 7,
        name: "Golden Earing",
        imgUrl: "images/reflection-background-gold-pendant-precious-glass.jpg",
        category: "Earings",
        price: "400"
    },
    {
        id: 8,
        name: "Golden Earing",
        imgUrl: "images/luxury-shine-diamonds-digital-art.jpg",
        category: "Earings",
        price: "400"
    },
    {
        id: 9,
        name: "Golden Earing",
        imgUrl: "images/golden set bracelet.jpg",
        category: "Earings",
        price: "400"
    },

];

let itemsInCart=JSON.parse(localStorage.getItem("data"))||[];;

function drawItem() {
    let allproducts = products.map((item) => {
        return `<div id="product-${item.id}" class="card card col-md-3 col-sm-1 p-0"  style="width: 18rem;height:450px">
                <img src="${item.imgUrl}" class="card-img-top w-100" style="height:270px;" alt="a">
                <div class="card-body d-flex flex-column justify-content-center align-items-start ps-5 w-75 h-25 m-auto text-start">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Price:${item.price}$</p>
                    <p class="card-text">Category:${item.category}</p>

                    <div class="fav_add">
                    <div id="item-added"></div>
                        <i class="fa-solid fa-heart"></i>
                        <a href="#" class="btn btn-primary btnAddToCart" onClick="addToCart(${item.id})">Add to cart</a>
                    </div>
                </div>
            </div>`
    }

    ).join("")
    productsContainer.innerHTML = allproducts;

};
drawItem();


if (localStorage.getItem("email")) {
    links.remove();
    user.style.display = "flex"
    user.innerHTML = `Hello ${localStorage.getItem("first")}`;
    cartIcon.style.display = "block";




}
const btnAddToCart = document.querySelectorAll(".btnAddToCart")
const divAddedItem = document.querySelector(".carts_products div")


// div class="btns">
//                        <i class="bi bi-dash-lg" onclick="decrement(${id})"></i>
//                         <div id=${id} class="quantity">${choosenItem.quantity === undefined ? 0 : choosenItem.quantity}</div>
//                         <i class="bi bi-plus-lg" onclick="increment(${id})"></i>


//                     </div>


function addToCart(e) {
    if (localStorage.getItem("first")) {
        let choosenItem = products.find((item) => item.id === e);
        divAddedItem.innerHTML += `<div id=product-id-${choosenItem.id}>
            <p class="text-center">${choosenItem.name}</p>
            <div class="btns d-flex justify-content-center gap-2">
            <i class="bi bi-dash-lg" onclick="decrement(${choosenItem.id})"></i>
            <div id=${choosenItem.id} class="qte">${choosenItem.quantity===undefined?1:choosenItem.quantity}</div>
            <i class="bi bi-plus-lg" onclick="increment(${choosenItem.id})"></i>
            </div>
        </div>`
    } else {
        window.location = "login.html"
    }



}
let increment=(id)=>{
    let selectedItem=id;
    let searsh=itemsInCart.find((item)=>item.id===selectedItem)
    if(searsh===undefined){
        itemsInCart.push({id:selectedItem,quantity:1})
    }else{
        searsh.quantity+=1;
    }
     localStorage.setItem("data",JSON.stringify(itemsInCart));
    update(selectedItem)
    
}


// function hideDiv(id){
//      let searsh = itemsInCart.find((item) => item.id === id);
//      document.getElementById("product-id-"+searsh.id).style.display=none;

// }

let decrement = (id) => {
    let searsh = itemsInCart.find((item) => item.id === id);
    if (!searsh) return;
    if (searsh.quantity === 0) return;

    searsh.quantity -= 1;

    if (searsh.quantity === 0) {
        // remove from array
        itemsInCart = itemsInCart.filter((item) => item.id !== id);
        // hideDiv(id);

        
        
    }
    update(id);
    

    localStorage.setItem("data", JSON.stringify(itemsInCart));
};


let update=(id)=>{
let search=itemsInCart.find((el)=>el.id===id)
if (search){
    document.getElementById(id).innerHTML=search.quantity
    
}
calculation();

}
let calculation=(()=>{
    let cartIcon=document.getElementById("cartAmount");
    let cd=itemsInCart.map((x)=>x.quantity)
    const sumWithInitial = cd.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0,
);
badge.innerHTML=sumWithInitial
})
calculation()


// if (localStorage.getItem("username")){
//     links.remove()
//     userInfo.style.display ="flex"
//     userD.innerHTML = localStorage.getItem("username")
// }
// let logOutBtn = document.querySelector("#logout")
// logOutBtn.addEventListener("click", function (){
//     localStorage.clear();
//     setTimeout(() => {
//         window.location = "login.html";
//     } , 1500)
// })
