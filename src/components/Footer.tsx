import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <Container className="flex flex-col items-center justify-between gap-2 font-mono text-xs text-faint sm:flex-row">
        <span>© {new Date().getFullYear()} Gabriel Gamaroff</span>
        <span>Built with Next.js</span>
      </Container>
    </footer>
  );
}
