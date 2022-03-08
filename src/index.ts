import "reflect-metadata"
import "./data"
import { NextFunction, Request, Response } from "express"
import express = require("express")
import "express-async-errors"
import { router } from "./routes"
import cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors( ))
app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message
    })
  }
  return response.status(500).json({
    status: "error",
    message: "Internal Server Error" 
  })
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
  
})
