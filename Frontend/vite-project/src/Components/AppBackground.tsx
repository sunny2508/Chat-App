

const AppBackground:React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      
{/* Base */}
<div className="absolute inset-0 bg-zinc-900" />

{/* Micro grid */}
<div className="absolute inset-0 
  bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),
      linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]
  bg-size-[32px_32px]" />

{/* Sky glow */}
<div className="absolute -top-32 -left-32 size-105 bg-sky-400/20 blur-[140px]" />

{/* Pink glow */}
<div className="absolute bottom-0 -right-32 size-105 bg-pink-400/18 blur-[160px]" />

    </div>
  )
}

export default AppBackground