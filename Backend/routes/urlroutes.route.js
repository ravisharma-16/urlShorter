import {createShortUrl,redirectUrl} from "../controllers/url.controller.js"
import express, { Router } from "express"
import { urlmodel } from "../models/url.model.js";

// export default anything
// import in only same name 


// export {anything}
// import in not same name using this to import {anything}

const route = Router();

route.post("/shorten",createShortUrl);


// route.get("/all", async (req, res) => {
//   try {
//     const data = await urlmodel.find();
//     if (!data.length) {
//       return res.status(404).json({ message: "No URLs found" });
//     }
//     return res.status(200).json(data);
//   } catch (error) {
//     return res.status(500).json({ message: "Server error" });
//   }
// });

route.get("/:shortId",redirectUrl);
export default route;