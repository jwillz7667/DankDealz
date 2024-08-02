const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in the environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.error('Please make sure your IP address is whitelisted in MongoDB Atlas');
    console.error('and that your connection string is correct in the .env file.');
    console.error('Your current IP address is:', require('os').networkInterfaces().en0?.[1]?.address || 'Unable to determine IP');
    process.exit(1);
  }
};

module.exports = { connectDB };
