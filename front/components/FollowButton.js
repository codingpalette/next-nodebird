import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";
import { Button } from 'antd'


const FollowButton = ({ post }) => {
    const dispatch = useDispatch()
    const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);

    const isFollowing = me?.Followings.find((v) => v.id === post.User.id)
    const onClickOnFollow = useCallback(() => {
        if (isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id
            })
        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id
            })
        }
    }, [isFollowing]);

    if (post.User.id === me.id) {
        return null;
    }
    return(
        <>
            <Button loading={ followLoading || unfollowLoading } onClick={onClickOnFollow}>
                { isFollowing ? '언팔로우' : '팔로우' }
            </Button>
        </>
    )
}

export default FollowButton;