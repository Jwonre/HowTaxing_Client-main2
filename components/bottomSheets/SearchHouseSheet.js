// 챗 스크린에서 주택 검색 시트

import {
  View,
  useWindowDimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import ActionSheet, {
  SheetManager,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import styled from 'styled-components';
import getFontSize from '../../utils/getFontSize';
import CloseIcon from '../../assets/icons/close_button.svg';
import SerchIcon from '../../assets/icons/search_map.svg';
import SelectDropdown from 'react-native-select-dropdown';
import DropShadow from 'react-native-drop-shadow';
import ChevronDownIcon from '../../assets/icons/chevron_down.svg';
import WheelPicker from 'react-native-wheely';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setChatDataList} from '../../redux/chatDataListSlice';
import {setHouseInfo} from '../../redux/houseInfoSlice';
import {AREA_LIST} from '../../data/areaData';

const SheetContainer = styled.View`
  flex: 1;
  background-color: #fff;
  width: ${props => props.width - 40}px;
  height: auto;
`;

const ModalTitle = styled.Text`
  font-size: ${getFontSize(17)}px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 26px;
  text-align: center;
`;

const ModalAddressInputContainer = styled.View`
  width: 100%;
  height: 57px;
  background-color: #f5f7fa;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #e8eaed;
`;

const ModalAddressInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: '#A3A5A8',
  placeholder: '주택명 혹은 지역명을 입력해주세요',
}))`
  flex: 1;
  font-size: ${getFontSize(13)}px;
  font-family: Pretendard-Regular;
  color: #1b1c1f;
  line-height: 20px;
`;

const DetailAddressInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: '#A3A5A8',
  placeholder: '나머지 상세주소를 입력해주세요',
}))`
  flex: 1;
  font-size: ${getFontSize(13)}px;
  font-family: Pretendard-Regular;
  color: #1b1c1f;
  line-height: 20px;
`;

const ModalInputButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.6,
  hitSlop: {top: 20, bottom: 20, left: 20, right: 20},
}))`
  align-items: center;
  justify-content: center;
`;

const ModalInputSection = styled.View`
  width: 100%;
  height: auto;
  margin-top: 0px;
  background-color: #fff;
`;

const ModalHeader = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const MapSearchResultHeader = styled.View`
  width: 100%;
  height: 74px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e8eaed;
  background-color: #fff;
`;

const SelectButtonContainer = styled.View`
  width: 47%;
  height: 36px;
`;

const SelectButtonText = styled.Text`
  font-size: ${getFontSize(13)}px;
  font-family: Pretendard-SemiBold;
  color: #a3a5a8;
  letter-spacing: -0.3px;
  line-height: 16px;
  margin-right: 15px;
  text-align: center;
`;

const SelectItem = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.6,
}))`
  width: 100%;
  height: 50px;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const SelectItemText = styled.Text`
  font-size: ${getFontSize(13)}px;
  font-family: Pretendard-Regular;
  color: #1b1c1f;
  line-height: 20px;
`;

const MapSearchResultItem = styled.View`
  width: 100%;
  height: auto;
  min-height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #e8eaed;
`;

const MapSearchResultItemTitle = styled.Text`
  font-size: ${getFontSize(13)}px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 20px;
`;

const MapSearchResultItemAddress = styled.Text`
  width: 90%;
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Regular;
  color: #a3a5a8;
  line-height: 16px;
  margin-left: 4px;
`;

const AddressNumberBadge = styled.View`
  width: 37px;
  height: 22px;
  border-radius: 11px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #e8eaed;
`;

const AddressNumberText = styled.Text`
  font-size: ${getFontSize(10)}px;
  font-family: Pretendard-Medium;
  color: #a3a5a8;
  line-height: 16px;
`;

const MepSearchResultButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.9,
}))`
  width: 65px;
  height: 36px;
  border-radius: 18px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #2f87ff;
`;

const MapSearchResultButtonText = styled.Text`
  font-size: ${getFontSize(13)}px;
  font-family: Pretendard-Medium;
  color: #2f87ff;
  line-height: 16px;
