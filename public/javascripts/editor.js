var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night_eighties");
editor.session.setUseWrapMode("free");
editor.session.setMode("ace/mode/c_cpp");
editor.setShowPrintMargin(false);
var socket = io('/');

socket.on('setBoard', () => {
   setScoreBoard();
})

let pagelinks = document.getElementsByClassName('pagelink');
for (i = 0; i < pagelinks.length; i++) {
   pagelinks[i].href = `http://${window.location.hostname}/questions/${pagelinks[i].textContent}`;
}

let languages = document.getElementById('languages');
languages.addEventListener('change', () => {
   editor.session.setMode("ace/mode/" + languages.value);
   let text = ""
   switch (languages.value) {
      case 'javascript':
         text = "var readline = require('readline');\n" +
            "var rl = readline.createInterface({\n" +
            "    input: process.stdin,\n" +
            "    output: process.stdout,\n" +
            "    terminal: false\n" +
            "});\n\n" +

            "rl.on('line', function (line) {\n" +
            "        //codehere\n" +
            "    }\n" +
            ")";
         break;
      case 'java':
         text = "import java.util.Scanner;\n" +
            "public class Main {\n" +
            "    static Scanner sc = new Scanner(System.in);\n" +
            "    public static void main(String[] args) {\n" +
            "        //code here\n" +
            "    }\n" +
            "}\n"
         break;
      case 'c_cpp':
         text = "#include <iostream>\n" +
            "using namespace std;\n" +
            "int main()\n" +
            "{\n" +
            "  //code Here\n" +
            "}\n"
         break;
      case 'python':
         text = "#Code here"
         break;
   }
   editor.setValue(text);
})

let modalcontent = document.getElementById('modalcontent');
let submitbtn = document.getElementById('submit');
submitbtn.addEventListener('click', () => {
   modalcontent.innerHTML = '<div class="loader"> </div>'
   let url = window.location.href;
   let code = editor.getValue();
   $.post(url, { Code: code, language: languages.value }, function (result) {
      let innerHTML;
      console.log(result);
      if (result.iswait) {
         innerHTML = `<div class="alert alert-warning" role="alert">لطفا 5 ثانیه بعد امتحان کنید</div>`
      }
      else {
         if (result.Correct) {
            if (result.Score) {
               socket.emit('getScore');
               innerHTML = `<div class="alert alert-success" role="alert">آفرین این سوال کاملا درست حل کردی امتیاز کسب شده از این سوال ${result.Score}</div>`
            }
            else {
               innerHTML = `<div class="alert alert-danger" role="alert">این سوال از قبل حل کردی وقتتو بزار سر بقیه سوالا</div>`
            }
         }
         else {
            if (result.Haveerr) {
               `<div class="alert alert-danger" role="alert">کدت خطا داره </div>`
            }
            else {
               innerHTML = `<div class="alert alert-danger" role="alert">اشتباه حل کردی <br>ورودی سوال: ${result.input}<br>خروجی درست: ${result.expectOutput}<br>خروجی که کدت به ما داد:${result.realoutput}</div>`
            }
         }
      }
      modalcontent.innerHTML = innerHTML;
   });
})


let users = [];
let scoreboard = document.getElementById("scoreboard")
function setScoreBoard() {
   $.get(`http://${window.location.hostname}/questions/scoreboard`, function (result) {
      let innerHTML = '<tr><th colspan="1">Rank</th><th colspan="6">Name</th><th colspan="3">Score</th></tr>';
      users = result
      let userFound = false;
      let i;
      for (i = 0; i < Math.min(3, users.length); i++) {
         if (users[i].Name == thisUser) {
            userFound = true;
            innerHTML += `<tr ><td  class="mine" colspan="1">${i + 1}</td><td class="mine" colspan="6">${users[i].Name}</td><td  class="mine" colspan="3">${users[i].Score}</td></tr>`
         }
         else {
            innerHTML += `<tr><td colspan="1">${i + 1}</td><td colspan="6">${users[i].Name}</td><td colspan="3">${users[i].Score}</td></tr>`
         }

      }
      if (!userFound) {
         while (!userFound) {
            if (users[i].Name == thisUser) {
               userFound = true;
            }
            i++;
         }
         i--;
         innerHTML += `<tr ><td colspan="10">...</td></tr><tr ><td  class="mine" colspan="1">${i + 1}</td><td class="mine" colspan="6">${users[i].Name}</td><td  class="mine" colspan="3">${users[i].Score}</td></tr>`
      }
      scoreboard.innerHTML = innerHTML;
   });
}
setScoreBoard();
