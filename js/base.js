
var movManager = {
	data: {words:[], pointers:[]}
	,uiWordList: null
	,uiWordInfo: null
	,uiMovDisplay: null
	,ixLastClickedWord: null
	,moviePlayer:null
	,movieSource: null
	,init: function() {
		this.data.words = aoWordData;
		this.normalizeData();
		this.data.pointers.sort(this.compare);
		this.uiWordList = document.querySelector("#wordList");
		this.uiWordInfo = document.querySelector("#wordInfo");
		this.uiMovDisplay = document.querySelector("#movDisplay");
		this.moviePlayer = document.getElementById('movVid');
		this.movieSource = document.getElementById('movSource');
		this.renderWordList();
		return this;
	}
	,normalizeData() {
		//var asAtr = ["region","pageUrl"];
		var iPointerCounter = 0;
		for (var iWD = 0; iWD < this.data.words.length; iWD++) {
			var oWord = this.data.words[iWD];
			oWord.ix = iWD;
			for (var iP = 0; iP < oWord.wordList.length; iP++) {
				var oPointer = {
					wordKey: oWord.wordList[iP]
					,parent: oWord
					,ix: iPointerCounter++
				}
				try {
					oPointer.wordKeySortable = oPointer.wordKey.toLowerCase();
				} catch (e) {
					oWord.wordKey = "BROKEN <a href=\"" + oWord.pageUrl + "\">" + oWord.pageUrl + "</a>";
				}
				this.data.pointers.push(oPointer);
			}
		}
	}
	,DEBUG_showVid(oWordData) {
		document.querySelector("#link_" + oWordData.ix).style.backgroundColor = "red";
		window.open(oWordData.pageUrl, 'noooo');
	}
	,showVid(oPointer) {
		var oWordData = oPointer.parent;
		var newmp4 = 'mov/word/' + oWordData.savedFileName;
		var newposter = 'img/poster.jpg';
		 
	    this.moviePlayer.pause();
	    this.movieSource.setAttribute('src', newmp4);
	    this.moviePlayer.load();
	    this.moviePlayer.play();
		this.showWordInfo(oPointer);
	}
	,replayVid() {
		this.moviePlayer.pause();
		this.moviePlayer.currentTime = 0; 
		this.moviePlayer.play();
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
/*		for (var iWD = 0; iWD < this.data.words.length; iWD++) {
			var oWord = this.data.words[iWD];
			var sWordKey = oWord.wordKey;
			oAttrs.id = "link_" + oWord.ix;
			var ui = util.ui.createElement(this.uiWordList, "div", oAttrs, sWordKey);
			ui.data = oWord;
		}*/
		for (var iWD = 0; iWD < this.data.pointers.length; iWD++) {
			var oPointer = this.data.pointers[iWD];
			var sWordKey = oPointer.wordKey;
			oAttrs.id = "link_" + oPointer.ix;
			var ui = util.ui.createElement(this.uiWordList, "div", oAttrs, sWordKey);
			ui.data = oPointer;
		}
	}
	,showWordInfo: function(oPointer) {
		var sOut = "to be continued...";
		if (typeof oPointer != "undefined") {
			sOut = "<div class=\"wordInfoFrame\">";
				sOut += "<div class=\"title\">" + oPointer.wordKey + "</div>";
				sOut += "<div class=\"wordList\">" + oPointer.parent.wordList.join(", ") + "</div>";
				sOut += "<div>";
					sOut += "<button onclick=\"movManager.replayVid();\">repeat</button>";
				sOut += "</div>";
				sOut += "<div class=\"url\"><a href=\"" + oPointer.parent.pageUrl + "\" target=\"signbankWindow\">" + "original on Signbank" + "</div>";
			sOut += "</div>";
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
	//movManager.showWordInfo();
});
