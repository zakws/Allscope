/**
 * Route transition: a fast fade on navigation. Pure CSS; skipped under
 * prefers-reduced-motion (see globals.css). Never delays navigation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-fade">{children}</div>;
}
