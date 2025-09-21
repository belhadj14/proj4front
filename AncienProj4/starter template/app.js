/* app.js */

//SELECT ELEMENTS

const productEl=document.querySelector(".products")
const cartEl=document.querySelector(".cart-items")
const subTotal=document.querySelector(".subtotal")
const Totalitems=document.querySelector(".total-items-in-cart")


function renderProducts(){
    products.forEach((product)=>{
        productEl.innerHTML+=` <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="t-shirt 1">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onclick="addTocart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>`


    })
}
renderProducts()

let cart=[]
function addTocart(id){
    if(cart.some((item)=>item.id===id)){
        updateQte('plus',id)
        
    }else{let itemToBeAdded=products.find((item)=>item.id===id);
cart.push({
    ...itemToBeAdded,
    qte:1
});
}
updateCart()

};
function updateCart(){
    renderCartItems();
    renderSubTotal();
};

function renderCartItems(){
    cartEl.innerHTML="";
    cart.forEach((item)=>{
        return cartEl.innerHTML+=`<div class="cart-item">
                    <div class="item-info">
                        <img src="${item.imgSrc}">
                        <h4>T-shirt 1</h4>
                    </div>
                    <div class="unit-price">
                        <small>$</small>${item.price}
                    </div>
                    <div class="units">
                        <div class="btn minus" onclick="updateQte('minus',${item.id})">-</div>
                        <div class="number">${item.qte}</div>
                        <div class="btn plus" onclick="updateQte('plus',${item.id})">+</div>           
                    </div>
                </div>`
    })
}
function updateQte(action,id){
    cart=cart.map((item)=>{
        let qte=item.qte
if (item.id===id){
    if(action==='plus' && qte<item.instock){
        qte++;
    }else if(action==='minus' && qte>1){
        qte--;
    }
}

        return {
            ...item,
            qte
    }})
    updateCart();
}
function renderSubTotal(){
   let subtotal= cart.map((item)=>item.price*item.qte).reduce((acc,curr)=>acc+curr,0).toFixed(2);
   let numOfitems=cart.map((item)=>item.qte).reduce((acc,curr)=>acc+curr,0);
   subTotal.innerHTML=`${subtotal} (${numOfitems} items): $0`;
   Totalitems.innerHTML=numOfitems
   
}