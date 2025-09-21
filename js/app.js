let conta=document.querySelector(".card-users")
fetch("https://jsonplaceholder.typicode.com/users")
.then(res=>res.json())
.then(data=>{
    let y=data.map((item)=>
    {return `
        <div class="user-card">
        <div class="header">${item.name}</div>
        <div class="body">${item.email}</div>
        </div>
        `}
    ).join(" ");
conta.innerHTML=y
}
)
// let searchInput=document.getElementById("search");
// searchInput.addEventListener("input",(e=>console.log(e.target.value)))
// let he=document.querySelectorAll(".header");
// let y=Array.from(he).map(item=>console.log(item.innerHTML))

// he.forEach(item=>console.log(item.innerHTML))

let items = [...document.querySelectorAll(".header")];
let texts = items.map(el => el.textContent);

console.log(texts); // ["Item 1", "Item 2", "Item 3"]