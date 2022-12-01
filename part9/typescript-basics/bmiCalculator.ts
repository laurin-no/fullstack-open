const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2)

    if (bmi < 19) {
        return 'underweight'
    } else if (bmi > 25) {
        return 'overweight'
    } else {
        return 'normal (healthy) weight'
    }
}

console.log(calculateBmi(180, 74))