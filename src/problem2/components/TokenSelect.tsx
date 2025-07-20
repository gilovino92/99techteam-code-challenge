import { useState, useMemo, useCallback } from "react";
import type { TokenPrice, Token } from "../types/token.type";
import Modal from "../ui-components/Modal";
import { useStore } from "../store/useStore";
import TokenItem from "./TokenItem";
import { formatCurrency } from "../utils/currencyFormat";
interface TokenSelectModalProps {
  tokens: TokenPrice[];
  selectedToken?: Token;
  onTokenSelect: (token: Token) => void;
}

export function TokenSelectModal({
  tokens,
  selectedToken,
  onTokenSelect,
}: TokenSelectModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useStore();

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setIsOpen(false);
  };

  const selectedTokenData = useMemo(
    () =>
      selectedToken
        ? tokens.find((token) => token.currency === selectedToken.currency)
        : null,
    [tokens, selectedToken]
  );

  const getTokenBalance = useCallback(
    (token: Token) => {
      const balance = state.wallet.balance.find(
        (b) => b.currency === token.currency
      );
      return balance?.total || 0;
    },
    [state.wallet.balance]
  );

  const selectTokenList = useMemo(() => {
    const hasBalanceList = state.wallet.balance
      .sort((a, b) => b.total - a.total)
      .map((token) => ({ currency: token.currency, icon: token.icon }));

    const noBalanceList = tokens
      .filter(
        (token) => !hasBalanceList.find((t) => t.currency === token.currency)
      )
      .sort((a, b) => (a.currency > b.currency ? 1 : -1));

    return [...hasBalanceList, ...noBalanceList];
  }, [tokens, state.wallet.balance]);

  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='flex items-center justify-between gap-6 bg-gray-700 hover:bWg-gray-600 rounded-lg py-2 transition-colors text-white cursor-pointer w-full'
      >
        {selectedTokenData && <TokenItem token={selectedTokenData} />}

        <i className='fas fa-external-link-alt'></i>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title='Select Token'
      >
        <div className='space-y-2'>
          {selectTokenList.map((token) => (
            <button
              key={token.currency}
              onClick={() => handleTokenSelect(token)}
              className={`
                w-full flex items-center justify-between gap-3 p-3 rounded-lg transition-colors text-left
                hover:bg-gray-700 cursor-pointer
                ${
                  selectedToken?.currency === token.currency
                    ? "bg-gray-700 ring-2 ring-blue-500"
                    : ""
                }
              `}
            >
              <TokenItem token={token} />
              <div className='flex flex-col items-end'>
                <div className='text-sm leading-5 font-bold'>
                  {formatCurrency(getTokenBalance(token))}
                </div>
                <div className='text-xs leading-5 text-gray-400 font-semibold text-right'>
                  Balance
                </div>
              </div>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
