import React from 'react';

// Icons
import BuildingIcon1 from '../assets/icons/house/building_type1_ico.svg';
import BuildingIcon2 from '../assets/icons/house/building_type2_ico.svg';
import HouseIcon from '../assets/icons/house/house.svg';
import VillaIcon from '../assets/icons/house/villa.svg';
import KBICon from '../assets/icons/cert/kb_bank.svg';
import NaverIcon from '../assets/icons/cert/naver_ico.svg';
import TossIcon from '../assets/icons/cert/toss_ico.svg';

export const acquisitionTax = [
  {
    id: 'type',
    // 시스템 메시지(질문)
    type: 'system',
    message: '취득하실 주택 종류는 무엇인가요?',
    // 진행 상태
    progress: 0,
    // 선택지
    select: [
      {
        id: 'apartment',
        name: '아파트',
        icon: <BuildingIcon1 />,
        // 선택시 추가 될 챗 아이템
        select: ['apartment'],
      },
      {
        id: 'house',
        name: '단독주택 · 다가구',
        icon: <HouseIcon />,
        // 선택 시 오픈할 bottom sheet
        openSheet: 'searchHouse',
      },
      {
        id: 'villa',
        name: '연립 · 다세대',
        icon: <VillaIcon />,
        openSheet: 'searchHouse',
      },
      {
        id: 'ticket',
        name: '입주권',
        icon: <BuildingIcon2 />,
        select: ['ticket'],
      },
    ],
  },
  {
    id: 'apartment',
    type: 'system',
    message:
      '분양권 상태에서 최초 취득하신 아파트는 세금 계산 방식이 달라요.\n혹시 아파트를 분양권 상태에서 취득하실 예정인가요?',
    progress: 1,
    select: [
      {
        id: 'yes',
        name: '네',
        openSheet: 'mapViewList',
      },
      {
        id: 'no',
        name: '아니오',
        openSheet: 'mapViewList',
      },
    ],
  },
  {
    id: 'ticket',
    type: 'system',
    message:
      '취득하실 주택이 멸실되었는지에 따라 입주권의 세금 계산 방식이 달라져요. 혹시 이미 멸실된 입주권을 취득하실 예정인가요?',
    progress: 1,
    select: [
      {
        id: 'yes',
        name: '네',
        openSheet: 'searchHouse',
      },
      {
        id: 'no',
        name: '아니오',
        openSheet: 'searchHouse',
      },
    ],
  },
  {
    id: 'cert',
    type: 'system',
    message: '본인인증을 진행하시겠어요?',
    progress: 2,
    select: [
      {
        id: 'yes',
        name: '네',
        select: ['certType'],
      },
      {
        id: 'no',
        name: '아니오',
      },
    ],
  },
  {
    id: 'certType',
    type: 'system',
    progress: 3,
    message: '공공기관에서 여러 인증방식을 제공해요. 인증방식을 선택해주세요.',
    select: [
      {
        id: 'KB',
        name: 'KB 간편인증',
        icon: <KBICon />,
        openSheet: 'cert',
      },
      {
        id: 'naver',
        name: '네이버 간편인증',
        icon: <NaverIcon />,
        openSheet: 'cert',
      },
      {
        id: 'toss',
        name: '토스 인증',
        icon: <TossIcon />,
        openSheet: 'cert',
      },
    ],
  },
  {
    id: 'moreHouse',
    type: 'system',
    message: '취득하실 주택 외 보유 중인 주택이 있나요?',
    progress: 4,
    select: [
      {
        id: 'yes',
        name: '네',
        select: ['certInfo', 'cert'],
      },
      {
        id: 'no',
        name: '아니오',
        select: ['getInfoDone', 'getInfoConfirm'],
      },
    ],
  },
  {
    id: 'certInfo',
    type: 'system',
    message:
      '취득하실 주택의 취득세를 계산하기 위해 공공기관에서 보유 중인 주택 정보를 불러오려고 해요.\n따라서 정보를 가져오려면 본인인증이 필수에요.',
    progress: 3,
  },
  {
    id: 'auiAmontSystem',
    type: 'system',
    message: '취득가액을 입력해주세요.',
    questionId: 'apartment',
    progress: 4,
  },
  {
    id: 'allHouse',
    type: 'system',
    message: '보유 중인 주택을 모두 불러왔어요.',
    progress: 4,
    select: [
      {
        id: 'ok',
        name: '보유 주택 확인하기',
        openSheet: 'own',
      },
    ],
  },
  {
    id: 'joint',
    type: 'system',
    message: '혹시 공동 소유 예정인가요?',
    questionId: 'apartment',
    progress: 4,
    select: [
      {
        id: 'only',
        type: 'my',
        name: '단독 소유',
        select: ['moreHouse'],
      },
      {
        id: 'joint',
        type: 'my',
        name: '공동 소유',
        openSheet: 'joint',
      },
    ],
  },
  {
    id: 'moment',
    type: 'system',
    message:
      '잠깐!\n불러온 주택 중 입주권이 있다면 입주권이라고 반드시 알려주셔야 해요.',
    progress: 5,
    select: [
      {
        id: 'ok',
        name: '확인하기',
        select: ['allHouse'],
      },
    ],
    questionId: 'moment',
  },
  {
    id: 'getInfoDone',
    type: 'system',
    message: '취득세 계산에 필요한 정보들을 모두 수집했어요.',
    progress: 6,
  },
  {
    id: 'getInfoConfirm',
    type: 'system',
    progress: 7,
    message:
      '잘못된 정보들로 취득세를 계산하면 정확한 결과가 나오지 않을 수 있어요. 모든 정보들이 맞는지 확인해볼까요?',
  },
  {
    id: 'calulating',
    type: 'system',
    message:
      '계산하는 중이에요.\n서비스를 종료하지 마시고, 조금만 기다려주세요.',
    progress: 8,
  },
  {
    id: 'cta',
    type: 'system',
    progress: 9,
  },
  {
    id: 'goodbye',
    type: 'system',
    message:
      '취득세 계산 결과는 마음에 드셨나요?\n곧 소유권 이전 등기까지 한 번에 가능하도록 서비스를 개발하고 있어요.\n앞으로도 많은 사랑과 관심 부탁드려요.',
    progress: 10,
    openSheet: 'review',
  },
];

