

export const rooms = [{
  id:'1a',
  image:'images/rooms/image9.jpg',
  type:'DOUBLE BED',
  priceCents: 790
},{
  id:'2b',
  image:'images/rooms/executive room.jpg',
  type:'EXECUTIVE SUITE',
  priceCents: 1030
},{
  id:'3c',
  image:'images/rooms/image9.jpg',
  type:'SINGLE BED',
  priceCents: 590
}];

export function getRoom(cartItem) {
  let matchingRoom;

  rooms.forEach((room)=>{
    if ( cartItem.roomId === room.id) {
    matchingRoom = room;
    }
   });
   return matchingRoom;
}

/*export function name(roomId) {
  rooms.forEach((room)=>{
    if (cartItem.roomId === room.id) {
      if (room.type) {
        addToCart3(roomId)
      }
    }
  })
}
*/
