import React from 'react'
import './css/therapeuticapproach.css'

function TherapeuticApproach() {
  return (
    <>
        <main>
            <div className="container-fluid">
                <img src="http://127.0.0.1:3000/img/therapeutic.jpg" alt="" style={{width: "20%", height: "20%"}}/>
            </div>
            <div className="heading__therapeuticapproach">
                <h1>Therapeutic Approach</h1>
            </div>
            <div className='container therapeuticapproach'>
                <p>
                Our Therapeutic Approach is what makes Hope Academy a truly unique school environment for our students. We are <br/>
                invested in creating a caring and safe community in which students feel free to be themselves, to take risks in their <br/>
                learning, to celebrate their strengths, and to acknowledge areas for growth. Our staff is trained to interact with students <br/>
                in a supportive manner to help them achieve their highest potential.  We are committed to meeting students where they <br/>
                are and celebrating their individuality. Therapeutic supports and explicit instruction in social-emotional learning are built<br/>
                into the school day for all students. 
                </p>
                <p>
                We maintain a large team of expertly trained clinicians who are available to support students throughout the day. Our <br/>
                certified clinical staff closely track the social-emotional and behavioral progress of each individual student, as we believe <br/> 
                growth in these areas is just as important as academic success. Our clinicians work closely with classroom teachers to <br/> 
                ensure that we consider each student’s emotional needs to ensure they are available for learning throughout the school <br/> 
                day.
                </p>
            </div>
        </main>
    </>
  )
};

export default TherapeuticApproach;
