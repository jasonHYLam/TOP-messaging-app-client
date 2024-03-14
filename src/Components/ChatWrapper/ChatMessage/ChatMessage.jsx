import { useState } from 'react';
import styles from './ChatMessage.module.css';

import { Link } from "react-router-dom"
export function ChatMessage( { message, setMessageToReplyTo }) {
    // should contain:

    // message author username and profile image.
    // message text
    // sent when (few minutes ago, a day ago)
    // date when hovering on it. Does that require state?
    // reactions
    // if the message is a reply, then one line of the message that it is replying to, above.
    // if hovering, then buttons to allow reaction or reply.

    // if making a reply or a reaction, then that will need to update the message in the database.

    const [ isHovered, setIsHovered ] = useState(false);

    return (
        <>
        <section className={styles.messageWrapper}
        
        >
            <Link to={`/home/user_profile/${message.author.id}`}>
                <img 
                className={styles.profilePic} 
                src={message.author.profilePicURL} 
                alt="Profile Pic" />
            </Link>
            <section
            
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {!message.messageReplyingTo ? null : 
                
                <section>
                    <p>{message.messageReplyingTo.author.username}</p>
                    <p>{message.messageReplyingTo.text}</p>

                </section>
                }

                <section className={styles.top}>
                    <p>{message.author.username}</p>
                    <p>{message.timeStampFormatted}</p>
                </section>

                <section 
                >
                    {!message.imageURL ? null : <img src={message.imageURL} alt="" /> }
                    <p>{message.text}</p>

                    {!isHovered ? null : 
                    
                    <section className={styles.messageOptions}>
                        <button onClick={() => setMessageToReplyTo(message)}>Reply</button>
                        <button>Add reaction</button>
                    </section>

                    }

                </section>

            </section>
        </section>
        </>
    )
}