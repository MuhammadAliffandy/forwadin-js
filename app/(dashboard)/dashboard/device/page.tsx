
import type { GetServerSideProps, Metadata } from 'next'
import Device from './Device'
export const metadata: Metadata = {
    title: 'Device',
}
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return { props: {} }
}

export default function Page() {
    return (
        <>
            <Device />
        </>
    )
}
