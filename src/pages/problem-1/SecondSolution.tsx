import { useEffect, useState } from "react";
import { sum_to_n_b } from "../../problem1/sumHelperFunctions";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SecondSolution({ n }: { n: null | number }) {
  const [explanation, setExplanation] = useState<string>("");
  const [typingText, setTypingText] = useState<string>("");
  const [index, setIndex] = useState(0);

  const handleNChange = (n: number) => {
    setIndex(0);
    setTypingText("");
    setExplanation("");
    const result = sum_to_n_b(n);

    const str = `**Input**: ${n}.\n${
      n <= 0
        ? "Input is less than or equal to 0, returns 0 immediately\n**Output**: 0."
        : n >= Number.MAX_SAFE_INTEGER
        ? `Input is too large (greater than or equal to Number.MAX_SAFE_INTEGER), returns ${Number.MAX_SAFE_INTEGER}`
        : `It uses **Gauss's formula** to calculate the sum of the first ${n} natural numbers: **(n * (n + 1)) / 2**.\nAfter the calculation, it returns the computed sum.\n**Output**: ${result}.`
    }`;
    setExplanation(str.trim()); 
  };

  useEffect(() => {
    if (n === null) return;
    handleNChange(n);
  }, [n]);

  useEffect(() => {
    if (!explanation) return;
    if (index < explanation.length) {
      const timeoutId = setTimeout(() => {
        setTypingText((prev) => prev + explanation.charAt(index));
        setIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timeoutId);
    }
  }, [explanation, index]);

  return (
    <div>
      <h2 className='text-2xl font-bold'>Gauss's formula</h2>
      <div className='whitespace-pre-wrap bg-white p-4 rounded-lg mt-4 text-black'>
        <Markdown remarkPlugins={[remarkGfm]}>{typingText}</Markdown>
      </div>
    </div>
  );
}
