import { Accordion, AccordionItem } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

const FAQ = () => {
    const [searchedText, setsearchedText] = useState('')
    const [faqContent, setfaqContent] = useState([
        {
            title: "Apa itu Forwardin?",
            content: "Fowardin is a powerful communication management tool that simplifies message forwarding, enhances contact management, and streamlines campaign scheduling for businesses of all sizes."
        },
        {
            title: "Apakah Forwardin cocok untuk saya?",
            content: "Fowardin is a powerful communication management tool that simplifies message forwarding, enhances contact management, and streamlines campaign scheduling for businesses of all sizes."
        },
        {
            title: "Apakah Forwardin perlu di-install ke komputer?",
            content: "Fowardin is a powerful communication management tool that simplifies message forwarding, enhances contact management, and streamlines campaign scheduling for businesses of all sizes."
        },
    ])
    const [searchedFaq, setsearchedFaq] = useState([])
    const inputRef = useRef(null)
    const filterFaq = (text) => {
        const regex = new RegExp(text, 'i')
        return faqContent.filter(faq => regex.test(faq.title))
    }
    useEffect(() => {
        const searchedResult = filterFaq(searchedText)
        setsearchedFaq(searchedResult)
    }, [searchedText])
    return (
        <div className='px-6 container mx-auto mb-20 mt-20'>
            <p className="text-center text-white font-bold text-3xl font-lexend my-16">Frequently Asked Questions</p>
            <div className="max-w-lg w-full mx-auto ">
                <div className="flex gap-2">
                    <input ref={inputRef} type="text" placeholder="Cari FAQ" className="p-2 rounded-md flex-grow" value={searchedText} onChange={e => setsearchedText(e.target.value)} />
                    <div className="p-2 rounded-md hover:cursor-pointer flex-none flex items-center" onClick={() => inputRef.current?.focus()}>
                        <img
                            src={'/assets/icons/search.png'}
                            width={18}
                            height={18}
                            alt="magnify"
                        />
                    </div>
                </div>
                <div className="h-60 mt-8 overflow-x-auto">
                    {searchedText ? (
                        <Accordion selectionMode="multiple" variant="splitted" className="" itemClasses={{
                            title: "text-black text-[16px] font-bold font-inter",
                            content: 'text-xs text-black'
                        }} >
                            {searchedFaq.map((item, idx) => (
                                <AccordionItem key={idx} aria-label={item.title} title={item.title} className="bg-white" >
                                    {item.content}
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ) : (
                        <Accordion selectionMode="multiple" variant="splitted" className="" itemClasses={{
                            title: "text-black text-[16px] font-bold font-inter",
                            content: 'text-xs text-black'
                        }} >
                            {faqContent.map((item, idx) => (
                                <AccordionItem key={idx} aria-label={item.title} title={item.title} className="bg-white" >
                                    {item.content}
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default FAQ