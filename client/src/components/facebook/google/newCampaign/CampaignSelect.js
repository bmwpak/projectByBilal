import React , {useState} from 'react';
import { Box , Card , Radio , FormControlLabel , RadioGroup ,FormControl, FormLabel } from '@material-ui/core';
import './Form.css'
import { isPropertyAccessOrQualifiedName } from 'typescript';


const CampaignSelect = (props) => {

    

    // const [ appInstalls , setAppInstalls ] = useState('');

    const SelectedRadio = (e) => {


            props.setOtherValue(e.target.value); 
        
    };  

    if(props.name == "Engagement"){

        return(
            <>     
            <Box paddingBottom={2} style={{marginLeft:"-380px"}}>   
            <FormControl component="fieldset">
            <FormLabel component="legend" style={{color:"black",marginLeft:"-20px"}}><b>Engagement Type</b></FormLabel>
            <RadioGroup  aria-label="gender" name="engagement"  value={props.otherValue} onChange={SelectedRadio}>
                <FormControlLabel value="Post engagement" control={<Radio />} label="Post engagement" />
                <FormControlLabel value="Page likes" control={<Radio />} label="Page likes" />
            </RadioGroup>
            </FormControl>
            </Box>
            </>         
        );

    }else{  
        return(
            <>
            </>
        );                
    }

}

export default CampaignSelect;

// export {engagement};