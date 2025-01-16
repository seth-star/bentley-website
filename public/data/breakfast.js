export const breakfastOptions2 = [{
  breakfastId:'1a',
  persons:'Full Day Conference',
  priceCents: 655
 },{
  breakfastId:'2b',
  persons:'Half Day Conference',
  priceCents: 575
 },{
  breakfastId:'3',
  persons:  'Budget Conference',
  priceCents: 555
  
 },{
  breakfastId:'3c',
  persons:'Overnight Conference:Single',
  priceCents: 1600
 },{
  breakfastId:'4d',
  persons:'Overnight Conference:Sharing',
  priceCents: 1350
  
 }];
export const breakfastOptions = [{
      breakfastId:'1a',
      persons:'none',
      priceCents: 0
     },{
      breakfastId:'2b',
      persons:'one',
      priceCents: 95
     },{
      breakfastId:'3',
      persons:  'two',
      priceCents: 190
      
     },{
      breakfastId:'3c',
      persons:'three',
      priceCents: 285
     },{
      breakfastId:'4d',
      persons:  'all in the room(s)',
      priceCents: ''
      
     }];
     export function getOption(cartItem) {
      let matchingOption;
      breakfastOptions.forEach((breakfastOption)=>{
        if ( cartItem.breakfastId === breakfastOption.breakfastId) {
        matchingOption = breakfastOption;
        }
       });
      
       return matchingOption;
    }
    
    export function getOption2(cartItem) {
      let matchingOption;
      breakfastOptions2.forEach((breakfastOption)=>{
        if ( cartItem.breakfastId === breakfastOption.breakfastId) {
        matchingOption = breakfastOption;
        }
       });
      
       return matchingOption;
    }
    
