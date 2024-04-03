import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = () => {
  const MONGODB_URI = `mongodb://${USERNAME}:${PASSWORD}@ac-4sati5t-shard-00-00.azrfgkq.mongodb.net:27017,ac-4sati5t-shard-00-01.azrfgkq.mongodb.net:27017,ac-4sati5t-shard-00-02.azrfgkq.mongodb.net:27017/?ssl=true&replicaSet=atlas-131isu-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;
//const MONGODB_URI=`mongodb://TUSHAR:TUSHAR@ac-nb580a8-shard-00-00.oonhsgn.mongodb.net:27017,ac-nb580a8-shard-00-01.oonhsgn.mongodb.net:27017,ac-nb580a8-shard-00-02.oonhsgn.mongodb.net:27017/?ssl=true&replicaSet=atlas-feogsf-shard-0&authSource=admin&retryWrites=true&w=majority`;
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

  mongoose.connection.on('connected', () => {
    console.log('Database connected Successfully');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected');
  });

  mongoose.connection.on('error', (error) => {
    console.log('Error while connecting with the database ', error.message);
  });
};


export default Connection;
