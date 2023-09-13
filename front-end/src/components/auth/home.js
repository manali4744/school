import React from "react";

function Home() {
    return (       
        <div>
            <style>
                {`
                    body {
                        background-image: url("http://127.0.0.1:3000/img/background.avif");
                        background-size: cover; // Optional: Adjust the background size
                        // You can add more background-related styles here
                        height: 50vh; // Set the height to cover the entire viewport
                        margin: 0; // Remove default body margin
                        padding: 0; // Remove default body padding
                    }
                `}
            </style>
            <div>
            </div>
        </div>
    );
}

export default Home;
