import React from 'react';
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { useSelector } from 'react-redux';
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";


const Profile = () => {

    const { me } = useSelector((state) => state.user);

    return(
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <div>
                    <NicknameEditForm />
                    <FollowList header="팔로링" data={me.Followings} />
                    <FollowList header="팔로워" data={me.Followers} />
                </div>
            </AppLayout>

        </>
    )
}

export default Profile