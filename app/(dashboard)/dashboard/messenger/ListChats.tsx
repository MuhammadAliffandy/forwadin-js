import { DeviceData } from "@/utils/types"
import { useState } from "react"

const ListChats = () => {
    const [listDevice, setlistDevice] = useState<DeviceData[]>([
        {
            pkId: 1,
            id: 'asdasdadad',
            name: 'Coba coba',
            phone: '6291919191',
            apiKey: 'oaod-1091d-12en',
            serverId: 1,
            status: 'CONNECTED',
            created_at: '11.9.2023, 2:43 PM',
            updated_at: '11.9.2023, 2:43 PM',
            userId: 1,
            DeviceLabel: [],
        }
    ])
    return (
        <>
            <div className="bg-white border border-customGray p-3 flex justify-between gap-2 hover:cursor-pointer rounded-md w-full items-center">
                <div className="flex-none">
                    <img src="/assets/icons/dashboard/Devices.svg" alt="" className="invert-[1] grayscale-0" />
                </div>
                <p>RMX123</p>
                <p className="text-customGray">+6281357995175</p>
                <div className="flex-none px-2">
                    <img src="/assets/icons/chevron-down.svg" alt="" width={12} />
                </div>
            </div>
            <div>

            </div>
        </>
    )
}

export default ListChats