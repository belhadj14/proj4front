let iconCart=document.querySelector(".icon-cart");
let body=document.querySelector("body");
let closeCart=document.querySelector(".close");
let listProductsHtml=document.querySelector(".listProducts");
let listCartHtml=document.querySelector(".listCart");


let listProducts=[];
let cart=[];


iconCart.addEventListener("click",()=>{
body.classList.toggle('showCart')
});

// closeCart.addEventListener("click",()=>{
// body.classList.toggle('showCart')
// });

//////////////////////////////////////////////////////////
const addDataToHtml =()=>{
    listProductsHtml.innerHTML='';
    if(listProducts.length>0){
        listProducts.forEach((product)=>{
        let newProduct=document.createElement('div');
        newProduct.classList.add('item');
        newProduct.dataset.id=product.id
        newProduct.innerHTML=`<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
            listProductsHtml.appendChild(newProduct);
            })}}
   
/////////////////////////////////////////////////////////
listProductsHtml.addEventListener('click',(e)=>{
    let positionClick=e.target;
    if(positionClick.classList.contains('addCart')){
        let product_id=positionClick.parentElement.dataset.id;
        addToCart(product_id)
    }
})
/////////////////////////////////////////////////////////

const addToCart=(product_id)=>{
    let posThisPrInCart=cart.findIndex(value=>value.product_id===product_id)
if(cart.length<=0){
    cart=[{
        product_id:product_id,
        quantity:1
    }]
}else if(posThisPrInCart<0){
     cart.push({
        product_id:product_id,
        quantity:1
    });

}else{
    cart[posThisPrInCart].quantity+=1;
}
addToCartHtml();
}
////////////////////////////////////////////////////////
const addToCartHtml=()=>{
    listCartHtml.innerHTML='';
    if(cart.length>0){
        cart.forEach((value)=>{
         
         
         let  listCarContainer=document.createElement('div')
         listCarContainer.classList.add('item');
         let Pindex=listProducts.findIndex(el=>el.id==value.product_id)
         let {id,name,price,image}=listProducts[Pindex];
          

         listCarContainer.innerHTML=`
         <div class="image"><img src="${image}" alt="">
                </div>
                <div class="name">${name}</div>
                <div class="totalprice">${price*value.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${value.quantity}</span>
                    <span class="plus">></span>
                </div>
        
                `
                listCartHtml.appendChild(listCarContainer)
        })}



    }
    

///////////////////////////////////////////////////////////

const initApp=()=>{
fetch('products.json')
.then(response=>response.json())
.then (data=>{
    listProducts=data;
    addDataToHtml();

}
    
)

}
initApp();


