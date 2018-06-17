import {createAction, handleActions} from 'redux-actions'
import debounce from 'debounce'

const STAT_TIMEOUT = 500 // ms

const SET_ONE = 'BUTTER/STATS/SET_ONE'
const SET = 'BUTTER/STATS/SET'

const actions = {
    SET_ONE: createAction(SET_ONE),
    SET: createAction(SET)
}

const reducer = handleActions({
    [SET_ONE]: (state, {payload}) => {
        const {key, value} = payload

        return {
            ...state,
            [key]: value
        }
    },
    [SET]: (state, {payload}) => ({...state, ...payload})
}, {})

const bindStatsActions = (dispatch) => ({
    setOne: (key, value) => dispatch(actions.SET_ONE({key, value})),
    set: (values) => dispatch(actions.SET(values))
})

const stats = {
    reducer,
    actions
}

export {stats as default, bindStatsActions}
