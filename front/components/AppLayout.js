import React from 'react';
import Link from 'next/link';
import { Menu , Input , Row , Col } from 'antd'
import styled from 'styled-components';
import {useSelector} from 'react-redux';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`

const AppLayout = ({children}) => {
    const {isLoggedIn} = useSelector((state) => state.user)


    return (
        <>
            <div>
                <Menu mode="horizontal">
                    <Menu.Item>
                        <Link href="/"><a>노드버드</a></Link>
                    </Menu.Item>
                    <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                    </Menu.Item>
                    <Menu.Item>
                        <SearchInput enterButton />
                    </Menu.Item>
                    <Menu.Item>
                        <Link href="/signup"><a>회원가입</a></Link>
                    </Menu.Item>
                </Menu>
                <Row gutter={8}>
                    <Col xs={24} md={6} >
                        {isLoggedIn ? <UserProfile  /> : <LoginForm  />}
                    </Col>
                    <Col xs={24} md={12} >
                        {children}
                    </Col>
                    <Col xs={24} md={6} >
                        <a href="https://github.com/codingpalette" target="_blank" rel="noreferrer noopener  ">바로가기</a>
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default AppLayout