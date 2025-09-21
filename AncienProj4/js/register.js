
const firstName=document.querySelector("#firstname")
const lastName=document.querySelector("#lastname")
const email=document.querySelector("#email")
const password=document.querySelector("#password")
const btnRegister=document.querySelector("#btnRegister")
console.log(btnRegister);



btnRegister.addEventListener("click",register)


function register(e){
     e.preventDefault();
    if(firstName.value.trim()===""||lastName.value.trim()===""||email.value.trim()===""||password.value.trim()===""){
    return alert("Please fill data");
}else{
    localStorage.setItem("first",firstName.value.trim());
    localStorage.setItem("last",lastName.value.trim());
    localStorage.setItem("email",email.value.trim());
    localStorage.setItem("password",password.value.trim());
    setTimeout(()=>{
    window.location="login.html"
},1500)

}

}


// firstName.value="hello";
// lastName.value="hello";
// email.value="hello";
// password.value="12345"
