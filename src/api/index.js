const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const { chatHistories, summary } = require('./const');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON request bodies

// MongoDB connection URI and client setup
const dbUser = process.env.MONGODB_USERNAME;
const dbPass = process.env.MONGODB_PASSWORD;
const db = process.env.MONGODB_DB;
const uri = `mongodb+srv://${dbUser}:${dbPass}@rekava-dev.0ju2w.mongodb.net/?retryWrites=true&w=majority&appName=rekava-dev`;

// Create the MongoDB client once and reuse it
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB once when the server starts
async function connectMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the server if MongoDB connection fails
  }
}

// Connect to MongoDB
connectMongoDB();

// Get companies from the database
app.get('/api/companies', async (_, res) => {
  try {
    const database = client.db(db);
    const collection = database.collection('companies');
    const data = await collection.find().toArray();
    res.json(data); // Send response to the client
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).send('Error fetching data');
  }
});

// Post data and use aggregation query
app.post('/api/data', async (req, res) => {
  const { companyId, start, end, type } = req.body;
  try {
    const database = client.db(db);
    const collection = database.collection('users');

    // Example aggregation query
    const aggregationPipeline = [
      {
        $match: {
          companyId,
        },
      },
      {
        $lookup: {
          from: 'chatHistories',
          let: {
            userid: {
              $toString: '$_id',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$$userid', '$userId'],
                    },
                    {
                      $gte: ['$createdAt', new Date(start)],
                    },
                    {
                      $lte: ['$createdAt', new Date(end)],
                    },
                  ],
                },
              },
            },
          ],
          as: 'userChats',
        },
      },
    ];

    if (type === 0) {
      aggregationPipeline.push({ $project: summary });
    } else {
      aggregationPipeline.push({ $unwind: '$userChats' });
      aggregationPipeline.push({ $project: chatHistories });
    }

    const data = await collection.aggregate(aggregationPipeline).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Delete data based on status
app.post('/api/delete', async (req, res) => {
  const { status } = req.body;
  try {
    const database = client.db(db);
    const collection = database.collection('filepdfstatus');
    const result = await collection.deleteMany({ status });
    res.json(result);
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send('Error deleting data');
  }
});

// Gracefully shutdown the server and close the MongoDB client
process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection');
  await client.close();
  process.exit(0);
});

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

module.exports = app;