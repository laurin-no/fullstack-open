import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!height || !weight) {
        const error = { error: 'malformed parameters' };
        res.status(400).send(error);
        return;
    }

    const bmi = calculateBmi(height, weight);
    res.send({ height, weight, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});