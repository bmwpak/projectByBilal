
const EditArray = (props) =>{

    return(
        <>
         <li 
             style={{listStyle:'none',marginLeft:'25%',padding:'10px 10px',marginTop:'1px',borderBottom:'2px solid gray',textAlign:'left',width:'200px'}}>
                
                <button className="delete" onClick={() => props.onSelect(props.id)} type="button"                                
                style={{border:'none',color:'white',borderRadius:'50px',backgroundColor:'#0080ff',marginRight:'10px'}}>x</button>{props.text}
            </li>
        </>
    )

};

export default EditArray;