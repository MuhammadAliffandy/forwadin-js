import './globals.css'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Provider from '@/app/components/Provider';
import { NextUIProviders } from './NextUIProvider';
import { SocketProvider } from './SocketProvider';
export const metadata = {
  title: 'ForwardIn | Home',
  description: 'Lorem Ipsum'
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </head>
      <body className={`font-inter text-neutral-900 font-medium overflow-x-hidden`}>
        <Provider>
        
            <ToastContainer position="top-right"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light" />
            <NextUIProviders>

              {children}
            </NextUIProviders>
         
        </Provider>
      </body>
    </html>
  )
}

