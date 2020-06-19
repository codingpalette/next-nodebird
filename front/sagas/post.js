import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';


function addPostAPI(data) {
    return axios.post('/api/post' , data)
}

function* addPost(action) {
    try {
        // const res = yield call(addPostAPI , action.data)
        yield  delay(1000)
        yield put({
            type: 'ADD_POST_SUCCESS',
            // data: res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: 'ADD_POST_FAILURE',
            data: e.response.data
        })
    }

}

function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost)

}



export default function* postSaga() {
    yield all([
        fork(watchAddPost),
    ])
}