import { Button } from '@nextui-org/react'
import React from 'react'

const ApiMethod = ({ type, size = 'md' }) => {
    if (type === 'POST')
        return (
            <>
                <Button size={size} color='warning' className='rounded-md text-white'>
                    {type}
                </Button>
            </>
        )
    if (type === 'PATCH')
        return (
            <>
                <Button size={size} color='secondary' className='rounded-md'>
                    {type}
                </Button>
            </>
        )
    if (type === 'PUT')
        return (
            <>
                <Button size={size} color='primary' className='rounded-md'>
                    {type}
                </Button>
            </>
        )
    if (type === 'DELETE')
        return (
            <>
                <Button size={size} color='danger' className='rounded-md'>
                    {type}
                </Button>
            </>
        )

    return (
        <>
            <Button size={size} color='success' className='rounded-md text-white'>
                {type}
            </Button>
        </>
    )
}

export default ApiMethod