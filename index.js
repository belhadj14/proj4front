const links=document.getElementById("links")
const user=document.getElementById("user")

if(localStorage.getItem("email")){
links.remove();
user.innerHTML=`Hello ${localStorage.getItem("first_name")}`

}