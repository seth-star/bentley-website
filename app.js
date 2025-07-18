const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Order = require('./config2.js');
const Order2 = require('./config3.js');
const User = require('./config.js');


dotenv.config();
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine','ejs');



const dburl = 'mongodb://user1:2Dtc6_KEX6YRd@cluster0-shard-00-00.6sup7.mongodb.net:27017,cluster0-shard-00-01.6sup7.mongodb.net:27017,cluster0-shard-00-02.6sup7.mongodb.net:27017/?ssl=true&replicaSet=atlas-b84jc1-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(dburl).then((result)=>{

  const port = 3000;
  app.listen(port,()=>{
  console.log(`running on port ${port}`);
  })

})
 
// Route to render the contact form
app.get('/contact', (req, res) => {
  res.render('contactform');
});

// Route to handle form submission
app.post('/submitContactForm', (req, res) => {
 // const { name, email, subject, message } = req.body;

  // Send the form data via email (optional)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const mailOptions = {
    from: 'shangozonveni@gmail.com',
    to: req.body.email,
    //subject: `Contact Form Submission: ${subject}`,
    subject:req.body.subject,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Form submitted successfully');
    }
  });
});


//for app1

app.get('/processing',(request,response)=>{
  response.render('wait');
  });

app.get('/submit',(req,res)=>{
  res.render('login');
});

app.post('/submit',(req,res)=>{
  
    const users = new User(req.body);
    users.save().then((result)=>{
       res.redirect('/processing')
     }).catch((err)=>{
    console.log(err);
    });
    });

app.get('/submit2',(req,res)=>{
  res.render('login2');
});
  
//submitt
  app.post('/submit2',async(req,res)=>{
    
     const users2 = new User(req.body);
     users2.save().then((result)=>{
      res.redirect('/processing');
      
      }).catch((err)=>{
     console.log(err);
     });
     
     })
     
//for app2(accommodation)

app.get('/accommodation',(request,response)=>{
  response.render('checkout'); 
})

app.post('/accommodation',(request,response)=>{
 const order = new Order(request.body); 
 order.save().then((result)=>{
    response.json(result);
 }).catch((err)=>{
 console.log(err);
 });
});

app.get('/reservation',(request,response)=>{
  const rooms = [{
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
   Order.find().sort({createdAt:-1}).then((result)=>{
    response.render('order',{orders1: result,rooms})
   }).catch((err)=>{
    console.log(err);
    
   });
    
});
app.get('/reservation/:id',(request,response)=>{
 
  const id = request.params.id;
   const rooms = [{
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

  const breakfastOptions = [{
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
    persons:  'All in the room(s)',
    priceCents: ''
    
   }];
  
  Order.findById(id).then((result)=>{
    response.render('details2',{orders1:result,rooms,breakfastOptions});
    //response.send(result)

  }).catch((err)=>{
    console.log(err);
  });
  
});

app.get('/admin/accommodation',(request,response)=>{
 
  Order.find().sort({createdAt:-1}).then((result)=>{
    response.render('admin3',{orders1: result})
   }).catch((err)=>{
    console.log(err);
    
   });
})

app.post('/accommodation',(request,response)=>{
  const order = new Order(request.body); 
  order.save().then((result)=>{
     response.json(result);
  }).catch((err)=>{
  console.log(err);
  });
 });

 //for processing accommodation in app2
 
 
  app.get('/processing/accom/avail/',(request,response)=>{
    Order.find().then((result)=>{
    
    }).catch((err)=>{
     console.log(err);
    });
     
  });
  
  app.get('/processing/accom/avail/:id',(request,response)=>{
    const availid = request.params.id;
    
    Order.findById(availid).then((result)=>{
     response.render('available',{orders1: result});
     
    }).catch((err)=>{
      console.log(err);
    });
    
  })
 
app.get('/processing/accom/notavail',(request,response)=>{
  Order.find().then((result)=>{
  
  }).catch((err)=>{
   console.log(err);
  });
   
});

app.get('/processing/accom/notavail/:id',(request,response)=>{
  const id = request.params.id;
  
  Order.findById(id).then((result)=>{
   response.render('notavailable',{orders1: result});
   
  }).catch((err)=>{
    console.log(err);
  });
  
})

app.get('/admin/users',(request,response)=>{
 
  User.find().sort({createdAt:-1}).then((result)=>{
    response.render('admin4',{orders1: result});
   }).catch((err)=>{
    console.log(err);
    
   });
})



//for app3
app.get('/conference',(request,response)=>{
  response.render('checkoutconf'); 
})

app.get('/bentley',(request,response)=>{
  response.render('bentley'); 
})

app.post('/conference',(request,response)=>{
  
 const order2 = new Order2(request.body); 
 order2.save().then((result)=>{
  response.json(result)
  console.log(result);
 }).catch((err)=>{
 console.log(err);
 });
});


app.get('/booking',(request,response)=>{
  const conferences = [{
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
   Order2.find().sort({createdAt:-1}).then((result)=>{
    response.render('order2',{orders: result,conferences})
   }).catch((err)=>{
    console.log(err);
    
   });
   
    
});
app.get('/booking/:id',(request,response)=>{
  const id = request.params.id;
  const conferences = [{
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

  const breakfastOptions2 = [{
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
    persons:'Overnight Conference (Single)',
    priceCents: 1600
   },{
    breakfastId:'4d',
    persons:  'Overnight Conferernce (Sharing)',
    priceCents: 1350
    
   }];
  
  Order2.findById(id).then((result)=>{
    response.render('details',{orders:result,conferences,breakfastOptions2});
    //response.send(result)
  }).catch((err)=>{
    console.log(err);
  });
  
});


app.get('/admin/conference',(request,response)=>{
 
  Order2.find().sort({createdAt:-1}).then((result)=>{
    response.render('admin',{orders: result})
   }).catch((err)=>{
    console.log(err);
    
   });
})

app.get('/conference/:id',(request,response)=>{
 
  const id = request.params.id;
  const conferences = [{
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

  const breakfastOptions2 = [{
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
    persons:'Overnight Conference (Single)',
    priceCents: 1600
   },{
    breakfastId:'4d',
    persons:  'Overnight Conferernce (Sharing)',
    priceCents: 1350
    
   }];
  

  Order2.findById(id).then((result)=>{
    response.render('details',{orders: result,conferences,breakfastOptions2});
  }).catch((err)=>{
    console.log(err);
  });
  
});

//for processing conference in app3

app.get('/processing/conf/avail',(request,response)=>{
  Order2.find().then((result)=>{
  
  }).catch((err)=>{
   console.log(err);
  });
   
});
app.get('/processing/conf/avail/:id',(request,response)=>{
  const id = request.params.id;
  
  Order2.findById(id).then((result)=>{
   response.render('available2',{orders: result});
   
  }).catch((err)=>{
    console.log(err);
  });
  
 })

app.get('/processing/conf/notavail',(request,response)=>{
 Order2.find().then((result)=>{
 
 }).catch((err)=>{
  console.log(err);
 });
  
});


app.get('/processing/conf/notavail/:id',(request,response)=>{
 const id = request.params.id;
 
 Order2.findById(id).then((result)=>{
  response.render('notavailable2',{orders: result});
  
 }).catch((err)=>{
   console.log(err);
 });
 
})
/*
app.get('/admin2',(request,response)=>{
 
  User.find().sort({createdAt:-1}).then((result)=>{
    response.render('admin2',{orders: result});
   }).catch((err)=>{
    console.log(err);
    
   });
})
*/


  

