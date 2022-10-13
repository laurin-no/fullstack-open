import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
    const initialTestState = {
        good: 3,
        ok: 2,
        bad: 1
    }

    const initialEmptyState = {
        good: 0,
        ok: 0,
        bad: 0
    }

    test('should return a proper initial state when called with undefined state', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = counterReducer(undefined, action)
        expect(newState).toEqual(initialEmptyState)
    })

    test('good is incremented', () => {
        const action = {
            type: 'GOOD'
        }
        const state = initialTestState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 4,
            ok: 2,
            bad: 1
        })
    })

    test('ok is incremented', () => {
        const action = {
            type: 'OK'
        }
        const state = initialTestState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 3,
            ok: 3,
            bad: 1
        })
    })

    test('bad is incremented', () => {
        const action = {
            type: 'BAD'
        }
        const state = initialTestState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 3,
            ok: 2,
            bad: 2
        })
    })

    test('scores are reset', () => {
        const action = {
            type: 'ZERO'
        }
        const state = initialTestState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 0
        })
    })
})