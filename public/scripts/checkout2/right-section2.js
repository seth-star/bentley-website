import { getOption2 } from "../../data/breakfast.js";
import { cart2 } from "../cart-conference.js";



export function renderRightSection2() {
  
  let accommodation = 0;
  let breakfast = 0;
  let pax = 0;
  let pax2 = 0;
  let total = 0;
  
  cart2.forEach((cartItem)=> {
   
   const roomPrice = getOption2(cartItem).priceCents;
   const roomQuantity = cartItem.quantity;
  
   
   const checkinDate = cartItem.checkin;
   const checkoutDate = cartItem.checkout;
   const startTimestamp = new Date(checkinDate).getTime();
   const endTimestamp = new Date(checkoutDate).getTime();
   const difference = endTimestamp - startTimestamp;
   let differenceDays = Math.round(difference/(1000*60*60*24));
  
   const number = differenceDays === 0
   ? differenceDays = 1
   : differenceDays += 1
   accommodation = roomPrice;
   pax2 += cartItem.pax
   pax = cartItem.pax
   breakfast += getOption2(cartItem).priceCents;
   total += accommodation*number*pax*roomQuantity ;
   
   let html =
   `   <div class="order-summary">
         Booking Summary
       </div>

       <div class="accommodation-price">
         <div class="container1">
           Option Selected:
         </div>
         <div class="container2">
           R${breakfast}
         </div>
       </div>

       <div class="accommodation-price">
         <div class="container1">
           Number of person(s):
         </div>
         <div class="container2">
           ${pax2}
         </div>
       </div>

       <div class="div">
         <div class="div2">
         </div>
       </div>

       <div class="accommodation-price1">
         <div class="container1">
           Order total:
         </div>
         <div class="container2">
           R${total}
         </div>
        </div>

       <div class="place-your-order">
          <button class="place-your-order js-place-order2">Place your order</button>
       </div>
       `
       document.querySelector('.js-right-section').innerHTML = html;
          document.querySelector('.js-place-order2').addEventListener('click',async ()=>{
               
           try{
               const response = await fetch('/conference',{
                   method:'POST',
                   headers: {
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({
                    cart2:cart2,
                    total:total,
                    breakfast:breakfast
                   }),
                  });
                 
                  const order2 = await response.json();
                   localStorage.removeItem('cart2');
               } catch (error){
                 console.log( error);
                 
               }
               window.location.href ='/submit/';
              
              });
          
  });
 
}
