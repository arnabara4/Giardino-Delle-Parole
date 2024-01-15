let iconCart=document.querySelector('.Cart');
let body =document.querySelector('.cartTab');
let hidecart=document.querySelector('.close')
let listproducthtml=document.querySelector('.Listcart')
let menuitems=document.querySelector('.menu')
let totalquant=document.querySelector('.itemno')
iconCart.addEventListener('click',()=>{
    body.classList.add('showcart')
})
hidecart.addEventListener('click',()=>{
    body.classList.remove('showcart')
})
let ListProduct=[];
let carts=[];
const initapp=()=>{
    fetch('products.json')
    .then(response=>response.json())
    .then(data =>{
        ListProduct=data;
        console.log(ListProduct);
    })
}


const additemtohtml=()=>{
    listproducthtml.innerHTML='';
    let totalQuantity=0
    if(carts.length>0){
        carts.forEach(cart=>{
            totalQuantity=totalQuantity+cart.quantity
            let newcart=document.createElement('div')
            newcart.dataset.id=cart.productid
            newcart.classList.add('item')
            let positionproduct = ListProduct.findIndex((value)=>value.id==cart.productid)
            let info=ListProduct[positionproduct];
            newcart.innerHTML=`
                <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">${info.name}</div>
                <div class="totalprice">${info.price*cart.quantity}</div>
                <div class="quantity">
                     <span class="minus"><</span>
                     <span class="num">${cart.quantity}</span>
                     <span class="plus">></span>
                </div>`
            listproducthtml.appendChild(newcart);

        })
            
    }
    totalquant.innerHTML=totalQuantity;

}
const changeQuantity=(pid,type)=>{
    let pos=carts.findIndex((value)=>value.productid==pid)
    if(pos>=0){
        switch(type){
            case 'plus':
                carts[pos].quantity=carts[pos].quantity+1;
                break;
            
            default:
                let valuechange=carts[pos].quantity-1;
                if(valuechange>0){
                    carts[pos].quantity=valuechange;
                }
                else{
                    carts.splice(pos,1);
                }
                break;
            
        }
    }
    additemtohtml();
    

}
const addtocart=(pid)=>{
    let currentpos=carts.findIndex((value)=> value.productid==pid);
        if (carts.length<=0){
        carts=[{
            productid:pid,
            quantity:1

        }]    
    }else if(currentpos<0){
        carts.push({
            productid:pid,
            quantity:1
           
        })
    }else{
        carts[currentpos].quantity=carts[currentpos].quantity+1;

    }
    additemtohtml();

    console.log(carts);
}

listproducthtml.addEventListener('click',(event)=>{
    let positionclick=event.target;
    if(positionclick.classList.contains('minus') || positionclick.classList.contains('plus')){
        let position_id=positionclick.parentElement.parentElement.dataset.id;
        console.log(position_id)
        let type='minus';
        if(positionclick.classList.contains('plus')){
            type='plus'
        }
        changeQuantity(positionclick.parentElement.parentElement.dataset.id,type);
    }
})
initapp();
menuitems.addEventListener('click',(event)=>{
    let positionClick=event.target;
    if(positionClick.classList.contains('addtocart')){
        ListProduct.forEach((value)=>{
            if(value.id==positionClick.parentElement.id){
                let a=value.id;
                addtocart(a)
            }
        })
    }
})



