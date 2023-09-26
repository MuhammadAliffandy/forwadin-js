import type { Metadata } from 'next'
import Contacts from './Contacts'

export const metadata: Metadata = {
    title: 'Contacts',
}

export default function Page() {
    return (
        <>
            <Contacts />

        </>
    )
}
