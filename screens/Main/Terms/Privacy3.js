// 개인정보 처리방침

import { TouchableOpacity, useWindowDimensions, ScrollView, BackHandler } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import CloseIcon from '../../../assets/icons/close_button.svg';
import getFontSize from '../../../utils/getFontSize';
import DropShadow from 'react-native-drop-shadow';
import { SheetManager } from 'react-native-actions-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { setCert } from '../../../redux/certSlice';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: ${getFontSize(20)}px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 30px;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  margin-top: 20px;
`;

const SubTitle = styled.Text`
  font-size: ${getFontSize(18)}px;
  font-family: Pretendard-Medium;
  color: #1b1c1f;
  line-height: 25px;
  margin-top: 10px;
  letter-spacing: -0.5px;
`;

const ButtonSection = styled.View`
  position: absolute;
  bottom: 20px;
  width: 100%;
`;

const Button = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.6,
}))`
  width: ${props => props.width - 40}px;
  height: 60px;
  border-radius: 30px;
  background-color: ${props => (props.active ? '#2F87FF' : '#e5e5e5')};
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  align-self: center;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-family: Pretendard-Bold;
  color: ${props => (props.active ? '#fff' : '#a3a5a8')};
  line-height: 20px;
`;

const ContentText = styled.Text`
  font-size: 13px;
  font-family: Pretendard-Regular;
  color: #1b1c1f;
  line-height: 25px;
  margin-top: 20px;
`;

const Privacy3 = props => {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [activeButton, setActiveButton] = useState(false);
  const { certType, agreeCert, agreePrivacy, agreeLocation, agreeAge, agreeMarketing, agreeCopyright, agreeGov24 } = useSelector(
    state => state.cert.value,
  );
  const handleBackPress = () => {
    navigation.goBack();
    setTimeout(() => {
      SheetManager.show('cert2', {
        payload: {
          index : props.route.params.index,
          navigation: navigation
        },
      });
    }, 300);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [handleBackPress]);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => {
            navigation.goBack();
            setTimeout(() => {
              SheetManager.show('cert2', {
                payload: {
                  index : props.route.params.index,
                  navigation: navigation
                },
              });
            }, 300);
          }}>
          <CloseIcon />
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center',
      title: '하우택싱',
      headerShadowVisible: false,
      contentStyle: {
        borderTopWidth: 0,
      },
      headerTitleStyle: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 17,
        color: '#333',
        letterSpacing: -0.8,
      },
    });
  }, []);

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}
        // 스크롤이 하단에 도달했을 때
        onScroll={({ nativeEvent }) => {
          if (
            nativeEvent.contentOffset.y +
            nativeEvent.layoutMeasurement.height >=
            nativeEvent.contentSize.height  - 1
          ) {
            setActiveButton(true);
          } else {
            setActiveButton(false);
          }
        }}>
        <Title>(필수) 정부24 개인정보처리방침 </Title>
        <SubTitle>[필수] 정부24 개인정보처리방침 </SubTitle>
        <ContentText>
          {`정부24 개인정보처리방침
