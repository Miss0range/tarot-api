const db = require('./db/connection.js');
const app = require('./app/app.js');
require("dotenv").config();
const port = process.env.PORT || 8000;

db.once('open', () => {
    console.log('db connected');
    app.listen(port, ()=>{
        console.log(`app listening on port ${port}`);
    });
});

db.on('error', (error) => {
    console.log('error connecting to db : ', error);
});

const shutDown = async () => {
    await db.close();
    process.exit(0);
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);