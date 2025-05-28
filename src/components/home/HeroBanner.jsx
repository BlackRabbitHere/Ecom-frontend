import { Swiper,SwiperSlide } from "swiper/react";
import {Pagination,EffectFade,Navigation, Autoplay} from 'swiper/modules'
import { BannerLists } from "../../utils";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';


import { Link } from "react-router-dom";
const colors = [
  'bg-[#FDC200]', 
  'bg-[#FF2C2C]', 
  'bg-[#21AD61]', 
  'bg-[#723DA6]', 
];


const HeroBanner=()=>{
    return (
        <div className="py-2 rounded-md">
            <Swiper
                grabCursor={true}
                autoplay={{
                    delay:4000,
                    disableOnInteraction: false,
                }}
                navigation
                modules={[Pagination,EffectFade,Navigation,Autoplay]}
                pagination={{clickable:true}}
                scrollbar={{draggable:true}}
                slidesPerView={1}>
                    {BannerLists.map((items,i)=>(
                        <SwiperSlide key={items.id}>
                            <div className={`carousel-item rounded-md h-auto min-h-[400px] sm:min-h-[500px] ${colors[i]}`}>
                                    <div className="flex flex-col lg:flex-row items-center justify-center h-full w-full px-4">
                                        <div className="w-full lg:w-1/2 p-4 flex justify-center ">
                                        <div className="text-center max-w-md">
                                            <h3 className="text-3xl text-white font-bold">
                                                {items.title}
                                            </h3>
                                            <h1 className="text-5xl text-white font-bold mt-2">
                                                {items.subtitle}
                                            </h1>
                                            <p className="text-white font-bold mt-4">
                                                {items.description}
                                            </p>
                                            <Link 
                                                className="mt-6 inline-block bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
                                                to="/products">
                                                Shop
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="w-auto max-h-60 sm:max-h-96 object-contain">
                                        <img src={items?.image} alt={items.title} className="max-h-72 sm:max-h-96 object-contain"></img>
                                    </div>
                                    </div>
                            </div>
                        </SwiperSlide>
                    ))}
                
            </Swiper>

        </div>
    )
}

export default HeroBanner;