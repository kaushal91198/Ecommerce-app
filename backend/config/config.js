const mongoose = require('mongoose');
const colors = require('colors')

// const url = 'mongodb://localhost/ecommerce';


const connectToMongo = (url)=>{
    mongoose.connect(url);
    
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(colors.blue('Database connected...'));
}).on('error',(err) => {
    console.log(colors.red('Connection failed...'));
    process.exit(1)
});

}
module.exports = connectToMongo