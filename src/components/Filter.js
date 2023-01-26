import React, { useState, useEffect } from 'react'

export default function Filter({ searchCountries, searchInput, setCountries }) {

    // const [regions, setRegions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const region = [
        {
            name: 'all'
        },
        {
            name: 'Africa'
        },
        {
            name: 'Asia'
        },
        {
            name: 'Americas'
        },
        {
            name: 'Oceania'
        },
        {
            name: 'Europe'
        },
        {
            name: 'Antarctic'
        }

    ]

    const fetchCountryByRegion = async (region) => {
        if (region !== "all" && region !== undefined ) {
            const res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
            const data = await res.json()
            console.log(region)
            setCountries(data)
            
        }
        else{
            const resAll = await fetch(`https://restcountries.com/v3.1/all`)
            const dataAll = await resAll.json()
            setCountries(dataAll)
        }
        
    }

    useEffect(() => {
        fetchCountryByRegion()

    }, []);

    return (
        <>
            <div className='flex items-start justify-between flex-col md:flex-row md:items-center md:justify-between 2xl:container 2xl:mx-auto'>
                <input autoComplete='off' className='py-2 px-4 dark:bg-gray-800 dark:text-white dark:placeholder:text-white rounded shadow h-14 placeholder-gray-900 ml-5 lg:w-1/2 w-10/12'
                    type="search" name="search" id="search" placeholder='Search by contry name'
                    value={searchInput} onChange={(e) => searchCountries(e.target.value)} />


                <select name="select" id="select" className='ml-5 md:mr-5 md:ml-0 py-2 px-4 rounded shadow m-5 xl:w-56 w-2/5 h-14 dark:bg-gray-800 dark:text-white'
                    value={region.name}
                    onChange={(e) => fetchCountryByRegion(e.target.value)}>
                    <option value="all">All</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Americas">Americas</option>
                    <option value="Europe">Europe</option>
                    <option value="Antarctic">Antarctic</option>
                </select>
            </div>
        </>

    )
}
