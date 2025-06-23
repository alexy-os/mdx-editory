import { renderContext } from '@/data';

import { OptimizedImage } from '@/app/components/Image';
import { Card, CardContent, CardTitle, CardDescription, CardFigure, CardFigcaption } from '@ui8kit/ui/card';
import { Aside } from '@ui8kit/components/aside';
import { NavMobileList, NavMobileItem, NavMobileLink, NavMobileDropdown, NavMobileDropdownItem } from '@ui8kit/components/nav';
import { SiteLogo } from '@/app/components/SiteLogo';

export const { site, menu } = renderContext;
export const { features } = renderContext.about;

export const widget = features[0]

export type SidebarProps = {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {

  return (
    <Aside className={`${className} sticky top-0 z-50 overflow-y-auto w-full h-screen border-r border-border hidden md:block`}>
      <div className="flex flex-col gap-6 p-4">
        <SiteLogo className="hidden md:block" />
        <NavMobileList>
          {menu.primary.items.map((item) => (
            <NavMobileItem key={item.id}>
              <NavMobileLink className="text-sm font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-secondary-foreground/10 rounded-md p-2" href={item.url}>{item.title}</NavMobileLink>
            </NavMobileItem>
          ))}
          <NavMobileItem>
            <NavMobileDropdown className="text-sm font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/90 rounded-md" title="Services">
              <NavMobileDropdownItem href="/web-dev">Web Development</NavMobileDropdownItem>
              <NavMobileDropdownItem href="/mobile-dev">Mobile Development</NavMobileDropdownItem>
            </NavMobileDropdown>
          </NavMobileItem>
        </NavMobileList>
        <Card>
          <CardContent>
            <CardTitle>{widget.title}</CardTitle>
            <CardDescription>{widget.excerpt}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </Aside>
  );
}
