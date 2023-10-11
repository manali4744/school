import React from 'react'
import './css/schoolengagement.css'

function SchoolEngagementservices() {
  return (
    <>
        <main>
            <div className="container-fluid">
                <img src="http://127.0.0.1:3000/img/schoolengagement.avif" alt="" style={{width: "20%", height: "20%"}}/>
            </div>
            <div className="heading__schoolengagement">
                <h1>School Engagement Services</h1>
            </div>
            <div className='container schoolengagement'>
                <p>
                We recognize that school is not easy for many students. For some students, the thought of leaving the house to <br/>
                take a bus or enter a school building is simply overwhelming. At Hope Academy, we provide specialized<br/>
                services for students who experience significant anxiety surrounding school attendance. These services involve a<br/>
                highly individualized program to help the student engage in school.
                </p>
                <p>
                Individualized services may include a modified day with a plan for systematic desensitization to increase school attendance, alternate learning<br/>
                options, and highly individualized behavioral programming. Our school engagement services depend heavily on family involvement. Family coaching by <br/> 
                certified clinicians is provided to help parents and guardians implement effective strategies that will help<br/> 
                the student achieve success in regularly attending school.
                </p>
            </div>
        </main>
    </>
  )
};

export default SchoolEngagementservices;
