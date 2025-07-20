import type { Token } from "../types/token.type";
import { useState } from "react";

export default function Token({ token }: { token: Token }) {
  const [imageError, setImageError] = useState(false);
  return (
    <div className='flex items-center gap-2'>
      {imageError ? (
        <div className='h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 font-bold'>
          {token?.currency.slice(0, 1).toUpperCase()}
        </div>
      ) : (
        <img
          className='h-10 w-10 rounded-full'
          src={token?.icon}
          alt={token?.currency}
          onError={() => setImageError(true)}
        />
      )}
      <div className='font-bold'>{token?.currency}</div>
    </div>
  );
}
