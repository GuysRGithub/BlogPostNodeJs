import React from 'react'
const Newsletter = function () {
    return (
        <section className="mt-24 px-16 xl:px-32">
            <div className="relative">
                <img src={require("../../../assets/images/posts/newsletter.jpg").default} alt=""
                     className="h-128 w-full object-cover"/>
                <div className="center-inner p-12 bg-white opacity-4-5">
                    <h5 className="font-josesans color-primary-dark">Newsletter subscriber</h5>
                    <p className="color-gray fs-sm-2 mt-2">
                        We'll send you the best of our blog just once a month.
                    </p>
                    <div className="mt-2 flex">
                        <input placeholder="Email"
                               className="focus:outline-none border-solid border-black border px-3 fs-1 color-primary-dark"/>
                        <div
                            className="border border-4 border-black border-solid p-3 ml-3 cursor-pointer">Subscribe
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Newsletter