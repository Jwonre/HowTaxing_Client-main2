// 취득세 결과에서 세금섹션

import React from 'react';
import styled from 'styled-components';
import getFontSize from '../utils/getFontSize';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';

const Card = styled(Animatable.View).attrs(props => ({
  animation: 'fadeInUp',
}))`
  width: 100%;
  height: auto;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid #e8eaed;
  margin-top: 10px;
`;
const InfoContentItem = styled.View`
  width: 100%;
  height: 56px;
  background-color: #fff;
  border-radius: 6px;
  padding: 0 18px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: #e8eaed;
`;

const InfoContentLabel = styled.Text`
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Regular;
  color: #1b1c1f;
  line-height: 20px;
  letter-spacing: -0.3px;
`;

const InfoContentText = styled.Text`
  font-size: ${getFontSize(14)}px;
  font-family: Pretendard-Medium;
  color: #1b1c1f;
  line-height: 20px;
  margin-left: auto;
`;

const SubContainer = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  margin-bottom: 10px;
`;

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #e8eaed;
  margin-bottom: 10px;
`;

const TaxCard = () => {
  const houseInfo = useSelector(state => state.houseInfo.value);
  return (
    <Card>
      <InfoContentItem>
        <InfoContentLabel>취득세 합계</InfoContentLabel>
        <InfoContentText
          style={{
            color: '#2F87FF',
            fontFamily: 'Pretendard-Medium',
          }}>
          {Number(houseInfo?.totTaxPrice)?.toLocaleString()} 원
        </InfoContentText>
      </InfoContentItem>
      <InfoContentItem>
        <InfoContentLabel>취득세</InfoContentLabel>
        <InfoContentText
          style={{
            fontFamily: 'Pretendard-Medium',
          }}>
          {Number(houseInfo?.buyTaxPrice)?.toLocaleString()} 원
        </InfoContentText>
      </InfoContentItem>
      <SubContainer>
        <InfoContentLabel>취득가액</InfoContentLabel>
        <InfoContentText
          style={{
            color: '#A3A5A8',
          }}>
          {Number(houseInfo?.buyPrice)?.toLocaleString()} 원
        </InfoContentText>
      </SubContainer>
      <SubContainer>
        <InfoContentLabel>취득세율</InfoContentLabel>
        <InfoContentText
          style={{
            color: '#A3A5A8',
          }}>
          {houseInfo?.buyTaxRate}%
        </InfoContentText>
      </SubContainer>
      <Divider />

      <InfoContentItem>
        <InfoContentLabel>지방교육세</InfoContentLabel>
        <InfoContentText>
          {Number(houseInfo?.eduTaxPrice)?.toLocaleString()} 원
        </InfoContentText>
      </InfoContentItem>
      <SubContainer>
        <InfoContentLabel>지방교육세율</InfoContentLabel>
        <InfoContentText
          style={{
            color: '#A3A5A8',
          }}>
          {houseInfo?.deuTaxRate}%
        </InfoContentText>
      </SubContainer>
      <Divider />
      <InfoContentItem>
        <InfoContentLabel>농어촌특별세</InfoContentLabel>
        <InfoContentText>
          {Number(houseInfo?.agrTaxPrice)?.toLocaleString()} 원
        </InfoContentText>
      </InfoContentItem>
      <SubContainer>
        <InfoContentLabel>농어촌특별세율</InfoContentLabel>
        <InfoContentText
          style={{
            color: '#A3A5A8',
          }}>
          {houseInfo?.agrTaxRate} %
        </InfoContentText>
      </SubContainer>
      <Divider />
    </Card>
  );
};

export default TaxCard;
