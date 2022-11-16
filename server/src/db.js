import { MongoClient } from 'mongodb';

class Db {
  constructor() {
    console.log("process.env", process.env);
    this.client = this.createClient();
    this.client.connect();
    this.collection = this.client.db('webhook').collection('calls');
  }
  
  addNotification(id, body) {
    const document = {
      time: Date.now(),
      path: id,
      body: body
    }
    this.collection.insertOne(document);
  }
  
  async getNotifications() {
    const cursor = this.collection.find({});
    const all = await cursor.toArray();
    cursor.close();
    return JSON.stringify(all);
  }

  createClient() {
    const uri = process.env.WEBHOOK_MONGO_STRING;
    if (uri) {
      return new MongoClient(uri);
    } else {
      new MongoClient('mongodb://localhost:27017');
    }
  }
}


export default Db;