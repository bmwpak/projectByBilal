import { Box, Button, Card , CardContent, StepLabel , Stepper ,Step , Radio , FormControlLabel , RadioGroup, CircularProgress, FormControl, FormLabel } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import {Field , Form , Formik , FormikConfig , FormikValues, ErrorMessage, FormikProvider} from 'formik';
import {  fieldToCheckbox, TextField } from 'formik-material-ui';
import React , { useState } from 'react';
import { object , mixed , number } from 'yup';
import * as Yup from 'yup';
import CampaignSelect  from './CampaignSelect';
import AdsetSetting  from './AdsetSetting';
import './Form.css'
import { useEffect } from 'react';
import NewCampaign from './NewCampaign';
import { initialState } from '../../../../reducer/UserReducer';
import AdLevel from './AdLevel';
import { VideocamOffRounded } from '@material-ui/icons';
import Location from './Location';
import { useHistory } from "react-router-dom";


// import Submit from './Submit';



const sleep = (time: number | undefined) => new Promise((acc) => setTimeout(acc,time));




export default function CampaignForm() {

    const history = useHistory();

    // initial values

    const initialValues = {

        email : '',
        businessName: '',
        website: '',
        desktopMobile: '',

        headline1: '',
        headline2: '',
        headline3: '',
        description1: '',
        description2: ''
    };

    // for page refresh
    const [ savedData , setSavedData ] = useState(initialValues);

    // for campaign type selection
    const [business, setBusiness] = useState('');

    // to store value of selected radio group 
    const [ website, setWebsite] = useState('');

    const [desktopMobile,setDesktopMobile] = useState('Desktop');    

    // for Adset

    // date
    const [headline1 , setHeadline1] = useState('');

    const [headline2 , setHeadline2] = useState('');

    const [headline3 , setHeadline3] = useState('');


    const [description1 , setDescription1] = useState('');

    const [description2 , setDescription2] = useState('');

    // location
    const [adsetLocation , setAdsetLocation] = useState('');

    

    const handleChange = (prop: React.ChangeEvent<HTMLInputElement>) => {
        
        setBusiness((prop.target as HTMLInputElement).value);
      }; 


      const [userData , setUserData] = useState({});

      const getData = async () => {
    
        try{
    
          const res = await fetch("/about" , {
            method:"GET",
            headers:{
              
              "Content-Type" : "application/json"
            }
        
          });
    
          const data = await res.json();
    
          setUserData(data);
    
          if(res.status != 200){
            const error = new Error(res.error);
            throw error;
          }
    
        }catch(err){
          console.log(err);
    
          history.push('/login');
    
        }
    
      }
   
     
    
    const submittingValues = {

        email : userData.email,
        businessName: business,
        website: website,
        desktopMobile: desktopMobile,

        headline1: headline1,
        headline2: headline2,
        headline3: headline3,
        description1: description1,
        description2: description2,

        adsetLocation: adsetLocation
   
    };

     // post data
    const postData = async () => {

        console.log(submittingValues);

		const {
            email,
            businessName,
            website,
            desktopMobile,
    
            headline1,
            headline2,
            headline3,
            description1,
            description2,
    
            adsetLocation
       
    } = submittingValues;      
      

    
        const form = new FormData();

       

                // form.append("businessName",businessName);
                // form.append("website",website);
                // form.append("desktopMobile",desktopMobile);

                // // adset values

                // form.append("headline1",headline1);
                // form.append("headline2",headline2);
                // form.append("headline3",headline3);
                // form.append("description1",description1);
                // form.append("description2",description2);

                // form.append("adsetLocation",adsetLocation);

               
               

               


                const resp = await fetch("/saveGoogleCamp" , {
                    method : "POST" ,
                    headers : {
                       
                        "Content-type": "application/json"
                    },
                     body : JSON.stringify({ 
                        email,
                        businessName,
                        website,
                        desktopMobile,
                
                        headline1,
                        headline2,
                        headline3,
                        description1,
                        description2,
                
                        adsetLocation})
            
        
                
                   
                });
        
                const data1 = await resp.json();
        
                if(resp.status === 422 || !data1){
                    window.alert("Invalid Registration Data!");
                    console.log("Invalid Registration Data!");
                }else{

                   
                }
                        
                    

                    window.alert("Registration Successfull!");
                    console.log("Registration Successfull!");
                }
            
    

	

    // props.setCreateNew(submittingValues);

    // props.setCreateNew(submittingValues);

    useEffect(() => {

        getData();
  
    } , []);

    useEffect(() => {
        const data = String(window.localStorage.getItem('google'));
        const formData = JSON.parse(data);
      

        setBusiness(formData.businessName);
        setWebsite(formData.website);
        setDesktopMobile(formData.desktopMobile);

        setHeadline1(formData.headline1);
        setHeadline2(formData.headline2);
        setHeadline3(formData.headline3);
        
        setDescription1(formData.description1);
        setDescription2(formData.description2);
        
        setAdsetLocation(formData.adsetLocation);
      
    },[]);

    useEffect(() =>{
        window.localStorage.setItem("google",JSON.stringify(submittingValues));
    });

  return(
        <>
        <Card>
            <CardContent>
                <FormikStepper
               
                 initialValues={savedData} 
                 
                 onSubmit = { async (values) => {
                    await sleep(3000);

                        

                        
                    
                        
                        
                            if(submittingValues.businessName==''||submittingValues.website==''||submittingValues.headline1==''||
                            submittingValues.headline2==''||submittingValues.headline3==''||submittingValues.description1==''||
                            submittingValues.description2==''||submittingValues.adsetLocation==''){
                                alert('Fill all input fields');
                            }else{                                
                                {postData()}
                            }                        
                        }
                        
                    
                }
                

                enableReinitialize>
                    
                        <FormikStep label="Campaign">
                        <Box paddingBottom={2}>

                        <Field fullWidth name="businessName"
                             value={business} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setBusiness((e.target as HTMLInputElement).value)}                    
                              component={TextField} label="Business Name" /><br/>

                              {/* <label style={{marginLeft:'43%',color:'blue'}}>
                                If input is empty then 'New Campaign' will be written</label> */}

                        </Box>
                        
                        <Box paddingBottom={2}>
                            
                             <Field fullWidth name="CampaignName"
                             value={website} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setWebsite((e.target as HTMLInputElement).value)}                    
                              component={TextField} label="Website Name" /><br/>

                              {/* <label style={{marginLeft:'43%',color:'blue'}}>
                                If input is empty then 'New Campaign' will be written</label> */}
                         
                        </Box>
                        <Box style={{marginLeft:"-90%"}}>
                        <br/>Platform<br/><br/>
                            <RadioGroup row style={{marginLeft:'48%'}} defaultValue="Desktop" value={desktopMobile} onChange={(e)=>setDesktopMobile(e.target.value)}>
                                <FormControlLabel value="Mobile" control={<Radio />} label="Mobile" />
                                <FormControlLabel value="Desktop" control={<Radio />} label="Desktop" style={{marginLeft:'3%'}} />
                            </RadioGroup>
                        </Box>
                      
                        
                        </FormikStep>
                        <FormikStep label = "Ad set">
                            <Box paddingBottom={2}>
                        
                          <Box style={{marginLeft:"-90%",color:'black',fontWeight:'bold'}}>
                        <br/>Ad Setup<br/><br/>
                        
                        </Box>
                        <Field fullWidth name="headline1"
                             value={headline1} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setHeadline1((e.target as HTMLInputElement).value)}                    
                              component={TextField} label="Headline 1" /><br/>

                        
                        <br/>
                        <Field fullWidth name="headline2"
                             value={headline2} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setHeadline2((e.target as HTMLInputElement).value)}                    
                              component={TextField} label="Headline 2" /><br/>
                        
                        
                        <br/>
                        <Field fullWidth name="headline3"
                             value={headline3} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setHeadline3((e.target as HTMLInputElement).value)}                    
                              component={TextField} label="Headline 3" /><br/>
                        
                        
                        <br/>
                        <Field fullWidth name="description1"
                             value={description1} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setDescription1((e.target as HTMLInputElement).value)}                    
                              component={TextField} label="Description 1" /><br/>
                        
                        
                        <br/>
                        <Field fullWidth name="description2"
                             value={description2} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setDescription2((e.target as HTMLInputElement).value)}                    
                              component={TextField} label="Description 2" /><br/>
                        
                        </Box><br/><br/>
                        <fieldset style={{borderColor:'black'}}>
                            <legend>Preview</legend><br/><br/>

                            <div style={{color:'black',width:'300px',position:'static',textAlign:'left',fontSize:'15px'}}>
                        {website}
                        </div>
                         <div style={{color:'blue',fontWeight:'bold',width:'300px',position:'static',textAlign:'left',fontSize:'20px'}}>
                        {headline1+" | "+headline2+" | "+headline3}
                        </div>
                        <div style={{color:'grey',fontWeight:'bold',width:'300px',position:'static',textAlign:'left'}}>
                        {description1+" | "+description2}
                        </div>
                        </fieldset>
                        <br/><br/>
                        </FormikStep>
                        <FormikStep label = "Ad Creation" >
                            <Box paddingBottom={2}>

                        {/* <AdLevel name={optionValue} 
                        adName={adName}
                        setAdName={setAdName}
                        otherValue={otherValue}
                        adCreative={adCreative}
                        setAdCreative={setAdCreative}
                        image={image}
                        setImage={setImage}
                        video={video}
                        setVideo={setVideo}
                        primaryText={primaryText}
                        setPrimaryText={setPrimaryText}
                        headline={headline}
                        setHeadline={setHeadline}
                        description={description}
                        setDescription={setDescription}
                        url={url}
                        setUrl={setUrl} 

                        />*/}

                            <br/><br/><b style={{marginLeft:'-85%'}}>Location</b><br/><br/>
                            <Location id="1" adsetLocation={adsetLocation} setAdsetLocation={setAdsetLocation} />
                        </Box>
                        <br/><br/><br/>
                        
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
            'Business Info.',
            'Ad Setup',
            'Location'
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
            <Form autoComplete="off" style={{width:"auto"}}  >
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
                {step > 0 ? <Button disabled={isSubmitting} variant="contained" style={{marginRight: '10px'}}
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
