
const mongoose  = require("mongoose");

const Db = process.env.DATABASE;

mongoose.connect(Db,{ 
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false 

}).then(() => {
    console.log(` Connection successful !!!! `)
}).catch( (err) => {
    console.log(`--------- Connection Failed ---------`)
})