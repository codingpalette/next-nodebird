import React from 'react'
import { useDispatch } from "react-redux";
import {REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST} from "../reducers/user";
import { List , Button, Card } from 'antd';
import {StopOutlined} from '@ant-design/icons';


const FollowList = ( {header , data} ) => {
    const dispatch = useDispatch();

    const onClickUnfollow = (id) => () => {
        if (header === '팔로잉') {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: id,
            });
        }
        dispatch({
            type: REMOVE_FOLLOWER_REQUEST,
            data: id,
        });
    }

    return(
        <>
            <List
                style={{marginBottom:20}}
                grid={{gutter : 4 , xs:2 , md :3}}
                size="small"
                header={<div>{header}</div>}
                loadMore={<div style={{textAlign : 'center' , margin:'10px 0'}}><Button>더 보기</Button></div>}
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item style={{marginTop:20}}>
                        <Card actions={[<StopOutlined key="stop" onClick={onClickUnfollow(item.id)} />]}>
                            <Card.Meta description={item.nickname} />
                        </Card>
                    </List.Item>
                )}
            />

        </>
    )
}

export default FollowList;