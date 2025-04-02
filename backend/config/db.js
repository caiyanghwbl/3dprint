const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb+srv://yangcai0204:ZsYD2ysI9PeJu8dK@cluster0.wgr1uae.mongodb.net/3dprint?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
