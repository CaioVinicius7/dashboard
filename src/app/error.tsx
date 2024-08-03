"use client";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Whoops, algo aconteceu...</h1>

      <p className="text-accent-foreground">
        Um erro aconteceu na aplicação, abaixo você encontra mais detalhes:
      </p>

      <pre>{error?.message || JSON.stringify(error)}</pre>

      <button
        onClick={() => reset()}
        className="text-sky-600 dark:text-sky-400"
      >
        Tentar novamente
      </button>
    </div>
  );
}
