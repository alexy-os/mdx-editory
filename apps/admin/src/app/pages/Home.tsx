import { MainLayout } from '@/app/layouts/MainLayout';
import { renderContext } from '@/data';
import { Section, SectionHeader, SectionContent, SectionTitle, SectionDescription } from '@ui8kit/components/section';
import { RichEditorApp } from '@rich-editor';

export const { page } = renderContext.home;

function App() {
  return (
    <MainLayout title={page.title} description={page.excerpt}>
      <RichEditorApp className="" />
      <Section>
        <SectionHeader>
          <SectionTitle>{page.title}</SectionTitle>
          <SectionDescription>{page.excerpt}</SectionDescription>
        </SectionHeader>
        <SectionContent className="w-full py-12 px-6 bg-muted rounded-md mb-12">
          <p className="text-secondary-foreground">{page.content}</p>
        </SectionContent>
      </Section>
    </MainLayout>
  );
}

export default App;
export { App as Home }; 