`;

const ApartmentInfoGroup = styled.View`
  width: 100%;
  height: auto;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const ApartmentInfoTitle = styled.Text`
  width: 60%;
  font-size: ${getFontSize(16)}px;
  font-family: Pretendard-Medium;
  color: #1b1c1f;
  line-height: 30px;
  text-align: center;
  margin-bottom: auto;
`;

const ButtonSection = styled.View`
  width: ${props => props.width - 40}px;
  height: auto;
  background-color: #fff;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  margin-top: 10px;
`;

const SelectGroup = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 10px 20px;
`;

const SelectLabel = styled.Text`
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Medium;
  color: #1b1c1f;
  line-height: 20px;
`;

const PickerContainer = styled.View`
  width: 100%;
  height: 187px;
  background-color: #f5f7fa;
  border-radius: 10px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  height: 50px;
  border-radius: 25px;
  background-color: #2f87ff;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #2f87ff;
`;

const ButtonText = styled.Text`
  font-size: ${getFontSize(16)}px;
  font-family: Pretendard-Bold;
  color: #fff;
  line-height: 20px;
`;

const ListFooterButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.6,
}))`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

const ListFooterButtonText = styled.Text`
  font-size: ${getFontSize(13)}px;
  font-family: Pretendard-Bold;
  color: #a3a5a8;
  line-height: 20px;
`;

