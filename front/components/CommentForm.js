import React, {useCallback, useEffect} from 'react';
import {Form , Input , Button} from 'antd'
import useInput from "../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import {ADD_COMMENT_REQUEST} from "../reducers/post";

const FormBox = styled(Form)`
  position: relative;
  margin: 0;

`;

const SubmitButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: -40px;
`

const CommentForm = ({post}) => {
    const dispatch = useDispatch()

    const { me } = useSelector((state) => state.user);
    const { addCommentDone } = useSelector((state) => state.post);

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
            <FormBox onFinish={onSubmitComment}>
                <Form.Item>
                    <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                    <SubmitButton type="primary" htmlType="submit">댓글작성</SubmitButton>
                </Form.Item>
            </FormBox>
        </>
    )
};

export default CommentForm