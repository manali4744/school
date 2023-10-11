import React from 'react'
import './css/transitionservices.css'

function TransitionServices() {
  return (
    <>
        <main>
            <div className="container-fluid">
                <img src="http://127.0.0.1:3000/img/transition.avif" alt="" style={{width: "20%", height: "20%"}}/>
            </div>
            <div className="heading__transitionservices">
                <h1>Transition Services </h1>
            </div>
            <div className='container-fluid transitionservices'>
                <p>
                In working with even our youngest students, we have their long-term future in mind. Always working towards college and career readiness, we <br/>
                work with students at every grade level on real-world skills that will benefit them no matter what path they choose. Students receive explicit <br/>
                instruction in skills relevant to their specific strengths, talents, and needs. For our high school students, we provide various secondary education  <br/>
                preparation experiences as well as internship experiences suited to their preferences and future goals.  <br/>
                </p>
                <p>
                For our oldest students, ages 18 – 22, we provide specialized services tailored towards preparation for secondary education, career readiness, and <br/>
                independent living. A school counselor, certified clinician, and special education teacher work together to develop individualized transition <br/> 
                programs for these young adults that involve real-world academic skills, access to community college courses, vocational instruction, community  <br/> 
                skills, and independent living skills (transportation training-buses, trains, taxis). <br/> 
                </p>
            </div>
        </main>
    </>
  )
}
export default  TransitionServices;