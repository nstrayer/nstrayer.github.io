export const navItems = [
  { href: "#posts", label: "Posts" },
  { href: "#projects", label: "Selected work" },
  { href: "#about", label: "About" },
  { href: "#cv-resume", label: "CV & resume" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  return (
    <nav className="page-navigation" aria-label="On this page">
      <p className="navigation-label">On this page</p>
      <ul>
        {navItems.map(({ href, label }) => (
          <li key={href}><a href={href}>{label}</a></li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
