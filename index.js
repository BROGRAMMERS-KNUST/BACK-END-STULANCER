import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

//CONNECTION TO DATABASE

const PORT = process.env.PORT;

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

app.use('/posts', postRoute);
app.use('/user', userRoute);
