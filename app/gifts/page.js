'use client'

import { useState } from 'react'
import { usePaystackPayment } from 'react-paystack'
import { CreditCard, Gift, DollarSign } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

const giftOptions = [
    { id: 1, name: 'Honeymoon Fund', description: 'Contribute to our dream honeymoon' },
    { id: 2, name: 'Home Improvement Fund', description: 'Help us make our house a home' },
    { id: 3, name: 'Charity Donation', description: 'Make a donation to our chosen charity' },
]

const physicalGiftOptions = [
    { id: 1, name: 'Kitchen Appliances', link: 'https://example.com/registry/kitchen' },
    { id: 2, name: 'Home Decor', link: 'https://example.com/registry/decor' },
    { id: 3, name: 'Outdoor Gear', link: 'https://example.com/registry/outdoor' },
]

export default function GiftPage() {
    const { user } = useSelector(state => state.user)
    const [selectedGift, setSelectedGift] = useState(null)
    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const config = {
        reference: (new Date()).getTime().toString(),
        email: user?.email,
        amount: amount * 100, // Paystack amount is in kobo
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY// Replace with your actual public key
    }

    const initializePayment = usePaystackPayment(config)

    const onSuccess = (reference) => {
        console.log('Payment successful. Reference:', reference)
        console.log('Thank you for your gift! Your payment was successful.')
        // Here you would typically update your backend

        resetForm()
    }

    const onClose = () => {
        console.log('Payment cancelled. Please try again.')
    }

    const handleSubmit = (e) => {
        const email = user.email
        const name = user.name

        e.preventDefault()
        if (!selectedGift || !amount || !name || !email) {
            console.log('Please fill in all required fields')
            return
        }
        initializePayment(onSuccess, onClose)
    }


    useEffect(() => {
        // Ensure this runs only on the client side
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            if (user) {
                try {
                    dispatch(setCredentials(JSON.parse(user)));
                } catch (error) {
                    console.error("Error parsing user data from localStorage:", error);
                }
            }
        }
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-orange-800 mb-12">Wedding Gifts</h1>

                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold text-orange-700 mb-4 flex items-center">
                            <DollarSign className="h-6 w-6 mr-2" />
                            Monetary Gifts
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have created the following options:
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select a Gift Option</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {giftOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => setSelectedGift((prevSelected) => (prevSelected === option ? null : option))}
                                            className={`p-4 border rounded-md text-left transition duration-150 ease-in-out ${selectedGift?.id === option.id
                                                ? 'border-orange-500 ring-2 ring-orange-500'
                                                : 'border-gray-300 hover:border-orange-500'
                                                }`}
                                        >
                                            <h3 className="font-semibold text-gray-900">{option.name}</h3>
                                            <p className="text-sm text-gray-500">{option.description}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {selectedGift && (
                                <>
                                    <div>
                                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                                            Amount (NGN)
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">₦</span>
                                            </div>
                                            <input
                                                type="number"
                                                name="amount"
                                                id="amount"
                                                className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                                placeholder="0.00"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            value={user.name}
                                            readOnly
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            value={user.email}
                                            required
                                            readOnly />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message (Optional)
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="3"
                                            className="focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                        >
                                            <CreditCard className="h-5 w-5 mr-2" />
                                            Pay with Paystack
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold text-orange-700 mb-4 flex items-center">
                            <Gift className="h-6 w-6 mr-2" />
                            Other Gift Options
                        </h2>
                        <p className="text-gray-600 mb-6">
                            If you prefer to give a physical gift, we have registered at the following stores:
                        </p>
                        <ul className="space-y-4">
                            {physicalGiftOptions.map((option) => (
                                <li key={option.id}>
                                    <a
                                        href={option.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 border border-gray-300 rounded-md hover:border-orange-500 transition duration-150 ease-in-out"
                                    >
                                        <h3 className="font-semibold text-gray-900">{option.name}</h3>
                                        <p className="text-sm text-gray-500">Click to view our registry</p>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}