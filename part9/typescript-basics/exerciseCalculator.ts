interface ExerciseResult {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const calculateExercises = (trainingData: number[], target: number): ExerciseResult => {

    const average = trainingData.reduce((sum, current) => sum + current, 0) / trainingData.length
    const success = average > target
    const rating = success ? 3 : average > target * 0.8 ? 2 : 1
    const ratingDescription = rating === 3 ? 'good' : rating === 2 ? 'could be better' : 'this is not good'

    return {
        periodLength: trainingData.length,
        trainingDays: trainingData.filter(d => d > 0).length,
        target: target,
        average: average,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))