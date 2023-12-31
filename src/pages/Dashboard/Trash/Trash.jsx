import React from 'react';
import useTrash from '../../../hooks/useTrash';
import NoDataHere from '../../../common/NoDataHere';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';

const Trash = () => {
    const { trash, refetch } = useTrash()
    const axiosData = useAxios()
    const handelDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosData.delete(`/trash/${id}`)
                    .then(res => {
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
            }
        });
    }

    return (
        <div>
            {
                trash?.length > 0 ? <div className='grid grid-cols-1 gap-5 lg:grid-cols-3 md:grid-cols-2'>
                    {
                        trash?.map((item, i) => {
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
                                        {item?.tags?.length > 0 ? <>
                                            {item?.tags?.map((item, i) => {
                                                return <p key={i} className='px-2 bg-gray-200 rounded-sm dark:bg-gray-800 dark:text-white dark:border'>{item}</p>
                                            })}
                                        </> : <span>No Tags</span>}

                                    </p>
                                    <h3 class="mb-2 text-md font-bold text-gray-800 dark:text-gray-200">
                                        {item?.title}
                                    </h3>
                                </div>

                                <div class="flex items-center">
                                    <button onClick={() => handelDelete(item._id)} type="button" class="w-full py-3 px-4 inline-flex justify-center rounded-es-xl items-center gap-x-2 text-sm font-semibold rounded-ee-xl border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        })
                    }
                </div> : <NoDataHere></NoDataHere>
            }
        </div>
    );
};

export default Trash;