import React from 'react'
import Layout from '../components/Layout'
import Lesson from '../components/Lesson'

const LessonUser = () => {
  return (
    <Layout>
      <div className='lg:px-14 overflow-hidden'>
          <Lesson/>
      </div>
    </Layout>
  )
}

export default LessonUser