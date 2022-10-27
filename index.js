import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';

let size = http.maxHeaderSize;
console.log('Max HTTP Header size is', size);
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

//CONNECTION TO DATABASE

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))
  )
  .catch((error) => console.log(error));

//ROUTING
import postRoute from './routes/posts.js';
import userRoute from './routes/users.js';
import passwordrecovery from './routes/passwordrecovery.js';

app.use('/posts', postRoute);
app.use('/user', userRoute);
app.use('/passwordrecovery', passwordrecovery);
app.get('/', (req, res) => {
  res.send('APP IS RUNNING !');
});
