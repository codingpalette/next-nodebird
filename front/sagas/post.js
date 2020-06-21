import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS
} from "../reducers/post";


function addPostAPI(data) {
    return axios.post('/api/post' , data)
}

function* addPost(action) {
    try {
        // const res = yield call(addPostAPI , action.data)
        yield  delay(1000)
        yield put({
            type: ADD_POST_SUCCESS,
            // data: res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: ADD_POST_FAILURE,
            error: e.response.data
        })
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}


function addCommentAPI(data) {
    return axios.post('/api/post' , data)
}

function* addComment(action) {
    try {
        // const res = yield call(addCommentAPI , action.data)
        yield  delay(1000)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            // data: res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e.response.data
        })
    }
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}



export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}