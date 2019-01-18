var gulp=require("gulp");
var sass=require("gulp-sass");//把scss转换为css
var connect= require("gulp-connect");//连接本地服务
var sourcemaps=require("gulp-sourcemaps");//把浏览器控制台的css转换成scss
var concat=require("gulp-concat");//把多个文件合并成一个文件
var rename=require("gulp-rename");//给文件重命名
var babel=require("gulp-babel");//把es6转化成es5
var uglify=require("gulp-uglify");//压缩文件

gulp.task("copyHtml",function(){
	gulp.src("html/*.html")
	.pipe(gulp.dest("dist"));
});

gulp.task("copyCss",function(){
	gulp.src("css/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle:"compact"}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"));
});

gulp.task("copyJs",function(){
	gulp.src("js/*.js")
	.pipe(gulp.dest("dist/js"));
});

gulp.task("copyImg",function(){
	gulp.src("img/**")
	.pipe(gulp.dest("dist/img"));
})

gulp.task("font",function(){
	gulp.src("font/*")
	.pipe(gulp.dest("dist/font"));
})

gulp.task("jquery",function(){
	gulp.src("jquery-1.11.0.js")
	.pipe(gulp.dest("dist"));
})

gulp.task("build",["copyHtml","copyCss","copyJs"],function(){
	console.log("编译成功");
});

gulp.task("server",function(){
	connect.server({"root":"dist","livereload":true});
});

gulp.task("watch",function(){
	gulp.watch(["html/*.html","css/*.scss","js/*.js","img/**"],["copyHtml","copyCss","copyJs","copyImg"]);
	
})
 gulp.task("default",["server","watch"]);
