import React, {useState} from 'react';
import Slick from 'react-slick';
import styled, {createGlobalStyle} from 'styled-components';
import {CloseOutlined} from "@ant-design/icons";
import {Overlay, Global, Header, SlickWrapper, CloseBtn, ImgWrapper, Indicator} from './styles'
import {backUrl} from "../../config/config";


const ImagesZoom = ({images, onClose}) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    return (
        <>
            <Overlay>
                <Global/>
                <Header>
                    <h1>상세 이미지</h1>
                    <CloseBtn onClick={onClose}/>
                </Header>
                <SlickWrapper>
                    <div>
                        <Slick
                            initialSlie={0}
                            afterChange={(slide) => setCurrentSlide(slide)}
                            infinite
                            arrows={false}
                            slidesToShow={1}
                            slidesToScroll={1}
                        >
                            {images.map((v) => (
                                <ImgWrapper key={v.src}>
                                    <img src={`${backUrl}/${v.src}` } alt={v.src}/>
                                </ImgWrapper>
                            ))}
                        </Slick>
                        <Indicator>
                            <div>
                                {currentSlide + 1}
                                {' '}
                                /
                                {images.length}
                            </div>
                        </Indicator>
                    </div>
                </SlickWrapper>
            </Overlay>
        </>
    )
}

export default ImagesZoom