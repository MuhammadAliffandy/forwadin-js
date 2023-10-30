interface ConfigProps {
    name: string,
    placeholder: string,
    type: string,
    error?: any
    data?: any,
    registerConfig: any
}
const InputForm = ({ register, config }: { register: any, config: ConfigProps }) => {
    return (
        <div className="relative">
            {config.error && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${config.error.message}`}</p>)}
            <input type={config.type} placeholder={config.placeholder} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full ' + (config.error ? 'border-danger/50 hover:border-danger focus:border-danger' : 'border-[#B0B4C5]/50 hover:border-[#B0B4C5] focus:border-primary ')} {...register(config.name, config.registerConfig)} />
        </div>
    )
}

export default InputForm