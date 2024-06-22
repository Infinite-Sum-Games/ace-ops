import express from "express";
import cors from "cors";
import helmet from "helmet";

import defaultRouter from "./routes/default.routes";
import userRouter from "./routes/user.routes";
import mailRouter from "./routes/mail.routes";
import eventRouter from "./routes/event.routes";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(helmet({
    xPoweredBy: false,
}));

app.use("/api/v1/test", (_, res) => {
    res.status(200).json({
        messsage: "Server is running",
    });
});

app.use("/api/v1", defaultRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/mail", mailRouter);
app.use("/api/v1/event", eventRouter);

app.use("*", (_, res) => {
    res.status(404).json({
        message: "Not found",
    });
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})
