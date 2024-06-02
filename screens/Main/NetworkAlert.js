
import { useWindowDimensions, BackHandler } from 'react-native';
import React, { useLayoutEffect, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import DropShadow from 'react-native-drop-shadow';
import getFontSize from '../../utils/getFontSize';
import NetInfo from '@react-native-community/netinfo';


const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const IntroSection = styled.View`
  flex: 0.6;
  width: 100%;
  padding: 25px;
  justify-content: flex-end;
`;

const Tag = styled.View`
  width: 68px;
  height: 26px;
  background-color: #fff;
  border-radius: ${getFontSize(16)}px;
  align-items: center;
  justify-content: center;
  border: 1px solid #FF7401;
`;

const TagText = styled.Text`
  font-size: ${getFontSize(13)}px;
  font-family: Pretendard-Medium;
  color: #FF7401;
  line-height: 16px;
  letter-spacing: -0.5px;
`;

const Title = styled.Text`
  font-size: ${getFontSize(25)}px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 30px;
  margin-bottom: 10px;
  margin-top: 20px;
  letter-spacing: -0.5px;
`;

const SubTitle = styled.Text`
  font-size: ${getFontSize(13)}px;
  font-family: Pretendard-Regular;
  color: #a3a5a8;
  line-height: 20px;
  margin-top: 6px;
`;

const IconView = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 25px;
  border: 1px solid #e8eaed;
`;
const ButtonSection = styled.View`
  width: 100%;
  height: auto;
  background-color: #fff;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
`;

const Button = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background-color: #2f87ff;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #2f87ff;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  font-size: ${getFontSize(16)}px;
  font-family: Pretendard-Bold;
  color: #fff;
  line-height: 20px;
`;


const NetworkAlert = props => {
  const navigation = props.navigation;
  const { width } = useWindowDimensions();

  const handleBackPress = () => {
    NetInfo.addEventListener(state => {
      if (state.isConnected) {
        navigation.goBack();
      }
    })
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [handleBackPress]);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  return (
    <Container>
      <IntroSection>
        <Title>현재 인터넷이 연결되어 있지 않아요. 연결될 때까지 기다려 주세요.</Title>
        <ButtonSection>
          <DropShadow
            style={{
              shadowColor: 'rgba(0,0,0,0.25)',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.15,
              shadowRadius: 2,
              alignSelf: 'center',
              width: width - 80,
            }}>
            <Button
              onPress={() => {
                NetInfo.addEventListener(state => {
                  if (state.isConnected) {
                    navigation.goBack();
                  }
                })
                //navigation.goBack();
              }}>
              <ButtonText>연결하기</ButtonText>
            </Button>
          </DropShadow>
        </ButtonSection>
      </IntroSection>
    </Container>
  );
};

export default NetworkAlert;

