import { formatCurrencyIDR } from "@/app/utils/helper"
import { useEffect } from "react"


const BasicPlan = ({ planData, currentPrice, durationPlan, featureImage }) => {
    return (
        <div className="flex flex-col gap-2 mt-2">
            {planData.isFavorite && (
                <div className="flex">
                    <div className="bg-[#FFB020] rounded-full px-2 text-xs">
                        Most Popular
                    </div>
                </div>
            )}
            <p className="font-bold font-lexend text-2xl">{planData.title}</p>
            <p className="text-xs">{planData.body}</p>
            <div className="flex items-baseline">
                {durationPlan === 'Monthly' ? (
                    <>
                        <p className="my-2 font-bold font-lexend text-2xl">{formatCurrencyIDR(currentPrice?.monthlyPrice)}</p>
                        <p className="ml-1">/bulan</p>
                    </>
                ) : (
                    <>
                        <p className="my-2 font-bold font-lexend text-2xl">{formatCurrencyIDR(currentPrice?.yearlyPrice)}</p>
                        <p className="ml-1">/tahun</p>
                    </>
                )}
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
                {planData.features.map(feat => (
                    <div className="flex items-center gap-1">
                        <div className="flex-none">
                            <img src={featureImage[feat.type]} alt="" />
                        </div>
                        <p>{feat.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default BasicPlan