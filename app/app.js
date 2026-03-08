const express = require("express");
const app = express();
const cors = require("cors");

const readRouter = require("./routes/read");
const tarotRouter = require("./routes/tarot");
const meaningRouter = require("./routes/meaning");
const userRouter = require("./routes/user");

//middleware
const { userAuthentication } = require("./middleware/auth");
app.use(cors());
app.use(express.json());

app.use(userAuthentication);
app.use("/read", readRouter);
app.use("/tarot", tarotRouter);
app.use("/meaning", meaningRouter);
app.use("/user", userRouter);


app.use((req, res) => {
    res.status(404).json({
        message: `Route ${req.method} ${req.path} not found`,
        code: "NOT_FOUND",
    });
});

app.use((error, _req, res, _next) => {
    console.error({
        message: error.message,
        code: error.type?.code ?? "INTERNAL_ERROR",
        source: error.source ?? "unknown source. see stack for details",
        stack: error.stack,
        timestamp: new Date().toISOString(),
    });
    res.status(error.type?.status ?? 500).json({
        message: error.message,
        code: error.type?.code ?? "INTERNAL_ERROR",
    });
});

module.exports = app;
