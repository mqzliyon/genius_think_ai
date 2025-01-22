import React, {useState} from "react";
import runChat from "../config/genie.js";
 
export const Context = React.createContext();

 
const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index,nextWord)=>{
        setTimeout(()=>{
            setResultData(prev =>prev + nextWord)
        }, 75 * index)
    }

    const newChat = ()=>{
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt)=>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        }else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input);
        }
        // setRecentPrompt(input);
        // setPrevPrompts(prev => [...prev, input]);

        // const response = runChat(input);
        // let responseArray = response.split("**");
        // console.log(responseArray);
        // let newResponse;
        // for(let i=0; i < responseArray.length; i++){
        //     if (i === 0 || i%2 !== 1){
        //         newResponse += responseArray[i];
        //     }else {
        //         newResponse += "<b>" + responseArray[i] + "</b>";
        //     }
        // }
        // let newResponse2 = newResponse.split("*").join("<br/>");
        // setResultData(await newResponse2);

        try {
            // const response = await runChat(input); // Await the response

            // Check if response is an array
            if (Array.isArray(response)) {
                console.log("Response is an array:", response);

                // Join array elements into a single string, if needed
                const responseText = response.join(""); // Or use join("**") if you expect "**"

                // Example of further processing
                let responseArray = responseText.split("**");
                console.log(responseArray);

                let newResponse = "";
                for (let i = 0; i < responseArray.length; i++) {
                    if (i === 0 || i % 2 !== 1) {
                        newResponse += responseArray[i];
                    } else {
                        newResponse += "<b>" + responseArray[i] + "</b>";
                    }
                }

                let newResponse2 = newResponse.split("*").join("<br/>");
                // setResultData(newResponse2);

                let newResponseArray = newResponse2.split(" ");
                for(let i=0; i < newResponseArray.length; i++){
                    const nextWord = newResponseArray[i];
                    delayPara(i,nextWord + " ");
                }

            } else if (typeof response === "string") {
                // If response is already a string
                let responseArray = response.split("**");

                let newResponse = "";
                for (let i = 0; i < responseArray.length; i++) {
                    if (i === 0 || i % 2 !== 1) {
                        newResponse += responseArray[i];
                    } else {
                        newResponse += "<b>" + responseArray[i] + "</b>";
                    }
                }

                let newResponse2 = newResponse.split("*").join("<br/>");
                let newResponseArray = newResponse2.split(" ");
                for(let i=0; i < newResponseArray.length; i++){
                    const nextWord = newResponseArray[i];
                    delayPara(i,nextWord + " ");
                }
            } else {
                console.error("Unexpected response type:", response);
            }
        }catch (e){
            console.log(e);
        }finally {
            setLoading(false);
            setInput("");
        }


    }


    const contextVale = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    }

    return (
        <Context.Provider value={contextVale}>
            {/* eslint-disable-next-line react/prop-types */}
            { props.children}
        </Context.Provider>
    )
}
export default ContextProvider;