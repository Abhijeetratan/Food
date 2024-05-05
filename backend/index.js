global.foodData = require('./db')(function call(err, data, CatData) {
  // console.log(data)
  if(err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
})

const express = require('express')
const app = express()
const path =require("path");

const port = process.env.PORT || 3000;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://food-pwwq.onrender.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json())


app.use('/api/auth', require('./Routes/Auth'));

app.use(express.static('public', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.get("/",(req,res)=>{
  app.use (express.static(path.resolve(__dirname,"client","build")));
  res.sendFile(path.resolve(__dirname,"client","build","index.html"))
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});