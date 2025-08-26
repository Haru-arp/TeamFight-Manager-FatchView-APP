# 🎮 TeamFight Manager - Patch View App

> **팀파이트 택틱스 캐릭터 패치 관리 도구**  
> 게임 패치별 캐릭터 정보를 효율적으로 관리하고 비교할 수 있는 웹 애플리케이션

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.12-06B6D4?style=flat-square&logo=tailwindcss)

## ✨ 주요 기능

- 📊 **패치별 캐릭터 관리**: 게임 패치마다 변경되는 캐릭터 정보를 체계적으로 관리
- 🔄 **자동 패치 스캔**: `public/patches` 폴더의 JSON 파일을 자동으로 감지하고 인덱싱
- 🎨 **직관적인 UI**: Radix UI와 Tailwind CSS로 구현된 모던하고 반응형 인터페이스
- ⚡ **빠른 네비게이션**: TanStack Router를 활용한 SPA 라우팅
- 🌙 **다크 모드**: next-themes를 통한 테마 전환 지원
- 📱 **반응형 디자인**: 모바일부터 데스크톱까지 최적화된 레이아웃

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 18+
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone <repository-url>
cd teamfight-manager-fatchview-app

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 `http://localhost:5173`에서 애플리케이션을 확인할 수 있습니다.

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── ui/             # shadcn/ui 기반 UI 컴포넌트
│   ├── character/      # 캐릭터 관련 컴포넌트
│   └── patch/          # 패치 관련 컴포넌트
├── hooks/              # 커스텀 React 훅
├── routes/             # TanStack Router 라우트
├── types/              # TypeScript 타입 정의
├── data/               # 샘플 데이터
└── main.tsx           # 애플리케이션 진입점

public/
└── patches/            # 패치 JSON 파일들
    ├── patch-1.0.0.json
    ├── patch-1.1.0.json
    └── index.json      # 자동 생성됨

vite-plugins/
└── patches-scanner.ts  # 패치 파일 자동 스캔 플러그인
```

## 🔧 패치 파일 관리

### 새 패치 추가하기

1. `public/patches/` 폴더에 새로운 JSON 파일을 추가합니다:

```json
{
  "name": "패치 1.3.0",
  "version": "1.3.0",
  "description": "새로운 캐릭터 밸런스 조정",
  "createdAt": "2025-01-26T00:00:00.000Z",
  "characters": [
    {
      "id": "character-1",
      "name": "캐릭터명",
      "cost": 3,
      "traits": ["특성1", "특성2"],
      "stats": {
        "health": 100,
        "attack": 50,
        "defense": 30
      }
    }
  ]
}
```

2. 파일을 저장하면 Vite 플러그인이 자동으로 `index.json`을 업데이트합니다.

### 자동 스캔 시스템

- 개발 모드에서 `public/patches` 폴더의 변경사항을 실시간 감지
- 빌드 시점에 모든 패치 파일을 자동으로 인덱싱
- 수동으로 `index.json`을 관리할 필요 없음

## 🛠️ 기술 스택

### 핵심 기술

- **React 19**: 최신 React 기능 활용
- **TypeScript**: 타입 안전성과 개발 경험 향상
- **Vite**: 빠른 개발 서버와 빌드 도구
- **TanStack Router**: 타입 안전한 라우팅

### UI/UX

- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **Radix UI**: 접근성을 고려한 헤드리스 UI 컴포넌트
- **Lucide React**: 아이콘 라이브러리

## 📜 사용 가능한 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 코드 린팅
npm run lint

# 패치 인덱스 수동 업데이트 (필요시)
npm run update-patches
```

## 🎯 주요 컴포넌트

### `usePatches` 훅

패치 데이터 로딩과 관리를 담당하는 커스텀 훅

### `PatchSidebar`

패치 목록을 표시하고 선택할 수 있는 사이드바 컴포넌트

### `CharacterGrid`

선택된 패치의 캐릭터들을 그리드 형태로 표시

### `CharacterCard`

개별 캐릭터의 정보를 카드 형태로 표시

## 🔮 향후 계획

- [ ] 패치 간 캐릭터 변경사항 비교 기능
- [ ] 캐릭터 검색 및 필터링
- [ ] 패치 노트 편집기
- [ ] 데이터 내보내기/가져오기
- [ ] 다국어 지원
