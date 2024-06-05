// 양도세 결과 중 양도세섹션

import React, { useState, useEffect } from 'react';
import {
  View
} from 'react-native';
import styled from 'styled-components';
import getFontSize from '../utils/getFontSize';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
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


const TaxCard2 = props => {
  const houseInfo = useSelector(state => state.houseInfo.value);
  const currentUser = useSelector(state => state.currentUser.value);
  const dispatch = useDispatch();
  const [Pdata, setPData] = useState({});

  useEffect(() => {
    getTaxCard2Info();
  }, []);

  const getTaxCard2Info = async () => {
    const data = {
      houseId : houseInfo.houseId  === undefined ? '' : houseInfo.houseId ,
      sellContractDate : houseInfo.contractDate === undefined ? '' : houseInfo.contractDate,
      sellDate : houseInfo.sellDate === undefined ? '' : houseInfo.sellDate,
      sellPrice : houseInfo.saleAmount === undefined ? '' : houseInfo.saleAmount,
      necExpensePrice : houseInfo.necessaryExpense === undefined ? '' : houseInfo.necessaryExpense,
      isWWLandLord :  houseInfo.isLandlord === undefined ? '' : houseInfo.isLandlord,
      stayPeriodYear : houseInfo.livePeriodYear === undefined ? '' : houseInfo.livePeriodYear,
      stayPeriodMonth : houseInfo.livePeriodMonth === undefined ? '' : houseInfo.livePeriodMonth,
      planAnswer : null,
      //houseInfo.planAnswer === undefined ? '' : houseInfo.planAnswer
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.accessToken}`
    };
    axios
      .post('http://13.125.194.154:8080/calculation/sellResult', data, { headers: headers })
      .then(response => {
       // console.log('양도소득세 계산 중:', response.data);
        // 성공적인 응답 처리
       // console.log('양도소득세 파라미터', data);
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
        //  console.log('양도소득세 결과', response.data);
        } else {
          const data = response.data.data;
        //  console.log('양도소득세 결과', data);
          setPData(data.list);
          dispatch(setHouseInfo({ ...houseInfo, ...data.list[0] }));
        }


      })
      .catch(error => {
        // 오류 처리
        SheetManager.show('info', {
          payload: {
            type: 'error',
            message: '양도소득세 계산 중 오류가 발생했습니다.',
            description: '양도소득세 계산 중 오류가 발생했습니다. 원하시면 주택\n전문 세무사와 상담을 연결시켜드릴게요. 아래 상담하\n기 버튼을 눌러보세요.',
            id: 'calculation',
            closeSheet: true,
            navigation: props?.navigation,
          },
        });
        console.error(error);
      });
  };
  return (
    //    {dataList, whrjs, pData, currentUser} = houseInfo, dataList?.map((data, index) => {
    //     for(let i = 0; i < 2; i++) { key={index} data={data}
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
            지분율 : {Number(Pdata.length === 1 ? 100 : 50)}%
          </TagText2>
        </View>
        <InfoContentItem>
          <InfoContentLabel>총 납부세액</InfoContentLabel>
          <InfoContentText
            style={{
              color: '#2F87FF',
              fontFamily: 'Pretendard-Medium',
            }}>
            {Number(houseInfo?.totalTaxPrice).toLocaleString()} 원
          </InfoContentText>
        </InfoContentItem>
        <InfoContentItem>
          <InfoContentLabel>양도소득세</InfoContentLabel>
          <InfoContentText
            style={{
              fontFamily: 'Pretendard-Medium',
            }}>
            {Number(houseInfo?.sellTaxPrice).toLocaleString()} 원
          </InfoContentText>
        </InfoContentItem>
        <InfoContentItem>
          <InfoContentLabel>지방소득세</InfoContentLabel>
          <InfoContentText
            style={{
              fontFamily: 'Pretendard-Medium',
            }}>
            {Number(houseInfo?.localTaxPrice).toLocaleString()} 원
          </InfoContentText>
        </InfoContentItem>
        <SubContainer>
          <InfoContentLabel>양도금액</InfoContentLabel>
          <InfoContentText
            style={{
              color: '#A3A5A8',
            }}>
            {Number(houseInfo?.sellPrice).toLocaleString()} 원
          </InfoContentText>
        </SubContainer>
        <SubContainer>
          <InfoContentLabel>취득금액</InfoContentLabel>
          <InfoContentText
            style={{
              color: '#A3A5A8',
            }}>
            {Number(houseInfo?.buyPrice).toLocaleString()} 원
          </InfoContentText>
        </SubContainer>
        <SubContainer>
          <InfoContentLabel>필요경비</InfoContentLabel>
          <InfoContentText
            style={{
              color: '#A3A5A8',
            }}>
            {Number(houseInfo?.necExpensePrice).toLocaleString()} 원
          </InfoContentText>
        </SubContainer>
        <Divider />
        <SubContainer>
          <InfoContentLabel>양도차익</InfoContentLabel>
          <InfoContentText
            style={{
              color: '#A3A5A8',
            }}>
            {Number(houseInfo?.sellProfitPrice).toLocaleString()} 원
          </InfoContentText>
        </SubContainer>
        <SubContainer>
          <InfoContentLabel>비과세 양도차익</InfoContentLabel>
          <InfoContentText
            style={{
              color: '#A3A5A8',
            }}>
            {Number(houseInfo?.nonTaxablePrice).toLocaleString()} 원
          </InfoContentText>
        </SubContainer>
        <SubContainer>
          <InfoContentLabel>과세 대상 양도차익</InfoContentLabel>
          <InfoContentText
            style={{
              color: '#A3A5A8',
            }}>
            {Number(houseInfo?.taxablePrice).toLocaleString()} 원
          </InfoContentText>
        </SubContainer>
        <Divider />
        <SubContainer>
          <InfoContentLabel>장기보유특별공제</InfoContentLabel>
          <InfoContentText
            style={{
              color: '#A3A5A8',
            }}>
            {Number(houseInfo?.longDeductionPrice).toLocaleString()} 원
          </InfoContentText>
        </SubContainer>
        <SubContainer>
          <InfoContentLabel>양도소득금액</InfoContentLabel>
          <InfoContentText
            style={{
              color: '#A3A5A8',
            }}>
            {Number(houseInfo?.sellIncomePrice).toLocaleString()} 원
          </InfoContentText>
        </SubContainer>
        <Divider />
        <SubContainer>
          <InfoContentLabel>기본공제</InfoContentLabel>
          <InfoContentText
            style={{
              color: '#A3A5A8',
            }}>
            {Number(houseInfo?.basicDeductionPrice).toLocaleString()} 원
          </InfoContentText>
        </SubContainer>
        <SubContainer>
          <InfoContentLabel>과세표준</InfoContentLabel>
          <InfoContentText
            style={{
              color: '#A3A5A8',
            }}>
            {Number(houseInfo?.taxableStdPrice).toLocaleString()} 원
          </InfoContentText>
        </SubContainer>
        <SubContainer>
          <InfoContentLabel>세율</InfoContentLabel>
          <InfoContentText
            style={{
              color: '#A3A5A8',
            }}>
            {houseInfo?.sellTaxRate+'%'}
          </InfoContentText>
        </SubContainer>
        <SubContainer>
          <InfoContentLabel>누진공제</InfoContentLabel>
          <InfoContentText style={{ color: '#A3A5A8' }}>
            {Number(houseInfo?.progDeductionPrice).toLocaleString()} 원
          </InfoContentText>
        </SubContainer>

        <Divider />
      </Card>

    )));
};


export default TaxCard2;
