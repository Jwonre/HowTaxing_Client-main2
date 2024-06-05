// 취득세 결과에서 세금섹션

import React, { useState, useEffect } from 'react';
import {
  View
} from 'react-native';
import styled from 'styled-components';
import getFontSize from '../utils/getFontSize';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import axios from 'axios';
import { setHouseInfo } from '../redux/houseInfoSlice';
import { HOUSE_TYPE } from '../constants/colors';
import { SheetManager } from 'react-native-actions-sheet';

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

const Tag = styled.View`
  flex-direction: row;
  margin-right: auto;
  width: 71px;
  height: 22px;
  background-color: #1fc9a8;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  padding: 0 10px;
  margin-bottom: 10px;
  align-self: flex-start;
`;

const TagText = styled.Text`
  font-size: 10px;
  font-family: Pretendard-Medium;
  color: #fff;
  line-height: 20px;
`;

const TagText2 = styled.Text`
  font-size: 12.5px;
  font-family: Pretendard-Medium;
  color: #2F87FF;
  line-height: 28px;
  font-weight: bold;
`;




const TaxCard = props => {
  const houseInfo = useSelector(state => state.houseInfo.value);
  const currentUser = useSelector(state => state.currentUser.value);
  const dispatch = useDispatch();
  const [Pdata, setPData] = useState({});

  useEffect(() => {
    getTaxCardInfo();
  }, []);

  const getTaxCardInfo = async () => {
    const params = {
      houseType: houseInfo.houseType === undefined ? '' : houseInfo.houseType,
      houseName: houseInfo.houseName === undefined ? '' : houseInfo.houseName,
      detailAdr: houseInfo.detailAdr === undefined ? '' : houseInfo.detailAdr,
      contractDate: dayjs(houseInfo.contractDate).format('YYYY-MM-DD') === undefined ? '' : dayjs(houseInfo.contractDate).format('YYYY-MM-DD'),
      buyDate: dayjs(houseInfo.buyDate).format('YYYY-MM-DD') === undefined ? '' : dayjs(houseInfo.buyDate).format('YYYY-MM-DD'),
      buyPrice: houseInfo.acAmount === undefined ?  0 : houseInfo.acAmount,
      pubLandPrice: houseInfo.pubLandPrice === undefined ? 0 : houseInfo.pubLandPrice,
      isPubLandPriceOver100Mil : houseInfo.isPubLandPriceOver100Mil === undefined ? '' : houseInfo.isPubLandPriceOver100Mil,
      roadAddr: houseInfo.roadAddr === undefined ? '' : houseInfo.roadAddr,
      area: houseInfo.area === undefined ? 0 : houseInfo.area,
      isAreaOver85 : houseInfo.isAreaOver85 === undefined ? '' : houseInfo.isAreaOver85,
      isDestruction: houseInfo.isDestruction === undefined ? '' : houseInfo.isDestruction,
      ownerCnt: houseInfo.ownerCnt === undefined ? 0 : houseInfo.ownerCnt,
      userProportion: houseInfo.userProportion === undefined ? 0 : houseInfo.userProportion,
      isMoveInRight: houseInfo.isMoveInRight === undefined ? '' : houseInfo.isMoveInRight,
      hasSellPlan: houseInfo.hasSellPlan === undefined ? '' : houseInfo.hasSellPlan,
      isOwnHouseCntRegist: houseInfo.isOwnHouseCntRegist === undefined ? '' : houseInfo.isOwnHouseCntRegist,
      ownHouseCnt: houseInfo.ownHouseCnt  === undefined ? 0 : houseInfo.ownHouseCnt,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.accessToken}`,
    };
    
    try { 
      const response = await axios.post('http://13.125.194.154:8080/calculation/buyResult', params, { headers });
    //  console.log('taxCard params', params)
    //  console.log('response.data', response.data);
      if (response.data.errYn === 'Y') {
        SheetManager.show('info', {
          payload: {
            type: 'error',
            message: response.data.errMsg,
            description: response.data.errMsgDtl,
            closeSheet: true,
            navigation: props?.navigation,
          },
        });
      } else {
        setPData(response.data.data.list);
        dispatch(setHouseInfo({ ...houseInfo, ...response.data.data.list[0] }));
      }
    } catch (error) {
      SheetManager.show('info', {
        payload: {
          type: 'error',
          message: '취득세 계산 중 오류가 발생했습니다.',
          description: '취득세 계산 중 오류가 발생했습니다. 원하시면 주택 전문 세무사와 상담을 연결시켜드릴게요. 아래 상담하기 버튼을 눌러보세요.',
          id: 'calculation', 
          closeSheet: true,
          navigation: props?.navigation,
        }, 
      });
      //console.error(error.stack);
    }
  };
  return (
    Array.from({ length: Pdata.length }).map((_, index) => (

      <Card key={index}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
          <Tag
            style={{
              backgroundColor: HOUSE_TYPE.find(
                color => color.id === '7',
              ).color,
            }}>
            <TagText>
              {
                HOUSE_TYPE.find(color => color.id === '7')
                  .name + (index + 1)
              }
            </TagText>
          </Tag>
          <TagText2>
            지분율 : {Number(houseInfo?.userProportion)?.toLocaleString()}%
          </TagText2>
        </View>
        <InfoContentItem>
          <InfoContentLabel>취득세 합계</InfoContentLabel>
          <InfoContentText
            style={{
              color: '#2F87FF',
              fontFamily: 'Pretendard-Medium',
            }}>
            {Number(houseInfo?.totalTaxPrice)?.toLocaleString()} 원
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
          <InfoContentLabel>취득금액</InfoContentLabel>
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
            {houseInfo?.eduTaxRate}%
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
    )));
};

export default TaxCard;
