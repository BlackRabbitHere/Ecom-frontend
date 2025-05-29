import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

const Contact=()=>{
    return (
        <div 
            className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center"
            style={{backgroundImage:"url('https://images.unsplash.com/photo-1612178537253-bccd437b730e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}
        >
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-4xl font-bold text-center mb-6">Contact us</h1>
                <p className="text-gray-600 text-center mb-4">
                    We would love to hear from you! Please fill out the form below or contact us directly
                </p>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input 
                            type="text" 
                            required
                            
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input 
                            type="email" 
                            required
                            
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            rows={4}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500"/>
                    </div>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Send Message
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <h2 className="text-lg font-semibold">Reach Out</h2>
                    <div className="flex flex-col items-center space-y-2 mt-4">
                        <div className="flex items-center">
                            <FaLinkedin className="text-blue-500 mr-2"/>
                            <a href="https://www.linkedin.com/in/kshitijkumar-/" className="text-gray-600">LinkedIn</a>
                        </div>

                        <div className="flex items-center">
                            <FaEnvelope className="text-blue-500 mr-2"/>
                            <a href="mailto:kshitijkumar514@gmail.com?body=My custom mail body" className="text-gray-600">kshitijkumar514@gmail.com</a>
                        </div>

                        <div className="flex items-center">
                            <FaGithub className="text-blue-500 mr-2"/>
                            <a href="https://github.com/BlackRabbitHere" className="text-gray-600">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Contact;