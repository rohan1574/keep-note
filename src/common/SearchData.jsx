import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Tooltip } from 'react-tooltip'
import useAllData from '../hooks/useAllData'

function SearchData() {
    const { notes: items, refetch } = useAllData()
    const [item, setItem] = useState({})



    const handleOnSearch = (string, results) => {
    
    }

    const handleOnHover = (result) => {

    }

    const handleOnSelect = (item) => {
        document.getElementById('my_modal_7').showModal()
        setItem(item)
    }

    const handleOnFocus = () => {
    }

    const formatResult = (item) => {
        return (
            <div className='cursor-pointer'>
                <div >
                    <a data-tooltip-id={item?._id}>{item?.title}</a>
                    <Tooltip id={item?._id} place={'right'}>
                        <div>
                            <img className='w-40 h-40' src={item?.img} alt="" />
                        </div>
                    </Tooltip>
                </div>

            </div>
        )
    }


    return (
        <div className="App">
            <header className="App-header">
                <div className='relative lg:w-[450px] md:w-[350px] w-[70px] rounded-sm'>
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                        fuseOptions={{ keys: ["title", "noteTitle"] }}
                        resultStringKeyName="title"
                        placeholder='Enter your projects'
                        className='inputSearch'
                    />
       
                </div>
            </header>
            <dialog id="my_modal_7" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    </form>

                    <div className=''>
                        <div class="p-6 border pt-10  text-center overflow-y-auto">
                            <img src={item?.img} alt="" />
                            <h3 class="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                                {item?.noteTitle}
                            </h3>
                            <p class="text-gray-500 dark:text-white">
                                {item?.tagField}
                            </p>
                            <p class="text-gray-500 flex items-center justify-center gap-3 py-3">
                                {item?.tags?.length > 0 ? <div className='flex flex-wrap w-full gap-1'>
                                    {item?.tags?.map((item, i) => {
                                        return <p key={i} className='px-2 bg-gray-200 rounded-sm dark:bg-gray-800 dark:text-white dark:border'>{item}</p>
                                    })}
                                </div> : <span>No Tags</span>}

                            </p>
                            <h3 class="mb-2 text-md font-bold text-gray-800 dark:text-gray-200">
                                {item?.title}
                            </h3>
                        </div>
                    </div>



                </div>
            </dialog>
        </div>
    )
}

export default SearchData
