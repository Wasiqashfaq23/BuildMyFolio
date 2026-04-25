require('dotenv').config();
const express = require("express")
const app = express()
const userRouter = require("./Routes/User.js")
const templateRouter = require("./Routes/Template.js")
const portfolioRouter = require("./Routes/Portfolio.js")
const UploadRouter = require("./Routes/Upload.js")
const clerkRouter = require("./Routes/Clerk.js")
const port = process.env.PORT;
const { ConnectToDatabase } = require("./Config/connect.js");
const cookieParser = require('cookie-parser');
const cors = require("cors")

app.use(cors({ origin: process.env.FRONTEND_URI, credentials: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("Public"));
app.use(express.json())
app.use(cookieParser())

app.use("/", userRouter)
app.use("/template", templateRouter)
app.use("/portfolio", portfolioRouter)
app.use("/upload", UploadRouter);
app.use("/auth", clerkRouter)

ConnectToDatabase().then(() => {
    console.log("MongoDB connected "); app.listen(port, () => {
        console.log("Listening on port", port)
    })
}).catch((err) => { console.error("DB Error:", err.message); process.exit(1) });