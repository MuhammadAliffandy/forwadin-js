'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GroupData, MultipleCheckboxRef } from '@/utils/types';
import GroupList from './GroupList';
import AddGroupModal from '@/components/dashboard/group/AddGroupModal';
import { Skeleton } from '@nextui-org/react';
import { fetchClient } from '@/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const GroupTable = ({ setcountGroup }: { setcountGroup: Dispatch<SetStateAction<number>> }) => {
    const { data: session } = useSession()
    const { push } = useRouter()
    const [isLoaded, setisLoaded] = useState(false)
    const mainCheckboxRef = useRef<HTMLInputElement>(null)
    const groupCheckboxRef = useRef<MultipleCheckboxRef>({})
    const [isChecked, setisChecked] = useState(false)
    const [groupData, setgroupData] = useState<GroupData[]>([
    ])
    const [searchText, setsearchText] = useState('')
    const [searchedGroup, setsearchedGroup] = useState<GroupData[]>([])
    const [addGroupModal, setaddGroupModal] = useState(false)
    const handleCheckBoxClick = (e: React.FormEvent<HTMLInputElement>, id: string) => {
        const newgroupData = groupData.map(obj => {
            return (obj.id === id ? { ...obj, checked: e.currentTarget.checked } : obj)
        })
        setgroupData(() => newgroupData)
    }

    const handleIndexCheckbox = (e: React.MouseEvent) => {
        const currentgroupData = (searchText ? searchedGroup : groupData)
        if (mainCheckboxRef.current && !mainCheckboxRef.current.checked) {
            const newArray = currentgroupData.map((obj, idx) => {
                groupCheckboxRef.current[`checkbox_${obj.id}`].checked = false
                return { ...obj, checked: false }
            })
            if (searchText)
                setsearchedGroup(newArray)
            else
                setgroupData(() => newArray)
        } else {
            const newArray = currentgroupData.map((obj, idx) => {
                groupCheckboxRef.current[`checkbox_${obj.id}`].checked = true
                return { ...obj, checked: true }
            })
            if (searchText)
                setsearchedGroup(() => newArray)
            else
                setgroupData(() => newArray)
        }
    }
    const handleOpenDetailModal = (params: string) => {
        push('/dashboard/group/' + params)
    }
    const filterDevice = (text: string) => {
        const regex = new RegExp(text, 'i')
        return groupData.filter(item => regex.test(item.name))
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsearchText(e.target.value)
    }
    const handleDeleteGroup = () => {
        // TODO
        // const checkedGroups = groupData.filter(item => item.checked === false).map(item => item)
        // setgroupData(checkedGroups)
    }
    const fetchData = async () => {
        const result = await fetchClient({
            url: '/groups',
            method: 'GET',
            user: session?.user
        })
        if (result) {
            const resultData: GroupData[] = await result.json()
            if (result.status === 200) {
                setgroupData(resultData)
                setisLoaded(true)
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [session?.user])
    useEffect(() => {
        if (mainCheckboxRef.current) {
            const checkObject = groupData.find(obj => obj.checked === true)
            if (checkObject) {
                mainCheckboxRef.current.checked = true
                setisChecked(true)
            }
            else {
                mainCheckboxRef.current.checked = false
                setisChecked(false)
            }
        }
    }, [groupData])
    useEffect(() => {
        if (mainCheckboxRef.current) {
            const checkObject = searchedGroup.find(obj => obj.checked === true)
            if (checkObject) {
                mainCheckboxRef.current.checked = true
                setisChecked(true)
            }
            else {
                mainCheckboxRef.current.checked = false
                setisChecked(false)
            }
        }
    }, [searchedGroup])

    useEffect(() => {
        const searchResult = filterDevice(searchText)
        setsearchedGroup(searchResult)
    }, [searchText])

    return (
        <>
            <AddGroupModal openModal={addGroupModal} setopenModal={setaddGroupModal} fetchData={fetchData} />
            <div className="mt-8 p-4 bg-white rounded-md">
                <div className="flex sm:flex-row flex-col gap-2 lg:justify-between items-center">
                    <div className="w-full">
                        <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari nama / nomor"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className='flex lg:flex-row flex-col lg:justify-end justify-between gap-2 w-full lg:w-auto'>
                        {isChecked ? (
                            <div onClick={handleDeleteGroup} className="bg-danger rounded-md px-6 text-white text-center w-full max-w-md items-center flex hover:cursor-pointer justify-center p-2">
                                Hapus
                            </div>
                        ) : (
                            <div onClick={() => setaddGroupModal(true)} className="bg-primary rounded-md px-6 text-white text-center w-full max-w-md items-center flex hover:cursor-pointer justify-center p-2 whitespace-pre">
                                Buat Group Baru
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isLoaded ? (

                <div className='overflow-x-scroll allowed-scroll'>
                    <table className="w-full text-center font-nunito text-xs font-bold ">
                        <thead className='bg-neutral-75'>
                            <tr className=''>
                                <th className='py-4 checkbox'>
                                    <input ref={mainCheckboxRef} type="checkbox" name="main_checkbox" id="main_checkbox" className='rounded-sm focus:ring-transparent' onClick={handleIndexCheckbox} />
                                </th>
                                <th className='p-4'>Nama</th>
                                <th className='p-4'>Campaign</th>
                                <th className='p-4'>Jumlah Anggota</th>
                                <th className='p-4'>Detail</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {searchText ? (
                                <GroupList
                                    groupData={searchedGroup}
                                    multipleCheckboxRef={groupCheckboxRef}
                                    handleCheckBoxClick={handleCheckBoxClick}
                                    handleOpenDetailModal={handleOpenDetailModal}
                                />
                            ) : (
                                <GroupList
                                    groupData={groupData}
                                    multipleCheckboxRef={groupCheckboxRef}
                                    handleCheckBoxClick={handleCheckBoxClick}
                                    handleOpenDetailModal={handleOpenDetailModal}
                                />

                            )}
                        </tbody>
                    </table>
                    {groupData.length === 0 && (
                        <div className='w-full bg-white p-12'>
                            <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                <p className='text-[16px] font-bold'>Group masih kosong</p>
                                <p className='text-xs text-[#777C88]'>Tambahkan kontak kedalam group ini</p>
                                <p className='text-xs'>Dengan grup ini, Anda dapat dengan mudah berkomunikasi dengan banyak kontak sekaligus.</p>
                                <div className='flex'>
                                    <div onClick={() => setaddGroupModal(true)} className="bg-primary rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                        Buat Group Baru
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div >
            ) : (
                <div className='mt-4 flex flex-col gap-2 p-4 bg-white'>

                    <Skeleton className={'w-full h-3 rounded-full'} />
                    <Skeleton className={'w-full h-3 rounded-full'} />
                    <Skeleton className={'w-full h-3 rounded-full'} />
                </div>
            )}
        </>
    )
}

export default GroupTable