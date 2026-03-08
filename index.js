require("dotenv").config();
const db = require('./db/connection.js');
const app = require('./app/app.js');
const port = process.env.PORT || 8000;

db.once('open', () => {
    console.log('db connected');
    app.listen(port, ()=>{
        console.log(`app listening on port ${port}`);
    });
});

db.on('error', (error) => {
    console.error('error connecting to db : ', error);
});

const shutDown = async () => {
    setTimeout(() => process.exit(1), 5000);
    try {
        await db.close();
        process.exit(0);
    } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1);
    }
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);