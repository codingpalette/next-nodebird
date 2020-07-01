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
    UNFOLLOW_FAILURE,
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS,
    LOAD_MY_INFO_FAILURE, CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE
} from '../reducers/user'


function changeNicknameAPI(data) {
    return axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action) {
    try {
        const res = yield call(changeNicknameAPI, action.data);
        console.log(res);
        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            // data: res.data
            data:res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: e.response.data
        })
    }

}


function loadMyInfoAPI() {
    return axios.get('/user')
}

function* loadMyInfo() {
    try {
        const res = yield call(loadMyInfoAPI);
        // console.log(res)
        // yield  delay(1000)
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            // data: res.data
            data:res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: e.response.data
        })
    }

}



function logInAPI(data) {
    return axios.post('/user/login', data)
}

function* logIn(action) {
    try {
        const res = yield call(logInAPI , action.data);
        console.log(res)
        // yield  delay(1000)
        yield put({
            type: LOG_IN_SUCCESS,
            // data: res.data
            data:res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: LOG_IN_FAILURE,
            error: e.response.data
        })
    }

}



function logOutAPI() {
    return axios.post('/user/logout')
}

function* logOut(action) {
    try {
        yield call(logOutAPI )
        // yield  delay(1000)
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



function signUpAPI(data) {
    // 서버에 요청을 보내는 부분
    return axios.post('/user', data);
}

function* signUp(action) {
    try {
        const res = yield call(signUpAPI, action.data);
        // yield delay(1000);
        // throw new Error('') // 에러발생
        yield put({ // put은 dispatch 동일
            type: SIGN_UP_SUCCESS,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e.response.data,
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


function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname)
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo)
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
        fork(watchChangeNickname),
        fork(watchLoadMyInfo),
        fork(watchSignUp),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchFollow),
        fork(watchUnfollow),
    ])
}