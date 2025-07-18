import { useEffect, useState } from "react";
import { sum_to_n_c } from "../../problem1/sumHelperFunctions";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ThirdSolution({ n }: { n: null | number }) {
  const [explanation, setExplanation] = useState<string>("");
  const [typingText, setTypingText] = useState<string>("");
  const [index, setIndex] = useState(0);

  const handleNChange = (n: number) => {
    setIndex(0);
    setTypingText("");
    setExplanation("");
    const result = sum_to_n_c(n);

    const str = `**Input**: ${n}.\n${
      n <= 0
        ? "Input is less than or equal to 0, returns 0 immediately\n**Output**: 0."
        : n >= Number.MAX_SAFE_INTEGER
        ? `Input is too large (greater than or equal to Number.MAX_SAFE_INTEGER), returns ${Number.MAX_SAFE_INTEGER}`
        : `It calculates the sum of the first n natural numbers using **recursion, by repeatedly calling itself with n-1 until it reaches 0, then adding up all the values** as the recursion returns.\n**Output**: ${result}.`
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
      <h2 className='text-2xl font-bold'>Recursion</h2>
      <div className='whitespace-pre-wrap bg-white p-4 rounded-lg mt-4 text-black'>
        <Markdown remarkPlugins={[remarkGfm]}>{typingText}</Markdown>
      </div>
    </div>
  );
}