제1조 개인정보의 처리목적
① 정부24는 개인정보 보호법 제32조에 따라 등록·공개하는 개인정보파일의 처리 목적은 다음과 같습니다.
1. 개인정보 파일명 : 정부24 회원정보
가. 개인정보의 처리목적 : 회원가입, 회원제 서비스 이용 및 제한적 본인 확인절차에 따른 본인확인, 개인식별, 부정이용방지, 비인가 사용방지, 가입 의사 확인, 만 14세 미만 아동 개인정보 수집 시 법정대리인 동의여부 확인, 추후 법정대리인 본인확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달 등
나. 수집방법 : 회원가입, 비회원 신청
다. 보유근거 : 정보주체의 동의, 전자정부법 시행령 제90조
라. 보유기간 : 탈퇴 후 5일까지
2. 개인정보 파일명 : 전자민원 신청이력(상담이력 포함)
가. 개인정보의 처리목적 : 민원 신청서에 포함된 개인정보는 민원 처리에 관한 법률 제12조의2에 의한 민원사무 처리를 위한 목적으로 민원 접수기관 및 처리기관에서 이용 (민원발급서비스, 민원열람서비스, 최근 신청이력)
나. 수집방법 : 전자민원 신청
다. 보유근거 : 정보주체의 동의, 전자정부법 시행령 제90조
라. 보유기간 : 3년
3. 개인정보 파일명 : 전자민원 증명서(신청서 및 발급물)
가. 개인정보의 처리목적 : 민원 신청서에 포함된 개인정보는 민원 처리에 관한 법률 제12조의2에 의한 민원사무 처리를 위한 목적으로 민원 접수기관 및 처리기관에서 이용 (민원발급서비스, 민원열람서비스, 최근 신청이력)
나. 수집방법 : 전자민원 신청
다. 보유근거 : 정보주체의 동의, 전자정부법 시행령 제90조
라. 보유기간 : 180일
4. 개인정보 파일명 : 생활정보
가. 개인정보의 처리목적 : 정부24 회원의 경우, 전자정부법 제9조의2에 의한 본인의 생활정보 열람
나. 수집방법 : 정보주체 동의 후 인증서 로그인
다. 보유근거 : 정보주체의 동의, 전자정부법 제9조의2
라. 보유기간 : 1일
제2조 개인정보 수집항목
① 정부24는 다음의 개인정보 항목을 처리하고 있습니다.
1. < 정부24 회원정보 >
- 회원정보
가. 필수항목 : 아이디, 비밀번호, 성명(법인명), 주민등록번호(외국인등록번호, 법인등록번호·사업자등록번호(법인인 경우)), 주소, 이메일 주소
나. 선택항목 : 휴대전화번호
· 민원처리 SMS 수신동의 시 : 휴대전화번호
· 생체인증 서비스 이용 시 : 휴대전화번호, 휴대폰 운영체제 정보, 통신사, 제조사 정보, 비밀번호
· 민원 알림수신 선택 시 : 이메일 또는 SMS 수신동의여부
· 생활정보서비스 이용동의 시 : 연령, 성별, 관심지역
- 비회원정보
가. 필수항목 : 성명(법인명), 주민등록번호(외국인등록번호, 법인등록번호·사업자등록번호(법인인 경우))
나. 선택항목 : 주소, 상세주소, 연락처, 휴대전화번호
2. < 전자민원 신청이력(상담이력 포함) >
가. 필수항목 : 아이디, 성명(법인명), 주민등록번호(외국인등록번호, 법인등록번호), 주소, 휴대전화번호
나. 선택항목 : 전화번호, 이메일주소, 계좌번호, 상담정보(녹취자료 포함)
3. < 전자민원 증명서(신청서 및 발급물) >
가. 필수항목 : 성명, 주민등록번호(외국인등록번호, 법인등록번호), 주소
나. 선택항목 : 전화번호, 휴대전화번호, 이메일주소
4. < 생활정보 >
가. 필수항목 : 주민등록번호(외국인등록번호), 서비스코드(기관), 일련번호, 생활정보(전자정부법 제9조의2)
나. 선택항목 : 자동차등록번호, 주소(동/호수), 공적연금 가입 여부
제3조 개인정보 영향평가 수행 결과
① 정부24는 운영하고 있는 개인정보 처리시스템이 정보주체의 개인정보파일에 미칠 영향에 대해 조사, 분석, 평가하기 위해 「개인정보 보호법」 제33조에 따라 “개인정보 영향평가”를 받고 있습니다.
② 정부24는 다음 개인정보파일에 대해 영향평가를 수행하였습니다.
개인정보파일의 명칭, 개인정보 파일에 기록되는 개인정보의 항목, 영향평가 수행연도
개인정보파일의 명칭	개인정보 파일에 기록되는 개인정보의 항목	영향평가
수행연도
정부24 회원정보	① 회원정보
- 필수항목 : 아이디, 비밀번호, 성명(법인명), 주민등록번호(외국인등록번호, 법인등록번호·사업자등록번호(법인인 경우)), 주소, 이메일 주소
- 선택항목 : 휴대전화번호
② 비회원정보
- 필수항목 : 성명(법인명), 주민등록번호(외국인등록번호, 법인등록번호·사업자등록번호(법인인 경우))
- 선택항목 : 주소, 상세주소, 연락처, 휴대전화번호
2016
전자민원 신청이력
(상담이력 포함)	
- 필수항목 : 아이디, 성명(법인명), 주민등록번호(외국인등록번호, 법인등록번호), 주소, 휴대전화번호
- 선택항목 : 전화번호, 이메일주소, 계좌번호, 상담정보(녹취자료 포함)
2017
전자민원 증명서
(신청서 및 발급물)	
- 필수항목 : 성명, 주민등록번호(외국인등록번호, 법인등록번호), 주소
- 선택항목 : 전화번호, 휴대전화번호, 이메일주소
2017
생활정보	
- 필수항목 : 주민등록번호(외국인등록번호), 서비스코드(기관), 일련번호, 생활정보(전자정부법 제9조의2)
- 선택항목 : 자동차등록번호, 주소(동/호수), 공적연금 가입 여부
2017
제4조 개인정보의 제3자 제공에 관한 사항
① 정부24는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 ｢개인정보 보호법｣ 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
제5조 개인정보 처리업무의 위탁에 관한 사항
① 정부24는 원활한 개인정보 업무처리를 위해 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
정부24 위탁업무, 위탁기간, 수탁업체명, 연락처, 근무시간
구분	수탁업체명	주소	전화	근무시간	위탁 업무
운영유지보수	(주)솔리데오시스템즈	서울특별시 영등포구
국제금융로 70	070-7825-4476	09:00~18:00	시스템 개발 및 유지보수
(주)씨케이인포	서울특별시 종로구
새문안로5길 37	070-7825-0156	09:00~18:00	시스템 개발 및 유지보수
유니닥스(주)	서울특별시 구로구
디지털로 272	070-7825-4478	09:00~18:00	시스템 개발 및 유지보수
시스템 구축	(주)솔리데오시스템즈	서울특별시 영등포구
국제금융로 70	070-4721-2360	09:00~18:00	시스템 개발
유니닥스(주)	서울특별시 구로구
디지털로 272	070-4721-2365	09:00~18:00	시스템 개발
메타빌드(주)	서울특별시 서초구
서초중앙로 62	070-4721-2372	09:00~18:00	시스템 개발
② 위탁계약 체결 시 ｢개인정보 보호법｣ 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
제6조 개인정보의 파기 절차 및 방법
① 정부24는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
② 개인정보 파기의 절차 및 방법은 다음과 같습니다.
가. 파기절차 : 정부24는 파기 사유가 발생한 개인정보를 선정하고, 정부24의 개인정보 분야별 책임자의 승인을 받아 개인정보를 파기합니다.
나. 파기방법 : 정부24는 전자적 파일 형태로 기록․저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록․저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
제7조 정보주체와 법정대리인의 권리·의무 및 행사방법에 관한 사항
① 정보주체는 정부24에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
② 제1항에 따른 권리 행사는 정부24에 대해 「개인정보 처리 방법에 관한 고시」 별지 제8호 서식에 따라 작성 후 서면, 전자우편, 팩스 등을 통하여 하실 수 있으며, 정부24는 이에 대해 지체 없이 조치하겠습니다.
③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
 ※ 만 14세 미만 아동에 관한 개인정보의 열람등 요구는 법정대리인이 직접 해야 하며, 만 14세 이상의 미성년자인 정보주체는 정보주체의 개인정보에 관하여 미성년자 본인이 권리를 행사하거나 법정대리인을 통하여 권리를 행사할 수도 있습니다.
