import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DogBreedsTable from "./components/DogTable";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Dog Breeds</h1>
        <DogBreedsTable />
      </div>
    </QueryClientProvider>
  );
}

export default App;

