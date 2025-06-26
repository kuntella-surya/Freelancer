import logo from './logo.svg';
import './App.css';
import Nav from './navigation';
import { BrowserRouter as Router } from 'react-router-dom';
import { UnreadProvider } from './UnreadContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
function App() {
  return (
   <>
   <UnreadProvider>
  <Router>
   <Nav></Nav>
   </Router>
   </UnreadProvider>
   </>
  );
}

export default App;
