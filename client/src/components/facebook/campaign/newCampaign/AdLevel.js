
import { VideoCall } from '@material-ui/icons';
import { useState } from 'react';
import VideoPlayer from 'react-video-js-player';
import Media from './Media';
import {  TextField } from 'formik-material-ui';
import {Field } from 'formik';
import { Box , Card , Radio , FormControlLabel , RadioGroup ,FormControl, FormLabel } from '@material-ui/core';

import videop from './video.mp4'


const AdLevel = (props) => {
     

    // conversions
     

        

        
        const upload = (e) => {
                       
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
                    
                    props.setImage('');
                    alert("Height and Width must exceed 700px");
                    return false;
                    }else{
                        if(reader.readyState === 2){
                                    props.setImage(reader.result);
                                }
                    return true;}
                };
                };    
        }

    
        const uploadVideo = (e) => {

            // props.setVideo(e.fileName);

            // alert(props.video)
            // // console.log(e);

            
                                props.setVideo(e);

                                // var file = e.target.files[0];
                                // const video = document.createElement('video')

                                // video.src = URL.createObjectURL(file)
                                // video.onload = (e) => {
                                  
                                //     if (video.readyState === 4) {
                                      
                                //         props.setVideo(video.result);
                                      
                                      
                                //     }
                                  
                                // }

                //                  var reader = new FileReader();

                // //Read the contents of Image File.
                // reader.readAsDataURL(e[0]);
                // reader.onload = function (e) {

                    
                //                     if (reader.readyState === 2) {
                                      
                //                         props.setVideo(reader.result);
                                      
                                      
                //                     }
                    
                // }

                        //    ==============

//     let reader = new FileReader();

// //if reading completed
// reader.onload = () => {
//      let blobData = e.target.result; //blob data
//      props.setVideo(blobData);
// };
// if(e){
// //read the file
// // reader.readAsDataURL(e);
// }                      
                   

        };
        
               

        return(
            <>     
                <legend style={{marginLeft:'0%'}}>
                <br/><span style={{marginLeft:'-84%'}}>Ad Creative</span><br/><br/>

                    {/* <RadioGroup row style={{marginLeft:'48%'}} defaultValue="Image"
                    value={props.adCreative} onchange={(e)=> props.setAdCreative(e.target.value)} >
                        <FormControlLabel value="Image" control={<Radio />} label="Image" />
                        <FormControlLabel value="Video" control={<Radio />} label="Video" style={{marginLeft:'3%'}} />
                        <FormControlLabel value="Carousel" control={<Radio />} label="Carousel" style={{marginLeft:'3%'}} />
                    </RadioGroup> */}
                    {(props.name == 'Video Views')?
                    <RadioGroup row style={{marginLeft:'8%'}} defaultValue="Video" value={props.adCreative} onChange={(e)=>props.setAdCreative(e.target.value)}>
                                <FormControlLabel value="Video" control={<Radio />} label="Video" />
                            </RadioGroup>
                    :
                    <RadioGroup row style={{marginLeft:'8%'}} defaultValue="Video" value={props.adCreative} onChange={(e)=>props.setAdCreative(e.target.value)}>
                                <FormControlLabel value="Video" control={<Radio />} label="Video" />
                        <FormControlLabel value="Image" control={<Radio />} label="Image" style={{marginLeft:'8%'}} />
                            </RadioGroup>
                    }


                            <div 
                            style={{border: '5px solid black',marginLeft: '0%',height:'auto',width:'90%'}} >

                    <Media id='1'
                    name={props.name}
                     adCreative={props.adCreative}
                        image={props.image}
                        setImage={props.setImage}
                        video={props.video}
                        setVideo={props.setVideo}
                     /></div>

                    {/* <br/>Add Media<br/><br/>

                    {(props.adCreative == 'Image')?
                       (<div> 
                    <input type="file" onChange={upload} style={{marginLeft:'43%'}} /><br/>

                    <img src={props.image} style={{width:'200px',height:'auto',marginLeft:'80%',marginTop:'-5%'}} />
                    </div>):null}

                    
                    {/* <input type="file" onChange={uploadVideo} style={{marginLeft:'43%'}} /> */}

                    {/* <VideoPlayer src={props.video} width="50%"
                    //  style={{width:'auto',height:'auto',marginLeft:'auto',display:'block'}}
                      controls /> */}

                    
                    {/* <div>
                    <Dropzone
                     
                    onDrop={uploadVideo}
                    accept="video/*"  >
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} style={{marginLeft:'80%',marginTop:'-5%'}} />
                        </div>
                        </section>
                    )}
                    </Dropzone>
                    </div> */}

                    {/* <FileThumbnail
                   file={props.video} /> */}

                        {/* <video style={{width:'200px',height:'auto',marginLeft:'80%',marginTop:'-5%'}} controls autoplay >
                    <source src={props.video.name} type="video/mp4" />
                    Your browser does not support the video tag. 
                   </video>
                     */} 

                    <div  syle={{marginLeft:'40%'}} >
                    <Box>     
                    <br/> <span style={{marginLeft:'-83%'}}>Primary Text </span><br/> 
                      <Field fullWidth name="primaryText"
                        value={props.primaryText} onChange={(e)=>props.setPrimaryText(e.target.value)}
                        component={TextField}  label="Tell People What Your Ad is About" /><br/>

                       
                        
                        </Box>

                        {(props.name == 'Engagement')? null:
                        <Box>
                         <br/> <span style={{marginLeft:'-89%'}}>Headline</span><br/> 
                        <Field fullWidth name="headline"
                        value={props.headline} onChange={(e)=>props.setHeadline(e.target.value)}
                        component={TextField}  label="Write a Short Headline" /><br/>

                        
                        </Box>}

                        {(props.name == 'Engagement')? null:

                        <Box>
                         <br/> <span style={{marginLeft:'-85%'}}>Description</span><br/> 
                        <Field fullWidth name="description"
                        value={props.description} onChange={(e)=>props.setDescription(e.target.value)}
                        component={TextField}  label="Add Additional Detales" />
                    
                        
                        </Box>
                        }
                        {((props.name == 'Lead Generation'|| props.name == 'Messages' || props.name == 'Traffic')||
                        ((props.name == 'Engagement')&&(props.otherValue == 'Page likes')))? null:
                        <Box>
                         <br/> <span style={{marginLeft:'-83%'}}>Website URL</span><br/> 
                        <Field fullWidth name="url"
                        value={props.url} onChange={(e)=>props.setUrl(e.target.value)}
                        component={TextField}  label="URL" /><br/>


                        <label style={{marginLeft:'73%',color:'blue'}}>
                        Write correct URL</label>
                        
                        </Box>
                        }<hr/>

                        <Box>     
                        <br/> <span style={{marginLeft:'-88%'}}>Ad Name</span><br/> 
                        <Field fullWidth name="AdName"
                        value={props.adName} onChange={(e)=>props.setAdName(e.target.value)}
                        component={TextField}  label="Ad Name" /><br/>

                       
                        
                        </Box>
                    </div>
                </legend>
            </>
        );
                   
    // }
    // else{  
    //     return(
    //         <>
    //         </>
    //     );                
    // }

}

export default AdLevel;
