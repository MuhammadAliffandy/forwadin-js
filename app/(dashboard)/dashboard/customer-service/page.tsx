import type { Metadata } from 'next'
import CustomerServiceTable from './CustomerServiceTable'

export const metadata: Metadata = {
    title: 'Customer Service',
}

export default function Page() {
    return (
        <>
            <CustomerServiceTable />
        </>
    )
}
