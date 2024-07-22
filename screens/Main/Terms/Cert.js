// Note: 전자증명서 서비스 이용약관

import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  BackHandler,
} from 'react-native';
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

const Cert = props => {
  const navigation = props.navigation;
  ////console.log('navigation2', navigation);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [activeButton, setActiveButton] = useState(false);
  const { certType, agreeCert, agreePrivacy, agreeThird } = useSelector(
    state => state.cert.value,
  );

  const handleBackPress = () => {
    navigation.goBack();
    setTimeout(() => {
      SheetManager.show('cert', {
        payload: {
          index: props.route.params.index,
          navigation: navigation,
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
              SheetManager.show('cert', {
                payload: {
                  index: props.route.params.index,
                  navigation: navigation,
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
        onScroll={({ nativeEvent }) => {
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
        <Title>(필수) 전자증명서 서비스 이용약관</Title>
        <SubTitle>[필수] 전자증명서 서비스 이용약관 동의서</SubTitle>
        <ContentText>
          {`(필수) 전자증명서 서비스 이용 약관
개인정보 수집 및 이용 동의
본인은 행정안전부의 “전자증명서 발급·유통 시스템”과 연계되어 제공되는 간편인증서비스(이하
‘서비스’라 합니다)를 이용하기 위해, 다음과 같이 행정안전부가 본인의 개인정보를 수집·이용하고,
개인정보의 취급을 위탁하는 것에 동의합니다.
수집항목
- 필수항목 : 성명, 휴대폰번호, 주민등록번호(또는 외국인등록번호)
- 동의 시 자동 수집되는 항목 : CI(연계정보), 이용자가 선택한 인증사업자
이용목적
- 전자증명서 발급 신청을 위하여 이용자가 웹사이트 또는 어플리케이션에 입력한 본인확인정보
의 정확성 여부 확인(본인확인서비스 제공)
- 해당 웹사이트 또는 어플리케이션에 연계정보(CI) 전송
개인정보의 보유기간 및 이용기간
- 본인인증 및 전자서명 과정이 종료될 때까지 보유 및 이용. 다만, 관련 법령에서 정한 보유기간
이 있는 경우 해당 기간까지 보유
이용자는 위의 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다. 그러나, 동의를 거부
할 경우 전자증명서 발급 신청 서비스 이용이 제한될 수 있습니다.
행정안전부장관 귀중
제3자 정보제공 동의
행정안전부는 정부24 비회원 이용자의 전자증명서 발급 신청을 위하여 이용자에게 인증사업자 등
의 간편인증(민간인증서) 서비스를 연계하여 제공하고 있습니다. 행정안전부는 정보주체의 동의,
법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 이용자의 개인
정보를 제3자에게 제공합니다.
개인정보를 제공받는 자
- 이용자가 선택한 인증사업자 : 카카오, 국민은행, 페이코, 통신사PASS, 삼성PASS, 네이버, 신한은
행, 토스(TOSS), 뱅크샐러드, 하나은행, 농협은행
- 본인확인기관
개인정보를 제공받는 자의 개인정보 이용목적
- 간편인증 시 본인인증 및 전자서명
제공하는 개인정보 항목
- 성명, 주민등록번호(또는 외국인등록번호), 휴대폰번호
개인정보를 제공받는 자의 개인정보 보유 및 이용기간
- 본인인증 및 전자서명 과정이 종료될 때까지 보유 및 이용
이용자는 위의 개인정보 제3자 제공에 대한 동의를 거부할 권리가 있습니다. 그러나, 동의를 거부
할 경우 전자증명서 발급 신청 서비스 이용이 제한될 수 있습니다.
고유식별정보 처리 동의
본인은 행정안전부의 “전자증명서 발급·유통 시스템”과 연계되어 제공되는 간편인증서비스(이하
‘서비스’라 합니다)를 이용하기 위해, 다음과 같이 아래의 ‘고유식별정보를 제공받는 자’가 본인의
고유식별정보를 처리하는 것에 동의합니다.
고유식별정보를 제공받는 자
- 행정안전부
- 이용자가 선택한 인증사업자 : 카카오, 국민은행, 페이코, 통신사PASS, 삼성PASS, 네이버, 신한은
행, 토스(TOSS), 뱅크샐러드, 하나은행, 농협은행
- 본인확인기관
고유식별정보를 제공받는 자의 이용목적
- 연계정보(CI) 생성 (본인확인인증)
- 서비스 제공 및 이용기록(log) 관리
고유식별정보
- 본인확인 인증 시 수집된 이용자의 주민등록번호 또는 외국인등록번호
고유식별정보를 제공받는자의 개인정보 보유 및 이용기간
- 연계정보(CI) 생성(본인확인인증) 및 서비스 제공 과정이 종료될 때까지
이용자는 위의 고유식별정보처리에 대한 동의를 거부할 권리가 있습니다. 그러나, 동의를 거부할
경우 전자증명서 발급 신청 서비스 이용이 제한될 수 있습니다.
간편인증서비스 이용약관(안)
제1조(목적)
본 약관은 행정안전부의 “전자증명서 발급·유통 시스템(이하 ‘시스템’)”과 연계되어 제공되는 간편
인증서비스(이하 ‘간편인증서비스’)의 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합
니다.
제2조(용어의 정의)
본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
1. 이용자 : 본 약관에 따라 간편인증서비스를 받는 자로 본 약관에 동의하고 정상적으로 인증수
단을 발급받아 이용할 수 있는 권한을 부여받은 개인
2. CI(연계정보) : 특정 개인의 식별을 위한 고유한 범용값
3. 인증사업자 : 카카오, 국민은행, 페이코, 통신사PASS, 삼성PASS, 네이버, 신한은행, 토스, 하나은
행, 뱅크샐러드, 농협은행 등 간편인증서비스를 제공하는 사업자
4. 연계 사이트 : 간편인증서비스 이용기관 협약에 따라 간편인증서비스와 연계되어 있는 사이트
5. 본인확인 기관 : 이용자 본인을 확인하는 방법을 제공하는 자로서 정보통신망법 제23조의3 제
1항에 따라 방송통신위원회로부터 본인확인 기관의 지정을 받은 자
이 약관에서 정의하지 않은 용어는 개별서비스에 대한 별도 약관 및 이용 규정에서 정의하거나
일반적으로 통용되는 개념에 의합니다.
제3조(약관의 효력과 변경)
1. 본 약관은 간편인증서비스 이용 화면에 게시되고, 이용자가 동의 버튼을 확인하면서 그 효력이
발생합니다.
2. 본 약관을 변경하는 경우, 적용 일자와 변경사항을 명시하여 적용 일자 7일 전에 「전자문서지
갑 포털(dpaper.kr)의 공지사항 게시판」을 통해 공지합니다.
제4조(약관 외 준칙)
본 약관에 명시되지 않는 사항이 관계 법령에 규정되어 있는 경우 그 규정을 따르며, 그렇지 않
으면 일반적인 관례에 따릅니다.
제5조(이용계약의 성립 및 취소 등)
1. 이용계약은 이용자가 시스템 또는 간편인증서비스에서 제공하는 소정의 양식에서 요구하는 사
항을 입력하고, 본 약관에 대한 동의를 완료한 경우에 성립됩니다.
2. 행정안전부장관은 다음 각 호에 해당하는 이용계약에 대하여는 계약을 취소할 수 있습니다.
1) 다른 사람의 명의를 사용하여 신청하였을 때
2) 이용계약 신청서의 내용을 허위로 기재하였거나 신청하였을 때
3) 사회의 안녕질서 혹은 미풍양속을 저해할 목적으로 신청하였을 때
4) 다른 사람의 간편인증서비스 이용을 방해하거나 그 정보를 도용하는 등의 행위를 하였을 때
5) 간편인증서비스를 이용하여 법령과 본 약관이 금지하는 행위를 하는 경우
6) 기타 간편인증서비스에서 정한 이용신청요건이 미비 되었을 때
3. 행정안전부장관은 다음 각 호에 해당하는 경우 그 사유가 해소될 때까지 이용계약 성립을 유
보할 수 있습니다.
1) 기술상의 장애사유로 인한 간편인증서비스 중단의 경우(시스템 관리자의 고의·과실 없는 디스
크 장애, 시스템 다운 등)
2) 전기통신사업법에 의한 기간통신사업자가 전기통신 서비스를 중지하는 경우
3) 전시, 사변, 천재지변 또는 이에 준하는 국가 비상사태가 발생하거나 발생할 우려가 있는 경우
4) 긴급한 시스템 점검, 증설 및 교체설비의 보수 등을 위하여 부득이한 경우
5) 간편인증서비스 설비의 장애 또는 간편인증서비스 이용 요청의 폭주 등 기타 간편인증서비스
연계 제공이 원활할 수 없는 사유가 발생한 경우
제6조(이용자 정보사용에 대한 동의)
1. 시스템은 다른 법령에 특별한 규정이 있는 경우를 제외하고 이용자가 간편인증서비스에 동의
하여 제공하는 정보에 한하여 최소한으로 수집합니다.
2. 시스템은 간편인증서비스 제공과 관련해서 수집된 이용자의 신상정보를 본인의 승낙 없이 제3
자에게 누설, 배포하지 않습니다. 단, 전기통신 기본법 등 법률의 규정에 따라 국가기관의 요구가
있는 경우, 범죄에 대한 수사상의 목적이 있거나 정보통신윤리 위원회의 요청이 있는 경우 또는
기타 관계 법령에서 정한 절차에 따른 요청이 있는 경우, 이용자가 시스템에 제공한 개인정보를
스스로 공개한 경우에는 그러하지 않습니다.
제7조(이용자의 정보보안)
1. 이용자는 전자증명서 발급 신청 시점부터 간편인증서비스 이용 종료 시까지 입력한 정보의 비
밀을 유지할 책임이 있으며, 이용자의 인증수단을 사용하여 발생하는 모든 결과에 대한 책임은
이용자 본인에게 있습니다.
2. 인증수단에 관한 모든 관리의 책임은 이용자에게 있으며, 이용자의 인증수단이 부정하게 사용
되었다는 사실을 발견한 경우에는 “전자문서지갑 포털(dpaper.kr) 개인정보 처리방침” 제14조에
따라 피해구제 등을 요청하시기 바랍니다.
3. 이용자는 간편인증서비스의 이용 종료 시 정확히 접속을 종료하도록 해야 하며, 미확인으로 인
한 개인정보의 유·노출 등으로 인한 각종 피해에 대하여 행정안전부는 책임지지 않습니다.
제8조(간편인증서비스 이용시간)
1. 간편인증서비스 이용시간은 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간
을 원칙으로 합니다.
2. 제1항의 이용시간은 정기점검 등의 필요로 인하여 간편인증서비스 이용이 제한되는 날 또는
시간은 예외로 합니다.
제9조(간편인증서비스의 중지 및 정보의 저장과 사용)
1. 시스템에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 국가의 비상사태, 정전,
시스템의 관리 범위 외의 간편인증서비스 관련 설비 장애 및 기타 불가항력에 의하여 보관되지
못하였거나 삭제된 경우, 전송되지 못한 경우 및 기타 통신 데이터의 손실이 있으면 행정안전부
는 관련 책임을 부담하지 아니합니다.
2. 시스템이 정상적인 간편인증서비스 연계 제공의 어려움으로 인하여 일시적으로 간편인증서비
스 연계를 중지해야 하는 경우 사전 또는 지체 없이 공지 후 간편인증서비스 연계 제공을 중지할
수 있으며, 이 기간동안 공지내용을 인지하지 못한 데 대하여 행정안전부는 책임지지 않습니다.
단, 부득이한 경우 사전 공지 기간이 단축되거나 생략될 수 있습니다. 또한, 위 간편인증서비스
연계 중지 때문에 통신 메시지 등의 내용이 보관되지 못하였거나 삭제된 경우, 전송되지 못한 경
우, 기타 통신 데이터의 손실이 있는 경우에 대하여도 행정안전부는 책임을 부담하지 아니합니다.
3. 시스템의 사정으로 간편인증서비스를 영구적으로 중단하여야 하는 경우에는 제2항에 따릅니다.
4. 시스템은 사전 고지 후 간편인증서비스를 일시적으로 수정, 변경 및 중단할 수 있으며, 이에
대하여 이용자 또는 제3자에게 어떠한 책임도 부담하지 아니합니다.
5. 시스템은 이용자가 본 약관의 내용에 위배되는 행동을 한 경우, 임의로 간편인증서비스 사용을
제한 및 중지할 수 있습니다. 이 경우 시스템은 위 이용자의 접속을 금지할 수 있습니다.
제10조(연계사이트 이용)
1. 간편인증서비스 이용자는 연계 사이트에 대해 원활하게 이용할 수 있습니다.
2. 연계사이트는 행정안전부의 간편인증서비스 연계 관련 정책의 변경, 개별 사이트의 사정에 따
라 추가 또는 제외될 수 있으며, 해당 변경 사항은 시스템 게시판을 통해 이용자에게 공지됩니다.
3. 연계사이트 중 일부 사이트에서는 특정 서비스를 제공하기 위해 이용자에게 별도 또는 추가적
인 가입절차 및 정보입력을 요청할 수 있으며, 이용자가 이러한 특정 서비스를 이용할 경우 해당
사이트 또는 서비스의 이용 약관, 규정 또는 세칙 등이 본 약관보다 우선 적용됩니다.
4. 이용자의 인증수단에 관한 관리책임은 이용자 본인에게 있으며 “개인정보 제3자 제공 동의”에
정의된 제공 대상 이외의 대상에게 ID 및 인증수단을 알려주거나 이용하게 하여서는 아니 됩니다.
5. 이용자가 자신의 인증수단을 도용당하거나 “개인정보 제3자 제공 동의”에 정의된 제공 대상 이
외의 대상이 사용하고 있음을 인지한 경우에는 즉시 관리자에게 통보하고 그 안내에 따라야 합니
다.
6. 행정안전부는 행정안전부의 귀책사유 없이 이용자가 자신의 인증수단을 도용당한 데 따른 손
해에 대해서는 법적 책임을 부담하지 않습니다.
제11조(행정안전부의 의무 등)
1. 행정안전부는 법령과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적,
안정적으로 간편인증서비스를 연계하여 이용자에게 제공하기 위해 노력하여야 합니다.
2. 행정안전부는 약관 변경사항의 공지 또는 이용자에 대한 통지가 필요한 경우 해당 절차를 성
실히 준수하여 수행하여야 합니다.
3. 행정안전부는 이용자가 본 약관을 위배했다고 판단되면 간편인증서비스와 관련된 모든 정보를
이용자의 동의 없이 삭제할 수 있습니다.
제12조(간편인증서비스 이용제한 등)
1. 이용자가 제공하는 정보의 내용이 허위인 것으로 판명되거나, 그러하다고 의심할 만한 합리적
인 정황이 발견되면 행정안전부는 이용자의 간편인증서비스 사용을 일부 또는 전부 중지시킬 수
있으며, 이로 인하여 발생하는 불이익에 대한 책임을 부담하지 아니합니다.
2. 이용자가 간편인증서비스 또는 기타 다른 수단에 의하여 게시, 전송 또는 입수한 모든 형태의
정보에 대하여는 이용자가 모든 책임을 부담하며 행정안전부는 어떠한 책임도 부담하지 아니합니
다.
3. 행정안전부는 시스템 자체가 제공한 것이 아닌 서비스의 내용상의 정확성, 완전성 및 질에 대
하여 보장하지 않습니다. 따라서 행정안전부는 이용자가 위 서비스를 이용함으로 인하여 입게 된
모든 종류의 손실이나 손해에 대하여 책임을 부담하지 아니합니다.
4. 다음 항목에 해당하는 이용자의 행위가 적발되는 경우 사전 예고없이 간편인증서비스의 이용
이 제한 또는 중지될 수 있습니다.
1) 타인의 인증수단을 도용하는 행위
2) 간편인증서비스를 통하여 전송된 내용의 출처를 위장하는 행위
3) 다른 이용자의 개인정보를 수집 또는 저장하는 행위
4) 자신의 인증수단을 제3자에게 이용하게 하는 행위
5. 이용자는 행정안전부의 사전 승낙 없이 간편인증서비스를 이용하여 어떠한 영리 행위도 할 수
없습니다.
제13조(간편인증서비스 등의 소유권)
1. 행정안전부가 연계하여 제공하는 간편인증서비스, 그에 필요한 소프트웨어, 이미지, 마크, 로고,
디자인, 서비스명칭, 정보 및 상표 등과 관련된 지적 재산권 및 기타 권리는 각 권리의 내용에 따
라 간편인증서비스를 연계하여 제공하는 행정안전부 또는 인증사업자, 본인확인 기관에게 있습니
다.
2. 이용자는 행정안전부가 명시적으로 승인한 경우를 제외하고는 전항 소정의 각 재산에 대한 전
부 또는 일부의 수정, 대여, 대출, 판매, 배포, 제작, 양도, 재 라이센스, 담보권 설정 행위, 상업적
이용 행위를 할 수 없으며, 제3자로 하여금 이와 같은 행위를 하도록 할 수 없습니다.
제14조(양도금지)
이용자는 간편인증서비스의 이용 권한, 기타 지위를 타인에게 양도 및 증여할 수 없으며, 이를 담
보로 제공할 수 없습니다.
제15조(손해배상)
무료로 제공되는 간편인증서비스와 관련하여 이용자에게 어떠한 손해가 발생하더라도 행정안전부
는 고의로 행한 범죄행위를 제외하고 이에 대하여 책임을 부담하지 아니합니다.
제16조(면책조항)
1. 행정안전부는 간편인증서비스에 표출된 어떠한 의견이나 정보에 대하여 확신을 주거나 이를
대표할 의무가 없으며 이용자나 제3자에 의해 표출된 의견을 승인 또는 반대하거나 수정하지 않
습니다. 행정안전부는 어떠한 경우라도 이용자가 간편인증서비스에 담긴 정보에 의존해 얻은 이
득이나 입은 손해에 대한 책임이 없습니다.
2. 행정안전부는 이용자 간 또는 이용자와 제3자 간에 간편인증서비스를 매개로 하여 물품거래
혹은 금전적인 거래 등과 관련하여 어떠한 책임도 부담하지 아니하고, 이용자가 간편인증서비스
의 이용과 관련하여 기대하는 이익에 관하여 책임을 부담하지 않습니다.
제17조(관할법원)
행정안전부와 이용자 간에 발생한 간편인증서비스 연계 이용에 관한 분쟁에 대하여는 대한민국
법을 적용하며, 본 분쟁으로 인한 소는 대한민국의 법원에 제기합니다.
부칙 1. (시행일) 본 약관은 2023년 09월 01일부터 시행됩니다.
* 본 약관에 대한 저작권은 행정안전부에 귀속하며 무단 복제, 배포, 전송, 기타 저작권 침해행위
를 엄금합니다.`}
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
            active={activeButton || agreeCert}
            disabled={!(activeButton || agreeCert)}
            onPress={() => {
              // 동의하기 버튼 클릭 시 redux에 저장
              dispatch(
                setCert({
                  certType,
                  agreePrivacy,
                  agreeCert: true,
                }),
              );

              // 채팅방으로 이동
              navigation.goBack();

              // 전자증명서 서비스 이용약관 동의 후 인증 화면으로 이동
              setTimeout(() => {
                SheetManager.show('cert', {
                  payload: {
                    index: props.route.params.index,
                    navigation: navigation,
                  },
                });
              }, 300);
            }}>
            <ButtonText active={activeButton || agreeCert}>동의 후 인증하기</ButtonText>
          </Button>
        </DropShadow>
      </ButtonSection>
    </Container>
  );
};

export default Cert;
