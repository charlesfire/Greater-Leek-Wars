// ==UserScript==
// @name         Greater Leek Wars
// @namespace    https://github.com/charlesfire
// @version      0.1
// @updateURL    https://raw.githubusercontent.com/charlesfire/Greater-Leek-Wars/master/Greater%20Leek%20Wars.js
// @description  This plugin allow you to change Leek Wars' width
// @author       Charlesfire
// @include      http://leekwars.com/*
// @include      http://www.leekwars.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

var editorWidthInput = undefined;
var editorWidthInputLabel = undefined;
var websiteWidthInput = undefined;
var websiteWidthInputLabel = undefined;

var codeMirrorEditors = undefined;
var codePreviewers = undefined;
var wrapper = undefined;

document.addEventListener("DOMContentLoaded", function(event)
{
	codeMirrorEditors = $(".CodeMirror");
	codePreviewers = document.getElementsByTagName("PRE");
	wrapper = document.getElementById("wrapper");

	var configurator = document.createElement("FORM");
	configurator.style.position = "fixed";
	configurator.style.top = "0px";
	configurator.style.left = "-398px";
	configurator.style.width = "400px";
	configurator.style.height = "100%";
	configurator.style.backgroundColor = "#D1D1D1";
	configurator.style.zIndex = "999";
	configurator.style.textAlign = "center";

	configurator.onmouseover = function()
	{
		configurator.style.left = "0px";
		configurator.style.transition = "left 1s";
	};

	configurator.onmouseout = function()
	{
		configurator.style.left = "-398px";
		configurator.style.transition = "left 1s";
	};

	var carriageReturn = document.createElement("BR");

	editorWidthInput = document.createElement("INPUT");
	editorWidthInput.setAttribute("type", "number");
	editorWidthInput.style.margin = "2px";
	editorWidthInput.style.marginTop = "50px";
	editorWidthInput.style.textAlign = "center";
	editorWidthInput.style.width = "50px";
	editorWidthInput.id = "editorWidthInput";
	editorWidthInput.oninput = onWidthChange;

	editorWidthInputLabel = document.createElement("LABEL");
	editorWidthInputLabel.innerHTML = "Largeur de l'éditeur : ";
	editorWidthInputLabel.htmlFor = "editorWidthInput";

	configurator.appendChild(editorWidthInputLabel);
	configurator.appendChild(editorWidthInput);
	configurator.appendChild(carriageReturn);

	websiteWidthInput = document.createElement("INPUT");
	websiteWidthInput.setAttribute("type", "number");
	websiteWidthInput.style.margin = "2px";
	websiteWidthInput.style.textAlign = "center";
	websiteWidthInput.style.width = "50px";
	websiteWidthInput.id = "websiteWidthInput";
	websiteWidthInput.oninput = onWidthChange;

	websiteWidthInputLabel = document.createElement("LABEL");
	websiteWidthInputLabel.innerHTML = "Largeur du site web : ";
	websiteWidthInputLabel.htmlFor = "websiteWidthInput";

	configurator.appendChild(websiteWidthInputLabel);
	configurator.appendChild(websiteWidthInput);

	document.body.appendChild(configurator);

	editorWidthInput.value = GM_getValue("editorWidth", "828");
	websiteWidthInput.value = GM_getValue("websiteWidth", "1000");

	updateWidth();
});

function updateWidth()
{
	if (codePreviewers !== null)
	{
		for (var i = 0; i < codePreviewers.Length; i++)
		{
			if (codePreviewers[i].match(/code-preview-\d/) != null)
				codePreviewers[i].style.maxWidth = "100%";
		}
	}

	if (codeMirrorEditors !== null && parseInt(editorWidthInput.value) != NaN)
	{
		for (var i = 0; i < codeMirrorEditors.length; i++)
		{
			codeMirrorEditors[i].style.width = editorWidthInput.value + "px";
			codeMirrorEditors[i].style.maxWidth = editorWidthInput.value + "px";
		}
	}

	if (parseInt(websiteWidthInput.value) != NaN)
		wrapper.style.maxWidth = websiteWidthInput.value + "px";
}

var onWidthChange = function()
{
	if (parseInt(editorWidthInput.value) != NaN && parseInt(websiteWidthInput.value) != NaN)
	{
		GM_setValue("editorWidth", editorWidthInput.value);
		GM_setValue("websiteWidth", websiteWidthInput.value);
		updateWidth();
	}
};
