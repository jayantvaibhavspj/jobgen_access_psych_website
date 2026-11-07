import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="not-found-page">
      <div>
        <span className="section-eyebrow">404 / Page not found</span>
        <h1>Let’s find our way back.</h1>
        <p>The page you’re looking for may have moved.</p>
        <Link className="button button-dark" href="/">Back to homepage <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
