import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#cv-resume", label: "CV/Resume" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  return (
    <div className="fixed top-0 w-full bg-background backdrop-blur-md z-50 border-b border-border/40 px-4">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between mx-auto py-4">
        <a href="/" className="flex items-center space-x-2">
          <img 
            src="/favicon.svg" 
            alt="Logo" 
            className="h-8 w-auto" 
            width={32} 
            height={32} 
            loading="eager" 
          />
        </a>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex ml-auto">
          <NavigationMenuList className="gap-2">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  href={item.href}
                  className={cn(navigationMenuTriggerStyle(), "nav-link-stipple hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent")}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div className="flex md:hidden relative">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                  <NavigationMenuContent className="w-fit">
                    <ul className="grid gap-2 p-2">
                      {navItems.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink
                            href={item.href}
                            className={cn(
                              "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-transparent hover:text-accent-foreground focus:bg-transparent focus:text-accent-foreground nav-link-stipple"
                            )}
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.label}
                            </div>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}

export default Navigation;