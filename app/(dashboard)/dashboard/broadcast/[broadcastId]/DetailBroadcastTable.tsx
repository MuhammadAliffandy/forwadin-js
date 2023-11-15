import ContactIcon from "@/components/dashboard/ContactIcon"
import ProfileAvatar from "@/components/dashboard/ProfileAvatar"
import BubbleChat from "@/components/dashboard/chat/BubbleChat"
import MessageAddContact from "@/components/dashboard/contact/MessageAddContact"
import { formatDate, getNumberFromString } from "@/utils/helper"
import { ContactBroadcast, ContactData } from "@/utils/types"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { Dispatch, SetStateAction, useState } from "react"
interface DetailBroadcastTableProps {
    selectedKeys: Set<string>,
    setSelectedKeys: Dispatch<SetStateAction<Set<string>>>,
    type: 'Terkirim' | 'Diterima' | 'Terbaca' | 'Balasan',
    data: ContactBroadcast[]
}
const DetailBroadcastTable = ({ selectedKeys, setSelectedKeys, data, type }: DetailBroadcastTableProps) => {
    const currentDate = new Date()
    const [messagePhone, setmessagePhone] = useState<string>('')

    const [addContactModal, setaddContactModal] = useState(false)
    const handleAddContactClick = (phone: string) => {
        setmessagePhone(getNumberFromString(phone))
        setaddContactModal(true)
    }
    return (
        <>
            {addContactModal &&
                <MessageAddContact
                    fetchData={() => { }}
                    openModal={addContactModal}
                    setopenModal={setaddContactModal}
                    addContactData={{ phone: messagePhone }}
                />
            }

            <Table
                aria-label="Incoming Chat"
                color='default'
                selectionMode="none"
                isHeaderSticky
                classNames={{
                    td: 'text-[11px] font-nunito',
                    tr: 'text-[11px] font-nunito',
                    base: "max-h-[55vh] overflow-y-scroll",
                    table: "",
                    thead: 'rounded-md',
                    wrapper: 'rounded-md'
                }}
                radius='md'
                selectedKeys={selectedKeys as any}
                onSelectionChange={setSelectedKeys as any}
            >
                <TableHeader>
                    <TableColumn>Nama Penerima</TableColumn>
                    <TableColumn>Nomor HP</TableColumn>
                    <TableColumn>Label Kategori</TableColumn>
                    <TableColumn>Tanggal</TableColumn>
                    <TableColumn>Pesan</TableColumn>
                </TableHeader>
                <TableBody emptyContent={
                    <div className='w-full bg-white p-12'>
                        <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                            <p className='text-[16px] font-bold'>Belum ada pesan {type}
                            </p>
                        </div>
                    </div>

                } items={data}>
                    {(item: ContactBroadcast) => (
                        <TableRow key={item.id}>
                            <TableCell className='flex gap-2 items-center'>
                                <p>{item.contact.firstName} {item.contact.lastName}</p>
                            </TableCell>
                            <TableCell >{item.contact.phone}</TableCell>
                            <TableCell className='flex flex-wrap justify-center lg:justify-start items-center gap-2'>  {item.contact.ContactLabel?.map((item, idx) => (
                                <div key={idx} className='border-2 border-primary px-2 py-1 rounded-full'>
                                    {item.label.name}
                                </div>
                            ))}</TableCell>
                            <TableCell >{formatDate(item.createdAt)}</TableCell>

                            <TableCell>
                                <Popover placement="left-end"
                                    className='font-inter'
                                    radius='sm'
                                    showArrow={true}
                                >
                                    <PopoverTrigger>
                                        <Button
                                            variant='bordered'
                                            size='sm'
                                        >Lihat Chat</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="px-1 py-2">
                                            <div className='flex gap-2 items-center'>
                                                <ProfileAvatar profile={item.contact} />
                                                <div className='text-xs'>
                                                    {item.contact ? item.contact.firstName + ' ' + item.contact.lastName : getNumberFromString(item.from! + item.to)}
                                                </div>
                                            </div>
                                            <BubbleChat
                                                text={item.message}
                                                received={item.updatedAt}
                                                status={'delivery_ack'}
                                                mediaPath={item.mediaPath}
                                                isOutgoing={false}
                                                currentDate={currentDate}
                                            />
                                            {!item.contact && (
                                                <div className='mt-4 bg-neutral-75 p-3 rounded-md flex gap-4 justify-between items-center'>
                                                    <p className='text-xs text-customGray'>
                                                        Nomor ini tidak ada di kontak
                                                    </p>
                                                    <div className='flex justify-end '>

                                                        <Button onClick={() => handleAddContactClick(item.from! + item.to)}
                                                            color='primary'
                                                            radius='md'
                                                        >
                                                            Tambah ke Kontak
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default DetailBroadcastTable