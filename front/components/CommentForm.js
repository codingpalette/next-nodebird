import React , {useState , useCallback} from 'react';
import {Form , Input , Button} from 'antd'
import useInput from "../hooks/useInput";
import {useSelector} from "react-redux";
import styled from 'styled-components';

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
    const {me} = useSelector((state) => state.user);
    const id = me && me.id;
    const [commentText , onChangeCommentText] = useInput();
    const onSubmitComment = useCallback(() => {
        console.log(post.id , commentText)
    }, [commentText])
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