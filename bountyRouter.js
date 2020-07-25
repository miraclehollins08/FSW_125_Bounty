const express = require('express')
const bountyRouter = express.Router()
const uuid = require("uuid/v4")

// middleware //
bountyRouter.use(express.json())

// fake database //
const Bounties = [
    { title:"Darth Vader", Living:"False", Bounty_Amount:"$100,000,000", Type:"Sith", _id: uuid() },
    { title:"Luke Skywaler", Living:"True", Bounty_Amount:"$900,000.000", Type:"Jedi", _id: uuid()}
]


// Get All 
bountyRouter.get("/", (req, res) => {
    res.send(Bounties)
})

// Get one
bountyRouter.get("/:BountiesId", (req, res) => {
    const BountiesId = req.params.BountiesId
    const foundBounties = Bounties.find(bounties => bounties._id === BountiesId)
    res.send(foundBounties)
})

// Get by Type
bountyRouter.get("/search/Type", (req, res) => {
    const Type = req.query.Type
    const filteredBounties = Bounties.filter(bounties => bounties.Type === Type)
    res.send(filteredBounties)
})

// Post one
bountyRouter.post("/", (req, res) => {
    const newBounties = req.body
    newBounties._id = uuid()
    Bounties.push(newBounties)
    res.send("Successfully added ${newBounties.title} to the database!")
})

module.exports = bountyRouter