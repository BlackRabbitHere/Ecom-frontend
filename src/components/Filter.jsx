import { FormControl, InputLabel, Select, MenuItem, Tooltip, IconButton, Button } from "@mui/material";
import { useEffect, useState } from "react";
import {FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch} from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";


// http://localhost:xxxx?Keyword=test&sortby=desc

const Filter=()=>{
    const categories=[
        {categoryId:1,categoryName:"Laptop"},
        {categoryId:2,categoryName:"Wearable"},
        {categoryId:3,categoryName:"Audio"},
    ];

    const [searchParams]= useSearchParams(); // provide the ability for keyword?
    const params = new URLSearchParams(searchParams); // provide query parameters
    const pathName = useLocation().pathname;
    const navigate= useNavigate();

    const [category,setCategory]=useState("all");
    const [sortOrder,setSortOrder]=useState("asc");
    const [searchTerm,setSearchTerm]=useState("");

    useEffect(()=>{
        const currentCategory=searchParams.get("category")||"all";
        const currentSortOrder=searchParams.get("sortby")||"asc";
        const currentSearchTerm=searchParams.get("keyword")||"";

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
    },[searchParams])

    // For search query
    useEffect(()=>{
        const handler=setTimeout(()=>{
            if(searchTerm){
                searchParams.set("keyword",searchTerm);
            }
            else{
                searchParams.delete("keyword");
            }
            navigate(`${pathName}?${searchParams.toString()}`);
        },700);

        return ()=>{
            clearTimeout(handler);
        }
    },[searchParams,searchTerm,navigate,pathName])

    const handleCategoryChange=(event)=>{
        const selectedCategory= event.target.value;
        if(selectedCategory==="all"){
            params.delete("category");
        }else{
            params.set("category",selectedCategory);
        }
        navigate(`${pathName}?${params}`);
        setCategory(event.target.value);
    };

    const toggleSortOrder=()=>{
        setSortOrder((prevOrder)=>{
            const newOrder=(prevOrder==="asc")?"desc":"asc";
            params.set("sortby",newOrder);
            navigate(`${pathName}?${params}`)
            return newOrder;
        })
    };

    const handleClearFilter=()=>{
        navigate({pathname: window.location.pathname});
    };


    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input 
                type="text"
                placeholder="Search Products"
                className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]" 
                value={searchTerm}
                onChange={(e)=>{setSearchTerm(e.target.value)}}/>
                <FiSearch className="absolute left-3 text-slate-800 size={20}"/>

            </div>

            {/* Category Selection */}
            <div className="flex sm:flex-row flex-col gap-4 items-center">
                <FormControl
                    className="text-slate-800 border-slate-700"
                    variant="outlined"
                    size="small">
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select 
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                        className="min-w-[120px] text-slate-800 border-slate-700"
                    >
                    <MenuItem value="all">All</MenuItem>
                    {categories.map((item)=>(
                        <MenuItem key={item.categoryId} value={item.categoryName}>{item.categoryName}</MenuItem>
                    ))}
                    </Select>
                </FormControl>

                {/* Sort Button and Clear Filter */}
                <Tooltip title="Sorted by price: asc">
                    <IconButton>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className="flex items-center gap-2 h-10"
                            onClick={toggleSortOrder}>
                            
                            SORT BY
                            {
                                sortOrder==="asc"?
                                (<FiArrowUp size={20}/>):(<FiArrowDown size={20}/>)
                            }
                            
                        </Button>
                    </IconButton>
                </Tooltip>
                <button 
                    className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none cursor-pointer"
                    onClick={handleClearFilter}
                    >
                    
                    <FiRefreshCw className="font-semibold" size={16}/>
                    <span className="font-semibold">Clear Filter</span>
                </button>
            </div>
        </div>
    )
}

export default Filter;