import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({limit:'30mb',extended: true}))         //express===bodyParser
app.use(bodyParser.urlencoded({limit: '30mb', extended: true})) //express===bodyParser
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRoutes);

const CONNECTION_URL = 'mongodb+srv://BvBlog:Bvconnect66@cluster0.gjrpm.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}` )))   //${PORT} ke sath https vgera bhi add kiya
    .catch((error) => console.log(`${error} did not connect` ));      //error.message===`$error didn't connect`
// mongoose.set('useFindAndModify', false);