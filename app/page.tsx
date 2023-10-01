'use client'
import Button from '../components/landing/Button'
import OneStep from '@/components/landing/OneStep'
import Subscription from '@/components/landing/Subscription'
import FAQ from '@/components/landing/FAQ'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import dynamic from "next/dynamic";
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
import { useCallback, useEffect, useRef, useState } from 'react'
interface NavigationRef {
  [key: string]: HTMLDivElement
}
export default function Home() {
  const FadeUp = batch(Fade(), Move(), Sticky());
  const [buttonActive, setButtonActive] = useState('monthly')
  const [selected, setSelected] = useState(1)
  const [currentSection, setcurrentSection] = useState('getStarted')
  const activeStyleButton = 'text-white-50 bg-primary'
  const inactiveStyleButton = 'text-primary bg-white'
  const subscriptionContent = [
    {
      title: 'Starter',
      body: 'Start your 14-day trial and experience efficient message forwarding, simplified contact management, and a glimpse of campaign scheduling. Unleash the potential of streamlined communication and explore how FowardIt can elevate your messaging game.',
      price: 'Rp. 300.000',
      buttonText: 'Start for Free',
      features: [
        { name: '10 Auto reply', available: true },
        { name: '50 Broadcast', available: true },
        { name: '5 Campaign', available: true },
        { name: '50 Contact', available: true },
        { name: '5 Device', available: true },
        { name: 'Excel / CSV Contact Import', available: true },
        { name: 'Google Contact Sync', available: false },
        { name: 'Whatsapp Contact Sync', available: false },

      ],
      cardStyle: ''
    },
    {
      title: 'Basic',
      body: 'Start your 14-day trial and experience efficient message forwarding, simplified contact management, and a glimpse of campaign scheduling. Unleash the potential of streamlined communication and explore how FowardIt can elevate your messaging game.',
      price: 'Rp. 300.000',
      buttonText: 'Get Started',
      features: [
        { name: '10 Auto reply', available: true },
        { name: '50 Broadcast', available: true },
        { name: '5 Campaign', available: true },
        { name: '50 Contact', available: true },
        { name: '5 Device', available: true },
        { name: 'Excel / CSV Contact Import', available: true },
        { name: 'Google Contact Sync', available: false },
        { name: 'Whatsapp Contact Sync', available: false },

      ],
      isFavorite: true
    },
    {
      title: 'Starter',
      body: 'Start your 14-day trial and experience efficient message forwarding, simplified contact management, and a glimpse of campaign scheduling. Unleash the potential of streamlined communication and explore how FowardIt can elevate your messaging game.',
      price: 'Rp. 300.000',
      buttonText: 'Start for Free',
      features: [
        { name: '10 Auto reply', available: true },
        { name: '50 Broadcast', available: true },
        { name: '5 Campaign', available: true },
        { name: '50 Contact', available: true },
        { name: '5 Device', available: true },
        { name: 'Excel / CSV Contact Import', available: true },
        { name: 'Google Contact Sync', available: false },
        { name: 'Whatsapp Contact Sync', available: false },

      ],
      cardStyle: ''
    },
    {
      title: 'Starter',
      body: 'Start your 14-day trial and experience efficient message forwarding, simplified contact management, and a glimpse of campaign scheduling. Unleash the potential of streamlined communication and explore how FowardIt can elevate your messaging game.',
      price: 'Rp. 300.000',
      buttonText: 'Start for Free',
      features: [
        { name: '10 Auto reply', available: true },
        { name: '50 Broadcast', available: true },
        { name: '5 Campaign', available: true },
        { name: '50 Contact', available: true },
        { name: '5 Device', available: true },
        { name: 'Excel / CSV Contact Import', available: true },
        { name: 'Google Contact Sync', available: false },
        { name: 'Whatsapp Contact Sync', available: false },

      ],
      cardStyle: ''
    },
  ]
  const animatorClass = 'w-full px-4 lg:px-0 lg:max-w-[70%]'
  const handleNavigationClick = (key: string) => {
    const gotoElement = document.getElementsByClassName(key)[0] as HTMLDivElement
    window.scrollTo({
      behavior: "smooth",
      top: gotoElement?.offsetTop,
    });


  }
  useEffect(() => {
    const section = {
      getStarted: document.getElementsByClassName('getStarted')[0] as HTMLDivElement,
      broadcast: document.getElementsByClassName('broadcast')[0] as HTMLDivElement,
      campaign: document.getElementsByClassName('campaign')[0] as HTMLDivElement,
      autoReply: document.getElementsByClassName('autoReply')[0] as HTMLDivElement,
      opportunity: document.getElementsByClassName('opportunity')[0] as HTMLDivElement,
      pricing: document.getElementsByClassName('pricing')[0] as HTMLDivElement,
      FAQ: document.getElementsByClassName('FAQ')[0] as HTMLDivElement,
      contact: document.getElementsByClassName('contact')[0] as HTMLDivElement,
    }
    document.addEventListener('scroll', () => {
      if (window.scrollY >= section.getStarted.offsetTop && window.scrollY < section.broadcast.offsetTop)
        setcurrentSection('getStarted')
      else if (window.scrollY >= section.broadcast.offsetTop && window.scrollY < section.campaign.offsetTop)
        setcurrentSection('broadcast')
      else if (window.scrollY >= section.campaign.offsetTop && window.scrollY < section.autoReply.offsetTop)
        setcurrentSection('campaign')
      else if (window.scrollY >= section.autoReply.offsetTop && window.scrollY < section.opportunity.offsetTop)
        setcurrentSection('autoReply')
      else if (window.scrollY >= section.opportunity.offsetTop && window.scrollY < section.pricing.offsetTop)
        setcurrentSection('opportunity')
      else if (window.scrollY >= section.pricing.offsetTop && window.scrollY < section.FAQ.offsetTop)
        setcurrentSection('pricing')
      else if (window.scrollY >= section.FAQ.offsetTop && window.scrollY < section.contact.offsetTop)
        setcurrentSection('FAQ')
      else if (window.scrollY >= section.contact.offsetTop)
        setcurrentSection('contact')
    })
  }, [])
  return (<>
    <Navbar />
    <main >
      <div className='hidden fixed left-8 top-1/2 -translate-y-1/2 z-10 text-sm border-l-2 border-black/40 lg:flex flex-col gap-4 pl-4 text-black/40'>
        <div onClick={() => handleNavigationClick('getStarted')} className={(currentSection === 'getStarted' ? 'text-black' : '') + ' hover:cursor-pointer'}>Get Started</div>
        <div onClick={() => handleNavigationClick('broadcast')} className={(currentSection === 'broadcast' ? 'text-black' : '') + ' hover:cursor-pointer'}>Broadcast</div>
        <div onClick={() => handleNavigationClick('campaign')} className={(currentSection === 'campaign' ? 'text-black' : '') + ' hover:cursor-pointer'}>Campaign</div>
        <div onClick={() => handleNavigationClick('autoReply')} className={(currentSection === 'autoReply' ? 'text-black' : '') + ' hover:cursor-pointer'}>Auto Reply</div>
        <div onClick={() => handleNavigationClick('opportunity')} className={(currentSection === 'opportunity' ? 'text-black' : '') + ' hover:cursor-pointer'}>Opportunity</div>
        <div onClick={() => handleNavigationClick('pricing')} className={(currentSection === 'pricing' ? 'text-black' : '') + ' hover:cursor-pointer'}>Pricing</div>
        <div onClick={() => handleNavigationClick('FAQ')} className={(currentSection === 'FAQ' ? 'text-black' : '') + ' hover:cursor-pointer'}>FAQ</div>
        <div onClick={() => handleNavigationClick('contact')} className={(currentSection === 'contact' ? 'text-black' : '') + ' hover:cursor-pointer'}>Contact Us</div>
      </div>
      <ScrollContainer className='relative' snap='mandatory'>
        <ScrollPage style={{
          backgroundImage: 'url(/assets/images/bg_image1.png)'
        }} className='bg-no-repeat bg-cover getStarted'>
          <Animator animation={FadeUp} className={animatorClass}>
            <div className='flex flex-col lg:flex-row-reverse justify-center lg:justify-between items-center gap-8 w-full'>
              <div className='flex-none lg:basis-1/2 flex justify-end'>
                <img
                  src='/assets/images/dummy2.png'
                  width={558}
                  height={351}
                  alt='dummy'
                  className='flex-none'
                />
              </div>
              <div className='flex flex-col gap-8'>
                <p className='font-lexend font-bold text-4xl'>Elevate Your Messaging Efficiency with Our Innovative Admin Tools</p>
                <p>Selamat datang di Fowardit! Pengelolaan pesan Anda menjadi lebih mudah dengan Admin Tools kami. Penerusan pesan jadi lebih lancar melalui fitur otomatis, sehingga Anda dapat lebih fokus pada interaksi dengan pelanggan. Dapatkan kendali penuh atas pesan dan informasi dengan manajemen konten dan kontak yang praktis.</p>
                <div className='flex gap-4 w-full lg:justify-start'>
                  <Button text='Daftar Sekarang' href='/' styles='basis-3/5 lg:basis-0' />
                </div>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        {/* <ScrollPage >
          <Animator animation={FadeUp} className={animatorClass}>

          </Animator>
        </ScrollPage> */}
        <ScrollPage style={{

        }} className='bg-no-repeat bg-cover broadcast'>
          <Animator animation={FadeUp} className={animatorClass}>
            <div className='flex flex-col lg:flex-row-reverse justify-center lg:justify-between items-center gap-8 w-full'>
              <div className='flex flex-col gap-8 lg:w-2/5 mx-auto'>
                <p className='font-lexend font-bold text-4xl'>Reach Further with Ease</p>
                <p>Fowardin memberikan Anda akses cepat untuk memperluas jangkauan komunikasi Anda. Dengan fitur Broadcast kami, Anda dapat mengirim pesan kepada banyak kontak dan grup sekaligus. Menjangkau audiens Anda tidak pernah semudah ini.</p>
              </div>
              <div className='flex-none lg:basis-1/2 flex justify-end'>
                <img
                  src='/assets/images/dummy3.png'
                  width={468}
                  height={378}
                  alt='dummy'
                  className='flex-none'
                />
              </div>
            </div>
          </Animator>
        </ScrollPage>
        {/* <ScrollPage>
          <Animator animation={FadeUp} className={animatorClass}>

          </Animator>
        </ScrollPage> */}
        <ScrollPage style={{
        }} className='bg-no-repeat bg-cover campaign'>
          <Animator animation={FadeUp} className={animatorClass}>
            <div className='flex flex-col lg:flex-row-reverse justify-center lg:justify-between items-center gap-8 w-full'>
              <div className='flex-none lg:basis-1/2 flex justify-end'>
                <img
                  src='/assets/images/landing_image4.png'
                  width={500}
                  height={283}
                  alt='dummy'
                  className='flex-none'
                />
              </div>
              <div className='flex flex-col gap-8'>
                <p className='font-lexend font-bold text-4xl'>Right Time, Effective Messages</p>
                <p>Fowardin memungkinkan Anda untuk merencanakan pengiriman iklan yang tepat sasaran. Manfaatkan fitur Campaign kami untuk mengoptimalkan pesan iklan Anda sehingga hasilnya lebih akurat dan sukses. Dengan Fowardin, setiap pesan iklan memiliki dampak yang lebih besar.</p>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        {/* <ScrollPage>
          <Animator animation={FadeUp} className={animatorClass}>

          </Animator>
        </ScrollPage> */}
        <ScrollPage style={{

        }} className='bg-no-repeat bg-cover autoReply'>
          <Animator animation={FadeUp} className={animatorClass}>
            <div className='flex flex-col lg:flex-row-reverse justify-center lg:justify-between items-center gap-8 w-full'>
              <div className='flex flex-col gap-8 lg:w-2/5 mx-auto'>
                <p className='font-lexend font-bold text-4xl'>Respond Faster with the Convenience of Auto Reply</p>
                <p>Fowardin mempermudah Anda untuk memberikan respon cepat kepada pesan dari banyak kontak dan grup sekaligus. Dengan fitur Auto Reply kami, Anda dapat menjawab pertanyaan atau memberikan respon otomatis, menghemat waktu dan energi Anda. Tanggap lebih cepat dengan Fowardin.</p>
              </div>
              <div className='flex-none lg:basis-1/2 flex justify-end'>
                <img
                  src='/assets/images/landing_image5.png'
                  width={550}
                  height={250}
                  alt='dummy'
                  className='flex-none'
                />
              </div>
            </div>
          </Animator>
        </ScrollPage>
        {/* <ScrollPage>
          <Animator animation={FadeUp} className={animatorClass}>

          </Animator>
        </ScrollPage> */}
        <ScrollPage style={{
        }} className='bg-no-repeat bg-cover opportunity'>
          <Animator animation={FadeUp} className={animatorClass}>
            <OneStep />
          </Animator>
        </ScrollPage>
        {/* <ScrollPage>
          <Animator animation={FadeUp} className={animatorClass}>

          </Animator>
        </ScrollPage> */}

        <ScrollPage style={{
        }} className='bg-no-repeat bg-cover'>
          <Animator animation={FadeUp} className='w-full'>
            <div className='px-6 container mx-auto'>
              <p className='text-center text-xl'>Our Pricing</p>
              <p className='text-center text-4xl font-bold mt-2'>Subscription</p>
            </div>
            <div className="flex justify-center my-8 text-sm">
              <div className="flex bg-white p-2 rounded-full gap-2">
                <div className={(buttonActive === 'monthly' ? activeStyleButton : inactiveStyleButton) + " px-6 py-2 rounded-full hover:cursor-pointer"} onClick={() => setButtonActive('monthly')}>Monthly</div>
                <div className={(buttonActive === 'yearly' ? activeStyleButton : inactiveStyleButton) + " px-6 py-2 rounded-full hover:cursor-pointer"} onClick={() => setButtonActive('yearly')}>Yearly</div>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        {/* <ScrollPage>
          <Animator animation={FadeUp} className={animatorClass}>

          </Animator>
        </ScrollPage> */}
        <ScrollPage style={{
        }} className='bg-no-repeat bg-cover pricing'>
          <Animator animation={FadeUp} className='w-full lg:pl-32'>
            <div className="flex overflow-x-scroll gap-4 lg:gap-12 flex-nowrap px-2 lg:justify-start text-xs mx-auto pb-2">
              {/* card */}
              {subscriptionContent.map((data, i) => (
                <div className={"relative max-w-[280px] flex-none "} key={i}>
                  <div className={(selected === i && 'bg-white shadow-xl') + ' px-8 pt-16 pb-8 rounded-xl '} onMouseEnter={() => setSelected(i)}>
                    {data.isFavorite && (
                      <div className="absolute top-6 w-full flex">
                        <div className="bg-[#FFB020] rounded-lg px-2 py-[2px] font-semibold">
                          Most Popular
                        </div>
                      </div>
                    )}
                    <p className="text-2xl font-lexend">{data.title}</p>
                    <p className="mt-4">{data.body}</p>
                    <div className="flex items-baseline">
                      <p className="mt-8 mb-4 font-bold font-lexend text-2xl">{data.price}</p>
                      <p className="ml-1">/bulan</p>
                    </div>
                    <a href="/" className={(data.isFavorite ? 'bg-[#FFB020] border-[#FFB020]' : 'bg-primary border-primary') + ' border rounded-full px-6 py-2 text-center whitespace-nowrap text-white w-full block'}>
                      {data.buttonText}
                    </a>
                  </div>
                  <div className="mt-10 flex flex-col gap-4 px-8">
                    {data.features.map((feature, j) => (
                      <div className="flex gap-2" key={i + '' + j}>

                        {feature.available ? (
                          <img src={'assets/icons/checklist.svg'}
                            width={20}
                            height={20}
                            alt="checklist" />
                        ) : (
                          <img src={'assets/icons/no sign.svg'}
                            width={20}
                            height={20}
                            alt="checklist" />)}

                        <p>{feature.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </Animator>
        </ScrollPage>
        {/* <ScrollPage>
          <Animator animation={FadeUp} className={animatorClass}>

          </Animator>
        </ScrollPage> */}
        <ScrollPage className='FAQ'>
          <Animator animation={FadeUp} className={animatorClass}>
            <FAQ />
          </Animator>
        </ScrollPage>
        {/* <ScrollPage >
          <Animator animation={FadeUp} className={animatorClass}>

          </Animator>
        </ScrollPage> */}
        <ScrollPage style={{
        }} className='bg-no-repeat bg-cover bg-primary contact'>
          <Animator animation={FadeUp} className={animatorClass}>
            <Footer />
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </main >

  </>
  )
}
