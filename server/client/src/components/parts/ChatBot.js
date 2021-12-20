import React, { useEffect, useState } from "react";
import tawkTo from "tawkto-react";

function ChatBot(props) {

    const [toggle, setToggle] = useState(true)
    const [btnText, setButtonText] = useState("Avaa Chat")
    const [styles, setStyle] = useState("closed")
    

    const changeText = (toggle) => {
        if (toggle) { 
            setButtonText("Avaa Chat") 
            setStyle("closed")
        } else { 
            setButtonText("X") 
            setStyle("open")
        }
    }


    useEffect(() => {
        console.log('state: ', toggle);
        const tawkToPropertyId = "61c0be9080b2296cfdd2a92c";
        const tawkToKey = "1fncegp95";
        const data = props.data.profile
        const email = data.email
        const firstName = data.fName
        const lastName = data.sName        
        const userId = data._user


        tawkTo(tawkToPropertyId, tawkToKey); 
        Tawk_API.visitor = {
            name: `${firstName} ${lastName}`,
            email
        };
        
        Tawk_API.onLoad = function () {
            console.log('set chat attributes')
            Tawk_API.setAttributes({
                'name'  :  `${firstName} ${lastName}`,
                'email' : email,
                'hash'  : 'a9ba0692a91a92616a88e4d0b9a09c46c1b5fdac',
                'userId': userId
            }, function(error){console.log('error: ', error)});           
        };       
              
    }, [toggle]);


    return (
        <>
            <button onClick={() => { setToggle(!toggle); changeText(!toggle); toggle ? Tawk_API.showWidget() : Tawk_API.hideWidget() }} className={`btn btn-light chatbutton-${styles}`}>{btnText} </button>
        </>
    );
}

export default ChatBot;

