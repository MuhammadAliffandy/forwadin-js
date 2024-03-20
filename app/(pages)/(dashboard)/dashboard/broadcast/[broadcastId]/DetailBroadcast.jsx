'use client'
import BubbleChat from "@/app/components/dashboard/chat/BubbleChat"
import { formatDate } from "@/app/utils/helper"
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { ContactBroadcast, GetBroadcast } from "@/app/utils/types"
import { Button, Link, Skeleton, Tab, Tabs } from "@nextui-org/react"
import { animated, useTransition } from "@react-spring/web"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import DetailBroadcastTable from "./DetailBroadcastTable"
import DisplayImage from "@/app/components/dashboard/auto-reply/DisplayImage"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { isFileImage } from "@/app/utils/helper/fileHelper"
import DisplayFile from "@/app/components/dashboard/DisplayFile"
import { deleteBroadcast, getBroadcastDetail, getOutgoingBroadcastsByQuery, getOutgoingReplies } from "../../../../../api/repository/broadcastRepository"

const DetailBroadcast = ({ broadcastId }) => {
	const { data } = useSession()
	const router = useRouter()
	const [isbroadcastLoaded, setisbroadcastLoaded] = useState(false)
	const [broadcastData, setbroadcastData] = useState()
	const [isDetailBroadcastLoaded, setisDetailBroadcastLoaded] = useState(false)
	const [broadcastDetail, setbroadcastDetail] = useState({
		Terkirim: [],
		Diterima: [],
		Terbaca: [],
		Balasan: []
	})
	const [selectedKeys, setselectedKeys] = useState(new Set())
	const [currentPage, setcurrentPage] = useState<'Terkirim' | 'Diterima' | 'Terbaca' | 'Balasan'>('Terkirim')
	const fetchBroadcast = async () => {

		const result = await getBroadcastDetail(session.user.token , broadcastId)

		if (result?.ok) {
			const resultData = await result.json()
			setbroadcastData(resultData)
			console.log(resultData)
		}
		setisbroadcastLoaded(true)
	}
	const componentTransition = useTransition(currentPage, {
		from: {
			transform: "translateX(100px)",
			opacity: "0",
		},
		enter: {
			transform: "translateX(0px)",
			opacity: "1",
		},
	})
	const handleDeleteBroadcast = async () => {
		const isConfirm = window.confirm('Anda yakin ingin menghapus broadcast ' + broadcastData?.name + '?')
		if (isConfirm) {

			const result = await deleteBroadcast(session.user.token ,{ broadcastIds: [broadcastData.id] } )

			if (result?.ok) {
				toast.success('Berhasil hapus broadcast')
				router.push('/dashboard/broadcast')
			} else {
				toast.error('Gagal hapus broadcast')
			}
		}
	}
	const fetchAllBroadcast = async () => {
		// server_ack, read, delivery_ack
	
		const fetchSent = await getOutgoingBroadcastsByQuery(session.user.token , broadcastId , '?status=server_ack')

		const fetchReceived = await getOutgoingBroadcastsByQuery(session.user.token , broadcastId , '?status=delivery_ack')

		const fetchRead = await getOutgoingBroadcastsByQuery(session.user.token , broadcastId , '?status=read')

		const fetchReply = await getOutgoingReplies(session.user.token , broadcastId)

		if (fetchSent?.ok && fetchRead?.ok && fetchReceived?.ok && fetchReply?.ok) {
			setbroadcastDetail({
				Terkirim: (await fetchSent.json()).outgoingBroadcasts,
				Terbaca: (await fetchRead.json()).outgoingBroadcasts,
				Diterima: (await fetchReceived.json()).outgoingBroadcasts,
				Balasan: (await fetchReply.json()).broadcastReplies
			})
		}
		setisDetailBroadcastLoaded(true)
	}
	useEffect(() => {
		if (session?.user?.token && !broadcastData) {
			fetchBroadcast()
			fetchAllBroadcast()
		}
	}, [session?.user?.token])

	return (
		<>
			<p className="font-lexend text-2xl font-bold mt-4">Broadcast: {broadcastData?.name}</p>

			{isbroadcastLoaded ? (
				<div className="w-full bg-white rounded-md p-4 lg:p-6 mt-4 flex gap-12">
					<div className="w-full max-w-xs">
						<p className="font-lexend text-2xl font-bold">Broadcast Detail</p>
						<table className='w-full border-separate border-spacing-y-1 mt-4'>
							<tbody >
								<tr>
									<th className='font-bold whitespace-pre '>Broadcast Name</th>
									<td className="break-all">{broadcastData?.name}</td>
								</tr>
								<tr>
									<th className='font-bold whitespace-pre '>Device</th>
									<td className="break-all">{broadcastData?.device.name}</td>
								</tr>
								<tr>
									<th className='font-bold whitespace-pre '>Recipients</th>
									<td className="break-all">{broadcastData?.recipients?.length}</td>
								</tr>
								<tr>
									<th className='font-bold whitespace-pre '>Schedule</th>
									<td className="break-all">{formatDate(broadcastData?.schedule)}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="w-full">
						<p className="font-lexend text-xl font-bold">Tampilan Pesan</p>
						<div className="relative">
							<div className="rounded-md border border-customGray px-4 py-3 mt-8">

								{broadcastData?.message}
							</div>
							<div className="absolute bottom-1 right-2 text-customGray text-sm">
								<p>now &#10003;</p>
							</div>
						</div>
						{broadcastData?.mediaPath && (
							<>
								<p className="my-2">Media</p>
								{isFileImage(broadcastData.mediaPath) ? (
									<DisplayImage imageUrl={broadcastData.mediaPath} />
								) : (
									<DisplayFile fileUrl={broadcastData.mediaPath} />
								)}
							</>
						)}
						<div className="flex justify-end gap-2 mt-4">
							<Button as={Link} href={'/dashboard/broadcast/edit/' + broadcastData?.id} variant="bordered" className="rounded-md">
								Edit
							</Button>
							<Button onClick={handleDeleteBroadcast} color="danger" className="rounded-md" >
								Hapus Broadcast
							</Button>
						</div>
					</div>
				</div>
			) : (
				<>
					<div className='mt-4 flex flex-col gap-2 p-4 bg-white'>

						<Skeleton className={'w-full h-3 rounded-full'} />
						<Skeleton className={'w-full h-3 rounded-full'} />
						<Skeleton className={'w-full h-3 rounded-full'} />
					</div>
				</>
			)}
			{isDetailBroadcastLoaded ? (
				<>
					<div className="w-full bg-white rounded-md px-3 py-3 pb-6 mt-2">
						<div className="flex gap-2">
							<Tabs aria-label="Options" variant="light" color="primary" radius="md" size="lg"
								selectedKey={currentPage}
								onSelectionChange={setcurrentPage}>
								<Tab key="Terkirim" title="Terkirim" />
								<Tab key="Diterima" title="Diterima" />
								<Tab key="Terbaca" title="Terbaca" />
								<Tab key="Balasan" title="Balasan" />
							</Tabs>
						</div>

						<div className="w-full">
							{componentTransition((style, item) => item && (
								<animated.div style={style}>
									<DetailBroadcastTable
										selectedKeys={selectedKeys}
										setSelectedKeys={setselectedKeys}
										type={item}
										data={broadcastDetail[item]}
									/>
								</animated.div>
							))}
						</div>

					</div>
				</>
			) : (
				<>
					<div className='mt-4 flex flex-col gap-2 p-4 bg-white'>

						<Skeleton className={'w-full h-3 rounded-full'} />
						<Skeleton className={'w-full h-3 rounded-full'} />
						<Skeleton className={'w-full h-3 rounded-full'} />
					</div >
				</>
			)}
		</>
	)
}

export default DetailBroadcast