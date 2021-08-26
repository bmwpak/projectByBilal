import { Box, Button, Card , CardContent, StepLabel , Stepper ,Step , Radio , FormControlLabel , RadioGroup, CircularProgress, FormControl, FormLabel } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import {Field , Form , Formik , FormikConfig , FormikValues, ErrorMessage} from 'formik';
import {  fieldToCheckbox, TextField } from 'formik-material-ui';
import React , { useState } from 'react';
import { object , mixed , number } from 'yup';
import * as Yup from 'yup';
import RadioSelect  from './RadioSelect';
import './Form.css'

const sleep = (time: number | undefined) => new Promise((acc) => setTimeout(acc,time));


export default function CampaignForm(this: any) {

    // initial values

    const initialValues = {

        selection: '',
        engagement: '',
        appInstallsValue: '',
        CampaignName: '',
        money: 0,
        description: ''
    };
    
    const [value, setValue] = useState('');

    const handleChange = (prop: React.ChangeEvent<HTMLInputElement>) => {
        
        setValue((prop.target as HTMLInputElement).value);
      }; 

    // to store value of selected radio group 
    const [ otherValue, setOtherValue] = useState('');

   

    const SelectRadio = (item: React.SetStateAction<string>) => {
        
        setOtherValue(item);

    };   
    
    const submittingValues = {

        selection: value,
        engagement: otherValue,
        appInstallsValue: otherValue,
        CampaignName: '',
        money: 0,
        description: ''
    };

  return(
        <>
        <Card>
            <CardContent>
                <FormikStepper
               
                 initialValues={initialValues} 
                 onSubmit = { async (values) => {
                    await sleep(3000);

                        submittingValues.CampaignName=values.CampaignName;

                        console.log('values' , submittingValues);
                        
                    
                }}
                enableReinitialize>
                    
                        <FormikStep label="Campaign" 
                        validationSchema={object({

                            CampaignName: Yup.string().required('isRequired')

                        })}
                        >
                        <Box paddingBottom={2}>
                        <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>

                        
                        <RadioGroup name="selection" value={value} onChange={handleChange}>
                        <table className="table">
                        
                            <tr>
                                <th>Awareness</th>
                                <th>Consideration</th>
                                <th>Conversion</th>
                            </tr>
                            
                            <tr>                                
                                <td>
                                
                                    <FormControlLabel value="Brand Awareness" control={<Radio />} label="Brand Awareness" />
                                    <FormControlLabel value="Reach" control={<Radio />} label="Reach" />
                                </td>
                                <td>
                                     <FormControlLabel value="Traffic" control={<Radio />} label="Traffic" />
                                    <FormControlLabel value="Engagement" control={<Radio />} label="Engagement" />
                                    <FormControlLabel value="App Installs" control={<Radio />} label="App Installs" />
                                    <FormControlLabel value="Video Views" control={<Radio />} label="Video Views" />
                                    <FormControlLabel value="Lead Generation" control={<Radio />} label="Lead Generation" />
                                    <FormControlLabel value="Messages" control={<Radio />} label="Messages" />
                                    
                                </td>
                                <td>
                                    <FormControlLabel value="Conversions" control={<Radio />} label="Conversions" />
                                    <FormControlLabel value="Catalog Sales" control={<Radio />} label="Catalog Sales" />
                                    <FormControlLabel value="Store Traffic" control={<Radio />} label="Store Traffic" />
                                </td>
                            </tr>
                            <tr>                        

                            <ErrorMessage name="selection">
                                    { msg => <div style={{ color: 'red' }}>{msg}</div> }
                            </ErrorMessage>

                            </tr>
                            </table>
                            </RadioGroup>
                            </FormControl>
                        
                        </Box>
                        <RadioSelect id="1" name={value} SelectRadio={SelectRadio} />
                        <Box paddingBottom={2}>
                            {(value=="")||(((value=='Engagement')||(value=='App Installs'))&&(otherValue=='')) ?
                        <Field fullWidth name="CampaignName" disabled
                        onClick={()=>{
                            if(value=='')
                            alert('please first select Campaign Type')
                            else
                            alert('please select type')
                        }}                        
                         component={TextField} label="Campaign Name" />
                         :
                            <Field fullWidth name="CampaignName"                          
                             component={TextField}  label="Campaign Name" />
                         }
                        </Box>
                      
                        
                        </FormikStep>
                        <FormikStep label = "Ad set" 
                        //  validationSchema={object({
                        //     money:mixed().when('conversion' , {
                        //         is: true,
                        //         then: number().required().min(1_000_000),
                        //         otherwise: number().required()
                        //     })
                        // })}
                        >
                            <Box paddingBottom={2}>
                        <Field fullWidth name="money" type="number" component={TextField} label="All the money I have" />
                        </Box>
                        </FormikStep>
                        <FormikStep label = "Ad Creation" >
                            <Box paddingBottom={2}>
                        <Field fullWidth name="description" component={TextField} label="Description" />
                        </Box>
                        </FormikStep>
                    
                </FormikStepper>
            </CardContent>
        </Card>
    </>
  )
}

export interface FormikStepProps extends Pick<FormikConfig<FormikValues> , 'children'|'validationSchema'>{
    label : string;
}

export function FormikStep({children }: FormikStepProps){
    return <>{ children }</>
}

export function FormikStepper({children , ...props}: FormikConfig<FormikValues>){

    const childArray = React.Children.toArray(children);

    const [ step , setStep] = useState(0);

    const currentChild = childArray[step] as React.ReactElement<FormikStepProps>;

    function isLastStep() {
        return step === childArray.length - 1;
    }

    const [ completed , setCompleted ] =  useState(false);

    function labels(){
        return[
            'Campaign Level',
            'Ad-Set',
            'Ad Creation'
        ];
    }

   

    return(
        <Formik {...props}
        validationSchema = {currentChild.props.validationSchema}
        onSubmit={async (values , helpers) => {
            if(isLastStep()){
                await props.onSubmit(values , helpers);
                setCompleted(true);
            }else {
                setStep((s)=> s+1);
            }
        }}
        >
            {({isSubmitting}) => (
            <Form autoComplete="off">
            <Stepper alternativeLabel activeStep={step}>
        {labels().map((child,index) => (
          <Step completed={step > index || completed}>
            <StepLabel>
                {<label style={{fontWeight: 'bold'}}>{child}</label>}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
                {currentChild}
                {step > 0 ? <Button disabled={isSubmitting } variant="contained" style={{marginRight: '10px'}}
                 color="primary" onClick={() => setStep((s) => s-1)}>Back</Button> : null}
                <Button
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                 disabled={isSubmitting} variant="contained" color="primary" type="submit">
                    {isSubmitting ? 'Submitting...' : isLastStep() ? 'Submit' : 'Next'}</Button>
            </Form>

            )}
        </Formik>
    );
}
