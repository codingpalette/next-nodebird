import React , {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Card , Avatar , Button} from 'antd';
import {LOG_OUT_REQUEST} from "../reducers/user";

const UserProfile = ( ) => {
    const dispatch = useDispatch();
    const {me, logOutLoading} = useSelector((state) => state.user);
    const onClickLogOut = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        })
    }, [])

    return(
        <>
            <Card actions={[
                <div key="twit">개시글 <br/>{me.Posts.length}</div>,
                <div key="followings">팔로잉 <br/>{me.Followings.length}</div>,
                <div key="followings1">팔로워 <br/>{me.Followers.length}</div>
            ]}>
                <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
                <Button onClick={onClickLogOut} loading={logOutLoading} >로그아웃</Button>
            </Card>
        </>
    )
}

export default UserProfile;