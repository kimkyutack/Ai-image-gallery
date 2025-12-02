import { create } from "zustand";

interface UIState {
  // 모달 상태
  isImageModalOpen: boolean;
  selectedImage: string | null;

  // 사이드바 상태
  isSidebarOpen: boolean;

  // 액션
  openImageModal: (imageUrl: string) => void;
  closeImageModal: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // 초기 상태
  isImageModalOpen: false,
  selectedImage: null,
  isSidebarOpen: false,

  // 액션
  openImageModal: (imageUrl: string) =>
    set({ isImageModalOpen: true, selectedImage: imageUrl }),

  closeImageModal: () => set({ isImageModalOpen: false, selectedImage: null }),

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setSidebarOpen: (open: boolean) => set({ isSidebarOpen: open }),
}));
