const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Pusher = require("pusher");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.get("/", (req, res) => {});

app.listen(3000, () => {
  console.log("Express intro running on localhost:3000");
});

const pusher = new Pusher({
  appId: "1675603",
  key: "215e3cf584a3ecfaec0f",
  secret: "a79e34067e4bf974c36c",
  cluster: "ap2",
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});



var books = [] ;
 
app.post('/post',(req,res)=>{
   books.push(req.body.book);

   pusher.trigger('channel-name', 'event-name', {
       data: books
  }); 
   res.json({
       message : "Book added succesfully"})
  })

