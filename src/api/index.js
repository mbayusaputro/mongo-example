const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const { chatHistories, summary } = require('./const');

const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON request bodies

app.post('/api/data', async (req, res) => {
  const { companyId, start, end, type, keydb } = req.body
  const uri =
    `mongodb+srv://${keydb}@rekava-dev.0ju2w.mongodb.net/?retryWrites=true&w=majority&appName=rekava-dev`;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('rekava-staging');
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
    res.status(500).send('Error fetching data');
  } finally {
    await client.close();
  }
});

app.post('/api/delete', async (req, res) => {
  const { status, keydb } = req.body
  const uri =
    `mongodb+srv://${keydb}@rekava-dev.0ju2w.mongodb.net/?retryWrites=true&w=majority&appName=rekava-dev`;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('rekava-staging');
    const collection = database.collection('filepdfstatus');
    const result = await collection.deleteMany({ status });
    res.json(result);
  } catch (error) {
    res.status(500).send(JSON.stringify(error));
    // res.status(500).send('Error fetching data');
  } finally {
    await client.close();
  }
});

// app.listen(5000, () => {
//   console.log('Server is running on http://localhost:5000');
// });

module.exports = app;