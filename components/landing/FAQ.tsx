import Accordion from "./utils/Accordion"
import Image from "next/image"
const FAQ = () => {
    const faqContent = [1, 2, 3, 4, 5]
    return (
        <div className='px-6 container mx-auto mb-20 mt-20'>
            <p className="text-center font-bold text-3xl font-lexend my-16">Frequently Asked Questions</p>
            <div className="max-w-lg w-full mx-auto ">
                <div className="flex gap-2">
                    <input type="text" placeholder="lorem" className="outline outline-[1px] outline-primary p-2 rounded-md flex-grow" />
                    <div className="bg-primary p-2 rounded-md flex-none flex items-center">
                        <Image
                            src={'/assets/icons/search.png'}
                            width={18}
                            height={18}
                            alt="magnify"
                        />
                    </div>
                </div>
                <div className="bg-neutral-75 h-60 mt-8 rounded-sm p-4 overflow-x-auto flex flex-col gap-4">
                    {faqContent.map(i => (
                        <Accordion title='What is Forwardin?' content='FowardIt is a powerful communication management tool that simplifies message forwarding, enhances contact management, and streamlines campaign scheduling for businesses of all sizes.' />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQