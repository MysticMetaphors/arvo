export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 z-1">
      <div className="absolute w-[200%] h-[200%] filter blur-[120px] animate-[auroraMove_12s_ease-in-out_infinite_alternate] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_70%),radial-gradient(circle_at_70%_40%,rgba(0,200,150,0.4),transparent_70%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(15,23,42,0.5),transparent_70%),radial-gradient(circle_at_70%_40%,rgb(0,255,153),transparent_70%)]"></div>
    </div>
  );
}
