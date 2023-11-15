interface Singer {
  id: string;
  avatar: string;
  name: string;
  age: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

export default async function Home() {
  const singers = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/singers`
  ).then((res) => res.json() as Promise<Singer[]>);
  console.log(singers);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {singers.map((item) => {
        return <p>{item.name}</p>;
      })}
    </main>
  );
}
