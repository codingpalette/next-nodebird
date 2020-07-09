import React  , {useState , useCallback} from 'react';
import styled from 'styled-components';
import {PlusOutlined} from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";
import {backUrl} from "../config/config";

const PhotoBox = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
  vertical-align: middle;

`;

const PostImages = ({images}) => {
    const [showImagesZoom , setShowImagesZoom] = useState(false)

    const onZoom = useCallback(() => {
        setShowImagesZoom(true)
    }, [])

    const onClose = useCallback(() => {
        setShowImagesZoom(false)
    }, [])

    if (images.length === 1) {
        return (
            <>
                <img role="presentation" src={`${backUrl}/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
            </>
        )
    }
    if (images.length === 2) {
        return (
            <>
                <img role="presentation" style={{width:'50%' , display:'inline-block'}} src={`${backUrl}/${images[0].src}`} alt={`${backUrl}/${images[0].src}`} onClick={onZoom} />
                <img role="presentation" style={{width:'50%', display:'inline-block'}} src={`${backUrl}/${images[1].src}`} alt={`${backUrl}/${images[1].src}`} onClick={onZoom} />
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
            </>
        )
    }
    return(
        <>
            <div>
                <img role="presentation" style={{width:'50%'}} src={`${backUrl}/${images[0].src}`} alt={`${backUrl}/${images[0].src}`} onClick={onZoom} />
                <PhotoBox
                    role="presentation"
                    onClick={onZoom}
                >
                    <PlusOutlined />
                    <br/>
                    {images.length -1}
                    개의 사진 더보기
                </PhotoBox>
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
            </div>
        </>
    )
}

export default PostImages;