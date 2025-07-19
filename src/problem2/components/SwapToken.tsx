import { useState } from "react";
import { useStore } from "../store/useStore";
import { TokenSelectModal } from "./TokenSelect";

export default function SwapToken() {
  const { state } = useStore();
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("EOS");
  const [fromAmount, setFromAmount] = useState("0.00");
  const [toAmount, setToAmount] = useState("0.00");
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);

  const availableTokens = [
    { symbol: "ETH", name: "Ethereum", balance: "1.0000 ETH" },
    { symbol: "EOS", name: "EOS", balance: "400.8089 EOS" },
    { symbol: "USDT", name: "Tether", balance: "1000.0000 USDT" },
    { symbol: "USDC", name: "USD Coin", balance: "500.0000 USDC" },
  ];

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const getTokenBalance = (token: string) => {
    const tokenData = availableTokens.find(t => t.symbol === token);
    return tokenData?.balance || "0.0000";
  };

  return (
    <div className='bg-gray-800 rounded-2xl p-6 text-white'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-white'>Swap</h2>
      </div>

      {/* From Token Section */}
      <div className='mb-4'>
        <div className='flex items-center justify-between bg-gray-700 rounded-xl p-4'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
              {fromToken.charAt(0)}
            </div>
            <div className='relative'>
              <button
                onClick={() => setIsFromDropdownOpen(!isFromDropdownOpen)}
                className='flex items-center gap-2 text-white hover:text-gray-300 transition-colors'
              >
                <span className='font-semibold'>{fromToken}</span>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </button>
              {isFromDropdownOpen && (
                <div className='absolute top-full left-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-20 min-w-[200px]'>
                  {availableTokens.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setFromToken(token.symbol);
                        setIsFromDropdownOpen(false);
                      }}
                      className='flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg text-left'
                    >
                      <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs'>
                        {token.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className='text-white font-medium'>{token.symbol}</div>
                        <div className='text-gray-400 text-sm'>{token.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='text-right'>
            <input
              type='text'
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className='bg-transparent text-white text-xl font-semibold outline-none text-right w-24'
              placeholder='0.00'
            />
            <div className='text-gray-400 text-sm mt-1'>
              Balance: {getTokenBalance(fromToken)}
            </div>
          </div>
        </div>
      </div>

      {/* Swap Arrow */}
      <div className='flex justify-center mb-4'>
        <button
          onClick={handleSwapTokens}
          className='p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors'
        >
          <svg className='w-5 h-5 text-white transform rotate-90' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' />
          </svg>
        </button>
      </div>

      {/* To Token Section */}
      <div className='mb-6'>
        <div className='flex items-center justify-between bg-gray-700 rounded-xl p-4'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
              {toToken.charAt(0)}
            </div>
            <div className='relative'>
              <button
                onClick={() => setIsToDropdownOpen(!isToDropdownOpen)}
                className='flex items-center gap-2 text-white hover:text-gray-300 transition-colors'
              >
                <span className='font-semibold'>{toToken}</span>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </button>
              {isToDropdownOpen && (
                <div className='absolute top-full left-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-20 min-w-[200px]'>
                  {availableTokens.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setToToken(token.symbol);
                        setIsToDropdownOpen(false);
                      }}
                      className='flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg text-left'
                    >
                      <div className='w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs'>
                        {token.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className='text-white font-medium'>{token.symbol}</div>
                        <div className='text-gray-400 text-sm'>{token.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='text-right'>
            <input
              type='text'
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              className='bg-transparent text-white text-xl font-semibold outline-none text-right w-24'
              placeholder='0.00'
            />
            <div className='text-gray-400 text-sm mt-1'>
              Balance: {getTokenBalance(toToken)}
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Rate Info */}
      <div className='text-center text-gray-400 text-sm mb-6'>
        1 EOS = 0.000004881
      </div>

      {/* Swap Button */}
      <button className='w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 rounded-xl transition-colors'>
        Swap
      </button>
      <TokenSelectModal
        tokens={state.tokensPrice}
        selectedToken={fromToken}
        onTokenSelect={setFromToken}
      />
    </div>
  );
}
