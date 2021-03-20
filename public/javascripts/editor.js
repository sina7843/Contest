var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night_eighties");
editor.session.setUseWrapMode("free");
editor.session.setMode("ace/mode/python");
editor.setShowPrintMargin(false);

let pagelinks = document.getElementsByClassName('pagelink');
for (i = 0; i < pagelinks.length; i++) {
   pagelinks[i].href = "questions/" + pagelinks[i].textContent;
}

let languages = document.getElementById('languages');
languages.addEventListener('change', () => {
   editor.session.setMode("ace/mode/" + languages.value);
})

let modalcontent = document.getElementById('modalcontent');
let submitbtn = document.getElementById('submit');
submitbtn.addEventListener('click', () => {
   let url = window.location.href;
   console.log(url);
   let code = editor.getValue();
   $.post(url, { Code: code }, function (result) {
      let innerHTML;
      if (result.success) {
         innerHTML = '<div class="alert alert-success" role="alert">شما موفق به حل شدید</div>'
      }
      else {
         innerHTML = '<div class="alert alert-danger" role="alert">اشتباه</div>'
      }
      modalcontent.innerHTML = innerHTML;
   });
})



