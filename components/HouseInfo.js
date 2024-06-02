// 결과에서 주택 정보 섹션 

import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import getFontSize from '../utils/getFontSize';
import {HOUSE_TYPE} from '../constants/colors';

const HoustInfoSection = styled.View`
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 16px 20px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: #e8eaed;
`;

const HoustInfoTitle = styled.Text`
  width: 105%;
  font-size: ${getFontSize(20)}px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 24px;
  margin-bottom: 7px;
  margin-top: 4px;
`;

const HoustInfoText = styled.Text`
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Regular;
  color: #717274;
  line-height: 20px;
`;

const HoustInfoBadge = styled.View`
  width: auto;
  margin-right: auto;
  margin-Bottom: 10px;
  height: 22px;
  padding: 0 10px;
  border-radius: 11px;
  align-items: center;
  justify-content: center;
  background-color: #1fc9a8;
`;

const HoustInfoBadgeText = styled.Text`
  font-size: ${getFontSize(10)}px;
  font-family: Pretendard-Medium;
  color: #fff;
  line-height: 12px;
  letter-spacing: -0.5px;
`;

const HoustInfoButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  width: 100px;
  height: 32px;
  border-radius: 16px;
  background-color: #fff;
  border-width: 1px;
  border-color: #e8eaed;
  align-items: center;
  justify-content: center;
`;

const HoustInfoButtonText = styled.Text`
  font-size: ${getFontSize(10)}px;
  font-family: Pretendard-Regular;
  color: #717274;
  line-height: 20px;
`;

const HouseInfo = props => {
  //console.log(props);
  return (
    <HoustInfoSection>
      <View
        style={{
          width: '60%',
        }}>
        <HoustInfoBadge
          style={{
            backgroundColor: HOUSE_TYPE.find(
              item => item.id === props.item?.houseType,
            )?.color,
          }}>
          <HoustInfoBadgeText>
            {HOUSE_TYPE.find(item => item.id === props.item?.houseType)?.name}
          </HoustInfoBadgeText>
        </HoustInfoBadge>
        <HoustInfoTitle>{props.item?.houseName}</HoustInfoTitle>
        <HoustInfoText>{props.item?.houseDetailName}</HoustInfoText>
      </View>
      <HoustInfoButton
        onPress={() => {
          props.navigation.push('HouseDetail', {
            item: props.item,
          });
         // console.log('houseinfo.js houseinfo', props.item);
        }}>
        <HoustInfoButtonText>자세히 보기</HoustInfoButtonText>
      </HoustInfoButton>
    </HoustInfoSection>
  );
};

export default HouseInfo;
