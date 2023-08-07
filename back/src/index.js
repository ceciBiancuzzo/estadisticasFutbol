require('dotenv').config();
const app = require('./app');
require('./database');


async function main (){

    await app.listen(app.get('port'),'0.0.0.0',()=>{
        console.log('iniciando en puerto ', app.get('port'));
    }
    
    );
    
    
}

main();
