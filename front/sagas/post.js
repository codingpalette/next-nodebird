import {all, fork, call, put, take, takeEvery, takeLatest, delay, throttle} from 'redux-saga/effects';
// import shortId from 'shortid';
import axios from 'axios';
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    LIKE_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE, LOAD_HASHTAG_POSTS_REQUEST, LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_POST_FAILURE, LOAD_POST_REQUEST, LOAD_POST_SUCCESS,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS, LOAD_USER_POSTS_FAILURE, LOAD_USER_POSTS_REQUEST, LOAD_USER_POSTS_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    RETWEET_FAILURE, RETWEET_REQUEST, RETWEET_SUCCESS,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS
} from "../reducers/post";
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";


function likePostAPI(data) {
    return axios.patch(`/post/${data}/like`)
}

function* likePost(action) {
    try {
        const res = yield call(likePostAPI, action.data)
        yield put({
            type: LIKE_POST_SUCCESS,
            data: res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: LIKE_POST_FAILURE,
            error: e.response.data
        })
    }
}


function unlikePostAPI(data) {
    return axios.delete(`/post/${data}/like`)
}

function* unlikePost(action) {
    try {
        const res = yield call(unlikePostAPI, action.data)
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: e.response.data
        })
    }
}


function loadPostsAPI(lastId) {
    return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
    try {
        const res = yield call(loadPostsAPI, action.lastId);
        // yield  delay(1000);
        console.log(res)

        yield put({
            type: LOAD_POSTS_SUCCESS,
            // data: generateDummyPost(10)
            data: res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: e.response.data
        })
    }
}

function loadUserPostsAPI(data, lastId) {
    return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function* loadUserPosts(action) {
    try {
        const result = yield call(loadUserPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            data: err.response.data,
        });
    }
}

function loadHashtagPostsAPI(data, lastId) {
    return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}

function* loadHashtagPosts(action) {
    try {
        const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            data: err.response.data,
        });
    }
}


function loadPostAPI(data) {
    return axios.get(`/post/${data}`);
}

function* loadPost(action) {
    try {
        const res = yield call(loadPostAPI, action.data);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: LOAD_POST_FAILURE,
            error: e.response.data
        })
    }
}


function addPostAPI(data) {
    return axios.post('/post', data)
}

function* addPost(action) {
    try {
        const res = yield call(addPostAPI, action.data)
        // yield  delay(1000)
        // const id = shortId.generate()
        yield put({
            type: ADD_POST_SUCCESS,
            data: res.data
            // data: {
            //     id,
            //     content:action.data
            // }
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: res.data.id
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: ADD_POST_FAILURE,
            error: e.response.data
        })
    }
}


function removePostAPI(data) {
    return axios.delete(`/post/${data}`)
}

function* removePost(action) {
    try {
        const res = yield call(removePostAPI, action.data)
        // yield  delay(1000)
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: res.data

        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: e.response.data
        })
    }
}


function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data)  // POST /post/1/comment
}

function* addComment(action) {
    try {
        const res = yield call(addCommentAPI, action.data)
        // yield  delay(1000)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: res.data
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


function uploadImagesAPI(data) {
    return axios.post(`/post/images`, data)  // POST /post/1/comment
}

function* uploadImages(action) {
    try {
        const res = yield call(uploadImagesAPI, action.data)
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: e.response.data
        })
    }
}


function retweetAPI(data) {
    return axios.post(`/post/${data}/retweet`)  // POST /post/1/comment
}

function* retweet(action) {
    try {
        const res = yield call(retweetAPI, action.data)
        yield put({
            type: RETWEET_SUCCESS,
            data: res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: RETWEET_FAILURE,
            error: e.response.data
        })
    }
}


function* watchLikePosts() {
    yield takeLatest(LIKE_POST_REQUEST, likePost)
}

function* watchUnlikePosts() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}

function* watchLoadUserPosts() {
    yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts)
}

function* watchLoadHashtagPosts() {
    yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts)
}

function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts)
}

function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost)
}


function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}


function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
}


function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}

function* watchRetweet() {
    yield takeLatest(RETWEET_REQUEST, retweet)
}


export default function* postSaga() {
    yield all([
        fork(watchLikePosts),
        fork(watchUnlikePosts),
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
        fork(watchLoadPosts),
        fork(watchLoadPost),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchUploadImages),
        fork(watchRetweet),
    ])
}