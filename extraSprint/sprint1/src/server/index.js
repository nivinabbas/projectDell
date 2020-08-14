const express = require('express');
const app = express();


var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static('public'))


const url = "mongodb+srv://nimer:318453180@cluster0.tejcy.mongodb.net/test";


const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
    userInfo: {
        employeeName: String,
        employeeEmail: String,
        employeeRole: String,
        password: String
    }
})



const UIObject = [
    { label: String, order: Number, Tasks: Array },
    { label: String, order: Number, Tasks: Array },
]

const Task = mongoose.model('Task', {
    jiraItem: {
        jiraId: String,
        jiraName: String,
        jiraType: String,
        priority: String,
        status: String,
        specialFields: {
            jiraParentId: String,
            functionalTest: Boolean,
            qaRepresentative: String,
            fixVersion: String
        }
    },
    qcItem: {
        requirmentId: String,
        requirementType: String,
        status: String
    },
    diffItem: {
        type: { type: String },
        updateTime: Number,
        updatedFields: [{
            fieldName: String,
            oldValue: String,
            newValue: String
        }]
    }
    // taskItem: {
    //   user: User,
    //   isDone: Boolean,
    //   updatedTime: Date,
    //   createdTime: Date
    // }
});
//Date.now()Date.now()-5.256e+9


app.get('/getUpdated', (req, res) => {
    Task.find({}, function (err, docs) {
        res.send(docs)
    })
})


/* jeries sort with val
app.get('/getUpdatedByStatus', (req, res) => {
    console.log("hi")
    Task.find({'diffItem.updatedFields':{"$elemMatch":{'fieldName':'status','newVal':"critical"}}},(err,docs)=>{
            res.send(docs);
        console.log(err,docs)
      })
    })
    */

// app.get('/getUpdatedByStatus', (req, res) => {
//     const { sadasd } = req.body;
//     Task.find({ 'diffItem.updatedFields': { "$elemMatch": { 'fieldName': 'status' } }, 'diffItem.type': 'Update' }, (err, docs) => {
//         res.send(docs);
//         console.log(err, docs)
//     })
// })


app.post('/getUpdatedTasksByFieldName', async (req, res) => {
    console.log(req.body)
    const { fieldName } = req.body;
    console.log(fieldName)
    const tasks = await Task.aggregate(
        [{
            $match: {
                "diffItem.updatedFields": { "$elemMatch": { 'fieldName': fieldName }},
            }
        },
        {
            $group: {
                // label: {`daily`},
                 
                _id:{},
                tasks: {
                    $push: {
                        jiraItem: "$jiraItem",
                        qcItem: "$qcItem",
                        diffItem: "$diffItem"
                    }
                }
            }
        },

        ]

    )
    res.send(tasks)
    console.log(tasks);
} )














app.get('/getUpdatedByPriority', (req, res) => {
    Task.find({ 'diffItem.updatedFields': { "$elemMatch": { 'fieldName': 'priority' } }, 'diffItem': { type: 'update' } }, (err, docs) => {
        res.send(docs);
        console.log(err, docs)
    })
})

app.get('/getUpdatedByQaRepresentative', (req, res) => {
    Task.find({ 'diffItem.updatedFields': { "$elemMatch": { 'fieldName': 'qaRepresentative' } }, 'diffItem': { type: 'update' } }, (err, docs) => {
        res.send(docs);
        console.log(err, docs)
    })
})





