"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { fetchAnime } from "@/app/action";
import AnimeCard, { AnimeProp } from "@/components/AnimeCard";


let page = 2; 

export type AnimeCard = JSX.Element;

function LoadMore() {

  // This hook is used to load when we reach the div with the ref
  const { ref, inView } = useInView();

  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect(() => {
    // Only if we are InView, run this code
    if(inView) {
      // We call this function, and we want to update the data, but ALSO keep track of the data we already have
      // So we return an array, spread the existing data, then add all the data from the response by spreading it too
      fetchAnime(page)
      .then((res) => {
        setData([...data, ...res])
        page++
      });
    }
  }, [inView, data]) //dependency array that tracks inView and data

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
