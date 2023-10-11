import React, { useState } from "react";
import { Button, Stepper, Step, StepLabel } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const initialValues = {
  firstName: "",
  lastName: "",
  father_name: "",
  mother_name: "",
  birthdate: "",
  gender: "",
  address: "",
  city: "",
  country: "",
  zipcode: "",
  phonenumber: "",
  emailaddress: "",
  bloodgroup: "",
  studentphoto: null, // Initialize the studentphoto field with null
};
const formData = new FormData();

function AdmissionForm() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Student Info", "Address", "Contact", "Other", "Review&Submit"];
  const [completed, setCompleted] = useState(false);

  const isLastStep = () => {
    return activeStep === steps.length - 1;
  };


  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (isLastStep()) {
      
      const formFields = [
        'firstName',
        'lastName',
        'father_name',
        'mother_name',
        'birthdate',
        'gender',
        'address',
        'city',
        'country',
        'zipcode',
        'phonenumber',
        'emailaddress',
        'bloodgroup',
      ];

      formFields.forEach((fieldName) => {
        formData.append(fieldName, values[fieldName]);
      });

      // formData.append('studentphoto', values.studentphoto.split("\\").pop());

      try {
        const response = await axios.post('http://127.0.0.1:8000/admissionform/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if(response.data.status===201){
          html2canvas(document.querySelector("#admissionformpdf")).then((canvas) => {
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'pt',
              format: [612, 792]
            });
            pdf.internal.scaleFactor = 1;
            const imgProps= pdf.getImageProperties(imgData);
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const marginLeft = 80; // Adjust this value as needed
            const imgX = (pdf.internal.pageSize.getWidth() - imgWidth) / 2 + marginLeft;    
            const imgY = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;

            pdf.addImage(imgData, 'PNG', imgX, imgY);
            // pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('admission_form.pdf');
          });

          setCompleted(true);
        }
      } catch (error) {
        alert(error.response.data)
      }
    } else {
      handleNext();
    }

    setSubmitting(false);
  };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className="container justify-content-center">
      <h1 className="text-center"> Addmission Form</h1>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completed || index < activeStep}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    <div className="container justify-content-center" style={{marginBottom: "50px", width: "70%", minHeight: "70vh"}}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, values }) => (
          <Form enctype="multipart/form-data">
            {activeStep === 0 && (
              <>
                <Field
                  component={TextField}
                  name="firstName"
                  label="First Name"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                  validate={(value) => {
                    if (!/^[A-Za-z]+$/i.test(value)) {
                      return "First Name should contain only letters";
                    } else if (value.length<2){
                      return "Names typically consist of more than one letter."

                    }
                  }}
                />
                <Field
                  component={TextField}
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                  validate={(value) => {
                    if (!/^[A-Za-z]+$/i.test(value)) {
                      return "Last Name should contain only letters";
                    } else if (value.length<2){
                      return "Names typically consist of more than one letter."
                    }
                  }}
                />
                <Field
                  component={TextField}
                  name="father_name"
                  label="Father Name"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                  validate={(value) => {
                    if (!/^[A-Za-z]+$/i.test(value)) {
                      return "Father Name should contain only letters";
                    }else if (value.length<2){
                      return "Names typically consist of more than one letter."
                    }
                  }}
                />
                <Field
                  component={TextField}
                  name="mother_name"
                  label="Mother Name"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                  validate={(value) => {
                    if (!/^[A-Za-z]+$/i.test(value)) {
                      return "Mother Name should contain only letters";
                    } else if (value.length<2){
                      return "Names typically consist of more than one letter.";
                    }
                  }}
                />
                <Field
                component={TextField}
                name="birthdate"
                label="Date of Birth"
                type="date" // Set the input type to 'date'
                fullWidth
                required
                InputLabelProps={{
                    shrink: true, // This makes the label shrink when you select a date
                }}
                validate={(value) => {
                  const birthYear = new Date(value).getFullYear();
                  const currentYear = getCurrentYear();
                  if (birthYear >= currentYear - 4) {
                    return `Birth year should be less than ${currentYear - 4}`;
                  }
                }}
                />
                <Field name="gender" required>
                {({ field }) => (
                    <FormControl fullWidth margin="normal">
                    <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        style={{ display: 'flex', fontSize: '20px' }}
                    >
                        Gender
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        {...field}
                    >
                        <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                        />
                        <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                        />
                    </RadioGroup>
                    </FormControl>
                )}
                </Field>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={!values.firstName || !values.lastName || !values.father_name || !values.mother_name || !values.birthdate || !values.gender}
                >
                  Next
                </Button>
              </>
            )}

            {activeStep === 1 && (
              <>
                <Field
                  component={TextField}
                  name="address"
                  label="Address"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                  validate={(value) => {
                    if (value.length<5){
                      return "Address typically consist of more than Five letter."
                    }
                  }}
                />
                <Field
                  component={TextField}
                  name="zipcode"
                  label="Zipcode"
                  type="number"
                  required
                  fullWidth
                  style={{ marginBottom: "20px"}}
                  InputLabelProps={{ shrink: true }}
                  validate={(value) => {
                    if (!value || value.toString().length !== 6) {
                      return "Zipcode must be exactly 6 characters.";
                    }
                  }}
                />
                 <Field
                  component={TextField}
                  name="city"
                  label="City"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                  validate={(value) => {
                    if (!/^[A-Za-z]+$/i.test(value)) {
                      return "City should contain only letters";
                    } 
                  }}
                />
                 <Field
                  component={TextField}
                  name="country"
                  label="Country"
                  required
                  fullWidth
                  style={{ marginBottom: "20px"}}
                  validate={(value) => {
                    if (!/^[A-Za-z]+$/i.test(value)) {
                      return "Country should contain only letters";
                    }
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                  style={{ marginRight: "20px" }}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  disabled = {!values.address || !values.city || !values.country || !values.zipcode || values.zipcode.toString().length !== 6}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </>
            )}
            {activeStep === 2 && (
              <>
                <Field
                  component={TextField}
                  name="phonenumber"
                  label="Phone Number"
                  type= "number"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                  InputLabelProps={{ shrink: true }}
                  validate={(value) => {
                    if (!value || value.toString().length !== 10) {
                      return "Enter valid phonenumber";
                    }
                  }}
                />
                 <Field
                  component={TextField}
                  name="emailaddress"
                  label="Email Address"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                  validate={(value) => {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)){
                        return "Enter a valid email address";
                    }
                  }}
                />
                 <Field
                  component={TextField}
                  name="bloodgroup"
                  label="Blood Group"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                  validate={(value) => {
                    if (!/^(A|B|AB|O)[+-]$/i.test(value)){
                        return "Invalid blood group format";
                    }
                  }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                  style={{ marginRight: "20px" }}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled = {!values.phonenumber || !values.emailaddress || !values.bloodgroup || values.phonenumber.toString().length !== 10 || !/^(A|B|AB|O)[+-]$/i.test(values.bloodgroup)}
                >
                  Next
                </Button>
              </>
            )}

            {activeStep === 3 && (
              <>
              <label htmlFor="studentphoto">Student Image:</label><br/>
                <Field
                type="file"
                name="studentphoto"
                label="Student Image"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  // formData.append('studentphoto', selectedFile);

                  if (selectedFile) {
                    const fileName = selectedFile.name.toLowerCase();
                    if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png')) {
                      formData.append('studentphoto', selectedFile);
                    } else {
                      // Invalid file selected, you can show an error message or handle it as needed
                      alert('Please select a valid .jpg, .jpeg, or .png file.');
                      e.target.value = ''; // Clear the file input to allow selecting another file
                    }
                  }
                }}
                fullWidth
                style={{ marginBottom: "20px"}}
                />
                <br/>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                  style={{ marginRight: "20px" }}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  // onClick={handleNext}
                  // disabled={!isValidFile}
                >
                  Next
                </Button>
              </>
            )}

            {activeStep === 4 && (
              <>
                {completed ? (
                  // Display "Submitted" when completed is true
                  <p>Submitted</p>
                ) : (
                  // Review step
                  <div className="container justify-content-center">
                    <p className="text-center">Review your information:</p>
                    <div style={{border: "1px solid gray", padding: "10px", marginBottom: "10px"}} id = "admissionformpdf">
                      <div className="card" style={{width: "100%"}}>
                          <div className="card-header">
                          Admission Form Details
                          </div>
                          <table className="table">
                          <tbody>
                          <tr>
                              <td>First Name:</td>
                              <td>{values.firstName}</td>
                          </tr>
                          <tr>
                              <td>Last Name:</td>
                              <td>{values.lastName}</td>
                          </tr>
                          <tr>
                              <td>Father Name:</td>
                              <td>{values.father_name}</td>
                          </tr>
                          <tr>
                              <td>Mother Name:</td>
                              <td>{values.mother_name}</td>
                          </tr>
                          <tr>
                              <td>Birthdate:</td>
                              <td>{values.birthdate}</td>
                          </tr>
                          <tr>
                              <td>Gender:</td>
                              <td>{values.gender}</td>
                          </tr>
                          <tr>
                              <td>Address:</td>
                              <td>{values.address}</td>
                          </tr>
                          <tr>
                              <td>City:</td>
                              <td>{values.city}</td>
                          </tr>
                          <tr>
                              <td>Country:</td>
                              <td>{values.country}</td>
                          </tr>
                          <tr>
                              <td>Zipcode:</td>
                              <td>{values.zipcode}</td>
                          </tr>
                          <tr>
                              <td>Phone Number:</td>
                              <td>{values.phonenumber}</td>
                          </tr>
                          <tr>
                              <td>Email Address::</td>
                              <td>{values.emailaddress}</td>
                          </tr>
                          <tr>
                              <td>Blood Group:</td>
                              <td>{values.bloodgroup}</td>
                          </tr>
                          </tbody>
                          </table>
                        </div>
                        <table className="table">
                          <tbody>
                            <tr>
                              <td style={{textAlign:"justify", textAlignLast:"auto"}}>We greatly appreciate your diligence in submitting accurate and verified information.
                              Ensuring that the details you provide are both precise and complete is vital to
                              guarantee a timely and efficient response to your request. By submitting 
                              this form after verifying the accuracy of your information, 
                              you help us better serve your needs. Please review the details 
                              you have provided and inform us immediately of any discrepancies. Your commitment 
                              to the accuracy of your submission is invaluable in our efforts to provide you with the best possible service.</td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                    <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleBack}
                      style={{ marginRight: "20px" }}
                      >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                      >
                      Submit
                    </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
}

export default AdmissionForm;
