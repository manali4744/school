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
      setCompleted(true);
      console.log("Form submitted with values:", values);

      
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

        console.log('API response:', response.data.data);
        console.log(response.data.error);
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      handleNext();
    }

    setSubmitting(false);
  };

  return (
    <div className="container justify-content-center">
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
                />
                <Field
                  component={TextField}
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                />
                <Field
                  component={TextField}
                  name="father_name"
                  label="Father Name"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                />
                <Field
                  component={TextField}
                  name="mother_name"
                  label="Mother Name"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
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
                />
                 <Field
                  component={TextField}
                  name="city"
                  label="City"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                />
                 <Field
                  component={TextField}
                  name="country"
                  label="Country"
                  required
                  fullWidth
                  style={{ marginBottom: "20px"}}
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
                  disabled = {!values.address || !values.city || !values.country || !values.zipcode}
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
                />
                 <Field
                  component={TextField}
                  name="emailaddress"
                  label="Email Address"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                />
                 <Field
                  component={TextField}
                  name="bloodgroup"
                  label="Blood Group"
                  fullWidth
                  required
                  style={{ marginBottom: "20px"}}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                  disabled = {!values.phonenumber || !values.emailaddress || !values.bloodgroup}
                  style={{ marginRight: "20px" }}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
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
                accept="image/*" // Allow only image files
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  formData.append('studentphoto', selectedFile);
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
                    <p>Review your information:</p>
                    <div style={{border: "1px solid gray", padding: "10px", marginBottom: "10px"}}>
                        <div>
                        <strong>First Name:</strong> {values.firstName}
                        </div>

                        <div>
                        <strong>Last Name:</strong> {values.lastName}
                        </div>

                        <div>
                        <strong>Father Name:</strong> {values.father_name}
                        </div>

                        <div>
                        <strong>Mother Name:</strong> {values.mother_name}
                        </div>

                        <div>
                        <strong>Birthdate:</strong> {values.birthdate}
                        </div>

                        <div>
                        <strong>Gender:</strong> {values.gender}
                        </div>

                        <div>
                        <strong>Address:</strong> {values.address}
                        </div>

                        <div>
                        <strong>City:</strong> {values.city}
                        </div>

                        <div>
                        <strong>Country:</strong> {values.country}
                        </div>
                        <div>
                        <strong>Zipcode:</strong> {values.zipcode}
                        </div>
                        <div>
                        <strong>Phone Number:</strong> {values.phonenumber}
                        </div>
                        <div>
                        <strong>Email Address:</strong> {values.emailaddress}
                        </div>
                        <div>
                        <strong>Blood Group:</strong> {values.bloodgroup}
                        </div>
                        {/* <div>
                          <strong>Student Photo:</strong>
                          {values.studentphoto ? (
                            <img src={values.studentphoto} alt="Student Photo" style={{ maxWidth: "200px" }} />
                          ) : (
                            "No photo provided"
                          )}
                        </div> */}
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
