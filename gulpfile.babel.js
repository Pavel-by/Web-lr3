import gulp from 'gulp';
import less from 'gulp-less';
import del from 'del';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import pugConverter from 'gulp-pug';

const confs = {
    styles: [
        {
            src: "src/less/**/*.less",
            dest: "public/css/",
            less: true,
            clean: true,
        },
        {
            src: "src/css/**/*.css",
            dest: "public/css/",
        }
    ],
    scripts: [
        {
            src: "src/js/main/**/*.js",
            dest: "public/js/",
            concat: "main.min.js",
            minify: true,
        },
        {
            src: "src/js/pages/**/*.js",
            dest: "public/js/",
            minify: true,
        },
        {
            src: "src/js/modules/**/*.js",
            dest: "public/js/modules",
            minify: true,
        },
        {
            src: "src/js/jquery.min.js",
            dest: "public/js/",
        },
        {
            src: ["src/js/uikit.min.js", "src/js/uikit-icons.min.js"],
            dest: "public/js/",
        }
    ],
    pug: [
        {
            src: "src/pug/pages/**/*.pug",
            dest: "public/html"
        }
    ]
};

function stylesTasks() {
    return confs.styles.map((conf) => {
        return () => {
            let task = gulp.src(conf.src);

            if (conf.less)
                task = task.pipe(less());

            if (conf.clean)
                task = task.pipe(cleanCSS())
                    .pipe(rename((path) => path.basename += ".min"));

            return task.pipe(gulp.dest(conf.dest))
        }
    });
}

function scriptsTasks() {
    return confs.scripts.map((conf) => {
        return () => {
            let task = gulp.src(conf.src);

            if (conf.minify)
                task = task.pipe(babel())
                    //.pipe(uglify())
                    .pipe(rename((path) => {
                        path.basename += ".min"
                    }));

            if (conf.concat)
                task = task.pipe(concat(conf.concat));

            return task.pipe(gulp.dest(conf.dest));
        }
    });
}

function pugTasks() {
    return confs.pug.map((conf) => {
        return () => {
            let task = gulp.src(conf.src)
                .pipe(pugConverter())
                .pipe(gulp.dest(conf.dest));

            return task;
        }
    });
}

function cleanTask() {
    return () => del(['public/css/**', 'public/js/**', "public/html/**"]);
}

function buildTask() {
    return gulp.series(
        cleanTask(),
        gulp.parallel(
            ...stylesTasks(),
            ...scriptsTasks(),
            ...pugTasks(),
        ),
    );
}

export const pug = gulp.parallel(...pugTasks());
export const scripts = gulp.parallel(...scriptsTasks());
export const styles = gulp.parallel(...stylesTasks());
export const clean = cleanTask();
export const build = buildTask();
export default buildTask();