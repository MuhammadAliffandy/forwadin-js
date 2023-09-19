import './globals.css'
import type { Metadata } from 'next'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'ForwardIn | Home',
  description: 'Lorem Ipsum'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </head>
      <body className={`font-inter text-neutral-900 font-medium overflow-x-hidden`}>
        <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
        {children}
      </body>
    </html>
  )
}
