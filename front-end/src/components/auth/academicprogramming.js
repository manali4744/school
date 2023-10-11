import React from 'react'
import './css/academicprogramming.css'

function AcademicProgramming() {
  return (
    <>
        <main>
            <div className="container-fluid">
                <img src="http://127.0.0.1:3000/img/academicpro.avif" alt="" style={{width: "20%", height: "20%"}}/>
            </div>
            <div className="heading__academicprogramming">
                <h1>Academic Programming </h1>
            </div>
            <div className='container academicprogramming'>
                <p>
                Hope Academy offers a comprehensive curriculum aligned with Connecticut State Standards. Instructional time is allotted specifically for<br/>
                language arts, math, science, and social studies as well as elective classes. While core academic instruction is delineated by subject,<br/>
                critical skills in reading comprehension, written expression, and executive functioning are reinforced across the curriculum. This<br/>
                allows for interdisciplinary connections within the learning process while also providing an increased opportunity for students to make<br/>
                meaningful academic gains. 
                </p>
                <p>
                In addition to receiving instruction aligned with general education Standards, an Individualized Education Plan (IEP) is formulated for<br/>
                each student. Through the development and implementation of the IEP, each child’s academic programming is personalized according<br/> 
                to his or her unique learning needs. When appropriate, classroom instruction is supplemented with enrichment experiences or targeted<br/> 
                intervention using scientific research-based methodologies to allow for an appropriate level of challenge and/ or support for all<br/> 
                students. Hope Academy maintains a low student-to-teacher ratio to ensure that all instruction is provided within a small group<br/>
                environment. 
                </p>
            </div>
        </main>
    </>
  )
}

export default AcademicProgramming;
