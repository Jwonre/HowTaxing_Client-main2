// Note: 전자증명서 서비스 이용약관

import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  BackHandler
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components';
import CloseIcon from '../../../assets/icons/close_button.svg';
import getFontSize from '../../../utils/getFontSize';
import DropShadow from 'react-native-drop-shadow';
import {SheetManager} from 'react-native-actions-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {setCert} from '../../../redux/certSlice';

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

const Cert = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const [activeButton, setActiveButton] = useState(false);
  const {certType, agreeCert, agreePrivacy} = useSelector(
    state => state.cert.value,
  );

  const handleBackPress = () => {
    navigation.goBack();
    setTimeout(() => {
      SheetManager.show('cert', {
        payload: {
          index : props.route.params.index
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
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          onPress={() => {
            navigation.goBack();
            setTimeout(() => {
              SheetManager.show('cert', {
                payload: {
                  index : props.route.params.index
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 80}}
        onScroll={({nativeEvent}) => {
          // 하단 스크롤 시 버튼 활성화
          if (
            nativeEvent.contentOffset.y +
              nativeEvent.layoutMeasurement.height >=
            nativeEvent.contentSize.height - 1
          ) {
            setActiveButton(true);
          } else {
            setActiveButton(false);
          }
        }}>
        <Title>(필수) 한국부동산원 주택청약서비스 청약홈(이하 '청약홈')개인정보처리방침 </Title>
        <SubTitle>[필수] 한국부동산원 주택청약서비스 청약홈(이하 '청약홈') 개인정보처리방침 </SubTitle>
        <ContentText>
          {`제1조(개인정보의 처리 목적)
청약홈은 주택청약 서비스를 제공하기 위하여 최소한의 개인정보를 처리하고 있습니다. 처리하고 있는 개인정보는 다음의 서비스 제공 목적 이외의 용도로는 이용되지 않으며, 이용목적이 변경될 경우에는 개인정보보호법에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

개인정보의 처리 목적이 나와있는 테이블입니다.
개인정보파일명	처리 목적
청약신청 및 자격확인정보	청약신청, 조회, 취소, 주택소유 확인 등
청약당첨 정보	당첨자 조회
입주자저축 가입정보	입주자저축 순위 확인
사업주체 담당자 정보	청약업무 요청 및 전산추첨 입회
제2조(처리하는 개인정보의 항목)
① 청약홈은 주택청약 서비스 제공을 위하여 아래의 개인정보를 처리하고 있습니다.

개인정보를 처리항목이 나와있는 테이블입니다.
개인정보파일명	필수항목
청약신청 및 자격확인정보	* 아파트
(신청자) 성명, 주민등록(외국인)번호, 주소, 전화번호, 입주자저축정보(계좌개설은행, 주민등록(외국인)번호, 예금주명, 계좌번호, 예금종목), 주택소유여부(성명, 주민등록(외국인)번호, 주소)
(세대원) 성명, 주민등록(외국인)번호
* 오피스텔/도시형생활주택
성명, 주민등록(외국인)번호, 주소, 전화번호, 계좌번호

* 공공지원민간임대
(신청자) 성명, 주민등록(외국인)번호, 주소, 전화번호
(세대원) 성명, 주민등록(외국인)번호
청약당첨 정보	* 아파트
(당첨자) 성명, 주민등록(외국인)번호, 당첨유형, 당첨순위, 입주자저축정보(계좌개설은행, 주민등록(외국인)번호, 예금주명, 계좌번호, 예금종목), (세대원)성명, 주민등록(외국인)번호
* 오피스텔/도시형생활주택
(당첨자) 성명, 주민등록(외국인)번호, 전화번호, 주소, 계좌번호
입주자저축 가입정보	계좌개설은행, 주민등록(외국인)번호, 예금주명, 계좌번호, 예금종목
사업주체 담당자 정보	성명, 생년월일, 전화번호
② 기타 인터넷 서비스 이용과정에서 아래의 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.

- IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록 등

제3조(개인정보의 수집방법)
청약홈은 관계법령에 근거하여 주택청약 서비스 이용 고객의 동의 및 서비스 이용신청시 고객 동의를 통해 직접 수집하는 방법으로 개인정보를 수집하고 있습니다.

제4조(고유식별정보의 수집 및 이용)
청약홈은 주택청약 서비스 제공 및 업무수행을 위하여 다음과 같이 고유식별정보를 수집·이용하고 있습니다.

고유식별정보 수집·이용항목이 나와있는 테이블입니다.
개인정보파일명	항목	처리근거
청약신청 및 자격확인정보	주민등록번호,외국인등록번호,(세대원)주민등록번호,(세대원)외국인등록번호	주택법 제55조, 제56조, 제88조, 주택법시행령 제95조, 주택공급에 관한 규칙 제24조, 제50조, 제52조, 제54조, 제58조, 민간임대주택에 관한 특별법 제42조의2, 제42조의3, 민간임대주택에 관한 특별법 시행규칙 제14조의8, 제14조의10
청약당첨 정보	주민등록번호,외국인등록번호,(세대원)주민등록번호,(세대원)외국인등록번호	주택법 제54조 및 제55조, 주택법시행령 제95조, 주택공급에 관한 규칙 제57조
입주자저축가입정보	주민등록번호,외국인등록번호	주택공급에 관한 규칙 제7조의2
사업주체 담당자 정보	-	-
제5조(개인정보의 처리 및 보유기간)
청약홈은 제1조에서 정한 처리목적을 위하여 관련 법령 또는 개인정보 수집시 동의받을 내역에 따라 개인정보를 처리 및 보유하고 있습니다.

개인정보 처리 및 보유항목이 나와있는 테이블입니다.
개인정보파일명	유형	항목	보유기간	근거법령
청약신청 및 자격확인 정보	APT	청약신청내역	10년	「주택공급에 관한 규칙」제24조제2항
주택소유, 세대원	1년	-
민간임대주택(舊 뉴스테이), 공공지원민간임대주택, 도시형생활주택, 오피스텔	청약신청내역	6개월	-
청약당첨 정보	APT 및 조합 당첨자	당첨자 내역	영구	「주택공급에 관한 규칙」제57조제3항
입주자저축가입정보	APT	순위확인서	1년	-
계좌내역	영구	-
사업주체 담당자 정보	APT, 민간임대주택(舊 뉴스테이), 공공지원민간임대주택, 도시형생활주택, 오피스텔, 조합동호추첨	성명, 생년월일,전화번호	1년	-
좀 더 상세한 한국부동산원 개인정보파일 등록사항 공개는 개인정보보호 종합지원포털(http://www.privacy.go.kr/) → 개인정보민원 → 개인정보의 열람 등 요구 → 개인정보파일 목록 검색 → 기관명에 "한국부동산원" 입력 후 조회 가능합니다.

* 한국부동산원에서 수집, 이용 중인 개인정보는 목적 내 최소화하여 수집·운영 중입니다.

제6조(개인정보의 파기 절차 및 방법)
① 청약홈은 원칙적으로 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 개인정보관리책임자의 책임 하에 지체없이 파기합니다.
② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성 되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는 해당 개인정보를 다른 개인정보와 분리하여 엄격히 별도 저장·관리합니다.
③ 파기절차 및 방법은 다음과 같습니다.
1. 파기절차 : 보유기간 경과 등 파기사유가 발생한 개인정보는 자동으로 파기하거나 개인정보관리책임자의 승인을 거쳐 파기
2. 파기방법 : 관련 프로그램을 이용해 복구 또는 재생되지 않도록 다음과 같이 완전삭제
가. 전자적 파일 : 일부 파기 시에는 해당 개인정보를 삭제한 후 복구·재생이 되지 않도록 관리 및 감독, 전체 파기 시에는 초기화, 덮어쓰기, 전용소자장비 이용 등의 방법으로 파기
나. 기타 기록물, 인쇄물 서면 등 비전자적 파일 : 일부 파기 시에는 해당 개인정보를 마스킹, 천공 등을 통해 삭제, 전체 파기 시에는 파쇄 또는 소각 등의 방법으로 파기
제7조(개인정보의 제3자 제공)
청약홈은 주택청약 서비스 이용 정보주체의 개인정보를 「주택공급에 관한 규칙」제57조 내에서만 처리하고 정보주체의 사전 동의 없이 동 범위를 초과하여 이용하거나 원칙적으로 외부에 공개 또는 제3자에게 제공하지 않습니다.

다만, 아래의 경우는 예외로 합니다.

1. 정보주체가 사전에 해당 항목의 개인정보 제공에 대하여 동의한 경우
2. 다른 법률의 규정이 있거나 범죄수사·공소제기 및 유지, 재판업무 수행을 위한 수사기관 또는 법원의 요구가 있는 경우
개인정보를 제공받는 자 및 구분, 제공 항목, 목적, 보유기간이 나와있는 테이블입니다.
제공받는 자	개인정보파일명	구분	제공 항목	제공 목적	보유기간
사업주체	청약신청 및 자격확인정보
청약당첨정보
입주자저축가입정보	APT	성명, 주민등록번호(외국인등록번호), 주소, 전화번호, 입주자저축정보(계좌개설은행, 계좌번호, 예금종목), 주택소유여부(성명, 주민등록(외국인)번호), *(세대원) 성명, 주민등록(외국인)번호	사업주체의 당첨자적격 검증, 입주자(임차인) 계약 체결	5년
민간임대주택(舊뉴스테이)	성명, 주민등록번호(외국인등록번호), 주소, 전화번호	3개월
공공지원 민간임대주택	성명, 주민등록번호(외국인등록번호), 주소, 전화번호	3개월
도시형생활주택	성명, 주민등록번호(외국인등록번호), 주소, 전화번호	3개월
오피스텔	성명, 생년월일 및 성별, 주소, 전화번호	3개월
행정안전부	청약신청 및 자격확인정보	-	성명, 주민등록번호(외국인등록번호)	세대구성원 정보 확인	5년
국토교통부	청약신청 및 자격확인정보	-	성명, 주민등록번호(외국인등록번호)	신청자 및 세대구성원의 주택소유 조회	12개월
입주자저축 취급기관	입주자저축가입정보	-	성명, 주민등록번호(외국인등록번호)	신청자의 입주자저축 가입정보	5년
청약신청금 취급기관	청약신청 및 자격확인정보
청약당첨정보	-	성명, 생년월일, 계좌번호, 주소(현 거주지), 전화번호	청약신청금 출금 및 환불처리	3개월
개인정보 제3자 제공동의 내역
제8조(개인정보처리의 위탁)
① 청약홈은 주택청약 서비스 관련, 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.

개인정보 수탁업체, 위탁 업무 내용, 개인정보의 보유 및 이용기간이 나와있는 테이블입니다.
수탁업체	업무내용	위탁기간
(주)엠넷정보통신	
1. 청약신청 업무
2. 당첨자 선정
3. 입주자저축 순위 확인 업무
4. 사업주체 담당자 관리업무
5. 은행담당자 관리업무
6. 청약통장 계좌관리 업무
위탁계약 종료시 까지
케이엘정보통신	
1. 청약 전산시스템 HW유지보수
위탁계약 종료시 까지
② 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.

제9조(개인정보의 안전성 확보조치)
한국부동산원 주택청약 서비스는 개인정보의 안전성 확보를 위해 다음과 같은 안전성 확보조치를 취하고 있습니다.

1. 관리적 조치 : 개인정보취급자 최소화 및 정기적 교육, 개인정보의 안전한 처리를 위한 내부 관리계획의 수립ㆍ시행
2. 기술적 조치 : 개인정보처리시스템 접근통제 및 접근권한 관리, 암호화 알고리즘 등의 적용으로 고객정보의 보관 및 송수신 네트워크의 안정성 확보, 개인정보 침해사고 발생에 대응하기 위한 접속기록의 보관 및 위조᛫변조 방지를 위한 조치, 개인정보에 대한 보안프로그램의 설치 및 갱신, 고객 컴퓨터의 부정사용자의 접근을 차단하기 위한 접근통제장치의 설치 및 운영, 키보드 입력값에 대한 해킹방지를 위한 키보드보안장치 설치 및 운영
3. 물리적 조치 : 전산실 및 자료보관실 접근통제, 장비 및 자료 반출입 통제
제10조(개인정보에 대한 권리 및 행사방법에 관한 사항)
① 정보주체와 법정대리인은 한국부동산원 주택청약 서비스와 관련하여 보유하고 있는 개인정보의 열람, 정정·삭제, 처리정지를 서면, 전화, 전자우편, FAX, 인터넷 등을 통하여 청구하실 수 있습니다. 다만 다음에 해당하는 경우에는 개인정보의 열람, 정정·삭제, 처리정지가 제한될 수 있습니다.
1. 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위해 불가피한 경우
2. 다른 사람의 생명·신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우
② 정보주체의 권리행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있으며, 이 경우 개인정보보호위원회 개인정보보호지침 별지2 서식에 따른 위임장을 제출하셔야 합니다.
③ 한국부동산원 주택청약 서비스와 관련하여 보유하고 있는 개인정보에 대해 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우, 정정 또는 삭제를 완료할 때까지 해당 개인정보를 이용하거나 제공하지 않습니다.
④ 열람, 정정·삭제, 처리정지 요구에 대한 처리절차는 다음과 같습니다.
1. 개인정보 열람요구
개인정보 열람요구 → 청구주체 확인 및 열람범위 확인 → 개인정보 열람, 제한사항 확인 → 열람결정 통지(또는 열람거부 통지) → (열람결정의 경우)열람

2. 개인정보 정정·삭제 요구
개인정보 정정·삭제 요구 → 청구주체 확인 및 처리범위 확인 → 개인정보 정정·삭제 확인 → 정정·삭제 결과 통지

3. 개인정보 처리정지 요구
개인정보 처리정지 요구 → 청구주체 확인 및 처리범위 확인 → 개인정보 처리정지 확인 → 처리정지 결과 통지

4. 개인정보의 열람 등 청구를 접수·처리하는 부서
열람, 정정·삭제, 처리정지 요구에 대한 접수 및 처리하는 부서는 다음과 같습니다.

청약관리처 청약운영부 : 02)2187-4062
주소 : (우)06225 서울 강남구 언주로79길 13 한국부동산원 서울사무소

한국부동산원 고객센터 : 1644 - 7445 (평일 09:00~17:30)
⑤ 열람, 정정·삭제, 처리정지 요구에 대한 처리결과에 대해 불만이나 이의제기 등 불복청구 또한 위 열람 등 청구를 접수·처리하는 부서로 하시면 됩니다. 그럼에도 불구하고 개인정보침해로 인한 피해를 구제 받기 원하시면 제13조(권익침해 구제방법)을 참조하십시오.
제11조(개인정보 자동수집장치의 설치·운영 및 그 거부에 관한 사항)
① 한국부동산원 주택청약 서비스는 청약센터에 대한 기본 설정정보를 보관하기 위해 쿠키(cookie) 등 개인정보 자동수집장치를 설치·운영하고 있습니다. 쿠키는 주택청약 서비스 제공을 위하여 청약센터를 운영하는데 이용되는 서버가 고객의 브라우저에 보내는 아주 작은 텍스트 파일로서 고객의 컴퓨터 하드디스크에 저장됩니다.
② 고객은 쿠키 이용에 대한 선택권을 가지고 있으며 웹브라우저 설정을 통해 쿠키의 이용을 허용하거나 거부할 수 있습니다. 단, 쿠키의 저장을 거부하는 옵션을 선택하는 경우 서비스 이용에 불편이 야기될 수 있습니다.
쿠키 설정 거부 방법

인터넷 익스플로어의 경우	웹 브라우저 상단의 “도구 > 인터넷옵션 > 개인정보 > 고급” → ‘허용’, ‘차단’, ‘사용자가 선택’ 설정 가능
크롬 익스플로어의 경우	웹 브라우저 상단 우측의 “설정 > 개인정보 > 콘텐츠 설정 > 쿠키” → ‘허용’, ‘브라우저 종료 시까지 유지’, ‘차단’ 설정 가능
제12조(개인정보보호책임자 등)
청약홈은 개인정보보호책임자를 아래와 같이 지정하여 운영하고 있습니다.

개인정보보호책임자 : ICT센터장 김기영
개인정보관리책임자 : 청약관리처 청약운영부장 장정완
개인정보관리담당자(개인정보 관련 고충사항 처리담당자)
청약관리처 청약운영부 양석민 : 02)2187-4062
주소 : (우)06225 서울 강남구 언주로79길 13 한국부동산원 서울사무소
제13조(권익침해 구제방법)
개인정보주체는 개인정보침해로 인한 피해를 구제 받기 위하여 개인정보 분쟁조정위원회, 한국인터넷진흥원 개인정보 침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 개인정보 침해로 인한 신고나 상담이 필요한 경우에는 아래 기관에 문의하시기 바랍니다.

개인정보 침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
개인정보 분쟁조정위원회 : 1833-6972 (www.kopico.go.kr)
대검찰청 사이버수사과 : (국번없이) 1301, cid@spo.go.kr, (www.spo.go.kr)
경찰청 사이버안전국 : (국번없이) 182 (cyberbureau.police.go.kr)
제14조(개인정보 처리방침 변경)
이 개인정보 처리방침은 2021.07.01. 부터 적용되며, 이전의 개인정보처리방침은 아래에서 확인할 수 있습니다.

제15조(과거 개인정보 처리 방침 관리)
이 개인정보 처리방침은 2021.07.01.
이 개인정보 처리방침은 2021.03.09.
이 개인정보 처리방침은 2020.07.01.
이 개인정보 처리방침은 2020.03.10. 
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
              // 동의하기 버튼 클릭 시 redux에 저장
              dispatch(
                setCert({
                  certType,
                  agreePrivacy: true, 
                  agreeCert,
                }),
              );

              // 채팅방으로 이동
              navigation.goBack();

              // 전자증명서 서비스 이용약관 동의 후 인증 화면으로 이동
              setTimeout(() => {
                SheetManager.show('cert', {
                  payload: {
                    index : props.route.params.index
                  },
                });
              }, 300);
            }}>
            <ButtonText active={activeButton || agreePrivacy}>동의 후 인증하기</ButtonText>
          </Button>
        </DropShadow>
      </ButtonSection>
    </Container>
  );
};

export default Cert;
