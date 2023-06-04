// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/src/libs/connectMongo'
import Note from '@/src/models/schemas'
import Usetage from '../../../src/models/usetage'
import moment from 'moment-timezone'


export default async function send( req: NextApiRequest,res: NextApiResponse) {
  if (req.method !== "POST" ) return res.status(405).send({message: "Only POST method is allowed!"})
  
  const { name, surname, other } = req.body

  console.log(name, surname, other)

  const auth1 = (name === undefined || surname === undefined || other === undefined)

  const auth2 = (name === "" || surname === "" || other === "")

  if ( auth1 || auth2 ) return res.status(401).send({ message: "Please send all of data in request!" })

  try {
    connectMongo()

    const check = await Note.findOne({"studentData.name" : name, "studentData.surname" : surname})

    console.log(check)

    if ( check == null ) return res.status(201).send({ message: "Student is not valid!" })

    await Note.updateOne({"studentData.name" : name, "studentData.surname" : surname}, 
        {$set: {"studentData.reason": other, "studentData.total": check.studentData.total + 1, 
                "studentData.timestamps": new Date().toUTCString()}})

    const Data = await Usetage.find({})

    if ( Data.length < 1 ) {
        const struct = {
            currentData: {
                total: 1,
                day: 1,
                month: 1
            },
            oldData: {
                day: 0,
                month: 0
            }
        }
        await Usetage.create(struct)
    } 

    else {
        await Usetage.updateOne({"data.total": Data[0].currentData.total}, 
            {$set: {"data.total": Data[0].currentData.day + 1, "data.day": Data[0].currentData.total + 1, "data.month": Data[0].currentData.month + 1 }})
    }

    return res.status(200).send({ message: "Success" })
  } 
  catch (err) {
    return res.status(404).send({ message: "Unexpected Error" })
  }

  
}