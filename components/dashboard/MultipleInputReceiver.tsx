
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface MultipleInputReceiverProps {
    selectedKeys: any,
    setselectedKeys: Dispatch<SetStateAction<any>>,
    listItems: any
}
const MultipleInputReceiver = ({ selectedKeys, setselectedKeys, listItems }: MultipleInputReceiverProps) => {
    // const selectedValue = React.useMemo(
    //     () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    //     [selectedKeys]
    // );
    const renderSelectedKey = (selectedSet: any) => {
        const rendered: any = [];

        selectedSet.forEach((item: string) => {
            // const findItem = listItems.find(i => i.)
            rendered.push(
                <div key={item} className='flex gap-2 rounded-md px-2 py-[2px] border border-customGray hover:cursor-pointer' onClick={() => { }}>
                    <span className=''>{item}</span>
                </div>
            )
        })

        return rendered;
    };
    useEffect(() => {
        console.log(selectedKeys)
    }, [selectedKeys])
    return (
        <>
            <Dropdown

            >
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="capitalize rounded-md flex gap-2 flex-start"
                        // size='sm'
                        disableAnimation
                        fullWidth

                    >
                        {/* {[...selectedKeys].map((item: any) => (
                            <div key={item.value} className='flex gap-2 rounded-full px-2 py-[2px] border border-customGray hover:cursor-pointer' onClick={() => { }}>
                                <span className=''> {item.title}</span>
                            </div>
                        ))} */}
                        <>
                            {renderSelectedKey(selectedKeys)}
                            <input type="text" />
                        </>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Multiple selection example"
                    variant="flat"
                    closeOnSelect={false}
                    // disallowEmptySelection
                    selectionMode="multiple"
                    selectedKeys={selectedKeys as any}
                    onSelectionChange={setselectedKeys as any}
                    disabledKeys={['search']}
                // items={listItems}
                >
                    <DropdownSection
                        showDivider={true}

                    >
                        <DropdownItem key={'search'}>
                            <input type='text' />
                        </DropdownItem>

                    </DropdownSection>
                    <DropdownSection items={listItems}>
                        <DropdownItem
                            key={'1'}
                        >
                            {'asdasd'}
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown></>
    )
}

export default MultipleInputReceiver