import { useEffect, useState } from "react";
import {FaShoppingCart} from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import {useDispatch} from "react-redux"
import { addToCart } from "../../store/action";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductCard=({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    about=false,
})=>{
    const [openProductViewModal,setOpenProductViewModal]=useState(false);
    const buttonLoader=false;
    const [selectedViewProduct,setSelectedViewProduct]=useState("");
    const isAvailable=quantity && Number(quantity)>0; // to check the quantity is available or out of stock
    const cartItems=localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    :[];

    const [isNowInCart, setIsNowInCart] = useState(false);

    // Sync local state with Redux cart
    useEffect(() => {
    const check = cartItems.some((item) => item.productId === productId);
    setIsNowInCart(check);
    }, [cartItems, productId]);

    const dispatch=useDispatch();

    const handleProductView=(product)=>{
        if(!about){
            setSelectedViewProduct(product);
            setOpenProductViewModal(true);
        }
    };

    const addToCartHandler=(cartItems)=>{
        dispatch(addToCart(cartItems,1,toast));
        setIsNowInCart(true);
    }

    return (
        <div className="flex flex-col justify-between h-full border border-slate-200 rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            {/* to open product page on clicking on it */}
            <div onClick={()=>{
                handleProductView({
                    id: productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice,
                })
            }} className="w-full overflow-hidden aspect-[3/2]">
                <img className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105" src={image} alt={productName}></img>    
            </div> 
            {/* Product Information */}
            <div className="p-4 flex flex-col justify-between flex-grow">
                <h2 onClick={()=>{
                    handleProductView({
                        id: productId,
                        productName,
                        image,
                        description,
                        quantity,
                        price,
                        discount,
                        specialPrice,
                    })
                }} className="text-lg font-semibold mb-2 cursor-pointer">{truncateText(productName,50)}</h2>
                {/* Description */}
                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">{truncateText(description,80)}</p>
                </div>
                {/* Product Price */}
                {/* if discounted price exist displayin special Price */}
                {!about && (
                    <div className="flex items-center justify-between">
                    {specialPrice?(
                        <div className="flex flex-col">
                        <span className="text-gray-400 line-through">
                            ${Number(price).toFixed(2)}
                        </span>
                        {/* Special Price */}
                        <span className="text-xl font-bold text-slate-700">
                            ${Number(specialPrice).toFixed(2)}
                        </span>
                    </div>
                    ):(
                        <span className="text-xl font-bold text-slate-700">
                            {" "}
                            ${Number(price).toFixed(2)}
                        </span>
                    )}
                    {/* Add to cart or stock out button */}
                    <div className="mt-auto">
                    {isNowInCart ? (
                    <Link to={"/cart"}>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center"
                    >
                        <FaShoppingCart className="mr-2" />
                        Go to Cart
                    </button>
                    </Link>
                    ) : (
                    <button
                        disabled={!isAvailable || buttonLoader}
                        onClick={() =>
                        addToCartHandler({
                            productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice,
                        })
                        }
                        className={`bg-blue-500 ${
                        isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"
                        } text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
                    >
                        <FaShoppingCart className="mr-2" />
                        {isAvailable ? "Add to Cart" : "Stock Out"}
                    </button>
                    )}
                    </div>

                </div>
                )}
                
                
                
            </div>
            
            <ProductViewModal 
            open={openProductViewModal}
            setOpen={setOpenProductViewModal}
            product={selectedViewProduct}
            isAvailable={isAvailable}
            />
        </div>

    )
}

export default ProductCard;