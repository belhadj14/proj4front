let email_input=document.querySelector("input[type=email]");
let firstname_input=document.querySelector("#firstname");
let lastname_input=document.querySelector("#lastname");

let password_input=document.querySelector("#password");
const btnRegister=document.getElementById("btnRegister")


btnRegister.addEventListener("click",function(e)
{
    e.preventDefault();
    if(!email_input.value||!firstname_input.value||!lastname_input.value||!password_input.value){
        window.alert("Please fill all the form fields")
    }
    else{
        localStorage.setItem("first_name",firstname_input.value);
        localStorage.setItem("last_name",lastname_input.value);
        localStorage.setItem("email",email_input.value);
        localStorage.setItem("password",password_input.value);

        setTimeout(()=>{window.location="login2.html"},1500)

        
    }


})