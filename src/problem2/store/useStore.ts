import { createContext, useContext } from "react";
import type {
  Action,
  StoreState,
  Store,
  TokenPrice,
  Wallet,
  SwapPayload,
} from "../types/token.type";

export const initialState: StoreState = {
  tokensPrice: [],
  wallet: {
    balance: [],
  },
  loading: false,
  error: null,
};

export const reducer = (state: StoreState, action: Action) => {
  switch (action.type) {
    case "SET_TOKENS_PRICE":
      return {
        ...state,
        tokensPrice: action.payload as TokenPrice[],
      };
    case "SET_WALLET_BALANCE":
      return {
        ...state,
        wallet: action.payload as Wallet,
      };
    case "SWAP_TOKEN": {
      const { fromToken, toToken, fromAmount, toAmount } = action.payload as SwapPayload;
      const newWalletBalance = [...state.wallet.balance];
      const fromTokenIndex = newWalletBalance.findIndex(
        (token) => token.currency === fromToken.currency
      );
      const toTokenIndex = newWalletBalance.findIndex(
        (token) => token.currency === toToken.currency
      );
      newWalletBalance[fromTokenIndex] = {
        ...newWalletBalance[fromTokenIndex],
        total: newWalletBalance[fromTokenIndex].total - Number(fromAmount),
      };
      if(toTokenIndex !== -1){
        newWalletBalance[toTokenIndex] = {
          ...newWalletBalance[toTokenIndex],
          total: newWalletBalance[toTokenIndex].total + Number(toAmount),
        };
      } else {
        newWalletBalance.push({
          ...toToken,
          total: Number(toAmount),
        });
      }
      return {
        ...state,
        wallet: {
          ...state.wallet,
          balance: newWalletBalance,
        },
      };
    }
    default:
      return state;
  }
};

export const StoreContext = createContext<Store>({
  state: initialState,
  dispatch: () => {},
});

export function useStore() {
  return useContext(StoreContext);
}
