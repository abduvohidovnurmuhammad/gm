import { products } from "./data.js";
const productbox = document.querySelector(".product")
const cart = document.querySelector(".cart")
const price = document.querySelector(".price")

const cartArr = []
const totalPrice = ()=>{
    const aallprice =  cartArr.reduce((a,b)=>(a+b.totalPrice),0)
    price.textContent = aallprice + "$"
}
function renderProduct(){
    productbox.innerHTML = ''
  products.forEach((item)=>{
     if(item.count >0 ){
        let li = document.createElement('li')
        li.className = "products__item"
        li.innerHTML = `
                    <div class="products__img">
                <img src="${item.img}" alt="">
            </div>

            <div class="products__content">
              <h2>${item.name }</h2>
            <p>${item.text} </p>
            <p>${item.price}</p>
            <p>${item.count}</p>
             <button class="remove" id = "${item.id}" style="padding: 5px;">-</button><span class="span">${item.count}</span><button class="add" id="${item.id}" style="padding: 5px;">+</button>
            </div>

        `
        productbox.append(li)
     }
  })  
}
renderProduct()
function rendercart(){
    cart.innerHTML = ''
  cartArr.forEach((item)=>{
    if(item.orderCount > 0 ){
        let li = document.createElement('li')
        li.className = "products__item"
        li.innerHTML = `
                    <div class="products__img">
                <img src="${item.img}" alt="">
            </div>

            <div class="products__content">
              <h2>${item.name }</h2>
            <p>${item.text} </p>
            <p>${item.price}</p>
            <p> ${item.totalPrice} narxi </p>
            <p>${item.orderCount} order </p>
            </div>

        }  
        `
        cart.append(li)
  } 
     
  })
}
productbox.addEventListener("click",(e)=>{
    const id = e.target.id
    for(let i of products){
    if(e.target.className== "add"){
            if(i.id == id){
                let product = cartArr.find((item)=> item.id == id)
                if(!product){
                    cartArr.push({...i,totalPrice:i.price,orderCount:1})
                    i.count= i.count-1

                }
                else{
                   for(let cartitem of cartArr){
                    if(cartitem.id == id){
                        cartitem.orderCount+=1  
                        cartitem.totalPrice = cartitem.price*cartitem.orderCount
                        i.count= i.count-1
                    }
                   } 
                }
            }
        }
        if(e.target.className == 'remove'){
         if(i.id ==id  ){
            for( let cartItem of cartArr){
                if(cartItem.orderCount>0){

                    i.count+=1;
                    cartItem.orderCount-=1  
                    cartItem.totalPrice = cartItem.price*cartItem.orderCount
                }
            }
         }
      }
        rendercart()
        renderProduct()
        totalPrice()
    }
})