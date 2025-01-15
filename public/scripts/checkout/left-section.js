import { cart, checkinDateOnly, removeFromCart, updateBreakfastOptions, updateCartQuantity, updateQuantity,checkinDate } from "../cart.js";
import { getRoom } from "../../data/rooms.js";
import { breakfastOptions} from "../../data/breakfast.js";
import { renderRightSection } from "./right-section.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderCheckout() {
  
  let checkoutHTML = '';
  cart.forEach((cartItem)=>{

   const matchingRoom = getRoom(cartItem);

   const today = dayjs();
   const bookingDate = today.format('dddd, MMMM D');
  

   checkoutHTML += 

   ` 
   <div class="reservation-containers js-reservation-${matchingRoom.id}">
      <div class="reservation-date">
       <div>
         <span class="date">Date:</span> ${bookingDate}
       </div>
       <div>
        <span class="date"> Email:</span>${cartItem.email}
        </div>
      </div>
     
     <div class="booking-summary">
      <div class="image-container">
       <img src="/${matchingRoom.image}" class="picture">
      </div>
      <div class="room-detail">
        <div class="type-price">
          <div class="type">
            ${matchingRoom.type} :
          </div>
          <div class="price js-price">
           R${matchingRoom.priceCents}
          </div>
        </div>
        <p class="checkin-out">
          Arrival Date:
        </p>
        <div >
         ${cartItem.checkin}
        </div>
        <p class="checkin-out">
          Departure Date:
        </p>
        <div>
          ${cartItem.checkout}
        </div>
        
        <div class="quantity">

          <input class="input  js-input-${matchingRoom.id}" type="number">
          <div class="number-rooms js-number-rooms-${matchingRoom.id}">
           ${cartItem.quantity} 

          </div>
          
           Room(s)
          
          <div class="update js-update js-update-${matchingRoom.id} " data-room-id="${matchingRoom.id}">Update </div>
         
          <div class="save js-save js-save-${matchingRoom.id}"data-room-id="${matchingRoom.id}">Save</div>

          <div class="pax-option">
            <div>Pax :</div>
            ${cartItem.pax}
          </div>
          <div class="delete js-delete" data-room-id="${matchingRoom.id}">Delete</div>
        </div>

      </div>
      <div class="options">
       <div class="head-option">
          Choose a breakfast option :
        </div>
       ${options(matchingRoom,cartItem)}
       
        </div>
      </div>
     </div>
     </div>`;
    
  });
  document.querySelector('.js-left-section').innerHTML = checkoutHTML;

 updateCartQuantity();
 

 function options(matchingRoom,cartItem) {

  let optionHTML = '';
  
  breakfastOptions.forEach((breakfastOption) =>{
      
  const isChecking = breakfastOption.breakfastId === cartItem.breakfastId;

 
  const option = breakfastOption.priceCents === ''
  ? breakfastOption.priceCents = ''
  :`R${breakfastOption.priceCents}`
  
     optionHTML += 
     `    
        <div class="first-option js-radio"  data-room-id="${matchingRoom.id}" 
            data-breakfast-id="${breakfastOption.breakfastId}">

          
            <input class="radio" type="radio" ${isChecking?'checked':''} name="${matchingRoom.id}" >
          
           <div class="choice">
            <div class="breakfast data-breakfast-id="${breakfastOption.breakfastId}">
             Breakfast for ${breakfastOption.persons}
              
            </div>
            <div class="r0 ">${option}</div>
          </div>
          
        </div>
       
      `;
    
   });
  
   return optionHTML;

   } 

   
   

   document.querySelectorAll('.js-radio').forEach((element)=>{  
   element.addEventListener('click',()=>{
   const {roomId,breakfastId} = element.dataset;
   

   updateBreakfastOptions(roomId,breakfastId);
   
   checkinDate(roomId);

   renderCheckout();
   renderRightSection();
  });
  });

 document.querySelectorAll('.js-update').forEach((link)=>{
 link.addEventListener('click',()=>{
 const roomId = link.dataset.roomId;
 if (roomId !== '2b') {
  document.querySelector(`.js-number-rooms-${roomId}`).classList.add('add-number-rooms');
  document.querySelector(`.js-input-${roomId}`).classList.add('add-input');
  document.querySelector(`.js-update-${roomId}`).classList.add('add-update');
  document.querySelector(`.js-save-${roomId}`).classList.add('add-save');
  
  checkinDateOnly(roomId);
 }

 });
 });

 document.querySelectorAll('.js-save').forEach((link)=>{
 link.addEventListener('click',()=>{
  const roomId = link.dataset.roomId;
  document.querySelector(`.js-save-${roomId}`).classList.remove('add-save');
  document.querySelector(`.js-update-${roomId}`).classList.remove('add-update');
  document.querySelector(`.js-input-${roomId}`).classList.remove('add-input');

  const inputElement = document.querySelector(`.js-input-${roomId}`);
  
  document.querySelector(`.js-number-rooms-${roomId}`).innerHTML = `${inputElement.value}`;
  document.querySelector(`.js-number-rooms-${roomId}`).classList.remove('add-number-rooms');
  const newQuantity = Number(document.querySelector(`.js-input-${roomId}`).value);
  updateQuantity(newQuantity,roomId);
  renderCheckout();
  renderRightSection();
  checkinDate(roomId);
 });
 });

 document.querySelectorAll('.js-delete').forEach((link)=>{
 link.addEventListener('click',()=>{
  const roomId = link.dataset.roomId;
  removeFromCart(roomId);
  
  const container = document.querySelector(`.js-reservation-${roomId}`);
  container.remove();
  updateCartQuantity()
  renderRightSection();

 });
 });
 
}