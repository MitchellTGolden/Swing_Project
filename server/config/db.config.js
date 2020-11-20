const mongoose = require('mongoose')


mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then((res) => console.log(`We're in.${process.env.DB_NAME}`))
    .catch(err => console.log("Failed to Engage!",err))