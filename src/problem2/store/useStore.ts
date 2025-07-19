import { createContext, useContext } from "react";
import type { Action, StoreState, Store, TokenPrice, Wallet } from "../types/token.type";

export const initialState: StoreState = {
    tokensPrice: [],
    wallet: {
        balance: [],
    },
    loading: false,
    error: null,
}

export const reducer = (state: StoreState, action: Action) => {
    switch (action.type) {
        case "SET_TOKENS_PRICE":
            return {
                ...state,
                tokensPrice: action.payload as TokenPrice[],
            }
        case "SET_WALLET_BALANCE":
            return {
                ...state,
                wallet: action.payload as Wallet,
            }
        default:
            return state
    }
}

export const StoreContext = createContext<Store>({state: initialState, dispatch: () => {}});

export function useStore() {
    return useContext(StoreContext);
}
    