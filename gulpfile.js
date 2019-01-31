/*
    for gulp 4

    this gulpfile supports (note: dont just go ahead and npm these!!!!!!):
    less
    react
    plumber (for react)

    convenient command that may or may not work:
    npm-link -D gulp gulp-plumber gulp-babel @babel/core @babel/preset-react

    needs following things in package:
    gulp
    gulp-plumber (right now only being used
                  for react, so delete if
                  not using react)

    for less:
    gulp-less

    for react:
    everything needed by babel react compilation. they
    change it randomly so look it up.
*/

const gulp=require("gulp");

//delete below lines if not being used
const plumber=require("gulp-plumber");

const babel=require("gulp-babel");

console.log("gulp is watching");

//remove any configs not being used
var defaultPlumber=(err)=>{
    console.log(err);
};

var reactConfig={
    targets:["**/*.jsx","*.jsx"],
    base:"."
};

//for react
gulp.watch(reactConfig.targets).on("change",()=>{
    gulp.src(reactConfig.targets,{base:reactConfig.base})
        .pipe(plumber(defaultPlumber))
        .pipe(babel({presets:["@babel/preset-react"],comments:false}))
        .pipe(gulp.dest(reactConfig.base));
});