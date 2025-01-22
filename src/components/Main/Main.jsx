import  {useContext} from 'react';
import './Main.css';
import {assets} from "../../assets/assets.js";
import {Context} from "../../context/Context.jsx";
const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p>
                    <a href="/">GeniusThink</a>
                    </p>
                <img src={assets.user_icon} alt=""/>
            </div>
            <div className="main-container">

                {!showResult ?
                <>
                    <div className="greet">
                        <p>
                            <span>Hi...🖐️,</span>
                        </p>
                        <p>How can I help you today?</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>Recommend stunning destinations for an upcoming road trip.</p>
                            <img src={assets.compass_icon} alt=""/>
                        </div>
                        <div className="card">
                            <p>Briefly summarize this concept: urban planning.</p>
                            <img src={assets.bulb_icon} alt=""/>
                        </div>
                        <div className="card">
                            <p>Generate a list of bonding activities for our upcoming work retreat.</p>
                            <img src={assets.message_icon} alt=""/>
                        </div>
                        <div className="card">
                            <p>Enhance the clarity and structure of the code for better readability.</p>
                            <img src={assets.code_icon} alt=""/>
                        </div>
                    </div>
                </>
                    : <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt=""/>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt=""/>
                            {loading ?
                            <div className="loader">
                                <hr/>
                                <hr/>
                                <hr/>
                            </div>
                                : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }

                        </div>
                    </div>
                }


                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Ask Genie Talk"/>
                        <div>
                            {/*<img src={assets.gallery_icon} alt=""/>*/}
                            {!input ? <img src={assets.mic_icon} alt=""/> : null}
                            {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="Submit"/> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Genie Talk may display inaccurate info, including about people, so double-check its responses. Your privacy and Genie Talk are protected.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Main;