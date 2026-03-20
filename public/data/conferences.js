

export const conferences = [{
  id:'11',
  image:'images/conference-halls/image4.jpg',
  type:'LAPA'
},{
  id:'22',
  image:'images/conference-halls/image4.jpg',
  type:'KUDU'
},{
  id:'33',
  image:'images/conference-halls/image4.jpg',
  type:"LION'S DEN"
}];


export function getRoom2(cartItem) {
  let matchingRoom;

  conferences.forEach((conference)=>{
    if ( cartItem.conferenceId === conference.id) {
    matchingRoom = conference;
    }
   });
   return matchingRoom;
}