import React, {useState, useCallback} from 'react';
import {useSelector} from 'react-redux'
import {Card, Popover, Button, Avatar, List, Comment} from 'antd'
import {EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined} from "@ant-design/icons";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";


const PostCard = ({post}) => {
    const {me} = useSelector((state) => state.user);
    const id = me && me.id;
    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const onClickToggleLiked = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);
    const onClickToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev)
    }, [])


    return (
        <>
            <div style={{marginBottom: '20px'}}>
                <Card
                    cover={post.Images[0] && <PostImages images={post.Images}/>}
                    actions={[
                        <RetweetOutlined key="retweet"/>,
                        liked
                            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onClickToggleLiked}/>
                            : <HeartOutlined key="heart" onClick={onClickToggleLiked}/>,
                        <MessageOutlined key="comment" onClick={onClickToggleComment}/>,
                        <Popover key="more" content={(
                            <Button.Group>
                                {id && post.User.id === id ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type="danger">삭제</Button>
                                    </>
                                ) : (
                                    <Button>신고</Button>
                                )}


                            </Button.Group>
                        )}>
                            <EllipsisOutlined/>
                        </Popover>
                    ]}
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
            </div>
        </>
    )
};

export default PostCard;