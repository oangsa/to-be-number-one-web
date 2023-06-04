import { NextRouter, useRouter } from "next/router";

const del = async (id: number) => {
    const res = await fetch(`/api/user/remove/${id}`, {
        method: "DELETE",
    })

    if (res.status !== 200) return await res.json()

    console.log("success")

}

export default del; 