// const newData =[
//     {
//         "diffItem": {
//             "updateTime": 1597250321, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "status", 
//                     "newValue": "In Progress", 
//                     "oldValue": "Done"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Backlog", 
//             "jiraType": "Epic", 
//             "jiraName": "PSI 41: SAR Support for FSCK/Recovery", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_41", 
//             "jiraId": "TRIES-41773", 
//             "jiraParentId": "TRIF-842"
//         }, 
//         "qcItem": {
//             "status": "Backlog", 
//             "requirementType": "Epic", 
//             "requirementId": "2164"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250321, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "status", 
//                     "newValue": "In Progress", 
//                     "oldValue": "Done"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Implementing", 
//             "jiraType": "Epic", 
//             "jiraName": "PSI 41: FSCK Support for Late Dedup and VLB Defrag Phase 1 & 2", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_41", 
//             "jiraId": "TRIES-37201", 
//             "jiraParentId": "TRIF-842"
//         }, 
//         "qcItem": {
//             "status": "In Progress", 
//             "requirementType": "Epic", 
//             "requirementId": "2011"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250321, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "status", 
//                     "newValue": "In Progress", 
//                     "oldValue": "Done"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P01", 
//             "status": "Done", 
//             "jiraType": "Epic", 
//             "jiraName": "PSI 39: RAID fsck - Infrastructure update and validation rules expansion", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_39", 
//             "jiraId": "TRIES-36948", 
//             "jiraParentId": "TRIF-842"
//         }, 
//         "qcItem": {
//             "status": "Done", 
//             "requirementType": "Epic", 
//             "requirementId": "2008"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250322, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "status", 
//                     "newValue": "In Progress", 
//                     "oldValue": "Done"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Backlog", 
//             "jiraType": "Epic", 
//             "jiraName": "PSI 40: Fault Containment - FSCK support", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_41", 
//             "jiraId": "TRIES-34825", 
//             "jiraParentId": "TRIF-842"
//         }, 
//         "qcItem": {
//             "status": "Backlog", 
//             "requirementType": "Epic", 
//             "requirementId": "2009"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250322, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "status", 
//                     "newValue": "In Progress", 
//                     "oldValue": "Done"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Implementing", 
//             "jiraType": "Epic", 
//             "jiraName": "PSI 41: RAID fsck - Support V2 new features", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_41", 
//             "jiraId": "TRIES-34722", 
//             "jiraParentId": "TRIF-842"
//         }, 
//         "qcItem": {
//             "status": "In Progress", 
//             "requirementType": "Epic", 
//             "requirementId": "1956"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250322, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "priority", 
//                     "newValue": "Low", 
//                     "oldValue": "High"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P01", 
//             "status": "Done", 
//             "jiraType": "Epic", 
//             "jiraName": "PSI 40: RAID fsck - Infrastructure update and validation rules expansion", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_40", 
//             "jiraId": "TRIES-32895", 
//             "jiraParentId": "TRIF-842"
//         }, 
//         "qcItem": {
//             "status": "Done", 
//             "requirementType": "Epic", 
//             "requirementId": "1892"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250322, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "priority", 
//                     "newValue": "Low", 
//                     "oldValue": "High"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Backlog", 
//             "jiraType": "Epic", 
//             "jiraName": "Quality: PSI 41: FSCK Test Support for FH-C DP Features", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_41", 
//             "jiraId": "TRIES-28531", 
//             "jiraParentId": "TRIF-842"
//         }, 
//         "qcItem": {
//             "status": "Backlog", 
//             "requirementType": "Epic", 
//             "requirementId": "2171"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250323, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "priority", 
//                     "newValue": "Low", 
//                     "oldValue": "High"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Done", 
//             "jiraType": "Feature", 
//             "jiraName": "Display cluster time in GUI and Resync when NTP between nodes are out of sync", 
//             "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
//             "functionalTest": "Yes", 
//             "fixVersion": "Foothills", 
//             "jiraId": "TRIF-789", 
//             "jiraParentId": "TRII-67"
//         }, 
//         "qcItem": {
//             "status": "N/A", 
//             "requirementType": "Feature", 
//             "requirementId": "1765"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250325, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "priority", 
//                     "newValue": "Low", 
//                     "oldValue": "High"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Implementing", 
//             "jiraType": "Feature", 
//             "jiraName": "Warning State for Job Steps  is not intuitively available for users", 
//             "qaRepresentative": "bjack@emc.com", 
//             "functionalTest": "Yes", 
//             "fixVersion": "Foothills", 
//             "jiraId": "TRIF-761", 
//             "jiraParentId": "TRII-23"
//         }, 
//         "qcItem": {
//             "status": "N/A", 
//             "requirementType": "Feature", 
//             "requirementId": "1918"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250329, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "priority", 
//                     "newValue": "Low", 
//                     "oldValue": "High"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P01", 
//             "status": "Done", 
//             "jiraType": "Epic", 
//             "jiraName": "GUI  implementation, testing for TRIF-575: Add node's CPU stats to historical performance metrics", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_38", 
//             "jiraId": "TRIES-15409", 
//             "jiraParentId": "TRIF-575"
//         }, 
//         "qcItem": {
//             "status": "Done", 
//             "requirementType": "Epic", 
//             "requirementId": "1915"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250329, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "priority", 
//                     "newValue": "Low", 
//                     "oldValue": "High"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Done", 
//             "jiraType": "Epic", 
//             "jiraName": "TMA Implementation & Test : TRIF-575 - Node Affinity", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_39", 
//             "jiraId": "TRIES-15217", 
//             "jiraParentId": "TRIF-575"
//         }, 
//         "qcItem": {
//             "status": "Done", 
//             "requirementType": "Epic", 
//             "requirementId": "1916"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250331, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "priority", 
//                     "newValue": "Low", 
//                     "oldValue": "High"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P01", 
//             "status": "Done", 
//             "jiraType": "Epic", 
//             "jiraName": "[FH Core]: GUI Implementation and testing:From VG List View: Mapping of underlying VG Volumes to a Host/Host Group", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_40", 
//             "jiraId": "TRIES-15184", 
//             "jiraParentId": "TRIF-574"
//         }, 
//         "qcItem": {
//             "status": "Done", 
//             "requirementType": "Epic", 
//             "requirementId": "2058"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250333, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "priority", 
//                     "newValue": "Low", 
//                     "oldValue": "High"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P01", 
//             "status": "Done", 
//             "jiraType": "Feature", 
//             "jiraName": "Add iSCSI storage performance metrics per ip_port on REST and TMA", 
//             "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
//             "functionalTest": "Yes", 
//             "fixVersion": "Foothills", 
//             "jiraId": "TRIF-534", 
//             "jiraParentId": "TRII-105"
//         }, 
//         "qcItem": {
//             "status": "N/A", 
//             "requirementType": "Feature", 
//             "requirementId": "1726"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250337, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "qaRepresentative", 
//                     "newValue": "Nimer", 
//                     "oldValue": "shirab"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Done", 
//             "jiraType": "Epic", 
//             "jiraName": "git --show-superproject-working-tree should work during a merge", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_41", 
//             "jiraId": "TRIES-44647", 
//             "jiraParentId": "TRIF-527"
//         }, 
//         "qcItem": {
//             "status": "Done", 
//             "requirementType": "Epic", 
//             "requirementId": "2165"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250337, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "qaRepresentative", 
//                     "newValue": "Nimer", 
//                     "oldValue": "shirab"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Funnel", 
//             "jiraType": "Epic", 
//             "jiraName": " Support new Dell version scheme (Makefile infrastructure)", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_41", 
//             "jiraId": "TRIES-44593", 
//             "jiraParentId": "TRIF-527"
//         }, 
//         "qcItem": {
//             "status": "Blocked", 
//             "requirementType": "Epic", 
//             "requirementId": "2166"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250337, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "qaRepresentative", 
//                     "newValue": "Nimer", 
//                     "oldValue": "shirab"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Implementing", 
//             "jiraType": "Epic", 
//             "jiraName": "Support new Dell version scheme (CP NDU)", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_41", 
//             "jiraId": "TRIES-35328", 
//             "jiraParentId": "TRIF-527"
//         }, 
//         "qcItem": {
//             "status": "In Progress", 
//             "requirementType": "Epic", 
//             "requirementId": "2029"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250337, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "qaRepresentative", 
//                     "newValue": "Nimer", 
//                     "oldValue": "shirab"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P02", 
//             "status": "Done", 
//             "jiraType": "Epic", 
//             "jiraName": "PLT IU - Complete New Dell Version scheme and PowerStore TGZBIN", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_40", 
//             "jiraId": "TRIES-34623", 
//             "jiraParentId": "TRIF-527"
//         }, 
//         "qcItem": {
//             "status": "Done", 
//             "requirementType": "Epic", 
//             "requirementId": "2030"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250338, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "qaRepresentative", 
//                     "newValue": "Nimer", 
//                     "oldValue": "shirab"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Implementing", 
//             "jiraType": "Epic", 
//             "jiraName": "[FH Core]: TMA Design, Implement & Test: Software Versioning", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_41", 
//             "jiraId": "TRIES-30880", 
//             "jiraParentId": "TRIF-527"
//         }, 
//         "qcItem": {
//             "status": "In Progress", 
//             "requirementType": "Epic", 
//             "requirementId": "2031"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250342, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "qaRepresentative", 
//                     "newValue": "Nimer", 
//                     "oldValue": "shirab"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Implementing", 
//             "jiraType": "Feature", 
//             "jiraName": "CPDM GUI Infrastructure (Foothills) - Not Customer Facing", 
//             "qaRepresentative": "bjack@emc.com", 
//             "functionalTest": "Yes", 
//             "fixVersion": "Foothills", 
//             "jiraId": "TRIF-465", 
//             "jiraParentId": "TRII-106"
//         }, 
//         "qcItem": {
//             "status": "N/A", 
//             "requirementType": "Feature", 
//             "requirementId": "1920"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250348, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "priority", 
//                     "newValue": "Low", 
//                     "oldValue": "High"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Implementing", 
//             "jiraType": "Feature", 
//             "jiraName": " Independent System Health check ", 
//             "qaRepresentative": "bjack@emc.com", 
//             "functionalTest": "Yes", 
//             "fixVersion": "Foothills", 
//             "jiraId": "TRIF-460", 
//             "jiraParentId": "TRII-91"
//         }, 
//         "qcItem": {
//             "status": "N/A", 
//             "requirementType": "Feature", 
//             "requirementId": "1806"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250352, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "status", 
//                     "newValue": "In Progress", 
//                     "oldValue": "Done"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P01", 
//             "status": "Done", 
//             "jiraType": "Feature", 
//             "jiraName": "CloudIQ Integrations from Trident back-end engineering data/metrics (Post SN GA MVP)", 
//             "qaRepresentative": "bjack@emc.com", 
//             "functionalTest": "Yes", 
//             "fixVersion": "Foothills", 
//             "jiraId": "TRIF-360", 
//             "jiraParentId": "TRII-1"
//         }, 
//         "qcItem": {
//             "status": "N/A", 
//             "requirementType": "Feature", 
//             "requirementId": "1789"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250354, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "priority", 
//                     "newValue": "Low", 
//                     "oldValue": "High"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P01", 
//             "status": "Done", 
//             "jiraType": "Feature", 
//             "jiraName": "SAN Replication - Support DR testing of a Volume or VG", 
//             "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
//             "functionalTest": "Yes", 
//             "fixVersion": "Foothills", 
//             "jiraId": "TRIF-349", 
//             "jiraParentId": "TRII-64"
//         }, 
//         "qcItem": {
//             "status": "Not Covered", 
//             "requirementType": "Feature", 
//             "requirementId": "1402"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250363, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "priority", 
//                     "newValue": "Low", 
//                     "oldValue": "High"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P02", 
//             "status": "Done", 
//             "jiraType": "Epic", 
//             "jiraName": "GUI Implementation & Test Epic for Epic-38069: Default table sorting", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_41", 
//             "jiraId": "TRIES-38713", 
//             "jiraParentId": "TRIF-191"
//         }, 
//         "qcItem": {
//             "status": "Done", 
//             "requirementType": "Epic", 
//             "requirementId": "2168"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250363, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "status", 
//                     "newValue": "In Progress", 
//                     "oldValue": "Done"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P00", 
//             "status": "Implementing", 
//             "jiraType": "Epic", 
//             "jiraName": "Log out after cluster create, and log back in to complete actions ", 
//             "qaRepresentative": null, 
//             "functionalTest": "Yes", 
//             "fixVersion": "PSI_41", 
//             "jiraId": "TRIES-38579", 
//             "jiraParentId": "TRIF-191"
//         }, 
//         "qcItem": {
//             "status": "In Progress", 
//             "requirementType": "Epic", 
//             "requirementId": "2169"
//         }
//     }, 
//     {
//         "diffItem": {
//             "updateTime": 1597250364, 
//             "type": "Update", 
//             "updatedFields": [
//                 {
//                     "fieldName": "qaRepresentative", 
//                     "newValue": "Nimer", 
//                     "oldValue": "shirab"
//                 }
//             ]
//         }, 
//         "jiraItem": {
//             "priority": "P01", 
//             "status": "Done", 
//             "jiraType": "Feature", 
//             "jiraName": "TMA Foothills - UX feedback & GUI enhancements", 
//             "qaRepresentative": "bjack@emc.com", 
//             "functionalTest": "Yes", 
//             "fixVersion": "Foothills", 
//             "jiraId": "TRIF-128", 
//             "jiraParentId": "TRII-23"
//         }, 
//         "qcItem": {
//             "status": "Not Covered", 
//             "requirementType": "Feature", 
//             "requirementId": "772"
//         }
//     }
// ]
// Task.insertMany(newData);






















app.listen(4000, () => { console.log("App is Listening to 3000") })



