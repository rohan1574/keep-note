import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import NoDataHere from '../../../common/NoDataHere';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';
import { TagsInput } from 'react-tag-input-component';
import useAllData from '../../../hooks/useAllData';
import useTrash from '../../../hooks/useTrash';
import useAllTags from '../../../hooks/useAllTags';


const Tags = () => {
    const notes = useLoaderData()
    const { refetch } = useAllData()
    const { refetch: tresh } = useTrash()
    const { refetch: allTagsFetch } = useAllTags()
    const axiosData = useAxios()
    const [note, setNote] = useState({});
    const [selected, setSelected] = useState([]);

    const handelEdit = (item) => {
        setNote(item)
        document.getElementById('my_modal_5').showModal()
    }

    const handelUpdate = (e) => {
        e.preventDefault()
        const title = e.target.title.value;
        const noteTitle = e.target.noteTitle.value;
        const tagField = e.target.tagField.value;
        const tags = selected.map(item => {
            return item.startsWith('#') ? item.slice(1) : item;
        })
        const data = { title, noteTitle, tagField, tags }
        axiosData.put(`/notes/${note?._id}`, data)
            .then(res => {
                e.target.reset()
                document.getElementById('my_modal_5').close()
                refetch()
                allTagsFetch()
                Swal.fire({
                    title: "Good job!",
                    text: "Notes update successfully !",
                    icon: "success"
                });
            })
    }

    const handelDelete = (item) => {
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
                axiosData.delete(`/notes/${item._id}`)
                    .then(res => {
                        refetch()
                        tresh()
                        allTagsFetch()
                        axiosData.post(`/trash`, item)
                            .then(res => {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                            })
                    })
            }
        });
    }

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
                                    <button onClick={() => handelDelete(item)} type="button" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-es-xl border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-cookies">
                                        Delete Now
                                    </button>
                                    <button onClick={() => handelEdit(item)} type="button" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-ee-xl border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-cookies">
                                        Edit Now
                                    </button>
                                </div>

                            </div>
                        })
                    }
                </div> : <NoDataHere></NoDataHere>
            }
            <dialog id="my_modal_5" className="modal">
                <div className="modal-box dark:bg-gray-800">
                    <form method="dialog">
                        <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handelUpdate}>
                        <div className='mb-4'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input defaultValue={note?.title} type="text" name='title' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>
                        <div className='mb-4'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note Title</label>
                            <input defaultValue={note?.noteTitle} type="text" name='noteTitle' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>
                        <div className='mb-4'>
                            <h1 className='mb-1'>{note?.tags?.map((item, i) => {
                                return <span key={i} className='px-2 mr-2 border border-gray-200 rounded-sm'>{item}</span>
                            })}</h1>
                            <TagsInput defaultValue={note?.tags} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 !dark:bg-gray-700 dark:border-gray-600 !dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={selected}
                                onChange={setSelected}
                                name="tags"
                                placeHolder="Add tags"
                            />
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                            <textarea defaultValue={note?.tagField} name='tagField' rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        </div>

                        <button type="submit" class="py-2.5 px-5 w-full mt-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Update now</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Tags;