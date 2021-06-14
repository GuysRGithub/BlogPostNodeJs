const mongoose = require("mongoose")
require("bcrypt");
require("jsonwebtoken");
require("moment");
// noinspection JSValidateTypes
const profileSchema = mongoose.Schema({

    introduction: {
        type: String,
        default: "Hi! I’m Brian, a UX and visual designer based in the Boston area. I enjoy creating modern and functional online experiences."
    },
    about: {
        type: String,
        default: "Hi, I'm Jack and I travel around the world\n" +
            "I was born in Kansas, and like little Ellie, I always dreamed that a hurricane would take me somewhere to another country. And once I really ended up in another country - in China, studying at a business school. There I began to travel a lot around Asia in my free time and then moved to work in Munich.\n" +
            "I discovered the world of low-cost airlines and began to fly somewhere and see the world every weekend. Being somewhere in the 15th country, I realized that I had enough experience and knowledge to share with others - and so this blog appeared. Here you will find useful tips, my travel experiences, life hacks and the usual daily thoughts about everything that surrounds me.",
    },
    portfolio: {
        type: String,
        default: "A Mac app that lives in the menu bar, and when you click on it you get a view from your camera, to check yo face before joining a video call.\n" +
            "Built this little app in a weekend and it was super fun to finally work on a macOS app — after all these years I could scratch this one off my bucket list."
    },
    author: {
        type: mongoose.Types.ObjectId,
        maxlength: 50,
        ref: "Author"
    },
    imageProfile: {
        type: String,
        default: "http://localhost:5000/uploads\\images\\avatar_placeholder.png"
    }
}, {timestamp: true})

const Profile = mongoose.model("Profile", profileSchema)

module.exports = Profile