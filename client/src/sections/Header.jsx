import React from 'react';
import NavBar from "../components/NavBar.jsx";
import ContactBanner from "../components/ContactBanner.jsx";

const Header = () => {
    const date = new Date();
    const hourOfDay = date.getHours();
    const getGreetingWithMessage = (hourOfDay) => {
        let greeting;
        let customStyle = {
            color: "",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "left",
            paddingTop: "10px",
            paddingBottom: "10px",
            marginLeft: "40px",
        };

        if (hourOfDay <12) {
            greeting = "Good morning!";
            customStyle.color = "#3b82f6";
        }
        else if(hourOfDay <17) {
            greeting = "Good afternoon!";
            customStyle.color = "#ffc5c5";
        }
        else{
            greeting = "Good evening!";
            customStyle.color = "#34C759";
        }

        return { greeting, customStyle };
    }

    const { greeting, customStyle } = getGreetingWithMessage(hourOfDay);
    return (
        <section className="fixed top-0 right-0 left-0 z-50">
            <div className="max-w-7xl mx-auto">
                <ContactBanner/>
                <p style= {customStyle}>{greeting} We are glad you're here.</p>
                <NavBar/>
            </div>
        </section>
    )
}
export default Header
