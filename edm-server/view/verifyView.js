var fs = require("fs");

function verifyView (user) {
    var html = fs.readFileSync('view/verifyView.html', 'utf8');
    html=html.replace("userName",user.name);
    html=html.replace("userId",user._id);
    html=html.replace("verifyToken",user.verifyToken);
    
    return(html);
}

exports.verifyView = verifyView