const SearchHouseSheet = props => {
  const actionSheetRef = useRef(null);
  const scrollViewRef = useRef(null);
  const selectRef2 = useRef(null);
  const selectRef = useRef(null);
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();
  const scrollHandlers = useScrollHandlers('FlatList-1', actionSheetRef);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [listData, setListData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [selectedAreaIndex, setSelectedAreaIndex] = useState(0);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedArea2, setSelectedArea2] = useState('');
  const [dongList, setDongList] = useState([]);
  const [hoList, setHoList] = useState([]);
  const [selectedDong, setSelectedDong] = useState('');
  const [selectedHo, setSelectedHo] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [apartmentInfoGroupHeight, setApartmentInfoGroupHeight] = useState(0);
  const chatDataList = useSelector(state => state.chatDataList.value);
  const houseInfo = useSelector(state => state.houseInfo.value);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // 주소 검색
  const getAddress = async () => {
    const API_KEY = 'U01TX0FVVEgyMDIzMTIxNDE2MDk0NTExNDM1NzY=';
    const COUNT_PER_PAGE = 5;
    const CURRENT_PAGE = 0;
    const keyword = searchText.trim();

    const url = `https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do?confmKey=${API_KEY}&currentPage=${CURRENT_PAGE}&countPerPage=${COUNT_PER_PAGE}&keyword=${encodeURI(
      selectedArea + ' ' + selectedArea2 + ' ' + keyword,
    )}&resultType=json`;

    await axios
      .get(url)
      .then(function (result) {
        const extractedData = result.data.match(/\(.*\)/s)[0];

        const parsedData = JSON.parse(
          extractedData.substring(1, extractedData.length - 1),
        );
        if (parsedData.results.common.errorCode !== '0') {
          SheetManager.show('info', {
            payload: {
              type: 'error',
              message: parsedData.results.common.errorMessage,
              description: parsedData.results.common.errorMessage,
            },
          });
          return;
        }

        const list = parsedData.results.juso;

        if (list.length === 0) {
          SheetManager.show('info', {
            payload: {
              type: 'error',
              message: '검색 결과가 없습니다.',
              description: '검색 결과가 없습니다.',
            },
          });
        } else {
          list.length < 5 && setIsLastPage(true);
        }

        setListData([...list]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 주소 검색
  const getMoreAddress = async () => {
    const API_KEY = 'U01TX0FVVEgyMDIzMTIxNDE2MDk0NTExNDM1NzY=';
    const COUNT_PER_PAGE = 5;
    const CURRENT_PAGE = listData.length / COUNT_PER_PAGE + 1;
    const keyword = searchText;

    const url = `https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do?confmKey=${API_KEY}&currentPage=${CURRENT_PAGE}&countPerPage=${COUNT_PER_PAGE}&keyword=${encodeURI(
      selectedArea + ' ' + selectedArea2 + ' ' + keyword,
    )}&resultType=json`;

    // 데이터의 마지막 페이지인지 확인
    if (listData.length % COUNT_PER_PAGE !== 0) {
      setIsLastPage(true);
      return;
    }

    await axios
      .get(url)
      .then(function (result) {
        const extractedData = result.data.match(/\(.*\)/s)[0];

        const parsedData = JSON.parse(
          extractedData.substring(1, extractedData.length - 1),
        );
        if (parsedData.results.common.errorCode !== '0') {
          SheetManager.show('info', {
            payload: {
              type: 'error',
              message: parsedData.results.common.errorMessage,
              description: parsedData.results.common.errorMessage,
            },
          });
          return;
        }

        const list = parsedData.results.juso;

        if (list.length === 0) {
          SheetManager.show('info', {
            payload: {
              type: 'error',
              message: '검색 결과가 없습니다.',
              description: '검색 결과가 없습니다.',
            },
          });
        } else if (list.length < 5) {
          setIsLastPage(true);
        }

        setListData([...listData, ...list]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 주택 정보 가져오기
  const getHouseDetailInfo = async () => {
    // 취득할 주택 정보 가져오기
    const url = 'http://13.125.194.154:8080/house/detail';

    await axios
      .get(url, {
        params: {
          houseId: '25',
        },
      })
      .then(function (result) {
        if (result.isError) {
          Alert.alert('검색 결과가 없습니다.');
          return;
        }

        const {data} = result.data;

        console.log('@@', data);

        dispatch(
          setHouseInfo({
            ...houseInfo,
            ...data,
          }),
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 주택 호 정보 가져오기
  const getHoData = async (address, dongNm) => {
    const API_KEY = 'devU01TX0FVVEgyMDI0MDEwOTIzMDQ0MjExNDQxOTY=';

    const url = 'https://business.juso.go.kr/addrlink/addrDetailApi.do';

    await axios
      .get(url, {
        params: {
          confmKey: API_KEY,
          admCd: address.admCd,
          rnMgtSn: address.rnMgtSn,
          udrtYn: address.udrtYn,
          buldMnnm: address.buldMnnm,
          buldSlno: address.buldSlno,
          searchType: 'floorho',
          dongNm: dongNm,
          resultType: 'json',
        },
      })
      .then(function (result) {
        const ilst = result.data.results.juso.map(ho => {
          return ho.hoNm.replace('호', '');
        });
        setHoList(ilst);
        setSelectedHo(ilst[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 다음으로 버튼 핸들러
  const nextHandler = async () => {
    getHouseDetailInfo();
    actionSheetRef.current?.hide();

    const chat1 = {
      id: 'apartmentAddress',
      type: 'system',
      message: '을 선택해주세요.',
      progress: 1,
    };
    const chat2 = {
      id: 'apartmentAddress',
      type: 'my',
      message:
        props.payload?.data !== 'villa'
          ? address + ' ' + detailAddress
          : selectedItem?.bdNm + ' ' + detailAddress,
    };

    const chat3 = {
      id: 'apartmentAddressInfoSystem',
      type: 'system',
      message: '취득하실 주택 정보를 불러왔어요.',
      questionId: 'apartment',
      progress: 2,
    };

    const chat4 = {
      id: 'apartmentAddressSystem',
      type: 'system',
      message: '취득하실 주택 동과 호를 선택해주세요.',
      questionId: 'apartment',
      progress: 3,
    };
    const chat5 = {
      id: 'apartmentAddressMy',
      type: 'my',
      message:
        (selectedDong ? selectedDong : dongList[0]) +
        '동 ' +
        (selectedHo ? selectedHo : hoList[0]) +
        '호',
      questionId: 'apartment',
    };

    const chatList =
      props.payload?.data === 'villa' && detailAddress
        ? [chat1, chat2, chat3]
        : dongList.length === 0 && props.payload?.data === 'villa'
        ? [chat1, chat2, chat4, chat5, chat3]
        : [chat1, chat2, chat3];
    dispatch(setChatDataList([...chatDataList, ...chatList]));
  };

  useEffect(() => {
    setListData([]);
    setIsLastPage(false);
  }, [searchText]);

  return (
    <ActionSheet
      ref={actionSheetRef}
      headerAlwaysVisible
      CustomHeaderComponent={
        <ModalHeader>
          <Pressable
            hitSlop={20}
            onPress={() => {
              actionSheetRef.current?.hide();
            }}>
            <CloseIcon width={16} height={16} />
          </Pressable>
        </ModalHeader>
      }
      overlayColor="#111"
      defaultOverlayOpacity={0.7}
      gestureEnabled={false}
      statusBarTranslucent
      containerStyle={{
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height:
          currentPageIndex === 0
            ? 850
            : currentPageIndex === 1
            ? 550 + apartmentInfoGroupHeight
            : currentPageIndex === 2
            ? keyboardVisible
              ? 360 + apartmentInfoGroupHeight
              : 300 + apartmentInfoGroupHeight
            : 550,
        width: width - 40,
      }}>
      {currentPageIndex === 0 && (
        <SheetContainer width={width}>
          <FlatList
            data={listData}
            ref={scrollViewRef}
            style={{
              zIndex: 1,
            }}
            id="FlatList-1"
            {...scrollHandlers}
            scrollEnabled
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 10,
            }}
            ListHeaderComponent={
              <View
                style={{
                  zIndex: 10,
                }}>
                <ModalInputSection>
                  <ModalTitle>취득하실 주택을 검색해주세요.</ModalTitle>
                  <ModalAddressInputContainer>
                    <ModalAddressInput
                      placeholder="동(읍/면/리)명 또는 도로명주소를 입력해주세요"
                      value={searchText}
                      onChangeText={setSearchText}
                      onSubmitEditing={() => {
                        getAddress();
                      }}
                    />
                    <ModalInputButton
                      onPress={() => {
                        getAddress();
                      }}>
                      <SerchIcon />
                    </ModalInputButton>
                  </ModalAddressInputContainer>
                </ModalInputSection>

                <MapSearchResultHeader>
                  <SelectButtonContainer>
                    <SelectDropdown
                      ref={selectRef}
                      data={AREA_LIST}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <SelectButtonText>
                              {selectedArea ? selectedArea : '시/도'}
                            </SelectButtonText>
                            <ChevronDownIcon />
                          </View>
                        );
                      }}
                      defaultButtonText="시/도"
                      dropdownStyle={styles.dropdownStyle}
                      buttonStyle={styles.buttonStyle}
                      buttonTextStyle={styles.buttonTextStyle}
                      rowStyle={styles.rowStyle}
                      rowTextStyle={styles.rowTextStyle}
                      renderCustomizedRowChild={(item, index) => {
                        return (
                          <SelectItem
                            onPress={() => {
                              setSelectedArea(item.name);
                              setSelectedAreaIndex(index);
                              selectRef.current?.closeDropdown();
                            }}>
                            <SelectItemText>{item.name}</SelectItemText>
                          </SelectItem>
                        );
                      }}
                    />
                  </SelectButtonContainer>
                  <SelectButtonContainer>
                    <SelectDropdown
                      ref={selectRef2}
                      data={
                        selectedArea ? AREA_LIST[selectedAreaIndex].list : []
                      }
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <SelectButtonText>
                              {selectedArea2 ? selectedArea2 : '시/군/구'}
                            </SelectButtonText>
                            <ChevronDownIcon />
                          </View>
                        );
                      }}
                      defaultButtonText="시/군/구"
                      dropdownStyle={styles.dropdownStyle}
                      buttonStyle={styles.buttonStyle}
                      buttonTextStyle={styles.buttonTextStyle}
                      rowStyle={styles.rowStyle}
                      rowTextStyle={styles.rowTextStyle}
                      renderCustomizedRowChild={(item, index) => {
                        return (
                          <SelectItem
                            onPress={() => {
                              console.log(item);
                              setSelectedArea2(item);
                              selectRef2.current?.closeDropdown();
                            }}>
                            <SelectItemText>{item}</SelectItemText>
                          </SelectItem>
                        );
                      }}
                    />
                  </SelectButtonContainer>
                </MapSearchResultHeader>
              </View>
            }
            ListFooterComponent={
              listData.length > 0 &&
              !isLastPage && (
                <ListFooterButton
                  onPress={() => {
                    getMoreAddress();
                  }}>
                  <ListFooterButtonText>더 보기</ListFooterButtonText>
                </ListFooterButton>
              )
            }
            renderItem={({item, index}) => (
              <MapSearchResultItem>
                <View
                  style={{
                    width: '72%',
                  }}>
                  <MapSearchResultItemTitle>
                    {item?.roadAddr}
                  </MapSearchResultItemTitle>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 6,
                    }}>
                    <AddressNumberBadge>
                      <AddressNumberText>지번</AddressNumberText>
                    </AddressNumberBadge>
                    <MapSearchResultItemAddress>
                      {item?.jibunAddr}
                    </MapSearchResultItemAddress>
                  </View>
                </View>
                <MepSearchResultButton
                  onPress={() => {
                    setAddress(item?.roadAddr);
                    if (item?.detBdNmList !== '') {
                      const list = item?.detBdNmList?.split(', ').map(dong => {
                        return dong.replace('동', '');
                      });
                      setDongList(list);
                      getHoData(item, list[0] + '동');
                    } else {
                      getHoData(item);
                    }
                    setSelectedItem(item);
                    if (props.payload?.data === 'villa') {
                      setCurrentPageIndex(1);
                    } else {
                      setCurrentPageIndex(2);
                    }
                  }}>
                  <MapSearchResultButtonText>선택</MapSearchResultButtonText>
                </MepSearchResultButton>
              </MapSearchResultItem>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </SheetContainer>
      )}
      {currentPageIndex === 1 && (
        <SheetContainer>
          <ModalTitle
            style={{
              marginBottom: 20,
            }}>
            취득하실 주택 동과 호를 선택해주세요.
          </ModalTitle>
          <ApartmentInfoGroup>
            <ApartmentInfoTitle>
              {selectedItem?.bdNm} {selectedDong ? selectedDong : dongList[0]}동{' '}
              {selectedHo ? selectedHo : hoList[0]}호
            </ApartmentInfoTitle>
          </ApartmentInfoGroup>
          <SelectGroup>
            <View style={{width: '48%'}}>
              <SelectLabel>동 선택</SelectLabel>
              <PickerContainer>
                {dongList[0] && (
                  <WheelPicker
                    selectedIndex={
                      selectedDong ? dongList.indexOf(selectedDong) : 0
                    }
                    containerStyle={{
                      width: 120,
                      height: dongList.length > 5 ? 180 : 40 * dongList.length,
                      borderRadius: 10,
                    }}
                    itemTextStyle={{
                      fontFamily: 'Pretendard-Regular',
                      fontSize: getFontSize(18),
                      color: '#1B1C1F',
                    }}
                    selectedIndicatorStyle={{
                      backgroundColor: 'transparent',
                    }}
                    itemHeight={40}
                    options={dongList}
                    onChange={index => {
                      setSelectedDong(dongList[index]);
                      getHoData(selectedItem, dongList[index] + '동');
                    }}
                  />
                )}
              </PickerContainer>
            </View>
            <View style={{width: '48%'}}>
              <SelectLabel>호 선택</SelectLabel>

              <PickerContainer>
                {hoList?.length > 0 && (
                  <WheelPicker
                    selectedIndex={
                      hoList.indexOf(selectedHo) > -1
                        ? hoList.indexOf(selectedHo)
                        : 0
                    }
                    containerStyle={{
                      width: 120,
                      height: hoList.length > 5 ? 180 : 40 * hoList.length,
                      borderRadius: 10,
                    }}
                    itemTextStyle={{
                      fontFamily: 'Pretendard-Regular',
                      fontSize: getFontSize(18),
                      color: '#1B1C1F',
                    }}
                    selectedIndicatorStyle={{
                      backgroundColor: 'transparent',
                    }}
                    itemHeight={40}
                    options={hoList}
                    onChange={index => {
                      setSelectedHo(hoList[index]);
                    }}
                  />
                )}
              </PickerContainer>
            </View>
          </SelectGroup>
          <Button
            onPress={() => {
              setCurrentPageIndex(2);
            }}
            style={{
              width: width - 80,
              backgroundColor: '#fff',
              borderColor: '#E8EAED',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <ButtonText
              style={{
                color: '#717274',
              }}>
              직접 입력하기
            </ButtonText>
          </Button>
          <ButtonSection
            style={{
              marginTop: 0,
            }}>
            <DropShadow
              style={{
                shadowColor: '#fff',
                width: '48%',
              }}>
              <Button
                onPress={() => {
                  setCurrentPageIndex(0);
                }}
                style={{
                  backgroundColor: '#fff',
                  borderColor: '#E8EAED',
                }}>
                <ButtonText
                  style={{
                    color: '#717274',
                  }}>
                  이전으로
                </ButtonText>
              </Button>
            </DropShadow>

            <DropShadow style={styles.dropshadow}>
              <Button onPress={nextHandler}>
                <ButtonText>다음으로</ButtonText>
              </Button>
            </DropShadow>
          </ButtonSection>
        </SheetContainer>
      )}
      {currentPageIndex === 2 && (
        <SheetContainer>
          <ModalTitle
            style={{
              marginBottom: 20,
            }}>
            취득하실 주택을 검색해주세요.
          </ModalTitle>
          <ApartmentInfoGroup
            onLayout={event => {
              console.log(event.nativeEvent.layout.height);
              setApartmentInfoGroupHeight(event.nativeEvent.layout.height);
            }}>
            <ApartmentInfoTitle>{address}</ApartmentInfoTitle>
          </ApartmentInfoGroup>
          <ModalAddressInputContainer>
            <DetailAddressInput
              value={detailAddress}
              onChangeText={setDetailAddress}
            />
          </ModalAddressInputContainer>
          <ButtonSection width={width}>
            <DropShadow
              style={{
                width: '50%',
                shadowColor: '#fff',
              }}>
              <Button
                onPress={() => {
                  setCurrentPageIndex(0);
                }}
                style={{
                  backgroundColor: '#fff',
                  borderColor: '#E8EAED',
                }}>
                <ButtonText
                  style={{
                    color: '#717274',
                  }}>
                  이전으로
                </ButtonText>
              </Button>
            </DropShadow>
            <DropShadow style={styles.dropshadow}>
              <Button onPress={nextHandler}>
                <ButtonText>다음으로</ButtonText>
              </Button>
            </DropShadow>
          </ButtonSection>
        </SheetContainer>
      )}
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  dropdownStyle: {
    width: '37%',
    height: 300,
    borderRadius: 10,
    marginTop: -20,
  },
  buttonStyle: {
    width: '100%',
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E8EAED',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    fontSize: getFontSize(13),
    fontFamily: 'Pretendard-SemiBold',
    color: '#A3A5A8',
    letterSpacing: -0.3,
    lineHeight: 16,
    marginRight: 15,
  },
  rowStyle: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
    borderBottomColor: '#E8EAED',
  },
  rowTextStyle: {
    fontSize: getFontSize(13),
    fontFamily: 'Pretendard-Regular',
    color: '#1B1C1F',
    letterSpacing: -0.3,
    lineHeight: 16,
  },
  dropshadow: {
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
});

export default SearchHouseSheet;
