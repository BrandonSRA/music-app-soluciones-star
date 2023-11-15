"use client";
import { useSingersContext } from "./shared";

export default function Home() {
  const { singers } = useSingersContext();

  console.log(singers);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {singers.map((item) => {
        return <p key={item.id}>{item.name}</p>;
      })}
    </main>
  );
}
