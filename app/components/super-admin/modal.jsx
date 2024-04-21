import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const AppModal = (props) => {
    return (
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <Box className = {`${props.width ? props.width : 'w-auto' }  ${props.height ? props.height : 'h-[80vh]' }  overflow-x-hidden overflow-y-scroll rounded-[20px] items-center bg-white p-[20px] flex flex-col gap-[15px] border-[2px] border-none`}>
                {props.withClose ? 
                    <Box className='w-[100%] flex justify-end'>
                        <button type='button' onClick={props.onCloseButton} className='bg-transparent cursor-pointer'><FontAwesomeIcon icon={faClose} color='grey' /></button>
                        </Box> : null
                }
                {props.children}
            </Box>
        </Modal>
    )
}

export default AppModal;