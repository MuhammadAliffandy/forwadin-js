'use client'
import Button from '../components/landing/Button'
import OneStep from '@/components/landing/OneStep'
import Subscription from '@/components/landing/Subscription'
import FAQ from '@/components/landing/FAQ'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default function Home() {
  return (<>
    <Navbar />
    <main className=''>
      <div className='bg-neutral-75'>
        <div className='container lg:w-[85%] mx-auto flex flex-col lg:flex-row-reverse justify-center lg:justify-between items-center gap-28 pt-20 pb-20 px-6'>
          <div className='flex-none lg:basis-2/5 flex justify-end'>
            <img
              src='/assets/images/dummy.png'
              width={441}
              height={272}
              alt='dummy'
              className='flex-none'
            />
            {/* <Image
              src='/assets/images/dummy.png'
              width={441}
              height={272}
              alt='dummy'
              className='flex-none'
            /> */}
          </div>
          <div className='flex flex-col gap-8'>
            <p className=' font-bold text-2xl'>Elevate Your Messaging Efficiency with Our Innovative Admin Tools</p>
            <p>Selamat datang di Fowardit! Pengelolaan pesan Anda menjadi lebih mudah dengan Admin Tools kami. Penerusan pesan jadi lebih lancar melalui fitur otomatis, sehingga Anda dapat lebih fokus pada interaksi dengan pelanggan. Dapatkan kendali penuh atas pesan dan informasi dengan manajemen konten dan kontak yang praktis.</p>
            <div className='flex gap-4 w-full lg:justify-start'>
              <Button text='Demo' href='/' isPrimary={false} styles='px-10 basis-2/5 lg:basis-0' />
              <Button text='Daftar Sekarang' href='/' styles='basis-3/5 lg:basis-0' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-28 mt-44 px-6'>
        <div className='flex-none lg:basis-1/2 flex justify-center'>
          <img
            src='/assets/images/landing_image1.png'
            width={226}
            height={187}
            alt='dummy'
          />
          {/* <Image
            src='/assets/images/landing_image1.png'
            width={226}
            height={187}
            alt='dummy'
          /> */}
        </div>
        <div className='lg:basis-1/2 '>
          <div className='flex flex-col gap-8 lg:w-[75%]'>
            <p className=' font-bold text-2xl'>Reach Further with Ease!</p>
            <p>Dengan Fowardin, Anda dapat dengan mudah menyampaikan pesan kepada banyak kontak sekaligus melalui fitur Broadcast. Hemat waktu dan tenaga dengan mengirim pesan secara massal, memperluas jangkauan komunikasi Anda tanpa repot.</p>
          </div>
        </div>
      </div>
      <div className='bg-neutral-75 mt-20 py-20'>
        <div className='px-6 container mx-auto flex flex-col lg:flex-row-reverse justify-center items-center gap-28 lg:gap-0'>
          <div className='flex-none flex justify-center basis-1/2 '>
            <img
              src='/assets/images/landing_image2.png'
              width={157}
              height={207}
              alt='dummy'
            />
            {/* <Image
              src='/assets/images/landing_image2.png'
              width={157}
              height={207}
              alt='dummy'
            /> */}
          </div>
          <div className='flex lg:justify-end basis-1/2 '>
            <div className='flex flex-col gap-8 lg:w-[70%]'>
              <p className=' font-bold text-2xl'>Right Time, Effective Messages!</p>
              <p>Manfaatkan keunggulan fitur Campaign di Fowardin untuk merencanakan dan mengirim pesan iklan pada waktu yang tepat. Targetkan audiens yang sesuai dengan produk atau layanan Anda, serta optimalkan pesan iklan yang efektif. Dengan Campaign, Anda dapat mencapai hasil iklan yang lebih akurat dan berhasil.</p>
            </div>
          </div>
        </div>
      </div>
      <OneStep />
      <Subscription />
      <FAQ />
    </main >
    <Footer />
  </>
  )
}
