import styles from './ChatWrapper.module.css'

import { useEffect, useState } from "react"
import { TypeBar } from "./TypeBar/TypeBar"
import { ChatMessage } from "./ChatMessage/ChatMessage";
import { useParams, Link } from "react-router-dom";

export function ChatWrapper() {


    // rendered in HomePage component
    // needs to make fetch request, requires .env variable and credentials.
    // should return list of messages, that are ordered by time sent regardless of sender.

    // so, the mongoose query should be:
    // find the comments that match the chat ID. sort them by time.

    // this'll return a list of message objects. 
    // perhaps limit this to the 50 most recent comments.
    // Need to convert these into chatMessage Components
    // perhaps on each message, there are several options that I can do, for example reply to it or react.


    // need a input component. perhaps make it not overflow.
    // need a button to add image file.
    const [ isUpdatePending, setIsUpdatePending ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ chatName, setChatName ] = useState('');
    const [ chatMessages, setChatMessages ] = useState([]);
    const [ messageToReplyTo, setMessageToReplyTo ] = useState({});
    const {chatId} = useParams();
    
    useEffect(() => {
        console.log('checking ChatWrapper useEffect:')
        async function fetchMessages() {
            const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/chat/${chatId}`, {
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type" : "application/json",
                    // "Accept" : "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
            
            const fetchedData = await response.json();
            console.log('checking data for ChatWrapper:')
            console.log(fetchedData)

            setChatMessages(fetchedData.chat.chatMessages)

            if (chatName !== fetchedData.chat.name) {
                setChatName(fetchedData.chat.name)
            }
        }

        fetchMessages();

        if (!isLoaded) setIsLoaded(true);

        setIsUpdatePending(false);
    }, [ isUpdatePending, isLoaded, chatId ])

    return (
        !isLoaded ? <p>Loading</p> :
        <>
        <section>
            <p>It's me, the chat</p>
            <h1>{chatName}</h1>

            {chatMessages.map(message => {
                return (< ChatMessage 
                    message={message} 
                    setMessageToReplyTo={setMessageToReplyTo}
                    />)
                })}

            < TypeBar 
            setIsUpdatePending={setIsUpdatePending} 
            messageToReplyTo={messageToReplyTo}
            setMessageToReplyTo={setMessageToReplyTo}
            />
        </section>
        </>
    )

}