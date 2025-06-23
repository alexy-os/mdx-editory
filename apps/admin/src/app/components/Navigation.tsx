import { DarkMode } from '@/app/components/DarkMode';
import { renderContext } from '@/data';

export const { site, menu } = renderContext;

import { Nav, NavItem, NavLink, NavList, NavGroupButtons, NavBar } from '@ui8kit/components/nav';
import { SheetTrigger } from '@ui8kit/components/sheet';
import { SiteLogo } from '@/app/components/SiteLogo';
import { Input } from '@ui8kit/ui/input';

export function Navigation() {

  return (
    <NavBar className="md:[&_[data-slot=nav-container]]:!justify-end">
      <SiteLogo className="block md:hidden" />
      <Input type="text" placeholder="Search" className="absolute left-0 max-w-52 hidden md:block" />
      <Nav>
        <NavList>
          {menu.primary.items.map((item) => (
            <NavItem key={item.id}>
              <NavLink href={item.url}>{item.title}</NavLink>
            </NavItem>
          ))}
        </NavList>
      </Nav>

      <NavGroupButtons>
        <DarkMode />
        <SheetTrigger>
          <span className="latty latty-menu"></span>
        </SheetTrigger>
      </NavGroupButtons>
    </NavBar>
  );
} 