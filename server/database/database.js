const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection created successfully");
}).catch((err) => {
    console.log("error==>", err);
})  