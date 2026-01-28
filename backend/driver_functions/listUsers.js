const express = require("express");
const mongoose = require("mongoose");
const user = require("../configuration/userModel");
const zod = require("zod");

async function listAllUsers(req, res)
{

//     await user.find({}, (err, users) => {
//         if(err){
//             return res.status(500).json({message: "Error fetching users"});
//         }

//        

//         })

// })
const allUsers = await user.find({});

 const FilteredInfo = allUsers.map((userData) =>{
            
            return{
                firstName: userData.firstName,
                lastName: userData.lastName,
                userId: userData._id,
            }
});
res.status(200).json({users: FilteredInfo});
}




const searchSchema = zod.string();

async function searchUsers(req, res){

      const { filter } = req.query;

    const validQuery = searchSchema.safeParse(filter);
    
    
 
    
    if(!validQuery.success){
        return res.status(400).json({message: "Invalid search query"});
    }   

    const regex = new RegExp(filter, 'i'); 
    
    //will allow any case insensitive match

    const matchedUsers = await user.find({
        $or: [
            { firstName: { $regex: regex } },
            { lastName: { $regex: regex } },
        ]
    });

    res.json({
        users: matchedUsers.map((userData) => {
            return {
                firstName: userData.firstName,
                lastName: userData.lastName,
                UserID: userData._id,
                email: userData.email,
            };
        })
    });
}


module.exports = { listAllUsers, searchUsers }