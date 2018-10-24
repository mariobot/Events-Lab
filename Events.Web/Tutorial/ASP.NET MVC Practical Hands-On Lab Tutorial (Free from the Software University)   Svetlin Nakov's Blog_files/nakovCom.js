//<script>
jQuery(function(){
   adjustFooter();
   styleTables();
   someStyling();
   styleTagCloud();
   insertSearchbar();
});

function insertSearchbar(){
var href = jQuery('a#heading').attr('href');
	jQuery('<form role="search" method="get" id="searchform" action="'+href+'"><fieldset><input type="text" value="" name="s" id="s" placeholder="Search nakov.com"/><input type="submit" id="searchsubmit" value=""/></fieldset></form>').insertAfter('aside#leftSidebar section:eq(0)');
}


function someStyling(){
    var anchorHeight = 0;
	var imgHeight = 0;
	var title = '';
	var sidebarPath = 'aside section div.contents';
	var booksLinks = 
	[
	 'http://www.introprogramming.info/intro-csharp-book/',
	 'http://www.introprogramming.info/intro-java-book/',
	 'http://www.devbg.org/dotnetbook/',
	 'http://www.nakov.com/books/inetjava/index.html',
	 'http://www.nakov.com/books/signatures/'
	];
    jQuery(sidebarPath+' h3 a.rsswidget:eq(1)').text('RSS');
	jQuery('table#books a').each(function(i){
   	  	var that = jQuery(this);	  	
		that.append('<span class="bookhover"><a target="_blank" href="'+booksLinks[i]+'" style="display:none;"><span>Click that spot to</span>Read Online!</a></span>');
		anchorHeight = that.parent('td').height();
		imgHeight = jQuery('img:first',this).height();
		title = jQuery('img:first',this).attr('title');
		that.children('span.bookhover').css('bottom', (anchorHeight-imgHeight-2)+'px').attr('title', title).hover(
			function(){ jQuery('a',that).slideDown();},
			function(){ jQuery('a',that).slideUp();}
		);
	});
	
	jQuery('div[id*="__ss_"] iframe').css('cssText','margin-left:9px;');
}


function styleTables(){
   var table = 'section#content div.post table';
   jQuery(table).each( function(){
		var that = this;
		if (jQuery('tr', that).length >1){
			 
			 var idAttr = jQuery(that).attr('id');
			 var classAttr = jQuery(that).attr('class');
			 if(classAttr){
			 	classAttr = (classAttr.length===0) ? false : classAttr;
			 }
			 
			 var anySelectorAttr = !(classAttr || idAttr); // if there's empty 'class'(either empty or no class at all) and no 'id' attributes  -  true
			 var classMatch = jQuery(that).hasClass('table_style');  
			 
			 //your table has an id or class but you want it default pattern-styled anyway - add 'table_style' to table's classes
			 if(classMatch || anySelectorAttr){
			   var len = jQuery('tr', that).length-1;
			   var tdCSS = (len%2===0)
			  	? 'border-top:0 none !important; background-color: transparent !important; padding:2px 4px !important; border-right:1px solid #e3e3e3 !important; border-bottom:1px solid #222;'
				: 'border-top:0 none !important; background-color: #ffa723 !important; padding:2px 4px !important; border-right : 1px solid #f78f17 !important; border-bottom:1px solid #222;'
			  
			   jQuery('tr:odd td', that).css('cssText','border:0 none !important; background-color: #ffa723 !important; padding:2px 4px !important; border-right : 1px solid #f78f17 !important;');
			   jQuery('tr:even td', that).css('cssText','border:0 none !important; background-color: transparent !important; padding:2px 4px !important; border-right:1px solid #e3e3e3 !important;');
			   jQuery('tr:odd td:last-child', that).css('cssText','border:0 none !important; background-color: #ffa723 !important; padding:2px 4px !important; border-right : 1px solid #222 !important;');
			   jQuery('tr:even td:last-child', that).css('cssText','border:0 none !important; background-color: transparent !important; padding:2px 4px !important; border-right : 1px solid #222 !important;');
			   jQuery('tr:odd td:first-child', that).css('cssText','border:0 none !important; background-color: #ffa723 !important; padding:2px 4px !important; border-left : 1px solid #222 !important; border-right : 1px solid #f78f17 !important;');
			   jQuery('tr:even td:first-child', that).css('cssText','border:0 none !important; background-color: transparent !important; padding:2px 4px !important; border-left : 1px solid #222 !important; border-right:1px solid #e3e3e3 !important;');
			   jQuery('tr:first', that).css('cssText','border-left : 1px solid #222 !important; border-top : 1px solid #222 !important;');
			   jQuery('tr:first td', that).css('cssText','border-right : 1px solid #222 !important; border-left : 1px solid #222 !important; border-top : 1px solid #222 !important; color:#fff !important; background-color: #333 !important;border-bottom:0 none !important; padding:2px 4px !important;');
			   jQuery('tr:eq('+len+') td', that).css('cssText',tdCSS);
			   jQuery('tr:eq('+len+') td:first-child', that).css('cssText',tdCSS+' border-left : 1px solid #222 !important;');
			   jQuery('tr:eq('+len+') td:last-child', that).css('cssText',tdCSS+' border-right : 1px solid #222 !important;');
			 }
		}		
   });   
}




