'use client'
import BubbleChat from "@/components/dashboard/chat/BubbleChat"
import { formatDate } from "@/utils/helper"
import { fetchClient } from "@/utils/helper/fetchClient"
import { ContactBroadcast, GetBroadcast } from "@/utils/types"
import { Button, Link, Skeleton, Tab, Tabs } from "@nextui-org/react"
import { animated, useTransition } from "@react-spring/web"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import DetailBroadcastTable from "./DetailBroadcastTable"
import DisplayImage from "@/components/dashboard/auto-reply/DisplayImage"

const DetailBroadcast = ({ broadcastId }: { broadcastId: string }) => {
	const { data: session } = useSession()
	const [isbroadcastLoaded, setisbroadcastLoaded] = useState(false)
	const [broadcastData, setbroadcastData] = useState<GetBroadcast>()
	const [isDetailBroadcastLoaded, setisDetailBroadcastLoaded] = useState(false)
	const [broadcastDetail, setbroadcastDetail] = useState({
		Terkirim: [],
		Diterima: [],
		Terbaca: [],
		Balasan: []
	})
	const [selectedKeys, setselectedKeys] = useState<Set<string>>(new Set())
	const [currentPage, setcurrentPage] = useState<'Terkirim' | 'Diterima' | 'Terbaca' | 'Balasan'>('Terkirim')
	const fetchBroadcast = async () => {
		const result = await fetchClient({
			url: '/broadcasts/' + broadcastId,
			method: 'GET',
			user: session?.user
		})
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
	const fetchAllBroadcast = async () => {
		// server_ack, read, delivery_ack
		const fetchSent = await fetchClient({
			url: '/broadcasts/' + broadcastId + '/outgoing?status=server_ack',
			method: 'GET',
			user: session?.user
		})
		const fetchReceived = await fetchClient({
			url: '/broadcasts/' + broadcastId + '/outgoing?status=delivery_ack',
			method: 'GET',
			user: session?.user
		})
		const fetchRead = await fetchClient({
			url: '/broadcasts/' + broadcastId + '/outgoing?status=read',
			method: 'GET',
			user: session?.user
		})
		const fetchReply = await fetchClient({
			url: '/broadcasts/' + broadcastId + '/replies',
			method: 'GET',
			user: session?.user
		})

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
									<td className="break-all">{formatDate(broadcastData?.schedule!)}</td>
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
								<DisplayImage imageUrl={broadcastData.mediaPath} />
							</>
						)}
						<div className="flex justify-end gap-2 mt-4">
							<Button as={Link} href={'/dashboard/broadcast/edit/' + broadcastData?.id} variant="bordered" className="rounded-md">
								Edit
							</Button>
							<Button color="danger" className="rounded-md" >
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
								onSelectionChange={setcurrentPage as any}>
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