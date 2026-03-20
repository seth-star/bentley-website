

export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
 /*cart = [{
    roomId:'1a',
    quantity: 1,
    breakfastId:'1a',
    checkin: '<input class="js-checkin" type="date">',
    checkout: '<input class="js-checkout" type="date">',
    pax:'<input type="number" class="pax js-pax">',
    email: '<input class="js-email" type="email">'
  },{
    roomId:'2b',
    quantity: 2,
    breakfastId:'2b',
    checkin: '<input class="js-checkin" type="date">',
    checkout: '<input class="js-checkout" type="date">',
    pax:'<input type="number" class="pax js-pax">',
    email: '<input class="js-email" type="email">'
  }];*/
  cart = [];
  
}

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function checkinDateOnly(roomId) {
  let matchingItem;
  cart.forEach((cartItem)=> {
    if (cartItem.roomId === roomId) {
      matchingItem = cartItem;
    }
    if (matchingItem) {
      if (document.querySelector(`.js-checkin`)){
        matchingItem.checkin = String(document.querySelector(`.js-checkin`).value);
       };
       if (document.querySelector(`.js-checkout`)){
        matchingItem.checkout = String(document.querySelector(`.js-checkout`).value);
      };
    }
   
     });
    
  saveToStorage()

}


export function checkinDate(roomId) {
  let matchingItem;
  cart.forEach((cartItem)=> {
    if (cartItem.roomId === roomId) {
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
       } 

       if (document.querySelector('.js-email')) {
        matchingItem.email = String(document.querySelector('.js-email').value)
       } 
    }
   
     });
    
  saveToStorage()

}
export function addToCart(roomId) {
  const select = document.querySelector(`.js-select-${roomId}`).value;
  let matchingItem;

  cart.forEach((cartItem)=>{
   if (cartItem.roomId === roomId) {
    matchingItem = cartItem;
   }
  });
  if (matchingItem) {
    matchingItem.quantity += Number(select);
    
  }else{
    cart.push({
      roomId: roomId,
      quantity: Number(select),
      breakfastId: '1a',
      checkin: '<input class="checkin js-checkin" type="date">',
      checkout: '<input class="checkin js-checkout" type="date">',
      pax:'<input type="number" class="pax js-pax">',
      email: '<input class="email js-email" type="email" placeholder="Enter your email" >'
    });
  }
 saveToStorage();
}

export function addToCartExecutive(roomId) {
  
  let matchingItem;

  cart.forEach((cartItem)=>{
   if (cartItem.roomId === roomId) {
    matchingItem = cartItem;
   }
  });
  if (matchingItem) {
    matchingItem.quantity = 1;
    
  }else{
    cart.push({
      roomId: roomId,
      quantity: 1,
      breakfastId: '1a',
      checkin: '<input class="checkin js-checkin" type="date">',
      checkout: '<input class="checkin js-checkout" type="date">',
      pax:'<input type="number" class="pax js-pax">',
      email: '<input class="email js-email" type="email"placeholder="Enter your email" >'
    });
  }
 saveToStorage();
}

export function removeFromCart(roomId) {
   let newCart = [];
  cart.forEach((cartItem)=>{
   if (cartItem.roomId !== roomId) {
    newCart.push(cartItem);
    
   }
   
  });
  cart = newCart;
  saveToStorage();
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
  cartQuantity += cartItem.quantity;
  });
  if (document.querySelector('.js-cart-quantity')) {
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  };
  if (document.querySelector('.js-rooms')) {
    document.querySelector('.js-rooms').innerHTML = `${cartQuantity} room(s)`
  }
  saveToStorage();
}

export function updateQuantity(newQuantity,roomId) {
  let matchingItem;

  cart.forEach((cartItem)=>{
   if (cartItem.roomId === roomId) {
    matchingItem = cartItem;
   }
  });
  if (matchingItem) {
    matchingItem.quantity = newQuantity;
  }

  saveToStorage();
}

export function updateBreakfastOptions(roomId,breakfastId) {
  let matchingItem;
  cart.forEach((cartItem)=>{
    if (roomId === cartItem.roomId) {
     matchingItem = cartItem;
    }
   });
    matchingItem.breakfastId = breakfastId;
    
    
   saveToStorage();
}
