import type { Token } from "../types/token.type";
import { useState } from "react";

export default function TokenItem({
    token,
    balance,
}: {
    token: Token;
    balance: number;
}) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='flex-shrink-0 h-10 w-10'>
              {imageError ? (
                <div className='h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 font-bold'>
                    {token.currency.slice(0, 1).toUpperCase()}
                </div>
              ) : (
                <img
                  className='h-10 w-10 rounded-full'
                  src={token.icon}
                  alt={token.currency}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div className='ml-4'>
              <div className='text-sm leading-5 font-bold'>
                {token.currency}
              </div>
              <div className='text-xs leading-5 text-gray-400 font-semibold'>
                ${token.price}
              </div>
            </div>
          </div>
          <div className=''>
            <div className='text-sm leading-5 font-bold'>0.000</div>
            <div className='text-xs leading-5 text-gray-400 font-semibold'>
              Balance
            </div>
          </div>
        </div>
    )
}