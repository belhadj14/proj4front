const links = document.getElementById("links")
const user = document.getElementById("user")
const user_info = document.getElementById("user-info")
const productsDiv = document.getElementById("products");
const items_added_Div = document.getElementById("item-added");
const items_count = document.querySelector(".badge");






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



function drawItem() {
    productsDiv.innerHTML = products.map((item) => {
        
        return `<div class="col-sm-12 col-md-4 col-lg-3 product cc border border-black rounded-2 mt-3 p-0  me-3">
                <img class="w-100" src=${item.image} alt="">
        <div class="details text-center  d-flex flex-column justify-content-between">
            <div class="details-body  p-1 d-flex flex-column justify-content-center align-items-start row">
                <h5 class="w-auto text-center">${item.name}</h5>
                <h6 class="w-auto">Price: $<span class="price-span">${item.price}</span></h6>
                <h6 class="w-auto">Category: <span class="category-span">${item.category}</span></h6>
           </div>
            <div class="btn-icon d-inline-flex justify-content-center gap-2 align-items-center mb-auto">
                <i class="bi bi-heart-fill fs-3"></i>
                <button class="p-1 bb btn-add-${item.id} rounded bg-primary fw-bolder" onclick="addToCart(${item.id})">Add to cart</button>
            </div>
       </div>
           
    </div>
   
    
    `
;}).join("")

}
drawItem();




let changeLabel=false
let cart = JSON.parse(localStorage.getItem("itemsIncart"))||[];
updateCart();


function addToCart(id) {
    if (cart.find((item) => item.id === id)) {
       let itemToDel=cart.find((item)=>item.id===id);
       let add_btn=document.querySelector(".btn-add-"+itemToDel.id);
       add_btn.innerHTML="Add to cart";
       deleteItem(itemToDel.id);
       
    
       
        

        // updateCart();
        
        
    } else {
        let citem = products.find((item) => item.id === id)
    //     let add_btn=document.querySelector(".btn-add-"+citem.id);
    //    add_btn.innerHTML="Remove from cart";
    //    add-btn.classList.add('bg-danger');
        cart.push({ ...citem, qte: 1 })
        
       
       
        
        

    }
    updateCart();
}
function updateCart() {
    drawItemCart();
    totalCalculation();
    updateBtn();
    localStorage.setItem("itemsIncart",JSON.stringify(cart))
}
function drawItemCart() {
    items_added_Div.innerHTML = '';
    cart.forEach((item) => {
        items_added_Div.innerHTML +=
            `<div id="it-cart"><div id="tit-pr">
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
            }else if(op==="minus" && qte>1){
                qte--;
            }
        }
        return{
            ...item,
            qte
        }});
        updateCart();
    }
        
function totalCalculation(){
    let sum=cart.map((item)=>item.price*item.qte).reduce((acc,curr)=>acc+curr,0);
    items_count.innerHTML=cart.map((item)=>item.qte).reduce((acc,curr)=>acc+curr,0);
}
function updateBtn(){
    // cart.forEach((item)=>{
    //     let add_btn=document.querySelector(".btn-add-"+item.id)
        
    //     add_btn.innerHTML="Remove from cart";
    //     add_btn.classList.add('bg-danger');
    //     add_btn.style.width="200px";})
    //     let difference = products.filter((item )=> !cart.includes(item));
    //     difference.forEach((item)=>{
    //     let add_btn=document.querySelector(".btn-add-"+item.id)
        
    //     add_btn.innerHTML="Add to cart";
    //     add_btn.classList.add('bg-primary');
    //     add_btn.style.width="200px";

    // })
    
    
    }
function deleteItem(id){
    cart=cart.filter((item)=>item.id!==id);
    
    updateCart();
}






