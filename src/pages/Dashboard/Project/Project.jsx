import React from 'react';
import NoDataHere from '../../../common/NoDataHere';
import useAllData from '../../../hooks/useAllData';

const Project = () => {
    const { notes, refetch } = useAllData()
    return (
        <div>
            {
                notes?.length > 0 ? <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2'>
                    {
                        notes?.map((item, i) => {
                            return <div key={i} className=''>
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
                        })
                    }
                </div> : <NoDataHere></NoDataHere>
            }
        </div>
    );
};

export default Project;