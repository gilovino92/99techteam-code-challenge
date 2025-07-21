import ProblemThreeSolution from "../../problem3/ProblemThreeSolution";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Problem3() {
  return (
    <div className='min-h-screen grid md:grid-cols-3 h-full p-4 gap-4'>
      <div className=' p-4 bg-gray-900 rounded-lg md:h-full md:col-span-1 md:max-h-full'>
        <div className='flex'>
          <div>
            <h1 className='text-3xl font-extrabold mb-4 text-gray-900 dark:text-white'>
              Problem 3: Messy React
            </h1>
            <p className='mb-2 text-gray-700 dark:text-gray-300'>
              List out the computational inefficiencies and anti-patterns found
              in the code block below.
            </p>
            <ul className='mb-2 text-gray-700 dark:text-gray-300 list-decimal list-inside'>
              <li>
                This code block uses
                <ul className='list-disc list-inside'>
                  <li>ReactJS with TypeScript.</li>
                  <li>Functional components.</li>
                  <li>React Hooks</li>
                </ul>
              </li>
              <li>
                You should also provide a refactored version of the code, but
                more points are awarded to accurately stating the issues and
                explaining correctly how to improve them.
              </li>
            </ul>
            <SyntaxHighlighter
              language='typescript'
              style={atomOneDark}
              wrapLongLines={true}
              customStyle={{
                borderRadius: "0.5rem",
                fontSize: "14px",
                padding: "1rem",
                backgroundColor: "#151B23",
              }}
            >
              {`interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}`}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
      <div className='md:col-span-2 px-4 bg-gray-900 rounded-lg md:h-full md:col-span-1 md:max-h-full overflow-y-auto'>
        <ProblemThreeSolution />
      </div>
    </div>
  );
}
