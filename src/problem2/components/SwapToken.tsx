import { useEffect, useState, useCallback, useMemo } from "react";
import { useStore } from "../store/useStore";
import { TokenSelectModal } from "./TokenSelect";
import type { Token } from "../types/token.type";
import CurrencyInput, {
  type CurrencyInputOnChangeValues,
} from "react-currency-input-field";
import { formatCurrency } from "../utils/currencyFormat";
import Modal from "../ui-components/Modal";
import TokenItem from "./TokenItem";

export default function SwapToken() {
  const { state, dispatch } = useStore();
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    status: "",
    message: "",
  });
  const [fromToken, setFromToken] = useState<Token | undefined>(undefined);
  const [toToken, setToToken] = useState<Token | undefined>(undefined);
  const [fromAmount, setFromAmount] = useState("0.00");
  const [toAmount, setToAmount] = useState("0.00");

  const handleSwitchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  useEffect(() => {
    if (state.tokensPrice.length > 0) {
      setFromToken(state.tokensPrice[0]);
      setToToken(state.tokensPrice[1]);
    }
  }, [state.tokensPrice]);

  const handleFromTokenChange = (token: Token | undefined) => {
    if (!token) return;
    setFromToken(token);
    setFromAmount("0.00");
    setToAmount("0.00");
  };

  const handleToTokenChange = (token: Token | undefined) => {
    if (!token) return;
    setToToken(token);
    setFromAmount("0.00");
    setToAmount("0.00");
  };

  const getTokenBalance = useCallback(
    (token: Token | undefined) => {
      if (!token) return 0;
      const balance = state.wallet.balance.find(
        (b) => b.currency === token.currency
      );
      return balance?.total || 0;
    },
    [state.wallet.balance]
  );

  const getPrice = useCallback(
    (token: Token | undefined) => {
      if (!token) return 0;
      const price = state.tokensPrice.find(
        (p) => p.currency === token.currency
      )?.price;
      return price || 0;
    },
    [state.tokensPrice]
  );

  const exchangeRate = useMemo(() => {
    if (!fromToken || !toToken) return 0;
    const fromPrice = getPrice(fromToken);
    const toPrice = getPrice(toToken);
    return fromPrice && toPrice ? fromPrice / toPrice : 0;
  }, [fromToken, toToken, getPrice]);

  const onFromAmountChange = useCallback(
    (values: CurrencyInputOnChangeValues | undefined) => {
      if (!values) return;
      setFromAmount(values.value || "0");
      const toAmount = (values.float || 0) * exchangeRate;
      setToAmount(toAmount.toString());
    },
    [exchangeRate]
  );

  const fromAmontValidation = useMemo(() => {
    if (!fromToken) return true;
    const fromBalance = getTokenBalance(fromToken);
    return fromBalance >= Number(fromAmount);
  }, [fromToken, getTokenBalance, fromAmount]);

  const onToAmountChange = useCallback(
    (values: CurrencyInputOnChangeValues | undefined) => {
      if (!values) return;
      setToAmount(values.value || "0");
      const fromAmount = (values.float || 0) / exchangeRate;
      setFromAmount(fromAmount.toString());
    },
    [exchangeRate]
  );

  const isSwappable = useMemo(() => {
    if (!fromToken || !toToken) return false;
    const fromBalance = getTokenBalance(fromToken);
    return (
      !!Number(fromBalance) &&
      !!Number(fromAmount) &&
      !!Number(toAmount) &&
      Number(fromBalance) >= Number(fromAmount)
    );
  }, [fromToken, toToken, getTokenBalance, fromAmount, toAmount]);
  const handleSwap = () => {
    setIsModalOpen({
      isOpen: true,
      status: "swaping",
      message: "Swapping...",
    });
    const timeout = setTimeout(() => {
      dispatch({
        type: "SWAP_TOKEN",
        payload: {
          fromToken,
          toToken,
          fromAmount,
          toAmount,
        },
      });
      setFromAmount("0.00");
      setToAmount("0.00");
      setIsModalOpen({
        isOpen: true,
        status: "success",
        message: "Swap successful!",
      });
    }, 3000);
    return () => clearTimeout(timeout);
  };
  return (
    <div className='bg-gray-800 rounded-2xl p-6 text-white'>
      {/* Header */}
      <div className='flex items-center justify-center mb-4 text-center'>
        <h2 className='text-2xl font-semibold text-white'>Swap</h2>
      </div>
      {/* From Token Section */}
      <div className='mb-4'>
        <div className='justify-between bg-gray-700 rounded-xl p-4 w-full'>
          <TokenSelectModal
            tokens={state.tokensPrice}
            selectedToken={fromToken}
            onTokenSelect={(token) => handleFromTokenChange(token)}
          />
          <div className='text-right'>
            <CurrencyInput
              className='bg-transparent text-white text-xl font-semibold outline-none text-right w-full'
              name='fromAmount'
              placeholder='0.0000'
              value={fromAmount}
              decimalsLimit={4}
              maxLength={13}
              onValueChange={(_value, _name, values) =>
                onFromAmountChange(values)
              }
            />
            <div className='flex justify-between items-center text-gray-400 text-sm mt-1 font-semibold'>
              <div className='text-green-500'>
                ~ ${formatCurrency(getPrice(fromToken))}
              </div>
              <div>Balance: {formatCurrency(getTokenBalance(fromToken))}</div>
            </div>
          </div>
          <div className='text-red-400 py-2 relative text-xs text-right mt-1'>
            <div className='absolute top-0 left-0 w-full h-full'>
              {fromAmontValidation ? "" : "Your balance is not insufficient"}
            </div>
          </div>
        </div>
      </div>
      {/* Swap Arrow */}
      <div className='flex justify-center mb-4'>
        <button
          onClick={handleSwitchTokens}
          className='bg-gray-700 w-12 h-12 hover:bg-gray-600 rounded-full transition-colors cursor-pointer'
        >
          <i className='fas fa-exchange-alt rotate-90 text-md'></i>
        </button>
      </div>
      {/* To Token Section */}
      <div className='mb-6'>
        <div className='justify-between bg-gray-700 rounded-xl p-4 w-full'>
          <TokenSelectModal
            tokens={state.tokensPrice}
            selectedToken={toToken}
            onTokenSelect={handleToTokenChange}
          />
          <div className='text-right'>
            <CurrencyInput
              className='bg-transparent text-white text-xl font-semibold outline-none text-right w-full'
              name='toAmount'
              placeholder='0.0000'
              value={toAmount}
              decimalsLimit={4}
              maxLength={13}
              onValueChange={(_value, _name, values) => onToAmountChange(values)}
            />
            <div className='flex justify-between items-center text-gray-400 text-sm mt-1 font-semibold'>
              <div className='text-green-500'>
                ~ ${formatCurrency(getPrice(toToken))}
              </div>
              <div>Balance: {formatCurrency(getTokenBalance(toToken))}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Exchange Rate Info */}
      <div className='text-center text-gray-400 text-sm mb-6'>
        1 {fromToken?.currency} ~ {formatCurrency(exchangeRate)}{" "}
        {toToken?.currency}
      </div>
      {/* Swap Button */}
      <button
        disabled={!isSwappable}
        onClick={handleSwap}
        className='w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 rounded-xl transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
      >
        Swap
      </button>
      <Modal
        isOpen={isModalOpen.isOpen}
        onClose={() =>
          setIsModalOpen({ isOpen: false, status: "", message: "" })
        }
        showCloseButton={false}
        closeOnEscape={false}
      >
        <div className='flex flex-col items-center justify-center text-center gap-4'>
          {isModalOpen.status === "swaping" && (
            <>
              <h1>
                <i className='fas fa-sync text-yellow-500 animate-spin text-[40px]'></i>
              </h1>
              <div className=''>
                Swaping <span className='text-xl font-semibold text-yellow-500'>{formatCurrency(Number(fromAmount))} {fromToken?.currency}</span>.
              </div>
              <div className='flex items-center gap-6'>
                {" "} 
                <TokenItem token={fromToken!} />{" "}
                <i className='fas fa-arrow-right text-md'></i>{" "}
                <TokenItem token={toToken!} />
              </div>
              <div>
                You will receive{" "}
                <span className='text-xl font-semibold text-green-500'>
                  {formatCurrency(Number(toAmount))} {toToken?.currency}.
                </span>
                </div>
            
            </>
          )}
          {isModalOpen.status === "success" && (
            <>
              <h1>
                <i className='fas fa-check-circle text-green-500 text-[60px]'></i>
              </h1>
              <h2 className='text-2xl font-semibold text-white'>
                The transaction was successful ! Please check your wallet.
              </h2>

              <button
                onClick={() =>
                  setIsModalOpen({ isOpen: false, status: "", message: "" })
                }
                className='bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 rounded-xl w-full mt-4 transition-colors'
              >
                Done
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
