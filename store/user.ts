import { clientCookies } from "@/utils/cookie";
import { create } from "zustand";

export type State = {
  isLogined: boolean;
};

type Action = {
  logout: () => void;
};

export const initValue = {
  isLogined: !!clientCookies.get("accessToken"),
};

const useUserStore = create<State & Action>((set, get) => ({
  ...initValue,

  logout: () => set({ isLogined: false }),
  login: () => set({ isLogined: true }),
}));

export default useUserStore;
