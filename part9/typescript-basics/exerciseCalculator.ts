interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ArgumentValues {
    target: number;
    trainingData: number[];
}

const parseArguments = (args: Array<string>): ArgumentValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const targetString = args[2];
    const trainingDataStrings = args.slice(3);

    const targetNum = Number(targetString);
    const trainingDataNum = trainingDataStrings.map(d => Number(d));

    if (!isNaN(targetNum) && trainingDataNum.filter(d => isNaN(d)).length === 0) {
        return {
            target: targetNum,
            trainingData: trainingDataNum
        };
    } else {
        throw new Error('Provided values were not numbers');
    }
};

const calculateExercises = (trainingData: number[], target: number): ExerciseResult => {

    const average = trainingData.reduce((sum, current) => sum + current, 0) / trainingData.length;
    const success = average > target;
    const rating = success ? 3 : average > target * 0.8 ? 2 : 1;
    const ratingDescription = rating === 3 ? 'good' : rating === 2 ? 'could be better' : 'this is not good';

    return {
        periodLength: trainingData.length,
        trainingDays: trainingData.filter(d => d > 0).length,
        target: target,
        average: average,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription
    };
};

try {
    const { target, trainingData } = parseArguments(process.argv);
    console.log(calculateExercises(trainingData, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
    }

    console.log(errorMessage);
}