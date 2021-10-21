
import Dropzone from 'react-dropzone';

const Media = (props) => {
  const upload = async (e) => {

                props.setImage(e.target.files[0]);

                // const files = e.target.files[0]; 

                // const form = new FormData();

                // form.append("first",e.target.files[0]);

                // const res = await fetch("/saveNewCampFb" , {
                //     method : "POST" ,
                //     headers : {
                       
                //         "type": "formData"
                //     },
                //      body : form
                // //         selection,engagement,CampaignName,
        
                // // //adset attributes
        
                // // AdsetName,date,location,startAge,endAge,gender,demographics,
        
                // // // adLevel
        
                // // AdName,adCreative,image,video,primaryText,headline,description,url,
        
                
                   
                // });
        
                // const data = await res.json();
        
                // if(res.status === 422 || !data){
                //     window.alert("Invalid Registration Data!");
                //     console.log("Invalid Registration Data!");
                // }else{
                //     window.alert("Registration Successfull!");
                //     console.log("Registration Successfull!");
        
                //     // history.push('/login');
                // }
        
                       
                // var reader = new FileReader();

                // //Read the contents of Image File.
                // reader.readAsDataURL(e.target.files[0]);
                // reader.onload = function (e) {

                // //Initiate the JavaScript Image object.
                // var image = new Image();

                // //Set the Base64 string return from FileReader as source.
                // image.src = e.target.result;

                // //Validate the File Height and Width.
                // image.onload = function () {
                //     var height = this.height;
                //     var width = this.width;
                //     if (height < 700 || width < 700) {
                    
                //     props.setImage('');
                //     alert("Height and Width must exceed 700px");
                    
                //     }else{
                //         if(reader.readyState === 2){
                //                     props.setImage(reader.result);
                //                 }
                //     }
                // };
                // };    
        }

    
        const uploadVideo = (e) => {

            // props.setVideo(e.fileName);

            // alert(props.video)
            // // console.log(e);

            
                                props.setVideo(e.target.files[0]);

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
 

    // conversions
     if(props.adCreative == 'Image'){  

        

        return(
            <>     
               
               

               {(props.name == 'Video Views')? null:
                       <div> 
                    <input type="file" accept="images" name='image' onChange={upload} style={{marginLeft:'30%',marginTop:'10%'}}/><br/>

                    <img src={props.image} style={{width:'400px',height:'auto',marginLeft:'auto',marginBottom:'10%',marginTop:'1%'}} />
                    </div>}

                    
                    {/* <input type="file" onChange={uploadVideo} style={{marginLeft:'43%'}} /> */}

                    {/* <VideoPlayer src={props.video} width="50%"
                    //  style={{width:'auto',height:'auto',marginLeft:'auto',display:'block'}}
                      controls /> */}

                    
                   
               
            </>
        );
                   
    }else if(props.adCreative == 'Video'){

         return(
            <>                                    
                    <div>
                    {/* <Dropzone
                     
                    onDrop={uploadVideo}
                      >
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} style={{marginLeft:'18%',marginTop:'10%',marginBottom:'10%'}} />
                        </div>
                        </section>
                    )}
                    </Dropzone> */}

                    <input type="file" name='video' onChange={uploadVideo} style={{marginLeft:'30%',marginTop:'10%'}}/><br/>
                    </div>

                    {/* <FileThumbnail
                   file={props.video} /> */}

                        {/* <video style={{width:'200px',height:'auto',marginLeft:'80%',marginTop:'-5%'}} controls autoplay >
                    <source src={props.video.name} type="video/mp4" />
                    Your browser does not support the video tag. 
                   </video>
                     */}
                    
               
            </>
        );

    }else if(props.adCreative == 'Carousel'){  
        return(
            <>
            
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

export default Media;
