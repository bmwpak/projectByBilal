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
// import Submit from './Submit';



const sleep = (time: number | undefined) => new Promise((acc) => setTimeout(acc,time));




export default function CampaignForm() {

    // initial values

    const initialValues = {

        selection: '',
        engagement: '',
        CampaignName: '',

        //adset attributes

        AdsetName: '',
        date: '',
        location: '',
        startAge: 13,
        endAge: 65,
        gender: '',
        demographics:[],

        // adLevel

        AdName: '',
        adCreative: '',
        image: File,
        video: '',
        primaryText:'',
        headline:'',
        description:'',
        url:''
    };

    // for page refresh
    const [ savedData , setSavedData ] = useState(initialValues);

    // for campaign type selection
    const [optionValue, setOptionValue] = useState('Engagement');

    // to store value of selected radio group 
    const [ otherValue, setOtherValue] = useState('Post engagement');

    const [campaignNam,setCampaignNam] = useState('');    

    // for Adset

    // date
    const [adsetDate , setAdsetDate] = useState('');

    // location
    const [adsetLocation , setAdsetLocation] = useState('');

    // start age
    const [startAge , setStartAge] = useState(13);

    // end age
    const [endAge , setEndAge] = useState(65);

    //for gender
    const [gender , setGender] = useState('All');

    // for demographics
    const [demographics,setDemographics] = useState([]);

    // for adset name
    const [ adsetName , setAdsetName ] = useState('');

    const handleChange = (prop: React.ChangeEvent<HTMLInputElement>) => {
        
        setOptionValue((prop.target as HTMLInputElement).value);
      }; 



   
     // for ad level

    const [adName , setAdName] = useState('');

    const [adCreative , setAdCreative] = useState('Video');

    const [ image , setImage ] = useState();

    const [ video , setVideo ] = useState('');

    const [ primaryText , setPrimaryText ] = useState('');

    const [ headline , setHeadline ] = useState('');

    const [ description , setDescription ] = useState('');

    const [ url , setUrl ] = useState('');

    // const SelectRadio = (item: React.SetStateAction<string>) => {
        
    //     setOtherValue(item);

    // };   
    
    const submittingValues = {

        selection: optionValue,
        engagement: otherValue,
        CampaignName: campaignNam,

       //adset attributes

       AdsetName: adsetName,
       date: adsetDate,
       location: adsetLocation,
       startAge: startAge,
       endAge: endAge,
       gender: gender,
       demographics:demographics,

       // ad level

       AdName: adName,
       adCreative: adCreative,
       Image: image,
       video: video,
        primaryText:primaryText,
        headline:headline,
        description:description,
        url:url
    };

     // post data
    const postData = async () => {

        console.log(submittingValues);

		const { selection,engagement,CampaignName,

        //adset attributes

        AdsetName,date,location,startAge,endAge,gender,demographics,

        // adLevel

        AdName,adCreative,Image,video,primaryText,headline,description,url} = submittingValues;


       
      

        // const form = new FormData();

        // form.append('first',JSON.stringify(submittingValues));

        // console.log(image);
        for(var i = 0 ; i < 3 ; i++){

            if(i == 1){
                console.log('1');
                const res = await fetch("/saveNewCampFb" , {
                    method : "POST" ,
                    headers : {
                        
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify({
                        selection,engagement,CampaignName,

                //adset attributes

                AdsetName,date,location,startAge,endAge,gender,demographics,

                // adLevel

                AdName,adCreative,image,primaryText,headline,description,url

                
                    })
                });

                // const data = await res.json();

                // if(res.status === 422 || !data){
                //     window.alert("Invalid Registration Data!");
                //     console.log("Invalid Registration Data!");
                // }else{
                //     window.alert("Registration Successfull!");
                //     console.log("Registration Successfull!");			
                // }
            }else if( i == 0 ){         
                console.log('2');
                const form = new FormData();

                // campign

                form.append("selection",selection);
                form.append("engagement",engagement);
                form.append("CampaignName",CampaignName);

                // adset values

                form.append("AdsetName",AdsetName);
                form.append("date",date);
                form.append("location",location);
                form.append("startAge",startAge.toString());
                form.append("endAge",endAge.toString());
                form.append("gender",gender);
                form.append("demographics",demographics);

                // Ad-level values
               
                form.append("AdName",AdName);
                form.append("adCreative",adCreative);
                form.append("image",image);
                form.append("video",video);
                form.append("primaryText",primaryText);
                form.append("headline",headline);
                form.append("description",description);
                form.append("url",url);

               


                const resp = await fetch("/saveNewCampFb" , {
                    method : "POST" ,
                    headers : {
                       
                        "type": "form-data"
                    },
                     body : form
            
        
                
                   
                });
        
                const data1 = await resp.json();
        
                if(resp.status === 422 || !data1){
                    window.alert("Invalid Registration Data!");
                    console.log("Invalid Registration Data!");
                }else{

                    const res = await fetch("/saveNewCampFb" , {
                        method : "POST" ,
                        headers : {
                            
                            "Content-type" : "application/json"
                        },
                        body : JSON.stringify({
                            selection,engagement,CampaignName,
    
                    //adset attributes
    
                    AdsetName,date,location,startAge,endAge,gender,demographics,
    
                    // adLevel
    
                    AdName,adCreative,image,primaryText,headline,description,url
    
                    
                        })
                    });

                    window.alert("Registration Successfull!");
                    console.log("Registration Successfull!");
                }
            }
        }

	};

    // props.setCreateNew(submittingValues);

    useEffect(() => {
        const data = String(window.localStorage.getItem('saved'));
        const formData = JSON.parse(data);
        // setSavedData(formData);
    //     setSavedData({
    //         selection: formData.selection,
    //     engagement: formData.engagement,
    //     CampaignName: formData.CampaignName,

    //    //adset attributes

    //    AdsetName: formData.AdsetName,
    //    date: formData.date,
    //    location: formData.location,
    //    startAge: formData.startAge,
    //    endAge: formData.endAge,
    //    gender: formData.gender,
    //    demographics:formData.demographics,
    //     });

        // for campaign page
        setOptionValue(formData.selection);
        setOtherValue(formData.engagement);
        setCampaignNam(formData.CampaignName);

        // // for adset page
        setAdsetDate(formData.date);
        setAdsetLocation(formData.location);
        setStartAge(formData.startAge);
        setEndAge(formData.endAge);
        setGender(formData.gender);
        setDemographics(formData.demographics);
        setAdsetName(formData.AdsetName);

        //for ad-level

        setAdName(formData.AdName);
        setAdCreative(formData.adCreative);
        setImage(formData.image);
        setVideo(formData.video);
        setPrimaryText(formData.primaryText);
        setHeadline(formData.headline);
        setDescription(formData.description);
        setUrl(formData.url);

    },[]);

    useEffect(() =>{
        window.localStorage.setItem("saved",JSON.stringify(submittingValues));
    });

  return(
        <>
        <Card>
            <CardContent>
                <FormikStepper
               
                 initialValues={savedData} 
                 
                 onSubmit = { async (values) => {
                    await sleep(3000);

                        

                        
                        // submittingValues.date=adsetValues.date;
                        // submittingValues.location=adsetValues.location;
                        
                        // setRecords([...adsetValues,adsetRecord]);

                        

                        // console.log('values' , submittingValues);
                        if(submittingValues.selection == 'Brand Awareness'){
                            if((submittingValues.adCreative == 'Image' && submittingValues.Image == '')||
                            (submittingValues.adCreative == 'Video' && submittingValues.video == '')){
                                alert('please select '+submittingValues.adCreative);
                            }else if(submittingValues.CampaignName==''||submittingValues.AdsetName==''||submittingValues.location==''||
                            submittingValues.primaryText==''||submittingValues.headline==''||submittingValues.description==''||
                            submittingValues.url==''){
                                alert('Fill all input fields');
                            }else{
                                const form = new FormData();

                                form.append("first",image);
                
                                const resp = await fetch("/saveFiles" , {
                                    method : "POST" ,
                                    headers : {
                                       
                                        "type": "formData"
                                    },
                                     body : form
                            
                        
                                
                                   
                                });
                                {postData()}
                            }
                        }else if(submittingValues.selection == 'Traffic'){
                            if((submittingValues.adCreative == 'Image' && submittingValues.Image == '')||
                            (submittingValues.adCreative == 'Video' && submittingValues.video == '')){
                                alert('please select '+submittingValues.adCreative);
                            }else if(submittingValues.CampaignName==''||submittingValues.AdsetName==''||submittingValues.location==''||
                            submittingValues.primaryText==''||submittingValues.headline==''||submittingValues.description==''||
                            submittingValues.url==''||submittingValues.AdName==''){
                                alert('Fill all input fields');
                            }else{
                                {postData()}
                            }
                        }else if((submittingValues.selection == 'Engagement')&&(submittingValues.engagement == 'Post engagement')){
                            if((submittingValues.adCreative == 'Image' && submittingValues.Image == '')||
                            (submittingValues.adCreative == 'Video' && submittingValues.video == '')){
                                alert('please select '+submittingValues.adCreative);
                            }else if(submittingValues.CampaignName==''||submittingValues.AdsetName==''||submittingValues.location==''||
                            submittingValues.primaryText==''||submittingValues.url==''||submittingValues.AdName==''){
                                alert('Fill all input fields');
                            }else{
                                {postData()}
                            }
                        }else if((submittingValues.selection == 'Engagement')&&(submittingValues.engagement == 'Page likes')){
                            if((submittingValues.adCreative == 'Image' && submittingValues.Image == '')||
                            (submittingValues.adCreative == 'Video' && submittingValues.video == '')){
                                alert('please select '+submittingValues.adCreative);
                            }else if(submittingValues.CampaignName==''||submittingValues.AdsetName==''||submittingValues.location==''||
                            submittingValues.primaryText==''||submittingValues.AdName==''){
                                alert('Fill all input fields');
                            }else{
                                {postData()}
                            }
                        }else if(submittingValues.selection == 'Video Views'){
                            if((submittingValues.adCreative == 'Video' && submittingValues.video == '')){
                                alert('please select '+submittingValues.adCreative);
                            }else if(submittingValues.CampaignName==''||submittingValues.AdsetName==''||submittingValues.location==''||
                            submittingValues.primaryText==''||submittingValues.headline==''||submittingValues.description==''||
                            submittingValues.url==''||submittingValues.AdName==''){
                                alert('Fill all input fields');
                            }else{
                                {postData()}
                            }
                        }else if(submittingValues.selection == 'Lead Generation'){
                            if((submittingValues.adCreative == 'Video' && submittingValues.video == '')){
                                alert('please select '+submittingValues.adCreative);
                            }else if(submittingValues.CampaignName==''||submittingValues.AdsetName==''||submittingValues.location==''||
                            submittingValues.primaryText==''||submittingValues.headline==''||submittingValues.description==''||submittingValues.AdName==''){
                                alert('Fill all input fields');
                            }else{
                                {postData()}
                            }
                        }else if(submittingValues.selection == 'Messages'){
                            if((submittingValues.adCreative == 'Video' && submittingValues.video == '')){
                                alert('please select '+submittingValues.adCreative);
                            }else if(submittingValues.CampaignName==''||submittingValues.AdsetName==''||submittingValues.location==''||
                            submittingValues.primaryText==''||submittingValues.headline==''||submittingValues.description==''||submittingValues.AdName==''){
                                alert('Fill all input fields');
                            }else{
                                {postData()}
                            }
                        }if(submittingValues.selection == 'Conversions'){
                            if((submittingValues.adCreative == 'Image' && submittingValues.Image == '')||
                            (submittingValues.adCreative == 'Video' && submittingValues.video == '')){
                                alert('please select '+submittingValues.adCreative);
                            }else if(submittingValues.CampaignName==''||submittingValues.AdsetName==''||submittingValues.location==''||
                            submittingValues.primaryText==''||submittingValues.headline==''||submittingValues.description==''||
                            submittingValues.url==''||submittingValues.AdName==''){
                                alert('Fill all input fields');
                            }else{
                                {postData()}                                   

                                };
                            }
                        }
                        
                    
                }
                

                enableReinitialize>
                    
                        <FormikStep label="Campaign" 
                       
                        >
                        <Box paddingBottom={2}>
                        <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>

                        
                        <RadioGroup name="selection" value={optionValue} onChange={handleChange}>
                        <table className="table">
                        
                            <tr>
                                <th>Awareness</th>
                                <th>Consideration</th>
                                <th>Conversion</th>
                            </tr>
                            
                            <tr>                                
                                <td>
                                
                                    <FormControlLabel value="Brand Awareness" control={<Radio />} label="Brand Awareness" />
                                </td>
                                <td>
                                     <FormControlLabel value="Traffic" control={<Radio />} label="Traffic" /><br/>
                                    <FormControlLabel value="Engagement" control={<Radio />} label="Engagement" />
                                    <FormControlLabel value="Video Views" control={<Radio />} label="Video Views" />
                                    <FormControlLabel value="Lead Generation" control={<Radio />} label="Lead Generation" />
                                    <FormControlLabel value="Messages" control={<Radio />} label="Messages" />
                                    
                                </td>
                                <td>
                                    <FormControlLabel value="Conversions" control={<Radio />} label="Conversions" />
                                </td>
                            </tr>
                            <tr>                        

                           

                            </tr>
                            </table>
                            </RadioGroup>
                            </FormControl>
                        
                        </Box>
                        <CampaignSelect id="1" name={optionValue} setOtherValue={setOtherValue} otherValue={otherValue} />
                        <Box paddingBottom={2}>
                            
                             <Field fullWidth name="CampaignName"
                             value={campaignNam} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setCampaignNam((e.target as HTMLInputElement).value)}                    
                              component={TextField} label="Campaign Name" /><br/>

                              <label style={{marginLeft:'43%',color:'blue'}}>
                                If input is empty then 'New Campaign' will be written</label>
                         
                        </Box>
                      
                        
                        </FormikStep>
                        <FormikStep label = "Ad set" 
                        
                        >
                            <Box paddingBottom={2}>
                        <AdsetSetting id="1" name={optionValue}
                         adsetDate={adsetDate}
                         setAdsetDate={setAdsetDate}
                         adsetLocation={adsetLocation}
                         setAdsetLocation={setAdsetLocation}
                         startAge={startAge}                         
                         setStartAge={setStartAge}
                         endAge={endAge}
                         setEndAge={setEndAge}
                         gender={gender}
                         setGender={setGender}
                         setDemographics={setDemographics}
                         demographics={demographics}
                         adsetName={adsetName}
                         setAdsetName={setAdsetName}
                         />
                        </Box>
                        </FormikStep>
                        <FormikStep label = "Ad Creation" >
                            <Box paddingBottom={2}>

                        <AdLevel name={optionValue} 
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

                        />
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
