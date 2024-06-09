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
          {/* chilling */}
          <div className="cubeContainer">
            <div className="w-28 text-background bg-foreground h-20 front"></div>
            <div className="w-5 text-background bg-foreground h-20 left"></div>
            <div
              className={`w-28 text-background bg-foreground h-5 top flex items-center justify-center ${nova.className}`}
            >
              CHILLING
            </div>
          </div>
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

          {/* sphere */}
          <Image
            src={"/Sphere_wireframe.svg"}
            alt="sphere"
            color="background"
            width={20}
            height={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Experimental;
