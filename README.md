## ✨ 구현된 기능

### AI 이미지 생성 갤러리

- ✅ **이미지 생성 폼**: 프롬프트 입력 및 옵션 선택
- ✅ **Hugging Face API 연동**: Stable Diffusion 모델을 사용한 무료 이미지 생성
- ✅ **React Query**: 서버 상태 관리
- ✅ **Zustand**: 전역 UI 상태 관리
- ✅ **이미지 갤러리**: 생성된 이미지 표시 및 호버 효과
- ✅ **로컬 스토리지**: 생성된 이미지 자동 저장

## 🚀 시작하기

### 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
HUGGINGFACE_API_KEY=your_api_key_here
```

**Hugging Face API 키 발급 방법:**

1. [Hugging Face](https://huggingface.co/)에 회원가입
2. [Settings > Access Tokens](https://huggingface.co/settings/tokens)에서 새 토큰 생성
3. 생성된 토큰을 `.env.local` 파일에 추가

### 2. 개발 서버 실행

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
