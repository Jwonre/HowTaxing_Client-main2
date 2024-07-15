// 양도세 결과에서 설명 섹션

import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import getFontSize from '../utils/getFontSize';
import * as Animatable from 'react-native-animatable';
import ChatBubbleIcon from '../assets/icons/chat_bubble2.svg';

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
  color: #FF7401;
  line-height: 20px;
  margin-right: 6px;
`;

const InfoText = styled.Text`
  flex: 1;
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Regular;
  color: #FF7401;
  line-height: 20px;
`;

const TaxInfoCard2 = () => {
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
        <Title>잠시만요!</Title>
      </CardHeader>

      <InfoContainer>
        <InfoNum>1.</InfoNum>
        <InfoText>
          지금 보시는 세금 계산 결과는 법적 효력이 없으므로{'\n'}정확한 세금 납부를 위해서는 전문가에게 상담을 추천해요.
        </InfoText>
      </InfoContainer>
    </Card>
  );
};

export default TaxInfoCard2;
