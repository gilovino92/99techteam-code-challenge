import TokenBalance from "./TokenBalance";
import { useStore } from "../store/useStore";

export default function Wallet() {
  const { state } = useStore();

  return (
    <div className='flex flex-col gap-4 bg-gray-800 rounded-2xl p-6'>
      <h2 className="text-2xl font-semibold text-white">Wallet</h2>
      {state.wallet.balance.map((balance) => (
        <TokenBalance
          key={balance.currency}
          balance={balance}
        />
      ))}
    </div>
  );
}
