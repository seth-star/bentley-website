export let cart2 = JSON.parse(localStorage.getItem('cart2'));

if (!cart2) {
 /*cart2 = [{
    conferenceId:'11',
    quantity: 1,
    breakfastId:'1a',
    checkin: '<input class="js-checkin" type="date">',
    time:'<input class="js-time" type="time">',
    checkout: '<input class="js-checkout" type="date">',
    pax:'<input type="number" class="pax js-pax">'

  }];
  */
 cart2= [];
}

function saveToStorage() {
  localStorage.setItem('cart2',JSON.stringify(cart2));
}


export function checkinDate2(conferenceId) {
  let matchingItem;
  cart2.forEach((cartItem)=> {
    if (cartItem.conferenceId === conferenceId) {
      matchingItem = cartItem;
    }
    if (matchingItem) {
      if (document.querySelector(`.js-checkin`)){
        matchingItem.checkin = String(document.querySelector(`.js-checkin`).value);
       };
       if (document.querySelector(`.js-checkout`)){
        matchingItem.checkout = String(document.querySelector(`.js-checkout`).value);
      };
      
      if (document.querySelector('.js-pax')) {
        matchingItem.pax = Number(document.querySelector('.js-pax').value)
       };

       if (document.querySelector('.js-time')) {
        matchingItem.time = String(document.querySelector('.js-time').value)
       };
       if (document.querySelector('.js-email2')) {
        matchingItem.email = String(document.querySelector('.js-email2').value)
       } 
    }
   
     });
    
  saveToStorage()
}
export function updateQuantity2(newQuantity,conferenceId) {
  let matchingItem;

  cart2.forEach((cartItem)=>{
   if (cartItem.conferenceId === conferenceId) {
    matchingItem = cartItem;
   }
  });
  if (matchingItem) {
    matchingItem.pax = newQuantity;
  }

  saveToStorage();
}



export function getItem2(conferenceId) {
  let matchingItem;
cart2.forEach((cartItem)=>{
  if (cartItem.conferenceId === conferenceId) {
    matchingItem =cartItem;
  } 
  if (matchingItem) {
    if (document.querySelector('.js-pax')) {
      matchingItem.pax = Number(document.querySelector('.js-pax').value)
     }
  }
})
return matchingItem
}



export function addToCartConference(conferenceId) {
  
  let matchingItem;

  cart2.forEach((cartItem)=>{
   if (cartItem.conferenceId === conferenceId) {
    matchingItem = cartItem;
   }
  });
  if (matchingItem) {
    matchingItem.quantity = 1;
  }else{
    cart2.push({
      conferenceId: conferenceId,
      quantity: 1,
      breakfastId: '1a',
      checkin: '<input class="checkin js-checkin" type="date">',
      time:'<input class="time js-time" type="time">',
      checkout: '<input class=" checkin js-checkout" type="date">',
      pax:'<input type="number" class="pax js-pax">',
      email: '<input class="email js-email2" type="email" placeholder="Enter your email" >'
    });
  }
 saveToStorage();
}

export function updateCartQuantity2() {
  let cartQuantity = 0;
  cart2.forEach((cartItem)=>{
  cartQuantity += cartItem.quantity;
  });
  if (document.querySelector('.js-cart-quantity2')) {
    document.querySelector('.js-cart-quantity2').innerHTML = cartQuantity;
  };
  if (document.querySelector('.js-rooms')) {
    document.querySelector('.js-rooms').innerHTML = `${cartQuantity} Venue(s)`
  }
  
  saveToStorage();
}

export function removeFromCart2(conferenceId) {
  let newCart = [];
 cart2.forEach((cartItem)=>{
  if (cartItem.conferenceId !== conferenceId) {
   newCart.push(cartItem);
   cart2 = newCart;
  }
  
 });
 saveToStorage();
}

export function updateBreakfastOptions2(conferenceId,breakfastId) {
  let matchingItem;
  cart2.forEach((cartItem)=>{
    if (conferenceId === cartItem.conferenceId) {
     matchingItem = cartItem;
    }
   });
    matchingItem.breakfastId = breakfastId;
    
    
   saveToStorage();
}
