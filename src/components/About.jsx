import ProductCard from "./shared/ProductCard";

const About=()=>{
    const products = [
        {
            image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-m4-midnight-gallery1-202503?wid=4000&hei=3074&fmt=jpeg&qlt=90&.v=eE5XY1NucjRjZXpnbnZTeEdWQUdXOEN5aTN1Szd3bzB6QjA3QWdrUitrZ1djYmVDUzhhc1RUeW9wRE1pamIxTTczL0VhTmFwUWpXdlYycEJiOVl2QmR6bjJhWkgvT2tCdzFYemk5WGFrSVdDa3lNQlM2VUFiSHRiV1dlZnZaZjQ",
            productName: "MacBook Air",
            description:
            "The MacBook Pro 13 delivers powerful performance with the Apple M2 chip, a vibrant Retina display, and an all-day battery life—perfect for professionals and creatives seeking speed, portability, and precision.",
            specialPrice: 720,
            price: 780,
        },
        {
            image: "https://res.cloudinary.com/de5wsgonm/image/upload/v1750041682/AeroFit_SmartBand_povasj.png",
            productName: "AeroFit SmartBand 5",
            description:
            "Track your health with AeroFit SmartBand 5 – featuring heart rate monitor, sleep tracking, SpO2 sensor, and waterproof design. 14-day battery life.",
            specialPrice: 49.99,
            price: 60,
        },
        {
            image: "https://res.cloudinary.com/de5wsgonm/image/upload/v1750041528/Screenshot_2025-06-13_192940_x75qql.png",
            productName: "VisionBook Ultra 17",
            description:
            "Massive 17-inch display, Intel i7 processor, RTX 4060 GPU, and 32GB DDR5 RAM. Ideal for gamers and power users.",
            price: 1899,
            specialPrice: 1747.08,
        }
    ];
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
                About Us
            </h1>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <p className="text-lg mb-4">Welcome to our e-commerce store! We are dedicated to providing the
                        best products and services to our customers. Our mission is to offer
                        a seamless shopping experience while ensuring the highest quality of
                        our offerings.</p>
                </div>

                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <img 
                        src="https://res.cloudinary.com/de5wsgonm/image/upload/v1749828243/2741840_ps5nrj.jpg" 
                        alt="About Us"
                        className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                        />
                </div>
            </div>
            <div className="py-7 space-y-8">
                <h1 className="text-slate-800 text-4xl font-bold text-center">Our Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product,index)=>(
                        <ProductCard
                            key={index}
                            image={product.image}
                            productName={product.productName}
                            description={product.description}
                            specialPrice={product.specialPrice}
                            price={product.price}
                            about/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About;