export const gainTax = [
  {
    id: 'hello',
    type: 'system',
    message:
      '안녕하세요!\n지금부터 양도소득세를 쉽고 정확하게 계산해드릴 거에요.\n저만 믿고 끝까지 잘 따라와 주세요!',
    progress: 0,
  },
  {
    id: 'type',
    user: 'system',
    message: '혹시 임대사업자이신가요?',
    progress: 1,
    select: [
      {
        id: 'yes',
        name: '네',
        select: ['cta'],
      },
      {
        id: 'no',
        name: '아니오',
        select: ['certInfo', 'cert'],
      },
    ],
  },

  {
    id: 'cta',
    type: 'system',
    progress: 10,
    message:
      '임대사업자에 해당되시면 전문 세무사에게 상담을 문의해보세요.\n어떤 복잡한 상황에도 최선의 결과를 알려주실 거에요.',
  },
  {
    id: 'cert',
    type: 'system',
    message: '본인인증을 진행하시겠어요?',
    progress: 2,
    select: [
      {
        id: 'yes',
        name: '네',
        select: ['certType'],
      },
      {
        id: 'no',
        name: '아니오',
      },
    ],
  },
  {
    id: 'getInfoDone',
    type: 'system',
    progress: 3,
    message: '양도소득세 계산에 필요한 정보들을 모두 수집했어요.',
  },
  {
    id: 'allHouse',
    type: 'system',
    message: '보유 중인 주택을 모두 불러왔어요.',
    progress: 6,
    select: [
      {
        id: 'ok',
        name: '보유 주택 확인하기',
        openSheet: 'own2',
      },
    ],
  },
  {
    id: 'getInfoConfirm',
    type: 'system',
    progress: 4,
    message:
      '잘못된 정보들로 양도소득세를 계산하면 정확한 결과가 나오지 않을 수 있어요. 모든 정보들이 맞는지 확인해볼까요?',
  },
  {
    id: 'certInfo',
    type: 'system',
    progress: 4,
    message:
      '매도하실 주택의 양도소득세를 계산하기 위해 공공기관에서 보유 중인 주택 정보를 불러오려고 해요. 따라서 정보를 가져오려면 본인인증이 필수에요.',
  },
  {
    id: 'certType',
    type: 'system',
    progress: 3,
    message: '공공기관에서 여러 인증방식을 제공해요. 인증방식을 선택해주세요.',
    select: [
      {
        id: 'KB',
        name: 'KB 간편인증',
        icon: <KBICon />,
        openSheet: 'cert',
      },
      {
        id: 'naver',
        name: '네이버 간편인증',
        icon: <NaverIcon />,
        openSheet: 'cert',
      },
      {
        id: 'toss',
        name: '토스 인증',
        icon: <TossIcon />,
        openSheet: 'cert',
      },
    ],
  },
  {
    id: 'moreHouse',
    type: 'system',
    progress: 5,
    message: '취득하실 주택 외 보유 중인 주택이 있나요?',
    select: [
      {
        id: 'yes',
        name: '네',
        select: ['certInfo', 'cert'],
      },
      {
        id: 'no',
        name: '아니오',
        select: ['getInfoDone', 'getInfoConfirm'],
      },
    ],
  },
  {
    id: 'real',
    type: 'system',
    progress: 8,
    message: '실거주기간을 불러왔어요.',
  },
  {
    id: 'year',
    type: 'my',
    progress: 8,
    message: '2년 10개월',
  },
  {
    id: 'goodbye',
    type: 'system',
    progress: 10,
    message:
      '양도소득세 계산 결과는 마음에 드셨나요?\n곧 대리 신고까지 한 번에 가능하도록 서비스를 개발하고 있어요.\n앞으로도 많은 사랑과 관심 부탁드려요.',
  },
];
