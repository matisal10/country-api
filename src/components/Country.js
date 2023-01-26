import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Country() {

    let lang = []

    const [country, setCountry] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { name } = useParams()

    useEffect(() => {
        const fetchCountryData = async () => {
            const res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
            const data = await res.json()
            setCountry(data)
            setIsLoading(false)
            console.log(data)
        }
        fetchCountryData()
    }, [name]);

    return (
        <>
            {isLoading ? <h1 className='flex items-center justify-center h-screen text-4xl uppercase tracking-widest text-gray-900 dark:text-white
                lg:text-7xl font-bold'>Loading...</h1> :
                <section className='pt-32 xl:max-w-full xl:mx-40 lg:mx-5 px-5 xl:px-0 h-screen '>
                    <Link className='bg-white text-gray-900 dark:bg-gray-500 dark:text-white pt-2 pb-3 pl-4 pr-6 rounded shadow font-bold tracking-wide animate-pulse' to="/">&larr; Back</Link>
                    {country.map(({ name, capital, region, tld, flags, population, subregion, currencies, languages, nativename, borders }) => (
                        <div className='xl:flex xl:justify-around lg:flex lg:justify-around  md:flex md:justify-around mt-10 grid grid-cols-1 '>
                            <div className='xl:w-3/5 xl:h-96 lg:w-2/3 lg:h-96 md:w-3/4 md:h-80 w-screen h-72'  >
                                <img src={flags.png} alt="" className=' w-5/6 h-full' />
                            </div>

                            <div>
                                <article key={name.common} className=' xl:justify-around'>
                                    <div>
                                        <h2 className='text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-10 mb-5'>{name.common}</h2>
                                    </div>

                                    <div className='xl:flex xl:items-center xl:justify-center md:flex md:items-center md:justify-center lg:flex lg:items-center lg:justify-center grid grid-cols-1'>
                                        <div className='mr-5'>
                                            <h5 className='font-bold text-gray-900 dark:text-white lg:text-lg '>Native Name: <span className='font-normal'>{name.official}</span> </h5>
                                            <h5 className='font-bold text-gray-900 dark:text-white lg:text-lg'>Population: <span className='font-normal'>{population}</span> </h5>
                                            <h5 className='font-bold text-gray-900 dark:text-white lg:text-lg'>Region: <span className='font-normal'>{region}</span> </h5>
                                            <h5 className='font-bold text-gray-900 dark:text-white lg:text-lg'>Sub Region: <span className='font-normal'>{subregion}</span> </h5>
                                            <h5 className='font-bold text-gray-900 dark:text-white lg:text-lg'>Capital: <span className='font-normal'>{capital}</span> </h5>
                                        </div>
                                        <div className='mb-5 md:mt-0 lg:mt-0 xl:mt-0 mt-6'>
                                            <h5 className='font-bold text-gray-900 dark:text-white lg:text-lg'>Top level domain: <span className='font-normal'>{tld}</span> </h5>
                                            <h5 className='font-bold text-gray-900 dark:text-white lg:text-lg'>Currencies: <span className='font-normal'>{currencies[0]}</span> </h5>
                                            <h5 className='font-bold text-gray-900 dark:text-white lg:text-lg'>Languages: <span className='font-normal'> {languages[0]}</span></h5>
                                        </div>


                                    </div>
                                    <div className='grid grid-cols-1 xl:pt-5 '>
                                        <h5 className='font-bold text-gray-900 dark:text-white lg:text-lg mb-2'>Border Countries: </h5>
                                        <div className='flex justify-between  '>

                                            {borders ? borders.map((c) => (
                                                <h5 className='dark:bg-gray-500 px-5 py-2 rounded-sm shadow bg-gray-200 dark:shadow-black' >{c}</h5>
                                            ))
                                                :
                                                <></>
                                            }
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    ))}
                </section>
            }
        </>
    )
}
