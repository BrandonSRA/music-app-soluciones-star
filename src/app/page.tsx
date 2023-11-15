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
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/singers`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  const singers: Singer[] = data;

  console.log(singers);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {singers.map((item) => {
        return <p key={item.id}>{item.name}</p>;
      })}
    </main>
  );
}
