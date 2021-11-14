// import { useState } from "react";


// const Show = () => {

//     const arrToShow = [];
    

//     const [fb,setFb] = useState({
//         facebook:false,
//         google:false
//     });

//     const array=["Facebook","Google"];

//     const add = (values) =>{
       
//         console.log(fb);

//         // arrToShow.push();

//         // arrToShow.map(r=>{
//         //     console.log(r);
//         // });

//     }

//     return(
//         <>
//         <form
//         initialValues={{
//             facebook:'unchecked',
//             google:'unchecked'
//         }
//         }
//          autoComplete="off" onSubmit={(values)=>{
//             values.preventDefault();
//             console.log("vvv",values)}}>
//             <ul style={{listStyleType:"none"}}>
           
//                 <li><input name="facebook" value="Facebook" type="checkbox" autoComplete="off" /> Facebook</li>
//                 <li><input name="google" value="Google" type="checkbox" autoComplete="off" /> Google</li>
//                 <li><input type="Submit" autoComplete="off" /></li>
            
//             </ul>
//             </form>
//         </>
//     );

// };

// export default Show;

import React from 'react';
import { useHistory } from "react-router-dom";



// const Post = (props) =>{
//     const data = props.data;

//     console.log(data);

//     // useHistory('/Fb',{choosen:data});
// }

const Show=()=> {

    const history = useHistory();
    // constructor(){
    //     super();
        const state = {
            hobbies:[]
        }

    //     this.handleInputChange = this.handleInputChange.bind(this);
    // }

    const handleInputChange =(event) => {
        const target = event.target;
        var value = target.value;
        var index = state.hobbies.indexOf(target.value);
        
        if(target.checked){
            state.hobbies.push(value);
            // this.state.hobbies[value] = value;   
        }else{
            state.hobbies.splice(index,1);
        }
        
    }

    const post = () => {
        
        const data = state.hobbies;

            console.log(data);

            history.push('/fb',{choosen:data});
    } 

    const onSubmit = () =>{
        if(state.hobbies == ""){
            alert("Select a platform");
        }else{

            // this.state.useHistory.push() 
            post();           

        }
        
    }

    return(
            <div>
                <div class="row">
                    <div class="col-md-6 offset-md-4">
                        <br /><br />
                        <h3>Choose Platforms</h3><br />
                        
                        <div class="form-row">
                            <div class="form-group col-md-6 font-weight-bold">
                                <label>Platforms Avialable :</label><br />
                                <div class="form-check form-check-inline font-weight-bold">
                                    <input class="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh1" value="Facebook" onChange={handleInputChange} />
                                    <label class="form-check-label" for="inlineCheckboxh1">Facebook</label>
                                </div><br/><br/>
                                <div class="form-check form-check-inline font-weight-bold">
                                    <input class="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh2" value="Google" onChange={handleInputChange} />
                                    <label class="form-check-label" for="inlineCheckboxh2">Google</label>
                                </div><br/><br/>
                               
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col-md-12 text-center">
                                <button type="submit" class="btn btn-primary" onClick={()=>onSubmit()}>Submit</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )  
    }



export default Show;