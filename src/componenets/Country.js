import axios from 'axios';
import React from 'react';
import { useState,useEffect } from 'react';
//import {_cloneDeep} from "loadash";

const Country = () => {
    const[countriesList,setCountiesList]=useState([]);
    const[countriesListCopy,setCountiesListCopy]=useState([]);
    const [searchName,setSearchName]=useState([]);
    const [countryDetails,setCountryDetails]=useState([]);

   
    useEffect(() => {
        axios.get("https://corona.lmao.ninja/v2/countries?all=true&sort=countries")
        
        .then(response=>{
            setCountiesList(response.data)
            setCountiesListCopy(response.data)
            console.log(response)
           console.log(response.data)
        })

        
    }, [])

    const searchHandler =(e) =>{
        
         
         setSearchName(e.target.value.toLowerCase()) 
        };

         useEffect(() => {

           let data= countriesList.filter((el)=>{
                 
            let searchValue=el.country.toLowerCase();
            return searchValue.indexOf(searchName)!== -1;


            // let toBeFiltered=_cloneDeep(countriesList);

            //  toBeFiltered.filter((el)=>{
                 
            // let searchValue=el.country.toLowerCase();
            // return searchValue.indexOf(searchName)!== -1;
        })
        setCountiesListCopy(data);
        
         }, [searchName])
        
        
        
        
    

    const handleClick =(name)=>{
        //const name=e.target.value;
        axios.get(`https://corona.lmao.ninja/v2/countries/${name}`)
        .then(res => {
            let arr = [];
            arr.push(res.data);
            setCountryDetails(arr);
            console.log(res.data);
            
        })
    }
    return (
        <>
        <h2 class="H2Country">Country Wise List</h2>
            <input placeholder="search Country on change" className="input" style={{marginTop:"5rem"}} type="text" onChange={searchHandler} />
         <div className="flex">  
            <div className="cList">
                {
                    Object.keys( countriesListCopy).map(val=>{
                        console.log(countriesList);
                    return(
                        <>
                            
                            <div 
                            onClick={()=>handleClick(countriesList[val].country)}>
                            {countriesList[val].country}</div>
                        </>
                        )
                })
                }
            </div>
                <div className="right">
                {
                    countryDetails.map(value => {
                        console.log(value.flag);
                    return(
                        <>
                            <div className="country"><p>{value.country}</p></div>
                             <img src={value.countryInfo.flag} alt="flag"></img>
                                <div className="cardContainer_1" >
                                
                                
                                <div className="cardDetails_1">Total Cases <div>{value.cases}</div></div>
                                <div className="cardDetails_1">Total Deaths <div>{value.deaths}</div></div>
                                <div className="cardDetails_1"> Total Recovered <br /><div>{value.recovered}</div></div>
                                <div className="cardDetails_1">Active Cases <br/> <div>{value.active}</div></div>
                            </div>
                       

                         </>
                            )
                        })}
                 </div>
            </div> 
        </>
    )
}

export default Country
