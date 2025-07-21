import { Link } from "react-router-dom";

export default function ProblemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className='px-8 py-2 bg-gray-900 sticky top-0 z-50'>
        <div className='flex justify-between items-center'>
          <Link to="/" className='text-2xl font-extrabold uppercase tracking-widest text-white'>CODE CHALLENGE</Link>
          <Link
            to='/'
            className='relative w-12 h-12 flex items-center justify-center font-extrabold text-lg uppercase tracking-widest text-white bg-gradient-to-b from-[#1e293b] to-[#111827] border-4 border-green-400 rounded-full shadow-lg shadow-green-500/30 hover:from-green-500 hover:to-green-700 hover:shadow-green-400/80 focus:outline-none focus:ring-4 focus:ring-green-400 active:scale-95 transition-all duration-200 group cursor-pointer'
          >
            {" "}
            <i className='fa fa-home text-2xl'></i>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
