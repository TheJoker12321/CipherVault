import { db } from "../DB/mongoCon.js"; 


export async function checkUniqueUser(req, res, next) {

    const { username } = req.body

    const result = await db.collection('users').find({username: username}).toArray()

    if (result.length > 0) {

        return res.status(401).json({

            error: 'username is already exist'

        })

    }

    next()

}