const email=document.querySelector("#email")
const password=document.querySelector("#password")
const btnLogin=document.querySelector("#btnLogin")

btnLogin.addEventListener("click",login);
const getEmail=localStorage.getItem("email");
const getPassword=localStorage.getItem("password");

function login(e){
    e.preventDefault();
    if((getEmail && getEmail.trim()===email.value.trim() && getPassword && getPassword===password.value))
    {
        alert(`hello ${localStorage.getItem("first")}`)
        setTimeout(()=>{
            window.location="index.html"
        },1500)

    }else{
        alert("incorrect credentials")
    }
}
//  if ( (getUser && getUser.trim() === username.value.trim() && getPassword && getPassword === password.value )  )