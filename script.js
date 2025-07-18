"use strict";

document.addEventListener('DOMContentLoaded', function () {
    ZOHO.embeddedApp.on("PageLoad", function (data) {});
    ZOHO.embeddedApp.init();

    document.getElementById('submitBtn').addEventListener('click', function () {
        var input = document.getElementById('leadSourceInput').value.trim();
        var statusDiv = document.getElementById('statusMsg');
        statusDiv.style.color = "#cc0000";
        if (!input) {
            statusDiv.textContent = "Please enter a lead source.";
            return;
        }
        statusDiv.textContent = "Submitting...";

        // Your global picklist ID
        var globalPicklistId = "6360354000000448025";
        var apiURL = "/crm/v4/settings/global_picklists/" + globalPicklistId + "/values";
        var reqData = {
            "global_pick_list_values": [
                {
                    "actual_value": input,
                    "display_value": input
                }
            ]
        };

        ZOHO.CRM.API.post({
            url: apiURL,
            body: reqData
        }).then(function(resp){
            if (
                resp.data &&
                resp.data[0] &&
                resp.data[0].code === "SUCCESS"
            ) {
                statusDiv.style.color = "#00b300";
                statusDiv.textContent = "Lead Source added successfully!";
                setTimeout(function() { ZOHO.CRM.UI.Popup.close(); }, 1200);
            } else {
                let err = (resp.data && resp.data[0] && resp.data[0].message) || JSON.stringify(resp);
                statusDiv.textContent = "Error: " + err;
            }
        }).catch(function(err){
            statusDiv.textContent = "Error submitting: " + err;
        });
    });
});
