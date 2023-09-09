import { useState, useEffect } from "react"
import Image from "next/image"

const Subscription = () => {
    const [buttonActive, setButtonActive] = useState('monthly')
    const [selected, setSelected] = useState(1)
    // const [alignment, setAlignment] = useState('web');
    const activeStyleButton = 'text-white-50 bg-primary'
    const inactiveStyleButton = 'text-primary bg-white'
    const subscriptionContent = [
        {
            title: 'Starter',
            body: 'Start your 14-day trial and experience efficient message forwarding, simplified contact management, and a glimpse of campaign scheduling. Unleash the potential of streamlined communication and explore how FowardIt can elevate your messaging game.',
            price: 'Rp. 300.000',
            buttonText: 'Start for Free',
            features: [
                '10 Auto Reply',
                '5 Broadcast',
                '50 Contact',
                '5 Device',
            ],
            cardStyle: ''
        },
        {
            title: 'Basic',
            body: 'Start your 14-day trial and experience efficient message forwarding, simplified contact management, and a glimpse of campaign scheduling. Unleash the potential of streamlined communication and explore how FowardIt can elevate your messaging game.',
            price: 'Rp. 300.000',
            buttonText: 'Get Started',
            features: [
                '10 Auto Reply',
                '5 Broadcast',
                '50 Contact',
                '5 Device',
            ],
            isFavorite: true
        },
        {
            title: 'Starter',
            body: 'Start your 14-day trial and experience efficient message forwarding, simplified contact management, and a glimpse of campaign scheduling. Unleash the potential of streamlined communication and explore how FowardIt can elevate your messaging game.',
            price: 'Rp. 300.000',
            buttonText: 'Start for Free',
            features: [
                '10 Auto Reply',
                '5 Broadcast',
                '50 Contact',
                '5 Device',
            ],
            cardStyle: ''
        },
        {
            title: 'Starter',
            body: 'Start your 14-day trial and experience efficient message forwarding, simplified contact management, and a glimpse of campaign scheduling. Unleash the potential of streamlined communication and explore how FowardIt can elevate your messaging game.',
            price: 'Rp. 300.000',
            buttonText: 'Start for Free',
            features: [
                '10 Auto Reply',
                '5 Broadcast',
                '50 Contact',
                '5 Device',
            ],
            cardStyle: ''
        },
    ]
    // const handleChange = (
    //     event: React.MouseEvent<HTMLElement>,
    //     newAlignment: string,
    // ) => {
    //     setAlignment(newAlignment);
    // };
    // const buttonStyle: any = {
    //     padding: '8px 24px',
    //     borderRadius: '9999px',
    //     border: 'none',
    //     // "&.Mui-selected, &.Mui-selected:hover": {
    //     //     color: "white",
    //     //     backgroundColor: '#3366FF !important'
    //     // },
    //     // '&:active': {
    //     //     backgroundColor: '#3366FF !important'
    //     // },
    //     basis: '50%',
    //     textTransform: 'none'
    // }


    return (
        <div className='bg-neutral-75 my-20 py-20'>
            <div className='px-6 container mx-auto'>
                <p className='text-center text-xl'>Our Pricing</p>
                <p className='text-center text-4xl font-bold mt-2'>Subscription</p>
            </div>
            <div className="flex justify-center my-12">
                <div className="flex bg-white p-2 rounded-full gap-2">
                    <div className={(buttonActive === 'monthly' ? activeStyleButton : inactiveStyleButton) + " px-6 py-2 rounded-full hover:cursor-pointer"} onClick={() => setButtonActive('monthly')}>Monthly</div>
                    <div className={(buttonActive === 'yearly' ? activeStyleButton : inactiveStyleButton) + " px-6 py-2 rounded-full hover:cursor-pointer"} onClick={() => setButtonActive('yearly')}>Yearly</div>
                </div>
            </div>
            <div className="flex overflow-x-hidden gap-12 flex-wrap px-2 justify-normal md:justify-center pb-12">
                {/* card */}
                {subscriptionContent.map((data, i) => (
                    <div className={"relative  max-w-sm flex-none "} key={i}>
                        <div className={(selected === i && 'bg-white shadow-xl') + ' px-8 py-16 rounded-xl '} onMouseEnter={() => setSelected(i)}>
                            {data.isFavorite && (
                                <div className="absolute top-6 w-full flex">
                                    <div className="bg-[#FFB020] rounded-lg px-2 font-semibold">
                                        Most Popular
                                    </div>
                                </div>
                            )}
                            <p className="text-2xl font-lexend">{data.title}</p>
                            <p className="mt-4">{data.body}</p>
                            <div className="flex items-baseline">
                                <p className="mt-12 mb-4 font-bold font-lexend text-3xl">{data.price}</p>
                                <p className="ml-1">/bulan</p>
                            </div>
                            <a href="/" className={(data.isFavorite ? 'bg-[#FFB020] border-[#FFB020]' : 'bg-primary border-primary') + ' border rounded-full px-6 py-2 text-center whitespace-nowrap text-white w-full block'}>
                                {data.buttonText}
                            </a>
                        </div>
                        <div className="mt-10 flex flex-col gap-4 px-8">
                            {data.features.map((feature, j) => (
                                <div className="flex gap-2" key={i + '' + j}>
                                    <Image src={'assets/icons/checklist.svg'}
                                        width={20}
                                        height={20}
                                        alt="checklist" />
                                    <p>{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div >
    )
}

export default Subscription