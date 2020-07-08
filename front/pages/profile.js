import React, { useState, useEffect, useCallback } from 'react';
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import {useDispatch, useSelector} from 'react-redux';
import Router from "next/router";
import {END} from "redux-saga";
import axios from "axios";
import useSWR from 'swr';

import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";
import wrapper from "../store/configureStore";


const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);


const Profile = () => {
    const dispatch = useDispatch()
    const { me } = useSelector((state) => state.user);

    const [followersLimit, setFollowersLimit] = useState(3);
    const [followingsLimit, setFollowingsLimit] = useState(3);

    const { data: followersData, error: followerError } = useSWR(`http://localhost:5000/user/followers?limit=${followersLimit}`, fetcher);
    const { data: followingsData, error: followingError } = useSWR(`http://localhost:5000/user/followings?limit=${followingsLimit}`, fetcher);



    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_FOLLOWERS_REQUEST
    //     });
    //     dispatch({
    //         type: LOAD_FOLLOWINGS_REQUEST
    //     });
    // }, [])

    useEffect(() => {
        if (!(me && me.id)) {
            Router.push('/')
        }
    }, [me && me.id]);

    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit((prev) => prev + 3);
    }, [])

    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit((prev) => prev + 3);
    }, [])

    if (!me) {
        return null;
    }


    if (followerError || followingError) {
        console.error(followerError || followingError);
        return <div>팔로잉/팔로워 로딩 중 에러가 발생하였습니다</div>;

    }



    return(
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <div>
                    <NicknameEditForm />
                    <FollowList header="팔로링" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} />
                    <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError} />
                </div>
            </AppLayout>

        </>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps start');
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
});

export default Profile