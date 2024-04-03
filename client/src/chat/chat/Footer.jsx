// Import necessary modules and components at the top
import { useContext,useEffect } from 'react';
import { useState } from 'react';
import React from 'react';
import {  AttachFile, Mic, EmojiEmotionsOutlined } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import { AccountContext } from '../../context/AccountProvider';
import { uploadFile } from '../../service/api';

// Define styled components
const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
    word-break:break-word
`;


const ClipIcon = styled(AttachFile)`
    transform: rotate(40deg);
`;


const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
    const Wrapper = styled(Box),
    word-break=break-word`
;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

// Define the Footer component
const Footer = ({ sendText, setValue,value,file,setFile,setImage}) => {


    const onFileChange=(e)=>{
        console.log(e.target.files[0].name)
         setFile(e.target.files[0]);
         setValue(e.target.files[0].name);
     }

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                let response=await uploadFile(data);
                console.log(response.data);
                setImage(response.data);
            }
        }
        getImage();
    }, [file])

   

    return (
        <Container>
            <EmojiEmotionsOutlined />
            <label htmlFor="fileInput">           
            <ClipIcon />
            </label>
            <form type="multipart/form-data" onSubmit={sendText}>
            <input
                type='file' 
                id="fileInput"
                style={{display:'none'}}
                onChange={(e)=>onFileChange(e)}
                />
            </form>
            <Search>
                <InputField 
                    placeholder='Type a Message'
                    onChange={(e) => setValue(e.target.value)}
                     onKeyUp={(e) => sendText(e)} 
                    value={value}
                />
            </Search>
            <Mic />
        </Container>
    );
};

export default Footer;