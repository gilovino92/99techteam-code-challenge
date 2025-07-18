import { useEffect, useState } from "react";
import { sum_to_n_a } from "../../problem1/sumHelperFunctions";
import SyntaxHighlighter from "react-syntax-highlighter";


export default function FirstSolution({ n }: { n: null|number}) {
  const [explanation, setExplanation] = useState<string>("");
  const [typingText, setTypingText] = useState<string>("");
  const [index, setIndex] = useState(0);

  const handleNChange = (n: number) => {
    setIndex(0);
    setTypingText("");
    setExplanation("");
    const result = sum_to_n_a(n);

    const str = `Summary of the run:\nThe function receives an input ${n}.\n${
      n <= 0
        ? "is less than 0, returns 0 immediately"
        : n >= Number.MAX_SAFE_INTEGER
        ? `Too large (greater than or equal to Number.MAX_SAFE_INTEGER), returns ${Number.MAX_SAFE_INTEGER}`
        : `It initializes a variable sum to 0.\nIt then loops from 1 up to and including ${n}, adding each value to sum.\nAfter the loop, it returns the computed sum: <strong>${result}</strong>.`
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
      <h2 className='text-2xl font-bold'>Sum To N using for loop</h2>
      <SyntaxHighlighter language='markdown' customStyle={{
          borderRadius: "0.5rem",
          fontSize: "0.95em",
          padding: "1.25rem",
        }}>
        {
          typingText
        }
          
        </SyntaxHighlighter>
    </div>
  );
}
