import React from "react";
import "./modificationByField.css";



const ModificationByField = () => {
  return (
    <div class="wrappe">
      <div class="wrappe-header">
        <h1>Modification by field</h1>
      </div>
      <div class="data">


        <div id="modificationtabel">
          <div class="modificationtabelbuttons">
            <select name="fielednameselect" id="fielednameselect" onchange="sortbyfield()">
              <option hidden>Field Name</option>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="assignee">Assignee</option>
            </select>
            <input type="text" id="fieldnamesearch" placeholder="search by ID"></input>
            <button id="buttonsearch"><img src="img/search.png" width="22px" onclick="search()"></img></button>
            <button id="datebutton" >Date</button>
          </div>



          <table cellspacing="0" cellpadding="0" border="0" id="tablee">
            <tr>
              <td>
                <table cellspacing="0" cellpadding="1" border="1" id="tabelhead" >
                  <tr style="color:white;background-color: rgb(153, 199, 221);">
                    <th>ID</th>
                    <th>FIELD</th>
                    <th>OLD VALUE</th>
                    <th>NEW VALUE</th>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <div style="width:100%; max-height:335px; border-radius: 12px; overflow:auto;">
                  <table cellspacing="1" cellpadding="5" id="datatabel" >

                  </table>
                </div>
              </td>
            </tr>
            
            
            </table>

            </div>
      </div>

    </div>

  )



}












export default ModificationByField;
