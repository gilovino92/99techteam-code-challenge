import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { useRef } from "react";
import Wallet from "../../problem2/components/Wallet";

export default function Problem2() {
  const [n, setN] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formRef.current?.n.value);
    setN(Number(formRef.current?.n.value));
  };
  return (
    <div className='grid md:grid-cols-3 h-full p-4 gap-4'>
      <div className=' p-4 bg-gray-900 rounded-lg md:h-full md:col-span-1 md:max-h-full'>
        <div className='flex'>
          <div>
            <h1 className='text-3xl font-extrabold mb-4 text-gray-900 dark:text-white'>
              Problem 2: Fancy Form
            </h1>
            <h2 className='text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100'>
              Task
            </h2>
            <p className='mb-2 text-gray-700 dark:text-gray-300'>
              Create a currency swap form based on the template provided in the
              folder. A user would use this form to swap assets from one
              currency to another.
             
            </p>
            <p className="mb-2 text-gray-400"> <i>You may use any third party plugin, library,
            and/or framework for this problem.</i></p>
            <ul className='mb-2 text-gray-700 dark:text-gray-300 list-decimal list-inside'>
              <li>You may add input validation/error messages to make the form interactive.</li>
              <li>Your submission will be rated on its usage intuitiveness and visual attractiveness.</li>
              <li>Show us your frontend development and design skills, feel free to totally disregard the provided files for this problem.</li>
              <li>You may use this <a className="text-gray-400 underline hover:text-blue-500" href="https://github.com/Switcheo/token-icons/tree/main/tokens">repo</a> for token images, e.g. <a className="text-gray-400 underline hover:text-blue-500" href="https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg">SVG image</a>.</li>
              <li>You may use this <a className="text-gray-400 underline hover:text-blue-500" href="https://interview.switcheo.com/prices.json">URL</a> for token price information and to compute exchange rates (not every token has a price, those that do not can be omitted).</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='md:col-span-2 px-4 bg-gray-900 rounded-lg md:h-full md:col-span-1 md:max-h-full overflow-y-auto'>
        <div className='mt-4 grid grid-cols-1 gap-8'>
          <Wallet />
        </div>
      </div>
    </div>
  );
}
