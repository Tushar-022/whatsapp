import { useContext ,useState,useEffect,useRef} from 'react';
import { Box, styled } from '@mui/material';
import Footer from './Footer';
import { AccountContext } from '../../context/AccountProvider';
import { newMessage,getMessages} from '../../service/api';
import Message from './Message';


const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`;

const Container=styled(Box)`
    padding:1px 80px
`

const Component = styled(Box)`
    height: 80vh;
    overflow-y: scroll;
`;

export default function Messages({person,conversation}) {

    const[value,setValue]=useState('');
    const[messages,setMessages]=useState([]);
    const[file,setFile]=useState(null);
    const [incomingMessage, setIncomingMessage] = useState(null);

    const {account,socket,newMessageFlag,setNewMessageFlag}=useContext(AccountContext);

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        })
    }, []); 


    const[image,setImage]=useState('');
    const scrollRef=useRef();
    

    

    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessages(conversation._id);
            setMessages(data);
        }
        conversation._id && getMessageDetails();
    },[person._id,conversation._id,newMessageFlag])

    
    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && 
            setMessages((prev) => [...prev, incomingMessage]);
        
    }, [incomingMessage, conversation]); 


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: "smooth" })
    }, [messages]);

    const sendText=async(e)=>{
        const code=e.keyCode|| e.which;
        console.log(file);
        if(code===13 && code)
        {
            let message={};
            if (value.trim() !== '') {
            if(!file){
            message=
            {
                senderId:account.sub,
                receiverId:person.sub,
                conversationId:conversation._id,
                type:'text',
                text: value
            }
        }
        else{
            message=
            {

                senderId:account.sub,
                receiverId:person.sub,
                conversationId:conversation._id,
                type:'file',
                text:image
            }
            console.log(message);
        }
    }

            socket.current.emit('sendMessage',message) // message ko send kar diya realtime

            await newMessage(message);
            setValue('');
            setFile('');
            setImage('');
            setNewMessageFlag(prev=>!prev)
        }
    }
    return (
        <>
            <Wrapper>
                <Component>
                {
                    messages && messages.map(message=>(
                        <Container ref={scrollRef}>
                        <Message message={message}/>
                        </Container>
                        
                    ))
                }
                </Component>
                <Footer
                sendText={sendText} 
                setValue={setValue}
                value={value}
                file={file}
                setFile={setFile}
                setImage={setImage}
                />
            </Wrapper>
        </>
    );
}
