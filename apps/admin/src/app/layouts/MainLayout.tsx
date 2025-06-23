import { ReactNode } from "react";
import { Navigation } from "@/app/components/Navigation";
import { Sidebar } from "@/app/components/Sidebar";
import { SiteLogo } from "@/app/components/SiteLogo";
import { renderContext } from '@/data';
export const { site, menu } = renderContext;

import { Main } from '@ui8kit/components/main';
import { P } from '@ui8kit/components/markup';
import { Container, SectionFooter } from '@ui8kit/components/section';
import { SheetLayout, SheetOverlay, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody } from '@ui8kit/components/sheet';
import { NavMobileList, NavMobileItem, NavMobileLink } from '@ui8kit/components/nav';

interface RootLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const MainLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <SheetLayout>
        <div className="grid grid-cols-4">
          <Sidebar className="col-span-4 md:col-span-1" />
          <Main className="col-span-4 md:col-span-3">
            <Container>
              <Navigation />
              {children}

              <SectionFooter>
                <P className="text-center-py-4">&copy; {new Date().getFullYear()} {site.title}</P>
                <a href="https://github.com/buildy-ui/ui" className="text-sm text-center-py-4">buildy/ui</a>
              </SectionFooter>
            </Container>
          </Main>
        </div>
        <SheetOverlay />
        <SheetContent>
          <SheetHeader>
            <SheetTitle><SiteLogo /></SheetTitle>
            <SheetDescription>UI8Kit Design System</SheetDescription>
          </SheetHeader>

          <SheetBody>
            <NavMobileList>
              {menu.primary.items.map((item) => (
                <NavMobileItem key={item.id}>
                  <NavMobileLink href={item.url}>{item.title}</NavMobileLink>
                </NavMobileItem>
              ))}
            </NavMobileList>
          </SheetBody>
        </SheetContent>

      </SheetLayout>
    </>
  );
};
