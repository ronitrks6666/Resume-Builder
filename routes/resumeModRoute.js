const experss = require("express");
const router = experss.Router();
const ResumeProfileDB = require('../models/profileResumeModel')


router.get('/get-resume/:id', async (req, res) => {
    try {
        const resume = await ResumeProfileDB.findOne({ user: req.params.id })
        res.json(resume)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.patch('/update-resume/:id', async (req, res) => {
    try {
        //req.params.id is _id of the resume data
        const id = req.params.id
        const { field, data, type , docId } = req.body
        if (field == 'profile') {
            console.log(data)
            const resumeUpdate = await ResumeProfileDB.findByIdAndUpdate({ _id: id }, {
                profile: data
            }, {
                returnDocument: "after"
            })
            res.json({ Success: "Data updated", data: resumeUpdate })
        }
        else if (field == 'education') {
            if (type == "new") {
                console.log('Education new')
                const resumeUpdate = await ResumeProfileDB.findByIdAndUpdate({ _id: id }, {
                    $push: {
                        education: data
                    }
                },{
                    returnDocument:"after"
                })
                res.json({ Success: "Data updated", data: resumeUpdate })
            }
            else{
                const resumeUpdate = await ResumeProfileDB.findOneAndUpdate({ _id: id }, {
                    $set: {
                        "education.$[s]": data,
                    },
                },
                    {
                        arrayFilters: [{ "s._id": docId }],
                        returnDocument:"after"
                    }
                )
                res.json({ Success: "Data updated", data: resumeUpdate })
            }
        }
        else if(field == 'language'){
            if (type == "new") {
                console.log('language new')
                const resumeUpdate = await ResumeProfileDB.findByIdAndUpdate({ _id: id }, {
                    $push: {
                        languages: data
                    }
                },{
                    returnDocument:"after"
                })
                res.json({ Success: "Data updated", data: resumeUpdate })
            }
            else{
                const resumeUpdate = await ResumeProfileDB.findOneAndUpdate({ _id: id }, {
                    $set: {
                        "languages.$[s]": data,
                    },
                },
                    {
                        arrayFilters: [{ "s._id": docId }],
                        returnDocument:"after"
                    }
                )
                res.json({ Success: "Data updated", data: resumeUpdate })
            }
        }
        else if(field == 'skill'){
            if (type == "new") {
                console.log('language new')
                const resumeUpdate = await ResumeProfileDB.findByIdAndUpdate({ _id: id }, {
                    $push: {
                        skill: data
                    }
                },{
                    returnDocument:"after"
                })
                res.json({ Success: "Data updated", data: resumeUpdate })
            }
            else{
                const resumeUpdate = await ResumeProfileDB.findOneAndUpdate({ _id: id }, {
                    $set: {
                        "skill.$[s]": data,
                    },
                },
                    {
                        arrayFilters: [{ "s._id": docId }],
                        returnDocument:"after"
                    }
                )
                res.json({ Success: "Data updated", data: resumeUpdate })
            }
        }
        else if(field == 'project'){
            if (type == "new") {
                console.log('project new')
                const resumeUpdate = await ResumeProfileDB.findByIdAndUpdate({ _id: id }, {
                    $push: {
                        project: data
                    }
                },{
                    returnDocument:"after"
                })
                res.json({ Success: "Data updated", data: resumeUpdate })
            }
            else{
                const resumeUpdate = await ResumeProfileDB.findOneAndUpdate({ _id: id }, {
                    $set: {
                        "project.$[s]": data,
                    },
                },
                    {
                        arrayFilters: [{ "s._id": docId }],
                        returnDocument:"after"
                    }
                )
                res.json({ Success: "Data updated", data: resumeUpdate })
            }
        }
        else if(field == 'experience'){
            if (type == "new") {
                console.log('new experience')
                const resumeUpdate = await ResumeProfileDB.findByIdAndUpdate({ _id: id }, {
                    $push: {
                        experience: data
                    }
                },{
                    returnDocument:"after"
                })
                res.json({ Success: "Data updated", data: resumeUpdate })
            }
            else{
                console.log('update experience')
                const resumeUpdate = await ResumeProfileDB.findOneAndUpdate({ _id: id }, {
                    $set: {
                        "experience.$[s]": data,
                    },
                },
                    {
                        arrayFilters: [{ "s._id": docId }],
                        returnDocument:"after"
                    }
                )
                res.json({ Success: "Data updated", data: resumeUpdate })
            }
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete('/delete-education/:id/:eduId' , async(req,res)=>{
    try {
        const id = req.params.id
        const eduId  = req.params.eduId

        const resumeUpdate = await ResumeProfileDB.findByIdAndUpdate({ _id: id }, {
            $pull: {
                education: {_id:eduId}
            }
        },{
            returnDocument:"after"
        })
        res.json({Success:"Item Deleted" , data:resumeUpdate})
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete('/delete-skill/:id/:skillId' , async(req,res)=>{
    try {
        const id = req.params.id
        const skillId  = req.params.skillId

        const resumeUpdate = await ResumeProfileDB.findByIdAndUpdate({ _id: id }, {
            $pull: {
                skill: {_id:skillId}
            }
        },{
            returnDocument:"after"
        })
        res.json({Success:"Item Deleted" , data:resumeUpdate})
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete('/delete-project/:id/:proId' , async(req,res)=>{
    try {
        const id = req.params.id
        const proId  = req.params.proId

        const resumeUpdate = await ResumeProfileDB.findByIdAndUpdate({ _id: id }, {
            $pull: {
                project: {_id:proId}
            }
        },{
            returnDocument:"after"
        })
        console.log('Project Deleted')
        res.json({Success:"Project Item Deleted" , data:resumeUpdate})
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete('/delete-experience/:id/:expId' , async(req,res)=>{
    try {
        const id = req.params.id
        const expId  = req.params.expId

        const resumeUpdate = await ResumeProfileDB.findByIdAndUpdate({ _id: id }, {
            $pull: {
                experience: {_id:expId}
            }
        },{
            returnDocument:"after"
        })
        console.log('Experience Deleted')
        res.json({Success:"Experience Item Deleted" , data:resumeUpdate})
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router;