import type { TokenBalance } from "../types/token.type";
import { useState, useMemo } from "react";
import { formatCurrency } from "../utils/currencyFormat";
import { useStore } from "../store/useStore";

interface TokenBalanceProps {
    balance: TokenBalance;
}

export default function TokenBalance({
    balance,
}: TokenBalanceProps) {
    const { state } = useStore();
    const [imageError, setImageError] = useState(false);

    const price = useMemo(() => {
        const price = state.tokensPrice.find((p) => p.currency === balance.currency);
        return price?.price;
    }, [balance.currency, state.tokensPrice]);

    return (
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='flex-shrink-0 h-10 w-10'>
              {imageError ? (
                <div className='h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 font-bold'>
                    {balance.currency.slice(0, 1).toUpperCase()}
                </div>
              ) : (
                <img
                  className='h-10 w-10 rounded-full'
                  src={balance.icon}
                  alt={balance.currency}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div className='ml-4'>
              <div className='text-sm leading-5 font-bold'>
                {balance.currency}
              </div>
              <div className='text-xs leading-5 text-gray-400 font-semibold'>
                ${formatCurrency(price ?? 0)}
              </div>
            </div>
          </div>
          <div className=''>
            <div className='text-sm leading-5 font-bold'>{formatCurrency(balance.total)}</div>
            <div className='text-xs leading-5 text-gray-400 font-semibold text-right'>
              Balance
            </div>
          </div>
        </div>
    )
}