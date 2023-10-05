import { PulseLoader } from 'react-spinners'

const ButtonSubmit = ({ isLoading, text }: { isLoading: boolean, text: string }) => {
    return (
        <button type="submit" className='px-4 py-3  rounded-md w-full bg-primary text-white border border-primary' disabled={isLoading ? true : false} >
            {isLoading ? (<PulseLoader size={10} color="#F3F5F8" />)
                : (<p>
                    {text}
                </p>)}
        </button>
    )
}

export default ButtonSubmit