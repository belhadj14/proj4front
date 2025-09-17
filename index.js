const links=document.getElementById("links")
const user=document.getElementById("user")
const user_info=document.getElementById("user-info")
const productsDiv=document.getElementById("products");

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

const ss=products.map((item)=>console.log(item))
console.log(ss)

 function drawItem(){
     productsDiv.innerHTML=products.map((item)=>{return `<div class="col-sm-12 col-md-4 col-lg-3 product border border-black rounded-2 mt-3 p-0  me-3">
                <img class="w-100" src=${item.image} alt="">
        <div class="details text-center  d-flex flex-column justify-content-between">
            <div class="details-body  p-1 d-flex flex-column justify-content-center align-items-start row">
                <h5 class="w-auto text-center">${item.name}</h5>
                <h6 class="w-auto">Price: $<span class="price-span">400</span></h6>
                <h6 class="w-auto">Category: <span class="category-span">${item.category}</span></h6>
           </div>
            <div class="btn-icon d-inline-flex justify-content-center gap-2 align-items-center mb-2">
                <i class="bi bi-heart-fill fs-3"></i>
                <button class="p-1 rounded bg-primary-subtle fw-bolder fs-5">Add to cart</button>
            </div>
       </div>
           
    </div>`})
}
drawItem()