// //* ================================================ Express App Configuration ================================================

// // ===================== Importing necessary modules =====================
// import path from "path";
// import express from "express";
// import cookieParser from "cookie-parser";
// // Custom Authentication & Error middleware from my npm package.
// // Reference: https://www.npmjs.com/package/base-auth-handler
// import { currentUser } from "base-auth-handler";
// import { NotFoundError, errorHandler } from "base-error-handler";

// // ===================== Importing necessary files =====================
// import v1APIs from "./routes/api-v1-routes.js";
 


// const app = express();
// // Middleware to log all HTTP requests using morgan library
 
 
// // ===================== Setting Static Folder =====================
// app.use(express.static("backend/Public"));

// // ========================================== Middleware's ==========================================

// app.use(cookieParser()); // CookieParser Middleware

// app.use(express.json()); // Body parser Middleware from Express

// app.use(express.urlencoded({ extended: true })); // Form Data parser Middleware from Express
 
// // For API Documentation in JSON format : GET method /api-docs.json

// // Auth middleware to parse req.cookie and add req.currrentUser if a valid token is provided
// app.use(currentUser);


// //? ===================== API Routes Configuration =====================
// // =====================V1 APIs Routes Configuration =================
// app.use("/api/v1", v1APIs);


// //? ===================== Configuring Frontend for Production =====================
 
//   // Serve Admin Page request
//   app.get('/admin', (req, res) => {

//     res.sendFile(frontEndIndexPage);

//   });

  
// export { app };
