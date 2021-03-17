var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night_eighties");
editor.session.setUseWrapMode("free");
editor.session.setMode("ace/mode/javascript");
editor.setShowPrintMargin(false);
console.log(document.getElementById("Submit"));
document.getElementById("Submit").onclick = () => {
   console.log("hi");
   editor.session.setMode("ace/mode/css");
}