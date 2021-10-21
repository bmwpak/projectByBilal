const Submit = (props) => {

 // post data
    const postData = async (e) => {
		e.preventDefault();

		const { selection,engagement,CampaignName,

        //adset attributes

        AdsetName,date,location,startAge,endAge,gender,demographics,

        // adLevel

        adCreative,image,video,primaryText,headline,description,url} = props.submittingValues;

        console.log(props.submittingValues);

		const res = await fetch("/register" , {
			method : "POST" ,
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify({
				name,email,phone,profession,password,cpassword
			})
		});

		const data = await res.json();

		if(res.status === 422 || !data){
			window.alert("Invalid Registration Data!");
			console.log("Invalid Registration Data!");
		}else{
			window.alert("Registration Successfull!");
			console.log("Registration Successfull!");

		// 	// history.push('/login');
		// }

        

	};
    return(
            <>
            </>
        );

}