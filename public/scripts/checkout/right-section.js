import { cart } from "../cart.js";
import { getRoom } from "../../data/rooms.js";
import { getOption } from "../../data/breakfast.js";

export function renderRightSection() {
 
  let accommodation = 0;
  let breakfast = 0;
  let total = 0;
  
  cart.forEach((cartItem)=> {
   
   const roomPrice = getRoom(cartItem).priceCents;
   const roomQuantity = cartItem.quantity;
  
   const checkinDate = cartItem.checkin;
   const checkoutDate = cartItem.checkout;
   const startTimestamp = new Date(checkinDate).getTime();
   const endTimestamp = new Date(checkoutDate).getTime();
   const difference = endTimestamp - startTimestamp;
   const differenceDays = Math.round(difference/(1000*60*60*24));
   accommodation += roomPrice * roomQuantity*differenceDays;
  
   const option = getOption(cartItem).persons === 'all in the room(s)'
   ? breakfast += 95*cartItem.pax
   : breakfast += getOption(cartItem).priceCents*differenceDays;
   total = accommodation+breakfast ;
   
   let html =
   `   <div class="order-summary">
         Booking Summary
       </div>
       <div class="accommodation-price">
         <div class="container1">
           Accommodation:
         </div>
         <div class="container2">
           R${accommodation}
         </div>
         
       </div>
       <div class="accommodation-price">
         <div class="container1">
           Breakfast:
         </div>
         <div class="container2">
           R${option}
         </div>
       </div>

       <div class="div">
         <div class="div2"></div>
       </div>

       <div class="accommodation-price1">
         <div class="container1">
           Order total:
         </div>
         <div class="container2 js-total" >
           R${total}
         </div> 
       </div>
         
       <div class="place-your-order">
          <button class="place-your-order js-place-order">Place your order</button>
       </div>
 `
  
  document.querySelector('.js-right-section').innerHTML = html;

 
   document.querySelector('.js-place-order').addEventListener('click',async ()=>{
        
    try{
        const response = await fetch('/accommodation',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             cart:cart,
             total:total,
             option:option
            }),
           });
          
          const order = await response.json();
           
        } catch (error){
          console.log( error);
          
        }
        localStorage.removeItem('cart');
        window.location.href ='/submit2/';

       });
       
    }); 
}
