import { User } from "@/features/user/schemas/user.schema";
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

type States = {
  authUser: User | null;
  // role: "buyer" | "seller" | null;
};

type Actions = {
  setAuthUser: (user: User) => void;
  // setRole: (role: "buyer" | "seller" | null) => void;
};

export const useAuthStore = create<States & Actions>()(
  devtools(
    persist(
      (set) => ({
        authUser: null,
        role: null,
        setAuthUser: (user) => set({ authUser: user }),
        // setRole: (role) => set({ role: role }),
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => sessionStorage),
        // partialize: (state) => ({ role: state.role }),
      }
    )
  )
);
