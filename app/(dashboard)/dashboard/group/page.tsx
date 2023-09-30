import type { Metadata } from 'next'
import Group from './Group'

export const metadata: Metadata = {
    title: 'Group',
}

export default function Page() {
    return (
        <>
            {/* <Contacts /> */}
            <Group />
        </>
    )
}
