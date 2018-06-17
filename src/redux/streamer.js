import {createAsyncAction, createReducer} from 'redux-action-tools'
import {createAction, handleActions} from 'redux-actions'
import deepEqual from 'deep-equal'

import {bindStatsActions} from './stats'

import {remote} from 'electron'

const StreamServer = remote.require('butter-stream-server')

let server
let nextProgress = {}
let prevProgress = {}
let interval = null

const SERVE = 'BUTTER/STREAMER/SERVE'
const CLOSE = 'BUTTER/STREAMER/CLOSE'

const resetInterval = () => {
    if (interval) {
        clearInterval(interval)
        interval = null
    }
}

const actions = {
    CLOSE: createAction(CLOSE),
    SERVE: createAsyncAction(SERVE, (url, dispatch, getState) => {
        const stats = bindStatsActions(dispatch)

        if (server) {
            server.close()
        }

        resetInterval()
        interval = setInterval(() => {
            if (deepEqual(prevProgress, nextProgress)) return
            stats.set({nextProgress})
            prevProgress = nextProgress
        }, 500)

        stats.set({serverReady: false})
        return new Promise((resolve, reject) => {
            console.error('start streamer', url)
            server = new StreamServer(url, {
                progressInterval: 200,
                buffer: 100,
                port: 9999,
                writeDir: '',
            }).on('ready', ({streamUrl}) => {
                resolve(`${streamUrl}/0/?${url}`)
                stats.set({serverReady: true})
            }).on('progress', progress => {
                nextProgress = progress
            })

        })
    })
}

const serveReducer = createReducer()
    .when(SERVE, ({...state}, {payload}) => ({
        ...state,
        loading: payload,
        loaded: null
    }))
    .done((state, {payload}) => ({
        ...state,
        url: payload,
        loading: false,
        loaded: state.loading
    }))
    .failed((state, action) => ({
        ...state,
        url: null,
        failed: action,
        loading: false
    }))
    .build()

const reducer = (state, action) => {
    if (! state) return {loading: false, loaded: null}

    switch(action.type) {
        case `${SERVE}`:
        case `${SERVE}_COMPLETED`:
        case `${SERVE}_FAILED`:
            return serveReducer(state, action)
        case CLOSE:
            resetInterval()
            server.close()
            server = null
            return {...state, loading: false, loaded: null, url: null}
        default:
            return state
    }
}
const bindStreamerActions = (dispatch) => ({
    serve: (url) => dispatch(actions.serve(url))
})

const streamer = {
    reducer,
    actions
}

export {streamer as default, bindStreamerActions}
