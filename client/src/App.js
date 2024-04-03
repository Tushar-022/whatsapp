import './App.css';
import Messenger from './Components/Messenger';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/AccountProvider';
import {gapi} from 'gapi-script';


function App() {
  const clientId='407430083695-ic1nkpf3pvjfda0cc5fsfme6mdrcq88n.apps.googleusercontent.com';
  useEffect(()=>{
    gapi.load('client:auth2',()=>{
      gapi.client.init({
        clientId: clientId,
        scope:""
      })
    })
  })
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
     <Messenger/>
     </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

