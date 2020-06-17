import React , {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import { Card , Avatar , Button} from 'antd';
import {logoutAction} from "../reducers";

const UserProfile = ( ) => {
    const dispatch = useDispatch();
    const onClickLogOut = useCallback(() => {
        dispatch(logoutAction())
    }, [])

    return(
        <>
            <Card actions={[
                <div key="twit">개시글 <br/>0</div>,
                <div key="followings">팔로잉 <br/>0</div>,
                <div key="followings1">팔로워 <br/>0</div>
            ]}>
                <Card.Meta avatar={<Avatar>ZC</Avatar>} title="Coding" />
                <Button onClick={onClickLogOut}>로그아웃</Button>
            </Card>
        </>
    )
}

export default UserProfile;