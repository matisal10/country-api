import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Filter from './Filter';

export default function Countries() {

    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filtered, setFiltered] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const fetchCountries = async () => {
        const res = await fetch(`https://restcountries.com/v3.1/all`)
        const data = await res.json()
        setCountries(data)
        console.log(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchCountries()
    }, [])


    const searchCountries = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput) {
            const filteredCountries = countries.filter((country) => (
                Object.values(country).join("").toLowerCase().includes(searchValue.toLowerCase())
                
            ))
            setFiltered(filteredCountries)
            console.log(filteredCountries)
            console.log(searchInput)
        }
        else {
            setFiltered(countries)
        }
        
    }

    return (
        <div className=''>
            {isLoading ? <h1 className='flex items-center justify-center h-screen text-4xl uppercase tracking-widest text-gray-900 dark:text-white
            lg:text-7xl font-bold'>Loading...</h1> :
                <div className=' bg-gray-100 dark:bg-gray-900'>
                    <div className='pt-32'>
                        <Filter searchCountries={searchCountries} searchInput={searchInput} setCountries={setCountries} />

                    </div>
                    {searchInput.length > 0 ?
                        <section className='grid grid-cols-1 gap-5 p-5 md:grid-cols-2 
                        lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:container 2xl:mx-auto'>
                            {filtered.map(({ name, capital, region, population,flags }) => (
                                <Link to={`/${name.common}`} key='name' >
                                    <article key={name.common} className="dark:bg-gray-800 bg-white rounded-lg shadow overflow-hidden dark:hover:bg-gray-700 hover:bg-gray-100 transition-all duration-300" >
                                        <img src={flags.png} alt="flag" style={{ "height": '200px' }} className='object-cover w-full' />
                                        <div className='p-4'>
                                            <h2 className='font-bold text-gray-900 text-2xl mb-3 dark:text-white '>{name.common}</h2>
                                            <ul>
                                                <li className='dark:text-white font-bold '>Population: <span className='font-normal'>{population}</span> </li>
                                                <li className='dark:text-white font-bold'>Region: <span className='font-normal'>{region}</span></li>
                                                <li className='dark:text-white font-bold '>Capital: <span className='font-normal'>{capital}</span></li>
                                            </ul>
                                        </div>

                                    </article>
                                </Link>
                            ))}
                        </section>
                        :
                        <section className='grid grid-cols-1 gap-5 p-5 md:grid-cols-2
                            lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:container 2xl:mx-auto'>
                            {countries.map(({ name, capital, region, population, flags }) => (
                                <Link to={`/${name.common}`} key='name' >
                                    <article key={name.common} className="dark:bg-gray-800 bg-white rounded-lg shadow overflow-hidden dark:hover:bg-gray-700 hover:bg-gray-100 transition-all duration-300" >
                                        <img src={flags.png} alt="flag" style={{ "height": '200px' }} className='object-cover w-full' />
                                        <div className='p-4'>
                                            <h2 className='font-bold text-gray-900 text-2xl mb-3 dark:text-white '>{name.common}</h2>
                                            <ul>
                                                <li className='dark:text-white font-bold '>Population: <span className='font-normal'>{population}</span> </li>
                                                <li className='dark:text-white font-bold'>Region: <span className='font-normal'>{region}</span></li>
                                                <li className='dark:text-white font-bold '>Capital: <span className='font-normal'>{capital}</span></li>
                                            </ul>
                                        </div>

                                    </article>
                                </Link>
                            ))}
                        </section>
                    }
                </div>
            }
        </div>
    )
}
