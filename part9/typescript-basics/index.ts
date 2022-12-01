import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        const error = { error: 'parameters missing' };
        res.status(400).send(error);
    } else if (isNaN(Number(target)) ||
        !Array.isArray(daily_exercises) ||
        daily_exercises.filter(d => isNaN(Number(d))).length !== 0) {
        const error = { error: 'malformed parameters' };
        res.status(400).send(error);
    }
    console.log(daily_exercises);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});