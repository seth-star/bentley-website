import { cart2,removeFromCart2,updateBreakfastOptions2,checkinDate2, updateCartQuantity2,updateQuantity2 } from "../cart-conference.js";
import { getRoom2 } from "../../data/conferences.js";
import { renderRightSection2 } from "./right-section2.js";
import { breakfastOptions2 } from "../../data/breakfast.js";

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";



export function renderCheckout2() {
  
  let checkoutHTML = '';
  cart2.forEach((cartItem)=>{

   const matchingRoom = getRoom2(cartItem);

   const today = dayjs();
   const bookingDate = today.format('dddd, MMMM D');
  

   checkoutHTML += 

   ` 
   <div class="reservation-containers js-reservation-${matchingRoom.id}">
    <div class="reservation-date">
        <div>
        <span class="date"> Date:</span> ${bookingDate}
        </div>
        <div>
         <span class="date">Email:</span>${cartItem.email}
        </div>
      </div>
     <div class="booking-summary">
      <div class="image-container">
       <img src="/${matchingRoom.image}" class="picture">
      </div>
      <div class="room-detail">
        <div class="type-price2">
            ${matchingRoom.type} 
        </div>
        <div class="type-price2" >
          <div class="checkin-out">
           First Day:
          </div>
         <div >
         ${cartItem.checkin}
         </div>
        </div>
        
        <div class="type-price-time" >
          <div class="checkin-out">
           Arrival Time:
          </div>
         <div class="number-rooms">
           ${cartItem.time}
         </div>
        </div>

        <div class="type-price2" >
          <div class="checkin-out">
           Last Day:
          </div>
         <div >
         ${cartItem.checkout}
         </div>
        </div>

        <div class="quantity">
          <a class="infos" href="/images/conference-halls/extra-info-conference.jpg">infos</a>
         <div class="pax-div">
          <div>Pax :</div>
          <div class="pax-option js-pax-option js-pax-option-${matchingRoom.id}" data-conference-id="${matchingRoom.id}">
             ${cartItem.pax}
          </div>
         </div>
            
          
         <input type="number" class="input js-input js-input-${matchingRoom.id}">
          
           
          
          <div class="update js-update js-update-${matchingRoom.id} " data-conference-id="${matchingRoom.id}">Update </div>
         
          <div class="save js-save js-save-${matchingRoom.id}"data-conference-id="${matchingRoom.id}">Save</div>

          
          <div class="delete js-delete" data-conference-id="${matchingRoom.id}">Delete</div>

        
        </div>

      </div>
      <div class="options">
       <div class="head-option">
          Choose a booking option :
        </div>
       ${options(matchingRoom,cartItem)}
       
        </div>
      </div>
     </div>
     </div>`;
    
  });
  document.querySelector('.js-left-section').innerHTML = checkoutHTML;

 updateCartQuantity2();
 
 function options(matchingRoom,cartItem) {

  let optionHTML = '';
  
  breakfastOptions2.forEach((breakfastOption)=>{
      
  const isChecking = breakfastOption.breakfastId === cartItem.breakfastId;

     optionHTML += 
     `    
        <div class="first-option2 js-radio"  data-conference-id="${matchingRoom.id}" 
            data-breakfast-id="${breakfastOption.breakfastId}">

          
            <input class="radio" type="radio" ${isChecking?'checked':''} name="${matchingRoom.id}" >
          
           <div class="choice">
            <div class="breakfast2 data-breakfast-id="${breakfastOption.breakfastId}">
             ${breakfastOption.persons}
              
            </div>
            <div class="r02 ">R${breakfastOption.priceCents} p/p</div>
          </div>
          
        </div>
       
      `;
   });
   
   return optionHTML;

   } 
   
   

   document.querySelectorAll('.js-radio').forEach((element)=>{  
   element.addEventListener('click',()=>{
   const {conferenceId,breakfastId} = element.dataset;
  
   updateBreakfastOptions2(conferenceId,breakfastId);
   
   checkinDate2(conferenceId);

   renderCheckout2();
   renderRightSection2();
  });
  });

 document.querySelectorAll('.js-update').forEach((link)=>{
 link.addEventListener('click',()=>{
 const conferenceId = link.dataset.conferenceId;
 document.querySelector(`.js-pax-option-${conferenceId}`).classList.add('add-pax');
 document.querySelector(`.js-input-${conferenceId}`).classList.add('add-input');
 document.querySelector(`.js-update-${conferenceId}`).classList.add('add-update');
 document.querySelector(`.js-save-${conferenceId}`).classList.add('add-save');
 checkinDate2(conferenceId);
 
 });
 });

 document.querySelectorAll('.js-save').forEach((link)=>{
 link.addEventListener('click',()=>{
  const conferenceId = link.dataset.conferenceId;
  document.querySelector(`.js-pax-option-${conferenceId}`).classList.remove('add-pax');
  document.querySelector(`.js-update-${conferenceId}`).classList.remove('add-update');

  const inputElement = Number(document.querySelector(`.js-input-${conferenceId}`).value);
  document.querySelector(`.js-input-${conferenceId}`).classList.remove('add-input');
  document.querySelector(`.js-save-${conferenceId}`).classList.remove('add-save');
  const newQuantity = Number(document.querySelector(`.js-input-${conferenceId}`).value);
  updateQuantity2(newQuantity,conferenceId);
  document.querySelector(`.js-pax-option-${conferenceId}`).innerHTML = inputElement;
  updateQuantity2(newQuantity,conferenceId);
  renderCheckout2();
  renderRightSection2();
   
 
   })
  
  })
 
  
 document.querySelectorAll('.js-delete').forEach((link)=>{
 link.addEventListener('click',()=>{
  const conferenceId = link.dataset.conferenceId;
  removeFromCart2(conferenceId);
  
  const container = document.querySelector(`.js-reservation-${conferenceId}`);
  container.remove();
  renderRightSection2();
  updateCartQuantity2();
  
 });
 });
 
}