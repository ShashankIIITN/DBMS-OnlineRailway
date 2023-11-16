import React from "react";

import '../files.css'
import './footer.css'

function Footer() {
    return (
        <footer className="footer_main">
            <div className="footer_content">
                <div className="footer_flex left">
                    <h2>IIIT Railways</h2>
                    <hr></hr>
                    <h5>Your Comfort is our Responsibility!</h5>
                </div>
                {/* <div className="footer_flex right">
                    <p>All Trains</p>
                    <p>General Information</p>
                    <p>Agents</p>
                </div>
                <div className="footer_flex right">
                    <p>Refund Rules</p>
                    <p>Advertise with us</p>
                    <p>Enquiries</p>
                </div>
                <div className="footer_flex right">
                    <p>About Us</p>
                    <p>Career</p>
                    <p>FAQs</p>
                </div>
            </div>
            <div className="footer_end">
                <div className="footer_flex">
                    Copyright Ⓒ 2022 All Rights Reserved
                </div> */}
                {/* <div className="footer_flex right">
                    Designed and Developed with ♥
                </div> */}
            </div>
        </footer>
    );
}

export default Footer;