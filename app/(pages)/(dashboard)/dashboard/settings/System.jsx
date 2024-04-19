
import DeleteModal from "@/app/components/dashboard/device/DeleteModal"
import CreateTemplateModal from "@/app/components/dashboard/settings/CreateTemplateModal"
import { getArrayFromSet } from "@/app/utils/helper"
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { DeviceData, MessageTemplate } from "@/app/utils/types"
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { User } from "next-auth"
import { Message } from "postcss"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getLabelsDevice } from "../../../../api/repository/deviceRepository"
import { getAllContactsLabels } from "../../../../api/repository/contactRepository"
import { deleteTemplates, getTemplates } from "../../../../api/repository/templateRepository"

const System = ({ user }) => {
    const [deviceLabel, setdeviceLabel] = useState([])
    const [contactLabel, setcontactLabel] = useState([])
    const [templateModal, settemplateModal] = useState(false)
    const [templateList, settemplateList] = useState([])
    const [deleteTemplateModal, setdeleteTemplateModal] = useState(false)
    const [selectedTemplate, setselectedTemplate] = useState(new Set([]))
    const [isChecked, setisChecked] = useState(false)

    const fetchDeviceLabel = async () => {
        const result = await getLabelsDevice(user?.token)

        if (result.status === 200) {
            const resultData = result.data
            setdeviceLabel(resultData)
        }
    }

    const fetchContactLabel = async () => {
    
        const result = await getAllContactsLabels(user.token)
        if (result.status === 200) {
            const resultData = result.data
            setcontactLabel(resultData)
        }
    }
    const deleteTemplate = async () => {
        const deletedTemplate = getArrayFromSet(selectedTemplate, templateList)
        if (deletedTemplate) {

            const result = await fetchClient({
                url: '/templates/',
                body: JSON.stringify({ templateIds: deletedTemplate }),
                method: 'DELETE',
                user: user
            })
            if (result?.ok) {
                toast.success('Berhasil hapus template')
                fetchTemplate()
                setselectedTemplate(new Set([]))
            } else {
                toast.error('Gagal hapus template')
            }
        }
    }
    const fetchTemplate = async () => {

        const result = await getTemplates(user.token)

        if (result.status === 200) {
            const resultData = result.data
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
    useEffect(() => {
        if ((selectedTemplate).size > 0 || selectedTemplate === 'all')
            setisChecked(true)
        else
            setisChecked(false)
    }, [selectedTemplate])
    return (
        <>
            <CreateTemplateModal refresh={fetchTemplate} openModal={templateModal} setopenModal={settemplateModal} user={user} />
            <DeleteModal deleteFunction={deleteTemplate} openModal={deleteTemplateModal} setopenModal={setdeleteTemplateModal} count={(selectedTemplate === 'all' ? 'semua' : (selectedTemplate).size)} type="Template" />
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
                    {isChecked ? (
                        <Button className="rounded-md text-sm" color="danger" size="sm" onClick={() => setdeleteTemplateModal(true)}>
                            Hapus
                        </Button>
                    ) : (
                        <Button className="rounded-md text-sm" color="primary" size="sm" onClick={() => settemplateModal(true)}>
                            Buat Template
                        </Button>
                    )}
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
                    selectedKeys={selectedTemplate }
                    onSelectionChange={setselectedTemplate }
                >
                    <TableHeader>
                        <TableColumn>Nama</TableColumn>
                        <TableColumn>Pesan</TableColumn>
                    </TableHeader>
                    <TableBody items={templateList}>
                        {(item) => (
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