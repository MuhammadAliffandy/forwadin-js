import { Button } from '@nextui-org/react'
import { PulseLoader } from 'react-spinners'

const ButtonSubmit = ({ isLoading, text, size = 'lg' }: { isLoading: boolean, text: string, size?: 'sm' | 'md' | 'lg' }) => {
    return (
        <Button fullWidth={true} type='submit' color="primary" isLoading={isLoading} className='rounded-md' size={size}>
            {text}
        </Button>
    )
}

export default ButtonSubmit
{/* <button type="submit" className='px-4 py-3  rounded-md w-full bg-primary text-white border border-primary' disabled={isLoading ? true : false} >
            {isLoading ? (<PulseLoader size={10} color="#F3F5F8" />)
                : (<p>
                    {text}
                </p>)}
        </button> */}