import React from 'react'
import { useEffect, useState } from "react"
import { CookieValueTypes, getCookie } from 'cookies-next';
import jwtDecode from "jwt-decode";
import { studentData, loginData } from "@/src/libs/interface"
import getData from "@/src/libs/getData"
export default function Test() {

    const [studentData, setStudentData] = useState<studentData>({
        name: "",
        surname: "",
        studentId: 0,
        yearClass: 0,
        class: 0,
        reason: "",
        total: 0,
        oldMonth: 0,
        timestamps: new Date()
    })
    const [loginData, setLoginData] = useState<loginData>({
        username: "",
        password: ""
    })
    
    const data = async () => {
        const cookie: any = getCookie("user-token")
        const token: any = jwtDecode(cookie, {header: true})
        const data: Promise<student> = getData(token.username, token.password)
        const [Student] = await Promise.all([data])
        
        setStudentData(Student.studentData)
        setLoginData(Student.loginData)
    }

    useEffect(() => {
        data()
    })

    return (
        <div>{JSON.stringify(studentData.oldMonth)}</div>
    )
}
