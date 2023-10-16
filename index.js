const { response } = require("express");
var express =  require("express");
var app = express();
var port = 3000; // nếu trùng thì đổi port
var expressLayouts = require('express-ejs-layouts'); //gọi thư viện layout
var nodemailer = require("nodemailer");


app.use(express.static("public")); //đường dẫn thư mục public
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressLayouts); //sẽ chạy trang có tên layout

app.set("view engine", "ejs"); //đuôi mở rộng ejs
app.set("views", "./views"); //thư mục view
app.listen(port);



//đường dẫn trang chủ
app.get("/", function(req,res){
    res.render("trangchu");
});

//đường dẫn trang giới thiệu
app.get("/gioi-thieu", function(req,res){
    res.render("gioithieu")
});

app.get("/email", function(req,res){
    res.render("partials/email  ");
});

app.post("/pots-email", function(req,res){
    console.log(req.body.emailgui);
    console.log(req.body.emailnhna);
    console.log(req.body.noidung);

    //cài đặt email
var option ={
    service: 'gmail', // dùng gmail
    auth:{
        user:'nonameok2010@gmail.com',
        pass:'gmhb uqea cymg hovo'
    }
};
var transporter = nodemailer.createTransport(option);
transporter.verify(function(error, success){
    if(error){
        console.log(error);
    }else{
        console.log("kết nối thành công")
    }
});
    var mail = {
        from:req.body.emailgui,
        to:req.body.emailnhna, 
        subject: req.body.chude,
        //text:req.body.noidung,
        html: req.body.noidung,
    };
    transporter.sendMail(mail,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log("Email sent: "+info,response);
        }
    });
    res.redirect("/email");
});