import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';

const Continent = () => {
    
    let [continents, setContinents]=useState([]);
    let [visible, setVisible]=useState(false);
    let [country, setCountry]=useState([]);
    let [cName, setCName]=useState("");
    const [cDetails,setCDetails]=useState("");
    const [countryDetails, setCountryDetails]=useState([])
    const[img,setImg]=useState("");

    const[totalcases,setTotalcases]=useState("");
    const[totaldeaths,setTotaldeaths]=useState("");
    const[totalrecovered,setTotalrecovered]=useState("");
    const[activecases,setActivecases]=useState("");
   
    useEffect(() => {
        axios.get("https://corona.lmao.ninja/v2/continents?all=true&sort=continents")
        .then(res => {
            setContinents(res.data);
            console.log(res)
        })
    }, [])

    // useEffect(() => {
    //     console.log(countryDetails);
    // }, [countryDetails])

    const setContries = (idx,val) => {
        setVisible(true);
        
        setCName(val.continent);
        console.log(val.continent, "qqqqqq")
        setCountry(val.countries);
        console.log(val.countries, "wwwwwww");

        setTotalcases(val.cases)
        setTotaldeaths(val.deaths)
        setTotalrecovered(val.recovered)
        setActivecases(val.active)

       

    }

    const HandleCountryChange = (e) =>{
        const items=e.target.value;
       // console.log(items,"ccccccccccccccccccccccccc")
        setCDetails(items);
         axios.get(`https://corona.lmao.ninja/v2/countries/${items}`)
        .then( res => {
            let arr = [];
            arr.push(res.data);
            setCountryDetails(arr);
            console.log(res.data);
        })
    }
    return (
        <>
        <div className="cardContainer">
            {
                continents.map(val => {
                    return(
                        <div className="card "  key={val.updated} onClick={()=>setContries(val.updated,val)}>{val.continent}</div>
                        
                        )
                })
            }
        </div>

        <div className="center">
            <div className="focus" > {cName}</div>

            <div className="cardContainer">
                <div className="cardDetails">Total Cases <div>{totalcases}</div></div>
            <div className="cardDetails">Total Deaths <div>{totaldeaths}</div></div>
            <div className="cardDetails"> Total Recovered <br /><div>{totalrecovered}</div></div>
            <div className="cardDetails">Active Cases <br/> <div>{activecases}</div></div>
            </div>
            
            {
            visible ? <div style={{backgroundColor: "yellow"}}>
            {
                <select className="select" onChange={HandleCountryChange}>
                   { 
                       country.map(values=>{
                           return(
                               <option value={values}>{values}</option>
                           )
                       })
                    }
                    
                </select>
                 
            }
            
               
            
        </div> 
        : null
         }
         {
        countryDetails && (countryDetails).map(value => {
            
                    return(
                        <>
                        
                             <img src={value.countryInfo.flag} alt="flag"></img>
                            <div className="cardContainer">
                            
                            
                            <div className="cardDetails">Total Cases <div>{value.cases}</div></div>
                            <div className="cardDetails">Total Deaths <div>{value.deaths}</div></div>
                            <div className="cardDetails"> Total Recovered <br /><div>{value.recovered}</div></div>
                            <div className="cardDetails">Active Cases <br/> <div>{value.active}</div></div>
                        </div>

                         </>
                    )
                })
     }
        </div>

        
        
        </>
    )
}

export default Continent;
