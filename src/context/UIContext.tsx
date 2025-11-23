import { createContext, useState, useContext, useMemo, type ReactNode } from 'react';
import type { FirePoint } from '../types/fire';

type ModalCategory = 'critical' | 'moderate' | 'total' | 'satellites';

interface UIState {
  isMenuOpen: boolean;
  isFiltersOpen: boolean;
  isMobileSidebarOpen: boolean;
  isModalOpen: boolean;
  modalCategory: ModalCategory;
  modalTitle: string;
  modalFires: FirePoint[];
  selectedFire: FirePoint | null;
  isStatsCollapsed: boolean;
}

interface UIContextType extends UIState {
  toggleMenu: () => void;
  toggleFilters: () => void;
  toggleMobileSidebar: () => void;
  openModal: (category: ModalCategory, title: string, fires: FirePoint[]) => void;
  closeModal: () => void;
  selectFire: (fire: FirePoint | null) => void;
  toggleStats: () => void;
  setIsFiltersOpen: (isOpen: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [uiState, setUiState] = useState<UIState>({
    isMenuOpen: false,
    isFiltersOpen: false,
    isMobileSidebarOpen: false,
    isModalOpen: false,
    modalCategory: 'total',
    modalTitle: '',
    modalFires: [],
    selectedFire: null,
    isStatsCollapsed: true,
  });

  const contextValue = useMemo(() => ({
    ...uiState,
    toggleMenu: () => setUiState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen })),
    toggleFilters: () => setUiState(prev => ({ ...prev, isFiltersOpen: !prev.isFiltersOpen })),
    toggleMobileSidebar: () => setUiState(prev => ({ ...prev, isMobileSidebarOpen: !prev.isMobileSidebarOpen })),
    openModal: (category: ModalCategory, title: string, fires: FirePoint[]) => {
      setUiState(prev => ({
        ...prev,
        isModalOpen: true,
        modalCategory: category,
        modalTitle: title,
        modalFires: fires,
      }));
    },
    closeModal: () => setUiState(prev => ({ ...prev, isModalOpen: false })),
    selectFire: (fire: FirePoint | null) => setUiState(prev => ({ ...prev, selectedFire: fire })),
    toggleStats: () => setUiState(prev => ({ ...prev, isStatsCollapsed: !prev.isStatsCollapsed })),
    setIsFiltersOpen: (isOpen: boolean) => setUiState(prev => ({...prev, isFiltersOpen: isOpen})),
  }), [uiState]);

  return (
    <UIContext.Provider value={contextValue}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
