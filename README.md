## ✨ 구현된 기능

### AI 이미지 생성 갤러리

- ✅ **이미지 생성 폼**: 프롬프트 입력 및 옵션 선택
- ✅ **Replicate API 연동**: Flux Schnell 모델을 사용한 이미지 생성
- ✅ **Mock 모드**: API 키 없이도 데모 가능 (플레이스홀더 이미지)
- ✅ **React Query**: 서버 상태 관리
- ✅ **Zustand**: 전역 UI 상태 관리
- ✅ **이미지 갤러리**: 생성된 이미지 표시 및 호버 효과
- ✅ **로컬 스토리지**: 생성된 이미지 자동 저장

## 🚀 시작하기

### 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하세요:

**옵션 1: Mock 모드 (API 키 없이 데모용)**

```bash
USE_MOCK_API=true
```

**옵션 2: Replicate API 사용 (크레딧 필요)**

```bash
REPLICATE_API_TOKEN=your_api_token_here
```

**Replicate API 토큰 발급 방법:**

1. [Replicate](https://replicate.com/)에 회원가입
2. [Account Settings > API Tokens](https://replicate.com/account/api-tokens)에서 새 토큰 생성
3. [Billing](https://replicate.com/account/billing)에서 크레딧 구매 (무료 크레딧 제공)
4. 생성된 토큰을 `.env.local` 파일에 추가

> ⚠️ **참고**: Replicate는 크레딧이 필요합니다. 무료 크레딧이 제공되지만 제한적입니다. 데모 목적이라면 Mock 모드를 사용하세요.

### 2. 개발 서버 실행

```bash
npm run dev
```
