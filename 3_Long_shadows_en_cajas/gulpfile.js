'use strict';

const gulp = require('gulp'),
	postCss=require('gulp-postcss'),
	sass=require('gulp-sass'),
	simpleVars= require('postcss-simple-vars'),
	nested= require('postcss-nested'),
	customMedia= require('postcss-custom-media'),
	mediaMinMax= require('postcss-media-minmax'),
	cssNano =require('cssnano'),
	colorFunction = require("postcss-color-function"),
	assets= require('postcss-assets');

let postCssPlugins=[
	simpleVars,
	nested,
	customMedia,
	mediaMinMax,
	colorFunction,
	cssNano({
		//Añadir el autoprefixer
		autoprefixer:{
			add:true
		},
		//Para que minifique o no el código
		core:false
	}),
	assets({
		//Array con las carpetas donde vamos a buscar
		loadPaths:['img'],
		//La ruta va ser relativa al origen
		relative:true,
		/*Añade Urls apsolutas en la compilación y tiene que estar 
		//relative en false
		baseUrl:'http://mauriciobrito.nset/files',*/

		//Es la carpeta base donde va a buscar
		//'../assets/img/v.jpg'//
		basePath:'assets',
		/*Añade los cambios de cache de los recursos cacheados*/
		cachebuster:true
		/*Detecta si se le hecieron cambios al recurso porque lee los metadatos
		de este.+ */
	})
];

gulp.task('styles', ()=>{

	gulp.src('./src/*.scss')
	.pipe(sass())//tarea sass
	.pipe(postCss(postCssPlugins))//tarea postcss
	.pipe(gulp.dest('./dist'));
});

gulp.task('default',() =>
	gulp.watch('./src/*.scss',['styles'])
	//gulp.watch('./src/*.css',['styles'])
);