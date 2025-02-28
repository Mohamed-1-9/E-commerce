import React from 'react';
import useCategories from '../../customHooks/Categories';
import Loader from '../loader/loader';

function Category(props) {
    const {data,isLoading,isFetching}=useCategories()
    const allCategories =data?.data.data
    if(isLoading){
        return <div className='h-screen flex items-center justify-center'>
            <Loader color="black" width={100}/>
        </div>
    }
    return (
        <div className='gap-3 pt-14 grid bg-blue-50 md:grid-cols-3  lg:grid-cols-6'>
            {allCategories.map((product) => {
                    return <div className=' cursor-pointer bg-blue-100 rounded-xl overflow-hidden' key={product._id}>
                        <img className='w-full h-64' src={product.image} alt={product.name} />
                        <h3 className='pb-0 text-center'>{product.name}</h3>
                    </div>
                })}
        </div>
    );
}

export default Category;