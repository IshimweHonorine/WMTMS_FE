import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
import {BsJournalBookmark} from 'react-icons/bs'
import {CiLock,CiUnlock} from 'react-icons/ci'
import { connect } from 'react-redux'
import {TiTick} from 'react-icons/ti'


function Lessons(props){
    const location=useLocation()
    const navigate=useNavigate()

    const [tab,setTab]=useState("contents");

     const checkEligibility=(lessons)=>{
        const score=lessons?.filter(lesson=> lesson.completedBy.some((obj) =>obj?.member?._id ==props?.data?.memberProfile?.resp?.data?.getProfile?._id))

        return score
    }

    
    return(
        <div>

            <div className="mb-3">
                <ul className="flex flex-wrap -mb-px text-text_secondary text-xs font-bold text-center p-0 list-none">
                    <li className="mr-2" role="presentation" onClick={()=>setTab("contents")}>
                        <button className={`inline-block p-2 border-b-2 ${tab==="contents" ?'border-primary  text-primary':'border-btn_primary'}  rounded-t-sm hover:text-primary hover:border-primary flex justify-start gap-2`}>Table of contents</button>
                    </li>
                    <li className="mr-2" role="presentation" onClick={()=>setTab("quizzes")}>
                        <button className={`inline-block p-2 border-b-2 ${tab==="quizzes" ?'border-primary  text-primary':'border-btn_primary'} rounded-t-sm hover:text-primary hover:border-primary flex justify-start gap-2`}>Exams</button>
                    </li>
                </ul>
            </div>
            {!props?.enrolledTrainees?.some((obj) => obj?.member?._id ===props?.data?.memberProfile?.resp?.data?.getProfile?._id) && !location.pathname.includes("users/admin/courses") && <p className='text-sm text-primary'>You have to enroll first to access this course</p>}
            {tab=='contents'?(
                <>
                <div className='flex justify-between mb-2'>
                    <h1 className="text-text_secondary font-bold text-sm py-2">Table of contents</h1>
                    {location.pathname.includes("users/admin/courses") &&
                    <div>
                        <Button size="sm" className='bg-primary text-sm text-secondary' onClick={()=>props?.setOpenModel(!props?.openModel)}>Add lesson</Button>
                    </div>}

                </div>
                {props?.Lessons?.length <=0?(
                    <div className='h-56 flex items-center justify-center lg:col-span-3'>
                        <p className='text-text_secondary text-center text-sm'>No lesson is added yet</p>
                    </div>
                ):(
                    props?.Lessons?.map((lesson,index)=>(
                        !location.pathname.includes("users/admin/courses")?(
                            <button key={index} onClick={()=>navigate(`lesson/${lesson?._id}`,{replace:true})}
                            className={`flex relative justify-between py-4 border-b border-text_secondary_2 w-full hover:opacity-80 delay-100 duration-200 ${props?.enrolledTrainees?.some((obj) => obj?.member?._id === props?.data?.memberProfile?.resp?.data?.getProfile?._id) && !location.pathname.includes("users/admin/courses")?'cursor-pointer':'cursor-not-allowed'}`} 
                            disabled={props?.enrolledTrainees?.some((obj) => obj?.member?._id === props?.data?.memberProfile?.resp?.data?.getProfile?._id) && !location.pathname.includes("users/admin/courses")?false:true }>
                                <div className="flex justify-start gap-3 text-text_secondary font-normal text-sm w-full">
                                    <BsJournalBookmark size={20}/>
                                    {lesson?.lessonTitle}
                                </div>
                                
                                <div className="w-12 text-text_secondary">
                                    {props?.enrolledTrainees?.some((obj) => obj?.member?._id === props?.data?.memberProfile?.resp?.data?.getProfile?._id)?<CiUnlock size={20}/>:<CiLock size={20}/>}
                                </div>
                                {!location.pathname.includes("users/admin/courses") && lesson?.completedBy.some((obj) => obj?.member === props?.data?.memberProfile?.resp?.data?.getProfile?._id) &&<TiTick size={20} className='text-primary absolute right-1'/>}
                                
                            </button>
                        ):(
                            <Link key={index} to={`lesson/${lesson?._id}`}  className="flex justify-start py-4 border-b border-text_secondary_2 gap-3 hover:opacity-80 delay-100 duration-200 text-text_secondary font-normal text-sm w-full">
                                <BsJournalBookmark size={20}/>
                                {lesson?.lessonTitle}.
                            </Link>
                        )
                    ))
                    
                )}
                </> 
            ):(
                <>
                <div className='flex justify-between mb-2'>
                    <h1 className="text-text_secondary font-bold text-sm py-2">Exam</h1>
                    {location.pathname.includes("users/admin/courses") &&
                    <div>
                        <Button size="sm" className='bg-primary text-sm text-secondary' onClick={()=>props?.openQuizz(!props?.quizzModel)}>Add Exam</Button>
                    </div>}

                </div>

                {props?.quizzes?.length <=0?(
                    <div className='h-56 flex items-center justify-center lg:col-span-3'>
                        <p className='text-text_secondary text-center text-sm'>No exam is added yet</p>
                    </div>
                ):(
                    props?.quizzes?.map((quizz,index)=>(
                        !location.pathname.includes("users/admin/courses")?(
                            <div key={index} onClick={()=>navigate(`quizz/${quizz?._id}`,{replace:true})}
                            className={`flex relative justify-between py-4 border-b border-text_secondary_2 w-full hover:opacity-80 delay-100 duration-200 ${props?.enrolledTrainees?.some((obj) => obj?.member?._id === props?.data?.memberProfile?.resp?.data?.getProfile?._id) && !location.pathname.includes("users/admin/courses")?'cursor-pointer':'cursor-not-allowed'}`} 
                            disabled={props?.enrolledTrainees?.some((obj) => obj?.member?._id === props?.data?.memberProfile?.resp?.data?.getProfile?._id) && !location.pathname.includes("users/admin/courses")?false:true }>
                                <div className="flex justify-start gap-3 text-text_secondary font-normal text-sm w-full">
                                    <BsJournalBookmark size={20}/>
                                    {quizz?.QuizName}
                                </div>
                                
                                <div className="w-12 text-text_secondary">
                                    {props?.enrolledTrainees?.some((obj) => obj?.member?._id === props?.data?.memberProfile?.resp?.data?.getProfile?._id)?<CiUnlock size={20}/>:<CiLock size={20}/>}
                                </div>
                                {!location.pathname.includes("users/admin/courses") && quizz?.completedBy.some((obj) => obj?.member === props?.data?.memberProfile?.resp?.data?.getProfile?._id) &&<TiTick size={20} className='text-primary absolute right-1'/>}
                                
                            </div>
                        ):(
                            <Link key={index} to={`quizz/${quizz?._id}`}  className="flex justify-start py-4 border-b border-text_secondary_2 gap-3 hover:opacity-80 delay-100 duration-200 text-text_secondary font-normal text-sm w-full">
                                <BsJournalBookmark size={20}/>
                                {quizz?.QuizName}.
                            </Link>
                        )
                    ))
                    
                )}
                </>
            )}
        </div>
    )
}


const mapState=(data)=>({
    data:data
})

export default connect(mapState) (Lessons)