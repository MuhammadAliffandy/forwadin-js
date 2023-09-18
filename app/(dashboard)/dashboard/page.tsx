// 'use client';
import Message from '@/components/dashboard/Message'
import Button from '@/components/landing/Button'
import type { Metadata } from 'next'
import Link from 'next/link'
import Dashboard from './Dashboard'
export const metadata: Metadata = {
    title: 'Dashboard',
}

export default function Home() {
    return (
        <>
            <Dashboard />
        </>
    )
}
