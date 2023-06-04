import { forwardRef } from "react";
import Logo from "../../../public/Logo.png"
import Link from "next/link";
import { HomeIcon, ListBulletIcon, ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon, CodeBracketSquareIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Image from "next/image";


const SideBar = forwardRef(({ showNav }: any, Ref:any) => {
    const router = useRouter();

    const hasCookie = true
    const isAdmin = true

    const loginLogoutHandle = () => {

    }

    return (
        <div ref={Ref} className="fixed w-56 h-full bg-white shadow-sm">
            <div className="flex justify-center mt-6 mb-14">
                <Image width={150} height={150} src={Logo} alt="company logo" />
            </div>

            <div className="flex flex-col">
            <Link href="/">
                <div
                className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                    router.pathname == "/"
                    ? "bg-orange-100 text-orange-500"
                    : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
                }`}
                >
                <div className="mr-2">
                    <HomeIcon className="h-5 w-5" />
                </div>
                <div>
                    <p>Home</p>
                </div>
                </div>
            </Link>
            {isAdmin === true ? 
                <><Link href="/admin/dashboard">
                        <div
                        className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors 
                        ${router.pathname == "/admin/dashboard"
                            ? "bg-orange-100 text-orange-500"
                            : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"}`}
                        >
                        <div className="mr-2">
                            <CodeBracketSquareIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p>Dashboard</p>
                        </div>
                        </div>
                    </Link>
                    <Link href="/admin/userlist">
                        <div
                        className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors 
                        ${router.pathname == "/admin/userlist"
                            ? "bg-orange-100 text-orange-500"
                            : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"}`}
                        >
                        <div className="mr-2">
                            <ListBulletIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p>Userlist</p>
                        </div>
                        </div>
                    </Link></> : ""
            }

            {hasCookie === true ? 
                <div onClick={loginLogoutHandle}>
                    <div
                    className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == "/settings"
                        ? "bg-orange-100 text-orange-500"
                        : "text-red-500 bg-red-100 hover:bg-red-200 hover:text-red-600"
                    }`}
                    >
                    <div className="mr-2">
                        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                    </div>
                    <div>
                        <p>Logout</p>
                    </div>
                    </div>
                </div>
            :
                <div onClick={loginLogoutHandle}>
                    <div
                    className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == "/settings"
                        ? "bg-orange-100 text-orange-500"
                        : "text-green-500 bg-green-100 hover:bg-green-200 hover:text-green-600"
                    }`}
                    >
                    <div className="mr-2">
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    </div>
                    <div>
                        <p>Login</p>
                    </div>
                    </div>
                </div>
            
            }
            
            </div>
        </div>
        );
});

SideBar.displayName = "SideBar";

export default SideBar;