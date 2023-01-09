import './App.css';
import Form from './Pages/Form';
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider} from 'react-query'
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.87/dist/');



function App() {

  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        refetchOnWindowFocus:false,
        refetchOnMount:false,
        retry:false,
        refetchOnReconnect:false
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <Routes>
        <Route exact path='/form' element={<Form/>}/>
        <Route exact path='/' element={<Form/>}/>
      </Routes> 
    </div>
    </QueryClientProvider>
  );
}

export default App;
