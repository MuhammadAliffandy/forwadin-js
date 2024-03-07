'use client'
import OneStep from '@/components/landing/OneStep'
import FAQ from '@/components/landing/FAQ'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Animator, ScrollContainer, ScrollPage, batch, Fade, Move, StickyOut, Sticky } from "react-scroll-motion";
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { fetchClient } from '@/utils/helper/fetchClient'
import Pricing from '@/components/dashboard/Pricing'

export default function Home() {
  // const FadeUp = Sticky()
  const FadeUp = batch(Move(), Fade())
  const [currentSection, setcurrentSection] = useState('getStarted')
  // merchant_id=G265815203&order_id=ORDER-1698215438034-f9gd9a&status_code=200&transaction_status=settlement
  const titleTextStyle = "font-lexend font-bold text-2xl xl:text-4xl"
  const contentTextStyle = "lg:text-sm text-xs"

  const animatorClass = 'w-full px-4 lg:px-0 lg:max-w-[70%] mx-auto h-full flex flex-col items-center justify-center'
  const handleNavigationClick = (key) => {
    const gotoElement = document.getElementsByClassName(key)[0] 
    window.scrollTo({
      behavior: "smooth",
      top: gotoElement?.offsetTop,
    });
  }

  useEffect(() => {
    const section = {
      getStarted: document.getElementsByClassName('getStarted')[0] ,
      broadcast: document.getElementsByClassName('broadcast')[0] ,
      campaign: document.getElementsByClassName('campaign')[0] ,
      autoReply: document.getElementsByClassName('autoReply')[0] ,
      opportunity: document.getElementsByClassName('opportunity')[0] ,
      pricing: document.getElementsByClassName('pricing')[0] ,
      FAQ: document.getElementsByClassName('FAQ')[0] ,
      contact: document.getElementsByClassName('contact')[0] ,
    }
    const sideNav = document.getElementById('sideNav') 
    const scrollHandler = () => {
      if (window.scrollY >= section.getStarted.offsetTop && window.scrollY < section.broadcast.offsetTop)
        setcurrentSection('getStarted')
      else if (window.scrollY >= section.broadcast.offsetTop && window.scrollY < section.campaign.offsetTop)
        setcurrentSection('broadcast')
      else if (window.scrollY >= section.campaign.offsetTop && window.scrollY < section.autoReply.offsetTop) {
        setcurrentSection('campaign')
      }
      else if (window.scrollY >= section.autoReply.offsetTop && window.scrollY < section.opportunity.offsetTop) {
        setcurrentSection('autoReply')
      }
      else if (window.scrollY >= section.opportunity.offsetTop && window.scrollY < section.pricing.offsetTop) {
        setcurrentSection('opportunity')
      }
      else if (window.scrollY >= section.pricing.offsetTop && window.scrollY < section.FAQ.offsetTop) {
        setcurrentSection('pricing')

        sideNav.classList.add('border-l-2')
        sideNav.classList.remove('text-white')
      }
      else if (window.scrollY >= section.FAQ.offsetTop && window.scrollY < section.contact.offsetTop - 10) {
        setcurrentSection('FAQ')
        sideNav.classList.remove('border-l-2')
        sideNav.classList.add('text-white')
      }
      else
        setcurrentSection('contact')
      // else if (window.scrollY >= section.contact.offsetTop)
    }

    document.addEventListener('scroll', scrollHandler)

    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])
  return (<>
    <main className='text-xs lg:text-sm'>
      <Navbar />
      <div id='sideNav' className='hidden fixed left-8 top-1/2 -translate-y-1/2 z-10 text-sm border-l-2 border-black/40 lg:flex flex-col gap-4 pl-4 text-black/40 pr-2 py-2'>
        <div id='nav_getStarted' onClick={() => handleNavigationClick('getStarted')} className={(currentSection === 'getStarted' ? 'text-black' : '') + ' hover:cursor-pointer'}>Get Started</div>
        <div id='nav_broadcast' onClick={() => handleNavigationClick('broadcast')} className={(currentSection === 'broadcast' ? 'text-black' : '') + ' hover:cursor-pointer'}>Broadcast</div>
        <div id='nav_campaign' onClick={() => handleNavigationClick('campaign')} className={(currentSection === 'campaign' ? 'text-black' : '') + ' hover:cursor-pointer'}>Campaign</div>
        <div id='nav_autoReply' onClick={() => handleNavigationClick('autoReply')} className={(currentSection === 'autoReply' ? 'text-black' : '') + ' hover:cursor-pointer'}>Auto Reply</div>
        <div id='nav_opportunity' onClick={() => handleNavigationClick('opportunity')} className={(currentSection === 'opportunity' ? 'text-black' : '') + ' hover:cursor-pointer'}>Opportunity</div>
        <div id='nav_pricing' onClick={() => handleNavigationClick('pricing')} className={(currentSection === 'pricing' ? 'text-black' : '') + ' hover:cursor-pointer'}>Pricing</div>
        <div id='nav_FAQ' onClick={() => handleNavigationClick('FAQ')} className={(currentSection === 'FAQ' ? 'text-black' : '') + ' hover:cursor-pointer'}>FAQ</div>
        <div id='nav_contact' onClick={() => handleNavigationClick('contact')} className={(currentSection === 'contact' ? 'text-black' : '') + ' hover:cursor-pointer'}>Contact Us</div>
      </div>
      <ScrollContainer className='relative' snap='mandatory'>
        <ScrollPage style={{
          backgroundImage: 'url(/assets/images/bg1.png)',
        }} className='bg-no-repeat bg-cover getStarted bg-[#ECF2FA] '>
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
                <p className={titleTextStyle}>Elevate Your Messaging Efficiency with Our Innovative Admin Tools</p>
                <p className={contentTextStyle}>Selamat datang di Fowardin! Pengelolaan pesan Anda menjadi lebih mudah dengan Admin Tools kami. Penerusan pesan jadi lebih lancar melalui fitur otomatis, sehingga Anda dapat lebih fokus pada interaksi dengan pelanggan. Dapatkan kendali penuh atas pesan dan informasi dengan manajemen konten dan kontak yang praktis.</p>
                <div className='flex w-full '>
                  <Link href={'/signup'} className='flex justify-between items-center bg-black rounded-md text-white px-2 hover:cursor-pointer'>
                    <p className='px-4 py-2'>Daftar Sekarang</p>
                    <div className='flex-none border-l px-2 border-white h-full flex items-center'>
                      <img src="/assets/icons/arrow.svg" alt="" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage style={{
          backgroundImage: 'url(/assets/images/bg2.png)'
        }} className='bg-[#ECF2FA] bg-no-repeat bg-cover -z-10 broadcast'>
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
        <ScrollPage style={{
        }} className='bg-no-repeat bg-cover opportunity'>
          <Animator animation={FadeUp} className={animatorClass}>
            <OneStep />
          </Animator>
        </ScrollPage>
        <ScrollPage style={{
        }} className='bg-no-repeat bg-cover pricing'>
          <Animator animation={FadeUp} className='w-full'>
            <Pricing />
          </Animator>
        </ScrollPage>
        <ScrollPage style={{
          backgroundImage: 'url(/assets/images/bg3.png)'
        }} className='bg-no-repeat bg-cover bg-primary FAQ'>
          <Animator animation={FadeUp} className={animatorClass}>
            <FAQ />
          </Animator>
        </ScrollPage>
        <ScrollPage style={{
          backgroundImage: 'url(/assets/images/bg4.png)'
        }} className='bg-no-repeat bg-cover bg-primary -z-10 contact'>
          <Animator animation={FadeUp} className={animatorClass}>
            <Footer />
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </main >
  </>
  )
}
