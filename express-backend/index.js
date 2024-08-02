import express from 'express';

import { createClient } from 'redis';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = createClient();
client.connect();

app.post('/submit', async (req, res) => {
    const { problemId, code, language, userId } = req.body;
    // push the code to db
    try {
        await client.lPush('submissions', JSON.stringify({ problemId, code, language, userId }));
        res.json({
            message: 'Submission received',
        })
    }
    catch (err) {
        res.json({
            message: 'Error submitting code',
        })
    }

})

app.listen(3000);