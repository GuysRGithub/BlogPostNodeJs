import React from "react";
import HeaderLight from "../../components/Shared/HeaderLight";
import FooterLight from "../../components/Shared/FooterLight";

export default function () {
    return (<div>
            <HeaderLight/>

            <section className="entry-section mt-24 px-32">
                <div className="flex justify-between my-2">
                    <h5 className="font-josesans color-dark-primary">Latest posts</h5>
                    <p className="color-gray-fade-primary">View all</p>
                </div>
                <div className="grid-cols-3 gap-16 grid">
                    <div>
                        <div>
                            <img className="img-post-fixed-height"
                                 src={require("../../../assets/images/posts/women-3051614_1920.jpg").default} alt=""/>
                        </div>
                        <div className="pr-6">
                            <h6 className="mt-lg-5 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">Lorem
                                Ipsum is simply dummy text of the printing and typesetting industry</h6>
                            <p className="color-gray-fade-primary italic fs-sm-2">30 May 2020</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="img-post-fixed-height"
                                 src={require("../../../assets/images/posts/chromehill-4724725_1920.jpg").default}
                                 alt=""/>
                        </div>
                        <div className="pr-6">
                            <h6 className="mt-lg-5 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">Lorem
                                Ipsum is simply dummy text of the printing and typesetting industry</h6>
                            <p className="color-gray-fade-primary italic fs-sm-2">30 May 2020</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="img-post-fixed-height"
                                 src={require("../../../assets/images/posts/memories-from.jpg").default} alt=""/>
                        </div>
                        <div className="pr-6">
                            <h6 className="mt-lg-5 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">Lorem
                                Ipsum is simply dummy text of the printing and typesetting industry</h6>
                            <p className="color-gray-fade-primary italic fs-sm-2">30 May 2020</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="img-post-fixed-height"
                                 src={require("../../../assets/images/posts/women-3051614_1920.jpg").default} alt=""/>
                        </div>
                        <div className="pr-6">
                            <h6 className="mt-lg-5 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">Lorem
                                Ipsum is simply dummy text of the printing and typesetting industry</h6>
                            <p className="color-gray-fade-primary italic fs-sm-2">30 May 2020</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="img-post-fixed-height"
                                 src={require("../../../assets/images/posts/chromehill-4724725_1920.jpg").default}
                                 alt=""/>
                        </div>
                        <div className="pr-6">
                            <h6 className="mt-lg-5 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">Lorem
                                Ipsum is simply dummy text of the printing and typesetting industry</h6>
                            <p className="color-gray-fade-primary italic fs-sm-2">30 May 2020</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="img-post-fixed-height"
                                 src={require("../../../assets/images/posts/memories-from.jpg").default} alt=""/>
                        </div>
                        <div className="pr-6">
                            <h6 className="mt-lg-5 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">Lorem
                                Ipsum is simply dummy text of the printing and typesetting industry</h6>
                            <p className="color-gray-fade-primary italic fs-sm-2">30 May 2020</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="entry-section mt-24 px-32">
                <div className="flex justify-between my-2">
                    <h5 className="font-josesans color-dark-primary">Popular posts</h5>
                    <p className="color-gray-fade-primary">View all</p>
                </div>
                <div className="grid-cols-4 gap-16 grid">
                    <div>
                        <div>
                            <img className="img-post-fixed-height-card"
                                 src={require("../../../assets/images/posts/GNispE-ssZQyBTMJbGDDsMhq.jpg").default}
                                 alt=""/>
                        </div>
                        <div className="pr-6 bg-white shadow-md px-3 py-5">
                            <h6 className="mt-lg-5 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">Lorem
                                Ipsum</h6>
                            <p className="color-gray-primary fs-sm-2">Lorem ipsum dolor sit amet, consectetur
                                adipisicing </p>
                            <p className="color-gray-fade-primary italic fs-sm-2">30 May 2020</p>
                            <div className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read More<i
                                className="fa fa-arrow-right ml-2"/></div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="img-post-fixed-height-card"
                                 src={require("../../../assets/images/posts/rowan-chestnut-175871-unsplash-205x300.jpg").default}
                                 alt=""/>
                        </div>
                        <div className="pr-6 bg-white shadow-md px-3 py-5">
                            <h6 className="mt-lg-5 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">Lorem
                                Ipsum</h6>
                            <p className="color-gray-primary fs-sm-2">Lorem ipsum dolor sit amet, consectetur
                                adipisicing </p>
                            <p className="color-gray-fade-primary italic fs-sm-2">30 May 2020</p>
                            <div className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read More<i
                                className="fa fa-arrow-right ml-2"/></div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="img-post-fixed-height-card"
                                 src={require("../../../assets/images/posts/beach-1867881_1920.jpg").default}
                                 alt=""/>
                        </div>
                        <div className="pr-6 bg-white shadow-md px-3 py-5">
                            <h6 className="mt-lg-5 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">Lorem
                                Ipsum</h6>
                            <p className="color-gray-primary fs-sm-2">Lorem ipsum dolor sit amet, consectetur
                                adipisicing </p>
                            <p className="color-gray-fade-primary italic fs-sm-2">30 May 2020</p>
                            <div className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read More<i
                                className="fa fa-arrow-right ml-2"/></div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="img-post-fixed-height-card"
                                 src={require("../../../assets/images/posts/sunrise-1014710_1920.jpg").default}
                                 alt=""/>
                        </div>
                        <div className="pr-6 bg-white shadow-md px-3 py-5">
                            <h6 className="mt-lg-5 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">Lorem
                                Ipsum</h6>
                            <p className="color-gray-primary fs-sm-2">Lorem ipsum dolor sit amet, consectetur
                                adipisicing </p>
                            <p className="color-gray-fade-primary italic fs-sm-2">30 May 2020</p>
                            <div className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read More<i
                                className="fa fa-arrow-right ml-2"/></div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="img-post-fixed-height-card"
                                 src={require("../../../assets/images/posts/traveller-1149973_1920.jpg").default}
                                 alt=""/>
                        </div>
                        <div className="pr-6 bg-white shadow-md px-3 py-5">
                            <h6 className="mt-lg-5 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">Lorem
                                Ipsum</h6>
                            <p className="color-gray-primary fs-sm-2">Lorem ipsum dolor sit amet, consectetur
                                adipisicing </p>
                            <p className="color-gray-fade-primary italic fs-sm-2">30 May 2020</p>
                            <div className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read More<i
                                className="fa fa-arrow-right ml-2"/></div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="mt-24 px-32">
                <div className="relative">
                    <img src={require("../../../assets/images/posts/newsletter.jpg").default} alt=""
                         className="h-128 w-full object-cover"/>
                    <div className="center-inner p-12 bg-white opacity-4-5">
                        <h5 className="font-josesans color-dark-primary">Newsletter subscriber</h5>
                        <p className="color-gray-fade-primary fs-sm-2 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ipsa maiores nam nulla
                            obcaecati, sapiente similique! Cupiditate dolorum earum nobis non odio odit praesentium,
                            quibusdam reprehenderit tempora temporibus, totam vitae?
                        </p>
                        <div className="mt-2 flex">
                            <input placeholder="Email"
                                   className="focus:outline-none border-solid border-black border px-3"/>
                            <div
                                className="border border-4 border-black border-solid p-3 ml-3 cursor-pointer">Subscribe
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <FooterLight/>
        </div>
    )
}
