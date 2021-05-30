import Header from "../../components/Shared/Header.jsx";
import React, {useEffect, useState} from "react";
import Footer from "../../components/Shared/Footer.jsx";
import Axios from "axios";

function Home(props) {

    const postId = props.match.params.id;
    const [Post, setPost] = useState({});

    return (<div>
            <Header/>
            <br/>

            <div className="row mx-lg-4">
                <main id="main" className="col-8 fs-3 fw-4 pr-4 font-pt-serif">

                    <article>
                        <div>

                            <p>Restaurants range from inexpensive and informal lunching or dining places catering to
                                people
                                working nearby, with modest food served in simple settings at low prices, to expensive
                                establishments serving refined food and fine wines in a formal setting. In the former
                                case,
                                customers usually wear casual clothing.</p>

                            <div className="wp-block-image">
                                <figure className="float-left">
                                    <img
                                        src="https://appetitedemo.files.wordpress.com/2015/07/smachno_27.jpg?w=300"
                                        alt="Pub"
                                        className="img-border img-medium mr-3"
                                        style={{marginTop: "5px"}}
                                    /></figure>
                            </div>

                            <p>The core software is built by hundreds of community volunteers, and when you’re ready for
                                more there are thousands of plugins and themes available to transform your site into
                                almost
                                anything you can imagine. Over 60 million people have chosen WordPress to power the
                                place on
                                the web they call “home” — we’d love you to join the family.</p>

                            <p>Dummy text is text that is used in the publishing industry or by web designers to occupy
                                the
                                space which will later be filled with ‘real’ content. This is required when, for
                                example,
                                the final text is not yet available.This is required when, for example, the final text
                                is
                                not yet available.</p>


                            <h3 className="title mb-4 font-weight-bold">Our History</h3>


                            <p>WordPress started in 2003 with a single bit of code to enhance the typography of everyday
                                writing and with fewer users than you can count on your fingers and toes. Since then it
                                has
                                grown to be the largest self-hosted blogging tool in the world, used on millions of
                                sites
                                and seen by tens of millions of people every day.</p>


                            <p>This is required when, for example, the final text is not yet available. It is said that
                                song
                                composers of the past used dummy texts as lyrics when writing melodies in order to have
                                a
                                ‘ready-made’ text to sing with the melody. Dummy text is text that is used in the
                                publishing
                                industry or by web designers to occupy the space which will later be filled with ‘real’
                                content.</p>


                            <h3 className="title mb-4 font-weight-bold">Our Locations</h3>


                            <p>The core software is built by hundreds of community volunteers, and when you’re ready for
                                more there are thousands of plugins and themes available to transform your site into
                                almost
                                anything you can imagine. Over 60 million people have chosen WordPress to power the
                                place on
                                the web they call “home” — we’d love you to join the family.</p>


                            <p>WordPress started in 2003 with a single bit of code to enhance the typography of everyday
                                writing and with fewer users than you can count on your fingers and toes. Since then it
                                has
                                grown to be the largest self-hosted blogging tool in the world, used on millions of
                                sites
                                and seen by tens of millions of people every day.</p>


                            <div>
                                <figure className="float-right"><img
                                    src="https://appetitedemo.files.wordpress.com/2015/07/smachno_28.jpg?w=300"
                                    alt="The Staff"
                                    className="img-border img-medium ml-3"
                                    style={{marginTop: "5px"}}
                                /></figure>
                            </div>


                            <p>This is required when, for example, the final text is not yet available. It is said that
                                song
                                composers of the past used dummy texts as lyrics when writing melodies in order to have
                                a
                                ‘ready-made’ text to sing with the melody. Dummy text is text that is used in the
                                publishing
                                industry or by web designers to occupy the space which will later be filled with ‘real’
                                content.</p>


                            <p>Dummy text is text that is used in the publishing industry or by web designers to occupy
                                the
                                space which will later be filled with ‘real’ content. This is required when, for
                                example,
                                the final text is not yet available.This is required when, for example, the final text
                                is
                                not yet available.</p>


                            <h3 className="title mb-4 font-weight-bold">Who We Are</h3>


                            <p>The core software is built by hundreds of community volunteers, and when you’re ready for
                                more there are thousands of plugins and themes available to transform your site into
                                almost
                                anything you can imagine. Over 60 million people have chosen WordPress to power the
                                place on
                                the web they call “home” — we’d love you to join the family.</p>


                            <p>WordPress started in 2003 with a single bit of code to enhance the typography of everyday
                                writing and with fewer users than you can count on your fingers and toes. Since then it
                                has
                                grown to be the largest self-hosted blogging tool in the world, used on millions of
                                sites
                                and seen by tens of millions of people every day.</p>
                        </div>
                    </article>
                </main>

                <aside className="col-4 pl-4">

                    <aside>
                        <h2 className="title mb-3">Recent Posts</h2>
                        <ul className="list-unstyled fs-1 list-spacing-1 list-line-break">
                            <li>
                                <a href="https://appetitedemo.wordpress.com/2015/07/08/how-to-make-sushi-at-home/Home.jsx">How
                                    to
                                    Make Sushi at&nbsp;Home</a>
                            </li>
                            <li>
                                <a href="https://appetitedemo.wordpress.com/2015/07/08/5-minute-breakfasts-that-are-actually-healthy/">5-Minute
                                    Breakfasts That Are Actually&nbsp;Healthy</a>
                            </li>
                            <li>
                                <a href="https://appetitedemo.wordpress.com/2015/07/08/everything-you-want-to-know-about-pizza/">Everything
                                    You Want to Know About&nbsp;Pizza</a>
                            </li>
                            <li>
                                <a href="https://appetitedemo.wordpress.com/2015/07/04/beer-on-tap-or-in-a-bottle/">Beer
                                    on
                                    Tap or in a&nbsp;Bottle?</a>
                            </li>
                            <li>
                                <a href="https://appetitedemo.wordpress.com/2015/07/04/dinners-that-will-impress-your-date/">Dinners
                                    That Will Impress Your&nbsp;Date</a>
                            </li>
                        </ul>

                    </aside>
                    <aside><h2
                        className="widget-title th-uppercase th-text-base th-mb-base">Recent Comments</h2>
                        <ul className="list-unstyled fs-1 list-spacing-1 list-line-break fs-1-2">
                            <li className="recentcomments">
                                Taras Dashkevych on <a
                                href="https://appetitedemo.wordpress.com/2015/07/08/how-to-make-sushi-at-home/Home.jsx#comment-15">How
                                to Make Sushi at&nbsp;Home</a></li>

                            <li className="recentcomments">
                                Julia Doe on <a
                                href="https://appetitedemo.wordpress.com/2015/07/08/how-to-make-sushi-at-home/Home.jsx#comment-14">How
                                to Make Sushi at&nbsp;Home</a></li>

                            <li className="recentcomments">
                                Taras Dashkevych on <a
                                href="https://appetitedemo.wordpress.com/2015/07/08/how-to-make-sushi-at-home/Home.jsx#comment-13">How
                                to Make Sushi at&nbsp;Home</a></li>

                            <li className="recentcomments">
                                Taras Dashkevych on <a
                                href="https://appetitedemo.wordpress.com/2015/07/08/everything-you-want-to-know-about-pizza/#comment-12">Everything
                                You Want to Know About&nbsp;Pizza</a></li>

                            <li className="recentcomments">
                                Julia Doe on <a
                                href="https://appetitedemo.wordpress.com/2015/07/08/everything-you-want-to-know-about-pizza/#comment-11">Everything
                                You Want to Know About&nbsp;Pizza</a></li>

                        </ul>
                    </aside>
                    <aside className="widget widget_archive">
                        <h2 className="title">Archives</h2>
                        <label
                            className="screen-reader-text" for="archives-dropdown-2">Archives</label>
                        <select className="my-3 fs-2">
                            <option value="">Select Month</option>
                            <option value="https://appetitedemo.wordpress.com/2015/07/"> July 2015</option>
                        </select>


                    </aside>
                    <aside>
                        <h2>Categories</h2>
                        <ul className="list-unstyled fs-1 list-spacing-1 list-line-break fs-1-2">
                            <li className=" cat-item cat-item-8481"><a href="
                            https://appetitedemo.wordpress.com/category/dessert/">Dessert</a> (2)
                            </li>
                            <li className="cat-item cat-item-9313"><a
                                href="https://appetitedemo.wordpress.com/category/drinks/">Drinks</a> (3)
                            </li>
                            <li className="cat-item cat-item-586"><a
                                href="https://appetitedemo.wordpress.com/category/food/">Food</a> (3)
                            </li>
                            <li className="cat-item cat-item-3496"><a
                                href="https://appetitedemo.wordpress.com/category/seafood/">Seafood</a> (1)
                            </li>
                            <li className="cat-item cat-item-1788"><a
                                href="https://appetitedemo.wordpress.com/category/tips/">Tips</a> (2)
                            </li>
                        </ul>

                    </aside>
                </aside>
            </div>

            <br/>

            <Footer/>
        </div>
    )
}

export default Home