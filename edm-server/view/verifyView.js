var fs = require("fs");

function verifyView (user) {
    var html = fs.readFileSync('view/verifyView.html', 'utf8');
    html=html.replace("userName",user.name);
    html=html.replace("userId",user._id);
    html=html.replace("verifyToken",user.verifyToken);
    console.log(user.name);
    console.log(html.search("userName"));
    console.log(user._id);
    console.log(html.search("userId"));
    
    return(html);
}

exports.verifyView = verifyView