
import CreateTemplateModal from "@/components/dashboard/settings/CreateTemplateModal"
import { fetchClient } from "@/utils/helper/fetchClient"
import { DeviceData, MessageTemplate } from "@/utils/types"
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { User } from "next-auth"
import { Message } from "postcss"
import { useEffect, useState } from "react"

interface SystemPageProps {
    user: User | undefined,
}
const System = ({ user }: SystemPageProps) => {
    const [deviceLabel, setdeviceLabel] = useState<string[]>([])
    const [contactLabel, setcontactLabel] = useState<string[]>([])
    const [templateModal, settemplateModal] = useState(false)
    const [templateList, settemplateList] = useState<MessageTemplate[]>([])
    const fetchDeviceLabel = async () => {
        const result = await fetchClient({
            url: '/devices/labels',
            method: 'GET',
            user: user
        })
        if (result?.ok) {
            const resultData = await result.json()
            setdeviceLabel(resultData)
        }
    }
    const fetchContactLabel = async () => {
        const result = await fetchClient({
            url: '/contacts/labels',
            method: 'GET',
            user: user
        })
        if (result?.ok) {
            const resultData = await result.json()
            setcontactLabel(resultData)
        }
    }
    const fetchTemplate = async () => {
        const result = await fetchClient({
            url: '/templates',
            method: 'GET',
            user: user
        })
        if (result?.ok) {
            const resultData = await result.json()
            console.log('ini template')
            console.log(resultData)
            settemplateList(resultData)
        }
    }

    useEffect(() => {
        if (user?.token) {
            fetchDeviceLabel()
            fetchContactLabel()
            fetchTemplate()
        }
    }, [user?.token])
    return (
        <>
            <CreateTemplateModal refresh={fetchTemplate} openModal={templateModal} setopenModal={settemplateModal} user={user} />
            <p className="font-lexend text-lg font-bold">Labels</p>
            <div className="flex flex-col gap-4 mt-4">
                <p className="">Device Labels</p>
                <div className="bg-neutral-75 text-customNeutral py-3 px-4 text-xs">
                    Tambahkan atau hapus label sesuai dengan preferensi Anda untuk mengorganisir perangkat Anda dengan lebih baik.
                </div>
                <div className="border border-customGray py-2 px-4 w-full rounded-md flex flex-wrap gap-2">
                    {deviceLabel.map(label => (
                        <div className="rounded-full outline outline-2 outline-primary px-2 py-1">
                            {label}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <p className="">Contact Labels</p>
                <div className="bg-neutral-75 text-customNeutral py-3 px-4 text-xs">
                    Tambahkan atau hapus label sesuai dengan kebutuhan Anda untuk lebih efisien dalam manajemen kontak.
                </div>
                <div className="border border-customGray py-2 px-4 w-full rounded-md flex flex-wrap gap-2">
                    {contactLabel.map(label => (
                        <div className="rounded-full bg-primary text-white px-2 py-1">
                            {label}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-6">
                <div className="flex justify-between items-center ">
                    <p className="font-lexend text-lg font-bold">Templates</p>
                    <Button className="rounded-md text-sm" color="primary" size="sm" onClick={() => settemplateModal(true)}>
                        Buat Template
                    </Button>
                </div>
                <div className="bg-neutral-75 text-customNeutral py-3 px-4 text-xs">
                    Atur template sesuai dengan kebutuhan Anda untuk lebih efisien dalam mengirim pesan.
                </div>
                <Table
                    aria-label="Incoming Chat"
                    color='default'
                    selectionMode="multiple"
                    // isHeaderSticky
                    classNames={{
                        td: 'text-[11px] font-nunito',
                        tr: 'text-[11px] font-nunito',
                        base: "max-h-[55vh] overflow-y-scroll",
                        table: "",
                        thead: 'rounded-md',
                        wrapper: 'rounded-md'
                    }}
                    radius='md'
                // selectedKeys={selectedKeys as any}
                // onSelectionChange={setSelectedKeys as any}
                >
                    <TableHeader>
                        <TableColumn>Nama</TableColumn>
                        <TableColumn>Pesan</TableColumn>
                    </TableHeader>
                    <TableBody items={templateList}>
                        {(item: MessageTemplate) => (
                            <TableRow key={item.id}>
                                <TableCell >{item.name}</TableCell>
                                <TableCell >{item.message}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="h-[200px]" />
        </>
    )
}

export default System