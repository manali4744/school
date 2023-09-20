import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { Pick } from 'tslib';

function Enroll() {
  const navigate = useNavigate();
  
  useEffect(()=>{
    const is_admission = localStorage.getItem('admissionID');
    if (is_admission=='true') {
    }else{
      navigate('/enrollment')
    }

  }, [navigate]);

  return (
    <div className="container justify-content-center">
      <Card sx={{ width: 1000, marginBottom: 20}}>
        <CardContent>
            <FormikStepper
            initialValues={{
              firstName: "",
              lastName: "",
              father_name: "",
              mother_name: "",
              gender: "",
              address: "",
              city: "",
              country: "",
              zipcode: "",
              phonenumber: "",
              emailaddress: "",
              bloodgroup: "",
            }}
            onSubmit={(values) => {
              // Handle form submission here
              console.log("Form submitted with values:", values);
            }}
          >
            <FormikStep label="Student Info">
              <Box paddingBottom={2} marginBottom={2}>
                <Field
                  fullWidth
                  name="firstName"
                  component={TextField}
                  label="First Name"
                />
              </Box>
              <Box paddingBottom={2} marginBottom={2}>
                <Field
                  fullWidth
                  name="lastName"
                  component={TextField}
                  label="Last Name"
                />
              </Box>
              <Box paddingBottom={2} marginBottom={2}>
                <Field
                  fullWidth
                  name="father_name"
                  component={TextField}
                  label="Father Name"
                />
              </Box>
              <Box paddingBottom={2} marginBottom={2}>
                <Field
                  fullWidth
                  name="mother_name"
                  component={TextField}
                  label="Mother Name"
                />
              </Box>
              <Box paddingBottom={2} marginBottom={2}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <Field name="gender">
                  {({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  )}
                </Field>
              </FormControl>
            </Box>
            </FormikStep>
            <FormikStep label="Address">
            <Box paddingBottom={2} marginBottom={2}>
                <Field
                  fullWidth
                  name="address"
                  component={TextField}
                  label="Address"
                />
              </Box>
              <Box paddingBottom={2} marginBottom={2}>
                <Field
                  fullWidth
                  name="city"
                  component={TextField}
                  label="City"
                />
              </Box>
              <Box paddingBottom={2} marginBottom={2}>
                <Field
                  fullWidth
                  name="country"
                  component={TextField}
                  label="Country"
                />
              </Box>
              <Box paddingBottom={2} marginBottom={2}>
                <Field
                  fullWidth
                  name="zipcode"
                  type= "number"
                  component={TextField}
                  label="Zipcode"
                />
              </Box>
            </FormikStep>
            <FormikStep label="Other">
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="phonenumber"
                  type = "number"
                  component={TextField}
                  label="Phone number"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="emailaddress"
                  component={TextField}
                  label="Email Address"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="bloodgroup"
                  component={TextField}
                  label="Blood Group"
                />
              </Box>
            </FormikStep>
          </FormikStepper>
        </CardContent>
      </Card>
    </div>
  );
}

export default Enroll;


export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  console.log(currentChild)
  console.log(currentChild.props.label);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      onSubmit={async (values, helpers) => {
        console.log("onsubmit", values);
      
        // Handle form submission here
      
        if (isLastStep()) {
          // Update the initial values with the submitted values
          console.log(values, "------------------------")
          helpers.setValues(values);
          // Only setSubmitting to false if it's the last step
          await props.onSubmit(values, helpers);
          setCompleted(true);
          console.log("All input data:", values);
        } else {
          setStep((prevStep) => prevStep + 1);
        }
      }}
      
    >
      {({isSubmitting}) => (
        <Form autoComplete="off">
        <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
        </Stepper>
        {currentChild}
        {step > 0 ? (
          <Button disabled={isSubmitting} onClick={() => setStep((prevStep) => prevStep - 1)} color="primary" variant="contained"  style={{ marginRight: '20px' }}>Back</Button>
        ) : null}
        <Button disabled={isSubmitting} type="submit" color="primary" variant="contained"  style={{ marginRight: '20px' }}>
          {isSubmitting? 'Submitting': isLastStep() ? "Submit" : "Next"}
        </Button>
      </Form>
    )}
    </Formik>
  );
}