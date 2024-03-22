import express from "express";
import cors from "cors";
import helmet from "helmet";

// Need to figure out the use-case of the following imports
// import cluster from "cluster";
// import os from "os";
// import { pid } from "process";

import userRouter from "./routes/user.route";
// import paymentRouter from "./routes/paymentRoute";
import profileRouter from "./routes/profile.route";
import eventRouter from "./routes/event.route";
import blogRouter from "./routes/blog.route";
import newsletterRouter from "./routes/newsletter.route";

const app = express();

/*  Middlewares  */
app.use(cors());
app.use(express.json());
app.use(helmet()); // using basic security config, to change later
app.disable('x-powered-by');

/* Test Route */
app.get("/test", (req, res) => {
    res.status(200).json({
        msg: "Server is working good.",
    });
});

/* Routes */
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/event", eventRouter);
app.use("/blog", blogRouter);
app.use("/newsletter", newsletterRouter);

// app.use("/admin", adminRouter);
// app.use("/flight", flightRouter); 
// app.use("/payment", paymentRoute);

const PORT: number = 3000
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
