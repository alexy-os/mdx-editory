import { EditoryLayout } from '@/app/layouts/EditoryLayout';
import { renderContext } from '@/data';

export const { page } = renderContext.home;

function App() {
  return (
    <EditoryLayout />
  );
}

export default App;
export { App as Home }; 