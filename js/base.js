
var movManager = {
	data: aoWordData
	,uiWordList: null
	,uiWordInfo: null
	,uiMovDisplay: null
	,ixLastClickedWord: null
	,init: function() {
		this.normalizeData();
		this.data.sort(this.compare);
		this.uiWordList = document.querySelector("#wordList");
		this.uiWordInfo = document.querySelector("#wordInfo");
		this.uiMovDisplay = document.querySelector("#movDisplay");
		this.renderWordList();
		return this;
	}
	,normalizeData() {
		for (var iWD = 0; iWD < this.data.length; iWD++) {
			var oWord = this.data[iWD];
			try {
				oWord.wordKeySortable = oWord.wordKey.toLowerCase();
			} catch (e) {
				oWord.wordKey = "BROKEN <a href=\"" + oWord.pageUrl + "\">" + oWord.pageUrl + "</a>";
			}
			oWord.ix = iWD;
		}
	}
	,DEBUG_showVid(oWordData) {
		document.querySelector("#link_" + oWordData.ix).style.backgroundColor = "red";
		window.open(oWordData.pageUrl, 'noooo');
	}
	,showVid(oWordData) {

		var videocontainer = document.getElementById('movVid');
		var videosource = document.getElementById('movSource');
		var newmp4 = 'mov/word/' + oWordData.savedFileName;
		var newposter = 'img/poster.jpg';
		 
		//var videobutton = document.getElementById("videolink1");
		 
		//videobutton.addEventListener("click", function(event) {
	    videocontainer.pause();
	    videosource.setAttribute('src', newmp4);
	    videocontainer.load();
	    //videocontainer.setAttribute('poster', newposter); //Changes video poster image
	    videocontainer.play();
		//}, false);
		this.showWordInfo(oWordData);
	}
	,showVidXXXXXXXXXXXXXXXXX(oWordData) {
		/* DO NOT DELETE ths is better, but does not work.
		var uiMov = document.querySelector("#movDisplay video source");
		var sUrl = "mov/word/" + oWordData.savedFileName;
		uiMov.src = sUrl;
		*/
		
		var uiMov = document.querySelector("#movDisplay");
		var sSrc = "<video id=\"9_vidFront\" class=\"video-standard-width\" controls=\"\">";
		sSrc += "<source src=\"mov/word/" + oWordData.savedFileName + "\" type=\"video/mp4\" class=\"movie\">";
		sSrc += "</video>";
		sSrc += "<div class=\"wordKey\">" + oWordData.wordKey + "</div>";
		document.querySelector("#link_" + oWordData.ix).style.backgroundColor = "red";
		if (this.ixLastClickedWord != null) {
			document.querySelector("#link_" + this.ixLastClickedWord).style.backgroundColor = "transparent";
		}
		this.ixLastClickedWord = oWordData.ix;
		uiMov.innerHTML = sSrc;
	}
	,renderWordList() {
		var oAttrs = {
			"class":"wordLink"
			,"onclick":"movManager.showVid(this.data)"
		};
		for (var iWD = 0; iWD < this.data.length; iWD++) {
			var oWord = this.data[iWD];
			var sWordKey = oWord.wordKey;
			oAttrs.id = "link_" + oWord.ix;
			var ui = util.ui.createElement(this.uiWordList, "div", oAttrs, sWordKey);
			ui.data = oWord;
		}
	}
	,showWordInfo: function(oWord) {
		var sOut = "to be continued...";
		if (typeof oWord != "undefined") {
			sOut = "<div class=\"wordInfoFrame\">";
			sOut += "<div class=\"title\">" + oWord.wordKey + "<div>";
			sOut += "<div class=\"url\">" + oWord.wordList + "<div>";
			sOut += "<div>";
		}
		this.uiWordInfo.innerHTML = sOut;
	}
	,compare: function(a,b) {
		var sSorter = "wordKeySortable"
		if (a[sSorter] < b[sSorter]) {
			return -1;
		}
		if (a[sSorter] > b[sSorter]) {
			return 1;
		}
		return 0;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	console.log("loaded.");
	movManager.init();
	movManager.showWordInfo();
});
