import{ rooms} from '../data/rooms.js';
import { addToCart,updateCartQuantity,addToCartExecutive } from './cart.js';
import { conferences } from '../data/conferences.js';
import { addToCartConference, updateCartQuantity2 } from './cart-conference.js';
 


let conferenceHTML = '';
conferences.forEach((conference)=>{
conferenceHTML += 
` <div class="rooms-container">
     <div class="swiper">
       <img src="/${conference.image}" class="images2">
     </div>
     <div class="room-description2">
       <p class="room-type">${conference.type}</p>
       <button class="book-now-button js-book-now-conference" data-conference-id="${conference.id}">Book Now</button>

       <div class="added-to-cart js-added-${conference.id}">
          Added To Cart
          <img src="/images/icons/checkmark.png" class="icons">
       </div>
     </div>
    </div>`;
})
document.querySelector('.js-main2').innerHTML = conferenceHTML;
updateCartQuantity2();
document.querySelectorAll('.js-book-now-conference').forEach((button)=>{
 button.addEventListener('click',()=>{
 const conferenceId = button.dataset.conferenceId;
 addToCartConference(conferenceId);
 updateCartQuantity2();
 document.querySelector(`.js-added-${conferenceId}`).classList.add('added');
    let setId;
    let isAdded = false;
    if (!isAdded) {
      setId = setTimeout(()=>{
        document.querySelector(`.js-added-${conferenceId}`).classList.remove('added');
      },2000)
      isAdded = true;
    }else{
      clearTimeout(setId);
      isAdded = false;
    }
    
  })
 
 });


let roomHTML = '';
rooms.forEach((room)=> {

  roomHTML += 
  `<div class="rooms-container">
      <div class="swiper">
          <img src="/${room.image}" class="images2">
      </div>
        
      <div class="room-description">
        <div>
          <p>${room.type}</p>
        </div>
       <div class="price">R${room.priceCents}</div>
       <select class="select-button js-select-${room.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
       </select>

       <button class="book-now-button js-book-now "data-room-id="${room.id}">Book Now</button>
       <div class="added-to-cart js-added-${room.id}">
         Added To Cart
         <img src="/images/icons/checkmark.png" class="icons">
       </div>
       
      </div>
     </div>`
});
document.querySelector('.js-main1').innerHTML = roomHTML;
updateCartQuantity();

document.querySelectorAll('.js-book-now').forEach((button)=>{
  button.addEventListener('click',()=>{
    const roomId = button.dataset.roomId;
     if (roomId === '2b') {
      addToCartExecutive(roomId);
      updateCartQuantity();
      alert('You can only select one room')
     }else{
      addToCart(roomId);
      updateCartQuantity();
     }
   
    
    
    document.querySelector(`.js-added-${roomId}`).classList.add('added');
    let setId;
    let isAdded = false;
    if (!isAdded) {
      setId = setTimeout(()=>{
        document.querySelector(`.js-added-${roomId}`).classList.remove('added');
      },2000)
      isAdded = true;
    }else{
      clearTimeout(setId);
      isAdded = false;
    }
    
  })
})