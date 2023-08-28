import mongoose from "mongoose";
const connection = {};

export async function connectDb() {
  if (connection.isConnected) {
    console.log("already connected to database");
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;

    if (connection.isConnected == 1) {
      console.log("use previous connection to the database");
      return;
    }

    await mongoose.disconnect(); //to start a new connection afresh
  }
  const db = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("new connection to the database");
  connection.isConnected = db.connections[0].readyState;
}

export async function disConnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV == "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    }
  }
}
