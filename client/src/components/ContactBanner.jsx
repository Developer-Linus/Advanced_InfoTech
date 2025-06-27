import React from 'react'

const ContactBanner = () => {
    return (
        <div className="hidden sm:flex justify-center items-center gap-5 w-full text-neutral-900 bg-gradient-to-r from-blue-400 via-pink-200 to-emerald-400 shadow-sm mx-auto">
            <p className="mb-2 text-lg"><strong>Phone/WhatsApp:</strong> +254728712280/+254725694022</p>
            <p className="mb-2 text-lg"><strong>Email:</strong> info@advancedinfotech.co.ke</p>
            <p className="mb-2 text-lg"><strong>Location:</strong>Bihi Towers, 4th Floor, Moi Avenue.</p>
        </div>
    )
}
export default ContactBanner
