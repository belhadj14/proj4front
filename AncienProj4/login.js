let email_input=document.querySelector("input[type=email]");


let password_input=document.querySelector("input[type=password]");
const btnLogin=document.getElementById("btnLogin")


btnLogin.addEventListener("click",(e)=>{
   e.preventDefault();
    if(localStorage.getItem("email"))
    {
       if(email_input.value===localStorage.getItem("email") && password_input.value.trim()===localStorage.getItem("password")){
        console.log("login success");
        setTimeout(()=>{window.location="index4.html"},1500)
       }
       else{
console.log("invalid credentials");
    }
    }

    
    
})