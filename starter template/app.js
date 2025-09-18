/* app.js */

//SELECT ELEMENTS

const productEl=document.querySelector(".products")

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

const cart=[]
function addTocart(id){
    if(cart.some((item)=>item.id===id)){
        console.log(item.qte)
    }else{let itemToBeAdded=products.find((item)=>item.id===id);
cart.push({
    ...itemToBeAdded,
    qte:1
});
console.log(cart)}

}

    