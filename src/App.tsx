import AppRouter from "./app/router";

export default function App() {
  return (
    <>
      <header className="app-header">
        <h1>My garage</h1>
      </header>

      <main>
        <AppRouter />
      </main>
    </>
  );
}
