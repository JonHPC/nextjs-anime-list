"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

export const fetchAnime = async (page: number) => {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
  );

  const data = await response.json();

  console.log(data);

  return data.map((item: AnimeProp, index: number) => (
    <AnimeCard key={item.id} anime={item} index={index} />
  ))
}


/*
Summary: 
- We fetch the data and return it as a map over page
- We know this is a server action, and is used at the Home page (server page) 
- and Load More component (client side rendered page)[But WE STILL CAN USE "server actions" to fetch data!]
- Infinite scroll is just going to the next page
- Framer Motion can be used in SSR pages by making a separate MotionDiv component that we make client side
*/