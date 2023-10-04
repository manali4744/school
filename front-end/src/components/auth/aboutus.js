import React from "react";
import './aboutus.css'

function AboutUs () {
    return (
        <main>
            <div className="container-fluid">
                <img src="http://127.0.0.1:3000/img/mainaboutus.avif" alt="" style={{width: "30%", height: "30%"}}/>
            </div>
            <div className="heading__aboutus">
                <h1>Our mission</h1>
                <p>Our mission is to educate the whole child. Because every child deserves a little HOPE… </p>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col  d-flex justify-content-center align-items-center">
                        <img src="http://127.0.0.1:3000/img/aboutus.avif" alt="" style={{width: "70%"}} className="mx-auto"/>
                    </div>
                    <div className="col">
                    <h1>About Us</h1>
                    <p>Our Academy is a distinguished private institution specializing 
                    in Special Education, fully accredited by the Connecticut State Department 
                    of Education. Our dedicated team is committed to empowering students in 
                    grades 1-12 who have encountered challenges in traditional academic 
                    environments.At Our Academy, we go beyond the conventional to provide 
                    a comprehensive educational experience. In addition to our core 
                    curriculum, we offer Transition Services tailored to individuals aged 
                    18 to 22. These services are designed to equip students with the 
                    necessary skills for success in post-secondary education, 
                    career pursuits, and independent living.
                    </p>
                    </div>
                </div>
            </div>
                <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Our mission</h1>
                        <p>our mission is to transform the lives of students facing academic 
                        challenges by providing them with a nurturing and inclusive learning 
                        environment. We are a distinguished, fully accredited private institution 
                        specializing in Special Education, recognized and approved by the 
                        Connecticut State Department of Education.Our unwavering commitment 
                        is to empower students in grades 1-12 who may not have thrived in 
                        traditional academic settings. We believe in going beyond the ordinary 
                        to offer a comprehensive educational experience that equips our 
                        students with the knowledge, skills, and confidence needed for success.</p>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <img src="http://127.0.0.1:3000/img/ourmission.avif" alt="" style={{width: "70%"}} className="mx-auto"/>
                    </div>
                </div>
            </div>
            <div style={{marginBottom: "30px"}}></div>
        </main>
    )
};

export default AboutUs;