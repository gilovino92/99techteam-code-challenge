import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function ProblemThreeSolution() {
  const options = {
    language: "typescript",
    style: atomOneDark,
    wrapLongLines: true,
    customStyle: {
      borderRadius: "0.5rem",
      fontSize: "14px",
      padding: "1rem",
      backgroundColor: "#151B23",
    },
  };
  return (
    <div className='flex flex-col gap-10 p-6 mx-auto bg-[#0D1117] rounded-lg'>
      {/* Problem 1 */}
      <div className='flex flex-col'>
        <div className='text-xl font-bold'>Problem 1</div>
        <hr className='border-gray-700 my-2' />
        <div className='mb-4'>
          <h2 className='text-sm font-bold mb-2 flex items-center gap-2'>
            Original problem
          </h2>
          <SyntaxHighlighter {...options}>
            {`interface WalletBalance {
  currency: string;
  amount: number;
}

interface FormattedWalletBalance {
  // ⚠️ FormattedWalletBalance could be extended from WalletBalance
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {
  // ❌ Empty interface
}`}
          </SyntaxHighlighter>
        </div>
        <div>
          <h2 className='text-sm font-bold mb-2'>Refactored (fixed)</h2>
          <SyntaxHighlighter {...options}>
            {`interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

type WalletPageProps = BoxProps;`}
          </SyntaxHighlighter>
        </div>
      </div>
      {/* Problem 2 */}
      <div className='flex flex-col'>
        <div className='text-xl font-bold'>Problem 2</div>
        <hr className='border-gray-700 my-2' />
        <div className='mb-4'>
          <h2 className='text-sm font-bold flex items-center mb-2'>
            Original problem
          </h2>
          <SyntaxHighlighter {...options}>
            {`const WalletPage: React.FC<Props> = (props: Props) => {
  // ⚠️ props can be destructured into children and rest props
  const { children, ...rest } = props; // ⚠️ This line can be removed to use spread operator to extract children and rest props on parameters
  ...
}`}
          </SyntaxHighlighter>
        </div>
        <div>
          <h2 className='text-sm font-bold flex items-center mb-2'>
            Refactored (fixed)
          </h2>
          <SyntaxHighlighter {...options}>
            {`const WalletPage: React.FC<Props> = ({children, ...rest}: Props) => {
  ...
}`}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Problem 3 */}
      <div className='flex flex-col'>
        <div className='text-xl font-bold'>Problem 3</div>
        <hr className='border-gray-700 my-2' />
        <div className='mb-4'>
          <h2 className='text-sm font-bold flex items-center mb-2'>
            Original problem
          </h2>
          <SyntaxHighlighter {...options}>
            {`  const getPriority = (blockchain: any): number => {
    // ❌ blockchain should be defined as Blockchain type which has type as string and these values - 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };`}
          </SyntaxHighlighter>
        </div>
        <div>
          <h2 className='text-sm font-bold flex items-center mb-2'>
            Refactored (fixed)
          </h2>
          <SyntaxHighlighter {...options}>
            {`type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo'

const getPriority = (blockchain: Blockchain): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};`}
          </SyntaxHighlighter>
        </div>
      </div>

       {/* Problem 4 */}
       <div className='flex flex-col'>
        <div className='text-xl font-bold'>Problem 4</div>
        <hr className='border-gray-700 my-2' />
        <div className='mb-4'>
          <h2 className='text-sm font-bold flex items-center mb-2'>
            Original problem
          </h2>
          <SyntaxHighlighter {...options}>
            {`  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        // ❌ 'balancePriority' is declared but its value is never read
        const balancePriority = getPriority(balance.blockchain); // ❌ the blockchain property not exist in WalletBalance,
        
        if (lhsPriority > -99) { // ❌ lhsPriority is undefined
          // ❌ Wrong logic - should be balance.amount > 0 in order to filter out non-positive balances
          if (balance.amount <= 0) {
            return true; // ⚠️ return combined conditions for better code readability
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain); // ❌ the blockchain property not exist in WalletBalance
        const rightPriority = getPriority(rhs.blockchain); // ❌ the blockchain property not exist in WalletBalance
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        // ❌  missing return 0 when leftPriority === rightPriority
      });
  }, [balances, prices]); // ❌ prices is not needed as dependency it is not used in the function`}
          </SyntaxHighlighter>
        </div>
        <div>
          <h2 className='text-sm font-bold flex items-center mb-2'>
            Refactored (fixed)
          </h2>
          <SyntaxHighlighter {...options}>
            {`type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo'

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        return 0;
      });
  }, [balances]);`}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Problem 5 */}
      <div className='flex flex-col'>
        <div className='text-xl font-bold'>Problem 5</div>
        <hr className='border-gray-700 my-2' />
        <div className='mb-4'>
          <h2 className='text-sm font-bold flex items-center mb-2'>
            Original problem
          </h2>
          <SyntaxHighlighter {...options}>
            {`  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    // ⚠️ use useMemo hook to memoize the result of this map - performance optimization
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });`}
          </SyntaxHighlighter>
        </div>
        <div>
          <h2 className='text-sm font-bold flex items-center mb-2'>
            Refactored (fixed)
          </h2>
          <SyntaxHighlighter {...options}>
            {`  const formattedBalances = useMemo(() => sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  }), [sortedBalances]);`}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Problem 6 */}
      <div className='flex flex-col'>
        <div className='text-xl font-bold'>Problem 5</div>
        <hr className='border-gray-700 my-2' />
        <div className='mb-4'>
          <h2 className='text-sm font-bold flex items-center mb-2'>
            Original problem
          </h2>
          <SyntaxHighlighter {...options}>
            {`
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;

 const rows = sortedBalances.map(
  // ❌  sortedBalances should be formattedBalances.
  // ⚠️ Use useMemo with dependencies as [formattedBalances, prices] hook to memoize the result of this map - performance optimization
  (balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount; // ❌ Need to check whether prices[balance.currency] is undefined or not
    return (
      <WalletRow
        className={classes.row} // ❌  classes is not defined
        key={index} // ⚠️ Using index as key is not recommended as items could be re-rendered everytime if an item is inserted, deleted, or if the array gets reordered.
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted} ❌  formatted doesn't exist in type WalletBalance
      />
    );
  }
);

return <div {...rest}>{rows}</div>; //  ⚠️ missing fallback rendering for empty rows.
}`}
          </SyntaxHighlighter>
        </div>
        <div>
          <h2 className='text-sm font-bold flex items-center mb-2'>
            Refactored (fixed)
          </h2>
          <SyntaxHighlighter {...options}>
            {`const WalletPage: React.FC<Props> = ({children, ...rest}: Props) => {
    const balances = useWalletBalances();
    const prices = usePrices();
    
    const rows = useMemo(() => {
        if(!balances || !balances.length) {
        return [];
        }
        return formattedBalances.map(
        (balance: FormattedWalletBalance, index: number) => {
            const usdValue = (prices[balance.currency] ?? 0) * balance.amount; 
            return (
            <WalletRow
                key={balance.currency}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
            );
        }), [formattedBalances, prices]);

    return (
        <>
        { !!rows.length && <div {...rest}>{rows}</div>}
        { !rows.length && <div  {...rest}>No balances to show</div>}
        </>
    )
};`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
