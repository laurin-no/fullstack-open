import * as process from 'process'
import * as console from 'console'

interface ArgumentValues {
    height: number
    weight: number
}

const parseArguments = (args: Array<string>): ArgumentValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too  many arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers')
    }
}

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2)

    if (bmi < 19) {
        return 'underweight'
    } else if (bmi > 25) {
        return 'overweight'
    } else {
        return 'normal (healthy) weight'
    }
}

try {
    const { height, weight } = parseArguments(process.argv)
    console.log(calculateBmi(height, weight))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened'
    if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`
    }

    console.log(errorMessage)
}