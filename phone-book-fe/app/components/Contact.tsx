import { BsThreeDots } from "react-icons/bs"

type ContactProps = {
    name        :string,
    phoneNumber :string
}

export default function Contact({name, phoneNumber}: ContactProps) {
    const AVATAR_URL = "https://ui-avatars.com/api/?background=random&rounded=true&"
    let NAME_AVATAR = name.split(" ")

    return(
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
                <div className="">
                    <img src={AVATAR_URL+`name=`+ NAME_AVATAR[0]+"+"+NAME_AVATAR[1]} alt="" />
                </div>
                <div className="flex flex-col">
                    <p className="text-md font-semibold">{name}</p>
                    <span className="text-sm text-slate-400">{phoneNumber}</span>
                </div>
            </div>
            {/* <BsThreeDots className="text-2xl mr-4 cursor-pointer" /> */}
        </div>
    )
}