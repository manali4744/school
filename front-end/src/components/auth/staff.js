import React from "react";
import './staff.css'

function Staff () {
    return (
        <>
         <div className="container-fluid">
            <img src="http://127.0.0.1:3000/img/staff.avif" alt="" style={{width: "20%", height: "20%"}}/>
        </div>
        <div className="heading__staff">
                <h1>Faculty & Staff</h1>
                <p>Each faculty and staff member is bound by the Professional Code of Ethics of the State of Connecticut. </p>
            </div>
        <div className="container">
            <div className="row staff">
                <div className="col">
                <img src="http://127.0.0.1:3000/img/admin.avif" alt="" style={{width: "70%"}}/>
                </div>
                <div className="col">
                <h1>Administration</h1>
                <p>
                Each Administrator at Academy holds the required certifications mandated by the Connecticut 
                State Department of Education. Our Administrative team is committed to collaborating 
                with students, families, school districts to ensure each student’s success 
                within our program. The Administrators work closely with each staff member 
                through regular supervision to ensure the implementation of our core values 
                and beliefs, including the provision of a rigorous academic program and our 
                specialized therapeutic approach.
                </p>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row staff">
                <div className="col">
                <h1>Teachers</h1>
                <p>
                    Each teacher at Academy holds the required certifications mandated by the 
                    State of Connecticut State Department of Education.  Our teachers are skilled 
                    at developing Individualized Education Programs and implementing specialized 
                    instruction for each student. Our teachers carefully track progress on each 
                    student’s goals and objectives, as formulated by the Planning and Placement 
                    Team. Each student is assigned one teacher as a case manager who will 
                    collaborate continuously with other staff members and the student’s 
                    family to ensure continuous progress.
                </p>
                </div>
                <div className="col">
                <img src="http://127.0.0.1:3000/img/teacher.avif" alt="" style={{width: "70%"}}/>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row staff">
                <div className="col">
                <img src="http://127.0.0.1:3000/img/clinic.avif" alt="" style={{width: "70%"}}/>
                </div>
                <div className="col">
                <h1>Clinical Staff</h1>
                <p>
                    Our school psychologists, social workers, and school counselors 
                    each hold the required certifications mandated by 
                    the Connecticut State Department of Education. 
                    The clinical team is expertly trained to respond to 
                    students' needs and to develop treatment plans to 
                    foster social, emotional, and behavior growth. Our clinicians 
                    build strong partnerships with teachers, families, and 
                    outside providers to ensure that students receive 
                    consistent support across environments.
                </p>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row staff">
                <div className="col">
                <h1>Support Staff</h1>
                <p>
                    Our support staff members receive continuous training 
                    to respond to student needs, provide appropriate 
                    academic supports, and implement our therapeutic approach. 
                    Our support staff team focuses on building strong relationships 
                    with students, as we believe relationships are the foundation 
                    for learning and help students feel safe and supported at school.
                </p>
                </div>
                <div className="col">
                <img src="http://127.0.0.1:3000/img/support_staff.jpg" alt="" style={{width: "70%"}}/>
                </div>
            </div>
        </div>
        </>
    );
};

export default Staff;