function styleTagCloud(){
   var allAnchors = 'div.wrapper aside section div.tagcloud a';
   var classNums = [
   	   22,21,917,74,41,137,11,401,44,61,38,337,60,178,35,
	   23,90,104,151,127,91,71,79,424,129,97,67,170,30,175,
	   957,955,827,820,817,972,980,825,819,822,830,821,818
   ];
   var classPrefix = '.tag-link-';
   var element = allAnchors+classPrefix
   var n = classNums.length;
   var j=0;
   var colors = ['#a00303','#C48E3B','#7777AA','#000'];
   for(var i=0; i<n; i+=2){	 
	 jQuery(element+classNums[i]).css('color', colors[j]);
	 j++;
	 var j = (j==4)? 0 : j;
   }

}


function adjustFooter(){
   var footer = jQuery('div.wrapper footer');
   var height = footer.height();
   var chH = 0;
   var ulExists = 0;
   var links,linksLength = null;
   jQuery('div.linking',footer).each(function(i){		
		var that = jQuery(this);
		ulExists = jQuery('ul',that).length;			
		if(ulExists){			   
			 links = jQuery('ul li a', that);
			 linksLength = links.length;
			 footerUlTextGradients(linksLength,links);
			 if(jQuery('h3',that).text()=='Categories' || jQuery('h3',that).text()=='Useful Links'){
			   footerTextGradients(linksLength,links);
			   jQuery('li:first a',ulExists).css('color','#A7A6A6');
			 }
			 if(jQuery('h3',that).text()=='Recent Posts'){
			   links.each(function(){ 
				  var text = jQuery(this).text();
				  var gap = text.substr(50,62).search(' ');
				  text = text.substr(0,50+gap);
				  jQuery(this).html(text+'....');
			   });
			 }
		}
		else{
			   links = that.children('a');			   
			   linksLength = links.length;
			   footerTextGradients(linksLength,links);
		}
		chH = that.height();
		that.css('margin-top', (height-chH-30)+'px');
   	  }
   );
}

function footerTextGradients(anchorsLength,anchors){
  var colorsArray = ['#a09f9f','#a6a5a5','#a7a6a6','#bab8b8','#c4c4c4','#d0d0d0','#ddd'];
  var cLength = anchorsLength - colorsArray.length-1;
  for(var i=anchorsLength-2; i>-1; i--){
   	  if(i>anchorsLength-7){	  	
		anchors[i].style.color =  colorsArray[i-cLength];		
	  }
	  else{anchors[i].style.color = '#9a9999';}
  }
}

function footerUlTextGradients(anchorsLength,anchors){
  
  var colorsArray = ['#a09f9f','#a6a5a5','#a7a6a6','#c4c4c4'];
  var cLength = anchorsLength - colorsArray.length-1;
  for(var i=anchorsLength-2; i>-1; i--){
   	  if(i>anchorsLength-4){	  	
		anchors[i].style.color =  colorsArray[i-cLength];		
	  }
	  else{anchors[i].style.color = '#9a9999';}
  }
}

function perespectiveBent(count){
  var footerPath = 'div.wrapper footer div.linking';
  jQuery(footerPath+' a:gt('+(count-3)+')').css({'padding-left':'3px' });
}