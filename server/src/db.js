import { MongoClient } from 'mongodb';

class Db {
  constructor() {
    this.client = new MongoClient('mongodb://localhost:27017');
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
}


export default Db;