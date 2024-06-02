// 취득세 결과에서 설명 섹션

import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import getFontSize from '../utils/getFontSize';
import * as Animatable from 'react-native-animatable';
import ChatBubbleIcon from '../assets/icons/chat_bubble.svg';

const Card = styled(Animatable.View).attrs(props => ({
  animation: 'fadeInUp',
}))`
  width: 100%;
  height: auto;
  padding: 20px 25px;
  border-radius: 10px;
  border: 1px solid #e8eaed;
  margin-top: 10px;
`;

const CardHeader = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: ${getFontSize(15)}px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 20px;
  margin-left: 10px;
`;

const InfoContainer = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 10px;
`;

const InfoNum = styled.Text`
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Bold;
  color: #2f87ff;
  line-height: 20px;
  margin-right: 6px;
`;

const InfoText = styled.Text`
  flex: 1;
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Regular;
  color: #1b1c1f;
  line-height: 20px;
`;

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #e8eaed;
  margin-top: 10px;
`;

const TaxInfoCard = () => {
  return (
    <Card>
      <CardHeader>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#e8eaed',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ChatBubbleIcon />
        </View>
        <Title>계산된 취득세에 대해 설명드릴게요</Title>
      </CardHeader>

      <InfoContainer>
        <InfoNum>1.</InfoNum>
        <InfoText>
          둘 중 한 채를 3년 내 처분하는 경우{'\n'}일시적 2주택에 해당하는
          취득세율 적용이 가능합니다.
        </InfoText>
      </InfoContainer>
      <Divider />
      <InfoContainer>
        <InfoNum>2.</InfoNum>
        <InfoText>
          취득시점의 주택 수에 따라{'\n'}1~12%(개정 후) 세율이 적용됩니다.
        </InfoText>
      </InfoContainer>
      <Divider />
      <InfoContainer>
        <InfoNum>3.</InfoNum>
        <InfoText>
          둘 중 한 채를 3년 내 처분하는 경우{'\n'}일시적 2주택에 해당하는
          취득세율 적용이 가능합니다.
        </InfoText>
      </InfoContainer>
    </Card>
  );
};

export default TaxInfoCard;
