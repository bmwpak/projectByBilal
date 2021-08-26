import React , {useState} from 'react';
import { Box , Card , Radio , FormControlLabel , RadioGroup ,FormControl, FormLabel } from '@material-ui/core';



const RadioSelect = (props) => {

    const [ engagement , setEngagement ] = useState('Automated App Ads');

    // const [ appInstalls , setAppInstalls ] = useState('');

    const SelectedRadio = (e) => {

        props.SelectRadio(e.target.value);

        

            setEngagement(e.target.value);

            
            props.SelectRadio(e.target.value);

              

        
    };  

    if(props.name == "Engagement"){

        return(
            <>     
            <Box paddingBottom={2} style={{marginLeft:"-380px"}}>   
            <FormControl component="fieldset">
            <FormLabel component="legend" style={{color:"black",marginLeft:"-20px"}}><b>Engagement Type</b></FormLabel>
            <RadioGroup aria-label="gender" name="engagement" value={engagement} onChange={SelectedRadio}>
                <FormControlLabel value="Post engagement" control={<Radio />} label="Post engagement" />
                <FormControlLabel value="Page likes" control={<Radio />} label="Page likes" />
                <FormControlLabel value="Event responses" control={<Radio />} label="Event responses" />
            </RadioGroup>
            </FormControl>
            </Box>
            </>         
        );

    }else if(props.name == "App Installs"){

        return(
            <>     
            <Box paddingBottom={2} style={{marginLeft:"-380px"}}>   
            <FormControl component="fieldset">
            <FormLabel component="legend" style={{color:"black",marginLeft:"-20px",width:"250px"}}><b>App Installs Campaign Type</b></FormLabel>
            <RadioGroup aria-label="gender" name="appInstallsValue" value={engagement} onChange={SelectedRadio}>
                <FormControlLabel value="Automated App Ads" control={<Radio />} label="Automated App Ads" />
                <FormControlLabel value="App Ads" control={<Radio />} label="App Ads" />
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

export default RadioSelect;

// export {engagement};