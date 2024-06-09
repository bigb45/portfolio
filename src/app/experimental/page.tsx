"use client";
import { Nova_Square } from "next/font/google";
import Image from "next/image";
import { FunctionComponent, useEffect, useRef, useState } from "react";
interface ExperimentalProps {}
const nova = Nova_Square({
  weight: "400",
  subsets: ["latin"],
});
const Experimental: FunctionComponent<ExperimentalProps> = () => {
  const [width, setWidth] = useState<number>(0);
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      const div = headerRef.current;
      // @ts-ignore
      setWidth(div.getBoundingClientRect().width);
      // console.log(div.getBoundingClientRect().width);
    }
  }, [headerRef]);
  return (
    <div className="select-none flex flex-col h-full w-full  min-h-screen items-center p-24 text-foreground bg-background">
      <div
        className={`header min-w-fit  flex flex-col justify-center items-center`}
        ref={headerRef}
      >
        <p className="text-[64px] font-extrabold  scale-x-[6] scale-y-[2] tracking-[-2px] text-center">
          DREAM
        </p>
        <div
          className={`flex flex-row justify-between`}
          style={{ width: width * 6 }}
        >
          {/* No 88 */}
          <div className="flex space-x-4 text-[64px]">
            <div className="italic">N°</div>
            <div>88</div>
          </div>
          {/* i don't know */}
          <div></div>

          {/* schedule */}
          <div className="flex flex-row gap-6">
            <div className="flex-col flex ">
              <p>9:54PM</p>
              <p>6:12AM</p>
              <p>8:16 HOURS</p>
            </div>
            <div className="flex-col flex ">
              <p>LYING</p>
              <p>WAKE UP</p>
              <p>SLEEP</p>
            </div>
          </div>
          {/* chilling */}
          <div className="translate-x-10 px-10 -translate-y-8">
            <div className="w-28 text-background bg-foreground h-20 front"></div>
            <div className="w-5 text-background bg-foreground h-20 left"></div>
            <div
              className={`w-28 text-background bg-foreground h-5 top flex items-center justify-center ${nova.className}`}
            >
              CHILLING
            </div>
          </div>
          {/* sphere */}
          <div className="rotate-[-20deg]">
            <Image
              src="/Sphere_wireframe.svg"
              alt="sphere"
              width={100}
              height={100}
            />
          </div>
          {/* description */}
          <div className="w-64 text-sm text-justify tracking-widest">
            A SERIES OF THOUGHTS, IMAGES, AND SENSATIONS OCCURING IN MIND
          </div>

          {/* barcode */}
          <div className="flex flex-row">
            {Array.from({ length: 20 }).map((_, i) => {
              const randomWidth = Math.floor(Math.random() * (15 - 4) + 4);
              return (
                <div
                  key={i}
                  style={{
                    width: `${randomWidth}px`,
                    marginLeft: `${5}px`,
                  }}
                  className={`h-10 bg-foreground`}
                ></div>
              );
            })}
          </div>
        </div>
        <div className="w-full  text-center [word-spacing:200px]">
          YOU MUST REALIZE THEM IF YOU WANT TO TOUCH HAPPINESS IN YOUR LIFE
        </div>
      </div>
      <div className="min-h-[100%]">
        <p>WEBSITES SO GOOD YOU WANNA PUT THEM ON A SHIRT &#169;</p>
      </div>
    </div>
  );
};

export default Experimental;
