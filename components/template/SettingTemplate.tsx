import React from "react"

const SettingTemplate = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full max-w-md bg">
            {children}
        </div>
    )
}

export default SettingTemplate