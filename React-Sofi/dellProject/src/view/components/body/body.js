import React from 'react';
import './body.css';



function ChatBar(props){
const {newItem}=props;
return(

<div className="chatBarWrapper">
    <img src={newItem.url} alt='' className="chatImg"></img>
    <h3 className="personalName">{newItem.name}</h3>
    <h4 className="chatContent">{newItem.content}</h4>
    <h6 className="chatTime">{newItem.time}</h6>
    <h6 className="messagesNumber">{newItem.number}</h6>
        



</div>

)

}




export default ChatBar;