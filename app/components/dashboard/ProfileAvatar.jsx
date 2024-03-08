import { getInitials } from '@/app/utils/helper'
import React from 'react'

const ProfileAvatar = ({ profile }) => {
    if (profile)
        return (
            <div style={{
                backgroundColor: '#' + profile.colorCode
            }} className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center`}>{getInitials(profile.firstName + ' ' + (profile.lastName || ''))}</div>
        )
    return (
        <div className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center bg-primary`}></div>
    )
}

export default ProfileAvatar