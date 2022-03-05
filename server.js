//express & mongoose required
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

//express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const routes= require('./routes')
//app uses
app.use(routes);
app.use(express.static('public'));

//connect mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/populatedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//mongoose middleware
mongoose.set("useCreateIndex", true);
mongoose.set('debug', true);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  