④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.
⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
⑥ 정부24는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리 정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.
제8조 개인정보의 안전성 확보조치에 관한 사항
정부24는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.

1. 내부관리계획의 수립 및 시행 : 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.
2. 개인정보 취급직원의 최소화 및 교육 : 개인정보를 취급하는 직원은 반드시 필요한 인원에 한하여 지정·관리하고 있으며 취급직원을 대상으로 안전한 관리를 위한 교육을 실시하고 있습니다.
3. 정기적인 자체 지도 실시 : 개인정보 취급 관련 안정성 확보를 위해 매년 자체 개인정보 보호 관리수준 진단을 실시하고 있습니다.
4. 개인정보에 대한 접근 제한 : 개인정보를 처리하는 개인정보처리시스템에 대한 접근권한의 부여·변경·말소를 통하여 개인정보에 대한 접근통제를 위한 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
5. 접속기록의 보관 : 개인정보처리시스템에 접속한 기록을 1년 이상 보관·관리하고 있습니다. 다만, 5만명 이상의 정보주체에 관하여 개인정보를 처리하거나, 고유식별정보 또는 민감정보를 처리하는 개인정보처리시스템의 경우에는 2년 이상 보관·관리하고 있습니다.
6. 개인정보의 암호화 : 개인정보는 암호화 등을 통해 안전하게 저장 및 관리되고 있습니다. 또한, 중요한 데이터는 저장 및 전송 시 암호화하여 사용하는 등의 별도 보안기능을 사용하고 있습니다.
7. 해킹 등에 대비한 기술적 대책 : 정부24는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적으로 갱신·점검하고 있습니다.
8. 비인가자에 대한 출입 통제 : 개인정보를 보관하고 있는 개인정보처리시스템의 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립·운영하고 있습니다.
제9조 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항
① 정부24는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용 정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자의 컴퓨터 하드디스크에 저장되기도 합니다.
가. 쿠키의 사용목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
나. 쿠키의 설치·운영 및 거부: 브라우저 옵션 설정을 통해 쿠키 허용, 쿠키 차단 등의 설정을 할 수 있습니다.
- Internet Explorer : 웹브라우저 우측 상단의 도구 메뉴 > 인터넷 옵션 > 개인정보 > 설정 > 고급
- Edge: 웹브라우저 우측 상단의 설정 메뉴 > 쿠키 및 사이트 권한 > 쿠키 및 사이트 데이터 관리 및 삭제
- Chrome: 웹브라우저 우측 상단의 설정 메뉴 > 개인정보 및 보안 > 쿠키 및 기타 사이트 데이터
다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
제10조 추가적인 이용·제공 관련 판단 기준
① 정부24는 「개인정보 보호법」 제15조제3항 및 제17조제4항에 따라 「개인정보 보호법」 시행령 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다.
② 이에 따라 정부24는 정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서 다음과 같은 사항을 고려하였습니다.
‣ 개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부
‣ 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지 여부
‣ 개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부
‣ 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부
제11조 가명정보 처리에 관한 사항
정부24는 개인정보를 가명처리 하고 있지 않으며, 가명처리 할 경우 관련사항을 정보주체가 확인할 수 있도록 안내를 하겠습니다.
제12조 개인정보 보호책임자에 관한 사항
① 정부24는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해규제 등을 위하여 아래와 같이 개인정보 보호(분야별) 책임자를 지정하고 있습니다.
개인정보 보호책임자 구분, 부서, 성명, 연락처, 전자우편
구분	부서	성명	연락처
개인정보 보호책임자	행정안전부 정책기획관	정창성	044-205-1400
개인정보 보호 분야별 책임자	행정안전부 행정서비스통합추진단 정부포털운영팀	박경주	044-205-6460
개인정보 보호 분야별 담당자	행정안전부 행정서비스통합추진단 정부포털운영팀	김병철	044-205-6458
(Fax. 044-204-8983)
steffano@korea.kr
② 정보주체께서는 정부24의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 분야별 담당부서로 문의하실 수 있습니다. 정부24는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
제13조 개인정보의 열람청구를 접수·처리하는 부서
① 정보주체는 「개인정보 보호법」 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있으며, 정부24는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력 하겠습니다.
‣ 개인정보 열람청구 분야별 접수·처리 부서
분야별 담당부서, 담당자, 연락처, 전자우편, 팩스번호
분야별 담당부서	담당자	연락처	전자우편	팩스번호
행정안전부 행정서비스통합추진단 정부포털운영팀	김병철	044-205-6458	steffano@korea.kr	044-204-8983
② 정보주체께서는 제1항의 열람청구 접수·처리부서 이외에 ‘개인정보 포털’ 누리집(www.privacy.go.kr)을 통하여서도 개인정보 열람청구를 하실 수 있습니다.
※ 개인정보 포털→ 민원서비스 → 정보주체 권리행사 → 개인정보 열람 등 요구(본인인증 필요)
제14조 정보주체의 권익침해에 대한 구제방법
① 정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원, 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
가. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)
나. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
다. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)
라. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)
② 「개인정보 보호법」 제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.
‣ 중앙행정심판위원회 : (국번없이) 110 (www.simpan.go.kr)
제15조 개인정보 관리수준진단 결과
① 정부24는 정보주체의 개인정보를 안전하게 관리하기 위해 「개인정보 보호법」 제11조에 따라 매년 개인정보보호위원회에서 실시하는 “공공기관 개인정보 관리수준진단”을 받고 있습니다.
② 정부24는 2022년도 개인정보 관리수준진단 평가에서 ‘S’ 등급을 획득하였습니다.
제16조 영상정보처리기기 운영·관리에 관한 사항
정부24는 영상정보처리기기를 운영하지 않아 해당사항이 없습니다.
제17조 개인정보 처리방침의 변경에 관한 사항
① 본 방침은 2024. 5. 2. 부터 적용됩니다.
② 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.
2024. 1. 2. ~ 2024. 5. 1.
2023. 9. 26. ~ 2024. 1. 1.
2023. 9. 18. ~ 2023. 9. 25.
2023. 9. 4. ~ 2023. 9. 17.
2023. 6. 9. ~ 2023. 9. 3.
2022. 8. 25. ~ 2023. 6. 8.
2021. 10. 6. ~ 2022. 8. 24.
2021. 7. 3. ~ 2021. 10. 5.
2021. 5. 28. ~ 2021. 7. 2.
2021. 4. 22. ~ 2021. 5. 27.
2021. 1. 28. ~ 2021. 4. 21.
2020. 11. 09. ~ 2021. 1. 27.
2020. 7. 23. ~ 2020. 11. 8.
2020. 7. 16. ~ 2020. 7. 22.
2020. 7. 2. ~ 2020. 7. 15.
2020. 5. 29. ~ 2020. 7. 1.
2020. 2. 20. ~ 2020. 5. 28.
2019. 7. 12. ~ 2020. 2. 19.
2019. 4. 12. ~ 2019. 7. 11.
2018. 8. 2. ~ 2019. 4. 11.
2018. 3. 9. ~ 2018. 8. 1.
2017. 4. 1. ~ 2018. 3. 8.

`}
        </ContentText>
      </ScrollView>
      <ButtonSection>
        <DropShadow
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2,
          }}>
          <Button
            width={width}
            active={activeButton || agreePrivacy}
            disabled={!(activeButton || agreePrivacy)}
            onPress={() => {
              dispatch(
                setCert({
                  certType,
                  agreeCert,
                  agreeCopyright,
                  agreeGov24,
                  agreePrivacy: true,
                }),
              );
              navigation.goBack();
              setTimeout(() => {
                SheetManager.show('cert2', {
                  payload: {
                    index : props.route.params.index,
                    navigation: navigation,
                  },
                });
              }, 300);
            }}>
            <ButtonText active={activeButton || agreePrivacy}>
            동의 후 인증하기
            </ButtonText>
          </Button>
        </DropShadow>
      </ButtonSection>
    </Container>
  );
};

export default Privacy3;
