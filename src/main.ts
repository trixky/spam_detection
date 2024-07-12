import express, { Request, Response } from 'express';
import predict from './predict';

const app = express();
const PORT = 3242;

app.use(express.json());

app.post('/spam', async (req: Request, res: Response) => {
    const sentence = req.body.sentence;

    if (sentence === undefined) {
        res.status(400).send('Missing sentence field in request body');
        return;
    }

    const prediction = await predict(sentence);

    res.json(prediction);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});