import React, {useState, useCallback} from 'react';
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux'
import {LIKE_POST_REQUEST, REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST} from "../reducers/post";
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
    const { removePostLoading } = useSelector((state) => state.post);
    const id = me && me.id;
    const [commentFormOpened, setCommentFormOpened] = useState(false);



    const onLike = useCallback(() => {
        if (!id) {
            return alert('로그인인이 필요합니다.');
        }
        return dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id
        })
    }, [id]);

    const onUnlike = useCallback(() => {
        if (!id) {
            return alert('로그인인이 필요합니다.');
        }
        return dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id
        })
    }, [id])

    const onClickToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev)
    }, [])

    const onRemovePost = useCallback(() => {
        if (!id) {
            return alert('로그인인이 필요합니다.');
        }
        return dispatch({
            type:REMOVE_POST_REQUEST,
            data:post.id
        })
    }, [id]);

    const onClickRetweet = useCallback(() => {
        if (!id) {
            return alert('로그인인이 필요합니다.');
        }
        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id
        })
    }, [id])

    const liked = post.Likers.find((v) => v.id === id);
    return (
        <>
            <CardWrapper >
                <Card
                    cover={post.Images[0] && <PostImages images={post.Images}/>}
                    actions={[
                        <RetweetOutlined key="retweet" onClick={onClickRetweet} />,
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
                    title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다` : null}
                    extra={id && <FollowButton post={post} />}
                >
                    {post.RetweetId && post.Retweet ? (
                       <Card
                           cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images}/>}
                       >
                           <Card.Meta
                               avatar={(
                                   <Link href={`/user/${post.Retweet.User.id}`}>
                                       <a>
                                           <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                                       </a>
                                   </Link>
                               )}
                               title={post.Retweet.User.nickname}
                               description={ <PostCardContent postData={post.Retweet.content} />  }
                           />
                       </Card>
                    ) : (
                        <Card.Meta
                            avatar={(
                                <Link href={`/user/${post.User.id}`}>
                                    <a>
                                        <Avatar>{post.User.nickname[0]}</Avatar>
                                    </a>
                                </Link>
                            )}
                            title={post.User.nickname}
                            description={ <PostCardContent postData={post.content} />  }
                        />
                    )}

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
                                            avater={(
                                                <Link href={`/user/${item.User.id}`}>
                                                    <a>
                                                        <Avatar>{item.User.nickname[0]}</Avatar>
                                                    </a>
                                                </Link>
                                            )}
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