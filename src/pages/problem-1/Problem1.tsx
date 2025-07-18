import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import FirstSolution from "./FirstSolution";
import { useState } from "react";
import { useRef } from "react";

export default function Problem1() {
  const [n, setN] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formRef.current?.n.value);
    setN(formRef.current?.n.value);
  };
  return (
    <div className='grid md:grid-cols-3 h-full p-4 gap-4'>
      <div className=' p-4 bg-gray-900 rounded-lg md:h-full md:col-span-1 md:max-h-full'>
        <div className='flex'>
          <div>
            <h1 className='text-3xl font-extrabold mb-4 text-gray-900 dark:text-white'>
              Problem 1: Three ways to sum to n
            </h1>
            <h2 className='text-xl font-bold mb-2 text-gray-800 dark:text-gray-100'>
              Task
            </h2>
            <p className='mb-2 text-gray-700 dark:text-gray-300'>
              Provide 3 unique implementations of the following function in
              JavaScript.
            </p>
            <ul className='mb-2 text-gray-700 dark:text-gray-300 list-disc list-inside'>
              <li>
                <strong>Input</strong>: <code>n</code> - any integer
              </li>
              <li>
                <em>
                  Assuming this input will always produce a result lesser than{" "}
                  <code>Number.MAX_SAFE_INTEGER</code>
                </em>
                .
              </li>
              <li>
                <strong>Output</strong>: <code>return</code> - summation to{" "}
                <code>n</code>, i.e.{" "}
                <code>sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15</code>.
              </li>
            </ul>
            <div className='mb-2'>
              <SyntaxHighlighter
                language='javascript'
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: "0.5rem",
                  fontSize: "0.95em",
                  padding: "1.25rem",
                }}
              >
                {`var sum_to_n_a = function(n) {
    // your code here
};

var sum_to_n_b = function(n) {
    // your code here
};

var sum_to_n_c = function(n) {
    // your code here
};`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
      <div className='md:col-span-2 px-4 bg-gray-900 rounded-lg md:h-full md:col-span-1 md:max-h-full overflow-y-auto'>
        <form
          onSubmit={onSubmit}
          ref={formRef}
          className='sticky top-0 bg-gray-900 py-4'
        >
          <label className='block text-lg font-extrabold uppercase tracking-widest mb-2 text-cyan-400 drop-shadow-[0_2px_8px_rgba(34,211,238,0.8)]'>
            Input an Integer
          </label>
          <div className='flex gap-4 items-center'>
            <input
              name='n'
              type='number'
              className='w-full px-5 py-3 rounded-xl border-4 border-cyan-400 bg-black bg-opacity-60 text-white text-xl font-bold focus:outline-none focus:ring-4 focus:ring-cyan-400 shadow-lg shadow-cyan-500/20 transition-all duration-200 placeholder:text-cyan-300'
              placeholder='Enter a number...'
            />
            <button
              type='submit'
              className='relative px-8 py-4 font-extrabold text-lg uppercase tracking-widest text-white bg-gradient-to-b from-[#1e293b] to-[#111827] border-4 border-pink-400 rounded-xl shadow-lg shadow-pink-500/30 hover:from-pink-500 hover:to-fuchsia-700 hover:shadow-pink-400/80 focus:outline-none focus:ring-4 focus:ring-pink-400 active:scale-95 transition-all duration-200 group cursor-pointer'
            >
              <span className='absolute inset-0 rounded-xl border-2 border-pink-400 blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-200 pointer-events-none'></span>
              <span className='relative z-10 drop-shadow-[0_2px_8px_rgba(244,114,182,0.7)]'>
                Sum
              </span>
            </button>
          </div>
        </form>
        <div className='mt-4 grid grid-cols-1 gap-8'>
          <FirstSolution n={n} />
          <FirstSolution n={n} />
          <FirstSolution n={n} />
        </div>
      </div>
    </div>
  );
}
