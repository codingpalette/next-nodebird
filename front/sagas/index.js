import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import axios from 'axios';

import userSaga from "./user";
import postSaga from "./post";


export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ])
}