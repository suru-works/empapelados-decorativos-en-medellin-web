var fs = require("fs");

function forgotView (user) {
    var html = fs.readFileSync('view/forgotView.html', 'utf8');
    html=html.replace("userName",user.name);
    //html=html.replace("userId",user._id);
    html=html.replace("forgotToken",user.forgotToken);
    
    return(html);
}

exports.forgotView = forgotView