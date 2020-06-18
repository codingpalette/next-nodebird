


export const initialState = {
    mainPosts : [{
        id:1,
        User:{
            id:1,
            nickname:'제로초',
        },
        content:'첫 번째 게시글 #해시태그 #익스프레스',
        Images: [
            {src : 'https://cdn.pixabay.com/photo/2020/06/14/22/46/the-caucasus-5299607_960_720.jpg'},
            {src : 'https://cdn.pixabay.com/photo/2020/02/24/06/33/crescent-4875339_960_720.jpg'},
            {src : 'https://cdn.pixabay.com/photo/2020/06/13/19/01/edsel-5295453_960_720.jpg'},
        ],
        Comments: [
            {
                User:{
                    nickname: '홍길동',
                },
                content:'우왕 굿'
            },
            {
                User:{
                    nickname: '성춘향',
                },
                content:'멋지네용'
            }
        ]
    }],
    imagePaths:[],
    postAdded:false
}

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST,
}

const dummyPost = {
    id:2,
    content:'더미데이터',
    User:{
        id:1,
        nickname:'제로초',
    },
    Images:[],
    Comments:[]
}

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost , ...state.mainPosts],
                postAdded: true,
            }
        default:
            return state;
    }
}

export default reducer;