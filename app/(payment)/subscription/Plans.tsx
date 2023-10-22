import { formatCurrencyIDR } from "@/utils/helper"
import { useEffect } from "react"
interface FeatureProps {
    feature: string,
    image: string
}
interface PlansProps {
    id?: string,
    name?: string,
    monthlyPrice?: number,
    yearlyPrice?: number,
    vat?: number,
    sum?: number
}
const BasicPlan = ({ planData, durationPlan, features }: { planData: PlansProps, durationPlan: string, features: FeatureProps[] }) => {
    useEffect(() => { console.log(durationPlan) }, [])
    return (
        <div className="flex flex-col gap-2 mt-2">
            <div className="flex">
                <div className="bg-[#FFB020] rounded-full px-2 text-xs">
                    Most Popular
                </div>
            </div>
            <p className="font-bold font-lexend text-2xl">{planData?.name}</p>
            <p className="text-xs">Dapatkan akses selama 1 bulan dengan paket Basic. Manfaatkan fitur pesan otomatis, siaran pesan, dan manajemen kontak yang ditingkatkan. Rasakan kenyamanan integrasi yang luas dengan sinkronisasi kontak Google dan WhatsApp.</p>
            <div className="flex items-baseline">
                {durationPlan === 'Monthly' ? (
                    <>
                        <p className="my-2 font-bold font-lexend text-2xl">{formatCurrencyIDR(planData?.monthlyPrice!)}</p>
                        <p className="ml-1">/bulan</p>
                    </>
                ) : (
                    <>
                        <p className="my-2 font-bold font-lexend text-2xl">{formatCurrencyIDR(planData?.yearlyPrice!)}</p>
                        <p className="ml-1">/tahun</p>
                    </>
                )}
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
                {features.map(feat => (
                    <div className="flex items-center gap-1">
                        <div className="flex-none">
                            <img src={feat.image} alt="" />
                        </div>
                        <p>{feat.feature}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default BasicPlan