import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
  
  
export default Location = (props) => {

    

    
  
 
 const handleChange = async value => {
    props.setAdsetLocation(value);
  };
 
 
  
    return (
        <>

            <PlacesAutocomplete
                    value={props.adsetLocation}
                    onChange={props.setAdsetLocation}
                    onSelect={handleChange}

                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input style={{marginLeft:'46%',width:'51%',padding:'5px',border:'2px solid grey'}}
                         autoComplete="off"
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                        })}
                        />
                        <div className="autocomplete-dropdown-container" style={{marginLeft:'47.5%',width:'51%',textAlign:'left'}} >
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            
                            // inline style for demonstration purpose
                            const style =  { backgroundColor:suggestion.active?'white':'red'};
                            return (
                            <div {...getSuggestionItemProps(suggestion, {style})} 
                            style={{width:'auto',padding:'5px',borderBottom:'1px solid grey'}}>
                                <span><LocationOnIcon />{suggestion.description}</span>
                            </div>
                            );
                        })}
                        </div>
                    </div>
                    )}
                </PlacesAutocomplete>

        </>
      
    );
  }
