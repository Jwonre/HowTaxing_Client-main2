// Note: 전자증명서 서비스 이용약관

import {
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import CloseIcon from '../../../assets/icons/close_button.svg';
import getFontSize from '../../../utils/getFontSize';
import DropShadow from 'react-native-drop-shadow';
import { SheetManager } from 'react-native-actions-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { setCert } from '../../../redux/certSlice';

const Container = styled.View`
    flex: 1;
    background-color: #fff;
  `;

const Title = styled.Text`
    font-size: ${getFontSize(20)}px;
    font-family: Pretendard-Bold;
    color: #1b1c1f;
    line-height: 30px;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
    margin-top: 20px;
  `;

const SubTitle = styled.Text`
    font-size: ${getFontSize(18)}px;
    font-family: Pretendard-Medium;
    color: #1b1c1f;
    line-height: 25px;
    margin-top: 10px;
    letter-spacing: -0.5px;
  `;

const ButtonSection = styled.View`
    position: absolute;
    bottom: 20px;
    width: 100%;
  `;

const Button = styled.TouchableOpacity.attrs(props => ({
    activeOpacity: 0.6,
}))`
    width: ${props => props.width - 40}px;
    height: 60px;
    border-radius: 30px;
    background-color: ${props => (props.active ? '#2F87FF' : '#e5e5e5')};
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    align-self: center;
  `;

const ButtonText = styled.Text`
    font-size: 18px;
    font-family: Pretendard-Bold;
    color: ${props => (props.active ? '#fff' : '#a3a5a8')};
    line-height: 20px;
  `;

const ContentText = styled.Text`
    font-size: 13px;
    font-family: Pretendard-Regular;
    color: #1b1c1f;
    line-height: 25px;
    margin-top: 20px;
  `;

const Location2 = props => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const [activeButton, setActiveButton] = useState(false);
    const { certType, agreeCert, agreePrivacy, agreeThird, agreeLocation, agreeAge, agreeMarketing  } = useSelector(
        state => state.cert.value,
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    activeOpacity={0.6}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    onPress={() => {
                        navigation.navigate("CheckTerms");
                    }}>
                    <CloseIcon />
                </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
            title: '하우택싱',
            headerShadowVisible: false,
            contentStyle: {
                borderTopWidth: 0,
            },
            headerTitleStyle: {
                fontFamily: 'Pretendard-Bold',
                fontSize: 17,
                color: '#333',
                letterSpacing: -0.8,
            },
        });
    }, []);

    return (
        <Container>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}
                onScroll={({ nativeEvent }) => {
                    // 하단 스크롤 시 버튼 활성화
                    if (
                        nativeEvent.contentOffset.y +
                        nativeEvent.layoutMeasurement.height >=
                        nativeEvent.contentSize.height
                    ) {
                        setActiveButton(true);
                    } else {
                        setActiveButton(false);
                    }
                }}>
                <Title>(필수) 위치정보 이용약관</Title>
                <SubTitle>[필수] 위치정보 이용약관 동의서</SubTitle>
                <ContentText>
                    {``}
                </ContentText>
            </ScrollView>
            <ButtonSection>
                <DropShadow
                    style={{
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 2,
                    }}>
                    <Button
                        width={width}
                        active={activeButton || agreeLocation}
                        disabled={!(activeButton || agreeLocation)}
                        onPress={() => {
                            // 동의하기 버튼 클릭 시 redux에 저장
                            dispatch(
                                setCert({
                                    certType,
                                    agreeCert, 
                                    agreePrivacy, 
                                    agreeThird, 
                                    agreeAge,
                                    agreeMarketing,
                                    agreeLocation : true,
                                }),
                            );

                            // 채팅방으로 이동
                            navigation.navigate("CheckTerms");
                        }}>
                        <ButtonText active={activeButton || agreeLocation}>동의하기</ButtonText>
                    </Button>
                </DropShadow>
            </ButtonSection>
        </Container>
    );
};

export default Location2;
