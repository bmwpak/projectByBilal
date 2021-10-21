import React , {useState} from 'react';
import {  TextField } from 'formik-material-ui';
import {Field } from 'formik';
import Select from "react-dropdown-select";
import Location from './Location';
import { array } from 'yup/lib/locale';
import { Box , Card , Radio , FormControlLabel , RadioGroup ,FormControl, FormLabel } from '@material-ui/core';
import EditArray from './EditArray';



const AdsetSetting = (props) => {

    


    const changeDate = (e) => {
        props.setAdsetDate(e.target.value);
    };

    //for demographics
    const [demographic, setDemographic] = useState('');

    // const [demographics , setDemographics] = useState([]);

    // delete demographic from array
    const deleteItem = (id) => {
        
        props.setDemographics((oldData)=>{
            return oldData.filter((element,index) =>{
                return index!=id;
            })
        })

    };

    

    // ENGAGEMENT
     if(props.name == "Engagement" ||props.name=='Brand Awareness'||props.name=='Traffic'||
     props.name=='Video Views'||props.name=='Lead Generation'||props.name=='Messages'||props.name=='Conversions'){

        

        return(
            <>     
            
            <Box>
                
                    <h5 style={{fontWeight:'bold',marginLeft:'-85%'}}>Schedule<br/>
                    <legend style={{fontWeight:'bold',fontSize:'17px'}}>

                       
                        
                          
                          
                            <br/><br/>Location<br/><br/>
                            <Location id="1" adsetLocation={props.adsetLocation} setAdsetLocation={props.setAdsetLocation} /> 
                            
                           
                            <b style={{marginLeft:'27%'}}>from : </b>
                     

                            <b style={{marginLeft:'3%'}}>to : </b>
                            <select defaultValue="65" value={props.endAge} name="cars" id="cars"onChange={(e)=>{
                                    props.setEndAge(e.target.value)}
                            }
                        
                             style={{marginLeft:'3%',width: '8%',padding:'5px',color:'black'}}>
                                {(()=>{
                                    let array = [];

                                    for(var i=13;i < 66 ;i++){
                                    array.push(<option value={i}>{i}</option>);
                                }
                                return array;
                                })()}
                            </select><hr/>


                           

                          
                            

                          
                        
                     </legend>
                    </h5>
                    <hr/>
                    <h5 style={{fontWeight:'bold',marginLeft:'-85%'}}>Adset Name<br/></h5>

            </Box>{(props.adsetLocation == '') ? 
            <Box paddingBottom={2} >   
            <Field disabled fullWidth name="AdsetName" component={TextField}  label="Ad-set Name"
            onClick={()=>{
                if(props.adsetLocation==''){
                    alert('Location is Empty !');
                }
            }}
             />
            </Box>:
           
            <Box paddingBottom={2} >   
            
            <Field fullWidth name="AdsetName"
            value={props.adsetName} onChange={(e)=>props.setAdsetName(e.target.value)}
            component={TextField}  label="Ad-set Name" /><br/>

            <label style={{marginLeft:'43%',color:'blue'}}>
              If input is empty then 'New Adset' will be written</label>
            
            </Box>
            }
            </>         
        );

    }
    else{  
        return(
            <>
            </>
        );                
    }

}

export default AdsetSetting;

// export {engagement};