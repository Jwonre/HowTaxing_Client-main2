// Note: 전자증명서 서비스 이용약관

import {
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
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
  font-size: 20px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 30px;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  margin-top: 20px;
`;

const SubTitle = styled.Text`
  font-size: 18px;
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

const Cert3 = props => {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [activeButton, setActiveButton] = useState(true);
  const scrollViewRef = useRef(null);
  const [buttonText, setButtonText] = useState('끝으로 이동하기');
  const { certType, agreeCert, agreePrivacy, agreeLocation, agreeAge, agreeMarketing, agreeCopyright, agreeGov24 } = useSelector(
    state => state.cert.value,
  );

  const handleBackPress = () => {
    navigation.goBack();
    setTimeout(() => {
      SheetManager.show('cert2', {
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
              SheetManager.show('cert2', {
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
        ref={scrollViewRef}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}
        onScroll={({ nativeEvent }) => {
          if (
            nativeEvent.contentOffset.y +
            nativeEvent.layoutMeasurement.height >=
            nativeEvent.contentSize.height - 1
          ) {
            setButtonText('동의 후 인증하기');
          } else {
            setButtonText('끝으로 이동하기');

          }
        }}
        scrollEventThrottle={16} // 스크롤 이벤트 빈도 조절
      >
        <Title >하우택싱 서비스 이용약관</Title>
        <SubTitle >하우택싱 서비스 이용약관 동의서</SubTitle>
        <ContentText >
          {`하우택싱 서비스 이용약관

제1조 (목적)
1. 본 약관은 JS세무회계가 운영하는 인터넷 사이트 ‘하우택싱’(이하 ‘사이트’라 합니다) 및 모바일 애플리케이션 ‘하우택싱’을 통해 제공되는 전자상거래 서비스와 관련하여 당사자의 권리 의무 및 책임사항을 규정하는 것을 목적으로 합니다.
2. PC통신, 무선 등을 이용하는 전자상거래에 대하여도 그 성질에 반하지 않는 한 본 약관을 준용합니다.

제2조 (정의)
본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
1. ‘회사’라 함은, JS세무회계가 재화 또는 용역을 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 상품을 거래할 수 있도록 설정한 가상의 영업장을 운영하는 주체를 말하며, 아울러 ‘하우택싱’을 통해 제공되는 전자상거래 관련 서비스의 의미로도 사용합니다.
2. ‘오픈마켓’이라 함은, ‘회사’가 ‘사이트’를 통하여 ‘이용자’ 간 상품 거래가 이루어질 수 있는 사이버 거래장소를 온라인으로 제공하는 서비스 및 관련 부가 서비스 일체를 말합니다.
3. ‘모바일앱’이라 함은, ‘회사가 개발 및 운영을 담당하고, ’이용자’의 편의를 위하여 제공하는 모바일 애플리케이션을 말합니다.
4. ‘이용자’라 함은, ‘사이트’에 접속하여 ‘회사’의 이용약관에 따라 ‘회사가 제공하는 서비스를 받은 ‘회원’ 및 ‘비회원’을 말합니다.
5. ‘회원’이라 함은 ‘회사’에 개인정보를 제공하여 회원등록을 한 자로서，‘회사’로부터 서비스 제공에 관한 정보를 지속적으로 제공받으며, ‘회사’가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다. ‘회원’은 다시 ‘일반회원’과 ‘판매회원’으로 나뉩니다.
6. ‘비회원’이라 함은 ‘회원’으로 가입하지 않고 ‘회사가 제공하는 서비스를 이용하는 자를 말합니다.
7. ‘판매회원’이라 함은, 본 약관에 동의하고 ‘회사’와 서비스 이용계약을 체결한 자를 말하며, 주택 세금 계산 및 세무사, 법무사 중개와 같은 서비스를 판매할 의사로 ‘회사’가 제공하는 양식에 맞추어 등록한 이용자의 의미로도 사용합니다.
8. ‘일반회원’이라 함은, 상품을 구입할 의사를 ‘회사가 제공하는 양식에 맞추어 전달한 이용자를 말합니다.
9. ‘상품’이라 함은, ‘판매회원’이 ‘오픈마켓’을 통하여 판매하는 재화 및 용역 등 일체의 서비스를 말합니다.
10. 본 조에서 정의되지 않은 본 약관 상의 용어는 일반적인 거래 관행에 따라 해석합니다.

제3조 (약관 외 준칙)
본 약관에서 정하지 아니한 사항은 법령 또는 ‘회사’가 정한 서비스의 개별 약관, 운영정책 및 규칙(이하 ‘세부 지침’이라 합니다)의 규정에 따릅니다. 또한 본 약관과 세부 지침이 충돌할 경우에는 세부 지침이 우선합니다.

제4조(약관의 명시 및 개정)
1. ‘회사’는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지, 전화번호, 모사전송번호(FAX), 전자우편 주소, 사업자등록번호, 통신판매업신고번호 등을 ‘이용자’가 쉽게 알 수 있도록 ‘사이트’의 초기 서비스화면에 게시합니다. 다만, 본 약관의 내용은 ‘이용자’가 연결화면을 통하여 확인할 수 있도록 할 수 있습니다.
2. ‘회사’는 ‘이용자가 약관에 동의하기에 앞서 약관에 정해진 내용 중 청약철회, 배송책임, 환불조건 등과 같은 내용을 ‘이용자’가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 통하여 ‘이용자’의 확인을 구합니다.
3. ‘회사’는 전자상거래 등에서의 소비자보호에 관한 법률，‘약관의 규제에 관한 법률’, ‘전자거래기본법’, ‘정보통신망 이용촉진 등에 관한 법률’, ‘소비자보호법’ 등 관계 법령(이하 ‘관계법령’ 이라 합니다)에 위배되지 않는 범위 내에서 본 약관을 개정할 수 있습니다.
4. ‘회사’가 본 약관을 개정하고자 할 경우, 적용일자 및 개정사유를 명시하여 현행약관과 함께 온라인 쇼핑몰의 초기화면에 그 적용일자 7일 전부터 적용일자 전날까지 공지합니다. 다만, ‘이용자’에게 불리한 내용으로 약관을 변경하는 경우 최소 30일 이상 유예기간을 두고 공지합니다.
5. ‘회사’가 본 약관을 개정한 경우，개정약관은 적용일자 이후 체결되는 계약에만 적용되며 적용일자 이전체결된 계약은 개정 전 약관이 적용됩니다. 다만, 이미 계약을 체결한 ‘이용자’가 개정약관의 내용을 적용받고자 하는 뜻을 ‘회사’에게 전달하고, ‘회사’가 여기에 동의한 경우 개정약관을 적용합니다.

제5조(서비스의 제공 및 변경)
1. ‘회사’가 제공하는 서비스는 연중무휴, 1일 24시간 제공을 원칙으로 합니다. 다만, 시스템의 유지보수를 위한 점검, 통신 장비의 교체 등 특별한 사유가 있는 경우 서비스의 전부 또는 일부에 대하여 일시적으로 제공을 중단할 수 있습니다.
2. ‘회사’는 전시, 사변, 천재지변 또는 이에 준하는 국가비상사태가 발생하거나 발생할 우려가 있는 경우, 전기통신사업법에 의한 기간통신사업자가 전기통신서비스를 중지하는 등 부득이한 사유가 발생한 경우 서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다.
3. ‘회사’가 서비스를 정지하거나 이용을 제한하는 경우 그 사유 및 기간, 복구 예정 일시 등을 지체 없이 ‘이용자’에게 알립니다.

제6조(제공하는 서비스)
‘회사’가 제공하는 서비스는 다음과 같습니다.
1. 매매계약체결에 필요한 정보제공 서비스 : 주택 세금 가계산 및 세무사, 법무사 중개
2. 기타 ‘회사’가 정하는 서비스

제7조(전자상거래 플랫폼 서비스)
1. ‘회사’는 ‘오픈마켓’을 통해 ‘사이트’에서 ‘판매회원’이 상품을 판매할 수 있도록 지원합니다.
2. ‘회사’는 판매촉진을 위하여 국내외 포털 사이트，가격비교 사이트, 제휴사가 운영하는 사이트 등에 광고를 게재할 수 있으며, 당사자와 협의하여 할인행사 등의 이벤트를 실시할 수 있습니다.
3. ‘회사’는 판매자가 등록한 상품정보를 사전에 정한 기준과 방법에 따라 게재합니다. 이 때 ‘회사’는 게재하는 상품정보의 위치, 크기, 배열 등을 결정하고 조정할 수 있으며, 필요한 경우 상품정보 외의 사항을 게재할 수 있습니다.

제 8조 (회원가입)
1. ‘회사’가 정한 양식에 따라 ‘이용자’가 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
2. ‘회사’는 전항에 따라 회원가입을 신청한 ‘이용자’ 중 다음 각호의 사유가 없는 한 ‘회원’으로 등록합니다.
가. 가입 신청자가 본 약관에 따라 회원자격을 상실한 적이 있는 경우. 다만, ‘회사’의 재가입 승낙을 얻은 경우에는 예외로 합니다.
나. 회원정보에 허위, 기재누락, 오기 등 불완전한 부분이 있는 경우
다. 기타 회원으로 등록하는 것이 ‘회사’의 운영에 현저한 지장을 초래하는 것으로 인정되는 경우
3. 회원가입 시기는 ‘회사’의 가입승낙 안내가 ‘회원’에게 도달한 시점으로 합니다.
4. ‘회사’의 서비스를 1년 동안 이용하지 않는 ‘회원’의 경우 휴면계정으로 전환하고 서비스 이용을 제한할 수있습니다.
5. 휴면계정 전환 시 계정 활성을 위해 필요한 아이디(ID), 비밀번호, 이름, 중복가입 방지를 위한 본인 인증값(DI), 휴대전화 번호를 제외한 나머지 정보는 별도로 저장 및 관리됩니다. 다만, 관계법령에 의해 보존할 필요가 있는 경우 ‘회사’는 정해진 기간 동안 회원정보를 보관합니다.

제9조 (회원에 대한 통지)
1. ‘회사가 ‘회원’에 대한 통지를 하는 경우, 가입 시 기입한 전자우편 주소로 할 수 있습니다.
2. ‘회사가 불특정 다수 ‘회원’에 대하여 통지를 하는 경우, 1주일 이상 ‘사이트’의 게시판 또는 연결화면을 통해 공지할 수 있습니다.
3. ‘회사가 ‘판매회원’에게 통지를 하는 경우, 판매회원 전용화면(이하 ‘전용화면’이라 합니다)을 통하여 개별통지를 갈음할 수 있습니다.

제10조 (회원탈퇴 및 자격상실 등)
1. ‘회원’은 ‘회사’에 언제든지 탈퇴를 요청할 수 있으며, ‘회사’는 지체없이 회원탈퇴 요청을 처리합니다. 다만 이미 체결된 거래계약을 이행할 필요가 있는 경우에는 본 약관이 계속 적용됩니다.
2. ‘회사’는 다음 각호의 사유가 발생한 경우 ‘회원’의 자격을 제한 또는 정지시킬 수 있습니다.
가. 회원가입 시 허위정보를 기재한 경우
나. 다른 이용자의 정상적인 이용을 방해하는 경우
다. 관계법령 또는 본 약관에서 금지하는 행위를 한 경우
라. 공서양속에 어긋나는 행위를 한 경우
마. 기타 ‘회원’으로 등록하는 것이 적절하지 않은 것으로 판단되는 경우

제11조 (회사의 의무)
1. ‘회사’는 계속적이고 안정적인 서비스의 제공을 위하여 설비에 장애가 생기거나 설비가 멸실된 때에는 이를 지체없이 수리 또는 복구하며, 다음 각호의 사유 발생 시 부득이한 경우 예고 없이 서비스의 전부 또는 일부의 제공을 일시 중지할 수 있습니다. 이 경우 그 사유 및 중지 기간 등을 지체 없이 ‘이용자’에게 공지합니다.
가. 시스템의 긴급점검, 증설, 교체, 시설의 보수 또는 공사를 위해 필요한 경우
나. 시스템 또는 기타 서비스 설비의 장애，유무선 Network 장애 등으로 정상적인 서비스 제공이 불가능한 경우
다. 국가비상사태，정전, 불가항력적 사유에 의한 경우
2. ‘회사’는 ‘이용계약’의 체결, 계약사항의 변경 및 해지 등 ‘이용자’와의 계약관련 절차 및 내용 등에 있어 이용자에게 편의를 제공하도록 노력합니다.
3. ‘회사’는 본 약관의 ‘상품의 판매가격 및 이용료’. ‘판매대금의 정산 및 지급’ 규정에 따라 ‘판매회원’에게 대금을 정산할 의무를 부담합니다. 다만 본 약관의 ‘면책규정’에서 정하는 바와 같이 ‘판매회원’이 ‘일반회원’에게 제공한 서비스와 관련된 분쟁에 대하여는 책임을 부담하지 않습니다.

제12조 (이용자의 의무)
1. ‘이용자’는 본 약관에 동의하고 사실에 근거하여 회원가입 신청서를 작성해야 합니다. ‘이용자’가 허위정보 또는 타인의 정보를 도용한 경우 ‘회사’에 대하여 일체의 권리를 주장할 수 없으며, ‘회사’는 이로 인하여 발생한 손해에 대하여 책임을 부담하지 않습니다.
2. ‘이용자’는 본 약관에서 규정하는 사항, ‘회사가 정한 제반 규정, 기타 ’회사가 공지하는 사항을 준수하여야 합니다. 또한 ‘이용자’는 ‘회사’의 업무를 방해하는 행위 및 명예를 훼손하는 행위를 하여서는 안됩니다.
3. ‘이용자’는 주소, 연락처, 전자우편 주소 등 회원정보가 변경된 경우 즉시 온라인을 통하여 이를 수정해야 합니다. 변경된 정보를 수정하지 않거나 수정이 지연되어 발생하는 책임은 이용자가 부담합니다.
4. ‘이용자’는 자신의 회원ID와 비밀번호를 직접 관리해야 합니다. ‘이용자’의 관리상의 부주의로 발생한 문제에 대하여는 ‘회사’가 책임을부담하지 않습니다.
5. ‘이용자’는 ‘회사’의 명시적 동의가 없는 한 서비스 이용 권한，기타 이용 계약상의 지위에 대하여 매도, 증여, 담보제공 등의 처분행위를 할 수 없습니다.
6. ‘판매회원’은 자신이 제공하는 ‘상품’에 대하여 정확한 정보를 제공하여야 하며, 본 약관 ‘판매회원의 의무’에 따른 의무를 준수하여야 합니다. 이를 위반하여 발생하는 모든 책임은 ‘판매회원’이 부담합니다.
7. ‘일반회원’은 ‘회사’가 제공하는 ‘오픈마켓’ 서비스를 통하여 ‘상품’을 구매한 경우 이에 대한 대금 지급 의무를 부담합니다.

제13조 (판매 서비스 이용계약)
1. 판매 서비스 이용계약(이하 ‘이용계약’이라고 합니다)은 회사가 제공하는 판매 서비스를 이용하고자 하는 자의 이용신청을 ‘회사’가 승낙함으로써 성립하며, 이 때 회원은 ‘판매회원’ 자격을 부여 받게 됩니다. 이용승낙의 의사표시는 해당 서비스 화면 또는 가입 신청 시 기재한 e-mail 등의 방법으로 통지할 수 있습니다.
2. ‘이용계약’은 만 14세 이상의 개인 또는 법인사업자가 신청할 수 있습니다.
3. ‘이용계약’의 체결 시기는 제1항에 따라 ‘회사’의 승낙이 ‘회원’에게 도달한 시점으로 하며, ‘회사’는 본 약관 ‘회원탈퇴 및 자격상실’에서 정한 가입 거부 사유가 있는 경우 ‘이용계약’을 체결하지 않을 수 있습니다.

제14조 (판매 서비스의 이용계약의 해지)
1. ‘판매회원은 언제든지 ’회사에게 해지의사를 통지함으로써 이용계약을 해지할 수 있습니다. 다만，‘판매회원’은 해지의사를 통지하기 전에 모든 상품의 판매 절차를 완료, 철회 또는 취소해야만 하며 판매의 철회 또는 취소로 인한 불이익은 ‘판매회원’ 본인이 부담하여야 합니다.
2. ‘이용계약’은 ‘판매회원’의 해지의사가 ‘회사’에 도달한 때에 종료됩니다.
3. 본 계약의 해지통보에도 불구하고 계약해지 시점까지 발송되지 아니한 주문상품, 교환 또는 환불 요청이 접수된 경우 ‘판매회원’은 상품의 배송, 교환 및 환불에 필요한 협력을 다하여야 할 의무가 있으며 본 의무는 정산완료가 확인되거나 구매자에 대한 조치가 완료되면 종료합니다.

제15조 (‘회사’의 ‘이용계약’의 해지 및 ‘판매회원’ 자격상실)
1. ‘회사’는 다음 각 호의 사유가 발생한 경우 별도의 최고 없이 ‘판매회원’에게 계약 해지의 통지를 함으로써 본 계약을 해지할 수 있습니다.
가. 허위 또는 과장된 상품정보를 게재한 경우
나. 관계 법령에 위반하는 등 부적합 상품을 등록 또는 판매한 경우
다. ‘판매회원’이 비밀누설하거나 본 약관에 위반하여 고객정보를 이용한 경우
라. ‘판매회원’이 본 약관의 의무를 위반하여 ‘회사’가 그 개선을 요청하였으나, 정당한 사유없이 이를 이행하지 아니한 경우
마. ‘판매회원’이 본 약관에 정한 의무를 누적 3회 위반한 경우
바. ‘판매회원’이 ‘일반회원’에게 직거래 유도행위를 한 경우
사. ‘판매회원’이 1년 이상 로그인 하지 않아 휴면계정 처리된 경우
아. ‘회사의 시스템 및 서비스를 악용하여 스팸정보 전송, 악성프로그램 유포 등 법령에서 금지하는 행위를 한 경우
2. 본 약관의 당사자 중 일방에게 다음 각 호의 사유가 발생한 경우 그 상대방은 별도의 최고 없이 계약 해지의사를 통지하여 본 계약을 해지할 수 있습니다.
가. 본 약관의 의무를 위반하여 상대방 당사자로부터 시정을 요구 받은 후 7일이 경과할 때 까지 특별한사유나 해명 없이 이를 시정하지 아니한 경우
나. 감독기관에 의하여 영업 또는 허가의 취소 또는 정지 등 처분을 받은 경우
다. 파산, 화의 또는 회사정 리 절차의 신청이 있거나 스스로 이를 신청한 경우
라. 발행한 어음 또는 수표가 부도로 되거나 은행과의 거래가 정지된 경우
마. 현저하게 상대방의 명예를 훼손한 경우
바. 기타 계약기간 내 계약의 이행이 불가능 하거나, 계약 목적을 달성할 수 없게 할 만한 중대한 사유가 발생한 경우
3. 본 약관에 따라 ‘이용계약’이 해지된 경우 그 해지된 날 기준으로 본 약관에서 정하는 절차에 따라 판매대금을 정산합니다.
4. 본 약관에 따라 ‘이용계약’이 해지된 경우에도 해지 시까지 발송되지 아니한 주문된 상품 또는 교환 또는환불 요청을 받은 상품이 있는 경우 판매자는 상품의 배송, 교환 및 환불에 필요한 협력을 다하여야 할 의무가 있으며 본 의무는 판매대금의 정산이 완료되거나 ‘구매자’에 대한 모든 조치가 완료된 것이 확인된 경우 종료합니다.
5. ‘이용계약’의 종료와 관련하여 발생한 손해는 해당 ‘판매회원’이 책임을 부담하여야 합니다.

제16조 (판매자의 통지의무)
1. ‘판매회원’은 다음 각 호의 사유가 발생한 경우에는 지체 없이 그 내용을 ‘전용화면’을 통해 변경하여야 하며 사업자등록증 등 관련 문서를 ‘회사’에 서면으로 제출하여야 합니다.
가. 주소, 상호, 대표자 등 사업자등록증에 명시된 사항이 변경된 경우
나. 통장계좌등의 변경이 있는 경우
다. 자본구성에 중대한 변경이 있는 경우
라. 개인사업자가 법인으로 또는 법인이 개인사업자로 변경된 경우
마. 기타 연락전화 및 휴대전화, 전자우편 주소등의 변경이 있는 경우
2. 본 조의 의무를 게을리 하거나 누락하여 발생한 모든 문제는 ‘판매회원’이 책임을 부담합니다.

제17조 (판매회원의 의무)
1. ‘판매회원’은 이 약관과 ‘회사’의 서비스화면을 통하여 미리 공지하는 개별약관이 정하는 절차에 따라 상품의 등록, 판매 진행 과정의 관리, 구매자에 대한 거래 이행，물품 배송, 청약철회 또는 반품 등 사후 처리를 수행하여야 합니다.
2. ‘판매회원’은 ‘사이트’ 내의 전용 게시판 등을 통해 접수된 ‘상품’ 관련 문의에 대하여 성실하게 응하여야 하며, 적절한 답신을 작성하고 게재해야 합니다.
3. ‘판매회원’은 ‘일반회원’의 구매취소 요청이 있는 경우 이에 응하여야 하며, 취소에 필요한 절차를 자신의 책임과 비용으로 이행하여야 합니다.
4. ‘판매회원’은 물품 등록 시 ‘일반회원’과 직거래를 유도하는 문구를 기재하는 내용, 구매자의 정당한 권리를 제한하는 내용, 및 기타 위법한 문구 또는 사진을 등록하여서는 안됩니다. 이를 위반한 경우 ‘회사’는 관련‘판매회원’ 및 ‘상품’에 대한 등록 취소 및 삭제 기타 필요한 조치를 취할 수 있습니다.
5. ‘판매회원’은 ‘상품’의 재고를 충분히 확보하여야 하며, 정상적인 판매에 차질이 예상되는 경우 지체없이 판매를 중지하고 ‘회사’와 ‘일반회원’에게 이를 알 수 있게 공지하여야 합니다.
6. ‘판매회원’은 ‘회사’의 명칭, 로고 및 ‘판매회원’의 신용등급 표시를 ‘회사’의 동의 없이 임의로 사용하거나 지정된 곳 이외의 장소에 표시하여서는 안되며，이러한 행위로 인하여 ‘회사’, ‘일반회원’ 및 다른 ‘판매회원’에게 손해가 발생한 경우 이와 상당한 인과관계 있는 모든 손해를 배상해야 합니다.
7. ‘판매회원’은 ‘사이트’에서의 상거래와 관련하여 관계 법령에서 정하고 있는 자료를 보관하여야 합니다.
8. ‘판매회원’은 상품을 판매하기 위하여 특정한 인 • 허가 등의 자격이 필요한 경우 이에 대한 요건을 흠결없이 갖추고 유지 하여야 합니다.

제18조 (등록된 상품정보의 취소 및 삭제)
‘판매회원’은 ‘전용화면’을 통해 상품 정보를 등록해야 합니다. 다만 ‘회사’는 다음 각호의 사유가 있는 경우 그 등록을 취소하거나 삭제할 수 있습니다.
1. 상품등록양식에 어긋난 등록, 허위 및 중복 등록，판매를 가장한 등록
2. 중요 판매정보에 오기 또는 모순이 있는 등록
3. 과다한 허위출고 또는 명백한 허위출고의 반복
4. ‘판매회원’과 연락이 두절된 경우
5. ‘판매회원’의 고객문의 처리율 및 만족도가 저조하고 개선되지 않는 경우
6. 상품 카테고리 오등록 또는 동일 또는 유사한 카테고리에 상품을 중복으로 등록하는 경우
7. 기타 ‘회사’의 상품 관련 서비스 비용이 과다하게 발생하는 경우

제19조 (상품의 등록 및 관리)
1. ‘판매회원’은 ‘상품’에 관한 정보와 판매가격, 재고, 배송 등 판매와 관련된 정보를 ‘전용화면’에서 직접 등록하여야 하며, 그 내용이 사실과 부합하도록 상시 관리하여야 합니다.
2. ‘판매회원’은 ‘상품’의 가치에 영향을 미치는 정보에 대하여 그 진실성을 보장하여야 합니다. 표시된 ‘상품’의 정보에 허위사실이 있을 경우 그로 인한 모든 책임은 ‘판매회원’이 부담합니다.

제20조 (상품의 판매가격 및 이용료)
1. 상품의 판매가격은 ‘판매회원’이 결정합니다. 다만 할인쿠폰이나 이벤트 등 가격을 할인하는 경우 판매가격은 차감된 금액을 기준으로 합니다.
2. 상품의 판매와 관련된 제반 비용(이하 ‘서비스 이용료’라 합니다)는 ‘회사가 결정하며, ‘판매회원’이 ‘전용화면’에서 상품을 등록할 경우 이를 알 수 있게 적절히 표시합니다.
3. ‘회사’가 부과하는 ‘서비스 이용료’는 상품등록 이용료, 부가서비스 이용료 및 판매 이용료, 기타 이용료로 구분됩니다. 각 서비스 및 서비스 이용료의 구체적인 내용은 해당 서비스화면에 별도로 게재합니다.
가. 상품등록이용료
- 상품등록이용료는 판매가와 등록 상품수 및 등록기간을 기준으로 책정되며, 상품 등록 시에 부과됩니다.
- 상품등록이용료는 판매성사 여부, 반품 여부에 관계없이 환불되지 않습니다. 다만 ‘회사’의 ‘이용계약’해지에 따른 판매취소, ‘회사’ 서비스 상의 하자로 인하여 상품등록이 정상적으로 이루어지지 않거나 판매가 취소되는 경우에는 상품등록이용료를 환불합니다.
나. 부가서비스 이용료
- 부가서비스 이용료는 판매성사 여부, 반품 여부에 관계없이 환불되지 않습니다. 다만 ‘회사’의 ‘이용계약’해지에 따른 판매취소, ‘회사’ 서비스 상의 하자로 인하여 상품등록이 정상적으로 이루어지지 않거나 판매가 취소되는 경우에는 상품등록이용료를 환불합니다.
- 광고나 이벤트의 경우 별도의 개별 약관이 적용될 수 있습니다.
다. 판매이용료
 - 판매이용료는 각 상품 카테고리별로 정해진 기준에 따라 판매된 수량에 비례하여 판매자에게 부과됩니다.
 - 판매이용료는 정산 시 공제됩니다. 다만 반품 또는 판매취소의 경우에는 판매이용료가 부과되지 않습니다.
4. ‘회사’는 필요한 경우 서비스 이용료를 신설하거나 변경할 수 있으며，그 내용은 ‘전용화면’을 통하여 통지합니다.
5. ‘회사’는 ‘판매회원’과 협의하여 할인쿠폰을 발행 적용할 수 있고 ‘일반회원’가 이를 사용하는 경우(단, ‘판매회원’이 ‘회사’와 협의하지 않고 임의로 판매금액을 할인하는 경우는 제외합니다) 판매이용료는 할인쿠폰 금액을 차감한 금액을 기준으로 부과합니다.
6. 일반 회원은 회사의 서비스 이용대가로 수수료, 회원료 등 각 상품의 구매시 또는 별도로 회사가 정한 요율이나 기준에 따라 서비스 이용료를 회사에 지급해야 한다.

제21조 (판매부적합 상품)
1. ‘회사’는 관계법령 또는 일반 거래관행, 사회통념에 따라 개별적으로 판매부적합 상품 여부를 판단하여 제재할 수 있습니다.
2. ‘판매회원’의 고의 또는 과실로 판매부적합 상품이 등록된 경우, ‘회사’는 즉시 해당 상품의 판매를 중지시키고 이 사실을 ‘판매회원’에게 통보합니다. 만약, ‘판매회원’의 고의에 의한 등록으로 판단될 경우 ‘회사’는‘이용계약’을 해지할 수 있습니다.
3. ‘판매회원’의 고의 또는 과실로 판매부적합 상품이 판매된 경우, ‘회사’는 즉시 해당 상품의 판매를 중지하고 즉시 ‘이용계약’을 해지합니다. 이 때 ‘회사’는 필요한 경우 관계 기관에 위 사실을 즉시 신고할 수 있습니다.
4. 판매부적합 상품을 등록한 경우 그 등록에 사용된 이용료 등 제반 비용은 환불되지 않으며, ‘판매회원’은 매매 부적합 물품의 등록 및 판매에 대한 모든 법적인 책임을 부담합니다.

제22조 (판매회원의 수신확인통지)
1. ‘판매회원’은 ‘일반회원’이 상품 등에 대하여 구매신청을 한 경우 그 내용을 확인하는 내용의 수신확인통지를 하여야 합니다.
2. 수신확인통지를 받은 ‘일반회원’은 의사표시의 불일치가 있는 경우 통지를 받은 후 즉시 구매신청 내용의변경 또는 취소를 요청할 수 있고, ‘판매회원’은 배송 준비 전 ‘일반회원’의 요청이 있는 경우 지체없이 그 요청에 따라 변경 또는 취소처리하여야 합니다. 다만 ‘일반회원’이 이미 대금을 지불한 경우 본 약관의 ‘청약철회 등’에서 정한 바에 따릅니다.

제23조 (계약의 성립)
1. ‘판매회원’은 다음 각호의 사유가 있는 경우 본 약관의 ‘일반회원의 구매신청’ 조항에 따른 구매신청을 승낙하지 않을 수 있습니다.
가. 신청 내용에 허위, 누락, 오기가 있는 경우
나. 회원자격이 제한 또는 정지된 ‘일반회원’이 구매를 신청한 경우
다. 재판매, 기타 부정한 방법이나 목적으로 구매 신청하였음이 인정되는 경우
라. 기타 구매신청을 승낙하는 것이 ‘판매회원’의 기술상 현저한 지장을 초래하는 것으로 인정되는 경우
2. ‘판매회원’의 승낙이 전항의 ‘수신확인통지’ 형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.
3. ‘판매회원’이 승낙 의사표시를 하는 경우 ‘일반회원’의 구매신청에 대한 확인 및 판매가능여부, 구매신청 정정 및 취소 등에 관한 정보가 포함되어야 합니다.

제 24조 (결제방법)
1. ‘일반회원’이 구매한 ‘상품’에 대한 대금은 다음 각호의 방법으로 결제할 수 있습니다.
가. 폰뱅킹，인터넷뱅킹 등 각종 계좌이체
나. 선불카드, 직불카드, 신용카드 등 각종 카드결제
2. ‘회사’는 ‘일반회원’이 결제수단에 대한 정당한 사용권한을 가지고 있는지 여부를 확인할 수 있으며，이에 대한 확인이 완료될 때까지 거래 진행을 중지하거나, 확인이 불가능한 거래를 취소할 수 있습니다.
3. ‘회사’의 정책 및 결제업체(이동통신사, 카드회사 등) 또는 결제대행업체(PG)의 기준에 따라 ‘일반회원’ 당월 누적 결제액 및 충전한도 등 정당한 사용권한을 가지고 있는지 여부를 확인할 수 있으며, 이에 대한 확인이 완료될 때까지 거래 진행을 중지하거나, 확인이 불가능한 거래를 취소할 수 있습니다.
4. ‘회사’의 정책 및 결제업체(이동통신사, 카드회사 등) 또는 결제대행업체(PG)의 기준에 따라 ‘일반회원’ 당월 누적 결제액 및 충전한도가 제한될 수 있습니다.
5. 대금의 지급 또는 결제를 위하여 입력한 정보에 대한 책임은 ‘일반회원’이 전적으로 부담합니다.

제25조 (상품의 배송)
1. ‘판매회원’은 별도의 약정이 없는 이상, ‘일반회원’이 청약을 한 날부터 7일 이내에 상품을 배송할 수 있도록 주문제작, 포장 등 기타 필요한 조치를 취해야 합니다. 다만, ‘일반회원’이 이미 대금의 전부 또는 일부를 지급한 경우에는 그 대금을 받은 날부터 3 영업일 이내에 필요한 조치를 취해야 합니다.
2. ‘판매회원’은 ‘일반회원’이 상품의 공급 절차 및 진행 상황을 확인할 수 있도록 적절한 조치를 취해야 하며, ‘회사’는 이에 협력하여야 합니다.
3. ‘판매회원’은 ‘일반회원’이 청약한 상품을 제공할 수 없게된 경우 지체없이 그 사유를 ‘일반회원’과 ‘회사’에 통지하여야 합니다. 이 때 ‘일반회원’이 상품의 대금을 지불한 경우 대금을 받은 날부터 3영업일 이내에 환급 또는 필요한 조치를 취해야 합니다.
4. ‘판매회원’은 회사가 지정하는 물류대행업체를 통해 상품을 배송할 수 있습니다. 이 때 물류대행업체의 이용절차 및 배송위치 확인 서비스의 세부사항은 개별약관이나 약정에 따릅니다.
5. ‘판매회원’이 상품을 발송한 경우, 즉시 발송일자, 택배 운송장번호, 등기화물번호 등 적절한 코드를 ‘전용화면’에 입력함으로써 이 사실을 ‘회사’가 확인할 수 있도록 해야 합니다.
6. 거래된 상품의 운송과 관련하여 ‘판매회원’와 ‘일반회원’, 물류대행업체, 금융기관 등 관련 당사자 사이에 분쟁이 발생한 경우, ‘회사’는 이에 관여하지 않으며 어떠한 책임도 부담하지 않습니다.

제26조 (청약철회 등)
1. ‘판매회원’과 재화 등의 구매에 관한 계약을 체결한 ‘일반회원’은 본 약관에 따른 수신확인의 통지를 받은 날부터 7일 이내에 청약을 철회할 수 있습니다.
2. 전항의 규정에도 불구하고 다음 각 호의 사유에 해당하는 경우, 배송받은 재화의 반품 또는 교환이 제한됩니다.
가. ‘일반회원’에게 책임있는 사유로 상품이 멸실 또는 훼손된 경우(다만, 재화를 확인하기 위하여 포장 등을 훼손한 경우는 예외로 합니다)
나. ‘일반회원’의 사용 또는 소비에 의하여 재화의 가치가 현저히 감소한 경우
다. 시간의 경과로 재판매가 곤란할 정도로 재화의 가치가 현저히 감소한 경우
라. 같은 성능을 지닌 재화 등으로 복제가 가능한 경우 그 원본이 되는 재화의 포장을 훼손한 경우
마. ‘일반회원’의 주문에 의하여 개별적으로 생산한 제품으로서 청약철회 및 교환의 제한에 대하여 사전에 고지한 경우
3. ‘판매회원’ 또는 ‘회사가 전 항의 청약철회 제한 사유를 ‘일반회원’가 알기 쉽게 명시하거나, 시용상품을 제공하는 등의 조치를 취하지 않은 경우 ‘구매자’의 청약철회가 제한되지 않습니다.
4. 본조의 규정에도 불구하고，‘일반회원’은 상품 등의 내용이 표시, 광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 상품을 공급받은 날로부터 3월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회 등 할 수 있습니다.

제27조 (판매대금의 정산 및 지급)
1. ‘일반회원’이 상품을 수령한 후 구매의사를 확정하면, 지체없이 ‘구매자 전용화면’에서 구매확정 의사를 표시(이하 ‘구매확정’이라 합니다)하여야 합니다. 다만，수령 후 7일 이내에 ‘구매확정’하지 않는 경우 ‘회사’는 그 익일부터 ‘구매확정’으로 처리할 수 있습니다.
2. ‘구매확정’으로 처리되면 ‘회사’는 즉시 ‘판매회원’에게 대금을 지급하며，이 후 발생하는 환불, 교환, 수리 등의 절차는 ‘일반회원’과‘판매회원’이 직접 해결하여야 합니다.
3. ‘판매회원’의 출금 요청이 있을 경우, ‘회사’는 접수일 기준 7 영업일 내에 등록된 계좌로 대금을 송금합니다.
4. ‘회사’는 당 월 구매확정 된 상품의 판매대금에 대하여 수수료 및 세금계산서를 익월 10일까지 일괄 발행합니다.
5. ‘회사’는 ‘판매회원’에게 상품의 거래내역，서비스 이용료 부과 내역, 세금계산서 발행 신청 내역 등을 ‘전용화면’을 통하여 제공합니다.

제28조 (대금의 정산 유보)
1. ‘회사’는 ‘판매회원’의 귀책 사유로 발생한 비용을 대금 정산 시 공제할 수 있으며, ‘이용계약’이 종료된 날로부터 ‘판매회원’이 판매한 상품과 관련된 절차를 완료하였음이 확인될 때까지 판매대금의 정산을 유보할 수 있습니다.
2. ‘회사’는 장기간 배송이 지연된 구매 건에 대하여 향후 ‘일반회원’의 환불, 청약철회에 대비하여 판매대금의 정산을 유보할수 있습니다.
3. ‘회사’는 ‘판매회원’이 법원 결정에 따라 판매대금의 가압류, 압류, 추심명령 등을 받은 경우, 동 결정이 해제될 때까지 판매대금의 정산을 유보할 수 있습니다.
4. ‘회사’는 법률의 규정 또는‘판매회원’의 본 약관 위반등 합리적인 사유가 있는 경우 ‘전용화면’을 통하여 통지하고 판매대금의 전부 또는 일부에 대한 정산을 유보할 수 있습니다.

제29조 (저작권의 귀속 및 이용)
1. ‘쇼핑몰’이 제공하는 서비스 및 관련된 모든 지식재산권은 ‘회사’에 귀속됩니다.
2. ‘이용자’는 ‘쇼핑몰’에게 지식재산권이 있는 정보를 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나, 제3자가 이용하게 하여서는 안됩니다.
3. ‘이용자’가 서비스 내에 게시한 게시물, 이용후기 등 콘텐츠(이하 ‘콘텐츠’)의 저작권은 해당 ‘콘텐츠’의 저작자에게 귀속됩니다.
4. 전항의 규정에도 불구하고 ‘회사’는 서비스의 운영, 전시, 전송, 배포, 홍보 등의 목적으로 별도의 허락 없이 무상으로 저작권법 및 공정한 거래 관행에 합치되는 범위 내에서 다음 각호와 같이 ‘이용자’가 등록한 저작물을 이용할 수 있습니다.
가. ‘회사’가 제공하는 서비스 내에서 ‘이용자가 작성한 콘텐츠의 복제, 수정, 전시, 전송, 배포 등 저작권을 침해하지 않는 범위 내의 2차적 저작물 또는 편집 저작물 작성을 위한 사용. 다만 ‘이용자’가 해당 ‘콘텐츠’의 삭제 또는 사용 중지를 요청하는 경우 관련법에 따라 보존해야하는 사항을 제외하고 관련 ‘콘텐츠’를 모두 삭제 또는 사용 중지합니다.
나. 서비스의 운영，홍보, 서비스 개선 및 새로운 서비스 개발을 위한 범위내의 사용
다. 미디어, 통신사 등을 통한 홍보목적으로 ‘콘텐츠’를 제공, 전시하도록 하는 등의 사용

제 30조 (비밀유지)
1. 본 약관의 당사자는 관계법령에 특별한 규정이 있는 경우를 제외하고는 취득한 개인정보, 기술정보, 생산 및 판매계획 등 비밀로 관리되는 정보를 제3자에게 누설해서는 안되며，그 정보를 본 약관 이외의 목적으로 사용하여서는 안 됩니다.
2. ‘판매회원’은 판매를 통해 얻은 고객정보를 이용하여，‘회사’를 통하지 않고 고객에게 접촉하거나 직거래를 유도하는 등의 행위를 하여서는 안됩니다.
3. ‘판매회원’은 자신의 ID와 비밀번호의 보안을 유지하여야 하며, 이를 제3자가 이용하게 하여서는 안됩니다.
4. 본 조의 비밀유지 의무는 본 약관에 의한 계약관계가 종료된 이후에도 10년 간 존속합니다.

제 31조 (면책규정)
1. ‘회사가 ‘판매회원’과 ‘일반회원’에게 제공하는 서비스는 온라인 거래장소(Marketplace) 및 기타 부가 정보를 제공하는데 불과하므로, ‘오픈마켓’을 통하여 이루어지는 ‘판매회원’과 ‘일반회원’ 상호 간의 거래에 대하여 ‘회사’는 관여하지 않으며 어떠한 책임도 부담하지 않습니다.
2. ‘회사’는 ‘이용자’의 귀책 사유로 인한 서비스 이용 장애에 대하여 책임을 부담하지 않습니다.
3. ‘회사’는 ‘오픈마켓’를 통하여 거래되는 상품의 하자, 상품정보 상의 오류, 미비 등으로 인하여 ‘일반회원’에게 발생한 손해에 대한 책임(제조물책임 포함)을 부담하지 않습니다.
4. ‘회사’는 ‘이용자가 ‘다른 이용자가 게재한 정보，자료，사실의 정확성을 신뢰함으로써 입은 손해에 대하여 책임을 부담하지 않습니다.
5. ‘회사’가 제공한 링크로 연결된 제휴사이트(이하 ‘제휴사이트’라 합니다)는 ‘회사’와 독자적으로 운영되며, ‘회사’는 ‘제휴사이트’와 ‘이용자’ 사이에 이루어진 거래에 대하여 책임을 부담하지 않습니다.

제32조 (분쟁의 해결)
1. ‘회사’는 ‘이용자’가 제기하는 불만사항 및 의견을 지체없이 처리하기 위하여 노력합니다. 다만, 신속한 처리가 곤란한 경우 ‘이용자’에게 그 사유와 처리일정을 즉시 통보합니다.
2. ‘회사’와 ‘이용자’ 간 발생한 분쟁에 관한 소송은 ‘회사’ 소재지를 관할하는 법원을 제1심 관할 법원으로 하며, 준거법은 대한민국의 법령을 적용합니다.

부 칙

제1조 (시행일)
본 약관은 2024.08.01부터 적용합니다.
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
            active={(buttonText === '끝으로 이동하기' ? false : true) || agreeCert}
            disabled={!(activeButton || agreeCert)}
            onPress={() => {
              if (buttonText === '끝으로 이동하기') {
                if (scrollViewRef.current) {
                  scrollViewRef.current.scrollTo({ y: 100000, animated: true });
                }
              } else {
                // 동의하기 버튼 클릭 시 redux에 저장
                dispatch(
                  setCert({
                    certType,
                    agreePrivacy,
                    agreeCopyright,
                    agreeGov24,
                    agreeCert: true,
                  }),
                );

                // 채팅방으로 이동
                navigation.goBack();
                // ////console.log('props.route.params.certType', props.route.params.cert);
                setTimeout(() => {
                  SheetManager.show('cert2', {
                    payload: {
                      index: props.route.params.index,
                      navigation: props.navigation,
                    },
                  });
                }, 300);


              }
            }}>
            <ButtonText active={activeButton || agreeCert}>{buttonText}</ButtonText>
          </Button>
        </DropShadow>
      </ButtonSection>
    </Container>
  );
};

export default Cert3;
