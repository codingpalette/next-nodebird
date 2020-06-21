import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS
} from '../reducers/user'


function logInAPI(data) {
    return axios.post('/api/login' , data)
}

function* logIn(action) {
    try {
        // const res = yield call(logInAPI , action.data)
        yield  delay(1000)
        yield put({
            type: LOG_IN_SUCCESS,
            // data: res.data
            data:action.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: LOG_IN_FAILURE,
            error: e.response.data
        })
    }

}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn)

}

function logOutAPI(data) {
    return axios.post('/api/login' , data)
}

function* logOut(action) {
    try {
        // const res = yield call(logOutAPI , action.data)
        yield  delay(1000)
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: LOG_OUT_FAILURE,
            error: e.response.data
        })
    }

}


function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST , logOut)
}


function signUpAPI() {
    // 서버에 요청을 보내는 부분
    return axios.post('/login');
}

function* signUp() {
    try {
        // yield call(signUpAPI);
        yield delay(1000);
        // throw new Error('') // 에러발생
        yield put({ // put은 dispatch 동일
            type: SIGN_UP_SUCCESS,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        });
    }
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}




export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}