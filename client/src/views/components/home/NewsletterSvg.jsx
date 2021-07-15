import React from 'react'

const NewsletterSvg = function () {
    return (
        <section className="mt-24 px-16 xl:px-32">
            <div className="relative flex justify-center sm:flex-wrap lg:flex-no-wrap items-center shadow-lg p-8">
                <div className="w-full">
                    <img src={require("../../../assets/images/svg/newsletter.svg").default} alt=""
                         className="h-128 w-full object-cover"/>
                </div>
                <div className="px-24 lg:w-6/12 bg-white opacity-4-5 sm:mt-8">
                    <h5 className="font-josesans fs-4 color-primary-dark">Newsletter subscriber</h5>
                    <p className="color-gray fs-sm-2 mt-2">
                        Join our subscribers list to get the latest news, updates and special offer delivered directly
                        in our inbox.
                        Get weekly emails about our blog post or monthly.
                        We'll send you the best of our blog just once a month.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <input placeholder="Email"
                               className="focus:outline-none border border-fade-gray-wide hover:border-highlight px-3 fs-1 color-primary-dark"/>
                        <div className="border border-fade-gray-wide hover:border-highlight py-2 px-3 inline-flex h-full">
                            <p className="color-yellow-light cursor-pointer fs-sm-2 font-bold font-roboto">Subscribe</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default NewsletterSvg