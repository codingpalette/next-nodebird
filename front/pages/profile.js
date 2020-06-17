import React from 'react';
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";


const Profile = () => {
    const followerList = [{ nickname : '닉네임'} , { nickname : '홍길동'} ,{ nickname : '성춘향'}]
    const followingList = [{ nickname : '닉네임'} , { nickname : '홍길동'} ,{ nickname : '성춘향'}]

    return(
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <div>
                    <NicknameEditForm />
                    <FollowList header="팔로링 목록" data={followingList} />
                    <FollowList header="팔로워 목록" data={followerList} />
                </div>
            </AppLayout>

        </>
    )
}

export default Profile