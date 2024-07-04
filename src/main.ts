import express from "express";
import cors from "cors";
import helmet from "helmet";

import generalRouter from "./general/routes";
import mailRouter from "./mail/routes";
import adminRouter from "./admin/routes";
import eventRouter from "./event/routes";

const server = express();
const port = process.env.PORT || 8080;

server.use(express.json());
server.use(cors());
server.disable("x-powered-by");
server.use(helmet());

server.use("/api/test", (_, res) => {
    res.status(200).json({
        messsage: "Server is running",
    });
});

server.use("/api/user", generalRouter);
server.use("/api/mail", mailRouter);
server.use("/api/event", eventRouter);
server.use("api/admin", adminRouter);

server.use("*", (_, res) => {
    res.status(404).json({
        message: "Not Found",
    });
});

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
