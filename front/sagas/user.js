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
    SIGN_UP_SUCCESS,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE
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


function followAPI() {
    // 서버에 요청을 보내는 부분
    return axios.post('/login');
}

function* follow(action) {
    try {
        // yield call(followAPI);
        yield delay(1000);
        // throw new Error('') //
        yield put({ //
            type: FOLLOW_SUCCESS,
            data: action.data
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: FOLLOW_FAILURE,
            error: e,
        });
    }
}


function unfollowAPI() {
    // 서버에 요청을 보내는 부분
    return axios.post('/login');
}

function* unfollow(action) {
    try {
        // yield call(unfollowAPI);
        yield delay(1000);
        // throw new Error('') //
        yield put({ //
            type: UNFOLLOW_SUCCESS,
            data: action.data
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: UNFOLLOW_FAILURE,
            error: e,
        });
    }
}



function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST , logOut)
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
    yield takeEvery(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
    yield takeEvery(UNFOLLOW_REQUEST, unfollow);
}



export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchFollow),
        fork(watchUnfollow),
    ])
}