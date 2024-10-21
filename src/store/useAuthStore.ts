import { UserData } from "../type/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type AuthStore = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  userData: Partial<UserData>;
  setUserData: (userData: Partial<UserData>) => void;
  setUserDataValue: (key: keyof UserData, value: any) => void;
  accessToken?: string;
  setAccessToken: (accessToken: string) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({
          isLoggedIn: false,
          userData: { id: "", nickName: "" },
          accessToken: "",
        }),
      userData: { id: "", nickName: "" },
      setUserData: (userData) => set({ userData }),
      setUserDataValue: (key, value) =>
        set((state) => ({
          userData: {
            ...state.userData,
            [key]: value,
          },
        })),
      accessToken: "",
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: "user-storage",
    }
  )
);
