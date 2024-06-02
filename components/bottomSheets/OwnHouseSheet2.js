// 양도세 보유주택 목록 시트

import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import styled from 'styled-components';
import getFontSize from '../../utils/getFontSize';
import CloseIcon from '../../assets/icons/close_button.svg';
import DropShadow from 'react-native-drop-shadow';
import AddCircleIcon from '../../assets/icons/add_circle.svg';
import AddHouseCircleIcon from '../../assets/icons/add_house_circle.svg';
import CheckIcon from '../../assets/icons/check.svg';
import { useDispatch, useSelector } from 'react-redux';
import { HOUSE_TYPE } from '../../constants/colors';
import { setChatDataList } from '../../redux/chatDataListSlice';
import { setHouseInfo } from '../../redux/houseInfoSlice';
import { setModalList, removeLastModalList } from '../../redux/modalListSlice';
import axios from 'axios';

const SheetContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  flex: 1;
  background-color: #fff;
  width: ${props => props.width}px;
  height: auto;
`;

const TitleSection = styled.View`
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 10px 20px;
  
`;

const SubTitle = styled.Text`
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Medium;
  color: #97989a;
  line-height: 25px;
  margin-bottom: 10px;
  
`;

const ModalHeader = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Button = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  width: ${props => props.width - 40}px;
  height: 50px;
  border-radius: 25px;
  background-color: ${props => (props.active ? '#2F87FF' : '#E8EAED')};
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${props => (props.active ? '#2F87FF' : '#E8EAED')};
  align-self: center;
  margin-top: 15px;
`;

const ButtonText = styled.Text`
  font-size: ${getFontSize(16)}px;
  font-family: Pretendard-Bold;
  color: ${props => (props.active ? '#fff' : '#717274')};
  line-height: 20px;
`;

const Title = styled.Text`
  font-size: ${getFontSize(20)}px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 32px;
  margin-bottom: 7px;
  margin-top: 4px;
`;

const InfoMessage = styled.Text`
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Regular;
  color: #a3a5a8;
  line-height: 20px;
  margin-top: 10px;
`;

const HouseSection = styled.View`
  width: 100%;
  height: auto;
  background-color: #f7f8fa;
`;

const Card = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  width: 180px;
  height: 180px;
  border-radius: 10px;
  background-color: #fff;
  justify-content: space-between;
  margin-right: 22px;
  border-width: 1px;
  border-color: ${props => (props.active ? '#2F87FF' : '#fff')};
  padding: 15px;
`;

const Tag = styled.View`
  flex-direction: row;
  margin-right: auto;
  width: auto;
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

const CardTitle = styled.Text`
  width: 100%;
  font-size: 15px;
  color: #1b1c1f;
  font-family: Pretendard-Bold;
  line-height: 20px;
  flex: 1;
`;

const CardSubTitle = styled.Text`
  font-size: 13px;
  color: #717274;
  font-family: Pretendard-Regular;
  line-height: 20px;
`;

const CardButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  width: 100%;
  height: 35px;
  border-radius: 17.5px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  border: 1px solid #e8eaed;
  margin-top: 10px;
`;

const CardButtonText = styled.Text`
  font-size: 13px;
  font-family: Pretendard-Medium;
  color: #717274;
  line-height: 20px;
  text-align: center;
`;

const AddButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  flex-direction: row;
  width: 285px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  border: 1px solid #e8eaed;
  align-self: center;
  margin: 0 5px 20px 5px;
`;

const AddButtonText = styled.Text`
  font-size: 13px;
  font-family: Pretendard-Bold;
  color: #717274;
  line-height: 20px;
  text-align: center;
  margin-left: 4px;
`;

const CheckCircleButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
  hitSlop: { top: 20, bottom: 20, left: 20, right: 20 },
}))`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid #e8eaed;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
`;



const EmptyCard = styled.View`
  width: 335px;
  height: 180px;
  border-radius: 10px;
  background-color: #fff;
  border-color: #fff;
  padding: 15px;
  margin: 40px 20px;
  align-items: center;
  justify-content: center;
`;

const EmptyTitle = styled.Text`
  font-size: 13px;
  color: #717274;
  font-family: Pretendard-SemiBold;
  line-height: 20px;
  margin: 3px;
`;

