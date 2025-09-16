import { create } from 'zustand';

type ConfigIconsStore = {
  expandedStates: Map<string, boolean>;
  
  // actions
  setExpanded: (id: string, expanded: boolean) => void;
  resetAllExpanded: () => void;
  isExpanded: (id: string) => boolean;
};

export const useConfigIconsStore = create<ConfigIconsStore>((set, get) => ({
  expandedStates: new Map(),
  
  setExpanded: (id: string, expanded: boolean) => {
    set((state) => {
      const newMap = new Map(state.expandedStates);
      newMap.set(id, expanded);
      return { expandedStates: newMap };
    });
  },
  
  resetAllExpanded: () => {
    set({ expandedStates: new Map() });
  },
  
  isExpanded: (id: string) => {
    return get().expandedStates.get(id) || false;
  },
}));
