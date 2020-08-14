import React from "react";
import "./mainPage.css";

const MainPage = () => {
return(
    <div className="continer">
        <div id="website">
            <div className="header" >
                <button id="statsbutton">Status</button>
                <button id="analyticsbutton">Analytics</button>
            </div>

            <div id="data" >
                <div id="Modificationbyfield" >
                    <h2>Modification by Field</h2>
                </div>
                <div id="Deletedjiratickets"><h2>Deleted JIRA Tickets</h2>
                </div>
                <h1 id="check">JIRAPH</h1>
                <div id="Delaysindelivery"><h2>Delays in Delivery</h2>
                </div>
                <div id="Changeofticketsstatus"><h2>Change of Tickets Status</h2>
                </div>
            </div>

        </div>
    </div>
)


}
export default MainPage;
