'use client'
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { Button, Card, CardBody, Checkbox, Skeleton, select } from "@nextui-org/react"
import { Tabs, Tab } from "@nextui-org/tabs"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import BasicPlan from "./Plans"
import { formatCurrencyIDR } from "@/app/utils/helper"
import { createPayment, getPaymentSubscription } from "../../../api/repository/paymentRepository"


const Payment = () => {
	const { data: session } = useSession()
	const [isLoaded, setisLoaded] = useState(false)
	const [isLoading, setisLoading] = useState(false)
	const [durationPlan, setdurationPlan] = useState('Monthly')
	const [plans, setplans] = useState([])
	const [selectedPlan, setselectedPlan] = useState('')
	const [currentPlan, setcurrentPlan] = useState()
	const [isChecked, setisChecked] = useState(false)
	const subscriptionContent = {
		'basic': {
			title: 'Basic',
			body: 'Dapatkan akses selama 1 bulan dengan paket Basic. Manfaatkan fitur pesan otomatis, siaran pesan, dan manajemen kontak yang ditingkatkan. Rasakan kenyamanan integrasi yang luas dengan sinkronisasi kontak Google dan WhatsApp.',
			features: [
				{ name: '4500 Auto reply', type: 'autoReply' },
				{ name: '2500 Broadcast', type: 'broadcast' },
				{ name: '1000 Contact', type: 'contact' },
				{ name: 'Integrasi API', type: 'api' },
				{ name: '15 Device', type: 'device' },
				{ name: 'Excel / CSV Contact Import', type: 'import' },
				{ name: 'Google Contact Sync', type: 'sync' },
			],
			isFavorite: true
		},
		'premium': {
			title: 'Premium',
			body: 'Perpanjang pengalaman Anda dengan paket Premium selama 1 bulan. Nikmati manfaat pesan otomatis, siaran pesan, dan manajemen kontak tanpa batasan. Aktifkan integrasi yang luas dengan sinkronisasi kontak Google dan WhatsApp.',
			features: [
				{ name: '9500 Auto reply', type: 'autoReply' },
				{ name: '5500 Broadcast', type: 'broadcast' },
				{ name: '5000 Contact', type: 'contact' },
				{ name: 'Integrasi API', type: 'api' },
				{ name: '50 Device', type: 'device' },
				{ name: 'Excel / CSV Contact Import', type: 'import' },
				{ name: 'Google Contact Sync', type: 'sync' },
				// { name: 'Whatsapp Contact Sync', type: true },
			],
		},
		'pro': {
			title: 'Pro',
			body: 'Jelajahi seluruh fitur dengan paket Pro selama 1 bulan. Dapatkan keuntungan dari pesan otomatis, siaran pesan, serta manajemen kontak yang tidak terbatas. Aktifkan integrasi yang luas dengan sinkronisasi kontak Google dan WhatsApp.',
			features: [
				{ name: '20000 Auto reply', type: 'autoReply' },
				{ name: '14500 Broadcast', type: 'broadcast' },
				{ name: '15000 Contact', type: 'contact' },
				{ name: 'Integrasi API', type: 'api' },
				{ name: '100 Device', type: 'device' },
				{ name: 'Excel / CSV Contact Import', type: 'import' },
				{ name: 'Google Contact Sync', type: 'sync' },
				// { name: 'Whatsapp Contact Sync', type: true },
			],
		},
	}
	const featureImage = {
		autoReply: '/assets/icons/subscription/time_auto.svg',
		broadcast: '/assets/icons/subscription/cast.svg',
		campaign: '/assets/icons/subscription/data_exploration.svg',
		contact: '/assets/icons/subscription/contacts.svg',
		device: '/assets/icons/subscription/ad_units.svg',
		import: '/assets/icons/subscription/article.svg',
		sync: '/assets/icons/subscription/sync_saved_locally.svg',
		api: '/assets/icons/subscription/api.svg',
	}
	const fetchSubscriptionPlans = async () => {

		const result = await getPaymentSubscription(session.user.token)
		if (result) {
			const resultData = await result.json()
			if (result.ok) {
				console.log(resultData)
				setplans(resultData.filter(item => item.name.toLowerCase() !== 'starter').map(item => {
					item.monthlyPrice = parseInt(item.monthlyPrice )
					item.yearlyPrice = parseInt(item.yearlyPrice )
					return item
				}))
				setselectedPlan('basic')
				setisLoaded(true)
			} else {
				toast.error('failed to fetch data')
				console.log(resultData)
			}
		}

	}
	const handleClick = async () => {
		setisLoading(true)

		const result = await createPayment(session.user.token, {
			subscriptionPlanId: currentPlan?.id,
			subscriptionPlanType: durationPlan.toLowerCase()
		})

		if (result) {
			const resultData = await result.json()
			if (result.ok) {
				console.log(resultData)
				window.location.assign(resultData.redirect_url)
			} else {
				toast.error('failed to pay')
				console.log(resultData)
				setisLoading(false)
			}
		}
	}
	useEffect(() => {
		if (!isLoaded)
			fetchSubscriptionPlans()

	}, [session?.user?.token])
	useEffect(() => {
		const find = plans.find(item => item.name.toLowerCase() === selectedPlan.toLowerCase())
		if (find) {
			const currentDurationPlan = (durationPlan === 'Monthly' ? find.monthlyPrice : find.yearlyPrice)
			const vat = (currentDurationPlan * 2.9 / 100) + 2000
			setcurrentPlan(prev => {
				return {
					...find,
					vat: vat,
					sum: currentDurationPlan + vat
				}
			})
		}

	}, [selectedPlan, durationPlan])

	return (
		<div className='lg:h-[100vh] flex lg:flex-row flex-col'>
			<div className="bg-[#ECF2FA] w-full p-8 flex flex-col">
				<div className="flex justify-between">
					<div className="flex gap-2 items-center">
						<div className="flex-none">
							<img src="/assets/icons/logo_black.svg" alt="" />
						</div>
						<div className="flex-none">
							<img src="/assets/icons/forwardin_black.svg" alt="" />
						</div>
					</div>
					<Link href={'/dashboard'} className="flex gap-2 items-center ">
						<div className="flex-none">
							<img src="/assets/icons/chevron_left.svg" alt="" />
						</div>
						<p className="text-primary text-sm">Kembali ke dashboard</p>
					</Link>
				</div>
				<div className="h-full w-full flex justify-center items-center py-12 lg:py-0">
					<Card className="rounded-md max-w-xl w-full">
						<CardBody className="overflow-hidden font-inter">

							<div className="flex justify-between mb-unit-2">
								<div className="font-bold text-2xl font-lexend">Plan Subscription</div>
								<div>
									<Skeleton isLoaded={isLoaded}>
										<Tabs
											items={[
												{
													id: '1',
													text: 'Monthly'
												},
												{
													id: '2',
													text: 'Yearly'
												},
											]}
											color="primary"
											variant="light"
											selectedKey={durationPlan}
											onSelectionChange={setdurationPlan} size="sm" radius="full"
										>

											{(item) => (
												<Tab key={item.text} title={item.text} />
											)}
										</Tabs>
									</Skeleton >
								</div>
							</div>
							<Skeleton isLoaded={isLoaded}>
								<Tabs
									color="primary"
									variant="underlined"
									fullWidth={true}
									selectedKey={selectedPlan}
									onSelectionChange={setselectedPlan}
								>
									<Tab key={plans[0]?.name} title={plans[0]?.name} className="">
										<BasicPlan planData={subscriptionContent['basic']}
											currentPrice={plans[0]}
											durationPlan={durationPlan} featureImage={featureImage} />
									</Tab>
									<Tab key={plans[1]?.name} title={plans[1]?.name} className="">
										<BasicPlan planData={subscriptionContent['premium']}
											currentPrice={plans[1]}
											durationPlan={durationPlan} featureImage={featureImage} />
									</Tab>
									<Tab key={plans[2]?.name} title={plans[2]?.name} className="">
										<BasicPlan planData={subscriptionContent['pro']}
											currentPrice={plans[2]}
											durationPlan={durationPlan} featureImage={featureImage} />
									</Tab>

								</Tabs>
							</Skeleton>
						</CardBody>
					</Card>
				</div>
			</div>
			<div className="bg-white w-full max-w-md py-20 px-4 mx-auto">
				<div className="flex flex-col justify-between h-full w-full max-w-xs mx-auto">
					<div>
						<p className="font-lexend font-bold text-2xl">Ringkasan Pembayaran</p>

						<table className="text-sm w-full mt-16">
							<tbody >
								<tr>
									<th className='font-normal'>Nama Paket</th>
									<td className="flex justify-end font-bold">
										{currentPlan?.name}
									</td>
								</tr>
								<tr>
									<th className='font-normal'>Harga Paket</th>

									<td className="flex justify-end font-bold">{formatCurrencyIDR(durationPlan === 'Monthly' ? currentPlan?.monthlyPrice : currentPlan?.yearlyPrice)}</td>
								</tr>
								<tr>
									<th className='font-normal'>VAT (2.9% + Rp 2.000)</th>
									<td className="flex justify-end font-bold">{formatCurrencyIDR(currentPlan?.vat)}</td>
								</tr>
							</tbody>

						</table>
						<div className="flex justify-between mt-12 items-baseline">
							<div className="">
								Total:
							</div>
							<div className="text-2xl font-bold flex justify-end w-full">
								{formatCurrencyIDR(currentPlan?.sum)}
							</div>
						</div>
					</div>
					<div className="text-sm">
						<div className="flex gap-2 items-center mb-2">
							<Checkbox className="text-xs" isSelected={isChecked} onValueChange={setisChecked} />
							<p className=" text-xs">
								I acknowledge that i agree to the Terms of Use and have read the
								<a href="https://www.privacypolicyonline.com/live.php?token=JJFOaCo3fAWgt4f6MNBkHtXo6v1RasCs" target="_blank" className="text-primary">
									&nbsp;Privacy Policy
								</a>
							</p>
						</div>
						<Button onClick={handleClick} isLoading={isLoading} color="primary" className="disabled:bg-opacity-50 rounded-md w-full text-center py-3 text-white" disabled={!isChecked}>
							Konfirmasi Pembayaran
						</Button>
					</div>
				</div>

			</div>
		</div>
	)
}


export default Payment