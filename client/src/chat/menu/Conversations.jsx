import { useEffect,useState,useContext} from "react" //////////////jb kbhi didMount hoga ye hook call hoega
import { getUsers } from "../../service/api"
import { Box,styled,Divider } from "@mui/material";
import { AccountContext } from "../../context/AccountProvider";
import Conversation from "./Conversation";

const Component=styled(Box)`
height:81vh;
overflow:overlay;
`

const StyledDivider=styled(Divider)`
margin:0 0 0 70px
background:#e9edef
opacity:6
`
export const Conversations=({text})=>{

    const [users,setUsers]=useState([]);/// multiple objects return ho rha hai
//users waale array mai saara data hai

//taaki jisne login kra kahi vo hi na dikhne lage
    const {account,socket,setActiveUsers}=useContext(AccountContext)


    useEffect(() => {
      const fetchData = async () => {
          try {
              let response = await getUsers();
              console.log(response);
  
              if (Array.isArray(response)) {
                  const filteredData = response.filter(user => user.given_name.toLowerCase().includes(text.toLowerCase()));
                  setUsers(filteredData);
              } else {
                  console.log("Invalid response:", response);
                  // Handle invalid response here, e.g., show an error message or fallback data
              }
          } catch (error) {
              console.error("Error fetching data:", error);
              // Handle error, e.g., show an error message to the user
          }
      };
  
      fetchData();
  }, [text]);
  

    useEffect(() => {
      socket.current.emit('addUsers', account);
      socket.current.on("getUsers", users => {
          setActiveUsers(users);
          console.log(users);
      })
  }, [account])


  return (
    <Component>
      {console.log(users)}
      {users.map(user => (
        user.sub !== account.sub && (
          <>
            <Conversation user={user} />
            <StyledDivider />
          </>
        )
      ))}
    </Component>
  );
  
      
}

