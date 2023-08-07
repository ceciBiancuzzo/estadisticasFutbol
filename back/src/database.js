const mongoose = require('mongoose');
const URI = process.env.MONGO_URI 
?process.env.MONGO_URI
:'No tiene conectado una base de datos' ;

mongoose.connect(URI,{
useNewUrlParser:true,
useCreateIndex:true,
useUnifiedTopology:true,
useFindAndModify:false
});

const connection = mongoose.connection;

connection.once('open',()=>{
console.log('DB is conected');
});