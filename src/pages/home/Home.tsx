import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='min-h-screen flex w-full h-full items-center justify-center'>
      <div className=''>
        <h1 className='relative font-extrabold uppercase tracking-widest text-center mb-12 text-cyan-400 drop-shadow-[0_6px_32px_rgba(34,211,238,0.8)]'>
          <div className='relative z-10 text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400'>
            <span className="text-9xl">CODE</span>
            <br />
            <span className="text-5xl">CHALLENGE</span>
          </div>
        </h1>
        <div className='flex flex-col gap-8 max-w-[400px] mx-auto'>
          {/* Cyan Button */}
          <Link
            to='/problem-1'
            className='relative px-10 py-4 font-extrabold text-lg uppercase tracking-widest text-white bg-gradient-to-b from-[#1e293b] to-[#111827] border-4 border-[#38bdf8] rounded-xl shadow-lg shadow-cyan-500/30 hover:from-[#0ea5e9] hover:to-[#0369a1] hover:shadow-cyan-400/80 focus:outline-none focus:ring-4 focus:ring-cyan-400 active:scale-95 transition-all duration-200 group cursor-pointer flex items-center justify-center'
          >
            <span className='absolute inset-0 rounded-xl border-2 border-cyan-400 blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-200 pointer-events-none'></span>
            <span className='relative z-10 drop-shadow-[0_2px_8px_rgba(56,189,248,0.7)]'>
              Problem 1
            </span>
          </Link>
          {/* Pink Button */}
          <Link
            to='/problem-2'
            className='relative px-10 py-4 font-extrabold text-lg uppercase tracking-widest text-white bg-gradient-to-b from-[#831843] to-[#111827] border-4 border-[#f472b6] rounded-xl shadow-lg shadow-pink-500/30 hover:from-[#db2777] hover:to-[#be185d] hover:shadow-pink-400/80 focus:outline-none focus:ring-4 focus:ring-pink-400 active:scale-95 transition-all duration-200 group cursor-pointer flex items-center justify-center'
          >
            <span className='absolute inset-0 rounded-xl border-2 border-pink-400 blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-200 pointer-events-none'></span>
            <span className='relative z-10 drop-shadow-[0_2px_8px_rgba(244,114,182,0.7)]'>
              Problem 2
            </span>
          </Link>
          {/* Lime Button */}
          <Link
            to='/problem-3'
            className='relative px-10 py-4 font-extrabold text-lg uppercase tracking-widest text-white bg-gradient-to-b from-[#365314] to-[#111827] border-4 border-[#a3e635] rounded-xl shadow-lg shadow-lime-500/30 hover:from-[#84cc16] hover:to-[#365314] hover:shadow-lime-400/80 focus:outline-none focus:ring-4 focus:ring-lime-400 active:scale-95 transition-all duration-200 group cursor-pointer flex items-center justify-center'
          >
            <span className='absolute inset-0 rounded-xl border-2 border-lime-400 blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-200 pointer-events-none'></span>
            <span className='relative z-10 drop-shadow-[0_2px_8px_rgba(163,230,53,0.7)]'>
              Problem 3
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
