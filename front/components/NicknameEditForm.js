import React  from 'react'
import {Form , Input} from 'antd';
import styled from 'styled-components';

const NickForm = styled(Form)`
  margin-bottom: 20px;
  border:1px solid #d9d9d9;
  padding: 20px;
`;


const NicknameEditForm = () => {
    return(
        <>
            <NickForm>
                <Input.Search addonBefore="닉네임" enterButton="수정" />
            </NickForm>
        </>
    )
}

export default NicknameEditForm;