import React, {useCallback, useEffect} from 'react';
import {Form , Input , Button} from 'antd'
import useInput from "../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import {ADD_COMMENT_REQUEST} from "../reducers/post";

const FormBox = styled(Form.Item)`
  position: relative;
  margin: 0;

`;

const SubmitButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: -40px;
  z-index: 1;
`

const CommentForm = ({post}) => {
    const dispatch = useDispatch()

    const { me } = useSelector((state) => state.user);
    const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);

    const id = me && me.id;
    const [commentText , onChangeCommentText, setCommentText] = useInput();

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('')
        }
    }, [addCommentDone])

    const onSubmitComment = useCallback(() => {
        console.log(post.id , commentText)
        dispatch({
            type:ADD_COMMENT_REQUEST,
            data: { content: commentText, userId: id, postId: post.id },
        })
    }, [commentText , id])
    return(
        <>
            <Form onFinish={onSubmitComment}>
                <FormBox>
                    <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                    <SubmitButton type="primary" htmlType="submit" loading={addCommentLoading}>댓글작성</SubmitButton>
                </FormBox>
            </Form>
        </>
    )
};

export default CommentForm