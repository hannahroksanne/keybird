import express from "express";
const app = express();
app.get("/foo", (request, response) => {
  response.send("bar");
});
const handler = app;
export {
  handler
};
