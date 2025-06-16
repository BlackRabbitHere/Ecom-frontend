import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const Order = () => {
    return (
        <div className="min-h-[800px] flex flex-col items-center justify-center">
            {/* Empty orders message */}
            <div className="flex flex-col items-center">
                <MdShoppingCart size={80} className="mb-4 text-slate-500" />
                <div className="text-3xl font-bold text-slate-700">
                    You have no orders yet
                </div>
                <div className="text-lg mt-2 text-slate-500">
                    Start shopping and your orders will appear here
                </div>
            </div>
            <div className="mt-6">
                <Link
                    to={"/"}
                    className="flex gap-2 items-center text-blue-500 hover:text-blue-600 transition"
                >
                    <MdArrowBack size={24} />
                    <span className="font-medium">Browse Products</span>
                </Link>
            </div>
        </div>
    );
};

export default Order;
