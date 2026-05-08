import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-wide flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-brand">
        404
      </p>
      <h1 className="mt-3 text-4xl font-medium md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90"
      >
        Back home
      </Link>
    </div>
  );
}
