// 챗 스크린에서 주택 검색 시트

import {
  View,
  useWindowDimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Keyboard,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { setChatDataList } from '../../redux/chatDataListSlice';
import { setHouseInfo } from '../../redux/houseInfoSlice';
import { AREA_LIST } from '../../data/areaData';
import { setModalList, removeLastModalList } from '../../redux/modalListSlice';

const SheetContainer = styled.View`
  flex: 1;
  background-color: #fff;
  width: ${props => props.width - 40}px;
  height: auto;
`;

const ModalTitle = styled.Text`
  font-size: ${getFontSize(16)}px;
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
  hitSlop: { top: 20, bottom: 20, left: 20, right: 20 },
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
  width: 70%;
  font-size: ${getFontSize(14)}px;
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
  const { width, height } = useWindowDimensions();
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
  const [selectedItem, setSelectedItem] = useState({});
  const [apartmentInfoGroupHeight, setApartmentInfoGroupHeight] = useState(0);
  const chatDataList = useSelector(state => state.chatDataList.value);
  const houseInfo = useSelector(state => state.houseInfo.value);
  const currentUser = useSelector(state => state.currentUser.value);
  const modalList = useSelector(state => state.modalList.value);



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
  function getType(variable) {
    return typeof variable;
  }
  // 주소 검색
  const getAddress = async (Area, Area2, searchtext) => {
    /*      const API_KEY = 'U01TX0FVVEgyMDIzMTIxNDE2MDk0NTExNDM1NzY=';
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
             console.log('jusolist', list)
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
    */
    const accessToken = currentUser.accessToken;
    // 요청 헤더
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // 요청 바디
    const data = {
      //  [선택] currentPage | Integer | 현재 페이지 번호 (기본 값 : 1)
      //  [선택] countPerPage | Integer | 페이지 당 출력할 결과 row 수 (기본 값 : 5)
      //  [선택] sido | String | 시도
      //  [선택] sigungu | String | 시군구
      //  [필수] keyword | String | 주소 검색어
      currentPage: 1,
      countPerPage: 5,
      sido: Area,
      sigungu: Area2,
      keyword: searchtext.trim()

    };
    axios
      .post('http://13.125.194.154:8080/house/roadAddr', data, { headers: headers })
      .then(async response => {
        if (response.data.errYn === 'Y') {
          let Modalindex = Object.keys(modalList).length; // modalList의 현재 길이를 가져옵니다.
          dispatch(setModalList({ ...modalList, [Modalindex]: {modal : 'info'} }));
          SheetManager.show('info', {
            payload: {
              type: 'error',
              message: response.data.errMsg,
              description: response.data.errMsgDtl,
              closemodal: true,
              actionSheetRef: actionSheetRef,
            },
          });
          const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
          dispatch(setChatDataList(newChatDataList));
          return;
        } else {
          // 성공적인 응답 처리 
          const list = response.data.data.jusoList;
          //     console.log('response', response.data.data)
          if (list.length === 0) {
            let Modalindex = Object.keys(modalList).length; // modalList의 현재 길이를 가져옵니다.
            dispatch(setModalList({ ...modalList, [Modalindex]: {modal : 'info'} }));
            SheetManager.show('info', {
              payload: {
                type: 'error',
                message: '검색 결과가 없어요.',
              },
            });
          } else {
            list.length < 5 && setIsLastPage(true);
          }
          setListData([...list]);
        }

      })
      .catch(error => {
        // 오류 처리
        SheetManager.show('info', {
          type: 'error',
          message: error?.errMsg,
          errorMessage: error?.errCode,
          closemodal: true,
          actionSheetRef: actionSheetRef,
        });
        console.error(error);
      });
  };




  // 주소 검색
  const getMoreAddress = async (Area, Area2, searchtext) => {
    /*  const API_KEY = 'U01TX0FVVEgyMDIzMTIxNDE2MDk0NTExNDM1NzY=';
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
        });*/

    const accessToken = currentUser.accessToken;
    // 요청 헤더
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // 요청 바디
    const data = {
      //  [선택] currentPage | Integer | 현재 페이지 번호 (기본 값 : 1)
      //  [선택] countPerPage | Integer | 페이지 당 출력할 결과 row 수 (기본 값 : 5)
      //  [선택] sido | String | 시도
      //  [선택] sigungu | String | 시군구
      //  [필수] keyword | String | 주소 검색어
      currentPage: listData.length / 5 + 1,
      countPerPage: 5,
      sido: Area,
      sigungu: Area2,
      keyword: searchtext.trim()

    };
    axios
      .post('http://13.125.194.154:8080/house/roadAddr', data, { headers: headers })
      .then(async response => {
        if (response.data.errYn === 'Y') {
          let Modalindex = Object.keys(modalList).length; // modalList의 현재 길이를 가져옵니다.
          dispatch(setModalList({ ...modalList, [Modalindex]: {modal : 'info'} }));
          SheetManager.show('info', {
            payload: {
              type: 'error',
              message: response.data.errMsg,
              description: response.data.errMsgDtl,
              closemodal: true,
              actionSheetRef: actionSheetRef,
            },
          });
          const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
          dispatch(setChatDataList(newChatDataList));
          return;
        } else {
          // 성공적인 응답 처리 
          const list = response.data.data.jusoList;
          //  console.log('response', response.data.data)
          if (list.length === 0) {
            let Modalindex = Object.keys(modalList).length; // modalList의 현재 길이를 가져옵니다.
            dispatch(setModalList({ ...modalList, [Modalindex]: {modal : 'info'} }));
            SheetManager.show('info', {
              payload: {
                type: 'error',
                message: '검색 결과가 없어요.',
              },
            });
          } else if (list.length < 5) {
            setIsLastPage(true);
          }

          setListData([...listData, ...list]);
        }


      })
      .catch(function (error) {
        let Modalindex = Object.keys(modalList).length; // modalList의 현재 길이를 가져옵니다.
        dispatch(setModalList({ ...modalList, [Modalindex]: {modal : 'info'} }));
        SheetManager.show('info', {
          type: 'error',
          message: error?.errMsg,
          errorMessage: error?.errCode,
          closemodal: true,
          actionSheetRef: actionSheetRef,
        });
        console.log(error);

      });
  };



  // 주택 호 정보 가져오기
  const getHoData = async (address, dongNm) => {
    const url = 'http://13.125.194.154:8080/house/roadAddrDetail';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.accessToken}`
    };

    const data = {
      admCd: address?.admCd === undefined ? '' : address?.admCd,
      rnMgtSn: address?.rnMgtSn === undefined ? '' : address?.rnMgtSn,
      udrtYn: address?.udrtYn === undefined ? '' : address?.udrtYn,
      buldMnnm: address?.buldMnnm === undefined ? '' : address?.buldMnnm,
      buldSlno: address?.buldSlno === undefined ? '' : address?.buldSlno,
      searchType: '2',
      dongNm: dongNm === undefined ? '' : dongNm,
    };

    try {
      const response = await axios.post(url, data, { headers: headers });
      //console.log('Holist response :', response.data.data.dongHoList);
      if (response.data.errYn === 'Y') {
        let Modalindex = Object.keys(modalList).length; // modalList의 현재 길이를 가져옵니다.
        dispatch(setModalList({ ...modalList, [Modalindex]: {modal : 'info'} }));
        SheetManager.show('info', {
          payload: {
            type: 'error',
            message: response.data.errMsg,
            description: response.data.errMsgDtl,
            closemodal: true,
            actionSheetRef: actionSheetRef,
          },
        });
        const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
        dispatch(setChatDataList(newChatDataList));
        return;

      } else {
        const holist = response.data.data.dongHoList;
        setHoList(holist);
        setSelectedHo(holist[0]);
      }

    } catch (error) {
      let Modalindex = Object.keys(modalList).length; // modalList의 현재 길이를 가져옵니다.
      dispatch(setModalList({ ...modalList, [Modalindex]: {modal : 'info'} }));
      SheetManager.show('info', {
        type: 'error',
        message: error?.errMsg,
        errorMessage: error?.errCode,
        closemodal: true,
        actionSheetRef: actionSheetRef,
      });
      console.log(error);
    }
  };

  const getDongData = async (address) => {
    const url = 'http://13.125.194.154:8080/house/roadAddrDetail';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.accessToken}`
    };

    const data = {
      admCd: address?.admCd === undefined ? '' : address?.admCd,
      rnMgtSn: address?.rnMgtSn === undefined ? '' : address?.rnMgtSn,
      udrtYn: address?.udrtYn === undefined ? '' : address?.udrtYn,
      buldMnnm: address?.buldMnnm === undefined ? '' : address?.buldMnnm,
      buldSlno: address?.buldSlno === undefined ? '' : address?.buldSlno,
      searchType: '1',
    };

    try {
      const response = await axios.post(url, data, { headers: headers });
      if (response.data.errYn === 'Y') {
        let Modalindex = Object.keys(modalList).length; // modalList의 현재 길이를 가져옵니다.
        dispatch(setModalList({ ...modalList, [Modalindex]: {modal : 'info'} }));
        SheetManager.show('info', {
          payload: {
            type: 'error',
            message: response.data.errMsg,
            description: response.data.errMsgDtl,
            closemodal: true,
            actionSheetRef: actionSheetRef,
          },
        });
        const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
        dispatch(setChatDataList(newChatDataList));
        return 'dongerror';

      } else {
        // console.log('donglist response :', response.data.data.dongHoList);
        const donglist = response.data.data.dongHoList;
        setDongList(donglist);
        return donglist[0];
      }
    } catch (error) {
      let Modalindex = Object.keys(modalList).length; // modalList의 현재 길이를 가져옵니다.
      dispatch(setModalList({ ...modalList, [Modalindex]: {modal : 'info'} }));
      SheetManager.show('info', {
        type: 'error',
        message: error?.errMsg,
        errorMessage: error?.errCode,
        closemodal: true,
        actionSheetRef: actionSheetRef,
      });
      console.log(error);
      return 'dongerror';
    }
  };


  const getGongSiData = async (item, dong1, dong2, ho1, ho2, detail, detail2) => {


    try {
      const accessToken = currentUser.accessToken;
      // 요청 헤더
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      };

      // 요청 바디
      const param = {
        //[필수] bdKdcd | String | 공동주택여부(1:공동주택 0:비공동주택)
        //[필수] pnu | String | 고유번호(8자리 이상, 총 19자리)
        //[선택] dongNm | String | 동명
        //[선택] hoNm | String | 호명
        //[선택] detailAdr | String | 상세주소(직접입력 케이스)
        //[선택] numOfRows | Integer | 검색건수(최대 1000)
        //[선택] pageNo | Integer | 페이지 번호
        bdKdcd: item?.bdKdcd,
        pnu: item?.pnu,
        dongNm: dong1 ? dong1 : dong2 ? dong2 : '',
        hoNm: ho1 ? ho1 : ho2 ? ho2 : '',
        detailAdr: detail ? detail : '',
        numOfRows: 5,
        pageNo: 1,

      };
      /*    console.log('gongsiParams', {
            bdKdcd: item?.bdKdcd,
            pnu: item?.pnu,
            dongNm: dong1 ? dong1 : dong2 ? dong2 : '',
            hoNm: ho1 ? ho1 : ho2 ? ho2 : '',
            detailAdr: detail ? detail : '',
            numOfRows: 5,
            pageNo: 1,
          })*/
      const response = await axios.post('http://13.125.194.154:8080/house/pubLandPriceAndArea', param, { headers: headers });
      const data = response.data.data;
      //console.log('param', param);
      //console.log('gongsiData', data);
      //    console.log('gongsiData return', data);
      if (response.data.errYn === 'Y') {
        let Modalindex = Object.keys(modalList).length; // modalList의 현재 길이를 가져옵니다.
        dispatch(setModalList({ ...modalList, [Modalindex]: {modal : 'info'} }));
        SheetManager.show('info', {
          payload: {
            type: 'error',
            message: response.data.errMsg,
            description: response.data.errMsgDtl,
          },
        });


        dispatch(
          setHouseInfo({
            ...houseInfo,
            bdMgtSn: selectedItem?.bdMgtSn,
            jibunAddr: selectedItem?.jibunAddr,
            roadAddr: selectedItem?.roadAddrPart1,
            roadAddrRef: selectedItem?.roadAddrPart2,
            detailAdr: detail2 ? detail2 : detail ? detail : '',
            houseName: selectedItem?.bdNm ? selectedItem?.bdNm : selectedItem?.lnbrMnnm + '-' + selectedItem?.lnbrSlno,
          }));
        return {
          isPubLandPriceOver100Mil: undefined,
          isAreaOver85: undefined,
          result: true,
        };
      } else {
        const successresult = await successResponse(data, detail, detail2);
        // console.log('successresult', successresult);
        return {
          isPubLandPriceOver100Mil: successresult.isPubLandPriceOver100Mil,
          isAreaOver85: successresult.isAreaOver85,
          result: true,
        };
      }
    } catch (error) {        // 오류 처리
      console.error(error);
      return {
        isPubLandPriceOver100Mil: undefined,
        isAreaOver85: undefined,
        result: false,
      };
    }
  };

  const successResponse = async (data, detail, detail2) => {
    if (data?.hasPubLandPrice) {
      if (data?.pubLandPrice > 100000000) {
        if (data?.hasArea) {
          if (data?.area > 85) {
            dispatch(
              setHouseInfo({
                ...houseInfo,
                hasPubLandPrice: data?.hasPubLandPrice,
                pubLandPrice: data?.pubLandPrice ? data?.pubLandPrice : 0,
                hasArea: data?.hasArea,
                area: data?.area ? data?.area : 0,
                stdrYear: data?.stdrYear,
                bdMgtSn: selectedItem?.bdMgtSn,
                jibunAddr: selectedItem?.jibunAddr,
                roadAddr: selectedItem?.roadAddrPart1,
                roadAddrRef: selectedItem?.roadAddrPart2,
                detailAdr: detail2 ? detail2 : detail ? detail : '',
                houseName: selectedItem?.bdNm ? selectedItem?.bdNm : selectedItem?.lnbrMnnm + '-' + selectedItem?.lnbrSlno,
                isAreaOver85: true,
                isPubLandPriceOver100Mil: true
              }),
            );
            return { isAreaOver85: true, isPubLandPriceOver100Mil: true };
          } else {
            dispatch(
              setHouseInfo({
                ...houseInfo,
                hasPubLandPrice: data?.hasPubLandPrice,
                pubLandPrice: data?.pubLandPrice ? data?.pubLandPrice : 0,
                hasArea: data?.hasArea,
                area: data?.area ? data?.area : 0,
                stdrYear: data?.stdrYear,
                bdMgtSn: selectedItem?.bdMgtSn,
                jibunAddr: selectedItem?.jibunAddr,
                roadAddr: selectedItem?.roadAddrPart1,
                roadAddrRef: selectedItem?.roadAddrPart2,
                detailAdr: detail2 ? detail2 : detail ? detail : '',
                houseName: selectedItem?.bdNm ? selectedItem?.bdNm : selectedItem?.lnbrMnnm + '-' + selectedItem?.lnbrSlno,
                isAreaOver85: false,
                isPubLandPriceOver100Mil: true
              }),
            );
            return { isAreaOver85: false, isPubLandPriceOver100Mil: true };
          }
        } else {
          dispatch(
            setHouseInfo({
              ...houseInfo,
              hasPubLandPrice: data?.hasPubLandPrice,
              pubLandPrice: data?.pubLandPrice ? data?.pubLandPrice : 0,
              hasArea: data?.hasArea,
              area: data?.area ? data?.area : 0,
              stdrYear: data?.stdrYear,
              bdMgtSn: selectedItem?.bdMgtSn,
              jibunAddr: selectedItem?.jibunAddr,
              roadAddr: selectedItem?.roadAddrPart1,
              roadAddrRef: selectedItem?.roadAddrPart2,
              detailAdr: detail2 ? detail2 : detail ? detail : '',
              houseName: selectedItem?.bdNm ? selectedItem?.bdNm : selectedItem?.lnbrMnnm + '-' + selectedItem?.lnbrSlno,
              isPubLandPriceOver100Mil: true
            }),
          );
          return { isPubLandPriceOver100Mil: true };
        }
      } else {
        if (data?.hasArea) {
          if (data?.area > 85) {
            dispatch(
              setHouseInfo({
                ...houseInfo,
                hasPubLandPrice: data?.hasPubLandPrice,
                pubLandPrice: data?.pubLandPrice ? data?.pubLandPrice : 0,
                hasArea: data?.hasArea,
                area: data?.area ? data?.area : 0,
                stdrYear: data?.stdrYear,
                bdMgtSn: selectedItem?.bdMgtSn,
                jibunAddr: selectedItem?.jibunAddr,
                roadAddr: selectedItem?.roadAddrPart1,
                roadAddrRef: selectedItem?.roadAddrPart2,
                detailAdr: detail2 ? detail2 : detail ? detail : '',
                houseName: selectedItem?.bdNm ? selectedItem?.bdNm : selectedItem?.lnbrMnnm + '-' + selectedItem?.lnbrSlno,
                isAreaOver85: true,
                isPubLandPriceOver100Mil: false
              }),
            );
            return { isAreaOver85: true, isPubLandPriceOver100Mil: false };
          } else {
            dispatch(
              setHouseInfo({
                ...houseInfo,
                hasPubLandPrice: data?.hasPubLandPrice,
                pubLandPrice: data?.pubLandPrice ? data?.pubLandPrice : 0,
                hasArea: data?.hasArea,
                area: data?.area ? data?.area : 0,
                stdrYear: data?.stdrYear,
                bdMgtSn: selectedItem?.bdMgtSn,
                jibunAddr: selectedItem?.jibunAddr,
                roadAddr: selectedItem?.roadAddrPart1,
                roadAddrRef: selectedItem?.roadAddrPart2,
                detailAdr: detail2 ? detail2 : detail ? detail : '',
                houseName: selectedItem?.bdNm ? selectedItem?.bdNm : selectedItem?.lnbrMnnm + '-' + selectedItem?.lnbrSlno,
                isAreaOver85: false,
                isPubLandPriceOver100Mil: false
              }),
            );
            return { isAreaOver85: false, isPubLandPriceOver100Mil: false };
          }
        } else {
          dispatch(
            setHouseInfo({
              ...houseInfo,
              hasPubLandPrice: data?.hasPubLandPrice,
              pubLandPrice: data?.pubLandPrice ? data?.pubLandPrice : 0,
              hasArea: data?.hasArea,
              area: data?.area ? data?.area : 0,
              stdrYear: data?.stdrYear,
              bdMgtSn: selectedItem?.bdMgtSn,
              jibunAddr: selectedItem?.jibunAddr,
              roadAddr: selectedItem?.roadAddrPart1,
              roadAddrRef: selectedItem?.roadAddrPart2,
              detailAdr: detail2 ? detail2 : detail ? detail : '',
              houseName: selectedItem?.bdNm ? selectedItem?.bdNm : selectedItem?.lnbrMnnm + '-' + selectedItem?.lnbrSlno,
              isPubLandPriceOver100Mil: false
            }),
          );
          return { isPubLandPriceOver100Mil: false };
        }
      }
    } else {
      if (data?.hasArea) {
        if (data?.area > 85) {
          dispatch(
            setHouseInfo({
              ...houseInfo,
              hasPubLandPrice: data?.hasPubLandPrice,
              pubLandPrice: data?.pubLandPrice ? data?.pubLandPrice : 0,
              hasArea: data?.hasArea,
              area: data?.area ? data?.area : 0,
              stdrYear: data?.stdrYear,
              bdMgtSn: selectedItem?.bdMgtSn,
              jibunAddr: selectedItem?.jibunAddr,
              roadAddr: selectedItem?.roadAddrPart1,
              roadAddrRef: selectedItem?.roadAddrPart2,
              detailAdr: detail2 ? detail2 : detail ? detail : '',
              houseName: selectedItem?.bdNm ? selectedItem?.bdNm : selectedItem?.lnbrMnnm + '-' + selectedItem?.lnbrSlno,
              isAreaOver85: true,
            }),
          );
          return { isAreaOver85: true };
        } else {
          dispatch(
            setHouseInfo({
              ...houseInfo,
              hasPubLandPrice: data?.hasPubLandPrice,
              pubLandPrice: data?.pubLandPrice ? data?.pubLandPrice : 0,
              hasArea: data?.hasArea,
              area: data?.area ? data?.area : 0,
              stdrYear: data?.stdrYear,
              bdMgtSn: selectedItem?.bdMgtSn,
              jibunAddr: selectedItem?.jibunAddr,
              roadAddr: selectedItem?.roadAddrPart1,
              roadAddrRef: selectedItem?.roadAddrPart2,
              detailAdr: detail2 ? detail2 : detail ? detail : '',
              houseName: selectedItem?.bdNm ? selectedItem?.bdNm : selectedItem?.lnbrMnnm + '-' + selectedItem?.lnbrSlno,
              isAreaOver85: false,
            }),
          );
          return { isAreaOver85: false };
        }
      } else {
        dispatch(
          setHouseInfo({
            ...houseInfo,
            hasPubLandPrice: data?.hasPubLandPrice,
            pubLandPrice: data?.pubLandPrice ? data?.pubLandPrice : 0,
            hasArea: data?.hasArea,
            area: data?.area ? data?.area : 0,
            stdrYear: data?.stdrYear,
            bdMgtSn: selectedItem?.bdMgtSn,
            jibunAddr: selectedItem?.jibunAddr,
            roadAddr: selectedItem?.roadAddrPart1,
            roadAddrRef: selectedItem?.roadAddrPart2,
            detailAdr: detail2 ? detail2 : detail ? detail : '',
            houseName: selectedItem?.bdNm ? selectedItem?.bdNm : selectedItem?.lnbrMnnm + '-' + selectedItem?.lnbrSlno,
          }),
        );
        return {};
      }
    }


  };

  // 다음으로 버튼 핸들러
  const nextHandler = async () => {
    /*
        console.log('currentPageIndex', currentPageIndex);
        console.log('selectedDong', selectedDong);
        console.log('dongList[0]', dongList[0]);*/
    var detailAddress2 = '';
    if (currentPageIndex === 1) {
      detailAddress2 = (selectedDong ? selectedDong + '동 ' : dongList[0] ? dongList[0] + '동 ' : '') + (selectedHo ? selectedHo + '호' : hoList[0] ? hoList[0] + '호' : '');
    } else {
      detailAddress2 = '';
    }

    actionSheetRef.current?.hide();

    const chat1 = {
      id: 'apartmentAddress',
      type: 'system',
      message: '취득하실 주택을 선택해주세요.',
      progress: 1,
    };

    const chat2 = {
      id: 'apartmentAddress',
      type: 'my',
      message:
        props.payload?.data !== 'villa' && props.payload?.data2 !== 'apartment'
          ? address + ' ' + detailAddress
          : props.payload?.data === 'villa' ? (detailAddress2 == '' ? selectedItem?.bdNm + ' ' + (detailAddress2 ? detailAddress2 : detailAddress) : selectedItem?.bdNm)
            : (detailAddress2 == '' ? selectedItem?.bdNm + ' ' + (detailAddress2 ? detailAddress2 : detailAddress) : selectedItem?.bdNm)
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
      select: [
        {
          id: 'yes',
          name: '선택하기',
          openSheet: 'chooseHouseDongHoAlert',

          currentPageIndex: {
            selectedItem: selectedItem,
            dongList: dongList,
            hoList: hoList,
          },
        }
      ],
    };

    const chat5 = {
      id: 'apartmentAddressMy',
      type: 'my',
      message: detailAddress2,
      questionId: 'apartment',
    };



    const chatpubLandPrice = {
      id: 'pubLandPrice',
      type: 'system',
      message: '공시가격를 제대로 불러오지 못했어요.\n공시가격가 1억원을 초과하나요?',
      progress: 1,
      select: [
        {
          id: 'yes',
          name: '네',
          select: ['area'],
        },
        {
          id: 'no',
          name: '아니요',
          select: ['area'],
        },
      ]

    }

    const chatarea = {
      id: 'area',
      type: 'system',
      message: '전용면적을 제대로 불러오지 못했어요.\n전용면적이 85㎡을 초과하나요?.',
      progress: 1,
      select: [
        {
          id: 'yes',
          name: '네',
          select: ['apartmentAddressInfoSystem'],


        },
        {
          id: 'no',
          name: '아니오',
          select: ['apartmentAddressInfoSystem'],


        },
      ]

    }

    //리스트 초기화부분
    //  console.log('selecteditem', selectedItem);
    const gongsireturn = await getGongSiData(selectedItem, selectedDong, dongList[0], selectedHo, hoList[0], detailAddress, detailAddress2);
    if (gongsireturn?.result) {

      const chatList =
        props.payload?.data === 'villa' && (detailAddress || detailAddress2 == '')
          ? (gongsireturn?.isPubLandPriceOver100Mil !== undefined ? (gongsireturn?.isAreaOver85 !== undefined ? [chat1, chat2, chat3] : [chat1, chat2, chatarea]) : [chat1, chat2, chatpubLandPrice])
          : (detailAddress || detailAddress2 == '') && (props.payload?.data2 === 'apartment' || props.payload?.data === 'ticketyes' || props.payload?.data === 'ticketno' || props.payload?.data === 'house')
            ? (gongsireturn?.isPubLandPriceOver100Mil !== undefined ? (gongsireturn?.isAreaOver85 !== undefined ? [chat1, chat2, chat3] : [chat1, chat2, chatarea]) : [chat1, chat2, chatpubLandPrice])
            : (gongsireturn?.isPubLandPriceOver100Mil !== undefined ? (gongsireturn?.isAreaOver85 !== undefined ? [chat1, chat2, chat4, chat5, chat3] : [chat1, chat2, chat4, chat5, chatarea]) : [chat1, chat2, chat4, chat5, chatpubLandPrice]);
      dispatch(setChatDataList([...chatDataList, ...chatList]));
    } else {
      const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
      dispatch(setChatDataList(newChatDataList));
    }
    dispatch(removeLastModalList());
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
              dispatch(removeLastModalList());
              setCurrentPageIndex(0);
              setSelectedDong('');
              setSelectedHo('');
              setHoList([]);
              setDongList([]);
              const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
              dispatch(setChatDataList(newChatDataList));
              actionSheetRef.current?.hide();
            }}>
            <CloseIcon width={16} height={16} />
          </Pressable>
        </ModalHeader>
      }
      overlayColor="#111"
      defaultOverlayOpacity={0.7}
      gestureEnabled={false}
      closeOnTouchBackdrop={false}
      closeOnPressBack={false}
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
                      onChangeText={(text) => { setSearchText(text.replace(/\n/g, '')); }}
                      onSubmitEditing={() => {
                        if (searchText === '') {
                          if (selectedArea !== '전체' && selectedArea !== '') {
                            if (selectedArea2 !== '전체' && selectedArea2 !== '') {
                              getAddress(selectedArea, selectedArea2, '');
                            }
                          } else {
                            return
                          }
                        } else {
                          if (selectedArea === '전체' || selectedArea === '') {
                            if (selectedArea2 === '전체' || selectedArea2 === '') {
                              getAddress('', '', searchText);
                            } else {
                              getAddress('', selectedArea2, searchText);
                            }

                          } else {
                            if (selectedArea2 === '전체' || selectedArea2 === '') {
                              getAddress(selectedArea, '', searchText);
                            } else {
                              getAddress(selectedArea, selectedArea2, searchText);
                            }
                          }

                        };
                      }}
                    />
                    <ModalInputButton
                      onPress={() => {
                        if (searchText === '') {
                          if (selectedArea !== '전체' && selectedArea !== '') {
                            if (selectedArea2 !== '전체' && selectedArea2 !== '') {
                              getAddress(selectedArea, selectedArea2, '');
                            }
                          } else {
                            return
                          }
                        } else {
                          if (selectedArea === '전체' || selectedArea === '') {
                            if (selectedArea2 === '전체' || selectedArea2 === '') {
                              getAddress('', '', searchText);
                            } else {
                              getAddress('', selectedArea2, searchText);
                            }

                          } else {
                            if (selectedArea2 === '전체' || selectedArea2 === '') {
                              getAddress(selectedArea, '', searchText);
                            } else {
                              getAddress(selectedArea, selectedArea2, searchText);
                            }
                          }

                        };
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
                              if (index === 0) {
                                setSelectedArea2('전체');
                              } else {
                                setSelectedArea2('');
                              }
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
                      /*   onSelect={(selectedItem, index) => {
                           console.log(selectedItem, index);
                         }}*/
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
                              //  console.log(item);
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
                    if (selectedArea === '전체' || selectedArea === '') {
                      if (selectedArea2 === '전체' || selectedArea2 === '') {
                        getMoreAddress('', '', searchText);
                      } else {
                        getMoreAddress('', selectedArea2, searchText);
                      }

                    } else {
                      if (selectedArea2 === '전체' || selectedArea2 === '') {
                        getMoreAddress(selectedArea, '', searchText);
                      } else {
                        getMoreAddress(selectedArea, selectedArea2, searchText);
                      }
                    }
                  }}>
                  <ListFooterButtonText>더 보기</ListFooterButtonText>
                </ListFooterButton>
              )
            }
            renderItem={({ item, index }) => (
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
                  onPress={async () => {
                    //          console.log('선택 item', item);
                    setAddress(item?.roadAddr);
                    if (props.payload?.data === 'villa' || props.payload?.data2 === 'apartment') {
                      const firstDong = await getDongData(item);
                      if (firstDong !== 'dongerror') {
                        await getHoData(item, firstDong);
                        setSelectedItem(item);
                        setCurrentPageIndex(1);
                      } else {
                        setSelectedItem(item);
                        setCurrentPageIndex(1);
                      }
                    } else {
                      setSelectedItem(item);
                      //                console.log('item', item);
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
              {selectedItem?.bdNm}  {selectedDong ? selectedDong + '동 ' : dongList[0] ? dongList[0] + '동 ' : ''}
              {selectedHo ? selectedHo + '호' : hoList[0] ? hoList[0] + '호' : ''}
            </ApartmentInfoTitle>
          </ApartmentInfoGroup>
          <SelectGroup>
            <View style={{ width: '48%' }}>
              <SelectLabel>동 선택</SelectLabel>
              <PickerContainer>
                {dongList[0] && (
                  <WheelPicker
                    selectedIndex={
                      selectedDong ? dongList.indexOf(selectedDong) : 0
                    }
                    containerStyle={{
                      width: 120,
                      height: 180,
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
                      setHoList([]);
                      getHoData(selectedItem, dongList[index]);
                    }}
                  />
                )}
              </PickerContainer>
            </View>
            <View style={{ width: '48%' }}>
              <SelectLabel>호 선택</SelectLabel>

              <PickerContainer>
                {hoList?.length > 0 && (
                  <WheelPicker
                    selectedIndex={
                      hoList.indexOf(selectedHo) >= 0
                        ? hoList.indexOf(selectedHo)
                        : 0
                    }
                    containerStyle={{
                      width: 120,
                      height: 180,
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
                  setSelectedDong('');
                  setSelectedHo('');
                  setHoList([]);
                  setDongList([]);
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
              // console.log(event.nativeEvent.layout.height);
              setApartmentInfoGroupHeight(event.nativeEvent.layout.height);
            }}>
            <ApartmentInfoTitle>{address}</ApartmentInfoTitle>
          </ApartmentInfoGroup>
          <ModalAddressInputContainer>
            <DetailAddressInput
              value={detailAddress}
              onChangeText={(text) => { setDetailAddress(text.replace(/\n/g, '')); }}
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
                  if (houseInfo.houseType !== '4' && houseInfo.houseType !== '5') {
                    setCurrentPageIndex(1);
                  } else {
                    setCurrentPageIndex(0);
                  }

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
              <Button onPress={
                nextHandler
              }>
                <ButtonText>다음으로</ButtonText>
              </Button>
            </DropShadow>
          </ButtonSection>
        </SheetContainer>
      )
      }
    </ActionSheet >
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
