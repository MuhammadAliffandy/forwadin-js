import Message from '@/components/dashboard/Message'
import { ConversationMessage, IncomingMessage } from '@/utils/types'
import { Listbox, ListboxItem } from '@nextui-org/react'
import React from 'react'

const Notification = ({ notification }) => {

    return (
        <div className='w-[250px] max-h-[250px] overflow-y-auto'>

            <Listbox
                items={notification}
                aria-label='notification'
                variant='light'

            >
                {(item) => (
                    <ListboxItem
                        key={item.id}
                    >
                        <Message message={item} />
                    </ListboxItem>
                )}

            </Listbox>
        </div>
    )
}

export default Notification