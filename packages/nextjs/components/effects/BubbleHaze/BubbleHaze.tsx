import './bubbleHaze.module.css';

export const BubbleHaze = () => {
  return (
    <div className="fixed pointer-events-none w-full flex flex-col justify-center items-center h-full">
      <div className="absolute container-a left-0 transition-all flex-col gap-5 flex items-center justify-center">
        <div className="g1 bubble"></div>
        <div className="g2 bubble -translate-x-20"></div>
      </div>
      <div className="absolute container-b right-0 transition-all flex items-center justify-center">
        <div className="g3 bubble translate-x-20"></div>
        <div className="g4 bubble"></div>
      </div>
    </div>
  );
}; 