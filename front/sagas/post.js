import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import shortId from 'shortid';
import axios from 'axios';
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS
} from "../reducers/post";
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";


function addPostAPI(data) {
    return axios.post('/api/post' , data)
}

function* addPost(action) {
    try {
        // const res = yield call(addPostAPI , action.data)
        yield  delay(1000)
        const id = shortId.generate()
        yield put({
            type: ADD_POST_SUCCESS,
            // data: res.data
            data: {
                id,
                content:action.data
            }
        });
        yield put({
            type : ADD_POST_TO_ME,
            data : id
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


function removePostAPI(data) {
    return axios.post('/api/post' , data)
}

function* removePost(action) {
    try {
        // const res = yield call(addCommentAPI , action.data)
        yield  delay(1000)
        yield put({
            type: REMOVE_POST_SUCCESS,
            data:action.data

        });
        yield put({
            type : REMOVE_POST_OF_ME,
            data : action.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: e.response.data
        })
    }
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
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
            data: {
                postId: action.data.postId,
                content: action.data.content
            },
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
        fork(watchRemovePost),
        fork(watchAddComment),
    ])
}