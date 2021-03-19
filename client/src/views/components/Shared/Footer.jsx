import React from 'react'

function Footer() {
    return (
        <footer id="colophon" className="site-footer th-text-secondary-base th-bg-primary-base lg:th-pt-3xl th-py-xl">
            <div className="mx-auto fs-1 row justify-content-center" style={{width: "90%"}}>

                <div
                    className="row justify-content-center justify-center align-items-center">
                    <aside className="col-4">
                        <h3 className="text-uppercase font-weight-bold my-3">Opening Hours</h3>
                        <div itemScope="" itemType="http://schema.org/LocalBusiness">
                            <div className="justify-content-between" itemProp="openingHours">
                                <p className="letter-space-4 my-1">Weekdays: 08:00am - 22:00pm</p>
                                <p className="letter-space-4 my-1">Saturday: 09:00am - 02:00am</p>
                                <p className="letter-space-4 my-1">Sunday: 08:00am - 10:00pm</p>
                                <p className="letter-space-4 my-1">Holidays: 10:00am - 10:00pm</p>
                                <p className="letter-space-4 my-1">Happy Hours: 8:00pm - 11:00pm</p>
                            </div>
                        </div>
                    </aside>

                    <aside className="col-4">
                        <h3 className="text-uppercase font-weight-bold my-3">Recent Posts</h3>
                        <ul className="footer-list">
                            <li>
                                <a href="https://appetitedemo.wordpress.com/2015/07/08/how-to-make-sushi-at-home/">How
                                    to Make Sushi at&nbsp;Home</a>
                            </li>
                            <hr/>
                            <li>
                                <a href="https://appetitedemo.wordpress.com/2015/07/08/5-minute-breakfasts-that-are-actually-healthy/">5-Minute
                                    Breakfasts That Are Actually&nbsp;Healthy</a>
                            </li>
                            <hr/>
                            <li>
                                <a href="https://appetitedemo.wordpress.com/2015/07/08/everything-you-want-to-know-about-pizza/">Everything
                                    You Want to Know About&nbsp;Pizza</a>
                            </li>
                        </ul>

                    </aside>
                    <aside className="col-4">
                        <h3 className="text-uppercase font-weight-bold my-3">About Appetite</h3>
                        <div className="textwidget">Dummy text is text that is used in the publishing industry or by web
                            designers to occupy the space which will later be filled with ‘real’ content. This is
                            required when the final text is not yet available.
                        </div>
                    </aside>
                </div>


                <div className="text-center all-center container mt-5">

                    <nav className="mt-5 social" aria-label="Social Links Menu">
                        <ul className="d-flex flex justify-content-center justify-center w-50 mx-auto"
                        style={{listStyle: "none"}}>
                            <li className=""><a
                                href="http://facebook.com/"><span className="screen-reader-text social-meta">Facebook</span>
                                <svg className="svg-icon th-fill-current" width="28" height="28" aria-hidden="true"
                                     role="img" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"></path>
                                </svg>
                            </a></li>
                            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-145"><a
                                href="https://twitter.com/TarasDashkevych"><span
                                className="screen-reader-text social-meta">Twitter</span>
                                <svg className="svg-icon th-fill-current" width="28" height="28" aria-hidden="true"
                                     role="img" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
                                </svg>
                            </a></li>
                            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-147"><a
                                href="https://www.youtube.com/"><span
                                className="screen-reader-text social-meta">YouTube</span>
                                <svg className="svg-icon th-fill-current" width="28" height="28" aria-hidden="true"
                                     role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"></path>
                                </svg>
                            </a></li>
                            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-148"><a
                                href="https://www.pinterest.com/"><span
                                className="screen-reader-text social-meta">Pinterest</span>
                                <svg className="svg-icon th-fill-current" width="28" height="28" aria-hidden="true"
                                     role="img" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"></path>
                                </svg>
                            </a></li>
                            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-146"><a
                                href="https://vimeo.com/"><span className="screen-reader-text social-meta">Vimeo</span>
                                <svg className="svg-icon th-fill-current" width="28" height="28" aria-hidden="true"
                                     role="img" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"></path>
                                </svg>
                            </a></li>
                            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-149"><a
                                href="http://instagram.com/tarasdashkevych"><span
                                className="screen-reader-text social-meta">Instagram</span>
                                <svg className="svg-icon th-fill-current" width="28" height="28" aria-hidden="true"
                                     role="img" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
                                </svg>
                            </a></li>
                            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-150"><a
                                href="mailto:youremail@example.com"><span className="screen-reader-text social-meta">Email Address</span>
                                <svg className="svg-icon th-fill-current" width="28" height="28" aria-hidden="true"
                                     role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                     strokeLinejoin="round" data-darkreader-inline-fill="" data-darkreader-inline-stroke="">
                                    <path
                                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </a></li>
                        </ul>
                    </nav>
                    <div className="site-copyright text-center mt-5">
                        2020 Appetite<span className="footer-content">• 1234 Street, Seattle WA • (123) 456-7890</span>
                    </div>

                    <div className="site-info th-text-center text-uppercase mt-5">
                        <a href="https://wordpress.com/?ref=footer_blog" rel="nofollow">Blog at WordPress.com.</a>
                    </div>

                </div>

            </div>
        </footer>
    )
}

export default Footer