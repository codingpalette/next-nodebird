import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE
} from '../reducers/user'


function logInAPI(data) {
    return axios.post('/api/login' , data)
}

function* logIn(action) {
    try {
        // const res = yield call(logInAPI , action.data)
        yield  delay(1000)
        yield put({
            type: 'LOG_IN_SUCCESS',
            // data: res.data
            data:action.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: 'LOG_IN_FAILURE',
            data: e.response.data
        })
    }

}

function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn)

}

function logOutAPI(data) {
    return axios.post('/api/login' , data)
}

function* logOut(action) {
    try {
        // const res = yield call(logOutAPI , action.data)
        yield  delay(1000)
        yield put({
            type: 'LOG_OUT_SUCCESS',
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: e.response.data
        })
    }

}


function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST' , logOut)
}



export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}