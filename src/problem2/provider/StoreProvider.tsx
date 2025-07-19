import { StoreContext } from "../store/useStore";
import { useEffect, useMemo, useReducer } from "react";
import { reducer, initialState } from "../store/useStore";
import {
  fetchAllTokensPrice,
  fetchWalletBalance,
} from "../httpClient/token.service";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = async () => {
    await fetchAllTokensPrice().then((prices) => {
      dispatch({ type: "SET_TOKENS_PRICE", payload: prices });
    });
    await fetchWalletBalance().then((balance) => {
      dispatch({ type: "SET_WALLET_BALANCE", payload: balance });
    });
  };

  useEffect(() => {
    init();
  }, []);
  const storeContext = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <StoreContext.Provider value={storeContext}>
      {children}
    </StoreContext.Provider>
  );
}
