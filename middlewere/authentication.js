import { db } from "../DB/mongoCon.js"

export async function userAuthentication(req, res, next) {

    const { username, password } = req.headers

    if (!username || !password) {

        return res.status(404).json({

            error: 'You must enter a username and password to verify access'
        
        })
    }

    const result = await db.collection('users').find({ $and: [{username: username}, {password: password}]})

    if (result.length === 0) {

        return res.status(404).json({

            error: 'You do not have access because the username or password is incorrect.'
        
        })

    }

    next()

}