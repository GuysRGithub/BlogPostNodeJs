import React, {useEffect, useState} from "react";
import Sidebar from "../../components/Sidebar";
import Layout from "../../Layout/Layout";
import DetailPost from "./DetailPost";
import Axios from "axios";

const ShowPost = (props) => {

    return (
        <section className="container flex">
            <Layout>
                <DetailPost {...props} />
            </Layout>
        </section>
    );
};

export default ShowPost;
