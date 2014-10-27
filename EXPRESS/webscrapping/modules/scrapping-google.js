	var cheerio = require('cheerio'),
	request = require('request'),
	fs = require('fs'),
	l = console.log;

		
	var opt = new Object()
	
	var getImages = function(keyword,callback){
		opt.keyword = encodeURIComponent(keyword)
		opt.url = "https://www.google.es/search?q="+opt.keyword+"&source=lnms&tbm=isch";
		//opt.url = "http://localhost:3000/googleimage"
		//opt.url = "https://www.flickr.com/search?sort=relevance&text="+opt.keyword
		request(opt,function(err,response,html){
			if(!err && response.statusCode == 200){
				//var html__ = '<div class="caja"><ul><li class="item"><div class="boxie"><span><img src="https://lh6.ggpht.com/CiCocGppE7iuYyNCf4b_MFm9LKCs1KMSkapB0A_CFu5tgHCkoQVwYdpzpjdHj6RzR7RAUp2oJaZiBguW-EsrKeYH2a19nxIEaNVxSueL" alt=""></span></div></li><li class="item"><div class="boxie"><span><img src="" alt=""></span></div></li><li class="item"><div class="boxie"><span><img src="" alt=""></span></div></li><li class="item"><div class="boxie"><span><img src="" alt=""></span></div></li></ul><ul><li class="item"><div class="boxie"><span><img src="" alt=""></span></div></li><li class="item"><div class="boxie"><span><img src="" alt=""></span></div></li><li class="item"><div class="boxie"><span><img src="" alt=""></span></div></li><li class="item"><div class="boxie"><span><img src="" alt=""></span></div></li></ul></div>'
				var $ = cheerio.load(html,{
					normalizeWhitespace: false,
	    xmlMode: false
				})
					//l(html)
				//var imgs = $('html #gsr #main #cnt #rcnt div.col div#center_col div#res.med div#search #ires #rso li #rg #rg_s .rg_di a.rg_l img.rg_i')
				/*
				var html_ = $('html body #gb').children().map(function(i,ele){
						console.log(ele.attribs)
						if(ele.attribs.id =='gbx3')
							l($(this).children())
				})
				*/
				var srcImgs = [];
				var html_ = $('img').each(function(i,e){
					//l(i)
					//l(this.attribs.src)
					l(this.parent.type=="tag"&&this.parent.name=="a")
					//l($(this.parent))
					//l(this.parent.attribs)
					srcImgs.push(this.attribs.src)
				})
				//l(html_)
				
					//l(imgs)
					callback(srcImgs)
			}
		})
	}

	module.exports = getImages;