const OwnHouseSheet2 = props => {
  const actionSheetRef = useRef(null);
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedList, setSelectedList] = useState([]);
  const ownHouseList = useSelector(state => state.ownHouseList.value);
  const chatDataList = useSelector(state => state.chatDataList.value);
  const houseInfo = useSelector(state => state.houseInfo.value);
  const currentUser = useSelector(state => state.currentUser.value);
  const modalList = useSelector(state => state.modalList.value);

  const getHouseDetailInfo = async (item) => {
    try {
      const url = `http://13.125.194.154:8080/house/detail?houseId=${item?.houseId}`;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.accessToken}`
      };

      //console.log('[HouseDetail] Fetching house details for item:', item);
      const response = await axios.get(url, { headers });
      const detaildata = response.data.data;
      if (response.data.errYn == 'Y') {
        let Modalindex = Object.keys(modalList).length; // modalList의 현재 길이를 가져옵니다.
        dispatch(setModalList({ ...modalList, [Modalindex]: {modal : 'info'} }));
        SheetManager.show('info', {
          payload: {
            type: 'error',
            message: response.data.errMsg,
            description: response.data.errMsgDtl,
          },
        });
        return {
          returndata: false
        };
      } else {
        //console.log('[HouseDetail] House details retrieved:', detaildata);
        //console.log('[HouseDetail] detaildata?.houseType:', detaildata?.houseType);
        //console.log('[HouseDetail] House details houseInfo:', houseInfo);
        return {
          detaildata: detaildata,
          returndata: true
        }
      }
    } catch (error) {
      //console.log(error);
      return {
        returndata: false
      };
    }
  };

  const CARD_WIDTH = 180 + 22;
  /* ownHouseList?.map((item, index) => (
      console.log('ownHouse:', item)
    ));*/
  return (
    <ActionSheet
      ref={actionSheetRef}
      headerAlwaysVisible
      CustomHeaderComponent={
        <ModalHeader>
          <Pressable
            hitSlop={20}
            onPress={() => {
              const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
              dispatch(setChatDataList(newChatDataList));
              dispatch(removeLastModalList());
              actionSheetRef.current?.hide();
            }}>
            <CloseIcon width={16} height={16} />
          </Pressable>
        </ModalHeader>
      }
      overlayColor="#111"
      defaultOverlayOpacity={0.7}
      gestureEnabled={false}
      closeOnPressBack={false}
      closeOnTouchBackdrop={false}
      statusBarTranslucent
      containerStyle={{
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 720,
        width: width,
      }}>
      <SheetContainer width={width}>
        <TitleSection>
          <Title>
            보유하신 주택을 모두 불러왔어요.{'\n'}매도할 주택을 선택해주세요.
          </Title>

          <InfoMessage>
            기존에 주거용 오피스텔을 보유하고 계시다면{'\n'}“직접 등록하기”를 통해
            반드시 등록해주세요.
          </InfoMessage>
        </TitleSection>
        {ownHouseList?.length > 0 ?
          <HouseSection>
            <ScrollView
              onScroll={e => {

                const contentOffset = e.nativeEvent.contentOffset;
                const pageNum = Math.floor((contentOffset.x / CARD_WIDTH) * 2);
                setCurrentIndex(pageNum);
              }}
              horizontal
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 30,
                paddingHorizontal: 20,
                marginTop: 20,
              }}>
              {
                ownHouseList?.map((item, index) => (
                  <DropShadow
                    key={'ownHouse' + index}
                    style={{
                      shadowColor: 'rgba(0,0,0,0.1)',
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.15,
                      shadowRadius: 10,
                    }}>
                    <Card
                      active={selectedList.indexOf(item) > -1}
                      onPress={() => {
                        if (selectedList.indexOf(item) > -1) {
                          setSelectedList(
                            selectedList.filter(selectedItem => selectedItem !== item),
                          );
                        } else {
                          setSelectedList([item]);
                        }
                      }}>
                      <CheckCircleButton
                        active={selectedList.indexOf(item) > -1}
                        onPress={() => {
                          if (selectedList.indexOf(item) > -1) {
                            setSelectedList(
                              selectedList.filter(selectedItem => selectedItem !== item),
                            );
                          } else {
                            setSelectedList([item]);
                          }
                        }}>
                        {selectedList.indexOf(item) > -1 && <CheckIcon />}
                      </CheckCircleButton>
                      <Tag
                        style={{
                          backgroundColor: HOUSE_TYPE.find(
                            color => color.id === item.houseType,
                          ).color,
                        }}>
                        <TagText>
                          {
                            HOUSE_TYPE.find(color => color.id === item.houseType)
                              .name
                          }
                        </TagText>
                      </Tag>
                      <CardTitle>{item.houseName}</CardTitle>
                      <CardSubTitle>{item.detailAdr}</CardSubTitle>
                      <CardButton
                        onPress={() => {
                          actionSheetRef.current?.hide();
                          dispatch(removeLastModalList());
                          props.payload.navigation.push(
                            'OwnedHouseDetail',
                            { item: item, prevSheet: 'own2', index: props.payload.index, },
                            'OwnedHouseDetail',
                          );
                        }}>
                        <CardButtonText>자세히 보기</CardButtonText>
                      </CardButton>
                    </Card>
                  </DropShadow>
                ))}
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: 20,
                zIndex: 2,
              }}>
              {ownHouseList?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setCurrentIndex(index - 1);
                  }}
                  activeOpacity={0.6}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor:
                      currentIndex === index ? '#E8EAED' : 'transparent',
                    borderWidth: 1,
                    borderColor: '#E8EAED',
                    marginRight: 10,
                  }}
                />
              ))}
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <AddButton
                onPress={() => {
                  actionSheetRef.current?.hide();
                  dispatch(removeLastModalList());
                  props.payload.navigation.push('DirectRegister', {
                    prevChat: 'GainsTaxChat',
                    prevSheet: 'own2',
                    index: props.payload?.index,
                  });
                }}>
                <AddCircleIcon />
                <AddButtonText>직접 등록하기</AddButtonText>
              </AddButton>
            </View>
            <SubTitle
              style={{
                color: '#2F87FF',
                paddingHorizontal: 20,
                paddingBottom: 20,
              }}>
              이미 오피스텔을 소유하고 계실 경우, 반드시 직접 등록해주세요.{'\n'}
              불러오지 못한 주택이 있을 경우, 정확한 세금계산이 어려워요.
            </SubTitle>
          </HouseSection>
          :
          <HouseSection>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <DropShadow
                key={'emptyOwnHouse'}
                style={{
                  shadowColor: 'rgba(0,0,0,0.1)',
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 10,
                }}>
                <EmptyCard>
                  <AddHouseCircleIcon
                    onPress={() => {
                      actionSheetRef.current?.hide();
                      dispatch(removeLastModalList());
                      props.payload.navigation.push('DirectRegister', {
                        prevChat: 'GainsTaxChat',
                        prevSheet: 'own2',
                        index: props.payload?.index,
                      });
                    }} style={{ margin: 20 }}></AddHouseCircleIcon>
                  <EmptyTitle>
                    {'보유하신 주택이 없거나 불러오지 못했어요.'}
                  </EmptyTitle>
                  <EmptyTitle>
                    {'양도 대상 주택을 포함하여 보유 주택 모두 등록해주세요.'}
                  </EmptyTitle>
                </EmptyCard>
              </DropShadow>
            </View>


            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <AddButton
                onPress={() => {
                  actionSheetRef.current?.hide();
                  dispatch(removeLastModalList());
                  props.payload.navigation.push('DirectRegister', {
                    prevChat: 'GainsTaxChat',
                    prevSheet: 'own2',
                    index: props.payload?.index,
                  });
                }}>
                <AddCircleIcon />
                <AddButtonText>직접 등록하기</AddButtonText>
              </AddButton>
            </View>
            <SubTitle
              style={{
                color: '#2F87FF',
                paddingHorizontal: 20,
                paddingBottom: 20,
              }}>
              이미 오피스텔을 소유하고 계실 경우, 반드시 직접 등록해주세요.{'\n'}
              불러오지 못한 주택이 있을 경우, 정확한 세금계산이 어려워요.
            </SubTitle>
          </HouseSection>
        }


        <DropShadow
          style={{
            shadowColor: 'rgba(0,0,0,0.1)',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.15,
            shadowRadius: 10,
          }}>
          <Button
            disabled={selectedList.length === 0}
            width={width}
            active={selectedList.length > 0}
            onPress={async () => {
              /* console.log('[OwnHouseSheet2] selectedList:',
                 ownHouseList?.find(
                   item => item.houseId === selectedList[0].houseId,
                 ),
               );*/
              if (ownHouseList?.some(item => item.isRequiredDataMissing === true)) {
                let Modalindex = Object.keys(modalList).length; // modalList의 현재 길이를 가져옵니다.
                dispatch(setModalList({ ...modalList, [Modalindex]: {modal : 'info'} }));
                SheetManager.show('info', {
                  payload: {
                    type: 'info',
                    message: '자세히 보기를 눌러 보유하신\n모든 주택의 필수정보를 채워주세요.',
                  },
                });
                return;
              } else {
                const response = await getHouseDetailInfo(ownHouseList?.find(
                  item => item.houseId === selectedList[0].houseId,
                ))
                actionSheetRef.current?.hide();

                if (response?.returndata) {
                  const chatItem = {
                    id: 'ownConfirmOK',
                    type: 'my',
                    message: '확인 완료',
                  };
                  // console.log('houseInfo last:', houseInfo);
                  dispatch(removeLastModalList());
                  dispatch(
                    setChatDataList([
                      ...chatDataList.slice(0, chatDataList.length - 1),
                      chatItem,
                    ]),
                  );
                  dispatch(
                    setHouseInfo({ ...houseInfo, ownHouseCnt: ownHouseList?.length, isOwnHouseCntRegist: true, ...response?.detaildata }),
                  );
                  setTimeout(() => {
                    let Modalindex = Object.keys(modalList).length - 1; // modalList의 현재 길이를 가져옵니다.
                    console.log('Modalindex:', Modalindex);
                    console.log('modalList:', modalList);
                    dispatch(setModalList({ ...modalList, [Modalindex]: {modal : 'gain', index: props.payload?.index} }));
                    SheetManager.show('gain', {
                      payload: {
                        navigation: props?.payload?.navigation,
                        index: props?.payload?.index,
                      },
                    });

                  }, 200);
                } else {
                  const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
                  dispatch(setChatDataList(newChatDataList));
                  dispatch(removeLastModalList());
                }

              }

            }}>
            <ButtonText active={selectedList.length > 0}>선택하기</ButtonText>
          </Button>
        </DropShadow>
      </SheetContainer>
    </ActionSheet >
  );
};

export default OwnHouseSheet2;
