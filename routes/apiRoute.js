import express from 'express'
import { checkUniqueUser } from '../middlewere/checkUser.js'
import { db } from '../DB/mongoCon.js'
import { ObjectId } from 'mongodb'
import { userAuthentication } from '../middlewere/authentication.js'
import { supabase } from '../DB/supabase.js'
import { atbashEncript } from '../utils/atbashEncrypt.js'
import { reversEncrypt } from '../utils/reverseEncrypt.js'



const api = express.Router()


api.post('/auth/register', checkUniqueUser, async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) {

        throw new Error('you have to write username and password')

    }

    await db.collection('users').insertOne({

        username,
        password,
        encryptedMessagesCount: 0,
        createdAt: new Date()

    })

    res.status(201).json({

        id: new ObjectId(),
        username
    })
})


api.post('/messages/encrypt', userAuthentication, async (req, res) => {
    
    let encrypted_text;

    const { cipherType, message } = req.body

    if (!cipherType) {

        cipherType = 'reverse'

    }

    if (cipherType === 'reverse') {

        encrypted_text = reversEncrypt(message)

    } else if (cipherType === 'ATBASH') {

        encrypted_text = atbashEncript(message)

    }

    await supabase
    .from('messages')
    .insert({
        username: req.headers["username"],
        cipher_type: cipherType,
        encrypted_text: encrypted_text,
        inserted_at: new Date()
    })
    

    await db.collection('users').updateOne({username: req.headers["username"]}, {$inc: {encryptedMessagesCount: 1}})

    res.status(201).json({

        id: (await supabase.from('messages').select('id').eq('username', req.headers["username"])).data[0].id,
        cipherType: cipherType,
        encrypted_text: encrypted_text

    })

})


api.post('/messages/decrypt', userAuthentication, async (req, res) => {

    let decryptedText;

    const messageFound = await supabase.from('messages').select('*').eq('id', req.body.messageId)
    
    const type_cipher = messageFound.data[0].cipher_type
    

    if (type_cipher === 'ATBASH') {

        decryptedText = atbashEncript(messageFound.data[0].encrypted_text)

    } else if (type_cipher === 'reverse') {

        decryptedText = reversEncrypt(messageFound.data[0].encrypted_text)

    }

    if (messageFound.data[0].cipher_type === 'RANDOM_SHUFFLE') {

        return res.status(200).json({ 
            id: req.body.messageId, 
            decryptedText: null, 
            error: "CANNOT_DECRYPT" 
        })

    }

    res.status(200).json({

        id: req.body.messageId,
        decryptedText

    })

    
})


api.get('/users/me', userAuthentication, async (req, res) => {

    const result = await db.collection('users').find({username: req.headers["username"]}).toArray()

    res.status(200).json({

        username: result[0].username,
        encryptedMessagesCount: result[0].encryptedMessagesCount

    })
    
})


export  { api }