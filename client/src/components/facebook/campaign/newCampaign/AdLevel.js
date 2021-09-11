import { Box , Card , Radio , FormControlLabel , RadioGroup ,FormControl, FormLabel } from '@material-ui/core';
import { useState } from 'react';


const AdLevel = (props) => {
     

    // ENGAGEMENT
     if(props.name=='Conversions'){

        

        
        const upload = (e) => {

            

            

                // const reader = new FileReader();
                // reader.onload = () =>{

                //     const img = new Image();
                //     img.src = e.target.files[0];
                   
                //     if(reader.readyState === 2){
                //         props.setImage(reader.result);
                //     }
                    
                // };
                // if(e.target.files[0]){
                // reader.readAsDataURL(e.target.files[0]);
                // }
                var reader = new FileReader();

                //Read the contents of Image File.
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = function (e) {

                //Initiate the JavaScript Image object.
                var image = new Image();

                //Set the Base64 string return from FileReader as source.
                image.src = e.target.result;

                //Validate the File Height and Width.
                image.onload = function () {
                    var height = this.height;
                    var width = this.width;
                    if (height < 700 || width < 700) {
                    alert("Height and Width must exceed 700px.");
                    return false;
                    }else{
                        if(reader.readyState === 2){
                                    props.setImage(reader.result);
                                }
                    return true;}
                };
                };
              
                      
            
        }
        
            

        return(
            <>     
                <legend style={{marginLeft:'-40%'}}>
                <br/>Ad Creative<br/><br/>

                    <RadioGroup row style={{marginLeft:'48%'}} defaultValue="Image"
                    value={props.adCreative} onchange={(e)=> props.setAdCreative(e.target.value)} >
                        <FormControlLabel value="Image" control={<Radio />} label="Image" />
                        <FormControlLabel value="Video" control={<Radio />} label="Video" style={{marginLeft:'3%'}} />
                        <FormControlLabel value="Carousel" control={<Radio />} label="Carousel" style={{marginLeft:'3%'}} />
                    </RadioGroup>
                    <br/>Add Media<br/><br/>

                        <fieldset><legend>Personalia:</legend>
                    <input type="file" onChange={upload} style={{marginLeft:'40%'}} /><br/>

                    <img src={props.image} style={{width:'200px',height:'auto',marginLeft:'80%',marginTop:'-5%'}} />
                    </fieldset>
                </legend>
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

export default AdLevel;
