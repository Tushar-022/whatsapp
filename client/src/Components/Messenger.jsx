import React from 'react'
import { AppBar, Toolbar, styled, Box } from '@mui/material';
import LoginDialog from '../account/LoginDialog'
import ChatDialog from '../chat/ChatDialog'
import { useContext } from 'react'
import { AccountContext } from '../context/AccountProvider'


const Component = styled(Box)`
    height: 100vh;
    background: #DCDCDC;
`;

const LoginHeader = styled(AppBar)`
    background-color: #00A884;
    height: 125px;
    box-shadow: none;
`;
    
const Header = styled(AppBar)`
    background: #00bfa5;
    height: 200px;
    box-shadow: none;
`;

const Messenger = () => {
    const { account } = useContext(AccountContext);


  return (
    
        <Component>
          {
            account ?
            <>
            <LoginHeader>
                <Toolbar>

                </Toolbar>
            </LoginHeader>
            <ChatDialog/>
            </>
            
            
          :
          <>
          <Header>
              <Toolbar>
                    
              </Toolbar> 
          </Header>
          <LoginDialog/>
          </>
        }
             
      
      </Component>
    
  )
}

export default Messenger;
