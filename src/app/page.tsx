import TodoBoard from "@/components/TodoBoard";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start p-6">
      <h1 className="text-2xl font-bold">Todos</h1>
      <TodoBoard />
    </main>
  );
}
