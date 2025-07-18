import { useEffect, useState } from "react";
import { fetchAllTokens } from "../httpClient/token.service";
import type { Token } from "../types/token.type";
import TokenItem from "./TokenItem";

export default function Wallet() {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    fetchAllTokens().then(setTokens);
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      {tokens.map((token) => (
       <TokenItem key={token.currency} token={token} balance={0} />
        //   <div
        //     key={token.currency}
        //     className='flex items-center justify-between shadow p-3'
        //   >
        //     {/* Left section */}
        //     <div className='flex items-center gap-3 min-w-0'>
        //       <img
        //         src={token.icon}
        //         alt={token.currency}
        //         className='w-4 h-4 rounded-full flex-shrink-0'
        //       />
        //       <div className='flex flex-col min-w-0'>
        //         <div className='flex items-center gap-2 min-w-0'>
        //           <span className='font-semibold truncate max-w-[80px]'>
        //             {token.currency}
        //           </span>
        //         </div>
        //         <div className='flex items-center gap-2 mt-0.5'>
        //           <span className='text-sm text-gray-700'>
        //             ${token.price.toFixed(2)}
        //           </span>
        //           <span className='text-xs font-medium ml-1'>X</span>
        //         </div>
        //       </div>
        //     </div>
        //     {/* Right section: Balance */}
        //     <div className='flex flex-col items-end'>
        //       <span className='font-semibold text-base text-gray-900'>
        //         0.000
        //       </span>
        //       <span className='text-xs text-gray-500'>Balance</span>
        //     </div>
        //   </div>
      ))}
    </div>
  );
}
