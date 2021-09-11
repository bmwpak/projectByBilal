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

                        <br/><span style={{marginLeft:'4%'}}>Start Date & Time</span><br/><br/>
                        
                            <input style={{marginLeft:'18%',width: '400px'}}
                                name="date"
                                type="datetime-local"
                                value={props.adsetDate}
                                onChange={changeDate}
                            /><br/>
                            <label style={{marginLeft:'43%',color:'blue'}}>
                                if you do not choose any data and time then at submission your current time will be written</label>
                            <hr/>

                            <br/><br/><h5 style={{fontWeight:'bold'}}>Audience</h5>
                            <br/><br/>Location<br/><br/>
                            <Location id="1" adsetLocation={props.adsetLocation} setAdsetLocation={props.setAdsetLocation} /> 
                            
                            <br/><br/>Age<br/><br/>
                            <b style={{marginLeft:'27%'}}>from : </b>
                            <select defaultValue="13" value={props.startAge} name="startAge" id="cars" onChange={(e)=>
                            {                                
                                props.setStartAge(e.target.value);
                            }
                        }
                             style={{marginLeft:'3%',width: '8%',padding:'5px',color:'black'}}>
                                {(()=>{
                                    let array = [];

                                    for(var i=13;i < 66 ;i++){
                                    array.push(<option value={i}>{i}</option>);
                                }
                                return array;
                                })()}
                            </select>

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

                            <br/>Gender<br/><br/>

                            <RadioGroup row style={{marginLeft:'48%'}} defaultValue="All" value={props.gender} onChange={(e)=>props.setGender(e.target.value)}>
                                <FormControlLabel value="All" control={<Radio />} label="All" />
                                <FormControlLabel value="Men" control={<Radio />} label="Men" style={{marginLeft:'3%'}} />
                                <FormControlLabel value="Women" control={<Radio />} label="Women" style={{marginLeft:'3%'}} />
                            </RadioGroup>

                            <br/><br/> <span style={{marginLeft:'5%'}}>Detailed Targeting </span><br/><br/>

                            <input style={{marginLeft:'30%',width: '600px',border:'2px solid gray',padding:'10px 10px'}}
                                preventDefault
                                name="demographics"
                                type="text"
                                value={demographic}
                                placeholder="Add demographics, interests or behaviors"
                                onChange={(e) => setDemographic(e.target.value)}
                            />
                            <span style={{marginTop:'7px',position:'absolute'}}>
                                <span className="addTag"
                                 preventDefault
                                onClick={() => {
                                    if(demographic == ''){
                                        return (<></>)
                                    }else{
                                        props.setDemographics((oldData) => {return [...oldData,demographic];
                                        });
                                        setDemographic('');
                                    }
                                }}
                                >
                                    +</span>
                            </span>
                            <br/>
                            

                            <div ><br/>
                                <ul className="menu" style={{marginLeft:'30%'}}>
                                {
                                    props.demographics.map((add,key)=>{
                                        return <EditArray id={key} text={add} onSelect={deleteItem} />
                                    })
                                }
                                </ul>
                            </div>
                        
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