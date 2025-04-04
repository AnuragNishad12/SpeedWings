import { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from "../NewPages/Footer";

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);
        try {
            const res = await fetch("https://wtsapis-llkf.onrender.com/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            setResponse({ success: false, message: "Failed to send email" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
           <Navbar /> 
           <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 mt-16">


            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-center">Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded" 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded" 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Message</label>
                        <textarea 
                            name="message" 
                            value={formData.message} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded" 
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white py-2 px-4 rounded w-full" 
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
                {response && (
                    <p className={`mt-4 text-sm text-center ${response.success ? "text-green-500" : "text-red-500"}`}>
                        {response.message}
                    </p>
                )}
            </div>
        </div>
        < Footer /> 
        </div>
    );
}
