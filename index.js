const links=document.getElementById("links")
const user=document.getElementById("user")
const user_info=document.getElementById("user-info")
const productsDiv=document.getElementById("products");
const items_added_Div=document.getElementById("item-added");



function render(){
if(localStorage.getItem("email")){
links.remove();
user_info.style.display="flex"
user.innerHTML=`Hello ${localStorage.getItem("first_name")}`

}else{
links.style.display="flex";
user.textContent="";
user_info.textContent=""

}}
render();

// const ss=products.map((item)=>console.log(item))
// console.log(ss)

 function drawItem(){
     productsDiv.innerHTML=products.map((item)=>{return `<div id=p${id}><div class="col-sm-12 col-md-4 col-lg-3 product border border-black rounded-2 mt-3 p-0  me-3">
                <img class="w-100" src=${item.image} alt="">
        <div class="details text-center  d-flex flex-column justify-content-between">
            <div class="details-body  p-1 d-flex flex-column justify-content-center align-items-start row">
                <h5 class="w-auto text-center">${item.name}</h5>
                <h6 class="w-auto">Price: $<span class="price-span">${item.price}</span></h6>
                <h6 class="w-auto">Category: <span class="category-span">${item.category}</span></h6>
           </div>
            <div class="btn-icon d-inline-flex justify-content-center gap-2 align-items-center mb-auto">
                <i class="bi bi-heart-fill fs-3"></i>
                <button class="p-1 btn-add rounded bg-primary-subtle fw-bolder fs-5" onclick=addToCart(${item.id})>Add to cart</button>
            </div>
       </div>
           
    </div></div>`}).join("")
}
drawItem();





function addToCart(id){
    let choosenItem=products.find((item)=>item.id===id);
    let {product_id,name,category,description,image,price}=choosenItem;
    let btn_add=document.querySelector(".btn-add");
    if(btn_add.textContent==="Add to cart") 
        
    
    {items_added_Div.innerHTML+=
    `<div id="it-cart"><div id="tit-pr">
        <p id="name">${name}</p>
        <p id="price">price: $ ${price}<p/>
    </div>
    <div id="plus-minus"><i class="bi bi-file-minus"></i><span>1</span><i class="bi bi-file-plus"></i></div>
    </div>
    `
    btn_add.textContent="Remove from cart";
    btn_add.style.display="block";
    btn_add.style.backgroundColor="red"

}
    else{
        return
    }
    

}