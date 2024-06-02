// 개인정보 처리방침

import { TouchableOpacity, useWindowDimensions, ScrollView, BackHandler } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
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

const Copyright3 = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [activeButton, setActiveButton] = useState(false);
  const { certType, agreeCert, agreePrivacy, agreeLocation, agreeAge, agreeMarketing, agreeCopyright, agreeGov24 } = useSelector(
    state => state.cert.value,
  );

  const handleBackPress = () => {
    navigation.goBack();
    setTimeout(() => {
      SheetManager.show('cert2', {
        payload: {
          index: props.route.params.index,
        },
      });
    }, 300);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [handleBackPress]);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => {
            navigation.goBack();
            setTimeout(() => {
              SheetManager.show('cert2', {
                payload: {
                  index: props.route.params.index,
                },
              });
            }, 300);
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
    setActiveButton(true);
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
            nativeEvent.contentSize.height - 1
          ) {
            setActiveButton(true);
          } else {
            setActiveButton(false);
          }
        }}>
        // 스크롤이 하단에 도달했을 때

        <Title>(필수) 정부24 저작권보호정책</Title>
        <SubTitle>[필수] 정부24 저작권보호정책</SubTitle>
        <ContentText>
          {`저작권보호정책
정부24의 내용은 저작권법에 의한 보호를 받는 저작물로서, 이에 대한 무단 복제 및 배포를 원칙적으로 금합니다.
이를 무단 복제 · 배포하는 경우 저작권법 제136조의5 에 의한 저작재산권 침해 죄에 해당될 수 있습니다.
정부24에서 제공하는 자료로 수익을 얻거나 이에 상응하는 혜택을 누리고자 하는 경우에는 시스템 운영자와 사전에 별도의 협의를 하거나 허락을 얻어야 하며, 협의 또는 허락에 의한 경우에도 출처가 정부24임을 반드시 명시하여야 합니다.
정부24의 자료를 적법한 절차에 따라 다른 인터넷 사이트에 게재하는 경우에도 단순한 오류 정정 이외에 내용의 무단변경을 금지하며, 이를 위반할 때에는 형사 처벌을 받을 수 있습니다. 또한, 다른 인터넷 사이트에서 정부24로 링크하는 경우에는 정부24의 첫 화면이외의 세부화면(서브도메인)으로 링크시키거나 페이지를 프레임안에 넣는 것은 허용되지 않고, 링크 사실을 시스템 운영자에 반드시 통지하여야 합니다.
※ 단, 저작권법 제24조의2 (공공저작물의 자유이용)에 따라 국가 또는 지방자치단체가 업무상 작성하여 공표한 저작물이나 계약에 따라 정부24에서 저작재산권의 전부를 보유한 저작물은 "이용허락범위 제한 없음"을 표시하고 있으므로 저작물의 출처를 구체적으로 표시하고 자유롭게 이용할 수 있습니다.
`}
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
            active={activeButton || agreeCopyright}
            disabled={!(activeButton || agreeCopyright)}
            onPress={() => {
              dispatch(
                setCert({
                  certType,
                  agreePrivacy,
                  agreeCert,
                  agreeCopyright: true,
                  agreeGov24,
                }),
              );
              navigation.goBack();

              setTimeout(() => {
                SheetManager.show('cert2', {
                  payload: {
                    index: props.route.params.index,
                  },
                });
              }, 300);
            }}>
            <ButtonText active={activeButton || agreeCopyright}>
              동의 후 인증하기
            </ButtonText>
          </Button>
        </DropShadow>
      </ButtonSection>
    </Container>
  );
};

export default Copyright3;
