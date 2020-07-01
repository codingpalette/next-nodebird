import React, {useState, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {LIKE_POST_REQUEST, REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST} from "../reducers/post";
import { Card, Popover, Button, Avatar, List, Comment } from 'antd'
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from "@ant-design/icons";
import styled from 'styled-components';
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import FollowButton from "./FollowButton";



const CardWrapper = styled.div`
  margin-bottom: 20px;
`;


const PostCard = ({post}) => {
    const dispatch = useDispatch()

    const { me } = useSelector((state) => state.user);
    const { removePostLoading } = useSelector((state) => state.post)

    const id = me && me.id;

    const [commentFormOpened, setCommentFormOpened] = useState(false)

    const onLike = useCallback(() => {
        dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id
        })
    }, []);

    const onUnlike = useCallback(() => {
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id
        })
    }, [])

    const onClickToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev)
    }, [])

    const onRemovePost = useCallback(() => {
        dispatch({
            type:REMOVE_POST_REQUEST,
            data:post.id
        })
    }, [])

    const liked = post.Likers.find((v) => v.id === id)
    return (
        <>
            <CardWrapper >
                <Card
                    cover={post.Images[0] && <PostImages images={post.Images}/>}
                    actions={[
                        <RetweetOutlined key="retweet"/>,
                        liked
                            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike}/>
                            : <HeartOutlined key="heart" onClick={onLike}/>,
                        <MessageOutlined key="comment" onClick={onClickToggleComment}/>,
                        <Popover key="more" content={(
                            <Button.Group>
                                {id && post.User.id === id ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                                    </>
                                ) : (
                                    <Button>신고</Button>
                                )}


                            </Button.Group>
                        )}>
                            <EllipsisOutlined/>
                        </Popover>
                    ]}
                    extra={id && <FollowButton post={post} />}
                >
                    <Card.Meta
                        avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                        title={post.User.nickname}
                        description={ <PostCardContent postData={post.content} />  }
                    />
                </Card>
                {commentFormOpened && (
                    <>
                        <div>
                            <CommentForm post={post}/>
                            <List
                                header={`${post.Comments.length}개의 댓글`}
                                itemLayout="horizontal"
                                dataSource={post.Comments}
                                renderItem={(item) => (
                                    <li>
                                        <Comment
                                            author={item.User.nickname}
                                            avater={<Avatar>{item.User.nickname[0]}</Avatar>}
                                            content={item.content}
                                        />
                                    </li>
                                )}
                            />
                        </div>
                    </>
                )}
            </CardWrapper>
        </>
    )
};

export default PostCard;